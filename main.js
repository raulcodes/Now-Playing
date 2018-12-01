// Modules to control application life and create native browser window
const {app, BrowserWindow} = require('electron')

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow
// let tray = null

function createWindow () {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    x: null,
    y: null,
    width: 200,
    height: 200,
    minWidth: 100,
    maxWidth: 400,
    minHeight: 100,
    maxHeight: 400,
    acceptFirstMouse: true,
    alwaysOnTop: true,
    focusable: false,
    frame: false,
    // transparent: true,
    resizable: true,
    show: false, // prevents flash of white
    title: 'Now Playing'
    // backgroundColor: 'black'
  })

  // and load the index.html of the app.
  mainWindow.loadFile('index.html')

  // Move window across desktops when switching
  mainWindow.setVisibleOnAllWorkspaces(true)

  // Maintain square window ratio
  mainWindow.setAspectRatio(1.0, { width: 0, height: 0 })

  // Only show window when it's ready; prevents flash of white
  mainWindow.on('ready-to-show', () => {
    mainWindow.show()
  })

  // Open the DevTools.
  // mainWindow.webContents.openDevTools()

  // Emitted when the window is closed.
  mainWindow.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null
  })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
// app.on('ready', () => {
//   createWindow()
//   tray = new Tray('./logo.png')
//   const contextMenu = Menu.buildFromTemplate([
//     {label: 'Item1', type: 'radio'},
//     {label: 'Item2', type: 'radio'},
//     {label: 'Item3', type: 'radio', checked: true},
//     {label: 'Item4', type: 'radio'}
//   ])
//   tray.setToolTip('This is my application.')
//   tray.setContextMenu(contextMenu)
// })

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function () {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow()
  }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
