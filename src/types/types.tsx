export type Bookmark = {
  id: string;
  title: string;
  parentId?: string;
  index?: number;
  url?: string;
  children?: Bookmark[];
  faviconUrl?: string;
}