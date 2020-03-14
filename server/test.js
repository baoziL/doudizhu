const cardRule = require("./cardRule.js")

let card_rule = new cardRule;

let dan = [5];//1
let shuang = [6,6];//2
let san = [6,6,6];//3
let sandaiyi = [5,6,6,6];//4
let sandaier = [5,5,6,6,6];//5
let sunzi = [4,5,6,7,8];//6
let liandui = [4,4,5,5,6,6,7,7,8,8];//7
let feiji = [5,5,5,6,6,6];//8
let feijidaiyi = [3,5,5,5,6,6,6,8];//9
let feijidaier = [3,3,5,5,5,6,6,6,7,7];//10
let sidaier = [4,5,6,6,6,6];//11
let sidailiangdui = [4,4,5,5,6,6,6,6];//12
let boom = [4,4,4,4]//13
let wangzha = [52,53];//14

//let cardData = card_rule.typeJudge(testAry);

console.log(cardRule.typeJudge(dan));
console.log(card_rule.typeJudge(shuang));
console.log(card_rule.typeJudge(san));
console.log(card_rule.typeJudge(sandaiyi));
console.log(card_rule.typeJudge(sandaier));
console.log(card_rule.typeJudge(sunzi));
console.log(card_rule.typeJudge(liandui));
console.log(card_rule.typeJudge(feiji));
console.log(card_rule.typeJudge(feijidaiyi));
console.log(card_rule.typeJudge(feijidaier));
console.log(card_rule.typeJudge(sidaier));
console.log(card_rule.typeJudge(sidailiangdui));
console.log(card_rule.typeJudge(boom));
console.log(card_rule.typeJudge(wangzha));

// let testsunzi = function(cards)
// {
//     if(cards.length < 5 || cards[0] > 7) 
//     return false;
//     // for (var i = 0; i < cards.length; i++) {
//     // if(i != (cards.length - 1) && (cards[i] - 1) != cards[i + 1])
//     // {
//     //     return false;
//     // }
//     for(let i = 0 ; i < cards.length-1 ; i++)
//     {
//         if(cards[i+1]-cards[i] != 1 )
//         {
//             return false
//         }
//     }
//     return true;
// }


// console.log(testsunzi(sunzi));

//1. 向my room广播一个事件，提交者会被排除在外（即不会收到消息）
io.sockets.on('connection',function(socket){
//注意：和下面对比，这里是从客户端的角度来提交事件
socket.broadcast.to('my room').emit('event_name', data);})

//2. 向another room广播一个事件，在此房间所有客户端都会收到消息
//注意：和上面对比，这里是从服务器的角度来提交事件
io.sockets.in('another room').emit('event_name', data);

//向所有客户端广播
io.sockets.emit('event_name', data);


