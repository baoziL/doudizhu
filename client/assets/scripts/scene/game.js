const global = require("./../global.js")
cc.Class({
    extends: cc.Component,

    properties: {

        SpriteAtlas:cc.SpriteAtlas,
        playCardNode:cc.Node,
        noPlayNode:cc.Node,
        timeNode:cc.Node,
        suggestNode:cc.Node,
        playControlNode:cc.Node,

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
        cc.log(cc.find("Canvas/bg/my/myHand").children)
    },
    onPlayCardBtnClick()
    {
        //出牌
        global.card.playCard();
    },
    onNoPlayBtnClick()
    {
        //不出
    },
    onSuggestBtnClick()
    {

        //提示
    },

    // update (dt) {},
});
