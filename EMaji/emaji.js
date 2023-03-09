// 牌定義
// 萬 1-9
// 條 11-19
// 筒 21-29
// 東 31
// 南 41
// 西 51
// 北 61
// 中 71
// 發 81
// 白 91
let cards = [
    1, 2, 3, 4, 5, 6, 7, 8, 9,
    1, 2, 3, 4, 5, 6, 7, 8, 9,
    1, 2, 3, 4, 5, 6, 7, 8, 9,
    1, 2, 3, 4, 5, 6, 7, 8, 9,

    11, 12, 13, 14, 15, 16, 17, 18, 19,
    11, 12, 13, 14, 15, 16, 17, 18, 19,
    11, 12, 13, 14, 15, 16, 17, 18, 19,
    11, 12, 13, 14, 15, 16, 17, 18, 19,

    21, 22, 23, 24, 25, 26, 27, 28, 29,
    21, 22, 23, 24, 25, 26, 27, 28, 29,
    21, 22, 23, 24, 25, 26, 27, 28, 29,
    21, 22, 23, 24, 25, 26, 27, 28, 29,

    31, 41, 51, 61, 71, 81, 91,
    31, 41, 51, 61, 71, 81, 91,
    31, 41, 51, 61, 71, 81, 91,
    31, 41, 51, 61, 71, 81, 91,
];

let emojis = {
    "1": "🀇",
    "2": "🀈",
    "3": "🀉",
    "4": "🀊",
    "5": "🀋",
    "6": "🀌",
    "7": "🀍",
    "8": "🀎",
    "9": "🀏",

    "11": "🀐",
    "12": "🀑",
    "13": "🀒",
    "14": "🀓",
    "15": "🀔",
    "16": "🀕",
    "17": "🀖",
    "18": "🀗",
    "19": "🀘",

    "21": "🀙",
    "22": "🀚",
    "23": "🀛",
    "24": "🀜",
    "25": "🀝",
    "26": "🀞",
    "27": "🀟",
    "28": "🀠",
    "29": "🀡",

    "31": "🀀",
    "41": "🀁",
    "51": "🀂",
    "61": "🀃",
    "71": "🀄",
    "81": "🀅",
    "91": "🀆",
};

function show_cards(array) {
    let str = "";
    for (let value of array) {
        str += emojis[value];
    }
    return str;
}

// 洗牌
// https://shubo.io/javascript-random-shuffle/
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function pick_from(all, pick_len) {
    shuffle(all);
    let picks = all.slice(0, pick_len);
    let raw = show_cards(picks);
    picks.sort((a, b) => a - b);
    let sort = show_cards(picks);

    document.getElementById("show_total").innerHTML = show_cards(all);
    document.getElementById("show_list").innerHTML = raw;
    document.getElementById("show_sort_list").innerHTML = sort;
}

// 全部洗牌要能直接胡牌太難了
// pick_from(cards, 16);

// 只針對萬洗牌
let cars_36 = cards.splice(0, 36);
// 其他|含眼|不含
//  3   14   13
//  6   11   10
//  9    8    7
// 12    5    4
// 15    2    1
// pick_from(cars_36, 13);


// C all.length取pick_count
// 雖然會有重覆但不管
function C(all, pick_count) {
    // init 
    let temp_list = [];
    for (let i = 0; i < pick_count; ++i)
        temp_list.push(-1);

    list_all(all, 0, all.length - 1, 0, pick_count, temp_list)
}

let counter = 0;
function list_all(all, left_borlder, right_border, now_index, pick_count, temp_list) {

    for (let i = left_borlder; i <= right_border; ++i) {
        let pick_one = all[i];
        temp_list[now_index] = pick_one;

        if (now_index == pick_count - 1)
            console.log(++counter, temp_list);
        else
            list_all(all, i + 1, right_border, now_index + 1, pick_count, temp_list);
    }
}


// 取5個就算超久了
// https://gadget.chienwen.net/x/math/percomb
// C(cars_36, 5);
C(cars_36, 2);

// 判定聽幾個洞