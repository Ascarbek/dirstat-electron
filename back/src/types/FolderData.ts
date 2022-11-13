export interface IFolderSizeMap {
  [keys: string]: number;
}

export interface IFolderFilesMap {
  [keys: string]: { name: string; size: number; type: string }[];
}

export interface ISubFoldersMap {
  [keys: string]: string[];
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

let FolderSizeMap: IFolderSizeMap = {};
let FolderFilesMap: IFolderFilesMap = {};
let SubFoldersMap: ISubFoldersMap = {};

export const clearScanResults = () => {
  FolderSizeMap = {};
  FolderFilesMap = {};
  SubFoldersMap = {};
};

export const addFolderSize = (_path: string, _addSize: number) => {
  if (!FolderSizeMap[_path]) {
    FolderSizeMap[_path] = 0;
  }
  FolderSizeMap[_path] += _addSize;
};

export const addFileToFolder = (
  _path: string,
  _name: string,
  _size: number,
  _type: string
) => {
  if (!FolderFilesMap[_path]) {
    FolderFilesMap[_path] = [];
  }
  FolderFilesMap[_path].push({ name: _name, size: _size, type: _type });
  addFolderSize(_path, _size);
};

export const addSubFolder = (_path: string, _name: string) => {
  if (!SubFoldersMap[_path]) {
    SubFoldersMap[_path] = [];
  }
  SubFoldersMap[_path].push(_name);
};

export const getFolderSizeMap = () => {
  return FolderSizeMap;
};
export const getFolderFilesMap = () => {
  return FolderFilesMap;
};
export const getSubFoldersMap = () => {
  return SubFoldersMap;
};
