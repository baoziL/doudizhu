const global = require("../global.js")
//developer 
//var socket = io("localhost:3000")
cc.Class({
    extends: cc.Component,

    properties: {

 
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        //global.audio.init();

        //global.audio.playBGM("MusicEx_Normal")

        //cc.log(socket.id)

        //socket.emit("tes");
    },

    start () {

    },

    update (dt) {
        
    },
    onWxLoginBtn(e,data)
    {
        //global.audio.playSFX()
        cc.log(data)
        if(data == "test")
        {
            let _data = {msgType:"login",msg:"test"}
            let _res = {
                uniqueID: 1, 
                nickName: 2, 
                avatarUrl: 3,
            }
            global.socketioController.emit(_data);
            //global.player.setPlayerData( _res)
            cc.director.loadScene("hall.fire",function()
            {

            })
        }
        else if("wx")
        {
            //得到微信登录信息
            //发送给服务器

        }
    }
});
