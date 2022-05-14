const balance = document.getElementById('balance');
const money_plus = document.getElementById('money-plus');
const money_minus = document.getElementById('money-minus');
const list = document.getElementById('list');
const form = document.getElementById('form');
const text = document.getElementById('text');
const amount = document.getElementById('amount');

// กำหนดตัว "," ให้กับตัวเลข


//                                                      รายการธุรกรรม
const dataTransaction = [
    {id:1,text:"ค่าขนม",amount:-100},
    {id:2,text:"ค่าห้อง",amount:-3000},
    {id:3,text:"เงินเดือน",amount:+18000},
    {id:4,text:"ค่าน้ำ",amount:-300},
]

const transaction = dataTransaction;
//                                                ทำการลูปรายการธุรกรรมเพื่อแสดงรายการ
function init(){
    transaction.forEach(AddDatatolist);
    calculates(transaction);
}
//                                                     ฟังชั่นก์ประวัติธุรกรรม
function AddDatatolist(transaction){
    const symbol = transaction.amount < 0 ?'-':'+';
    const item = document.createElement('li');
    const status = transaction.amount< 0 ?'minus':'plus'
    item.classList.add(status)
    item.innerHTML = `${transaction.text}<span>${symbol}${Math.abs(transaction.amount)}</span><button class="delete-btn">x</button>`;
    console.log(item);
    list.appendChild(item);
}
//                                              ฟังชั่นก์ส่งค่ายอดเงินคงเหลือ,รายรับ,รายจ่าย
function calculates(){
    // คำนวณค่าเงิน
    const amounts = transaction.map(transaction=>transaction.amount);
    const total = amounts.reduce((result,item)=>(result+=item),0).toFixed(2);
    const income = amounts.filter(item=>item>0).reduce((result,item)=>(result+=item),0).toFixed(2);
    const expense = amounts.filter(item=>item<0).reduce((result,item)=>(result+=item),0).toFixed(2);
    // ส่งค่าที่ได้ไปที่ค่าเงินคงเหลือ,รายรับ,รายจ่าย
    balance.innerHTML = `฿${total}`;
    money_plus.innerHTML = `฿${income}`;
    money_minus.innerHTML = `฿${expense}`;
}

init();

//                                                    ฟังชั่นก์เพื่มธุรกรรม
const daTa = document.getElementById("tr-btn");
daTa.addEventListener("click",function(){
    const forto = {id:transaction.length+1,text:text.value,amount:parseInt(amount.value)};
    text.value = ""
    amount.value = ""
    transaction.push(forto);
    let las = transaction[transaction.length-1];
    AddDatatolist(las);
    calculates();
})



