const global = require("./global.js");

const cardRule = require("./cardRule.js")




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
            global.roomController.joinRoom(msg.player,msg.roomID,() =>
            {
                global.soketioController.app.sockets.emit('String',msg.player.uniquenID+"加入房间");
            })
            console.log("joinRoom")
            break;
        case "returnRoom":
            console.log(msg)
            break;
        case "playCard":
            global.soketioController.app.sockets.emit('String',msg.player.uniquenID+"打出"+msg.player.cards);
            cb(JSON.stringify(msg));
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