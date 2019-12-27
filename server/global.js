const playData = require("./playerData.js");
const soketioController = require("./soketioControl.js");
const roomController = require("./roomController.js")
const game = require("./game.js")

const global = {};

global.playData = playData();
global.soketioController = soketioController();
global.roomController = roomController();
global.game = game();


module.exports = global;