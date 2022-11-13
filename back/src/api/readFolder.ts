import * as fs from "fs-extra";
import * as path from "path";
import {
  addFileCount,
  addFileToFolder,
  addFolderCount,
  addSubFolder,
} from "../types/FolderData";

export const readFolder: (_path: string) => Promise<void> = async (_path) => {
  const files = fs.readdirSync(_path);

  const folders: string[] = [];

  for (const file of files) {
    try {
      const stat = await fs.stat(path.join(_path, file));

      if (stat.isFile()) {
        addFileCount();
        addFileToFolder(_path, file, stat.size, path.extname(file));
      }
      if (stat.isDirectory()) {
        addFolderCount();
        addSubFolder(_path, path.join(_path, file));
        folders.push(file);
      }
    } catch (e) {
      console.error("some error: ", file);
    }
  }

  for (const folder of folders) {
    try {
      await readFolder(path.join(_path, folder));
    } catch (e) {
      console.error("some error: ", folder);
    }
  }
};
