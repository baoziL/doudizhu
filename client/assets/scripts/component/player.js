const player = function()
{
    const that = {};

    let playerData = 
    {
        uniqueID: null, 
        nickName: null, 
        avatarUrl: null,
    }

    that.getPlayerData = function()
    {
        return playerData
    }

    that.setPlayerData = function(_playerData)
    {
        playerData.uniqueID = _playerData.uniqueID
        playerData.nickName = _playerData.nickName
        playerData.avatarUrl = _playerData.avatarUrl
        console.log(playerData);
    }
    that.test = function()
    {
        cc.log("test11111")
    }

    return that;
}
module.exports = player;