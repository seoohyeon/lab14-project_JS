// 나중에 여기는 export만 받아와야함
// 다 비워야 함

import { getNode } from '../../lib/index.js'

let minus = getNode(".order-details_minus");
let plus = getNode(".order-details_plus");
let orderNumber = getNode(".order-details_number");
let number = +getNode(".order-details_number").textContent;

let totalPrice = getNode(".total-price");
let totalNum = +totalPrice.textContent.replace(",","");

let heartButton = getNode(".order-details_button_heart");

let productTitle = getNode(".order-details_title")

// 상품 갯수 선택에 따른 총 가격
minus.addEventListener("click", () => {
  if(number > 1){
    minus.style.cursor = "pointer"
    number -= 1;
    totalNum = String(4980*number);
    totalNum = `${totalNum.slice(0,-3)},${totalNum.slice(-3)}`
    orderNumber.textContent = number;
    totalPrice.textContent = totalNum;
  }
  if(number ===1){
    getNode(".order-details_minus_path").style.fill = "var(--gray-300)";
    orderNumber.textContent = 1;
    minus.style.cursor = "default"
  }
})
plus.addEventListener("click", () => {
  number += 1;
  totalNum = String(4980*number);
  totalNum = `${totalNum.slice(0,-3)},${totalNum.slice(-3)}`
  orderNumber.textContent = number;
  totalPrice.textContent = totalNum;

  if(number >1){
    getNode(".order-details_minus_path").style.fill = "var(--content)";
  }
})

// 하트 찜
heartButton.addEventListener("click", () =>{

  heartButton.classList.toggle("button_heart_active");
  getNode(".button_heart_path").classList.toggle("button_heart_path_active")

})

// cart-bubble 창
getNode(".cart_bubble_title").textContent = productTitle.textContent;

getNode(".button_add_cart").addEventListener("click", () =>{
  getNode(".cart_bubble_wrapper").style.display = "block";
  setTimeout(() => {
    getNode(".cart_bubble_wrapper").style.display = "none";
  }, 3000);
})