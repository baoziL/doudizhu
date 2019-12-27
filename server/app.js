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
            console.log("result : "+result)
            let _player = {

                uniqueID: msg.player.uniqueID, 
                nickName: "nickname", 
                avatarUrl: "avatar",
            }


            if(result === false)
            {
                //如果没有房间 创建房间 并加入该玩家
                let _room = new room;
                _room.players.push({        uniqueID: msg.player.uniqueID, 
                nickName: "nickname", 
                avatarUrl: "avatar",});

                _room.roomID = msg.roomID;

                //服务器创建房间
                global.roomController.rooms.push(_room)

                socket.join(msg.roomID, () => {

                    let rooms = Object.keys(socket.rooms);
                    console.log("rooms: "+rooms); // [ <socket.id>, 'room 237' ]
    
                    //告知其他在同一房间的客户端
                    socket.broadcast.to(msg.roomID).emit('String',msg.player.uniqueID+"加入房间"+msg.roomID)
                })

                result = global.roomController.checkRoom(msg.roomID)
                console.log("false result : "+result)

                console.log("global.roomController.rooms ↓↓↓")
                
                console.log(global.roomController.rooms)
                cb(true);

            }
            else if(global.roomController.rooms[result].players.length < 3)
            {

                //如果房间存在，检测房间内的玩家数是否小于3且房间不存在该玩家  加入玩家

                console.log("房间存在,检测房间内的玩家数是否小于3且房间不存在该玩家")

                let _result = 
                global.roomController.checkPlayer(global.roomController.rooms[result],_player)


                console.log("_result : "+_result)

                if(_result)
                {
                    console.log("检测房间内是否存在该玩家 返回房间")
                    //检测房间内是否存在该玩家 返回房间
                    socket.broadcast.to(msg.roomID).emit('String',msg.player.uniqueID+"返回房间"+msg.roomID)
                    cb(true);
                }
                else
                {
                    //检测房间内是否存在该玩家  不存在  加入该玩家
                    global.roomController.rooms[result].players.push(_player)

                    socket.join(msg.roomID, () => {

                        let rooms = Object.keys(socket.rooms);
                        console.log("rooms: "+rooms); // [ <socket.id>, 'room 237' ]
        
                        //告知其他在同一房间的客户端
                        socket.broadcast.to(msg.roomID).emit('joinRoom',msg.player.uniqueID)
                    })
                    cb(true);
                }
                





            }
            else
            {
                //房间人满了

                cb(false);
                //告知房间人数已经满了
                socket.emit("notily",{msgType:"alert",msg:"房间人数已满"})
            }



            // global.roomController.joinRoom(msg.player,msg.roomID,() =>
            // {
            //     global.soketioController.app.sockets.emit('String',msg.player.uniquenID+"加入房间");
            // })
            console.log("房间号： "+msg.roomID+"  玩家人数： "+global.roomController.rooms[result].players.length)
            //console.log("joinRoom")
            break;
        case "returnRoom":
            console.log(msg)
            break;
        case "playCard":
            // global.soketioController.app.sockets.emit('String',msg.player.uniquenID+"打出"+msg.player.cards);
            socket.broadcast.to(msg.roomID).emit('String',msg.player.uniqueID+"打出"+msg.player.cards)
            //cb(JSON.stringify(msg));
            break;
        case "gameStart":
            console.log(msg)

            //检测是否达到游戏开始条件
            let _ret = global.roomController.checkGameIsPlay(msg.roomID,msg.player.uniqueID)
            cb(_ret)//返回true or false
            if(_ret)
            {
                //开始游戏
                //游戏初始化
                let playersCard = global.game.iniGame();

                let room =
                global.roomController.rooms[global.roomController.checkRoom(msg.roomID)]

                //给房间内的各个玩家初始化手牌，手牌长度长的为地主

                let playersID = [];
                for(let i = 0 ; i < room.players.length; i++)
                {
                    room.players[i].cards = playersCard[i];
                    playersID.push(room.players[i].uniqueID);
                }

                //告知客户端游戏开始。并发送手牌数据给他们
                for(let j = 0 ; j < room.players.length; j++)
                {
                    socket.to(playersID[j]).emit('gameStart',{player:room.players[j]});
                }


                // socket.broadcast.to(msg.roomID).emit('notily',{msgType:"gameStart",msgType:null})

            }

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