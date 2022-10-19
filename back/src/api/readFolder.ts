import * as fs from "fs-extra";
import * as path from "path";
import type { IFolderData } from "../types/FolderData";

const readFolder: (_path: string) => Promise<IFolderData[]> = async (_path) => {
  const files = fs.readdirSync(_path);

  const res: IFolderData[] = [];

  for (const file of files) {
    try {
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
        const subItems = await readFolder(path.join(_path, file));
        const size = subItems.reduce(
          (prev, curr, index, arr) => prev + curr.size,
          0
        );
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

export default readFolder;
