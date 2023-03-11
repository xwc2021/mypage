function render(cards) {

    // 排序
    let raw = DataMapping.show_cards(cards);
    cards.sort((a, b) => a - b);
    let sort = DataMapping.show_cards(cards);

    // 聽幾個洞
    let dic_holes = Peeker.find_hole(cards);

    // 顯示
    document.getElementById("show_list").innerHTML = raw;
    document.getElementById("show_sort_list").innerHTML = sort;

    let listen_list = "";
    let msg = "";
    for (let key in dic_holes) {
        listen_list += DataMapping.emojis[key] + ",";
        msg += "聽" + DataMapping.emojis[key] + "拆分：" + dic_holes[key] + "<br/>";
    }
    if (listen_list != "")
        document.getElementById("listen_cards_list").innerHTML = "聽：" + listen_list + "<br/>" + msg;
}