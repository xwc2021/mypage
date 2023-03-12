// 文件
// https://gpnnotes.blogspot.com/2023/03/emaji.html

let Statistician = {
    // 統計每張牌有幾張
    statistics_card_count: function (list) {
        let dic = {};
        for (let x of list) {
            if (dic[x] == undefined)
                dic[x] = 1;
            else
                ++dic[x];
        }
        return dic;
    },

    // 統計形
    // key:color,value:count
    statistics_shape: function (list) {
        let dic = {};
        for (let x of list) {
            let color = DataMapping.color[x];

            if (dic[color] == undefined)
                dic[color] = 1;
            else
                ++dic[color];
        }
        return dic;
    },


    // 透過聽牌形抓出候選cards
    // https://gpnnotes.blogspot.com/2023/03/emaji.html
    get_candidate_cards_from_shape16: function (dic_shape) {

        // 過濾掉 (3n)，留下其他的
        let temp_shape = {};
        for (let key in dic_shape) {
            let count = dic_shape[key];
            let remain = count % 3;
            if (remain != 0)
                temp_shape[key] = count;
        }

        let shape_count = Object.keys(temp_shape).length;

        if (shape_count == 1) {
            console.log("shape count == 1")
            // shape一定要是(3n+1)
            for (let key in temp_shape) {
                let count = temp_shape[key];
                console.log("count", count)
                if (count % 3 != 1)
                    return [];
            }
        } else if (shape_count == 2) {
            console.log("shape count == 2")
            //2個shape都要是(3n+2)
            for (let key in temp_shape) {
                let count = temp_shape[key];
                console.log("count", count)
                if (count % 3 != 2)
                    return [];
            }
        } else
            return [];

        let card_list = [];
        for (let key in temp_shape) {
            console.log("花色", key)
            card_list.push(...ColorMapping.data[key]);
        }
        return card_list;
    },
};

let Peeker = {

    // 組：1 🀇🀊🀍 🀒🀕🀘 🀚🀝🀠 🀀🀃🀆
    // 組：2 🀈🀋🀎 🀐🀓🀖 🀛🀞🀡       🀁🀄
    // 組：0 🀉🀌🀏 🀑🀔🀗 🀙🀜🀟 🀂🀅
    find_eye_group: function (list) {
        let g0 = 0; let g1 = 0; let g2 = 0;
        for (let x of list) {

            let remain = x % 3;
            switch (remain) {
                case 1:
                    g0++;
                    break;
                case 2:
                    g1++;
                    break;
                case 0:
                    g2++;
                    break;
            }
        }
        // console.log(g0, g1, g2);
        g0 = g0 % 3, g1 = g1 % 3, g2 = g2 % 3;
        // console.log(g0, g1, g2);
        if (g0 != g1 && g0 != g2 && g1 == g2) { // g0
            console.log("1,4,7");
            return 1;
        } else if (g1 != g0 && g1 != g2 && g0 == g2) { // g1
            console.log("2,5,8");
            return 2;
        } if (g2 != g0 && g2 != g1 && g0 == g1) { // g2
            console.log("3,6,9");
            return 0;
        } else
            return -1;
    },

    list_candidate_cards: function (list) {

        let dic_card_count = Statistician.statistics_card_count(list);

        // 透過形找出候選cards
        let dic_shape = Statistician.statistics_shape(list);
        let candidate_cards = Statistician.get_candidate_cards_from_shape16(dic_shape);

        console.log("dic_shape", dic_shape);
        console.log("candidate_cards", candidate_cards);

        // 一樣的牌最多只能有4張
        let valid_candidate_cards = [];
        for (let card of candidate_cards) {
            let value = dic_card_count[card];
            if (value != 4)
                valid_candidate_cards.push(card);
        }
        console.log("valid_candidate_cards", valid_candidate_cards);
        return valid_candidate_cards;
    },

    remove_eye: function (list, value) {
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
    },

    if_has_AAA_then_remove: function (list, split_block) {
        if (list.length < 3)
            return false;

        let min = list[0];

        if (list[1] == min && list[2] == min) {
            list.splice(0, 3);
            split_block.push(DataMapping.show_cards([min, min, min]));
            console.log("刻子", DataMapping.show_cards(list));
            return true;
        } else
            return false;
    },

    if_has_ABC_then_remove: function (list, split_block) {
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
        split_block.push(DataMapping.show_cards([min - 2, min - 1, min]));
        console.log("順子", DataMapping.show_cards(list));
        return true;
    },

    // 是不是n個AAA、m個ABC
    is_nAAA_mABC: function (list, split_block) {
        let temp = list.slice();
        while (true) {
            if (temp.length == 0)
                return true;

            let success = Peeker.if_has_AAA_then_remove(temp, split_block);
            if (success)
                continue;

            success = Peeker.if_has_ABC_then_remove(temp, split_block);
            if (success)
                continue;

            // 拆牌失敗
            return false;
        }
    },

    // 找眼測試
    // https://gpnnotes.blogspot.com/2023/03/emaji.html
    find_eye_testing: function (list, eyes, split_block) {
        console.log("find_eye_testing", eyes);
        let dic_card_count = Statistician.statistics_card_count(list);
        for (let eye of eyes) { // 執行 XX_nAAA_mABC測試
            split_block.length = 0;

            // remove XX
            let remain_list = Peeker.remove_eye(list, eye);
            split_block.push(DataMapping.show_cards([eye, eye]));
            console.log("eye", eye);
            console.log("remain_list", DataMapping.show_cards(remain_list));

            if (Peeker.is_nAAA_mABC(remain_list, split_block))
                return true;
            else console.log("測試失敗");
        }

        console.log("全部失敗");
        return false;
    },

    list_candidate_eyes: function (list, now_group) {
        let dic_card_count = Statistician.statistics_card_count(list);
        console.log("17張統計", dic_card_count);

        let temp = [];
        for (let card in dic_card_count) {
            let count = dic_card_count[card];
            if (count >= 2 && (card % 3) == now_group)
                temp.push(parseInt(card));
        }
        return temp;
    },

    // 判定聽幾個洞：+1找眼測試
    // https://gpnnotes.blogspot.com/2023/03/emaji.html
    find_hole_testing: function (list) {
        let dic_listen_cards = {};

        // +1：列出所有的候選牌
        let candidate_cards = Peeker.list_candidate_cards(list);

        // 對每個候選牌，都進行1次找眼測試
        for (let x of candidate_cards) {
            let new_list = list.slice();
            new_list.push(x);
            new_list.sort((a, b) => a - b);

            console.log("");
            console.log("test card:", DataMapping.emojis[x], "->", DataMapping.show_cards(new_list));

            let g = Peeker.find_eye_group(new_list);
            let has_1eye_nAAA_mABC = false;
            // 存放拆出來的牌
            let split_block = [];
            let candidate_eyes = Peeker.list_candidate_eyes(new_list, g);
            console.log("candidate_eyes", candidate_eyes);


            switch (g) {
                case 0:
                case 1:
                case 2:
                    has_1eye_nAAA_mABC = Peeker.find_eye_testing(new_list, candidate_eyes, split_block);
                    break;
            }

            if (has_1eye_nAAA_mABC)
                dic_listen_cards[x] = split_block;
        }

        console.log("聽", dic_listen_cards);
        return dic_listen_cards;
    },
};