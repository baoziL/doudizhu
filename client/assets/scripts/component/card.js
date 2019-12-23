const card = function()
{
    const that = {};
    let myHandAry = [];
    let myHandUpAry = []
    let myOut = [];
    let leftOut = [];
    let rightOut = [];
    let cardPrefab = null;
    let spriteAtlas = null; 

    cc.loader.loadRes("prefabs/Club.prefab",(err,res)=>
    {
        if(err){console.log("err:"+err); return;}
        cardPrefab = res;
    });
    cc.loader.loadRes("poker/sprites.plist",cc.SpriteAtlas,(err,res)=>
    {
        if(err){console.log("err:"+err); return;}
        spriteAtlas = res;
        //cc.log(res);
    });



    let updataMyHandAry = function()
    {
        myHandUpAry = []
        let nodeAry = cc.find("Canvas/bg/my/myHand").children
        for(let i = 0; i < nodeAry.length ; i++)
        {
            if(nodeAry[i].isUp)
            {myHandUpAry.push(nodeAry[i]._cardNub)}
        }
        console.log(myHandUpAry)
    };

    let getSpriteFrameByID = function(ID)
    {
        let str = cardSrt[ID];
        cc.log(str);
        let _spriteFrame = spriteAtlas.getSpriteFrame(str);
        return _spriteFrame;
    };

    let updataCard = function(parent_node,ary)
    {
        parent_node.removeAllChildren();
        for(let i = 0 ; i < ary.length ; i++)
        {
            let node = cc.instantiate(cardPrefab);
            node._cardNub = ary[i];
            node.getComponent(cc.Sprite).spriteFrame = getSpriteFrameByID(ary[i]);
            node.parent = parent_node;
            node.isUp = false;
            node.position = cc.v2(0,0)
            node.on(cc.Node.EventType.TOUCH_START,()=>
            {
                node.isUp = !node.isUp
                if(node.isUp) 
                {node.position = cc.v2(0,20);}
                else 
                {node.position = cc.v2(0,0);}
                updataMyHandAry()
            },this)
        };
    };
    //初始化
    that.init = function(cardPrefab,spriteAtlas)
    {

    };

    that.playCard = function()
    {
        for(let i = 0; i < myHandAry.length ; i++)
        {
            for(let j = 0 ; j < myHandUpAry.length ; j++)
            {
                //bug手牌消失
                cc.log(myHandAry)
                if(myHandAry[i]._cardNub == myHandUpAry[j]._cardNub)
                {
                    myHandAry.splice(i,1)
                    cc.log(myHandAry)
                }
            }
        }
        cc.log(myHandAry)
        that.updataMyOut(myHandUpAry)
        that.updataHandByAry(myHandAry)

    };

    that.updataHandByAry = function(ary)
    {
        updataCard(cc.find("Canvas/bg/my/myHand"),ary);
    };

    that.updataMyOut = function(ary)
    {
        updataCard(cc.find("Canvas/bg/my/myOut"),ary);
    };
    that.updataLeftOut = function(ary)
    {

    };
    that.updataRightOut = function(ary)
    {

    };


    return that;
}
module.exports =  card;