// 只針對萬洗牌
let cars_36 = cards.slice(0, 36);

// 其他|含眼|不含
//  0   17   16
//  3   14   13
//  6   11   10
//  9    8    7
// 12    5    4
// 15    2    1
let picks = Tool.shuffle_and_pickup(cars_36, 13);

// 測試：文章的作者是用16張牌
// picks = [1, 1, 2, 2, 2, 3, 3, 3, 4, 5, 6, 7, 8, 9, 9, 9];
// picks = [1, 1, 1, 2, 3, 4, 5, 6, 6, 7, 7, 8, 8, 9, 9, 9];
// picks = [1, 1, 1, 2, 3, 4, 5, 6, 6, 6, 7, 7, 7, 8, 8, 8];
// picks = [1, 1, 1, 2, 3, 4, 5, 5, 6, 6, 7, 7, 8, 9, 9, 9];
// picks = [1, 1, 1, 2, 3, 4, 4, 5, 5, 6, 6, 7, 8, 9, 9, 9];

// 測試：13張
// picks = [1, 1, 1, 2, 3, 4, 5, 6, 7, 8, 9, 9, 9];

render(picks);


// let test_cards = [1, 2, 3, 4, 5, 6, 7, 8, 9,
//     11, 12, 13, 14, 15, 16, 17, 18, 19,
//     21, 22, 23, 24, 25, 26, 27, 28, 29,
//     31, 41, 51, 61, 71, 81, 91]

// document.getElementById("show_total").innerHTML = DataMapping.show_cards(Tool.classify_by_remain(test_cards, 2));

// 雖然會重覆算但不管
// 取4個就算很久了 https://gadget.chienwen.net/x/math/percomb
// Enumerator.C(cars_36, 4);
// Enumerator.C(["A", "B", "C", "D"], 2);
