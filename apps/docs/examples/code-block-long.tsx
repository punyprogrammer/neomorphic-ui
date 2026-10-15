"use client";

import {
  CodeBlock,
  CodeBlockActions,
  CodeBlockContent,
  CodeBlockCopyButton,
} from "@neomorphic-react/ui/code-block";

const migration = `create table orders (
  id uuid primary key default gen_random_uuid(),
  customer_id uuid not null references customers (id),
  status text not null default 'pending',
  currency char(3) not null default 'EUR',
  subtotal_cents integer not null check (subtotal_cents >= 0),
  discount_cents integer not null default 0,
  tax_cents integer not null default 0,
  total_cents integer generated always as
    (subtotal_cents - discount_cents + tax_cents) stored,
  placed_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index orders_customer_id_idx on orders (customer_id);
create index orders_status_idx on orders (status);`;

export default function CodeBlockLong() {
  return (
    <CodeBlock className="max-w-xl">
      <CodeBlockActions>
        <CodeBlockCopyButton value={migration} />
      </CodeBlockActions>
      <CodeBlockContent lineNumbers maxLines={6}>
        {migration}
      </CodeBlockContent>
    </CodeBlock>
  );
}
