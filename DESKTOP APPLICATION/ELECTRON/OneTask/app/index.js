
const { app, BrowserWindow, globalShortcut } = require('electron');
const { autoUpdater } = require('electron-updater');
const  path =require('path') ;
const url= require('url');
const  TrayBar = require('menubar');



//let analyticswindow;
let getstartedwindow;

const tray = TrayBar({
  index: url.format({
    pathname: process.env.NODE_ENV === 'development' ? path.resolve(__dirname, 'page/timer.html') : path.resolve(__dirname, 'timer.html'),
    protocol: 'file:',
    slashes: true,
  }),
  icon: process.env.NODE_ENV === 'development' ? path.join(__dirname, 'assets/clock.png') : path.join(__dirname, '../app/assets/clock.png'),
  width: 285,
  height: 480,
  showDockIcon: true,
});

app.on('ready', () => {

  getstartedwindow=new BrowserWindow({
    width: 590,
    height: 380,
    
    webPreferences: {
      nodeIntegration: true
    }
   
});
if(process.env.NODE_ENV === 'development'){
  getstartedwindow.loadURL(`file://${__dirname}/page/getstarted.html`);
}
else {
  getstartedwindow.loadURL(`file://${__dirname}/getstarted.html`);
}

  
//for dev
//getstartedwindow.webContents.openDevTools();


  tray.showWindow();


  autoUpdater.checkForUpdatesAndNotify()
    .then((data) => console.log('data', data))
    .catch((err) => console.log(err));
});

app.on('activate', (e, isOpenWindow) => {
  if (!isOpenWindow) {
    tray.showWindow();
  } else {
    console.log("window hidden");
    tray.hideWindow();
  }
});

tray.on('show', () => {
  globalShortcut.register('Escape', () => {
    if (tray.window && tray.window.isFocused()) {
      tray.window.blur(); // Need to reopen in windowOS
      tray.hideWindow(); // Need to reopen in macOS
    }
  });
});

tray.on('hide', () => {
  /**
   * If you don't this, Escape key doesn't active another application.
   */
  globalShortcut.unregister('Escape');
});

autoUpdater.setFeedURL({
  provider: 'github',
  owner: 'sakaubuntu',
  protocol: 'https',
  repo: 'zyz',
});

