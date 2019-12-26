
const buttonController = function()
{
    let that = {};

    that.nowFloor = 0;
    //底层按钮
    that.firstFloor = [];

    that.secondFloor = [];

    that.init = function()
    {
        //初始化第一层
        that.firstFloor.push(cc.find("Canvas/bg/top/shezhi"))
        that.firstFloor.push(cc.find("Canvas/bg/gameOption/createRoom"))
        that.firstFloor.push(cc.find("Canvas/bg/gameOption/joinRoom"))
        that.firstFloor.push(cc.find("Canvas/bg/gameOption/returnRoom"))

    }
    that.checkNowFloor = function()
    {
        if(that.nowFloor == 0)
        {
            for(let i = 0 ; i < that.firstFloor.length ; i++)
            {
                that.firstFloor[i].getComponent(cc.Button).enabled = true;
            }
        }
        else if(that.nowFloor == 1)
        {
            for(let i = 0 ; i < that.firstFloor.length ; i++)
            {
                that.firstFloor[i].getComponent(cc.Button).enabled = false;
            }
        }
    }
    
    /**
     *开启或者关闭第一层button点击
     *参数说明 0 开启 1 关闭
	@param nub nub
	*/
    that.setNowFloor = function(nub)
    {
        that.nowFloor = nub;
        that.checkNowFloor();
    }

    return that;
}
module.exports = buttonController;