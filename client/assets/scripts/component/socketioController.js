const socketioController = function()
{
    let that = {};
    
    let _url = null;
    let _socket = io("localhost:3000")

    that.init = function()
    {
        //_socket = io(_url);
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

    return that;
}
module.exports = socketioController;