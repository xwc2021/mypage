let Peeker = {
    find_eye_group: function (list) {
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
    },

    statics: function (list) {
        // 統計每張牌有幾張
        let dic = {};
        for (let i = 1; i <= 9; ++i)
            dic[i] = 0;
        for (let x of list) {
            if (dic[x] >= 0)
                ++dic[x];
        }
        return dic;
    },

    get_can_add_cards: function (list) {
        let dic_statics = Peeker.statics(list);

        // 已經有4個就過慮掉
        let can_add_cards = [];
        for (let key in dic_statics) {
            let value = dic_statics[key];
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
        let dic_statics = Peeker.statics(list);
        for (let eye of eyes) {
            split_block.length = 0;
            if (dic_statics[eye] < 2)
                continue;

            let remind_list = Peeker.remove_eye(list, eye);
            split_block.push(Drawer.show_cards([eye, eye]));
            console.log("remind_list", eye, Drawer.show_cards(remind_list));

            if (Peeker.is_nAAA_mABC(remind_list, split_block))
                return true;
        }

        return false;
    },

    // 判定聽幾個洞
    find_hole: function (list) {
        let dic_listen_cards = {};

        // 取得可以用的牌
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