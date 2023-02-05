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
  getNode(".button_heart_svg").classList.toggle("button_heart_active");
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
  getNode(".product-popup-wrapper").style.display = "block";
  document.body.classList.add("no-scroll");
})
let cancelButton = getNode(".forminput_cancel-button");
let topCloseButton = getNode(".product-popup-close-button");

cancelButton.addEventListener("click", () => {
  getNode(".product-popup-wrapper").style.display = "none";
  document.body.classList.remove("no-scroll");
})
topCloseButton.addEventListener("click", () => {
  getNode(".product-popup-wrapper").style.display = "none";
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
getNode(".product-answer_question-1").addEventListener("keyup", (e) =>{
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
let textareaContent = getNode(".forminput-textarea")
let textareaContent2 = getNode(".forminput-textarea-2")

/*reviewPlaceholder.onfocus = (e) => {
  console.log("되라")
}*/
reviewPlaceholder.addEventListener("focus", () => {
  getNode(".textarea-placeholder").classList.add("a11y-hidden");
  textareaContent.focus()
  //attr(document.querySelector(".forminput-textarea"), 'focus', true)
  getNode(".textarea-wrapper").style.border = "1px solid black";

  textareaContent.addEventListener("focus", () => {
    getNode(".textarea-wrapper").style.border = "1px solid black";
  })
})

textareaContent.addEventListener("focusout", () => {
  if(textareaContent.value.length === 0){
    getNode(".textarea-placeholder").classList.remove("a11y-hidden");
  }
    getNode(".textarea-wrapper").style.border = "1px solid var(--gray-300)";
})


let reviewSubmit = getNode(".review-submit-button");
let reviewTitle = getNode(".review-title");
let reviewContent = getNode(".review-content");
let today = new Date();
// 년도 getFullYear()
let year = today.getFullYear(); 
// 월 getMonth() (0~11로 1월이 0으로 표현되기 때문에 + 1을 해주어야 원하는 월을 구할 수 있다.)
let month = today.getMonth() + 1
// 일 getDate()
let date = today.getDate(); // 일


reviewSubmit.addEventListener("click", (e)=>{
  e.preventDefault();
  // localStorage.setItem("reviewTitle", reviewTitle.value);
  // localStorage.setItem("reviewContent", reviewContent.value);
  getNode(".product-popup-wrapper").style.display = "none";
  document.body.classList.remove("no-scroll");
  getNode(".product-review_list-ifnothing").style.display = "none";
  // getNode(".product-review_list-customer_product").textContent = localStorage.getItem("reviewTitle");
  // getNode(".product-review_list-customer_product-text").textContent = localStorage.getItem("reviewContent");
  // getNode(".review-date").textContent = `${year}.${month}.${date}`;
  // getNode(".product-review-lists").style.display = "block";
  
})

let jsonObject = {
  "title" : "",
  "content" : "" 
}
jsonObject.title = reviewTitle.value;
jsonObject.content = reviewContent.value;

getNode(".form-1").addEventListener("submit", (e) => {

  e.preventDefault();

  fetch('https://localhost:3000/reviews', {
    method : "POST",
    body : JSON.stringify(jsonObject)
  }).then(function (response){
    response.text
  });
})



reviewTitle.addEventListener("keyup", () => {
  if(reviewTitle.value.length && reviewContent.value.length){
    reviewSubmit.style.backgroundColor = "var(--primary)"
    reviewSubmit.disabled = false;
  }else {
    reviewSubmit.style.backgroundColor = "var(--gray-100)"
    reviewSubmit.disabled = true;
  }
})



textareaContent.addEventListener("keyup", () => {
  if(reviewTitle.value.length && reviewContent.value.length){
    reviewSubmit.style.backgroundColor = "var(--primary)"
    reviewSubmit.disabled = false;
  }else {
    reviewSubmit.style.backgroundColor = "var(--gray-100)"
    reviewSubmit.disabled = true;
  }
})



qnaPlaceholder.addEventListener("focus", () =>{
  qnaPlaceholder.classList.add("a11y-hidden")
  getNode(".forminput-textarea-2").focus()
  getNode(".textarea-wrapper-2").style.border = "1px solid black";

  textareaContent2.addEventListener("focus", () => {
    getNode(".textarea-wrapper-2").style.border = "1px solid black";
  })
})

getNode(".forminput-textarea-2").addEventListener("focusout", () =>{
  if(textareaContent2.value.length === 0){
    qnaPlaceholder.classList.remove("a11y-hidden")
  }
  getNode(".textarea-wrapper-2").style.border = "1px solid var(--gray-300)";
})


// placeholder에서 글자수세기

textareaContent.addEventListener("keyup", (e) => {
  getNode(".forminput-textarea_limit-number").textContent = e.target.value.length;
})
textareaContent2.addEventListener("keyup", (e) => {
  getNode(".forminput-textarea_limit-number-2").textContent = e.target.value.length;
})



//문의하기 버튼 -> popup
let answerButton = getNode(".product-answer_register");
answerButton.addEventListener("click", ()=>{
  getNode(".product-popup-wrapper-2").style.display = "block";
  document.body.classList.add("no-scroll");
})

let qnaCancel = getNode(".qna-cancel");
let qnaClose = getNode(".qna-close");
let lockChecker = getNode(".product-popup_contents_lock");
let lockCheckButton = getNode(".product-popup_contents_lock_button");

qnaCancel.addEventListener("click", () => {
  getNode(".product-popup-wrapper-2").style.display = "none";
  document.body.classList.remove("no-scroll");
  lockCheckButton.style.fill = "none";
  textareaContent.value = "";
})
qnaClose.addEventListener("click", () => {
  getNode(".product-popup-wrapper-2").style.display = "none";
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

