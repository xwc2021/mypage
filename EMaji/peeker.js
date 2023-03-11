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
    statistics_shape: function (list) {
        let dic = {};
        for (let x of list) {
            let color = Drawer.color[x];

            if (dic[color] == undefined)
                dic[color] = 1;
            else
                ++dic[color];
        }
        return dic;
    },
};

let Peeker = {
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
                case 3:
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
    },

    get_can_add_cards: function (list) {
        let dic_card_count = Statistician.statistics_card_count(list);

        // 已經有4個就過慮掉
        let can_add_cards = [];
        for (let key in dic_card_count) {
            let value = dic_card_count[key];
            if (value != 4)
                can_add_cards.push(parseInt(key)); // key是字串！
        }
        return can_add_cards;
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
        let min = list[0];
        let remove_counter = 0;
        for (let x of list) {
            if (x == min)
                ++remove_counter;
        }

        if (remove_counter < 3)
            return false;

        list.splice(0, 3);
        split_block.push(Drawer.show_cards([min, min, min]));
        console.log("刻子", Drawer.show_cards(list));
        return true;
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
        split_block.push(Drawer.show_cards([min - 2, min - 1, min]));
        console.log("順子", Drawer.show_cards(list));
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

    test_all_eye: function (list, eyes, split_block) {
        let dic_card_count = Statistician.statistics_card_count(list);
        for (let eye of eyes) {
            split_block.length = 0;
            if (dic_card_count[eye] < 2)
                continue;

            let remain_list = Peeker.remove_eye(list, eye);
            split_block.push(Drawer.show_cards([eye, eye]));
            console.log("remain_list", eye, Drawer.show_cards(remain_list));

            if (Peeker.is_nAAA_mABC(remain_list, split_block))
                return true;
        }

        return false;
    },

    // 判定聽幾個洞
    find_hole: function (list) {
        let dic_listen_cards = {};

        // 用來+1測試的牌
        let can_add_cards = Peeker.get_can_add_cards(list);

        // 每個都測1次
        for (let x of can_add_cards) {
            let new_list = list.slice();
            new_list.push(x);
            new_list.sort((a, b) => a - b);

            console.log("");
            console.log("test:", Drawer.emojis[x], "->", Drawer.show_cards(new_list));

            let g = Peeker.find_eye_group(new_list);
            let has_1eye_nAAA_mABC = false;
            // 存放拆出來的牌
            let split_block = [];
            switch (g) {
                case 0:
                    has_1eye_nAAA_mABC = Peeker.test_all_eye(new_list, [1, 4, 7], split_block);
                    break;
                case 1:
                    has_1eye_nAAA_mABC = Peeker.test_all_eye(new_list, [2, 5, 8], split_block);
                    break;
                case 2:
                    has_1eye_nAAA_mABC = Peeker.test_all_eye(new_list, [3, 6, 9], split_block);
                    break;
            }

            if (has_1eye_nAAA_mABC)
                dic_listen_cards[x] = split_block;
        }

        console.log("聽", dic_listen_cards);
        return dic_listen_cards;
    },
};