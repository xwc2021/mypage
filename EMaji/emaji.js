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

// 隨機發牌
// https://shubo.io/javascript-random-shuffle/
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

shuffle(cards);
let cards_16 = cards.slice(0, 16);
let raw = show_cards(cards_16);
cards_16.sort((a, b) => a - b);
let sort = show_cards(cards_16);

document.getElementById("show_total").innerHTML = show_cards(cards);
document.getElementById("show_list").innerHTML = raw;
document.getElementById("show_sort_list").innerHTML = sort;

// 判定聽幾個洞