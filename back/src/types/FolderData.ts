export interface IFolderData {
  name: string;
  size: number;
  type: string;
  isFile: boolean;
  isFolder: boolean;
  items: IFolderData[];
}

let folderCount = 0;
let fileCount = 0;

export const addFolderCount = () => {
  folderCount++;
};
export const addFileCount = () => {
  fileCount++;
};

export const getFolderCount = () => folderCount;
export const getFileCount = () => fileCount;

export const clearCounters = () => {
  folderCount = 0;
  fileCount = 0;
};

let ScanResult: { path: string; file: string }[] = [];

export const clearScanResults = () => {
  ScanResult = [];
};

export const addScanResult = (_path: string, _file: string) => {
  ScanResult.push({ path: _path, file: _file });
};

export const getScanResults = () => {
  return ScanResult;
};
