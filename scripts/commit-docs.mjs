#!/usr/bin/env node
/**
 * Generates one markdown document per commit in `commits/`, numbered by the
 * commit's position in history (`git rev-list --count`), so the folder reads
 * in order: 0001, 0002, ...
 *
 * Usage:
 *   node scripts/commit-docs.mjs --amend       post-commit hook: document HEAD
 *                                              and fold the doc into HEAD
 *   node scripts/commit-docs.mjs --rev <sha>   document one existing commit
 *   node scripts/commit-docs.mjs --all         (re)document every commit
 *
 * The doc describes everything in the commit except `commits/` itself.
 */
import { execFileSync } from "node:child_process";
import {
  existsSync,
  mkdirSync,
  readdirSync,
  readFileSync,
  rmSync,
  writeFileSync,
} from "node:fs";
import { join } from "node:path";

const DOCS_DIR = "commits";
const INDEX_FILE = "README.md";
const PAD = 4;
const EMPTY_TREE = "4b825dc642cb6eb9a060e54bf8d69288fbee4904";
const EXCLUDE_DOCS = `:(exclude)${DOCS_DIR}`;

const DOC_FILE_RE = /^(\d{4})-.+\.md$/;
const NAV_LINE_RE = /^<!-- nav -->.*$/m;
const FRONT_MATTER_RE = /^---\n([\s\S]*?)\n---/;
const SLUG_STRIP_RE = /[^a-z0-9]+/g;
const SLUG_TRIM_RE = /^-+|-+$/g;
const WORKSPACE_RE = /^(apps|packages)\/([^/]+)\//;
const COMPONENT_RE = /^packages\/ui\/src\/[^/]+\.tsx$/;
const TEST_RE = /\.test\.tsx?$/;
const STORY_RE = /\.stories\.tsx?$/;
const CSS_RE = /\.css$/;
const EXPORT_BLOCK_RE = /export\s+(?:type\s+)?\{([^}]+)\}/g;
const EXPORT_DECL_RE = /export\s+(?:function|const|class)\s+(\w+)/g;
const TEST_CASE_RE = /\b(?:it|test)(?:\.each\([\s\S]*?\))?\(\s*["'`]/g;
const STORY_EXPORT_RE = /export\s+const\s+(\w+)\s*:\s*Story\b/g;
const CSS_PROP_RE = /(--[\w-]+)\s*:\s*([^;{}]+);/g;
const CSS_UTILITY_RE = /@utility\s+([\w-]+)/g;
const WHITESPACE_RE = /\s+/g;
const PIPE_RE = /\|/g;
const LIST_ITEM_RE = /^\+\s*[-*]\s*\[([ x])\]\s*(.+)$/gim;
const TABLE_ITEM_RE = /^\+\s*\|\s*\[([ x])\]\s*\|\s*([^|]+?)\s*\|/gim;
const EXPORT_ALIAS_RE = /\s+as\s+/;
const FRONT_MATTER_PAIR_RE = /:\s(.*)/s;

const STATUS = { A: "Added", M: "Modified", D: "Deleted", T: "Type changed" };
const DEP_FIELDS = ["dependencies", "devDependencies", "peerDependencies"];

// ---------------------------------------------------------------------------
// git helpers
// ---------------------------------------------------------------------------

function git(...args) {
  return execFileSync("git", args, {
    encoding: "utf8",
    maxBuffer: 256 * 1024 * 1024,
  }).trimEnd();
}

function gitOrNull(...args) {
  try {
    return execFileSync("git", args, {
      encoding: "utf8",
      maxBuffer: 256 * 1024 * 1024,
      stdio: ["ignore", "pipe", "ignore"],
    });
  } catch {
    return null;
  }
}

function fileAt(rev, path) {
  return rev ? gitOrNull("show", `${rev}:${path}`) : null;
}

function isRewritingHistory() {
  return ["rebase-merge", "rebase-apply", "CHERRY_PICK_HEAD", "REVERT_HEAD"]
    .map((p) => git("rev-parse", "--git-path", p))
    .some((p) => existsSync(p));
}

// ---------------------------------------------------------------------------
// formatting helpers
// ---------------------------------------------------------------------------

const pad = (n) => String(n).padStart(PAD, "0");
const code = (s) => `\`${s}\``;
const cell = (s) => String(s).replace(PIPE_RE, "\\|");

function slugify(subject) {
  return (
    subject
      .toLowerCase()
      .replace(SLUG_STRIP_RE, "-")
      .replace(SLUG_TRIM_RE, "")
      .slice(0, 60)
      .replace(SLUG_TRIM_RE, "") || "commit"
  );
}

function table(headers, rows) {
  if (rows.length === 0) {
    return "";
  }
  return [
    `| ${headers.join(" | ")} |`,
    `| ${headers.map(() => "---").join(" | ")} |`,
    ...rows.map((r) => `| ${r.map(cell).join(" | ")} |`),
  ].join("\n");
}

function list(label, items) {
  return items.length ? `- **${label}:** ${items.join(", ")}` : null;
}

function matchAll(re, text, group = 1) {
  return text ? [...text.matchAll(re)].map((m) => m[group]) : [];
}

// ---------------------------------------------------------------------------
// collect
// ---------------------------------------------------------------------------

function readMeta(sha) {
  const [full, short, author, email, date, parents, subject] = git(
    "show",
    "-s",
    "--format=%H%n%h%n%an%n%ae%n%aI%n%P%n%s",
    sha
  ).split("\n");
  return {
    sha: full,
    short,
    author,
    email,
    date,
    parent: parents ? parents.split(" ")[0] : null,
    isMerge: parents ? parents.split(" ").length > 1 : false,
    subject,
    body: git("show", "-s", "--format=%b", sha).trim(),
    number: Number(git("rev-list", "--count", sha)),
  };
}

function readFiles(meta) {
  const base = meta.parent ?? EMPTY_TREE;
  const range = [base, meta.sha, "--", ".", EXCLUDE_DOCS];
  const stats = new Map();
  for (const line of git("diff", "--numstat", "--no-renames", ...range)
    .split("\n")
    .filter(Boolean)) {
    const [add, del, path] = line.split("\t");
    stats.set(path, {
      add: add === "-" ? null : Number(add),
      del: del === "-" ? null : Number(del),
    });
  }
  return git("diff", "--name-status", "--no-renames", ...range)
    .split("\n")
    .filter(Boolean)
    .map((line) => {
      const [status, path] = line.split("\t");
      const s = stats.get(path) ?? { add: null, del: null };
      return { status: status[0], path, ...s };
    });
}

function workspaceOf(path) {
  const m = path.match(WORKSPACE_RE);
  return m ? `${m[1]}/${m[2]}` : "root";
}

function packageName(rev, workspace) {
  if (workspace === "root") {
    return null;
  }
  const json = fileAt(rev, `${workspace}/package.json`);
  try {
    return json ? JSON.parse(json).name : null;
  } catch {
    return null;
  }
}

function before(meta, path) {
  return fileAt(meta.parent, path);
}

function after(meta, path) {
  return fileAt(meta.sha, path);
}

function exportsOf(source) {
  const names = new Set();
  for (const block of matchAll(EXPORT_BLOCK_RE, source)) {
    for (const name of block.split(",")) {
      const clean = name.trim().split(EXPORT_ALIAS_RE).pop();
      if (clean) {
        names.add(clean);
      }
    }
  }
  for (const name of matchAll(EXPORT_DECL_RE, source)) {
    names.add(name);
  }
  return [...names];
}

function cssProps(source) {
  const props = new Map();
  for (const m of source ? source.matchAll(CSS_PROP_RE) : []) {
    if (!props.has(m[1])) {
      props.set(m[1], m[2].replace(WHITESPACE_RE, " ").trim());
    }
  }
  return props;
}

function depsOf(json) {
  try {
    const pkg = json ? JSON.parse(json) : {};
    return {
      deps: Object.fromEntries(DEP_FIELDS.map((f) => [f, pkg[f] ?? {}])),
      scripts: pkg.scripts ?? {},
    };
  } catch {
    return { deps: {}, scripts: {} };
  }
}

// ---------------------------------------------------------------------------
// sections
// ---------------------------------------------------------------------------

function sectionAreas(meta, files) {
  const groups = new Map();
  for (const f of files) {
    const ws = workspaceOf(f.path);
    groups.set(ws, [...(groups.get(ws) ?? []), f]);
  }
  const parts = ["## Changes by area"];
  for (const [ws, items] of [...groups].sort(([a], [b]) =>
    a.localeCompare(b)
  )) {
    const name = packageName(meta.sha, ws) ?? packageName(meta.parent, ws);
    parts.push(`### ${ws}${name ? ` · ${code(name)}` : ""}`);
    parts.push(
      table(
        ["Status", "File", "+", "−"],
        items.map((f) => [
          STATUS[f.status] ?? f.status,
          code(f.path),
          f.add ?? "binary",
          f.del ?? "binary",
        ])
      )
    );
  }
  return parts.join("\n\n");
}

function sectionComponents(meta, files) {
  const rows = files
    .filter((f) => COMPONENT_RE.test(f.path) && !TEST_RE.test(f.path))
    .map((f) => {
      const now = exportsOf(after(meta, f.path));
      const was = exportsOf(before(meta, f.path));
      const added = now.filter((n) => !was.includes(n));
      const removed = was.filter((n) => !now.includes(n));
      const detail =
        f.status === "M"
          ? [
              added.length ? `added ${added.map(code).join(", ")}` : "",
              removed.length ? `removed ${removed.map(code).join(", ")}` : "",
            ]
              .filter(Boolean)
              .join("; ") || "API unchanged"
          : "";
      return [
        STATUS[f.status] ?? f.status,
        code(f.path.split("/").pop()),
        (f.status === "D" ? was : now).map(code).join(", "),
        detail,
      ];
    });
  return rows.length
    ? `## Components\n\n${table(["Status", "File", "Exports", "API change"], rows)}`
    : "";
}

function sectionTests(meta, files) {
  const rows = files
    .filter((f) => TEST_RE.test(f.path))
    .map((f) => {
      const now = matchAll(TEST_CASE_RE, after(meta, f.path), 0).length;
      const was = matchAll(TEST_CASE_RE, before(meta, f.path), 0).length;
      return [
        STATUS[f.status] ?? f.status,
        code(f.path),
        f.status === "M"
          ? `${was} → ${now}`
          : String(f.status === "D" ? was : now),
      ];
    });
  return rows.length
    ? `## Tests\n\n${table(["Status", "File", "Test blocks"], rows)}\n\nCounts \`it\` / \`test\` blocks; an \`it.each\` table counts once.`
    : "";
}

function sectionStories(meta, files) {
  const rows = files
    .filter((f) => STORY_RE.test(f.path))
    .map((f) => {
      const now = matchAll(STORY_EXPORT_RE, after(meta, f.path));
      const was = matchAll(STORY_EXPORT_RE, before(meta, f.path));
      const added = now.filter((n) => !was.includes(n));
      const removed = was.filter((n) => !now.includes(n));
      const detail =
        f.status === "M"
          ? [
              added.length ? `+ ${added.join(", ")}` : "",
              removed.length ? `− ${removed.join(", ")}` : "",
            ]
              .filter(Boolean)
              .join("; ") || "no stories added or removed"
          : (f.status === "D" ? was : now).join(", ");
      return [
        STATUS[f.status] ?? f.status,
        code(f.path.split("/").pop()),
        detail,
      ];
    });
  return rows.length
    ? `## Stories\n\n${table(["Status", "File", "Stories"], rows)}`
    : "";
}

function sectionTokens(meta, files) {
  const parts = [];
  for (const f of files.filter((x) => CSS_RE.test(x.path))) {
    const was = cssProps(before(meta, f.path));
    const now = cssProps(after(meta, f.path));
    const added = [...now.keys()].filter((k) => !was.has(k));
    const removed = [...was.keys()].filter((k) => !now.has(k));
    const changed = [...now.keys()].filter(
      (k) => was.has(k) && was.get(k) !== now.get(k)
    );
    const utilsNow = matchAll(CSS_UTILITY_RE, after(meta, f.path));
    const utilsWas = matchAll(CSS_UTILITY_RE, before(meta, f.path));
    const lines = [
      list("Added", added.map(code)),
      list("Removed", removed.map(code)),
      list(
        "Added utilities",
        utilsNow.filter((u) => !utilsWas.includes(u)).map(code)
      ),
      list(
        "Removed utilities",
        utilsWas.filter((u) => !utilsNow.includes(u)).map(code)
      ),
      ...changed.map(
        (k) =>
          `- **Changed** ${code(k)}: ${code(was.get(k))} → ${code(now.get(k))}`
      ),
    ].filter(Boolean);
    if (lines.length) {
      parts.push(`### ${code(f.path)}\n\n${lines.join("\n")}`);
    }
  }
  return parts.length
    ? `## Design tokens and CSS\n\n${parts.join("\n\n")}`
    : "";
}

function diffDeps(was, now) {
  const rows = [];
  for (const field of DEP_FIELDS) {
    const a = was.deps[field] ?? {};
    const b = now.deps[field] ?? {};
    for (const name of new Set([...Object.keys(a), ...Object.keys(b)])) {
      if (a[name] === b[name]) {
        continue;
      }
      if (!(name in a)) {
        rows.push(["Added", code(name), code(b[name]), field]);
      } else if (name in b) {
        rows.push([
          "Changed",
          code(name),
          `${code(a[name])} → ${code(b[name])}`,
          field,
        ]);
      } else {
        rows.push(["Removed", code(name), code(a[name]), field]);
      }
    }
  }
  for (const name of new Set([
    ...Object.keys(was.scripts),
    ...Object.keys(now.scripts),
  ])) {
    if (was.scripts[name] !== now.scripts[name]) {
      const value = now.scripts[name] ?? was.scripts[name];
      const change =
        name in was.scripts
          ? name in now.scripts
            ? "Changed"
            : "Removed"
          : "Added";
      rows.push([change, code(name), code(value), "scripts"]);
    }
  }
  return rows;
}

function sectionDependencies(meta, files) {
  const parts = [];
  for (const f of files.filter((x) => x.path.endsWith("package.json"))) {
    const rows = diffDeps(
      depsOf(before(meta, f.path)),
      depsOf(after(meta, f.path))
    );
    if (rows.length) {
      parts.push(
        `### ${code(f.path)}\n\n${table(["Change", "Name", "Version / command", "Field"], rows)}`
      );
    }
  }
  return parts.length
    ? `## Dependencies and scripts\n\n${parts.join("\n\n")}`
    : "";
}

function sectionRoadmap(meta, files) {
  if (!files.some((f) => f.path === "ROADMAP.md")) {
    return "";
  }
  const diff = git(
    "diff",
    "--unified=0",
    meta.parent ?? EMPTY_TREE,
    meta.sha,
    "--",
    "ROADMAP.md"
  );
  const items = [
    ...diff.matchAll(LIST_ITEM_RE),
    ...diff.matchAll(TABLE_ITEM_RE),
  ].map((m) => ({ done: m[1].toLowerCase() === "x", text: m[2].trim() }));
  const lines = [
    ...items.filter((i) => i.done).map((i) => `- [x] ${i.text}`),
    ...items.filter((i) => !i.done).map((i) => `- [ ] ${i.text}`),
  ];
  if (lines.length === 0) {
    return "";
  }
  const note = meta.parent
    ? "Checklist lines added or changed in `ROADMAP.md`."
    : "Checklist as first written in `ROADMAP.md`.";
  return `## Roadmap\n\n${note}\n\n${lines.join("\n")}`;
}

// ---------------------------------------------------------------------------
// render
// ---------------------------------------------------------------------------

function render(meta, files, { selfReferencing }) {
  const add = files.reduce((n, f) => n + (f.add ?? 0), 0);
  const del = files.reduce((n, f) => n + (f.del ?? 0), 0);
  const fileName = docFileName(meta);
  const commitCell = selfReferencing
    ? `the commit that adds this file: ${code(`git log -1 --format=%h -- ${DOCS_DIR}/${fileName}`)}`
    : code(meta.short);
  // Only meaningful at commit time; a backfilled commit may predate the branch.
  const branch = selfReferencing
    ? (gitOrNull("rev-parse", "--abbrev-ref", "HEAD")?.trim() ?? "")
    : "";

  const frontMatter = [
    "---",
    `number: ${meta.number}`,
    `subject: ${JSON.stringify(meta.subject)}`,
    `date: ${meta.date}`,
    `author: ${JSON.stringify(meta.author)}`,
    `files: ${files.length}`,
    `insertions: ${add}`,
    `deletions: ${del}`,
    "---",
  ].join("\n");

  const body = meta.body
    ? meta.body
        .split("\n")
        .map((l) => `> ${l}`)
        .join("\n")
    : "> _No commit body. Commit without `-m` and write a body to explain the why; it appears here._";

  const overview = table(
    ["", ""],
    [
      ["Number", String(meta.number)],
      ["Commit", commitCell],
      [
        "Parent",
        meta.parent ? code(meta.parent.slice(0, 7)) : "none (root commit)",
      ],
      ["Author", `${meta.author} <${meta.email}>`],
      ["Date", meta.date],
      ...(branch && branch !== "HEAD" ? [["Branch", code(branch)]] : []),
      ...(meta.isMerge
        ? [["Type", "merge commit (diff against first parent)"]]
        : []),
      ["Changes", `${files.length} files · +${add} −${del}`],
    ]
  );

  return [
    frontMatter,
    "<!-- nav -->",
    `# ${pad(meta.number)} · ${meta.subject}`,
    body,
    `## Overview\n\n${overview}`,
    sectionComponents(meta, files),
    sectionTests(meta, files),
    sectionStories(meta, files),
    sectionTokens(meta, files),
    sectionDependencies(meta, files),
    sectionRoadmap(meta, files),
    files.length
      ? sectionAreas(meta, files)
      : "## Changes by area\n\nNo files outside `commits/` changed.",
  ]
    .filter(Boolean)
    .join("\n\n")
    .concat("\n");
}

function docFileName(meta) {
  return `${pad(meta.number)}-${slugify(meta.subject)}.md`;
}

// ---------------------------------------------------------------------------
// index + navigation
// ---------------------------------------------------------------------------

function readDocs() {
  if (!existsSync(DOCS_DIR)) {
    return [];
  }
  return readdirSync(DOCS_DIR)
    .filter((f) => DOC_FILE_RE.test(f))
    .sort()
    .map((file) => {
      const text = readFileSync(join(DOCS_DIR, file), "utf8");
      const fm = Object.fromEntries(
        (text.match(FRONT_MATTER_RE)?.[1] ?? "")
          .split("\n")
          .map((l) => l.split(FRONT_MATTER_PAIR_RE))
          .filter((p) => p.length > 1)
          .map(([k, v]) => [k.trim(), v.trim()])
      );
      const parse = (v) => {
        try {
          return JSON.parse(v);
        } catch {
          return v;
        }
      };
      return {
        file,
        text,
        number: Number(fm.number ?? file.slice(0, PAD)),
        subject: parse(fm.subject ?? file),
        date: fm.date ?? "",
        files: fm.files ?? "",
        insertions: fm.insertions ?? "",
        deletions: fm.deletions ?? "",
      };
    });
}

function refreshNavigation(docs) {
  docs.forEach((doc, i) => {
    const prev = docs[i - 1];
    const next = docs[i + 1];
    const nav = [
      prev ? `[← ${pad(prev.number)}](${prev.file})` : "← first commit",
      `[Index](${INDEX_FILE})`,
      next ? `[${pad(next.number)} →](${next.file})` : "latest →",
    ].join(" · ");
    const line = `<!-- nav --> ${nav}`;
    if (doc.text.match(NAV_LINE_RE)?.[0] !== line) {
      writeFileSync(
        join(DOCS_DIR, doc.file),
        doc.text.replace(NAV_LINE_RE, line)
      );
    }
  });
}

function writeIndex(docs) {
  const rows = docs.map((d) => [
    pad(d.number),
    d.date.slice(0, 10),
    `[${d.subject}](${d.file})`,
    d.files,
    `+${d.insertions} −${d.deletions}`,
  ]);
  const text = [
    "# Commit log",
    "One document per commit, generated by the `post-commit` hook " +
      "(`scripts/commit-docs.mjs`). Each is numbered by its position in " +
      "history, so the folder reads in order. Start at the first entry and " +
      "follow the → links at the top of each document.",
    "Regenerate one commit with `pnpm docs:commit --rev <sha>`, or all of " +
      "them with `pnpm docs:commit --all`.",
    table(["#", "Date", "Commit", "Files", "Lines"], rows),
  ].join("\n\n");
  writeFileSync(join(DOCS_DIR, INDEX_FILE), `${text}\n`);
}

// ---------------------------------------------------------------------------
// main
// ---------------------------------------------------------------------------

function documentCommit(sha, { selfReferencing }) {
  const meta = readMeta(sha);
  const files = readFiles(meta);
  mkdirSync(DOCS_DIR, { recursive: true });
  const target = docFileName(meta);
  // An amend can change the subject, leaving a doc with the same number under
  // an old slug.
  const prefix = `${pad(meta.number)}-`;
  for (const file of existsSync(DOCS_DIR) ? readdirSync(DOCS_DIR) : []) {
    if (file.startsWith(prefix) && file !== target) {
      rmSync(join(DOCS_DIR, file), { force: true });
    }
  }
  writeFileSync(
    join(DOCS_DIR, target),
    render(meta, files, { selfReferencing })
  );
  return target;
}

function main() {
  process.chdir(git("rev-parse", "--show-toplevel"));
  const args = process.argv.slice(2);
  const amend = args.includes("--amend");

  if (amend && (process.env.COMMIT_DOCS_AMENDING || isRewritingHistory())) {
    return;
  }

  const revIndex = args.indexOf("--rev");
  const shas = args.includes("--all")
    ? git("rev-list", "--reverse", "HEAD").split("\n")
    : [git("rev-parse", revIndex >= 0 ? args[revIndex + 1] : "HEAD")];

  const written = shas.map((sha) =>
    documentCommit(sha, { selfReferencing: amend })
  );
  const docs = readDocs();
  refreshNavigation(docs);
  writeIndex(readDocs());

  if (amend) {
    git("add", "--all", "--", DOCS_DIR);
    execFileSync("git", ["commit", "--amend", "--no-edit", "--no-verify"], {
      stdio: "inherit",
      env: { ...process.env, COMMIT_DOCS_AMENDING: "1" },
    });
  }
  process.stdout.write(
    `commit-docs: wrote ${written.map((w) => `${DOCS_DIR}/${w}`).join(", ")}\n`
  );
}

main();
