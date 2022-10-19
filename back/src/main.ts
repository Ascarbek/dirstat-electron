import { BrowserWindow, app, ipcMain } from "electron";
import * as path from "path";
import readFolder from "./api/readFolder";

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
    if (args._path === "default") {
      console.time("readFolder");
      const result = await readFolder(path.join(process.cwd(), "."));
      console.timeEnd("readFolder");
      return result;
    } else {
      return readFolder(args._path);
    }
  });

  await createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});
