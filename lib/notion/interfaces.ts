export interface Post {
  PageId: string
  Title: string
  Slug: string
  Date: string
  Tags: string[]
  Excerpt: string
  OGImage: string
  Rank: number
  Like: number
}

export interface Block {
  Id: string
  Type: string
  HasChildren: boolean

  ChildPage?: ChildPage
  Paragraph?: Paragraph
  Heading1?: Heading1
  Heading2?: Heading2
  Heading3?: Heading3
  BulletedListItem?: BulletedListItem
  NumberedListItem?: NumberedListItem
  ToDo?: ToDo
  Image?: Image
  Code?: Code
  Quote?: Quote
  Equation?: Equation
  Callout?: Callout
  SyncedBlock?: SyncedBlock
  Toggle?: Toggle
  Embed?: Embed
  Video?: Video
  Pdf?: Pdf
  Bookmark?: Bookmark
  LinkPreview?: LinkPreview
  Table?: Table
  ColumnList?: ColumnList
  TableOfContents?: TableOfContents
}

export interface ChildPage {
  Title: string
  Children: Block[]
}
export interface Paragraph {
  RichTexts: RichText[]
  Color: string
  Children?: Block[]
}

export interface Heading1 {
  RichTexts: RichText[]
  Color: string
  IsToggleable: boolean
  Children?: Block[]
}

export interface Heading2 {
  RichTexts: RichText[]
  Color: string
  IsToggleable: boolean
  Children?: Block[]
}

export interface Heading3 {
  RichTexts: RichText[]
  Color: string
  IsToggleable: boolean
  Children?: Block[]
}

export interface BulletedListItem {
  RichTexts: RichText[]
  Color: string
  Children?: Block[]
}

export interface NumberedListItem {
  RichTexts: RichText[]
  Color: string
  Children?: Block[]
}

export interface ToDo {
  RichTexts: RichText[]
  Checked: boolean
  Color: string
  Children?: Block[]
}

export interface Image {
  Caption: RichText[]
  Type: string
  File?: File
  External?: External
  Width?: number
  Height?: number
}

export interface Video {
  Type: string
  File?: File
  External?: External
}

export interface File {
  Url: string
  ExpiryTime?: string
}

export interface External {
  Url: string
}

export interface Code {
  Caption: RichText[]
  RichTexts: RichText[]
  Language: string
}

export interface Quote {
  RichTexts: RichText[]
  Color: string
  Children?: Block[]
}

export interface Equation {
  Expression: string
}

export interface Callout {
  RichTexts: RichText[]
  Icon: Icon
  Color: string
  Children?: Block[]
}

export interface SyncedBlock {
  SyncedFrom: SyncedFrom
  Children?: Block[]
}

export interface SyncedFrom {
  BlockId: string
}

export interface Toggle {
  RichTexts: RichText[]
  Color: string
  Children: Block[]
}

export interface Embed {
  Url: string
}

export interface Pdf {
  Type: string
  File?: File
  External?: External
  Url?: string
  ExpiryTime?: string
}

export interface Bookmark {
  Url: string
}

export interface LinkPreview {
  Url: string
}

export interface Table {
  TableWidth: number
  HasColumnHeader: boolean
  HasRowHeader: boolean
  Rows: TableRow[]
}

export interface TableRow {
  Id: string
  Type: string
  HasChildren: boolean
  Cells: TableCell[]
}

export interface TableCell {
  RichTexts: RichText[]
}

export interface ColumnList {
  Columns: Column[]
}

export interface Column {
  Id: string
  Type: string
  HasChildren: boolean
  Children: Block[]
}

export interface List {
  Type: string
  ListItems: Block[]
}

export interface TableOfContents {
  Color: string
}

export interface RichText {
  Text?: Text
  Annotation: Annotation
  PlainText: string
  Href?: string
  Equation?: Equation
  Mention?: Mention
}

export interface Text {
  Content: string
  Link?: Link
}

export interface Icon {
  Emoji: string
}

export interface Annotation {
  Bold: boolean
  Italic: boolean
  Strikethrough: boolean
  Underline: boolean
  Code: boolean
  Color: string
}

export interface Link {
  Url: string
}

export interface Mention {
  Type: string
  Page?: MentionPage
  Date?: MentionDate
  LinkPreview?: LinkPreview
}

export interface MentionPage {
  Id: string
}

export interface MentionDate {
  Start?: string
  End?: null|string
}