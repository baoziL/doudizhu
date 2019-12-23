const global = require("./global.js")
cc.Class({
    extends: cc.Component,

    properties: {
        //数字空格
        nubBox : [cc.Node],
        closeNode:cc.Node,

    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {

        //数字显示数组
        this.createNubAry = [];
        this.updataNubBox(this.createNubAry,this.nubBox)

    },

    start () {
        cc.log(this.node._tag)

    },

    update (dt) {
        //cc.log(this.createNubAry)
    },

    //点击数字按键
    onNubClick(e,data)
    {
        //this.updataNubBox(this.createNubAry,this.nubBox)
        cc.log(data)
        if(data == "delete")
        {
            cc.log("click delete")
            this.createNubAry.splice(-1,1)
            this.updataNubBox(this.createNubAry,this.nubBox)
        }
        else if(data == "reset")
        {
            this.createNubAry = [];
            this.updataNubBox(this.createNubAry,this.nubBox)
        }
        else
        {
            let nub = parseInt(data)
            switch(nub)
            {
                case 1:
                if(this.createNubAry.length < 5)
                {
                    console.log(data)
                    this.createNubAry.push(data);
                    this.updataNubBox(this.createNubAry,this.nubBox)
                }
                break;
                case 2:
                if(this.createNubAry.length < 5)
                {
                    this.createNubAry.push(data);
                    this.updataNubBox(this.createNubAry,this.nubBox)
                }
                break;
                case 3:
                if(this.createNubAry.length < 5)
                {
                    this.createNubAry.push(data);
                    this.updataNubBox(this.createNubAry,this.nubBox)
                }
                break;
                case 4:
                if(this.createNubAry.length < 5)
                {
                    this.createNubAry.push(data);
                    this.updataNubBox(this.createNubAry,this.nubBox)
                }
                break;
                case 5:
                if(this.createNubAry.length < 5)
                {
                    this.createNubAry.push(data);
                    this.updataNubBox(this.createNubAry,this.nubBox)
                }
                break;
                case 6:
                if(this.createNubAry.length < 5)
                {
                    this.createNubAry.push(data);
                    this.updataNubBox(this.createNubAry,this.nubBox)
                }
                break; 
                case 7:
                if(this.createNubAry.length < 5)
                {
                    this.createNubAry.push(data);
                    this.updataNubBox(this.createNubAry,this.nubBox)
                }
                break;
                case 8:
                if(this.createNubAry.length < 5)
                {
                    this.createNubAry.push(data);
                    this.updataNubBox(this.createNubAry,this.nubBox)
                }
                break;
                case 9:
                if(this.createNubAry.length < 5)
                {
                    this.createNubAry.push(data);
                    this.updataNubBox(this.createNubAry,this.nubBox)
                }
                break;
                case 0:
                if(this.createNubAry.length < 5)
                {
                    this.createNubAry.push(data);
                    this.updataNubBox(this.createNubAry,this.nubBox)
                }
                break;                                               
           }
        }
        //
        if(this.createNubAry.length>4)
        {
            this.createRoJoin(this.createNubAry);
        }
    },
    updataNubBox(nubAry,itmeAry)
    {
        //cc.log(itmeAry)
        for(let j = 0 ; j < itmeAry.length  ;j++)
        {
            itmeAry[j].children[0].getComponent(cc.Label).string = "";
        }
        for(let i =0 ; i < nubAry.length  ;i++)
        {
            itmeAry[i].children[0].getComponent(cc.Label).string = nubAry[i]
        }
        cc.log(nubAry)
        //房间输入完成 创建房间  
        if(nubAry.length == 5 )
        {
            //创建房间 加入房间
        }

    },
    onCloseClick()
    {
        this.node.destroy();
        global.buttonController.setNowFloor(0);
    },

    //根据进入的按钮判断 this.node_tag 是createRoom还是joinRoom
    createRoJoin(data)
    {
        if(this.node._tag == "createRoom")
        {
            this.joinRoom(data);
        }
        else if(this.node._tag == "joinRoom")
        {
            this.createRoom(data);
        };

        this.createNubAry = [];
        this.onCloseClick();

    },
    
    joinRoom(data)
    {
        let _data = {

            msgType:"joinRoom",
            msg:"我要加入一个房间 房间号：" + data
        }
        global.socketioController.emit(_data)
        cc.director.loadScene("game.fire") 
    },
    createRoom(data)
    {

        let _data = {
            msgType:"createRoom",
            msg:"我要创建一个房间 房间号：" + data
        }
        global.socketioController.emit(_data)
        cc.director.loadScene("game.fire")
    }
});

