import path from "path";
import { BrowserView, BrowserWindow, app, ipcMain } from "electron";
import serve from "electron-serve";
import { createWindow } from "./helpers";

const isProd = process.env.NODE_ENV === "production";

if (isProd) {
  serve({ directory: "app" });
} else {
  app.setPath("userData", `${app.getPath("userData")} (development)`);
}

let mainWindow;

(async () => {
  await app.whenReady();

  mainWindow = createWindow("main", {
    width: 1000,
    height: 600,
    frame: false,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      nodeIntegration: true,
    },
  });

  if (isProd) {
    await mainWindow.loadURL("app://./home");
  } else {
    const port = process.argv[2];
    await mainWindow.loadURL(`http://localhost:${port}/home`);
    mainWindow.webContents.openDevTools();
  }
})();

let webWindow;

app.whenReady().then(() => {
  webWindow = new BrowserView();
  mainWindow.setBrowserView(webWindow);
  webWindow.setBounds({ x: 0, y: 84, width: 1000, height: 516 });
  webWindow.setAutoResize({ width: true, height: true });
  webWindow.webContents.loadURL("https://google.com");
});

app.on("window-all-closed", () => {
  app.quit();
});

ipcMain.on("close", () => {
  app.quit();
});

ipcMain.on("maximize", () => {
  mainWindow.isMaximized() ? mainWindow.unmaximize() : mainWindow.maximize();
});

ipcMain.on("minimize", () => {
  mainWindow.minimize();
});

ipcMain.on("navigate-to", (event, value) => {
  console.log(value);
  webWindow.webContents.loadURL(value);
});

ipcMain.on("message", async (event, arg) => {
  event.reply("message", `${arg} World!`);
});
