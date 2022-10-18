import * as fs from "fs-extra";
import * as path from "path";
import type { IFolderData } from "../types/FolderData";

const readFolder: (_path: string) => Promise<IFolderData[]> = async (_path) => {
  const files = fs.readdirSync(_path);

  const res: IFolderData[] = [];

  for (const file of files) {
    const stat = await fs.stat(path.join(_path, file));
    if (stat.isFile()) {
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
      res.push({
        name: file,
        size: 0,
        isFile: false,
        isFolder: true,
        type: "",
        items: await readFolder(path.join(_path, file)),
      });
    }
  }

  return res;
};

export default readFolder;
