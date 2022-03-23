// 淘寶顯示新台幣的小工具
// 新增到bookmark就可以當按鈕用

javascript: var domain = 'price.convert.for.taobao.com';
let p_list = Array.from(document.querySelectorAll('.g_price strong'));
p_list.forEach(p => {
    let price = parseFloat(p.innerHTML);
    let tw = parseInt(price * 4.35);
    console.log(price, tw);
    p.innerHTML = tw.toString();
});