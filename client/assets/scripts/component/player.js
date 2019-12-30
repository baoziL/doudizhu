const player = 
{
    //房间是否能加入
    isJoinRoom : null,
    //游戏是否能开始
    isGameStart: null,

    isCanPlayer: null,

    playerData :
    {
        uniqueID: null, 
        nickName: null, 
        avatarUrl: null,
        roomID:null,
        cards:null,
        playCards:null,
        index:0,
    },
    //这局游戏的存储玩家ID/0，1，2
    roomData:[],
    leftPlayer:null,
    rightPlayer:null,
    index:null,

    getPlayerData : function()
    {
        return playerData
    },

    setPlayerData : function(_playerData)
    {
        playerData.uniqueID = _playerData.uniqueID
        playerData.nickName = _playerData.nickName
        playerData.avatarUrl = _playerData.avatarUrl
        console.log(playerData);
    },
    initPlayer : function(playerData)
    {
        this.isJoinRoom = null;
        this.isGameStart = null;
        this.isCanPlayer = null
        playerData =
        {
            uniqueID: null, 
            nickName: null, 
            avatarUrl: null,
            roomID:null,
            cards:null,
            playCards:null,
            index:null,
        };
    },
    clearPlayerSate : function()
    {
        this.isJoinRoom = null;
        this.isGameStart = null;
        this.isCanPlayer = null;
    }
}
module.exports = player;