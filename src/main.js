const { app, BrowserWindow } = require('electron');
const { createWindow } = require("./app.js"); 

require('electron-reload')(__dirname); 
require("./dataBase/connect.js");


app.allowRendererProcessReuse = false;

app.whenReady()
    .then(createWindow)
    .catch(err => {
        console.log(err);
    })

app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
        app.quit();
    }
})
app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
})


