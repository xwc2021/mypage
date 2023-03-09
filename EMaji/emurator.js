let enumerator = {
    // C all.length取pick_count
    // 雖然會重覆算但不管
    C: function (all, pick_count) {
        // init 
        let temp_list = [];
        for (let i = 0; i < pick_count; ++i)
            temp_list.push(-1);

        enumerator.list_all(all, 0, all.length - 1, 0, pick_count, temp_list)
    },

    counter: 0,
    list_all: function (all, left_borlder, right_border, now_index, pick_count, temp_list) {

        for (let i = left_borlder; i <= right_border; ++i) {
            let pick_one = all[i];
            temp_list[now_index] = pick_one;

            if (now_index == pick_count - 1)
                console.log(++counter, temp_list);
            else
                enumerator.list_all(all, i + 1, right_border, now_index + 1, pick_count, temp_list);
        }
    }
};