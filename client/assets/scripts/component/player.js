const player = 
{
    //房间是否能加入
    isJoinRoom : null,
    //游戏是否能开始
    isGameStart: null,

    playerData :
    {
        uniqueID: null, 
        nickName: null, 
        avatarUrl: null,
        roomID:null,
        cards:null,
        playCards:null,
    },

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
    test : function()
    {
        cc.log("test11111")
    },
}
module.exports = player;