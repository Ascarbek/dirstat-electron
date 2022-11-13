import { contextBridge, ipcRenderer, ipcMain } from "electron";

contextBridge.exposeInMainWorld("myAPI", {
  readFolder: (_path: string) => ipcRenderer.invoke("readFolder", { _path }),
  getStatus: () => ipcRenderer.invoke("getStatus"),
  getFolderSizeMap: () => ipcRenderer.invoke("getFolderSizeMap"),
  getFolderFilesMap: () => ipcRenderer.invoke("getFolderFilesMap"),
  getSubFoldersMap: () => ipcRenderer.invoke("getSubFoldersMap"),
});
