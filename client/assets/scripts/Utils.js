const Utils = function()
{
    let that = {};

    that.addClickEvent = function(node,target,compoent,handler)
    {
        //注册事件
        let eventHandler = new cc.Component.EventHandler();
        eventHandler.target = target;
        eventHandler.component = compoent;
        eventHandler.handler = handler;

        let clickEvents = node.getComponent(cc.Button).clickEvents;

        clickEvent.push(eventHandler);
    }

    that.addSlideEvent = function(node,target,compoent,handler)
    {
        let eventHandler = new cc.Component.EventHandler();
        eventHandler.target = target;
        eventHandler.component = compoent;
        eventHandler.handler = handler;

        let slideEvents = node.getComponent(cc.Slider).slideEvents;

        slideEvents.push(eventHandler);
    }

    //游戏退出逻辑
    that.addEseEvent= function(node)
    {
        cc.eventManager.addListener({event:cc.EventManager.KEYBOARD , onKeyPressed : function(keyCode,event)
        {
        },
        onKeyReleased : function(keyCode,event)
        {
            // if(keyCode == cc.KEY.back){
            //     cc.vv.alert.show('提示','确定要退出游戏吗？',function(){
            //         cc.game.end();
            //     },true);
            // }
        }},node);
    }

    
    that.setFitSreenMode = function()
    {

        let node = cc.find("Canvas");
        let size = cc.view.getFrameSize();
        let w = size.width;
        let h = size.height;

        let cvs = node.getComponent(cc.Canvas);
        let dw = cvs.designResolution.width;
        let dh = cvs.designResolution.height;

        if((w / h)  > (dw / dh)){
            cvs.fitHeight = true;
            cvs.fitWidth = false;
        }
        else{
            //如果更高，则让宽显示满
            cvs.fitHeight = false;
            cvs.fitWidth = true;
        }
        
    }
    
    return that;
}
module.exports = Utils;