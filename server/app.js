const global = require("./global.js");
const socket = require("socket.io");

const app = socket("3000");

app.on("connection",function(socket)
{
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
                console.log(msg)
                break;
            case "joinRoom":
                console.log(msg)
                break;
            case "returnRoom":
                console.log(msg)
                break;
            case "startGame":
                console.log(msg)
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