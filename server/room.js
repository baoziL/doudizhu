function room ()
{
    const that = {};
    
    // let palyer = 
    // {
    //     uniqueID:null,
    //     name:null,
    //     cards:null
    // }
    that.players = [];

    //房间ID
    that.roomID = null;

    //房主
    that.owner =null;

    //地主
    that.dizhu = null;

    //已经打出去的牌
    that.usedCards = [];

    //当前回合玩家
    that.turn = 0;

    //更新room数据
    that.upDataRoomData = function()
    {

    }


    
    return that;
}


// room.prototype.init = function(roomID)
// {
//     let _room = room();
//     _room.roomID = roomID;
//       console.log(_room.roomID);
// };
// // room.prototype.init = function()
// // {

// // };
// //  let _room = new room;
// //  _room.init(66);
// // console.log(_room.roomID)

// let tes1 = room();
// let tes2 = room();
// tes1.roomID = 111111;
// console.log(tes1.roomID)
// console.log(tes2.roomID)

module.exports = room;