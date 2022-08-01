const {ipcRenderer} = require('electron')

const log4js = require("log4js");
log4js.configure({
    appenders: { render: { type: "file", filename: "render.log" } },
    categories: { default: { appenders: ["render"], level: "debug" } }
});


const logger = log4js.getLogger("render");
logger.level = "debug";

function oneSecond() {
    setTimeout(() => {
        logger.debug("render setTimeout 1s");
        oneSecond();
    }, 1000);
}
oneSecond();

setInterval(()=>{
    logger.debug("render setInterval 1s");
}, 1000)

ipcRenderer.on('setInterval1s', (event, message) => {
    logger.debug("main setInterval1s 1s");
})

ipcRenderer.on('setTimeout1s', (event, message) => {
    logger.debug("main setTimeout1s 1s");
})