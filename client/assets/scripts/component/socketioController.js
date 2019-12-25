const socketioController = function()
{
    let that = {};
    
    let _url = null;
    let _socket = io("localhost:3000")

    //test
    let playerID = null
    _socket.on('connect', () => {

        console.log(_socket.id); // 'G5p5...'
        playerID = _socket.id;
      });

    that.init = function()
    {
        //_socket = io(_url);
    }
    that.get_socket = function()
    {
        return _socket;
    }
    that.get_socketID = function()
    {
        return playerID;
    }
    that.emit = function(data)
    {
        _socket.emit("notify",data,(cb)=>
        {
            let msgType = data.msgType
            console.log(cb);
            switch(msgType)
            {
                case "login":

                    break;

                default:
                    break;
            }
        })
    }
    that.on = function(data)
    {
        _socket.on("notily",function(res,cb)
        {
            let msgType = res.msgType
            let msg = res.msg
            switch(msgType)
            {
                case "alert":
   
                console.log("alert"+msg);
                    break;
                case "createRoom":
                    global.roomController.createRoom(msg)
                    console.log(msg)
                    break;
                case "joinRoom":
                    global.roomController.joinRoom(msg.player,msg.roomID)
                    console.log("joinRoom")
                    break;
                case "returnRoom":
                    console.log(msg)
                    break;
                case "playCard":
                    console.log(msg)
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
    }

    return that;
}
module.exports = socketioController;