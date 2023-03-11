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

    10, 11, 12, 13, 14, 15, 16, 17, 18,
    10, 11, 12, 13, 14, 15, 16, 17, 18,
    10, 11, 12, 13, 14, 15, 16, 17, 18,
    10, 11, 12, 13, 14, 15, 16, 17, 18,

    19, 20, 21, 22, 23, 24, 25, 26, 27,
    19, 20, 21, 22, 23, 24, 25, 26, 27,
    19, 20, 21, 22, 23, 24, 25, 26, 27,
    19, 20, 21, 22, 23, 24, 25, 26, 27,

    29, 31, 32, 33, 34, 35, 36,
    29, 31, 32, 33, 34, 35, 36,
    29, 31, 32, 33, 34, 35, 36,
    29, 31, 32, 33, 34, 35, 36,
];

let Drawer = {
    emojis: {
        "1": "🀇",
        "2": "🀈",
        "3": "🀉",
        "4": "🀊",
        "5": "🀋",
        "6": "🀌",
        "7": "🀍",
        "8": "🀎",
        "9": "🀏",

        "10": "🀐",
        "11": "🀑",
        "12": "🀒",
        "13": "🀓",
        "14": "🀔",
        "15": "🀕",
        "16": "🀖",
        "17": "🀗",
        "18": "🀘",

        "19": "🀙",
        "20": "🀚",
        "21": "🀛",
        "22": "🀜",
        "23": "🀝",
        "24": "🀞",
        "25": "🀟",
        "26": "🀠",
        "27": "🀡",

        "29": "🀀",
        "31": "🀁",
        "32": "🀂",
        "33": "🀃",
        "34": "🀄",
        "35": "🀅",
        "36": "🀆",
    },

    show_cards: function (array) {
        let str = "";
        for (let value of array) {
            str += Drawer.emojis[value];
        }
        return str;
    },
};

let Tool = {
    // 洗牌
    // https://shubo.io/javascript-random-shuffle/
    shuffle: function (array) {
        for (let i = array.length - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    },

    classify_by_remain: function (list, remain_group) {
        let temp = [];
        for (let x of list) {
            if (x % 3 == remain_group)
                temp.push(x);
        }
        return temp;
    }
};