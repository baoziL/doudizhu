const global = require("../global.js")
cc.Class({
    extends: cc.Component,

    properties: {

        settingNode:null,
        settingPrefab:cc.Prefab,
        createRoomBtnNode :cc.Node,
        joinRoomBtnNode : cc.Node,
        returnRoomBtnNode : cc.Node,
        nubClickNode:cc.Prefab,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        //init
        global.Utils.setFitSreenMode();
        global.buttonController.init();

        this.init();
    },

    start () {
        
        let data = {
            msgType : "test",
            msg : "我在大厅"

        }
        
        global.socketioController.emit(data)

    },
    init()
    {
        //初始化设置按钮 
        this.settingNode = cc.find("Canvas/bg/top/shezhi");

        if(this.settingNode){

        this.settingNode.addComponent(cc.Button);
        this.settingNode.getComponent(cc.Button).transition = cc.Button.Transition.SCALE;
        this.settingNode.on("click",this.onSettingBtnClick,this)

        }
        

        
    },
    onSettingBtnClick()
    {
        //如果存在setNode 点击无效
        if(cc.find("Canvas/setNode")) return

        let settingNode = cc.instantiate(this.settingPrefab);
        settingNode.parent = cc.find("Canvas");
        settingNode.position = cc.v2(0,0);
        cc.log(settingNode)

        //关闭第一层按钮点击
        global.buttonController.setNowFloor(1);

    },
    onGameOptionClick(e,data)
    {
        let nubClickNode = this.nubClickNode
        let createNode = function(str)
        {
            if(cc.find("Canvas/craeteRoomBox")) return

            let node = cc.instantiate(nubClickNode)
            node.parent = cc.find("Canvas");
            node.position = cc.v2(0,0);
            node._tag = str;
            global.buttonController.setNowFloor(1);
        }
        
        switch(data)
        {
            case "createRoom":

                createNode("createRoom")
                break;

            case "joinRoom":

                createNode("joinRoom")
                break;

            case "returnRoom":
                
                break;

            default :
                break                

        }
    }

    // update (dt) {},
});