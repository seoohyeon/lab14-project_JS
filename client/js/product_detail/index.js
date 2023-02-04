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

let totalPrice = getNode(".total-price_number");
let totalNum = +totalPrice.textContent.replace(",","");

let heartButton = getNode(".order-details_button_heart");

let productTitle = getNode(".order-details_title")

function haveMinus() {
  if(number > 1){
    minus.style.cursor = "pointer"
    number -= 1;
    totalNum = String(4980*number);
    totalNum = `${totalNum.slice(0,-3)},${totalNum.slice(-3)}`
    orderNumber.textContent = number;
    totalPrice.textContent = totalNum;
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


// 하트 찜 - tav키 enter, space가 적용이 안됨.(대상은 svg코드임)
function coloringHeart(){
  document.querySelector(".button_heart_svg").classList.toggle("button_heart_active");
  getNode(".button_heart_path").classList.toggle("button_heart_path_active")
}

heartButton.addEventListener("click", coloringHeart);


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

// 메뉴바
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

// 공지 아코디언
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
// tab키 웹접근성
reviewNotice.forEach(item => {
  item.addEventListener("keyup", (e) =>{
    if(TOGGLE === true && item === reviewNotice[0] && e.keyCode == 13){
      reviewNoticeText[0].style.display = "block"
      TOGGLE = false;
    }else if(TOGGLE === false && item === reviewNotice[0] && e.keyCode == 13) {
      reviewNoticeText[0].style.display = "none"
      TOGGLE = true;
    }else if(TOGGLE === true && item === reviewNotice[1] && e.keyCode == 13){
      reviewNoticeText[1].style.display = "block"
      TOGGLE = false;
    }else if(TOGGLE === false && item === reviewNotice[1] && e.keyCode == 13) {
      reviewNoticeText[1].style.display = "none"
      TOGGLE = true;
    }
  })
})

//추천순 | 최신등록순
let recommendButton = getNode(".product-review_sort_recommend");
let newButton = getNode(".product-review_sort_new");

recommendButton.addEventListener("click", () => {
    recommendButton.style.color = "var(--content)"
    newButton.style.color = "var(--gray-300)"
})
newButton.addEventListener("click", () => {
    newButton.style.color = "var(--content)"
    recommendButton.style.color = "var(--gray-300)"
})

recommendButton.addEventListener("keyup", (e) => {
  if(e.keyCode == 13){
    recommendButton.style.color = "var(--content)"
    newButton.style.color = "var(--gray-300)"
  }
  
})
newButton.addEventListener("keyup", (e) => {
  if(e.keyCode == 13){
    newButton.style.color = "var(--content)"
    recommendButton.style.color = "var(--gray-300)"
  }
})


// 후기 작성하기 -> popup
let reviewButton = getNode(".product-review_register");
reviewButton.addEventListener("click", ()=>{
  document.querySelector(".product-popup-wrapper").style.display = "block";
  document.body.classList.add("no-scroll");
})
let cancelButton = getNode(".forminput_cancel-button");
let topCloseButton = getNode(".product-popup-close-button");

cancelButton.addEventListener("click", () => {
  document.querySelector(".product-popup-wrapper").style.display = "none";
  document.body.classList.remove("no-scroll");
})
topCloseButton.addEventListener("click", () => {
  document.querySelector(".product-popup-wrapper").style.display = "none";
  document.body.classList.remove("no-scroll");
})


//-----------------------------------------------------------
// section 4 = 상품문의
//-----------------------------------------------------------

let questionList = getNode(".product-answer_question-look");
let questionListAccordian = getNode(".product-answer_question-accordian");

// qna 아코디언
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

//qna tab키 웹접근성
document.querySelector(".product-answer_question-1").addEventListener("keyup", (e) =>{
  if(TOGGLE === true && e.keyCode == 13){
    questionList.style.color = "var(--content)"
    questionListAccordian.style.display = "block"
    TOGGLE = false;
  }else if(TOGGLE === false && e.keyCode == 13) {
    questionList.style.color = "var(--gray-400)"
    questionListAccordian.style.display = "none"
    TOGGLE = true;
  }
})



//review및 qna placeholder
let reviewPlaceholder = getNode(".placeholder-1");
let qnaPlaceholder = getNode(".placeholder-2")
let textareaContent = document.querySelector(".forminput-textarea")
let textareaContent2 = document.querySelector(".forminput-textarea-2")

/*reviewPlaceholder.onfocus = (e) => {
  console.log("되라")
}*/
reviewPlaceholder.addEventListener("focus", () => {
  document.querySelector(".textarea-placeholder").classList.add("a11y-hidden");
  textareaContent.focus()
  //attr(document.querySelector(".forminput-textarea"), 'focus', true)
  document.querySelector(".textarea-wrapper").style.border = "1px solid black";

  textareaContent.addEventListener("focus", () => {
    document.querySelector(".textarea-wrapper").style.border = "1px solid black";
  })
})

textareaContent.addEventListener("focusout", () => {
  if(textareaContent.value.length === 0){
    getNode(".textarea-placeholder").classList.remove("a11y-hidden");
  }
    document.querySelector(".textarea-wrapper").style.border = "1px solid var(--gray-300)";
})


qnaPlaceholder.addEventListener("focus", () =>{
  qnaPlaceholder.classList.add("a11y-hidden")
  document.querySelector(".forminput-textarea-2").focus()
  document.querySelector(".textarea-wrapper-2").style.border = "1px solid black";

  textareaContent2.addEventListener("focus", () => {
    document.querySelector(".textarea-wrapper-2").style.border = "1px solid black";
  })
})

document.querySelector(".forminput-textarea-2").addEventListener("focusout", () =>{
  if(textareaContent2.value.length === 0){
    qnaPlaceholder.classList.remove("a11y-hidden")
  }
  document.querySelector(".textarea-wrapper-2").style.border = "1px solid var(--gray-300)";
})


// placeholder에서 글자수세기

textareaContent.addEventListener("keyup", (e) => {
  console.log(textareaContent.value.length)
  document.querySelector(".forminput-textarea_limit-number").textContent = e.target.value.length;
 
})



//문의하기 버튼 -> popup
let answerButton = getNode(".product-answer_register");
answerButton.addEventListener("click", ()=>{
  document.querySelector(".product-popup-wrapper-2").style.display = "block";
  document.body.classList.add("no-scroll");
})

let qnaCancel = getNode(".qna-cancel");
let qnaClose = getNode(".qna-close");
let lockChecker = getNode(".product-popup_contents_lock");
let lockCheckButton = getNode(".product-popup_contents_lock_button");

qnaCancel.addEventListener("click", () => {
  document.querySelector(".product-popup-wrapper-2").style.display = "none";
  document.body.classList.remove("no-scroll");
  lockCheckButton.style.fill = "none";
  textareaContent.value = "";
})
qnaClose.addEventListener("click", () => {
  document.querySelector(".product-popup-wrapper-2").style.display = "none";
  document.body.classList.remove("no-scroll");
  lockCheckButton.style.fill = "none";
})

lockChecker.addEventListener("click", () =>{
  if(TOGGLE === true) {
    lockCheckButton.style.fill = "var(--primary)";
    TOGGLE = false;
  }else if(TOGGLE === false){
    lockCheckButton.style.fill = "none";
    TOGGLE = true;
  }
})

