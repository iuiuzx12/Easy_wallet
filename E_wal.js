const balance = document.getElementById('balance');
const money_plus = document.getElementById('money-plus');
const money_minus = document.getElementById('money-minus');
const list = document.getElementById('list');
const form = document.getElementById('form');
const text = document.getElementById('text');
const amount = document.getElementById('amount');
const deletebtn = document.getElementById('delete-btn')



//                                                      รายการธุรกรรม
const dataTransaction = [
    {id:1,text:"ค่าขนม",amount:-100},
    {id:2,text:"ค่าห้อง",amount:-3000},
    {id:3,text:"เงินเดือน",amount:+18000},
    {id:4,text:"ค่าน้ำ",amount:-300},
]

const transaction = dataTransaction;
//                                                  ฟังก์ชั่นใส่ "," ให้กับตัวเลข
function addcommas(x){
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
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
    let comdata = transaction.amount
    if(comdata<0){
        comdata = `- `+ addcommas(Math.abs(transaction.amount))
    }else{
        comdata = `+ `+ addcommas(Math.abs(transaction.amount))
    }
    item.innerHTML = `${transaction.text}<span>`+ comdata +`</span><button class="delete-btn">x</button>`;
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
    if(total<0){
        balance.innerHTML = `฿0.00 (ติดลบ${addcommas(total)})`
    }else{
        balance.innerHTML = `฿`+addcommas(total);
    }
    
    money_plus.innerHTML = `฿`+addcommas(income);
    money_minus.innerHTML = `฿`+addcommas(expense);
}

init();

//                                                    ฟังก์ชั่นเพื่มธุรกรรม
const daTa = document.getElementById("tr-btn");
daTa.addEventListener("click",function(even){
    even.preventDefault();
    if(text.value.trim() === ""|| amount.value.trim() === ""){
        alert("กรุณาป้อนข้อมูล")
    }else{
        const forto = {id:transaction.length+1,text:text.value,amount:parseInt(amount.value)};
        text.value = ""
        amount.value = ""
        transaction.push(forto);
        let las = transaction[transaction.length-1];
        AddDatatolist(las);
        calculates();
    }
    
})
//                                                       ฟังก์ชั่นลบธุรกรรม

