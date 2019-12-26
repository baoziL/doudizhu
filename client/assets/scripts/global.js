const audio = require("./component/audio.js")
const common = require("./common.js")
const Utils = require("./Utils.js")
const buttonController = require("./component/buttonController")
const socketioController = require("./component/socketioController")
const player = require("./component/player.js")
const card = require("./component/card")
const roomController = require("./component/roomController")

const global = {}

global.audio = audio();
global.common = common();
global.Utils = Utils();
global.buttonController = buttonController();
global.socketioController = socketioController();
global.player = player();
global.card = card();
global.roomController = roomController();

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
/** 
    !#zh 卡牌排序  0 倒序 1 正序
*/
Array.prototype.cardSort = function(nub)
{
    this.sort(function (a,b)
    {
        if(a < 52 && b < 52)
        {
            a = a%13
            b = b%13
        }
        if(nub)
        {
            return a-b
        }
        else
        {
            return b-a
        }
        
    });
}