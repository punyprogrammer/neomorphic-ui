export type ComponentGroupId =
  | "actions"
  | "display"
  | "navigation"
  | "overlays"
  | "pickers"
  | "data"
  | "ai";

export interface ComponentGroup {
  description: string;
  id: ComponentGroupId;
  title: string;
}

export interface ComponentEntry {
  description: string;
  group: ComponentGroupId;
  name: string;
  /** An optional peer dependency the component needs. */
  peer?: string;
  /** The kebab-case import path and docs slug. */
  slug: string;
}

export const componentGroups: ComponentGroup[] = [
  {
    id: "actions",
    title: "Actions and inputs",
    description: "Buttons, toggles and every kind of form control.",
  },
  {
    id: "display",
    title: "Display",
    description: "Surfaces, status and feedback.",
  },
  {
    id: "navigation",
    title: "Disclosure and navigation",
    description: "Show, hide and move between content.",
  },
  {
    id: "overlays",
    title: "Overlays",
    description: "Popups, dialogs, menus and toasts.",
  },
  {
    id: "pickers",
    title: "Pickers",
    description: "Dates, options and commands.",
  },
  {
    id: "data",
    title: "Layout and data",
    description: "Tables, charts, carousels and resizable panes.",
  },
  {
    id: "ai",
    title: "Conversation and AI",
    description: "The parts of a chat or agent interface.",
  },
];

