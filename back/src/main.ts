import { BrowserWindow, app } from 'electron';

const createWindow = async () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
  });

  await win.loadURL('http://localhost:5173/index.html');
  win.webContents.openDevTools();
};

app.whenReady().then(async () => {
  await createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});
