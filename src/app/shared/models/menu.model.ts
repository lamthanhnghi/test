export interface IMcMenuItem {
  id: any;
  title: string;
  icon?: string;
  link: string[] | string;
  type: 'item' | 'collapse' | 'group' | 'subheader';
  level?: number;
  children?: IMcMenuItem[];
  hasWarning?: boolean;
  [key: string]: any;
}

export interface IMcBreadcrumb {
  title: string;
  link: string[] | string;
  disabled?: boolean;
}
