
import { getNode } from './../../lib/dom/getNode';

let minus = getNode(".order-details_minus");
let plus = getNode(".order-details_plus");
let orderNumber = getNode(".order-details_number");
let number = +getNode(".order-details_number").textContent;
let totalPrice = getNode(".total-price_number");
let totalNum = +totalPrice.textContent.replace(",","");
let productCount = 1;


function haveMinus() {
  if(number > 1){
    minus.style.cursor = "pointer"
    number -= 1;
    totalNum = String(4980*number);
    totalNum = `${totalNum.slice(0,-3)},${totalNum.slice(-3)}`
    orderNumber.textContent = number;
    totalPrice.textContent = totalNum;
    productCount -= 1;
  }
  if(number === 1){
    getNode(".order-details_minus_path").style.fill = "var(--gray-300)";
    orderNumber.textContent = 1;
    minus.style.cursor = "default"
  }
}

function havePlus() {
    number += 1;
    totalNum = String(4980*number);
    totalNum = `${totalNum.slice(0,-3)},${totalNum.slice(-3)}`
    orderNumber.textContent = number;
    totalPrice.textContent = totalNum;
    productCount +=1;
  
    if(number >1){
      getNode(".order-details_minus_path").style.fill = "var(--content)";
    }
}


// 상품 갯수 선택에 따른 총 가격
minus.addEventListener("click", haveMinus)

minus.addEventListener("keyup", (e) => {
  if(e.keyCode == 13){
    haveMinus();
  }
})

plus.addEventListener("click", havePlus);

plus.addEventListener("keyup", (e) => {
  if(e.keyCode == 13 ){
    havePlus();
  }
})


export { productCount }