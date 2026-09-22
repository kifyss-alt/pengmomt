const { app, BrowserWindow, Tray, Menu, ipcMain, nativeImage, screen } = require("electron");
const path = require("path");

let mainWindow = null;
let tray = null;
let isQuitting = false;
let isPinned = false;

const ICON_PATH = path.join(__dirname, "build", "icon.png");

function createWindow(){
  const { width } = screen.getPrimaryDisplay().workAreaSize;

  mainWindow = new BrowserWindow({
    width: Math.min(1040, width - 80),
    height: 800,
    minWidth: 480,
    minHeight: 420,
    title: "태블릿 사용 타임아웃 게시판",
    icon: ICON_PATH,
    backgroundColor: "#f3f6fb",
    autoHideMenuBar: true,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      contextIsolation: true,
      nodeIntegration: false
    }
  });

  mainWindow.setMenuBarVisibility(false);
  mainWindow.loadFile(path.join(__dirname, "app", "index.html"));

  mainWindow.on("close", (event) => {
    if(!isQuitting){
      event.preventDefault();
      mainWindow.hide();
    }
  });

  mainWindow.on("closed", () => {
    mainWindow = null;
  });
}

function createTray(){
  const image = nativeImage.createFromPath(ICON_PATH);
  tray = new Tray(image.resize({ width: 16, height: 16 }));
  tray.setToolTip("태블릿 사용 타임아웃 게시판");

  function buildMenu(){
    return Menu.buildFromTemplate([
      {
        label: "열기",
        click: () => {
          if(mainWindow){
            mainWindow.show();
            mainWindow.focus();
          }
        }
      },
      {
        label: "항상 위에 고정",
        type: "checkbox",
        checked: isPinned,
        click: (menuItem) => {
          setAlwaysOnTop(menuItem.checked);
        }
      },
      { type: "separator" },
      {
        label: "종료",
        click: () => {
          isQuitting = true;
          app.quit();
        }
      }
    ]);
  }

  tray.setContextMenu(buildMenu());
  tray.on("click", () => {
    if(!mainWindow) return;
    if(mainWindow.isVisible()){
      mainWindow.focus();
    } else {
      mainWindow.show();
    }
  });

  return buildMenu;
}

function setAlwaysOnTop(pinned){
  isPinned = pinned;
  if(mainWindow){
    mainWindow.setAlwaysOnTop(pinned, "floating");
  }
  if(tray){
    tray.setContextMenu(refreshTrayMenu());
  }
}

let refreshTrayMenu = () => Menu.buildFromTemplate([]);

const gotLock = app.requestSingleInstanceLock();
if(!gotLock){
  app.quit();
} else {
  app.on("second-instance", () => {
    if(mainWindow){
      if(mainWindow.isMinimized()) mainWindow.restore();
      mainWindow.show();
      mainWindow.focus();
    }
  });

  app.whenReady().then(() => {
    createWindow();
    refreshTrayMenu = createTray();

    app.on("activate", () => {
      if(BrowserWindow.getAllWindows().length === 0){
        createWindow();
      } else {
        mainWindow.show();
      }
    });
  });

  app.on("before-quit", () => {
    isQuitting = true;
  });

  app.on("window-all-closed", () => {
    if(process.platform !== "darwin" && isQuitting){
      app.quit();
    }
  });

  ipcMain.on("set-always-on-top", (event, pinned) => {
    setAlwaysOnTop(pinned);
  });
}
