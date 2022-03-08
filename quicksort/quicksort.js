// order: 1->小到大；-1->大到小
function quickSort_dance_version(array, left, right, order) {
    let print = (array, head) => {
        let str = head;
        for (let i of array)
            str += i + ",";
        console.log(str);
    }

    let swap = (array, x, y) => {
        [array[x], array[y]] = [array[y], array[x]];
    };

    let swap_condition = (array, focus, cursor) => {
        let cursor_value = array[cursor];
        let focus_value = array[focus];

        if (focus < cursor) { // 主角在左邊
            let diff = focus_value - cursor_value;
            if (diff * order > 0)
                return true;
        } else if (cursor < focus) { // 主角在右邊
            let diff = cursor_value - focus_value;
            if (diff * order > 0)
                return true;
        }
        return false;
    };

    let focus = left; // 主角
    let cursor_offset = -1; // 一開始往左移動
    let cursor = right;

    if (focus >= cursor)
        return;

    while (true) {
        if (focus == cursor) { // 結束交叉
            quickSort_dance_version(array, left, focus - 1, order);
            quickSort_dance_version(array, focus + 1, right, order);
            return;
        }

        if (swap_condition(array, focus, cursor, order)) {
            swap(array, focus, cursor); // 交換值
            [focus, cursor] = [cursor, focus]; // 交換索引
            cursor_offset *= -1; // 換方向
        }
        cursor += cursor_offset;
        print(array, "排序過程 array : ");
    }
}

let source = [8, 6, 4, 1, 7, 3, 9, 2, 5, 0];
console.log(source);
quickSort_dance_version(source, 0, 9, 1);
console.log(source);