---
number: 31
subject: "add-phase-4-components"
date: 2026-10-15T11:50:14+05:30
author: "punyprogrammer"
files: 154
insertions: 25113
deletions: 103
---

<!-- nav --> [← 0029](0029-add-chip.md) · [Index](README.md) · latest →

# 0031 · add-phase-4-components

> _No commit body. Commit without `-m` and write a body to explain the why; it appears here._

## Overview

|  |  |
| --- | --- |
| Number | 31 |
| Commit | the commit that adds this file: `git log -1 --format=%h -- commits/0031-add-phase-4-components.md` |
| Parent | `2c4631b` |
| Author | punyprogrammer <johnmayer190999@gmail.com> |
| Date | 2026-10-15T11:50:14+05:30 |
| Branch | `feat/phase-4-plan` |
| Changes | 154 files · +25113 −103 |

## Components

| Status | File | Exports | API change |
| --- | --- | --- | --- |
| Added | `accordion.tsx` | `AccordionContentProps`, `AccordionItemProps`, `AccordionProps`, `AccordionTriggerProps`, `Accordion`, `AccordionContent`, `AccordionItem`, `AccordionTrigger`, `accordionVariants` |  |
| Added | `alert-dialog.tsx` | `AlertDialogActionProps`, `AlertDialogCancelProps`, `AlertDialogContentProps`, `AlertDialogDescriptionProps`, `AlertDialogFooterProps`, `AlertDialogHeaderProps`, `AlertDialogMediaProps`, `AlertDialogProps`, `AlertDialogTitleProps`, `AlertDialogTriggerProps`, `AlertDialog`, `AlertDialogAction`, `AlertDialogCancel`, `AlertDialogContent`, `AlertDialogDescription`, `AlertDialogFooter`, `AlertDialogHeader`, `AlertDialogMedia`, `AlertDialogTitle`, `AlertDialogTrigger` |  |
| Added | `alert.tsx` | `AlertActionProps`, `AlertDescriptionProps`, `AlertProps`, `AlertTitleProps`, `Alert`, `AlertAction`, `AlertDescription`, `AlertTitle`, `alertVariants` |  |
| Added | `aspect-ratio.tsx` | `AspectRatioProps`, `AspectRatio` |  |
| Added | `attachment.tsx` | `AttachmentActionProps`, `AttachmentActionsProps`, `AttachmentContentProps`, `AttachmentDescriptionProps`, `AttachmentGroupProps`, `AttachmentMediaProps`, `AttachmentProgressProps`, `AttachmentProps`, `AttachmentState`, `AttachmentTitleProps`, `AttachmentTriggerProps`, `Attachment`, `AttachmentAction`, `AttachmentActions`, `AttachmentContent`, `AttachmentDescription`, `AttachmentGroup`, `AttachmentMedia`, `AttachmentProgress`, `AttachmentTitle`, `AttachmentTrigger`, `attachmentMediaVariants`, `attachmentVariants` |  |
| Added | `breadcrumb.tsx` | `BreadcrumbEllipsisProps`, `BreadcrumbItemProps`, `BreadcrumbLinkProps`, `BreadcrumbListProps`, `BreadcrumbPageProps`, `BreadcrumbProps`, `BreadcrumbSeparatorProps`, `Breadcrumb`, `BreadcrumbEllipsis`, `BreadcrumbItem`, `BreadcrumbLink`, `BreadcrumbList`, `BreadcrumbPage`, `BreadcrumbSeparator` |  |
| Added | `bubble.tsx` | `BubbleContentProps`, `BubbleGroupProps`, `BubbleProps`, `BubbleReactionsProps`, `BubbleVariant`, `Bubble`, `BubbleContent`, `BubbleGroup`, `BubbleReactions`, `bubbleContentVariants` |  |
| Added | `carousel.tsx` | `CarouselApi`, `CarouselButtonProps`, `CarouselContentProps`, `CarouselIndicatorProps`, `CarouselItemProps`, `CarouselOptions`, `CarouselPlugin`, `CarouselProps`, `Carousel`, `CarouselContent`, `CarouselIndicator`, `CarouselItem`, `CarouselNext`, `CarouselPrevious`, `useCarousel` |  |
| Added | `chart.tsx` | `ChartConfig`, `ChartContainerProps`, `ChartLegendContentProps`, `ChartTooltipContentProps`, `ChartContainer`, `ChartLegend`, `ChartLegendContent`, `ChartTooltip`, `ChartTooltipContent`, `useChart` |  |
| Added | `code-block.tsx` | `CodeBlockActionsProps`, `CodeBlockContentProps`, `CodeBlockCopyButtonProps`, `CodeBlockFooterProps`, `CodeBlockHeaderProps`, `CodeBlockLineProps`, `CodeBlockProps`, `CodeBlockTitleProps`, `CodeBlockWrapButtonProps`, `CodeBlock`, `CodeBlockActions`, `CodeBlockContent`, `CodeBlockCopyButton`, `CodeBlockFooter`, `CodeBlockHeader`, `CodeBlockLine`, `CodeBlockTitle`, `CodeBlockWrapButton`, `codeBlockLineVariants`, `codeBlockVariants` |  |
| Added | `collapsible.tsx` | `CollapsibleContentProps`, `CollapsibleIndicatorProps`, `CollapsibleProps`, `CollapsibleTriggerProps`, `Collapsible`, `CollapsibleContent`, `CollapsibleIndicator`, `CollapsibleTrigger` |  |
| Added | `combobox.tsx` | `ComboboxProps`, `ComboboxChipProps`, `ComboboxChipsInputProps`, `ComboboxChipsProps`, `ComboboxClearProps`, `ComboboxCollectionProps`, `ComboboxContentProps`, `ComboboxEmptyProps`, `ComboboxGroupProps`, `ComboboxInputProps`, `ComboboxItemProps`, `ComboboxLabelProps`, `ComboboxListProps`, `ComboboxSeparatorProps`, `ComboboxTriggerProps`, `ComboboxValueProps`, `Combobox`, `ComboboxChip`, `ComboboxChips`, `ComboboxChipsInput`, `ComboboxClear`, `ComboboxCollection`, `ComboboxContent`, `ComboboxEmpty`, `ComboboxGroup`, `ComboboxInput`, `ComboboxItem`, `ComboboxLabel`, `ComboboxList`, `ComboboxSeparator`, `ComboboxTrigger`, `ComboboxValue`, `useComboboxAnchor` |  |
| Added | `command.tsx` | `CommandCollectionProps`, `CommandDialogProps`, `CommandEmptyProps`, `CommandGroupProps`, `CommandInputProps`, `CommandItemProps`, `CommandListProps`, `CommandProps`, `CommandSeparatorProps`, `CommandShortcutProps`, `Command`, `CommandCollection`, `CommandDialog`, `CommandEmpty`, `CommandGroup`, `CommandInput`, `CommandItem`, `CommandList`, `CommandSeparator`, `CommandShortcut` |  |
| Added | `context-menu.tsx` | `ContextMenuContentProps`, `ContextMenuProps`, `ContextMenuTriggerProps`, `ContextMenuCheckboxItemProps`, `ContextMenuGroupProps`, `ContextMenuItemProps`, `ContextMenuLabelProps`, `ContextMenuRadioGroupProps`, `ContextMenuRadioItemProps`, `ContextMenuSeparatorProps`, `ContextMenuShortcutProps`, `ContextMenuSubProps`, `ContextMenuSubTriggerProps`, `ContextMenu`, `ContextMenuContent`, `ContextMenuTrigger`, `ContextMenuCheckboxItem`, `ContextMenuGroup`, `ContextMenuItem`, `ContextMenuLabel`, `ContextMenuRadioGroup`, `ContextMenuRadioItem`, `ContextMenuSeparator`, `ContextMenuShortcut`, `ContextMenuSub`, `ContextMenuSubContent`, `ContextMenuSubTrigger` |  |
| Added | `date-picker.tsx` | `DateRange`, `DatePickerInputProps`, `DatePickerProps`, `DatePreset`, `DateRangePickerProps`, `DatePicker`, `DatePickerInput`, `DateRangePicker` |  |
| Added | `dialog.tsx` | `DialogBodyProps`, `DialogCloseProps`, `DialogContentProps`, `DialogDescriptionProps`, `DialogFooterProps`, `DialogHeaderProps`, `DialogOverlayProps`, `DialogPortalProps`, `DialogProps`, `DialogTitleProps`, `DialogTriggerProps`, `Dialog`, `DialogBody`, `DialogClose`, `DialogContent`, `DialogDescription`, `DialogFooter`, `DialogHeader`, `DialogOverlay`, `DialogPortal`, `DialogTitle`, `DialogTrigger`, `dialogCloseIconClassName` |  |
| Added | `direction.tsx` | `DirectionProviderProps`, `TextDirection`, `DirectionProvider`, `useDirection` |  |
| Added | `drawer.tsx` | `DrawerCloseProps`, `DrawerContentProps`, `DrawerDescriptionProps`, `DrawerDirection`, `DrawerFooterProps`, `DrawerHeaderProps`, `DrawerProps`, `DrawerTitleProps`, `DrawerTriggerProps`, `Drawer`, `DrawerClose`, `DrawerContent`, `DrawerDescription`, `DrawerFooter`, `DrawerHeader`, `DrawerTitle`, `DrawerTrigger` |  |
| Added | `dropdown-menu.tsx` | `DropdownMenuContentProps`, `DropdownMenuProps`, `DropdownMenuTriggerProps`, `DropdownMenuCheckboxItemProps`, `DropdownMenuGroupProps`, `DropdownMenuItemProps`, `DropdownMenuLabelProps`, `DropdownMenuRadioGroupProps`, `DropdownMenuRadioItemProps`, `DropdownMenuSeparatorProps`, `DropdownMenuShortcutProps`, `DropdownMenuSubProps`, `DropdownMenuSubTriggerProps`, `DropdownMenu`, `DropdownMenuContent`, `DropdownMenuTrigger`, `DropdownMenuCheckboxItem`, `DropdownMenuGroup`, `DropdownMenuItem`, `DropdownMenuLabel`, `DropdownMenuRadioGroup`, `DropdownMenuRadioItem`, `DropdownMenuSeparator`, `DropdownMenuShortcut`, `DropdownMenuSub`, `DropdownMenuSubContent`, `DropdownMenuSubTrigger` |  |
| Added | `empty.tsx` | `EmptyContentProps`, `EmptyDescriptionProps`, `EmptyHeaderProps`, `EmptyMediaProps`, `EmptyProps`, `EmptyTitleProps`, `Empty`, `EmptyContent`, `EmptyDescription`, `EmptyHeader`, `EmptyMedia`, `EmptyTitle`, `emptyMediaVariants`, `emptyVariants` |  |
| Added | `field.tsx` | `FieldContentProps`, `FieldDescriptionProps`, `FieldErrorProps`, `FieldGroupProps`, `FieldLabelProps`, `FieldLegendProps`, `FieldProps`, `FieldSeparatorProps`, `FieldSetProps`, `FieldTitleProps`, `Field`, `FieldContent`, `FieldDescription`, `FieldError`, `FieldGroup`, `FieldLabel`, `FieldLegend`, `FieldSeparator`, `FieldSet`, `FieldTitle`, `fieldVariants` |  |
| Added | `hover-card.tsx` | `HoverCardContentProps`, `HoverCardProps`, `HoverCardTriggerProps`, `HoverCard`, `HoverCardContent`, `HoverCardTrigger` |  |
| Modified | `input-group.tsx` | `InputGroupAddonProps`, `InputGroupButtonProps`, `InputGroupInputProps`, `InputGroupProps`, `InputGroupTextareaProps`, `InputGroupTextProps`, `InputGroup`, `InputGroupAddon`, `InputGroupButton`, `InputGroupInput`, `InputGroupText`, `InputGroupTextarea`, `inputGroupAddonVariants`, `inputGroupVariants` | API unchanged |
| Added | `input-otp.tsx` | `InputOTPGroupProps`, `InputOTPProps`, `InputOTPSeparatorProps`, `InputOTPSlotProps`, `InputOTP`, `InputOTPGroup`, `InputOTPSeparator`, `InputOTPSlot`, `inputOTPSlotVariants` |  |
| Added | `kbd.tsx` | `KbdGroupProps`, `KbdProps`, `Kbd`, `KbdGroup`, `kbdVariants` |  |
| Added | `label.tsx` | `LabelProps`, `Label`, `labelClassName` |  |
| Added | `marker.tsx` | `MarkerContentProps`, `MarkerIconProps`, `MarkerProps`, `Marker`, `MarkerContent`, `MarkerIcon`, `markerVariants` |  |
| Added | `menu-parts.tsx` | `MenuCheckboxItemProps`, `MenuContentProps`, `MenuGroupProps`, `MenuItemProps`, `MenuLabelProps`, `MenuRadioGroupProps`, `MenuRadioItemProps`, `MenuSeparatorProps`, `MenuShortcutProps`, `MenuSlotPrefix`, `MenuSubProps`, `MenuSubTriggerProps`, `MenuCheckboxItem`, `MenuGroup`, `MenuItem`, `MenuLabel`, `MenuPopupContent`, `MenuRadioGroup`, `MenuRadioItem`, `MenuSeparator`, `MenuShortcut`, `MenuSlotContext`, `MenuSub`, `MenuSubContent`, `MenuSubTrigger` |  |
| Added | `menubar.tsx` | `MenubarContentProps`, `MenubarMenuProps`, `MenubarProps`, `MenubarTriggerProps`, `MenubarCheckboxItemProps`, `MenubarGroupProps`, `MenubarItemProps`, `MenubarLabelProps`, `MenubarRadioGroupProps`, `MenubarRadioItemProps`, `MenubarSeparatorProps`, `MenubarShortcutProps`, `MenubarSubProps`, `MenubarSubTriggerProps`, `Menubar`, `MenubarContent`, `MenubarMenu`, `MenubarTrigger`, `MenubarCheckboxItem`, `MenubarGroup`, `MenubarItem`, `MenubarLabel`, `MenubarRadioGroup`, `MenubarRadioItem`, `MenubarSeparator`, `MenubarShortcut`, `MenubarSub`, `MenubarSubContent`, `MenubarSubTrigger` |  |
| Added | `message-scroller.tsx` | `MessageScrollerButtonProps`, `MessageScrollerContentProps`, `MessageScrollerItemProps`, `MessageScrollerProps`, `MessageScrollerProviderProps`, `MessageScrollerViewportProps`, `Scrollable`, `ScrollCommandOptions`, `ScrollPosition`, `MessageScroller`, `MessageScrollerButton`, `MessageScrollerContent`, `MessageScrollerItem`, `MessageScrollerProvider`, `MessageScrollerViewport`, `useMessageScroller`, `useMessageScrollerScrollable` |  |
| Added | `message.tsx` | `MessageAvatarProps`, `MessageContentProps`, `MessageFooterProps`, `MessageGroupProps`, `MessageHeaderProps`, `MessageProps`, `Message`, `MessageAvatar`, `MessageContent`, `MessageFooter`, `MessageGroup`, `MessageHeader` |  |
| Added | `native-select.tsx` | `NativeSelectOptGroupProps`, `NativeSelectOptionProps`, `NativeSelectProps`, `NativeSelect`, `NativeSelectOptGroup`, `NativeSelectOption`, `nativeSelectVariants` |  |
| Added | `navigation-menu.tsx` | `NavigationMenuContentProps`, `NavigationMenuItemProps`, `NavigationMenuLinkProps`, `NavigationMenuListProps`, `NavigationMenuProps`, `NavigationMenuTriggerProps`, `NavigationMenu`, `NavigationMenuContent`, `NavigationMenuItem`, `NavigationMenuLink`, `NavigationMenuList`, `NavigationMenuTrigger`, `navigationMenuTriggerStyle` |  |
| Added | `pagination.tsx` | `PaginationContentProps`, `PaginationEllipsisProps`, `PaginationItemProps`, `PaginationLinkProps`, `PaginationNextProps`, `PaginationPreviousProps`, `PaginationProps`, `Pagination`, `PaginationContent`, `PaginationEllipsis`, `PaginationItem`, `PaginationLink`, `PaginationNext`, `PaginationPrevious` |  |
| Added | `popover.tsx` | `PopoverCloseProps`, `PopoverContentProps`, `PopoverDescriptionProps`, `PopoverHeaderProps`, `PopoverProps`, `PopoverTitleProps`, `PopoverTriggerProps`, `Popover`, `PopoverClose`, `PopoverContent`, `PopoverDescription`, `PopoverHeader`, `PopoverTitle`, `PopoverTrigger` |  |
| Added | `questionnaire.tsx` | `QuestionnaireActionsProps`, `QuestionnaireAnswer`, `QuestionnaireButtonProps`, `QuestionnaireChoiceDescriptionProps`, `QuestionnaireChoiceProps`, `QuestionnaireChoicesProps`, `QuestionnaireDescriptionProps`, `QuestionnaireErrorProps`, `QuestionnaireInputProps`, `QuestionnaireItemProps`, `QuestionnaireProgressProps`, `QuestionnaireProps`, `QuestionnaireTitleProps`, `QuestionnaireValues`, `Questionnaire`, `QuestionnaireActions`, `QuestionnaireChoice`, `QuestionnaireChoiceDescription`, `QuestionnaireChoices`, `QuestionnaireDescription`, `QuestionnaireError`, `QuestionnaireInput`, `QuestionnaireItem`, `QuestionnaireNext`, `QuestionnairePrevious`, `QuestionnaireProgress`, `QuestionnaireSkip`, `QuestionnaireSubmit`, `QuestionnaireTitle`, `useQuestionnaire` |  |
| Added | `resizable.tsx` | `ResizableHandleProps`, `ResizablePanelGroupProps`, `ResizablePanelProps`, `ResizableHandle`, `ResizablePanel`, `ResizablePanelGroup` |  |
| Added | `scroll-area.tsx` | `ScrollAreaProps`, `ScrollBarProps`, `ScrollArea`, `ScrollBar` |  |
| Modified | `select.tsx` | `SelectContentProps`, `SelectGroupLabelProps`, `SelectGroupProps`, `SelectItemProps`, `SelectLabelProps`, `SelectSeparatorProps`, `SelectTriggerProps`, `SelectValueProps`, `Select`, `SelectContent`, `SelectGroup`, `SelectGroupLabel`, `SelectItem`, `SelectLabel`, `SelectSeparator`, `SelectTrigger`, `SelectValue`, `selectTriggerVariants` | API unchanged |
| Added | `sheet.tsx` | `SheetCloseProps`, `SheetContentProps`, `SheetDescriptionProps`, `SheetFooterProps`, `SheetHeaderProps`, `SheetProps`, `SheetSide`, `SheetTitleProps`, `SheetTriggerProps`, `Sheet`, `SheetClose`, `SheetContent`, `SheetDescription`, `SheetFooter`, `SheetHeader`, `SheetTitle`, `SheetTrigger` |  |
| Added | `sidebar.tsx` | `SidebarGroupActionProps`, `SidebarGroupLabelProps`, `SidebarMenuActionProps`, `SidebarMenuButtonProps`, `SidebarMenuSkeletonProps`, `SidebarMenuSubButtonProps`, `SidebarProps`, `SidebarProviderProps`, `SidebarRailProps`, `SidebarTriggerProps`, `Sidebar`, `SidebarContent`, `SidebarFooter`, `SidebarGroup`, `SidebarGroupAction`, `SidebarGroupContent`, `SidebarGroupLabel`, `SidebarHeader`, `SidebarInput`, `SidebarInset`, `SidebarMenu`, `SidebarMenuAction`, `SidebarMenuBadge`, `SidebarMenuButton`, `SidebarMenuItem`, `SidebarMenuSkeleton`, `SidebarMenuSub`, `SidebarMenuSubButton`, `SidebarMenuSubItem`, `SidebarProvider`, `SidebarRail`, `SidebarSeparator`, `SidebarTrigger`, `sidebarMenuButtonVariants`, `useIsMobile`, `useSidebar` |  |
| Added | `skeleton.tsx` | `SkeletonProps`, `Skeleton`, `skeletonVariants` |  |
| Added | `table.tsx` | `TableBodyProps`, `TableCaptionProps`, `TableCellProps`, `TableFooterProps`, `TableHeaderProps`, `TableHeadProps`, `TableProps`, `TableRowProps`, `Table`, `TableBody`, `TableCaption`, `TableCell`, `TableFooter`, `TableHead`, `TableHeader`, `TableRow` |  |
| Added | `tabs.tsx` | `TabsContentProps`, `TabsListProps`, `TabsProps`, `TabsTriggerProps`, `Tabs`, `TabsContent`, `TabsList`, `TabsTrigger`, `tabsListVariants` |  |
| Modified | `textarea.tsx` | `TextareaProps`, `Textarea`, `textareaVariants` | API unchanged |
| Added | `toast.tsx` | `ToastAction`, `ToasterProps`, `ToastInput`, `ToastOptions`, `ToastPosition`, `ToastPromiseOptions`, `ToastType`, `Toaster`, `toast` |  |
| Added | `trace.tsx` | `TraceCollapsibleContentProps`, `TraceCollapsibleProps`, `TraceCollapsibleTriggerProps`, `TraceDescriptionProps`, `TraceIconProps`, `TraceLineProps`, `TraceProps`, `TraceTitleProps`, `Trace`, `TraceCollapsible`, `TraceCollapsibleContent`, `TraceCollapsibleTrigger`, `TraceDescription`, `TraceIcon`, `TraceLine`, `TraceTitle` |  |
| Added | `typography.tsx` | `TypographyProps`, `TypographyBlockquote`, `TypographyH1`, `TypographyH2`, `TypographyH3`, `TypographyH4`, `TypographyInlineCode`, `TypographyLarge`, `TypographyLead`, `TypographyList`, `TypographyMuted`, `TypographyP`, `TypographySmall` |  |
| Added | `use-highlighted-code.tsx` | `HighlightedCode`, `UseHighlightedCodeOptions`, `useHighlightedCode` |  |

