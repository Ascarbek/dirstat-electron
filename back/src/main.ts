import { app, BrowserWindow, ipcMain } from "electron";
import * as path from "path";
import { readFolder } from "./api/readFolder";
import {
  clearCounters,
  clearScanResults,
  getFileCount,
  getFolderCount,
  getScanResults,
} from "./types/FolderData";

const createWindow = async () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
  });

  await win.loadURL("http://localhost:5173/index.html");
  win.webContents.openDevTools();
};

app.whenReady().then(async () => {
  ipcMain.handle("readFolder", async (e, args) => {
    clearCounters();
    clearScanResults();
    const startPath =
      args._path === "default" ? path.join(process.cwd(), "..") : args._path;

    return await readFolder(startPath);
  });

  ipcMain.handle("getStatus", () => {
    return { folderCount: getFolderCount(), fileCount: getFileCount() };
  });

  ipcMain.handle("getScanResults", () => {
    return getScanResults();
  });

  await createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});
