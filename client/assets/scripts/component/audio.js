var common = require("./../common.js");

const audio = function()
{
    let that = {};
    //属性
    that.bgmVolume = 1;
    that.sfxVolume = 1;
    that.bgmAudioID = -1;
    that.bgm = undefined
    

    //初始化背景音乐
    that.init = function()
    {
        console.log("init")
        let t = cc.sys.localStorage.getItem("bgmVolume");
        if(t != null)
        {
            that.bgmVolume = parseFloat(t);
        };
        
        let te = cc.sys.localStorage.getItem("sfxVolume");
        if(te != null)
        {
            that.sfxVolume = parseFloat(te);
        };

        cc.game.on(cc.game.EVENT_HIDE,function()
        {
            console.log("game hide ,audio stop")
            cc.audioEngine.pauseAll();
        });

        cc.game.on(cc.game.EVENT_SHOW,function()
        {
            console.log("game show ,audio play")
            cc.audioEngine.resumeAll();
        });
        

    };

    that.getAudioByUrl = function(url)
    {
        //let self = that.bgm
        let audio = undefined;
        cc.loader.loadRes("audio/"+url,function(err,audioClip)
        {
            if(err)
            {
                console.log(err)
                return;
            }
            else
            {
                that.bgm = audioClip
                //audio = audioClip
                cc.log("2")
            }
        })

        return audio


    };

    that.playBGM = function(url)
    {
        let audioClip = that.bgm
        let audio = that.getAudioByUrl(url)
        if(that.bgmAudioID >= 0)
        {
            cc.audioEngine.stop(that.bgmAudioID);
        };
        if(audioClip == undefined)
        {
            setTimeout(function(){
            that.bgmAudioID = cc.audioEngine.play(that.bgm,true,that.bgmVolume);
            cc.log(that.bgmAudioID)   
            }, 400);
            cc.log("setTimeout")
        }
        else
        {
            that.bgmAudioID = cc.audioEngine.play(audioClip,true,that.bgmVolume);  
        }
    
    };

    that.playSFX = function(url)
    {
        let audioClip = that.getAudioByUrl(url);
        if(that.sfxVolume > 0){
            setTimeout(function()
            {
                let audioId = cc.audioEngine.play(audioClip,false,that.sfxVolume);
            },100)
    
        }
    };
    that.setBGMVolume = function(volume,force)
    {
        //检查bgm是否在播放
        if(that.bgmAudioID >= 0)
        {
            if(volume > 0)
            {
                cc.audioEngine.resume(that.bgmAudioID);
            }
            else
            {
                cc.audioEngine.stop(that.bgmAudioID);
            }
        }
        if(that.bgmVolume != volume || force)
        {
            cc.sys.localStorage.getItem("bgmVolume",volume);
            that.setBGMVolume = volume;
            cc.audioEngine.setVolume(that.bgmAudioID,volume)
        }
    };
    that.setSFXVolume = function(volume)
    {
        if(that.sfxVolume != volume){
            cc.sys.localStorage.setItem("sfxVolume",volume);
            that.sfxVolume = volume;
        }
    };

    that.pauseAll = function()
    {
        cc.audioEngine.pauseAll();
    };
    that.resumeAll = function()
    {
        cc.audioEngine.resumeAll();
    }
    
        


    that.getAudioOfRes = function(str)
    {
        cc.loader.load(str,function(err,data)
        {

        });
    }
    return that;
}
//
module.exports = audio;