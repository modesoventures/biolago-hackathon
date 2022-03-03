export interface IListItem {
  id?: string;
  name: string;
  action?: (id: string) => void;
  selected?: boolean;
  payload?: any;
}
