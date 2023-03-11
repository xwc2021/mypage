// 只針對萬洗牌
let cars_36 = cards.slice(0, 36);

// 其他|含眼|不含
//  0   17   16
//  3   14   13
//  6   11   10
//  9    8    7
// 12    5    4
// 15    2    1
let picks = Tool.shuffle_and_pickup(cars_36, 14);
picks.push(35, 35);


render(picks);
