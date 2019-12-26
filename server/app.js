const global = require("./global.js");

const cardRule = require("./cardRule.js")
const room = require("./room.js");




global.soketioController.app.on("connection",function(socket)
{
    global.roomController.init(socket);

socket.on("notify",function(res,cb)
{
    // cb("server get msg" + JSON.stringify(res));
    // cb("server get msg1" + JSON.stringify(res));

    console.log(' a user login = ' + JSON.stringify(res));

    let msgType = res.msgType
    let msg = res.msg

    switch(msgType)
    {
        case "login":
            console.log(msg)
            let data = global.playData.getPlayerDataByID(msg);
            console.log(data);
            cb(JSON.stringify(data));
            break;
        case "createRoom":
            global.roomController.createRoom(msg)
            console.log(msg)
            break;
        case "joinRoom":

            let result = global.roomController.checkRoom(msg.roomID)
            let _player = {

                uniqueID: msg.player.uniquenID, 
                nickName: "nickname", 
                avatarUrl: "avatar",
            }

            if(result === false)
            {
                //如果没有房间 创建房间 并加入该玩家
                let _room = new room;
                _room.players.push({        uniqueID: msg.player.uniquenID, 
                nickName: "nickname", 
                avatarUrl: "avatar",});
                _room.roomID = msg.roomID;

                global.roomController.rooms.push(_room)

            }
            else if(global.roomController.rooms[result].players.length < 3)
            {

                //如果房间存在，检测房间内的玩家数是否小于3且房间不存在该玩家  加入玩家

                let _result = 
                global.roomController.checkPlayer(global.roomController.rooms[result],_player)
                if(_result)
                {
                    //检测房间内是否存在该玩家 返回房间
                }
                else
                {
                    //检测房间内是否存在该玩家  不存在  加入该玩家
                    global.roomController.rooms[result].players.push(_player)

                    socket.join(msg.roomID, () => {

                        let rooms = Object.keys(socket.rooms);
                        console.log("rooms: "+rooms); // [ <socket.id>, 'room 237' ]
        
                        //告知其他在同一房间的客户端
                        socket.broadcast.to(msg.roomID).emit('String',msg.player.uniquenID+"加入房间"+msg.roomID)
                    })
                }
                





            }
            else
            {
                //房间人满了
                socket.emit("notily",{msgType:"alert",msg:"房间人数已满"})
            }






            // global.roomController.joinRoom(msg.player,msg.roomID,() =>
            // {
            //     global.soketioController.app.sockets.emit('String',msg.player.uniquenID+"加入房间");
            // })
            console.log("joinRoom")
            break;
        case "returnRoom":
            console.log(msg)
            break;
        case "playCard":
            // global.soketioController.app.sockets.emit('String',msg.player.uniquenID+"打出"+msg.player.cards);
            socket.broadcast.to(msg.roomID).emit('String',msg.player.uniquenID+"打出"+msg.player.cards)
            //cb(JSON.stringify(msg));
            break;
        case "createRoom":
            console.log(msg)
            break;
        case "joinRoom":
            console.log(msg)
            break;
        case "returnRoom":
            console.log(msg)                
            break;                
        
        default:
        break
        
    }

})
})


console.log("server 3000")