## Tests

| Status | File | Test blocks |
| --- | --- | --- |
| Added | `packages/ui/src/accordion.test.tsx` | 5 |
| Added | `packages/ui/src/alert-dialog.test.tsx` | 4 |
| Added | `packages/ui/src/alert.test.tsx` | 4 |
| Added | `packages/ui/src/aspect-ratio.test.tsx` | 2 |
| Added | `packages/ui/src/attachment.test.tsx` | 4 |
| Added | `packages/ui/src/breadcrumb.test.tsx` | 6 |
| Added | `packages/ui/src/bubble.test.tsx` | 4 |
| Added | `packages/ui/src/carousel.test.tsx` | 3 |
| Added | `packages/ui/src/chart.test.tsx` | 4 |
| Added | `packages/ui/src/code-block.test.tsx` | 7 |
| Added | `packages/ui/src/collapsible.test.tsx` | 3 |
| Added | `packages/ui/src/combobox.test.tsx` | 7 |
| Added | `packages/ui/src/command.test.tsx` | 5 |
| Added | `packages/ui/src/context-menu.test.tsx` | 1 |
| Added | `packages/ui/src/date-picker.test.tsx` | 5 |
| Added | `packages/ui/src/dialog.test.tsx` | 4 |
| Added | `packages/ui/src/direction.test.tsx` | 2 |
| Added | `packages/ui/src/drawer.test.tsx` | 3 |
| Added | `packages/ui/src/dropdown-menu.test.tsx` | 6 |
| Added | `packages/ui/src/empty.test.tsx` | 3 |
| Added | `packages/ui/src/field.test.tsx` | 8 |
| Added | `packages/ui/src/hover-card.test.tsx` | 2 |
| Added | `packages/ui/src/input-otp.test.tsx` | 4 |
| Added | `packages/ui/src/kbd.test.tsx` | 3 |
| Added | `packages/ui/src/marker.test.tsx` | 3 |
| Added | `packages/ui/src/menubar.test.tsx` | 2 |
| Added | `packages/ui/src/message-scroller.test.tsx` | 5 |
| Added | `packages/ui/src/message.test.tsx` | 2 |
| Added | `packages/ui/src/native-select.test.tsx` | 4 |
| Added | `packages/ui/src/navigation-menu.test.tsx` | 3 |
| Added | `packages/ui/src/pagination.test.tsx` | 5 |
| Added | `packages/ui/src/popover.test.tsx` | 3 |
| Added | `packages/ui/src/questionnaire.test.tsx` | 5 |
| Added | `packages/ui/src/resizable.test.tsx` | 2 |
| Added | `packages/ui/src/scroll-area.test.tsx` | 2 |
| Added | `packages/ui/src/sheet.test.tsx` | 3 |
| Added | `packages/ui/src/sidebar.test.tsx` | 6 |
| Added | `packages/ui/src/skeleton.test.tsx` | 2 |
| Added | `packages/ui/src/table.test.tsx` | 6 |
| Added | `packages/ui/src/tabs.test.tsx` | 5 |
| Added | `packages/ui/src/toast.test.tsx` | 5 |
| Added | `packages/ui/src/trace.test.tsx` | 2 |
| Added | `packages/ui/src/typography.test.tsx` | 4 |

