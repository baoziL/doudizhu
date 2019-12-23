var global = require("./../global.js")
cc.Class({
    extends: cc.Component,

    properties: {
     
        soundNode:cc.Node,
        sfxNode:cc.Node,
        soundSliderNode:cc.Node,
        sfxSliderNode:cc.Node,
        spriteFrameAtl:cc.SpriteAtlas,
        isSound:true,
        isSFX:true,
        
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {

        this.soundSliderNodeProgress = 0;
        this.sfxSliderNodeProgress = 0;

        this.soundNodeSfOff = this.soundNode.getComponent(cc.Sprite).spriteFrame
        this.soundNodeSfOn = this.spriteFrameAtl.getSpriteFrame("setting3");
        this.sfxNodeSfOff = this.sfxNode.getComponent(cc.Sprite).spriteFrame
        this.sfxNodeSfOn = this.spriteFrameAtl.getSpriteFrame("setting5");

        this.onSliderMove();
        //global.Utils.addClickEvent()

    },

    start () {

    },

    // update (dt) {},
    init(){
        
    },

    //当slider移动的cb
    onSliderMove()
    {
        this.soundSliderNodeProgress = this.soundSliderNode.getComponent(cc.Slider).progress

        this.sfxSliderNodeProgress = this.sfxSliderNode.getComponent(cc.Slider).progress

        this.soundSliderNode.getChildByName("up").getComponent(cc.Sprite).fillRange = this.soundSliderNodeProgress

        this.sfxSliderNode.getChildByName("up").getComponent(cc.Sprite).fillRange = this.sfxSliderNodeProgress
    },
    onSoundNodeBtnClick()
    {
        let sf = this.soundNode.getComponent(cc.Sprite).spriteFrame
        if(sf == this.soundNodeSfOff)
        {
            this.soundNode.getComponent(cc.Sprite).spriteFrame = this.soundNodeSfOn
            this.isSound = false;
            cc.log(this.isSound)
            this.soundNode.getChildByName("slider").getComponent(cc.Slider).enabled = false;
        }
        else
        {
            this.soundNode.getComponent(cc.Sprite).spriteFrame = this.soundNodeSfOff
            this.isSound = true;
            cc.log(this.isSound)
            this.soundNode.getChildByName("slider").getComponent(cc.Slider).enabled = true;
        }
    },
    onSFXNodeBtnClick()
    {
        let sf = this.sfxNode.getComponent(cc.Sprite).spriteFrame
        if(sf == this.sfxNodeSfOff)
        {
            this.sfxNode.getComponent(cc.Sprite).spriteFrame = this.sfxNodeSfOn;
            this.isSFX = false;
            cc.log(this.isSFX)
            this.sfxNode.getChildByName("slider").getComponent(cc.Slider).enabled = false;
        }
        else
        {
            this.sfxNode.getComponent(cc.Sprite).spriteFrame = this.sfxNodeSfOff
            this.isSFX = true;
            cc.log(this.isSFX)
            this.sfxNode.getChildByName("slider").getComponent(cc.Slider).enabled = true;
        }
    },
    onBtnClose()
    {
        this.node.destroy();
        global.buttonController.setNowFloor(0);
    }

    
});
