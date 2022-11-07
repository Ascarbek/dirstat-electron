import * as fs from "fs-extra";
import * as path from "path";
import type { IFolderData } from "../types/FolderData";
import {
  addFileCount,
  addFolderCount,
  addScanResult,
} from "../types/FolderData";

export const readFolder: (_path: string) => Promise<IFolderData[]> = async (
  _path
) => {
  const files = fs.readdirSync(_path);

  const res: IFolderData[] = [];

  for (const file of files) {
    try {
      const stat = await fs.stat(path.join(_path, file));

      if (stat.isFile()) {
        addFileCount();
        addScanResult(_path, file);
        res.push({
          name: file,
          size: stat.size,
          isFile: true,
          type: path.extname(file),
          isFolder: false,
          items: [],
        });
      }
      if (stat.isDirectory()) {
        addFolderCount();
        const subItems = await readFolder(path.join(_path, file));
        const size = subItems.reduce((prev, curr) => prev + curr.size, 0);
        res.push({
          name: file,
          size: size,
          isFile: false,
          isFolder: true,
          type: "",
          items: subItems,
        });
      }
    } catch (e) {
      console.error("some error: ", file);
    }
  }

  return res;
};
