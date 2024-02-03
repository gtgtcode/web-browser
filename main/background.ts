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
    minWidth: 550,
    minHeight: 400,
    width: 1000,
    height: 600,
    frame: false,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      nodeIntegration: true,
      webviewTag: true,
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

  webWindow.webContents.on("did-start-navigation", (event, value) => {
    try {
      console.log(value);
      ipcMain.emit("navigated-url", value);
    } catch (error) {
      console.error("Error emitting navigated-url event:", error);
    }
  });

  ipcMain.on("refresh-page", () => {
    webWindow.webContents.reload();
  });

  ipcMain.on("go-back", () => {
    webWindow.webContents.canGoBack() && webWindow.webContents.goBack();
  });

  ipcMain.on("go-forward", () => {
    webWindow.webContents.canGoForward() && webWindow.webContents.goForward();
  });
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
  webWindow.webContents.loadURL(value);
});

ipcMain.on("message", async (event, arg) => {
  event.reply("message", `${arg} World!`);
});
