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
        
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {

          
        let leftPlayerData = cc.find("Canvas/bg/gameMessage/leftPlayerMsg")
        let rightPlayerData = cc.find("Canvas/bg/gameMessage/rigthPlayerMsg")
        let myPlayerData = cc.find("Canvas/bg/gameMessage/myPlayerMsg")
        let gameStartBtn = cc.find("Canvas/bg/gameStart")


        player.playerData.uniqueID = global.socketioController.get_socketID()


        //游戏信息ID,人员到齐的等待
        let _playerID = global.socketioController.get_socketID()
        myPlayerData.getChildByName("playerID").getComponent(cc.Label).string = _playerID

        let upDataPlayerMsg = function(playerIDAry,playerID)
        {
            let site = null;
            for(let i = 0 ; i < playerIDAry.length;i++)
            {
                if(playerIDAry[i] === playerID)
                {
                    site = i
                    player.index = site;
                }
            }
            console.log("site:"+site)
            if(site == 0)
            {
                rightPlayerData.getChildByName("playerID").getComponent(cc.Label).string = playerIDAry[1];
                if(playerIDAry.length > 2)
                {
                    leftPlayerData.getChildByName("playerID").getComponent(cc.Label).string = playerIDAry[2];
                }
                player.leftPlayer = 2;
                player.rightPlayer = 1;
            }
            else if(site == 1)
            {
                leftPlayerData.getChildByName("playerID").getComponent(cc.Label).string = playerIDAry[0];
                if(playerIDAry.length > 2)
                {
                    rightPlayerData.getChildByName("playerID").getComponent(cc.Label).string = playerIDAry[2];
                }
                player.leftPlayer = 0;
                player.rightPlayer = 2;
            }
            else if(site == 2)
            {
                leftPlayerData.getChildByName("playerID").getComponent(cc.Label).string = playerIDAry[1];
                if(playerIDAry.length > 2)
                {
                    rightPlayerData.getChildByName("playerID").getComponent(cc.Label).string = playerIDAry[0];
                }
                player.leftPlayer = 1;
                player.rightPlayer = 0;
            }
        }

        let playerID = [];
        global.socketioController.get_socket().on("joinRoom",function(res,cb)
        {
            let temp = [];
            console.log(res+"joinRoom")
            for(let i = 0 ; i < res.length;i++)
            {
                console.log(res[i])
                temp.push(res[i].uniqueID)
                console.log(temp);
                player.roomData = temp;
            }
            upDataPlayerMsg(temp,_playerID);
            console.log("player.playerData ↓↓↓");
            console.log(player.playerData);
            //console.log(cb)
        })
        let startGame = function(judge)
        {
            gameStartBtn.active = judge
        }
        global.socketioController.get_socket().on("room-player-status",function(res,cb)
        {
            console.log(res)
            if(res.allStandBy)
            startGame(res.allStandBy)
        })


        global.socketioController.get_socket().on("gameStart",function(res)
        {
            //res: 0 player 
            player.playerData = res.player;
            player.playerData.index = player.index;

            setTimeout(()=>
            {
                global.card.updataHandByAry(player.playerData.cards);
                console.log("player.playerData↓↓↓↓")
                console.log(player.playerData)
            },500)
        })

        global.socketioController.get_socket().on("playCard",function(res)
        {
            console.log(res);
            //res: uniqueID 出牌人ID ， playCards 出的牌  palyerIndex 该玩家再这局游戏的位置
            if(res.palyerIndex == player.leftPlayer)
            {
                global.card.updataLeftOut(res.playCards)
            }
            else if(res.palyerIndex == player.rightPlayer)
            {
                global.card.updataRightOut(res.playCards)
            }
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
        console.log("player.playerData↓↓↓")
        console.log(player.playerData)
        console.log("global.card.getMyHandUpAry()↓↓↓")
        console.log(global.card.getMyHandUpAry())
        player.playerData.playCards = global.card.getMyHandUpAry();
        let cards = player.playerData.cards;


        let msg = 
        {
            player: player.playerData,
            roomID: player.playerData.roomID,
        }
        global.socketioController.emit({msgType:"playCard",
        msg:msg})

        let result = global.card.getMyHandUpAry();
        if(result.length == 0)
        {
            result = false;
        }
        else
        {
            result = true;
        }

        setTimeout(()=>
        {
            if(result && player.isCanPlayer)
            {
                global.card.playCard();
                //
                player.clearPlayerSate();
            }
            else
            {
                console.log("请重新选择你要出的牌")

                global.card.updataHandByAry(cards)
            }
        },500)
        cc.log("出牌")
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
        let canStart = null;
        let msg =
        {
            roomID : player.playerData.roomID,
            player : player.playerData,
        }
        global.socketioController.emit({msgType:"gameStart",
        msg:msg})

        canStart = player.isGameStart;
        console.log("canStart : "+canStart)
        setTimeout(()=>
        {
            if(canStart)
            {
                cc.find("Canvas/bg/gameStart").active = false;
            }
            else
            {
                console.log("还没达到游戏开始的条件")
            }
        },500)


    },
    
    //是否你的回合
    isTurn()
    {
        this.playControlNode.active = true;
    },

    update (dt) {


    },
});
