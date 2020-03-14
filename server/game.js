const cr = require("./cardRule.js")
const cardRule = new cr
const game = function()
{
    const that = {};

    that.iniGame = function()
    {
        let allCards = []
        let player1 = []
        let player2 = []
        let player3 = []
        let player = [player1,player2,player3]
        let dizhuCard = []
        for(let i = 0; i < 54 ; i ++)
        {
            allCards.push(i);
        }
        for(let a = 0; a < player.length ; a++)
        {
            for(let j = 0; j < 17 ; j ++)
            {
                let rand = Math.round(Math.random()*(allCards.length-1))
                player[a].push(allCards[rand])
                allCards.splice(rand,1)
                // console.log("allCards")
                // console.log(allCards)
                // console.log(allCards.length)
            }
        }
        //地主牌等于剩下的牌
        dizhuCard = allCards;

        let _rand = Math.round(Math.random()*2)
        for(let j = 0; j < allCards.length ; j++)
        {
            player[_rand].push(dizhuCard[j])
        }

        // console.log("player1↓↓↓")
        // console.log(player1)
        // console.log(player1.length)
        // console.log("player2↓↓↓")
        // console.log(player2)
        // console.log(player2.length)
        // console.log("player3↓↓↓")
        // console.log(player3)
        // console.log(player3.length)
        return player //返回一个数组内含各个玩家的牌
    }
    that.playCard = function(room,playerData)
    {
        let players = room.players

        //检测是否大于上家

        let compare = null;
        if(room.usedCards.length == 0)
        {
            //检测牌型
            let CardType = cardRule.typeJudge(playerData.playCards)
            if(CardType == null)
            {
                compare = false;
            }
            else
            {
                compare = true;
            }
        }
        else
        {
            let upCardType = cardRule.typeJudge(room.usedCards[room.usedCards.length-1])
            let CardType = cardRule.typeJudge(playerData.playCards)
            compare = cardRule.compare(upCardType,CardType)
        }
        //检测是否存在这些手牌

        let index = playerData.index;
        let result = room.players[index].cards.compare(playerData.playCards)


        //检测是否轮到该玩家出牌
        let isTurn = null
        if(playerData.index === room.turn)
        {
            console.log("轮到该玩家出牌")
            isTurn = true;
        }
        else
        {
            console.log("不是该玩家的回合不能出牌")
            isTurn = false;
        }

        //返回结果
        if(compare === true && result === true && isTurn === true)
        {
            //处理出牌数组变化 12/30
            room.usedCards.push(playerData.playCards)

            room.players[playerData.index].cards.subtract(playerData.playCards)

            return true;
        }
        else
        {
            return false;
        }
    }

    return that;
}
module.exports = game;