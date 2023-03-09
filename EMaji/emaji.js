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

    let holes = find_hole(picks);

    document.getElementById("show_total").innerHTML = show_cards(all);
    document.getElementById("show_list").innerHTML = raw;
    document.getElementById("show_sort_list").innerHTML = sort;

    if (holes.length)
        document.getElementById("listen_cards_list").innerHTML = show_cards(holes);
}

function find_eye_group(list) {
    let g0 = 0; let g1 = 0; let g2 = 0;
    for (let x of list) {

        switch (x) {
            case 1:
            case 4:
            case 7:
                g0++;
                break;
            case 2:
            case 5:
            case 8:
                g1++;
                break;
            case 3:
            case 6:
            case 9:
                g2++;
                break;
        }
    }
    // console.log(g0, g1, g2);
    g0 = g0 % 3, g1 = g1 % 3, g2 = g2 % 3;
    // console.log(g0, g1, g2);
    if (g0 != g1 && g0 != g2 && g1 == g2) { // g0
        console.log("1,4,7");
        return 0;
    } else if (g1 != g0 && g1 != g2 && g0 == g2) { // g1
        console.log("2,5,8");
        return 1;
    } if (g2 != g0 && g2 != g1 && g0 == g1) { // g2
        console.log("3,6,9");
        return 2;
    } else
        return -1;
}

function statics(list) {
    // 統計每張牌有幾張
    let dic = {};
    for (let i = 1; i <= 9; ++i)
        dic[i] = 0;
    for (let x of list) {
        if (dic[x] >= 0)
            ++dic[x];
    }
    return dic;
}

function get_can_add_cards(list) {
    let dic_statics = statics(list);

    // 已經有4個就過慮掉
    let can_add_cards = [];
    for (let key in dic_statics) {
        let value = dic_statics[key];
        if (value != 4)
            can_add_cards.push(parseInt(key)); // key是字串！
    }
    return can_add_cards;
}

function remove_eye(list, value) {
    let keep = [];
    let remove_counter = 0;
    for (let x of list) {
        if (x != value)
            keep.push(x);
        else {
            if (remove_counter < 2)
                ++remove_counter;
            else keep.push(x);
        }
    }
    return keep;
}

function if_has_AAA_then_remove(list) {
    let min = list[0];
    let remove_counter = 0;
    for (let x of list) {
        if (x == min)
            ++remove_counter;
    }

    if (remove_counter < 3)
        return false;

    list.splice(0, 3);
    console.log("刻子", show_cards(list));
    return true;
}

function if_has_ABC_then_remove(list) {
    let remove_index_list = [0];
    let find_counter = 1;

    let min = list[0];
    for (let i = 0; i < list.length; ++i) {
        let value = list[i]
        if (value == min + 1) {
            remove_index_list.push(i);
            ++min;
            ++find_counter;
        }

        if (find_counter == 3)
            break;
    }
    if (find_counter < 3)
        return false;

    remove_index_list.reverse();
    for (let index of remove_index_list) {
        list.splice(index, 1);
    }
    console.log("順子", show_cards(list));
    return true;

}

// 是不是胡牌
function is_hu(list) {
    let temp = list.slice();
    while (true) {
        if (temp.length == 0)
            return true;

        let success = if_has_AAA_then_remove(temp);
        if (success)
            continue;

        success = if_has_ABC_then_remove(temp);
        if (success)
            continue;

        // 拆牌失敗
        return false;
    }
}

function test_all_eye(list, eyes) {
    let dic_statics = statics(list);
    for (let eye of eyes) {
        if (dic_statics[eye] < 2)
            continue;

        let remind_list = remove_eye(list, eye);
        console.log("remind_list", eye, show_cards(remind_list));

        if (is_hu(remind_list))
            return true;
    }

    return false;
}

// 判定聽幾個洞
function find_hole(list) {
    let listen_cards = [];

    // 取得可以用的牌
    let can_add_cards = get_can_add_cards(list);

    // 每個都測1次
    for (let x of can_add_cards) {
        let new_list = list.slice();
        new_list.push(x);
        new_list.sort((a, b) => a - b);

        console.log("");
        console.log("test:", emojis[x], "->", show_cards(new_list));

        let g = find_eye_group(new_list);
        let is_hu = false
        switch (g) {
            case 0:
                is_hu = test_all_eye(new_list, [1, 4, 7]);
                break;
            case 1:
                is_hu = test_all_eye(new_list, [2, 5, 8]);
                break;
            case 2:
                is_hu = test_all_eye(new_list, [3, 6, 9]);
                break;
        }

        if (is_hu)
            listen_cards.push(x);
    }

    console.log("聽", show_cards(listen_cards));
    return listen_cards;
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
pick_from(cars_36, 13);


// C all.length取pick_count
// 雖然會重覆算但不管
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

