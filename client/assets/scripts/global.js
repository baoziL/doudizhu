const audio = require("./component/audio.js")
const common = require("./common.js")
const Utils = require("./Utils.js")
const buttonController = require("./component/buttonController")
const socketioController = require("./component/socketioController")
const player = require("./component/player.js")
const card = require("./component/card")

const global = {}

global.audio = audio();
global.common = common();
global.Utils = Utils();
global.buttonController = buttonController();
global.socketioController = socketioController();
global.player = player();
global.card = card();

module.exports =  global;




String.prototype.format = function(args) { 
    if (arguments.length>0) { 
        var result = this; 
        if (arguments.length == 1 && typeof (args) == "object") { 
            for (var key in args) { 
                var reg=new RegExp ("({"+key+"})","g"); 
                result = result.replace(reg, args[key]); 
            } 
        } 
        else { 
            for (var i = 0; i < arguments.length; i++) { 
                if(arguments[i]==undefined) { 
                    return ""; 
                } 
                else { 
                    var reg=new RegExp ("({["+i+"]})","g"); 
                    result = result.replace(reg, arguments[i]); 
                } 
            } 
        } 
        return result; 
    } 
    else { 
        return this; 
    } 
};