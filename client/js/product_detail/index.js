// 나중에 여기는 export만 받아와야함
// 다 비워야 함

import { getNode } from '../../lib/index.js'
import { attr } from './../../lib/dom/attr.js';

//-----------------------------------------------------------
// section 1 = 상품구매창
//-----------------------------------------------------------

let minus = getNode(".order-details_minus");
let plus = getNode(".order-details_plus");
let orderNumber = getNode(".order-details_number");
let number = +getNode(".order-details_number").textContent;

let totalPrice = getNode(".total-price");
let totalNum = +totalPrice.textContent.replace(",","");

let heartButton = getNode(".button_heart_svg");

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

//-----------------------------------------------------------
// section 2 = 상품설명
//-----------------------------------------------------------


let productMenu = document.querySelectorAll(".product-menu_nav");

 productMenu.forEach(item => {
  item.addEventListener("click", () =>{
    for(let i=0; i<4; i++){
      productMenu[i].className = "product-menu_nav";
    }
    item.className = "product-menu_nav-active";
  })
 })




//-----------------------------------------------------------
// section 3 = 상품후기
//-----------------------------------------------------------

let reviewNotice = document.querySelectorAll(".product-review_list-notice");
let reviewNoticeText = document.querySelectorAll(".product-review_list-notice_text")
let TOGGLE = true;

reviewNotice.forEach(item => {
  item.addEventListener("click", () =>{
    if(TOGGLE === true && item === reviewNotice[0]){
      reviewNoticeText[0].style.display = "block"
      TOGGLE = false;
    }else if(TOGGLE === false && item === reviewNotice[0]) {
      reviewNoticeText[0].style.display = "none"
      TOGGLE = true;
    }else if(TOGGLE === true && item === reviewNotice[1]){
      reviewNoticeText[1].style.display = "block"
      TOGGLE = false;
    }else if(TOGGLE === false && item === reviewNotice[1]) {
      reviewNoticeText[1].style.display = "none"
      TOGGLE = true;
    }
  })
})

//-----------------------------------------------------------
// section 3 = 상품문의
//-----------------------------------------------------------

let questionList = getNode(".product-answer_question-look");
let questionListAccordian = getNode(".product-answer_question-accordian");


questionList.addEventListener("click", () =>{

  
  if(TOGGLE === true){
    questionList.style.color = "var(--content)"
    questionListAccordian.style.display = "block"
    TOGGLE = false;
  }else if(TOGGLE === false) {
    questionList.style.color = "var(--gray-400)"
    questionListAccordian.style.display = "none"
    TOGGLE = true;
  }
})


let reviewPlaceholder = getNode(".placeholder-1");

/*reviewPlaceholder.onfocus = (e) => {
  console.log("되라")
}*/
reviewPlaceholder.addEventListener("focus", () => {
  document.querySelector(".textarea-placeholder").classList.add("a11y-hidden");
  
  document.querySelector(".forminput-textarea").focus()
  //attr(document.querySelector(".forminput-textarea"), 'focus', true)
})

document.querySelector(".forminput-textarea").addEventListener("focusout", () => {
  document.querySelector(".textarea-placeholder").classList.remove("a11y-hidden");
})

