
let list = [2, 2, 5, 5, 8, 8, 14, 14, 17, 17, 20, 20, 26, 26, 29, 29];
let dic_card_count = Statistician.statistics_card_count(list);
console.log(dic_card_count);

let dic_shape = Statistician.statistics_shape(list);
console.log("dic_shape", dic_shape);

let card_list = Statistician.get_candidate_cards_from_shape16(dic_shape);
console.log(card_list);