Counts `it` / `test` blocks; an `it.each` table counts once.

## Stories

| Status | File | Stories |
| --- | --- | --- |
| Added | `accordion.stories.tsx` | Default, Keyboard, FlatInCard, Disabled |
| Added | `alert-dialog.stories.tsx` | Default, SmallWithMedia |
| Added | `alert.stories.tsx` | Default, Variants, WithAction |
| Added | `aspect-ratio.stories.tsx` | Default, InACard |
| Added | `attachment.stories.tsx` | Default, States, Sizes, Group, ImageUploading |
| Modified | `chat-thread.stories.tsx` | no stories added or removed |
| Added | `data-table.stories.tsx` | Default, Empty |
| Added | `breadcrumb.stories.tsx` | Default, Collapsed, CustomSeparator |
| Added | `bubble.stories.tsx` | Default, Variants, Reactions, GroupAndSuggestions |
| Added | `carousel.stories.tsx` | Default, Several, Vertical |
| Added | `chart.stories.tsx` | BarDefault, AreaStacked, LineDots, PieDonut, RadarDefault, Radial |
| Added | `code-block.stories.tsx` | Default, Diff, LongWithFloatingActions, ErrorOutput, SyntaxHighlighting |
| Added | `collapsible.stories.tsx` | Default, TextTrigger |
| Added | `combobox.stories.tsx` | Default, Grouped, Multiple, SearchableSelect |
| Added | `command.stories.tsx` | Default, Dialog |
| Added | `context-menu.stories.tsx` | Default |
| Added | `date-picker.stories.tsx` | Default, WithPresets, Range, TypedInput |
| Added | `dialog.stories.tsx` | Default, Scrolling |
| Added | `direction.stories.tsx` | RightToLeft |
| Added | `drawer.stories.tsx` | Default, SnapPoints, Side |
| Added | `dropdown-menu.stories.tsx` | Default, CheckboxAndRadio |
| Added | `empty.stories.tsx` | Default, InAWell |
| Added | `field.stories.tsx` | Default, Validation, Form, ChoiceCards, PlainLabel |
| Added | `hover-card.stories.tsx` | Default |
| Added | `input-otp.stories.tsx` | Default, InAField, Sizes |
| Added | `kbd.stories.tsx` | Default, InContext |
| Added | `marker.stories.tsx` | Default, Variants, Status |
| Added | `menubar.stories.tsx` | Default |
| Added | `message-scroller.stories.tsx` | Default, LoadEarlier, JumpToMessage |
| Added | `message.stories.tsx` | Default, Conversation, Assistant |
| Added | `native-select.stories.tsx` | Default, Groups, Sizes |
| Added | `navigation-menu.stories.tsx` | Default |
| Added | `pagination.stories.tsx` | Default, Small |
| Added | `popover.stories.tsx` | Default, Sides |
| Added | `questionnaire.stories.tsx` | Default, Resumed, TypedAnswer |
| Added | `resizable.stories.tsx` | Default, WithHandle |
| Added | `scroll-area.stories.tsx` | Default, Horizontal |
| Added | `sheet.stories.tsx` | Default, Sides |
| Added | `sidebar.stories.tsx` | Default, Offcanvas, Floating, Inset, Loading |
| Added | `skeleton.stories.tsx` | Default, CardLoading |
| Added | `table.stories.tsx` | Default, Selectable, StickyHeader |
| Added | `tabs.stories.tsx` | Default, Keyboard, Line, Vertical |
| Added | `toast.stories.tsx` | Default, WithAction, TrackPromise |
| Added | `trace.stories.tsx` | Default |
| Added | `typography.stories.tsx` | Article, Scale |

