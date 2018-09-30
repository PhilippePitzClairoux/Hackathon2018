const electron = require("electron");
const {app, BrowserWindow} = electron;
app.commandLine.appendSwitch('autoplay-policy', 'no-user-gesture-required');

  function createWindow (width_s) {
    // Cree la fenetre du navigateur.
    
    let dir = "./icon.ico";
    win = new BrowserWindow({width: 450, height: 800,transparent: true,icon: dir,frame: false})
    win.setPosition(width_s - 375,0);

    // et charge le index.html de l'application.
    win.loadFile('gui.html')

    setTimeout(function(){
    	win.hide();
    },15000)
  }
  
  app.on('ready', () => {
  	const { width, height } = electron.screen.getPrimaryDisplay().workAreaSize;
  	createWindow(width);

  })

