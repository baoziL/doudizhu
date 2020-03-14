//游戏规则
function CardRule() {

};
CardRule.prototype.ONE = 1;
CardRule.prototype.PAIRS = 2;
CardRule.prototype.THREE = 3;
CardRule.prototype.THREE_WITH_ONE = 4;
CardRule.prototype.THREE_WITH_PAIRS = 5;
CardRule.prototype.PROGRESSION = 6;
CardRule.prototype.PROGRESSION_PAIRS = 7;
CardRule.prototype.PLANE = 8;
CardRule.prototype.PLANE_WITH_ONE = 9;
CardRule.prototype.PLANE_WITH_PAIRS = 10;
CardRule.prototype.FOUR_WITH_TWO = 11;
CardRule.prototype.FOUR_WITH_TWO_PAIRS = 12;
CardRule.prototype.BOMB = 13;
CardRule.prototype.KING_BOMB = 14;

//cards == cardAry
//是否是对子
CardRule.prototype.isPairs = function(cards) {
    return cards[0] === cards[1];
};
//是否是王炸
CardRule.prototype.isKingBomb = function(cards) {
    return cards[0] > 51 && cards[1] > 51;
};
//是否是三根
CardRule.prototype.isThree = function(cards) {
    return (cards[0] === cards[1] && cards[1]=== cards[2]);
};
//是否是三带一对
CardRule.prototype.isThreeWithPairs = function(cards) {
    if(cards.length != 5) 
        return false;
    var c = this.valCount(cards);
    return c.length === 2 && (c[0].count === 3 || c[1].count === 3);
};
//是否是三带一
CardRule.prototype.isThreeWithOne = function(cards) {
    if(cards.length != 4) 
        return false;
    var c = this.valCount(cards);
    return c.length === 2 && (c[0].count === 3 || c[1].count === 3);
};

