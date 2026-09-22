const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("desktopAPI", {
  setAlwaysOnTop: (pinned) => ipcRenderer.send("set-always-on-top", !!pinned)
});
