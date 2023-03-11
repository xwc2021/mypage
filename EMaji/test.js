let list = [1, 1, 2, 2, 2, 3, 3, 3, 4, 5, 6, 7, 8, 9, 33, 33];
let dic_card_count = Statistician.statistics_card_count(list);
console.log(dic_card_count);

let dic_shape = Statistician.statistics_shape(list);
console.log("dic_shape", dic_shape);

let card_list = Statistician.get_candidate_cards_from_shape(dic_shape);
console.log(card_list);
