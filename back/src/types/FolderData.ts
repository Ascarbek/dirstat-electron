export interface IFolderData {
  name: string;
  size: number;
  type: string;
  isFile: boolean;
  isFolder: boolean;
  items: IFolderData[];
}
