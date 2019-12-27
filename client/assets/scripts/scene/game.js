const global = require("./../global.js")
const player = require("./../component/player")
cc.Class({
    extends: cc.Component,

    properties: {

        SpriteAtlas:cc.SpriteAtlas,

        playControlNode:cc.Node,
        playCardNode:cc.Node,
        noPlayNode:cc.Node,
        timeNode:cc.Node,
        suggestNode:cc.Node,

        leftPlayerData:cc.Node,
        rightPlayerData:cc.Node,
        myPlayerData:cc.Node,

        turn:0,
        //游戏是否能开始
        
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {

          
        this._player = 
        {
            roomID:null,
            uniqueID:null,
            cards:null,
            playCards:null,
        }

        this._player.uniqueID = global.socketioController.get_socketID()

        this.myPlayerData.getChildByName("playerID").getComponent(cc.Label).string = this._player.uniqueID
        let upDataAotherPlayerData = function()
        {
            let strL = this.leftPlayerData.getChildByName("playerID").getComponent(cc.Label).string
            if(strL == null)
            {
                this.leftPlayerData.getChildByName("playerID").getComponent(cc.Label).string = playerID[0];
            }
            let strR= this.rightPlayerData.getChildByName("playerID").getComponent(cc.Label).string
            if(strR == null)
            {
                this.rightPlayerData.getChildByName("playerID").getComponent(cc.Label).string = playerID[1];
            }
        }

        let playerID = [];
        global.socketioController.get_socket().on("String",function(res,cb)
        {
            console.log(res)
            playerID.push(res)   
            upDataAotherPlayerData();
            //console.log(cb)
        })


        // let msg = {msgType:"joinRoom",msg:{player:this._player,roomID:8888}}
        //global.socketioController.emit(msg);

        //服务器监听
        //global.soc 5ketioController.on();



        this.playCardNode.on("click",this.onPlayCardBtnClick,this);
        this.noPlayNode.on("click",this.onNoPlayBtnClick,this);
        this.suggestNode.on("click",this.onSuggestBtnClick,this);
    },

    start () {
        this.gameStart();
    },
    
    gameStart()
    {
        // let handArtTest = ()=>
        // {
        //     let ary = []
        //     for(let i = 17 ; i < 34 ; i++)
        //     {
        //         ary.push(i)
        //     }

        //     return ary
        // }
        //global.card.updataHandByAry()
        cc.log(cc.find("Canvas/bg/my/hand").children)
    },
    onPlayCardBtnClick()
    {
        //出牌
        
        this._player.cards = global.card.getMyHandUpAry();

        let msg = 
        {
            player:this._player,
            roomID: global.roomController.roomID,
        }
        global.socketioController.emit({msgType:"playCard",
        msg:msg},)
        global.card.playCard();
        cc.log("出牌")
        this.playControlNode.active = false;
        cc.log(this.playControlNode)
    },
    onNoPlayBtnClick()
    {
        //不出
        cc.log("不出牌")
    },
    onSuggestBtnClick()
    {
        //提示
        cc.log("提示")
    },
    onGameStartBtn()
    {
        let msg =
        {
            roomID : player.playerData.roomID,
            player : player.playerData,
        }
        global.socketioController.emit({msgType:"gameStart",
        msg:msg},)
    },
    
    //是否你的回合
    isTurn()
    {
        this.playControlNode.active = true;
    }

    // update (dt) {},
});
