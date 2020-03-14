const room = require("./room.js")
const roomController = function()
{
    const that = {};
    
    // room = {

    //     palyers = [];

    //     roomID = null;
    
    //     dizhu = null;
    // }

    that.rooms = [{test:"test"}];

    that._socket = null

    that.upDataRoomData = function(roomID,palyerData,room)
    {
        let index = that.checkRoom(roomID);
        that.rooms[index] = room;
    }
    that.checkRoom = function(roomID)
    {
        //检查房间是否存在
        for(let i = 0 ; i < that.rooms.length ;i++)
        {
            if(that.rooms[i].roomID == roomID)
            {i
                console.log("当前房间的下标为"+i)
                return i;
            }
        }
        console.log("没有该房间")
        return false;
    }
    //检测指定room 内是否存在 player 
    that.checkPlayer = function(room,player)
    {
        for(let i = 0 ; i < room.players.length; i++)
        {
            if(room.players[i].uniqueID === player.uniqueID)
            {
                console.log("房间内查找到该玩家")
                return true;
            }
        }
        console.log("房间内查找不到该玩家")
        return false;
    }
    that.checkGameIsPlay = function(roomID,palyer)
    {
        let result = that.checkRoom(roomID)
        console.log("checkGameIsPlay.result:"+result)
        if(result == false) 
        {
            return false;
        }
        else 
        {
            let _result = that.checkPlayer(that.rooms[result],palyer)
            if(_result && that.rooms[result].players.length == 3 )
            {
                return true;
            }
            else
            {
                return false;
            }
        }
    }

    that.init = function(socket)
    {
        that._socket = socket
    }
    that.createRoom = function(roomID)
    {
        let result = checkRoom(roomID)
        if(result != false)
        {
            that._socket.emit("notily",{msgType:"alert",msg:"房间已存在"})
            return
        }
        let _room = room();
        room.roomID = roomID;
        that.rooms.push(_room);
        console.log("创建房间"+room.roomID+"号")

    }
    that.joinRoom = function(player,roomID,cb)
    {
        console.log("joinRoom11111111111")
        //if(roomID == null) return;
        //if(player == null) return;
        //判断房间是否存在该用户
        let result = checkRoom(roomID)
        console.log(result === false)
        if(result === false) 
        {
            that._socket.emit("notily",{msgType:"alert",msg:"找不到房间"})

            return ;
        }

        that.rooms[result].players.push(player)
        console.log("玩家"+player.uniquenID+"加入房间"+roomID+"号")//test
        console.log("test房间"+that.rooms[0]);

        console.log("test房间有"+that.rooms[0].players.length+"个人");
        cb();
        // for(let j = 0 ; j <that.rooms[result].players.length; j++)
        // {
        //     if(that.rooms[result].players[j] == player)
        //     {
        //         return;
        //     }
        //     else
        //     {
        //         //如果没有就加入该角色
        //         that.rooms[result].players.push(player)
        //         console.log("玩家"+player.uniquenID+"加入房间"+room.roomID+"号")
        //     }
        // }
        // return null;
    }


    return that;

}
module.exports = roomController;


