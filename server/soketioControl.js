const socket = require("socket.io");
const soketioController = function()
{

    const that = {};

    that.app = socket("3000");


    return that;
}
module.exports = soketioController;