//是否是顺子
CardRule.prototype.isProgression = function(cards) {
    if(cards.length < 5 || cards[0] > 7) 
        return false;
    for(let i = 0 ; i < cards.length-1 ; i++)
    {
        if(cards[i+1]-cards[i] != 1 )
        {
            return false
        }
    }
    return true;
};
//是否是连对
CardRule.prototype.isProgressionPairs = function(cards) {
    if(cards.length < 6 || cards.length % 2 != 0 || cards[0] > 9)  return false;
    
    // for (var i = 0; i < cards.length; i += 2) {
    //     if(i != (cards.length - 2) && (cards[i] != cards[i + 1] || (cards[i] - 1) != cards[i + 2])){
    //         return false;
    //     }
    // }
    let ary = [];
    for(let j = 0 ; j < cards.length-1 ; j+=2)
    {
        if(cards[j] == cards[j+1])
        {
            ary.push(cards[j]);
        }
        else
        {
            return false;
        }
    }
    for(let i = 0 ; i < ary.length-1 ; i++)
    {
        if(ary[i+1]-ary[i] != 1 )
        {
            return false
        }
    }
    return true;
};
//是否是飞机
CardRule.prototype.isPlane = function(cards) {
    if(cards.length < 6 || cards.length % 3 != 0 || cards[0] === 12) 
        return false;
    var c = this.valCount(cards)
    var threeList = []
    var threeCount = cards.length / 3;
    for (var i = 0; i < c.length; i++) {
        if(c[i].count == 3){
            threeList.push(c[i]);
        }
    }
    if(threeList.length != threeCount || threeList[0] === 11){//检测三根数量和不为2
        return false;
    }
    threeList.sort((a,b)=>
    {
        return a.val-b.val
    })
    for(let i = 0 ; i < threeList.length-1 ; i++)
    {
        if(threeList[i+1].val-threeList[i].val != 1 )
        {
            return false
        }
    }
    // for (var i = 0; i < cards.length; i += 3) {

    //     if(i != (cards.length - 3) && (cards[i] != cards[i + 1] || cards[i] != cards[i + 2] || (cards[i] - 1) != cards[i + 3])){
    //         return false;
    //     }
    // }
    
    return true;
};
//是否是飞机带单
CardRule.prototype.isPlaneWithOne = function(cards) {
    if(cards.length < 8 || cards.length % 4 != 0) 
        return false;
    var c = this.valCount(cards)
    var threeList = []
    var threeCount = cards.length / 4;
    for (var i = 0; i < c.length; i++) {
        if(c[i].count == 3){
            threeList.push(c[i]);
        }
    }
    if(threeList.length != threeCount || threeList[0] === 11){//检测三根数量和不为2
        return false;
    }
    // for (i = 0; i < threeList.length; i++) {//检测三根是否连续
    //     if(i != threeList.length - 1 && threeList[i] - 1 != threeList[i + 1]){
    //         return false;
    //     }
    // }
    threeList.sort((a,b)=>
    {
        return a.val-b.val
    })
    for(let i = 0 ; i < threeList.length-1 ; i++)
    {
        if(threeList[i+1].val-threeList[i].val != 1 )
        {
            return false
        }
    }
    return true;
};
//是否是飞机带对
CardRule.prototype.isPlaneWithPairs = function(cards) {
    if(cards.length < 10 || cards.length % 5 != 0) 
        return false;
    var c = this.valCount(cards);
    var threeList = [];
    var pairsList = [];
    var groupCount = cards.length / 5;

    for (var i = 0; i < c.length; i++) {
        if(c[i].count == 3){
            threeList.push(c[i]);
        }
        else if(c[i].count == 2){
            pairsList.push(c[i]);
        } 
        else {
            return false;
        }
    }

    if(threeList.length != groupCount || pairsList.length != groupCount || threeList[0].val=== 11){//检测三根数量和对子数量和不能为2
        return false;
    }

    // for (i = 0; i < threeList.length; i++) {//检测三根是否连续
    //     if(i != threeList.length - 1 && threeList[i] - 1 != threeList[i + 1]){
    //         return false;
    //     }
    // }
    threeList.sort((a,b)=>
    {
        return a.val-b.val
    })
    for(let i = 0 ; i < threeList.length-1 ; i++)
    {
        if(threeList[i+1].val-threeList[i].val != 1 )
        {
            return false
        }
    }
    return true;
};
//是否是四带二
CardRule.prototype.isFourWithTwo = function(cards) {
    var c = this.valCount(cards);
    if(cards.length != 6 || c.length > 3) return false;
    for (var i = 0; i < c.length; i++) {
        if(c[i].count === 4)
            return true;
    }
    return false;
};
//是否是四带两个对
CardRule.prototype.isFourWithPairs = function(cards) {
    if(cards.length != 8) return false;
    var c = this.valCount(cards);
    if(c.length != 3) return false;
    for (var i = 0; i < c.length; i++) {
        if(c[i].count != 4 && c[i].count != 2)
            return false;
    }
    return true;
};
//是否是炸弹
CardRule.prototype.isBomb = function(cards) {
    return cards.length === 4 && cards[0] === cards[1] && cards[0] === cards[2] && cards[0] === cards[3];
};
//牌型判断
CardRule.prototype.typeJudge = function(cards){
    var len = cards.length;
    //根据张数来判定
    if(len == 1){
        return {'cardType': this.ONE, 'val': cards[0], 'size': len};
    }else if(len == 2){

        if(this.isPairs(cards))
            return {'cardType': this.PAIRS, 'val': cards[0], 'size': len};
        else if (this.isKingBomb(cards))
            return {'cardType': this.KING_BOMB, 'val': cards[0], 'size': len};
        else
            return null;

    }else if(len == 3){

        if(this.isThree(cards))
            return {'cardType': this.THREE, 'val': cards[0], 'size': len};
        else
            return null;

    }else if(len == 4){
        if(this.isThreeWithOne(cards)){

            return {'cardType': this.THREE_WITH_ONE, 'val': this.getMaxVal(cards, 3), 'size': len};
        } else if (this.isBomb(cards)) {

            return {'cardType': this.BOMB, 'val': cards[0], 'size': len};
        }
        return null;
    }else{
        if(this.isProgression(cards))
            return {'cardType': this.PROGRESSION, 'val': cards[0], 'size': len};
        else if(this.isProgressionPairs(cards))
            return {'cardType': this.PROGRESSION_PAIRS, 'val': cards[0], 'size': len};
        else if(this.isThreeWithPairs(cards))
            return {'cardType': this.THREE_WITH_PAIRS, 'val': this.getMaxVal(cards, 3), 'size': len};
        else if(this.isPlane(cards))
            return {'cardType': this.PLANE, 'val': this.getMinVal(cards, 3), 'size': len};
        else if(this.isPlaneWithOne(cards))
            return {'cardType': this.PLANE_WITH_ONE, 'val': this.getMinVal(cards, 3), 'size': len};
        else if(this.isPlaneWithPairs(cards))
            return {'cardType': this.PLANE_WITH_PAIRS, 'val': this.getMinVal(cards, 3), 'size': len};
        else if(this.isFourWithTwo(cards))
            return {'cardType': this.FOUR_WITH_TWO, 'val': this.getMaxVal(cards, 4), 'size': len};
        else if(this.isFourWithPairs(cards))
            return {'cardType': this.FOUR_WITH_TWO_PAIRS, 'val': this.getMaxVal(cards, 4), 'size': len};
        else
            return null;
    }
};
//牌大小比较
CardRule.prototype.compare = function(upCardType,cardType)
{
    if(cardType.type == 14) return true;
    if(cardType.type == 13)
    {
        if(upCardType.cardType < 13)
        {
            return true;
        }
        else if(cardType.val > upCardType.val)
        {
            return true;
        }
        else
        {
            return false;
        }
    };
    if(upCardType.cardType == cardType.type && cardType.val > upCardType.val)
    {
        return true;
    }
    else
    {
        return false;
    }
};
//卡牌排序
CardRule.prototype.cardSort = function (a, b){
    if(a.val == b.val){
        return a.type > b.type ? 1 : -1;
    } else if(a.val > b.val){
        return -1;
    } else {
        return 1;
    }
};
//获取min到max之间的随机整数，min和max值都取得到
CardRule.prototype.random = function(min, max) {
	min = min == null ? 0 : min;
	max = max == null ? 1 : max;
	var delta = (max - min) + 1;
	return Math.floor(Math.random() * delta + min);
};
//牌统计，统计各个牌有多少张
CardRule.prototype.valCount = function(cards){
    var result = [];
    var addCount = function(result , v){
        for (var i = 0; i < result.length; i++) {
            if(result[i].val == v){
                result[i].count ++;
                return;
            }
        }
        result.push({'val': v, 'count': 1});
        
    };
    for (var i = 0; i < cards.length; i++){

        addCount(result, cards[i]);
    }
    //console.log(result);
    return result;
};
//获取指定张数的最大牌值
CardRule.prototype.getMaxVal = function(cards, n){
    var c = this.valCount(cards);
    var max = 0;
    for (var i = 0; i < c.length; i++) {
        if(c[i].count === n && c[i].val > max){
            max = c[i].val;
        }
    }
    return max;
};
CardRule.prototype.getMinVal = function(cards, n){
    var c = this.valCount(cards);
    var min = cards[cards.length-1]
    for (var i = 0; i < c.length; i++) {
        if(c[i].count === n && c[i].val < min){
            min = c[i].val;
        }
    }
    return min;
};

module.exports = CardRule;