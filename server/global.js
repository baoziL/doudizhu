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

Array.prototype.compare = function(ary)
{
    //可以优化 思路 2个数组排序 检测_ary[0]在this 的下标index 然后检测_ary[0] == this[index] 类推下去 再得到 count 再检测count的值是否大于ary.length;
    let count = 0;
    for(let i =0 ; i < this.length ;i++)
    {
        for(let j =0 ; j < this.length ;j++)
        {
            if(this[i] === ary[j])
            {
                count++;
            } 
        }
    }
    if(count === ary.length)
    {
        return true;
    }
    else
    {
        return false;
    }
}
Array.prototype.subtract = function(ary)
{
    //同样可以优化，优化方法与上相同
    for(let i =0 ; i < this.length ;i++)
    {
        for(let j =0 ; j < this.length ;j++)
        {
            if(this[i] === ary[j])
            {
                this.splice(i,1)
            } 
        }
    }
    return this;
}