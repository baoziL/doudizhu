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



    let updataMyHandAry = function(ary)
    {
        myHandUpAry = []
        let nodeAry = cc.find("Canvas/bg/my/hand").children
        for(let i = 0; i < nodeAry.length ; i++)
        {
            if(nodeAry[i].isUp)
            {myHandUpAry.push(nodeAry[i]._cardNub)}
        }
        console.log("要出的牌 " + myHandUpAry)
        console.log("手牌 " + myHandAry)
        return null
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
        if(ary != null)
        {
            parent_node.removeAllChildren();
        }

        //ary.cardSort();
        for(let i = 0 ; i < ary.length ; i++)
        {
            let node = cc.instantiate(cardPrefab);
            node._cardNub = ary[i];
            node.getComponent(cc.Sprite).spriteFrame = getSpriteFrameByID(ary[i]);
            node.parent = parent_node;
            node.isUp = false;
            node.position = cc.v2(0,0)
            if(node.parent != cc.find("Canvas/bg/my/hand"))
            {
                node.getComponent(cc.Button).enabled = false;
            }
            node.on(cc.Node.EventType.TOUCH_START,()=>
            {
                if(node.parent == cc.find("Canvas/bg/my/hand"))
                {
                    node.isUp = !node.isUp
                    if(node.isUp) 
                    {node.position = cc.v2(0,20);}
                    else 
                    {node.position = cc.v2(0,0);}

                    updataMyHandAry(ary)
                }
            },this)
        };
    };
    //初始化
    that.init = function(cardPrefab,spriteAtlas)
    {

    };

    that.getMyHandUpAry = function()
    {
        return myHandUpAry;
    }

    that.playCard = function()
    {
        for(let i = 0; i < myHandAry.length ; i++)
        {
            for(let j = 0 ; j < myHandUpAry.length ; j++)
            {
                if(myHandAry[i] === myHandUpAry[j])
                {
                    cc.log(myHandAry[i]._cardNub + "=" + myHandUpAry[j]._cardNub)
                    let nub = myHandAry.splice(i,1)
                    cc.log("delet ：" + nub)
                }
            }
        }
        that.updataMyOut(myHandUpAry)

        that.updataHandByAry(myHandAry)

    };

    that.updataHandByAry = function(ary)
    {
        myHandAry = ary
        let my = myHandAry.cardSort(0)
        updataCard(cc.find("Canvas/bg/my/hand"),myHandAry);
    };

    that.updataMyOut = function(ary)
    {
        
        ary = myHandUpAry//test
        ary.cardSort(1);
        updataCard(cc.find("Canvas/bg/my/out"),ary);
    };
    that.updataLeftOut = function(ary)
    {
        updataCard(cc.find("Canvas/bg/left/out"),ary);
    };
    that.updataRightOut = function(ary)
    {
        updataCard(cc.find("Canvas/bg/right/out"),ary);
    };


    return that;
}
module.exports =  card;