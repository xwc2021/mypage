
function pick_from(cards, pick_len) {

    // 抽牌
    Tool.shuffle(cards);
    let picks = cards.slice(0, pick_len);

    // 測試：
    // 文章的作者是用16張牌
    // picks = [1, 1, 2, 2, 2, 3, 3, 3, 4, 5, 6, 7, 8, 9, 9, 9];
    // picks = [1, 1, 1, 2, 3, 4, 5, 6, 6, 7, 7, 8, 8, 9, 9, 9];
    // picks = [1, 1, 1, 2, 3, 4, 5, 6, 6, 6, 7, 7, 7, 8, 8, 8];
    // picks = [1, 1, 1, 2, 3, 4, 5, 5, 6, 6, 7, 7, 8, 9, 9, 9];
    // picks = [1, 1, 1, 2, 3, 4, 4, 5, 5, 6, 6, 7, 8, 9, 9, 9];

    // 這裡是13張牌
    // picks = [1, 1, 1, 2, 3, 4, 5, 6, 7, 8, 9, 9, 9];

    // 排序
    let raw = Drawer.show_cards(picks);
    picks.sort((a, b) => a - b);
    let sort = Drawer.show_cards(picks);

    // 聽幾個洞
    let dic_holes = Peeker.find_hole(picks);

    // 顯示
    document.getElementById("show_total").innerHTML = Drawer.show_cards(cards);
    document.getElementById("show_list").innerHTML = raw;
    document.getElementById("show_sort_list").innerHTML = sort;

    let listen_list = "";
    let msg = "";
    for (let key in dic_holes) {
        listen_list += Drawer.emojis[key] + ",";
        msg += "聽" + Drawer.emojis[key] + "拆分：" + dic_holes[key] + "<br/>";
    }
    if (listen_list != "")
        document.getElementById("listen_cards_list").innerHTML = "聽：" + listen_list + "<br/>" + msg;
}

let cars_36 = null;
window.onload = function () {
    // 全部洗牌要能直接胡牌太難了
    // pick_from(cards, 16);

    // 只針對萬洗牌
    cars_36 = cards.slice(0, 36);

    // 其他|含眼|不含
    //  0   17   16
    //  3   14   13
    //  6   11   10
    //  9    8    7
    // 12    5    4
    // 15    2    1
    pick_from(cars_36, 13);


    // 雖然會重覆算但不管
    // 取4個就算很久了 https://gadget.chienwen.net/x/math/percomb
    // Enumerator.C(cars_36, 4);
    // Enumerator.C(["A", "B", "C", "D"], 2);
};