## Design tokens and CSS

### `packages/ui/src/base.css`

- **Added:** `--animate-neu-shimmer`
- **Added utilities:** `neu-shimmer`, `neu-shimmer-text`, `neu-scrollbar`

### `packages/ui/src/theme.css`

- **Added:** `--color-chart-1`, `--color-chart-2`, `--color-chart-3`, `--color-chart-4`, `--color-chart-5`, `--neu-backdrop`, `--chart-1`, `--chart-2`, `--chart-3`, `--chart-4`, `--chart-5`

## Versioning

### Changesets

| Status | File | Bumps | Summary |
| --- | --- | --- | --- |
| Added | `neu-phase-4a-forms-text.md` | `@neomorphic-ui/react` minor | Add the Phase 4 form and text components, each on its own subpath: `Label`, `Field` (with `FieldLabel`, `FieldDescription`, `FieldError`, `FieldGroup`, `FieldSet`, `FieldLegend` and `FieldSeparator`; a `FieldLabel` wrapped around a `Field` makes a raised choice card that presses in when checked), `NativeSelect`, `InputOTP`, `Kbd` and `KbdGroup`, the `Typography*` parts (`TypographyH1`–`H4`, paragraph, lead, blockquote, list, inline code and more), `Alert` (default, info, success, warning and destructive; `role="status"` unless urgent), `Empty`, `Skeleton`, `AspectRatio`, `DirectionProvider`/`useDirection`, and `ScrollArea` (groove track with a raised thumb). Adds the shared theme pieces later groups use: the `neu-shimmer` and `neu-shimmer-text` utilities (static under reduced motion), the `--neu-backdrop` overlay tint and the `--chart-1`…`--chart-5` tokens. |
| Added | `neu-phase-4b-disclosure-navigation.md` | `@neomorphic-ui/react` minor | Add the Phase 4 disclosure and navigation components: `Collapsible` (rotating `CollapsibleIndicator`, animated height), `Accordion` (raised panels whose open trigger presses in; `flat` variant with grooves for use inside a Card), `Tabs` (a well slides under the active tab; `line` variant), `Breadcrumb` (current page pressed in with `aria-current="page"`), `Pagination` (raised page buttons, current one pressed in and primary) and `Table` (rows split by grooves, sticky header, flat, raised or inset container, tinted selected rows). Links take `render` for router components. |
| Added | `neu-phase-4c-overlays.md` | `@neomorphic-ui/react` minor | Add the Phase 4 overlays, all sharing one raised popup style (which `Select` now uses too): `Popover`, `HoverCard`, `Dialog` (blurred backdrop, sm/md/lg, scrolling `DialogBody`), `AlertDialog` (no outside dismiss), `Sheet` (slides in from any edge; start/end follow RTL), `Drawer` (swipe to dismiss, snap points), `DropdownMenu`, `ContextMenu` and `Menubar` (checkbox and radio items, submenus, shortcuts, destructive items), `NavigationMenu` (a viewport panel that resizes between triggers) and `Toast` (`Toaster` plus `toast()` with `.success`, `.info`, `.warning`, `.error`, `.loading` and `.promise`). Built on Base UI, so no Radix, `cmdk`, `vaul` or `sonner`. |
| Added | `neu-phase-4d-pickers.md` | `@neomorphic-ui/react` minor | Add the Phase 4 pickers: `Combobox` (an input in an `InputGroup` well with a filtered raised list, groups, and `multiple` values as raised chips), `Command` (an always-open search list, plus `CommandDialog` for a ⌘K palette, built on Base UI Autocomplete) and `DatePicker`/`DateRangePicker` (a Calendar behind a raised field trigger, with presets, a typed `DatePickerInput` that syncs both ways, and a hidden `yyyy-mm-dd` input when given a `name`). |
| Added | `neu-phase-4e-layout-data.md` | `@neomorphic-ui/react` minor | Add the Phase 4 layout and data components: `Resizable` (panels split by a groove handle with an optional raised grip; uses `react-resizable-panels`), `Carousel` (raised previous/next buttons and a `PageIndicator`, RTL-aware arrow keys; uses `embla-carousel-react`), `Sidebar` (sidebar, floating and inset variants that collapse off-canvas or to icons, a Sheet on small screens, ⌘B/Ctrl+B, menus whose active row presses in) and `Chart` (`ChartContainer` turns a config into colour, bar-fill and area-fade variables; raised `ChartTooltipContent` and `ChartLegendContent`; uses `recharts`). Each third-party library is only loaded from its component's subpath. |
| Added | `neu-phase-4f-conversation-ai.md` | `@neomorphic-ui/react` minor | Add the Phase 4 conversation and AI components: `Bubble` (primary, raised, inset, tinted, outline, ghost and destructive chat bubbles, with `BubbleReactions`), `Message` (row layout with avatar, header and footer), `Marker` (inline status or "Today" separator, optional shimmer), `Attachment` (raised file tile with uploading, processing, error and done states, and a snapping `AttachmentGroup` row), `Trace` (agent steps with running, pending and error status and collapsible detail), `CodeBlock` (inset well with copy and wrap actions, line numbers, diff lines and Show more), `MessageScroller` (opens at the latest turn, follows streamed output only at the live edge, anchors new questions near the top, keeps place when history is prepended, and offers a jump-to-latest button) and `Questionnaire` (one question per step, choice cards with number-key shortcuts, validation, conditional and resumable steps). Syntax highlighting is opt-in through `useHighlightedCode` (`@neomorphic-ui/react/use-highlighted-code`), which loads `shiki`, a new optional peer dependency, on first use. |

