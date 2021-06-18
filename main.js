const { app, BrowserWindow, ipcMain } = require("electron");
const EventEmitter = require("events");
const path = require("path");

let refresh = new EventEmitter();
let win2;

//Funcionalidade de criar window
function createWindow() {
  const win = new BrowserWindow({
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      nodeIntegration: true,
      contextIsolation: false,
      enableRemoteModule: true,
    },
  });

  win2 = win;

  win.maximize();

  win.loadFile("./login/login.html");
}

//Funcionalidades ativas assim que inicializar o app
app.whenReady().then(() => {

  //Criação de uma janela com as configurações prévias
  createWindow();

  app.on("activate", function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });

  //Fechamento do app quando todos os windows forem fechados
  app.on("window-all-closed", function () {
    if (process.platform !== "darwin") app.quit();
  });

  //Atualiza pagina depois de ter finalizado a compra
  refresh.on("finished-buying", () => {
    console.log("refreshing main page");
    win2.loadFile("./mainPage/mainPage.html");
  });

  //Aprovação de entrada na página principal
  ipcMain.on("validation", function (e, item) {
    if (item) {
      console.log("enter main page");
      win2.loadFile("./mainPage/mainPage.html");
    }
  });

  //Voltar a página do login
  ipcMain.on("login", function (e, item) {
    if (item) {
      console.log("back to login page");
      win2.loadFile("./login/login.html");
    }
  });

  //Imprimir item recebido
  ipcMain.on("print", function (e, item) {
    if (item != undefined) {
      const ThermalPrinter = require("node-thermal-printer").printer;
      const PrinterTypes = require("node-thermal-printer").types;
  
      let printer = new ThermalPrinter({
        type: PrinterTypes.EPSON,
        interface: "/dev/usb/lp0",
      });
  
      let isConnected = printer.isPrinterConnected();
      if (isConnected) {
        printer.alignCenter();
        printer.println(item);
        printer.cut();
  
        try {
          printer.execute();
          console.error("Print done!");
          setTimeout(() => refresh.emit("finished-buying"), 2000);
        } catch (error) {
          console.log("Print failed:", error);
        }
      }
    }
  }
  );
});