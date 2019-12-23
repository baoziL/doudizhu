const playerData = function()
{
    const that = {};
    
    let testPlayerData = {

        uniqueID: "unique", 
        nickName: "nickname", 
        avatarUrl: "avatar",

    };

    that.getPlayerDataByID = function(uniqueID)
    {
        if(uniqueID == "test") return testPlayerData
    }

    return that;
}
module.exports = playerData;