export const components: ComponentEntry[] = [
  // Actions and inputs
  {
    name: "Button",
    slug: "button",
    group: "actions",
    description: "A raised button with icons, sizes and a loading state.",
  },
  {
    name: "Button Group",
    slug: "button-group",
    group: "actions",
    description: "Joins related buttons into one raised slab.",
  },
  {
    name: "Toggle",
    slug: "toggle",
    group: "actions",
    description: "A two-state button that sinks when pressed.",
  },
  {
    name: "Toggle Group",
    slug: "toggle-group",
    group: "actions",
    description: "A set of toggles with single or multiple selection.",
  },
  {
    name: "Input",
    slug: "input",
    group: "actions",
    description: "A text field pressed into the surface.",
  },
  {
    name: "Input Group",
    slug: "input-group",
    group: "actions",
    description: "An input with icons, text or buttons inside its well.",
  },
  {
    name: "Input OTP",
    slug: "input-otp",
    group: "actions",
    description: "One-time code entry, one well per character.",
  },
  {
    name: "Textarea",
    slug: "textarea",
    group: "actions",
    description: "A multi-line text field that can grow with its content.",
  },
  {
    name: "Select",
    slug: "select",
    group: "actions",
    description: "Pick one option from a raised popup list.",
  },
  {
    name: "Native Select",
    slug: "native-select",
    group: "actions",
    description: "The platform's own select, styled as a well.",
  },
  {
    name: "Checkbox",
    slug: "checkbox",
    group: "actions",
    description: "A box that sinks and fills when checked.",
  },
  {
    name: "Radio Group",
    slug: "radio-group",
    group: "actions",
    description: "Pick exactly one of a few options.",
  },
  {
    name: "Switch",
    slug: "switch",
    group: "actions",
    description: "An on/off control with a raised thumb in a well.",
  },
  {
    name: "Slider",
    slug: "slider",
    group: "actions",
    description: "Pick a value or a range along a track.",
  },
  {
    name: "Dial",
    slug: "dial",
    group: "actions",
    description: "A circular value control, like a volume knob.",
  },
  {
    name: "Label",
    slug: "label",
    group: "actions",
    description: "Names a form control.",
  },
  {
    name: "Field",
    slug: "field",
    group: "actions",
    description: "Label, description and validation for one control.",
  },
  // Display
  {
    name: "Surface",
    slug: "surface",
    group: "display",
    description: "The raised or inset panel everything is built from.",
  },
  {
    name: "Card",
    slug: "card",
    group: "display",
    description: "A raised container with header, content and footer.",
  },
  {
    name: "Item",
    slug: "item",
    group: "display",
    description: "A row with media, a title, a description and actions.",
  },
  {
    name: "Badge",
    slug: "badge",
    group: "display",
    description: "A count or dot, on its own or pinned to an element.",
  },
  {
    name: "Chip",
    slug: "chip",
    group: "display",
    description: "A status pill with an optional icon.",
  },
  {
    name: "Avatar",
    slug: "avatar",
    group: "display",
    description: "A picture or initials in a raised frame.",
  },
  {
    name: "Separator",
    slug: "separator",
    group: "display",
    description: "A groove dividing content.",
  },
  {
    name: "Kbd",
    slug: "kbd",
    group: "display",
    description: "A keyboard key or shortcut.",
  },
  {
    name: "Typography",
    slug: "typography",
    group: "display",
    description: "Headings, paragraphs, lists and quotes.",
  },
  {
    name: "Alert",
    slug: "alert",
    group: "display",
    description: "A callout for a status or an error.",
  },
  {
    name: "Empty",
    slug: "empty",
    group: "display",
    description: "What to show when there's nothing to show.",
  },
  {
    name: "Skeleton",
    slug: "skeleton",
    group: "display",
    description: "A placeholder while content loads.",
  },
  {
    name: "Spinner",
    slug: "spinner",
    group: "display",
    description: "An indeterminate loading indicator.",
  },
  {
    name: "Progress",
    slug: "progress",
    group: "display",
    description: "A raised fill moving along a well.",
  },
  {
    name: "Bar Meter",
    slug: "bar-meter",
    group: "display",
    description: "A row of vertical bars, one reading each.",
  },
  {
    name: "Page Indicator",
    slug: "page-indicator",
    group: "display",
    description: "Dots showing which page is current.",
  },
  {
    name: "Aspect Ratio",
    slug: "aspect-ratio",
    group: "display",
    description: "Keeps media at a fixed width-to-height ratio.",
  },
  {
    name: "Scroll Area",
    slug: "scroll-area",
    group: "display",
    description: "A scrolling region with soft scrollbars and edge fades.",
  },
  // Disclosure and navigation
  {
    name: "Collapsible",
    slug: "collapsible",
    group: "navigation",
    description: "Shows and hides one panel.",
  },
  {
    name: "Accordion",
    slug: "accordion",
    group: "navigation",
    description: "A stack of collapsible sections.",
  },
  {
    name: "Tabs",
    slug: "tabs",
    group: "navigation",
    description: "Switch between panels, as raised or line tabs.",
  },
  {
    name: "Breadcrumb",
    slug: "breadcrumb",
    group: "navigation",
    description: "The path to the current page.",
  },
  {
    name: "Pagination",
    slug: "pagination",
    group: "navigation",
    description: "Move between pages of results.",
  },
  {
    name: "Navigation Menu",
    slug: "navigation-menu",
    group: "navigation",
    description: "Site links with rich dropdown panels.",
  },
  {
    name: "Menubar",
    slug: "menubar",
    group: "navigation",
    description: "A desktop-style row of menus.",
  },
  {
    name: "Sidebar",
    slug: "sidebar",
    group: "navigation",
    description: "A collapsible app sidebar with groups and menus.",
  },
  // Overlays
  {
    name: "Tooltip",
    slug: "tooltip",
    group: "overlays",
    description: "A short label shown on hover or focus.",
  },
  {
    name: "Popover",
    slug: "popover",
    group: "overlays",
    description: "Rich content anchored to a trigger.",
  },
  {
    name: "Hover Card",
    slug: "hover-card",
    group: "overlays",
    description: "A preview shown when hovering a link.",
  },
  {
    name: "Dialog",
    slug: "dialog",
    group: "overlays",
    description: "A modal window over the page.",
  },
  {
    name: "Alert Dialog",
    slug: "alert-dialog",
    group: "overlays",
    description: "A dialog that asks to confirm an action.",
  },
  {
    name: "Sheet",
    slug: "sheet",
    group: "overlays",
    description: "A panel that slides in from an edge.",
  },
  {
    name: "Drawer",
    slug: "drawer",
    group: "overlays",
    description: "A bottom sheet you can swipe to close.",
  },
  {
    name: "Dropdown Menu",
    slug: "dropdown-menu",
    group: "overlays",
    description: "Actions and options in a popup menu.",
  },
  {
    name: "Context Menu",
    slug: "context-menu",
    group: "overlays",
    description: "A menu opened by right-click or long press.",
  },
  {
    name: "Toast",
    slug: "toast",
    group: "overlays",
    description: "Brief notifications that stack and dismiss.",
  },
  // Pickers
  {
    name: "Calendar",
    slug: "calendar",
    group: "pickers",
    description: "A month grid for picking dates and ranges.",
    peer: "react-day-picker",
  },
  {
    name: "Date Picker",
    slug: "date-picker",
    group: "pickers",
    description: "A field that opens a calendar.",
    peer: "react-day-picker",
  },
  {
    name: "Combobox",
    slug: "combobox",
    group: "pickers",
    description: "Type to filter options, one or many.",
  },
  {
    name: "Command",
    slug: "command",
    group: "pickers",
    description: "A search list and the ⌘K command palette.",
  },
  // Layout and data
  {
    name: "Table",
    slug: "table",
    group: "data",
    description: "Rows and columns of data.",
  },
  {
    name: "Data Table",
    slug: "data-table",
    group: "data",
    description: "A table with sorting, filtering and pagination.",
    peer: "@tanstack/react-table",
  },
  {
    name: "Resizable",
    slug: "resizable",
    group: "data",
    description: "Panels separated by draggable handles.",
    peer: "react-resizable-panels",
  },
  {
    name: "Carousel",
    slug: "carousel",
    group: "data",
    description: "Slides that swipe and snap.",
    peer: "embla-carousel-react",
  },
  {
    name: "Chart",
    slug: "chart",
    group: "data",
    description: "Themed charts with tooltips and legends.",
    peer: "recharts",
  },
  // Conversation and AI
  {
    name: "Bubble",
    slug: "bubble",
    group: "ai",
    description: "One chat bubble, with optional reactions.",
  },
  {
    name: "Message",
    slug: "message",
    group: "ai",
    description: "One turn in a conversation, with avatar and actions.",
  },
  {
    name: "Marker",
    slug: "marker",
    group: "ai",
    description: "A line of status in a transcript.",
  },
  {
    name: "Attachment",
    slug: "attachment",
    group: "ai",
    description: "A file in a composer or a message.",
  },
  {
    name: "Trace",
    slug: "trace",
    group: "ai",
    description: "An agent's working steps.",
  },
  {
    name: "Code Block",
    slug: "code-block",
    group: "ai",
    description: "Code with copy, wrap, line numbers and diffs.",
  },
  {
    name: "Message Scroller",
    slug: "message-scroller",
    group: "ai",
    description: "A transcript that follows new messages.",
  },
  {
    name: "Questionnaire",
    slug: "questionnaire",
    group: "ai",
    description: "A multi-step form, one question at a time.",
  },
];
