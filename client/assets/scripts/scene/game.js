const global = require("./../global.js")
cc.Class({
    extends: cc.Component,

    properties: {

        SpriteAtlas:cc.SpriteAtlas,

        playControlNode:cc.Node,
        playCardNode:cc.Node,
        noPlayNode:cc.Node,
        timeNode:cc.Node,
        suggestNode:cc.Node,

        turn:0
        
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {

        this.playCardNode.on("click",this.onPlayCardBtnClick,this);
        this.noPlayNode.on("click",this.onNoPlayBtnClick,this);
        this.suggestNode.on("click",this.onSuggestBtnClick,this);
    },

    start () {
        this.gameStart();
    },
    
    gameStart()
    {
        let handArtTest = ()=>
        {
            let ary = []
            for(let i = 17 ; i < 34 ; i++)
            {
                ary.push(i)
            }

            return ary
        }
        global.card.updataHandByAry(handArtTest())
        cc.log(cc.find("Canvas/bg/my/hand").children)
    },
    onPlayCardBtnClick()
    {
        //出牌
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
    //是否你的回合
    isTurn()
    {
        this.playControlNode.active = true;
    }

    // update (dt) {},
});