## Dependencies and scripts

### `apps/storybook/package.json`

| Change | Name | Version / command | Field |
| --- | --- | --- | --- |
| Added | `@tanstack/react-table` | `^8.21.3` | dependencies |
| Added | `recharts` | `^3.10.1` | dependencies |
| Added | `shiki` | `^4.5.0` | dependencies |

### `packages/ui/package.json`

| Change | Name | Version / command | Field |
| --- | --- | --- | --- |
| Added | `embla-carousel-react` | `^8.6.0` | dependencies |
| Added | `react-resizable-panels` | `^4.14.5` | dependencies |
| Added | `recharts` | `^3.10.1` | dependencies |
| Added | `shiki` | `^4.5.0` | devDependencies |
| Added | `shiki` | `^4.0.0` | peerDependencies |

## Roadmap

Checklist lines added or changed in `ROADMAP.md`.

- [x] `popupVariants`: one raised popup style (surface, `shadow-neu-lg`, radius, scale/fade in/out) pulled out of `Select` and `Tooltip` and reused by every overlay and picker below (internal `popup.ts`: popup, item, label, separator and backdrop classes; `Select` now uses it)
- [x] Backdrop: `--neu-backdrop` (surface tint + light blur) for Dialog, Alert Dialog, Sheet and Drawer; `--z-*` tokens already exist in `base.css`
- [x] `animate-neu-shimmer` utility for loading text and placeholders (Skeleton, Attachment, Trace, Marker), static under `prefers-reduced-motion` (`neu-shimmer` for surfaces, `neu-shimmer-text` for text)
- [x] Chart tokens `--chart-1`…`--chart-5`, folded into the Phase 0 accent tokens (each at least 3:1 against the surface)
- [x] New dependencies (each component on its own subpath so unused ones never ship): `embla-carousel-react` (Carousel), `react-resizable-panels` (Resizable), `recharts` (Chart), `@tanstack/react-table` (Data Table block only), `shiki` (optional highlighting for Code Block)
- [x] Keep the "no Radix" rule: use Base UI Autocomplete instead of `cmdk`, Base UI Drawer instead of `vaul`, Base UI Toast instead of `sonner`
- [x] Decide on overlays not in the kit: Popover, DropdownMenu, Modal, Drawer, Toast, Alert (planned in Phase 4)
- [x] Label: styled `<label>`, disabled/invalid states follow the control (`peer`/`group` data attributes); `labelClassName` exported; tested with Field, `PlainLabel` story
- [x] Field: `Field`, `FieldLabel`, `FieldDescription`, `FieldError`, `FieldGroup`, `FieldSet`/`FieldLegend`, `FieldSeparator`, vertical/horizontal/responsive; wires `aria-describedby`/`aria-invalid` into Input, Textarea, Select, Checkbox, Radio Group, Switch, Slider. `FieldLabel` around a `Field` makes a raised choice card that presses in when checked; `FieldError` shows given `errors` or children without waiting for native validity; label and description fall back to plain elements outside a `Field`; 8 tests, 5 stories
- [x] Native Select: native `<select>` in an Input-style well with a caret icon, sm/md/lg, `NativeSelectOption`/`OptGroup`; 4 tests, 3 stories
- [x] Input OTP: slots as small wells, active slot sinks deeper with a caret, `InputOTPGroup`/`Separator`, digits/alphanumeric pattern, paste fills all slots, sm/md/lg; 4 tests, 3 stories
- [x] Kbd: static raised key cap, `KbdGroup` for chords, sm/md; 3 tests, 2 stories
- [x] Typography: `h1`–`h4`, paragraph, lead, large, small, muted, blockquote (inset well with a primary rule), list, inline code (inset); headings use `--font-heading` when set; every part takes `render`; 4 tests, 2 stories
- [x] Alert: inset well with a coloured rule and icon, `AlertTitle`/`AlertDescription`/`AlertAction`, default/info/success/warning/destructive, `role="status"` by default and `role="alert"` only for urgent messages; 4 tests, 3 stories
- [x] Empty: centred empty state with a raised icon tile (or Avatar), `EmptyHeader`/`Media`/`Title`/`Description`/`Content` for actions, flat or inset; 3 tests, 2 stories
- [x] Skeleton: inset placeholder with the shared shimmer, line/circle/rect presets, `aria-hidden`; 2 tests, 2 stories
- [x] Aspect Ratio: `aspect-ratio` wrapper for images and video in Card, Carousel and Attachment; 2 tests, 2 stories
- [x] Direction: `DirectionProvider`/`useDirection` re-export; Slider, Dial, Page Indicator, Chip and Carousel read it for RTL; 2 tests, 1 story (RTL slider)
- [x] Scroll Area: groove track with a raised pill thumb that appears on hover/scroll, vertical/horizontal/both, optional edge fade, focusable viewport when it overflows; 2 tests, 2 stories
- [x] Collapsible: trigger with a rotating chevron (`CollapsibleIndicator`), animated height via `--collapsible-panel-height`, `keepMounted`, `hiddenUntilFound`; 3 tests, 2 stories
- [x] Accordion: items as raised panels, open trigger presses in and its chevron turns over in the primary colour, single/multiple, disabled items, `flat` variant with grooves for use in a Card; headers sit in the Tab order (Base UI 1.9 dropped arrow-key roving per the APG update); 5 tests, 4 stories
- [x] Tabs: tab list as a Toggle Group-style slab, a well slides under the active tab (Base UI Indicator), which also takes `--tabs-active` colour and weight, `line` variant with a primary bar, horizontal/vertical, `TabsContent` panels; 5 tests, 4 stories
- [x] Breadcrumb: `nav` > `ol`, custom separators, `BreadcrumbEllipsis` (collapsed items in a Dropdown Menu once 4c lands), current page pressed in with `aria-current="page"`, `render` for router links; 6 tests, 3 stories
- [x] Pagination: raised page buttons, current page pressed in and primary with `aria-current="page"`, previous/next, ellipsis, sm/md, `render` for router links; 5 tests, 2 stories
- [x] Table: rows split by grooves, uppercase muted header over a groove (no well: per-cell wells seam), `TableCaption`/`Footer`, sticky header, flat/raised/inset container, selected rows (`aria-selected`) take a primary tint and a leading bar; 6 tests, 3 stories
- [x] Popover: raised popup (no arrow, like Tooltip), `side`/`align`/`sideOffset`, `PopoverHeader`/`Title`/`Description`/`Close`, focus moves in and returns, `--z-popover`; 3 tests, 2 stories
- [x] Hover Card: raised preview card on hover/focus, `delay`/`closeDelay` on the trigger (rendered as a primary link); 2 tests, 1 story
- [x] Dialog: raised panel over a blurred backdrop, sm/md/lg, `DialogHeader`/`Title`/`Description`/`Body`/`Footer`/`Close`, X button (`showCloseButton`), focus trap, `DialogBody` scrolls; 4 tests, 2 stories
- [x] Alert Dialog: needs an explicit choice (no outside dismiss), default/sm sizes (sm centres and splits the footer), raised `AlertDialogMedia` tile, `AlertDialogAction`/`Cancel` as Buttons (destructive via `variant`); 4 tests, 2 stories
- [x] Sheet: Dialog sliding in from top/bottom/start/end/left/right (start/end follow RTL), sm–xl widths, only the inner edge rounded; 3 tests, 2 stories
- [x] Drawer: `direction` top/bottom/left/right, raised grip on bottom drawers, swipe to dismiss (backdrop fades with swipe progress), snap points; 3 tests, 3 stories
- [x] Dropdown Menu: raised popup, highlighted item sinks, checkbox/radio items with primary marks (radio closes on click), labels, groove separators, submenus, plain-text shortcuts, destructive items; parts shared with Context Menu and Menubar via `menu-parts.tsx`; 6 tests, 2 stories
- [x] Context Menu: same item parts as Dropdown Menu, opened on right-click/long-press; 1 test, 1 story
- [x] Menubar: raised slab of menu triggers, open trigger pressed in and primary, arrow keys move between menus; 2 tests, 1 story
- [x] Navigation Menu: site nav with a raised viewport panel that resizes and slides between triggers, open trigger pressed in, links sink on hover, `data-active` link primary, `navigationMenuTriggerStyle()`, `render` for router links; 3 tests, 1 story
- [x] Toast: stacked raised toasts with coloured icons (Alert colours), title/description/action/close, swipe to dismiss, `Toaster` (position, limit, duration) + `toast()` with `.success`/`.info`/`.warning`/`.error`/`.loading`/`.promise`/`.dismiss`, `--z-toast`; 5 tests, 3 stories
- [x] Combobox: `ComboboxInput` in an `InputGroup` well with chevron and clear buttons, raised filtered list (highlight sinks, chosen row checked and primary), groups with `ComboboxCollection`, `ComboboxEmpty`, `multiple` values as raised `ComboboxChip`s in a `ComboboxChips` well (`useComboboxAnchor`), `ComboboxTrigger` for a searchable select; 7 tests, 4 stories
- [x] Command: always-open search list (`CommandInput`/`List`/`Group` with `heading`/`Collection`/`Item`/`Empty`/`Separator`/`Shortcut`), first match stays highlighted, running an item keeps the query, `CommandDialog` for a ⌘K palette (bare inside the raised dialog); 5 tests, 2 stories
- [x] Date Picker: `DatePicker` (closes on pick) and `DateRangePicker` (two months, stays open) behind a raised field trigger, `presets` column (matching one pressed in), `DatePickerInput` typed date in a well that syncs with the Calendar both ways and flags unparseable text on blur, `formatDate`/`parseDate`, `name` adds a `yyyy-mm-dd` hidden input; 5 tests, 4 stories
- [x] Resizable: panel groups split by a groove handle (primary while hovered, focused or dragged) with an optional raised grip that presses in while dragged, keyboard resize, horizontal/vertical, sizes as pixels (numbers) or percentages (strings); 2 tests, 2 stories
- [x] Carousel: track with raised round previous/next buttons and a `PageIndicator` (`CarouselIndicator`), horizontal/vertical, `opts` (loop, align) and `plugins` (autoplay off unless added), `gap`, arrow keys (RTL-aware), `onSlideChange`/`setApi`, labelled `region` with `aria-roledescription` carousel/slide, viewport padding so raised slides' shadows aren't clipped; 3 tests, 3 stories
- [x] Sidebar: raised side panel (`sidebar`/`floating`/`inset` variants, left/right), `SidebarProvider` (⌘B/Ctrl+B, `sidebar_state` cookie, controlled `open`), collapses `offcanvas` or to `icon`s with labels in tooltips, Sheet below `md`, header/footer/content/groups with label and action, menus with badge (inset pill), hover-only actions, sub-menus off a groove (wrap in Collapsible), rows rise on hover and the active row presses in, rail, skeleton rows; 6 tests, 5 stories
- [x] Data Table: block in `apps/storybook/blocks/data-table.tsx` (like shadcn's guide, not a package component): raised Table, sortable ghost-button headers with `aria-sort`, passenger filter Input, column visibility Dropdown Menu, row selection Checkboxes with an indeterminate select-all, status Chips, row action menus, Pagination rendered as buttons; 2 stories
- [x] Chart: `ChartContainer` turns `ChartConfig` into `--color-*`, `--fill-*` (BarMeter gradient, darker at the base) and `--area-*` (fading) variables and styles axes, grid and cursor for the surface; small raised `ChartTooltipContent` (dot/line/dashed indicator, `hideLabel`/`hideIndicator`, `formatter`, `nameKey`/`labelKey`), `ChartLegendContent`; 4 tests, 6 stories (area, bar, line, pie, radar, radial)
- [x] Bubble: chat bubble, default (primary)/secondary (raised)/muted (inset)/tinted/outline/ghost (no padding, full width)/destructive (inset with a red tint), `align` start/end tucks in the corner nearest the speaker, max 80% width, `BubbleContent` with `render`, `BubbleReactions` (raised pill on the top or bottom edge, `role="img"` with a label), `BubbleGroup`; 4 tests, 4 stories
- [x] Message: chat row layout with `MessageAvatar` (bottom-aligned, lifted above a footer), `MessageHeader`/`Content`/`Footer` (actions, status; flush with ghost bubbles), `align` mirrors the row, `MessageGroup`; 2 tests, 3 stories
- [x] Marker: inline status or note in a thread, default/border/separator (groove lines, no `role="separator"`), `MarkerIcon` (`aria-hidden`), `role="status"` with Spinner while streaming, `shimmer` on the text, `render` for a link or button; 3 tests, 3 stories
- [x] Attachment: raised file tile (idle sits in a well), idle/uploading/processing/error/done (errors stated in the description, shimmering title while busy), default/sm/xs, horizontal/vertical, icon or image media (dimmed until done), `AttachmentProgress`, corner actions, full-card `AttachmentTrigger` that presses the tile in, `AttachmentGroup` scroll row with snapping; uses native overflow rather than Scroll Area so the tiles' shadows aren't clipped; 4 tests, 5 stories
- [x] Trace: agent step list, `TraceLine` with running/pending/error status, icon, truncating title (shimmers while running), description, `TraceCollapsible` with a turning chevron and detail under a groove; 2 tests, 1 story
- [x] Code Block: inset code well, header with title and actions (copy with a "Copied" announcement, wrap toggle), floating actions shown on hover/focus, line numbers and `startLine`, wrap, highlighted/added/removed lines, `maxLines` with Show more/less, sm and destructive (error output) variants; highlighting in `useHighlightedCode` on its own subpath (`@neomorphic-ui/react/use-highlighted-code`; Shiki JS engine, core, languages and themes all loaded on first use; plain lines until ready); 7 tests, 5 stories
- [x] Message Scroller: chat scroll viewport (focusable "Messages" region, hidden until positioned) that opens at the latest turn (`last-anchor`/`end`/`start`), follows streamed output only while at the live edge (`autoScroll`), stops on wheel/touch/keyboard/scrollbar/selection, settles new `scrollAnchor` rows near the top with a peek of the row before, keeps position when history is prepended, `scrollToMessage`/`scrollToEnd`/`scrollToStart` via `useMessageScroller`, jump-to-latest raised button (inert while not needed), `role="log"`; headless scroll controller written here instead of Scroll Area (native scrolling keeps the spacer and anchoring maths simple); 5 tests, 3 stories
- [x] Questionnaire: multi-step form, one question per step as a fieldset, raised choice cards (radio or checkbox), freeform Input that replaces a single choice, Progress ("Question n of total"), previous/skip/next/submit, number-key shortcuts with Kbd hints, required and custom validation (announced, focus moves to the first choice), conditional (`when`) and resumable (`defaultValues`/`defaultActiveItem`) steps, Enter in a text answer moves on; headless state written here (shadcn uses `@shadcn/react`); 5 tests, 3 stories

## Changes by area

### apps/storybook · `@neomorphic-ui/storybook`

| Status | File | + | − |
| --- | --- | --- | --- |
| Modified | `apps/storybook/.storybook/main.ts` | 9 | 0 |
| Modified | `apps/storybook/blocks/chat-thread.tsx` | 89 | 79 |
| Added | `apps/storybook/blocks/data-table.tsx` | 547 | 0 |
| Modified | `apps/storybook/package.json` | 3 | 0 |
| Added | `apps/storybook/stories/accordion.stories.tsx` | 176 | 0 |
| Added | `apps/storybook/stories/alert-dialog.stories.tsx` | 149 | 0 |
| Added | `apps/storybook/stories/alert.stories.tsx` | 137 | 0 |
| Added | `apps/storybook/stories/aspect-ratio.stories.tsx` | 78 | 0 |
| Added | `apps/storybook/stories/attachment.stories.tsx` | 303 | 0 |
| Modified | `apps/storybook/stories/blocks/chat-thread.stories.tsx` | 19 | 8 |
| Added | `apps/storybook/stories/blocks/data-table.stories.tsx` | 127 | 0 |
| Added | `apps/storybook/stories/breadcrumb.stories.tsx` | 134 | 0 |
| Added | `apps/storybook/stories/bubble.stories.tsx` | 177 | 0 |
| Added | `apps/storybook/stories/carousel.stories.tsx` | 203 | 0 |
| Added | `apps/storybook/stories/chart.stories.tsx` | 446 | 0 |
| Added | `apps/storybook/stories/code-block.stories.tsx` | 237 | 0 |
| Added | `apps/storybook/stories/collapsible.stories.tsx` | 123 | 0 |
| Added | `apps/storybook/stories/combobox.stories.tsx` | 287 | 0 |
| Added | `apps/storybook/stories/command.stories.tsx` | 282 | 0 |
| Added | `apps/storybook/stories/context-menu.stories.tsx` | 88 | 0 |
| Added | `apps/storybook/stories/date-picker.stories.tsx` | 203 | 0 |
| Added | `apps/storybook/stories/dialog.stories.tsx` | 162 | 0 |
| Added | `apps/storybook/stories/direction.stories.tsx` | 82 | 0 |
| Added | `apps/storybook/stories/drawer.stories.tsx` | 200 | 0 |
| Added | `apps/storybook/stories/dropdown-menu.stories.tsx` | 190 | 0 |
| Added | `apps/storybook/stories/empty.stories.tsx` | 119 | 0 |
| Added | `apps/storybook/stories/field.stories.tsx` | 277 | 0 |
| Added | `apps/storybook/stories/hover-card.stories.tsx` | 78 | 0 |
| Added | `apps/storybook/stories/input-otp.stories.tsx` | 138 | 0 |
| Added | `apps/storybook/stories/kbd.stories.tsx` | 101 | 0 |
| Added | `apps/storybook/stories/marker.stories.tsx` | 130 | 0 |
| Added | `apps/storybook/stories/menubar.stories.tsx` | 103 | 0 |
| Added | `apps/storybook/stories/message-scroller.stories.tsx` | 390 | 0 |
| Added | `apps/storybook/stories/message.stories.tsx` | 184 | 0 |
| Added | `apps/storybook/stories/native-select.stories.tsx` | 103 | 0 |
| Added | `apps/storybook/stories/navigation-menu.stories.tsx` | 141 | 0 |
| Added | `apps/storybook/stories/pagination.stories.tsx` | 149 | 0 |
| Added | `apps/storybook/stories/popover.stories.tsx` | 127 | 0 |
| Added | `apps/storybook/stories/questionnaire.stories.tsx` | 304 | 0 |
| Added | `apps/storybook/stories/resizable.stories.tsx` | 122 | 0 |
| Added | `apps/storybook/stories/scroll-area.stories.tsx` | 114 | 0 |
| Added | `apps/storybook/stories/sheet.stories.tsx` | 138 | 0 |
| Added | `apps/storybook/stories/sidebar.stories.tsx` | 415 | 0 |
| Added | `apps/storybook/stories/skeleton.stories.tsx` | 80 | 0 |
| Added | `apps/storybook/stories/table.stories.tsx` | 275 | 0 |
| Added | `apps/storybook/stories/tabs.stories.tsx` | 199 | 0 |
| Added | `apps/storybook/stories/toast.stories.tsx` | 180 | 0 |
| Added | `apps/storybook/stories/trace.stories.tsx` | 151 | 0 |
| Added | `apps/storybook/stories/typography.stories.tsx` | 95 | 0 |

### packages/ui · `@neomorphic-ui/react`

| Status | File | + | − |
| --- | --- | --- | --- |
| Modified | `packages/ui/package.json` | 236 | 1 |
| Added | `packages/ui/src/accordion.test.tsx` | 74 | 0 |
| Added | `packages/ui/src/accordion.tsx` | 186 | 0 |
| Added | `packages/ui/src/alert-dialog.test.tsx` | 99 | 0 |
| Added | `packages/ui/src/alert-dialog.tsx` | 221 | 0 |
| Added | `packages/ui/src/alert.test.tsx` | 48 | 0 |
| Added | `packages/ui/src/alert.tsx` | 122 | 0 |
| Added | `packages/ui/src/aspect-ratio.test.tsx` | 27 | 0 |
| Added | `packages/ui/src/aspect-ratio.tsx` | 45 | 0 |
| Added | `packages/ui/src/attachment.test.tsx` | 101 | 0 |
| Added | `packages/ui/src/attachment.tsx` | 343 | 0 |
| Modified | `packages/ui/src/base.css` | 86 | 0 |
| Added | `packages/ui/src/breadcrumb.test.tsx` | 80 | 0 |
| Added | `packages/ui/src/breadcrumb.tsx` | 160 | 0 |
| Added | `packages/ui/src/bubble.test.tsx` | 71 | 0 |
| Added | `packages/ui/src/bubble.tsx` | 213 | 0 |
| Added | `packages/ui/src/carousel.test.tsx` | 70 | 0 |
| Added | `packages/ui/src/carousel.tsx` | 401 | 0 |
| Added | `packages/ui/src/chart.test.tsx` | 117 | 0 |
| Added | `packages/ui/src/chart.tsx` | 509 | 0 |
| Added | `packages/ui/src/code-block.test.tsx` | 155 | 0 |
| Added | `packages/ui/src/code-block.tsx` | 484 | 0 |
| Added | `packages/ui/src/collapsible.test.tsx` | 56 | 0 |
| Added | `packages/ui/src/collapsible.tsx` | 95 | 0 |
| Added | `packages/ui/src/combobox.test.tsx` | 195 | 0 |
| Added | `packages/ui/src/combobox.tsx` | 486 | 0 |
| Added | `packages/ui/src/command.test.tsx` | 146 | 0 |
| Added | `packages/ui/src/command.tsx` | 336 | 0 |
| Added | `packages/ui/src/context-menu.test.tsx` | 38 | 0 |
| Added | `packages/ui/src/context-menu.tsx` | 114 | 0 |
| Added | `packages/ui/src/date-picker.test.tsx` | 138 | 0 |
| Added | `packages/ui/src/date-picker.tsx` | 600 | 0 |
| Added | `packages/ui/src/dialog.test.tsx` | 76 | 0 |
| Added | `packages/ui/src/dialog.tsx` | 249 | 0 |
| Added | `packages/ui/src/direction.test.tsx` | 24 | 0 |
| Added | `packages/ui/src/direction.tsx` | 41 | 0 |
| Added | `packages/ui/src/drawer.test.tsx` | 62 | 0 |
| Added | `packages/ui/src/drawer.tsx` | 209 | 0 |
| Added | `packages/ui/src/dropdown-menu.test.tsx` | 125 | 0 |
| Added | `packages/ui/src/dropdown-menu.tsx` | 99 | 0 |
| Added | `packages/ui/src/empty.test.tsx` | 57 | 0 |
| Added | `packages/ui/src/empty.tsx` | 179 | 0 |
| Added | `packages/ui/src/field.test.tsx` | 133 | 0 |
| Added | `packages/ui/src/field.tsx` | 372 | 0 |
| Added | `packages/ui/src/hover-card.test.tsx` | 36 | 0 |
| Added | `packages/ui/src/hover-card.tsx` | 93 | 0 |
| Modified | `packages/ui/src/input-group.tsx` | 1 | 1 |
| Added | `packages/ui/src/input-otp.test.tsx` | 67 | 0 |
| Added | `packages/ui/src/input-otp.tsx` | 137 | 0 |
| Added | `packages/ui/src/kbd.test.tsx` | 36 | 0 |
| Added | `packages/ui/src/kbd.tsx` | 74 | 0 |
| Added | `packages/ui/src/label.tsx` | 39 | 0 |
| Added | `packages/ui/src/marker.test.tsx` | 55 | 0 |
| Added | `packages/ui/src/marker.tsx` | 119 | 0 |
| Added | `packages/ui/src/menu-parts.tsx` | 360 | 0 |
| Added | `packages/ui/src/menubar.test.tsx` | 52 | 0 |
| Added | `packages/ui/src/menubar.tsx` | 138 | 0 |
| Added | `packages/ui/src/message-scroller.test.tsx` | 147 | 0 |
| Added | `packages/ui/src/message-scroller.tsx` | 875 | 0 |
| Added | `packages/ui/src/message.test.tsx` | 62 | 0 |
| Added | `packages/ui/src/message.tsx` | 145 | 0 |
| Added | `packages/ui/src/native-select.test.tsx` | 51 | 0 |
| Added | `packages/ui/src/native-select.tsx` | 109 | 0 |
| Added | `packages/ui/src/navigation-menu.test.tsx` | 68 | 0 |
| Added | `packages/ui/src/navigation-menu.tsx` | 183 | 0 |
| Added | `packages/ui/src/pagination.test.tsx` | 86 | 0 |
| Added | `packages/ui/src/pagination.tsx` | 186 | 0 |
| Added | `packages/ui/src/popover.test.tsx` | 60 | 0 |
| Added | `packages/ui/src/popover.tsx` | 153 | 0 |
| Added | `packages/ui/src/popup.ts` | 33 | 0 |
| Added | `packages/ui/src/questionnaire.test.tsx` | 188 | 0 |
| Added | `packages/ui/src/questionnaire.tsx` | 1014 | 0 |
| Added | `packages/ui/src/resizable.test.tsx` | 48 | 0 |
| Added | `packages/ui/src/resizable.tsx` | 98 | 0 |
| Added | `packages/ui/src/scroll-area.test.tsx` | 35 | 0 |
| Added | `packages/ui/src/scroll-area.tsx` | 105 | 0 |
| Modified | `packages/ui/src/select.tsx` | 12 | 11 |
| Added | `packages/ui/src/sheet.test.tsx` | 59 | 0 |
| Added | `packages/ui/src/sheet.tsx` | 223 | 0 |
| Added | `packages/ui/src/sidebar.test.tsx` | 152 | 0 |
| Added | `packages/ui/src/sidebar.tsx` | 874 | 0 |
| Added | `packages/ui/src/skeleton.test.tsx` | 32 | 0 |
| Added | `packages/ui/src/skeleton.tsx` | 63 | 0 |
| Added | `packages/ui/src/table.test.tsx` | 93 | 0 |
| Added | `packages/ui/src/table.tsx` | 229 | 0 |
| Added | `packages/ui/src/tabs.test.tsx` | 75 | 0 |
| Added | `packages/ui/src/tabs.tsx` | 165 | 0 |
| Modified | `packages/ui/src/textarea.tsx` | 1 | 1 |
| Modified | `packages/ui/src/theme.css` | 18 | 0 |
| Added | `packages/ui/src/toast.test.tsx` | 79 | 0 |
| Added | `packages/ui/src/toast.tsx` | 431 | 0 |
| Added | `packages/ui/src/trace.test.tsx` | 60 | 0 |
| Added | `packages/ui/src/trace.tsx` | 205 | 0 |
| Added | `packages/ui/src/typography.test.tsx` | 70 | 0 |
| Added | `packages/ui/src/typography.tsx` | 134 | 0 |
| Added | `packages/ui/src/use-highlighted-code.tsx` | 158 | 0 |
| Modified | `packages/ui/tsup.config.ts` | 45 | 0 |

### root

| Status | File | + | − |
| --- | --- | --- | --- |
| Added | `.changeset/neu-phase-4a-forms-text.md` | 5 | 0 |
| Added | `.changeset/neu-phase-4b-disclosure-navigation.md` | 5 | 0 |
| Added | `.changeset/neu-phase-4c-overlays.md` | 5 | 0 |
| Added | `.changeset/neu-phase-4d-pickers.md` | 5 | 0 |
| Added | `.changeset/neu-phase-4e-layout-data.md` | 5 | 0 |
| Added | `.changeset/neu-phase-4f-conversation-ai.md` | 5 | 0 |
| Modified | `ROADMAP.md` | 120 | 1 |
| Modified | `pnpm-lock.yaml` | 690 | 1 |
