export * from '../global.js'
// 나중에 여기는 export만 받아와야함
// 다 비워야 함

import { getNode } from '../../lib/index.js'

let minus = getNode(".order-details_minus");
let plus = getNode(".order-details_plus");
let orderNumber = getNode(".order-details_number");
let number = +getNode(".order-details_number").textContent;

let totalPrice = getNode(".total-price_number");
let totalNum = +totalPrice.textContent.replace(",","");

let heartButton = getNode(".order-details_button_heart");

let productTitle = getNode(".order-details_title")
let productCount = 1;
let productCountSum = 0;
let getProductItem = 0;
let savedProductItem = 0;
let flag = false;
let cartBubbleWarpper = getNode(".cart_bubble_wrapper");



await fetch("http://localhost:3000/products")
.then((res) => {
    return res.json();
  }).then((data) => {
    // data = JSON파일에 저장된 products 배열

    let output = localStorage.getItem("id");
    let arr = JSON.parse(output);


    // products 배열을 순회함
    for(let i=0; i<data.length; i++){
      let price = String(data[i].salePrice);

      // localstorage에서 가져온 value(배열)의 맨 마지막 id === products 배열 id가 같다면 실행.
      if(arr[arr.length-1] === data[i].id){
        getNode(".order-img-tag").src = `./assets/${data[i].image.view}`;
        productTitle.textContent = data[i].name;
        getNode(".order-details_subtitle").textContent = data[i].description;
        getNode(".order-details_price").textContent = `${price.slice(0,-3)},${price.slice(-3)}원`;
        getNode(".product-price").textContent = `${price.slice(0,-3)},${price.slice(-3)}원`;
        totalPrice.textContent = `${price.slice(0,-3)},${price.slice(-3)}`;

        getNode(".review-popup").src = `./assets/${data[i].image.view}`;
        getNode(".review-popup-text").textContent = data[i].name;


        // 마이너스 함수 선언
        function haveMinus() {

          // number = string인 노드의 textcontent임 = 초기값 1
          if(number > 1){
            minus.style.cursor = "pointer";
            number -= 1;
            totalNum = String(data[i].salePrice*number);
            totalNum = `${totalNum.slice(0,-3)},${totalNum.slice(-3)}`;
            orderNumber.textContent = number;
            totalPrice.textContent = totalNum;
          }
          // number가 1이면 더이상 마이너스가 되지 않도록 구현
          if(number === 1){
            getNode(".order-details_minus_path").style.fill = "var(--gray-300)";
            orderNumber.textContent = 1;
            minus.style.cursor = "default";
          }
        }
        
        // 플러스 함수 선언
        function havePlus() {
            number += 1;
            totalNum = String(data[i].salePrice*number);
            totalNum = `${totalNum.slice(0,-3)},${totalNum.slice(-3)}`;
            orderNumber.textContent = number;
            totalPrice.textContent = totalNum;
          
            if(number >1){
              getNode(".order-details_minus_path").style.fill = "var(--content)";
            }
        }
        
        
        // 상품 갯수 선택에 따른 총 가격 나타나도록 함수 호출
        minus.addEventListener("click", haveMinus);
        
        // tab키 접근성
        minus.addEventListener("keyup", (e) => {
          if(e.keyCode == 13){
            haveMinus();
          }
        })
        
        plus.addEventListener("click", havePlus);
        
        // tab키 접근성
        plus.addEventListener("keyup", (e) => {
          if(e.keyCode == 13 ){
            havePlus();
          }
        })
        // 변수에 찾은 데이터를 받아옴
        getProductItem = data[i];
      }
    }
   
    // 데이터에 따른 상품설명 창 변경
    getNode('.product-img-banner').src = `./assets/${getProductItem.image.banner}`;
    getNode('.product-detail_title-p').textContent = getProductItem.description;
    getNode('.product-detail_title').textContent = getProductItem.name;
    getNode('.product-detail_info').src = `./assets/${getProductItem.image.info}`;
    
  })


 // cart-bubble 창
 getNode(".cart_bubble_title").textContent = getProductItem.name;

 // 장바구니 담기 버튼 클릭시 실행문
 getNode(".button_add_cart").addEventListener("click", async () =>{
    cartBubbleWarpper.style.display = "block";
    // 장바구니 팝업창 1초동안 보여주기
   setTimeout(() => {
    cartBubbleWarpper.style.display = "none";
   }, 1000);
   getNode(".cart_bubble_img").src = `./assets/${getProductItem.image.view}`;
   
   // 데이터 불러오기
   await fetch("http://localhost:3000/basket").then((res) => {
     return res.json();
   }).then((newData) => {
    // 배열 데이터 변수에 할당
     return savedProductItem = newData;
   })

   for(let i=0; i<savedProductItem.length; i++){

    // 배열 데이터 변수 id === 앞에서 찾은 데이터 id가 같을시 실행문
    if(savedProductItem[i].id === getProductItem.id){
      // 데이터바인딩을 위한 플래그 변수 이용
      flag = true;
      // 배열데이터에 찾은 변수가 있다면 합 변수에 넣기
      productCountSum = savedProductItem[i].number;
    }  
  }

  // flag === true일 경우(배열데이터에 찾은변수가 있다면)
  if(flag){
    //원래 합에 최근 받은 숫자 더하기
    productCountSum += number;

    // PUT방식으로 업데이트 시키기
    fetch(`http://localhost:3000/basket/${getProductItem.id}`,{
    method : "PUT",
    headers: {
      'Content-Type': 'application/json'
      },
    body : JSON.stringify({
      id : getProductItem.id,
      number : productCountSum,
    })
   }).then((res) =>{
    return res.json();
   })
   // 그 외의 경우(배열데이터에 찾은변수가 없다면, 즉 처음 들어온 데이터라면)
  } else {
    // POST방식으로 create
    fetch("http://localhost:3000/basket",{
      method : "POST",
      headers: {
        'Content-Type': 'application/json'
        },
      body : JSON.stringify({
        id : getProductItem.id,
        number : number,
      })
    }).then((res) =>{
      return res.json();
    })
  } 
 })

 // 장바구니에 물건이 있다면 cart에 불이 들어옴
fetch("http://localhost:3000/basket")
 .then((res) => {
  return res.json();
}).then((data) => {
  console.log(data.length)
  if(data.length){
    getNode(".cart-bell").style.visibility = "visible";
  }
})



// 상품설명 menu scroll동작 구현
window.addEventListener("scroll", () =>{
  let menuBar = getNode(".product-menu").offsetHeight;
  let windowTop = window.scrollY;

   if (windowTop >= menuBar+1340) {
    getNode(".product-menu").classList.add("drop-2");
  } else {
    getNode(".product-menu").classList.remove("drop-2");
  }
 })


 

//-----------------------------------------------------------
// section 1 = 상품구매창
//-----------------------------------------------------------





// 하트 찜 동작 구현
function coloringHeart(){
  getNode(".button_heart_svg").classList.toggle("button_heart_active");
  getNode(".button_heart_path").classList.toggle("button_heart_path_active");
}

heartButton.addEventListener("click", coloringHeart);



//-----------------------------------------------------------
// section 2 = 상품설명
//-----------------------------------------------------------

// 메뉴바 클릭시 위치 이동 및 색상 변경
let productMenu = document.querySelectorAll(".product-menu_nav");

 productMenu.forEach(item => {
  item.addEventListener("click", () =>{
    for(let i=0; i<4; i++){
      productMenu[i].className = "product-menu_nav";
    }
    item.className = "product-menu_nav-active";
  })
 })

 getNode(".product-menu_nav-1").addEventListener("click", () =>{
  window.scrollTo({ top: 1100 });
 })






//-----------------------------------------------------------
// section 3 = 상품후기
//-----------------------------------------------------------

let reviewNotice = document.querySelectorAll(".product-review_list-notice");
let reviewNoticeText = document.querySelectorAll(".product-review_list-notice_text");
let TOGGLE = true;

// 공지 아코디언
reviewNotice.forEach(item => {
  item.addEventListener("click", () =>{
    if(TOGGLE === true && item === reviewNotice[0]){
      reviewNoticeText[0].style.display = "block";
      TOGGLE = false;
    }else if(TOGGLE === false && item === reviewNotice[0]) {
      reviewNoticeText[0].style.display = "none";
      TOGGLE = true;
    }else if(TOGGLE === true && item === reviewNotice[1]){
      reviewNoticeText[1].style.display = "block";
      TOGGLE = false;
    }else if(TOGGLE === false && item === reviewNotice[1]) {
      reviewNoticeText[1].style.display = "none";
      TOGGLE = true;
    }
  })
})

// tab키 웹접근성
reviewNotice.forEach(item => {
  item.addEventListener("keyup", (e) =>{
    if(TOGGLE === true && item === reviewNotice[0] && e.keyCode == 13){
      reviewNoticeText[0].style.display = "block";
      TOGGLE = false;
    }else if(TOGGLE === false && item === reviewNotice[0] && e.keyCode == 13) {
      reviewNoticeText[0].style.display = "none";
      TOGGLE = true;
    }else if(TOGGLE === true && item === reviewNotice[1] && e.keyCode == 13){
      reviewNoticeText[1].style.display = "block";
      TOGGLE = false;
    }else if(TOGGLE === false && item === reviewNotice[1] && e.keyCode == 13) {
      reviewNoticeText[1].style.display = "none";
      TOGGLE = true;
    }
  })
})

//추천순 | 최신등록순
let recommendButton = getNode(".product-review_sort_recommend");
let newButton = getNode(".product-review_sort_new");

recommendButton.addEventListener("click", () => {
    recommendButton.style.color = "var(--content)";
    newButton.style.color = "var(--gray-300)";
})
newButton.addEventListener("click", () => {
    newButton.style.color = "var(--content)";
    recommendButton.style.color = "var(--gray-300)";
})
recommendButton.addEventListener("keyup", (e) => {
  if(e.keyCode == 13){
    recommendButton.style.color = "var(--content)";
    newButton.style.color = "var(--gray-300)";
  } 
})
newButton.addEventListener("keyup", (e) => {
  if(e.keyCode == 13){
    newButton.style.color = "var(--content)";
    recommendButton.style.color = "var(--gray-300)";
  }
})


let PopupWrapper = getNode(".product-popup-wrapper");

// 후기 작성하기 -> popup창
let reviewButton = getNode(".product-review_register");
reviewButton.addEventListener("click", ()=>{
  PopupWrapper.style.display = "block";
  document.body.classList.add("no-scroll");
})
let cancelButton = getNode(".forminput_cancel-button");
let topCloseButton = getNode(".product-popup-close-button");

cancelButton.addEventListener("click", () => {
  PopupWrapper.style.display = "none";
  document.body.classList.remove("no-scroll");
})
topCloseButton.addEventListener("click", () => {
  PopupWrapper.style.display = "none";
  document.body.classList.remove("no-scroll");
})



//문의하기 버튼 -> popup
let answerButton = getNode(".product-answer_register");
answerButton.addEventListener("click", ()=>{
  getNode(".product-popup-wrapper-2").style.display = "block";
  // scroll기능 막기
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


//-----------------------------------------------------------
// section 4 = 상품문의
//-----------------------------------------------------------

let questionList = getNode(".product-answer_question-look");
let questionListAccordian = getNode(".product-answer_question-accordian");

// qna 아코디언
questionList.addEventListener("click", () =>{
  if(TOGGLE === true){
    questionList.style.color = "var(--content)";
    questionListAccordian.style.display = "block";
    TOGGLE = false;
  }else if(TOGGLE === false) {
    questionList.style.color = "var(--gray-400)";
    questionListAccordian.style.display = "none";
    TOGGLE = true;
  }
})

//qna tab키 웹접근성
getNode(".product-answer_question-1").addEventListener("keyup", (e) =>{
  if(TOGGLE === true && e.keyCode == 13){
    questionList.style.color = "var(--content)";
    questionListAccordian.style.display = "block";
    TOGGLE = false;
  }else if(TOGGLE === false && e.keyCode == 13) {
    questionList.style.color = "var(--gray-400)";
    questionListAccordian.style.display = "none";
    TOGGLE = true;
  }
})




//review및 qna placeholder
// text 적혀있는 창
let reviewPlaceholder = getNode(".placeholder-1");
let qnaPlaceholder = getNode(".placeholder-2");

// contents 적을 수 있는 placeholder창
let textareaContent = getNode(".forminput-textarea");
let textareaContent2 = getNode(".forminput-textarea-2");

let textAreaPlaceHolder = getNode(".textarea-placeholder");
let textAreaWrapper = getNode(".textarea-wrapper");

// text 적혀있는 창에 focus한 경우, 그 창은 사라지고 placeholder창이 focus 되게 함
reviewPlaceholder.addEventListener("focus", () => {
  textAreaPlaceHolder.classList.add("a11y-hidden");
  textareaContent.focus();

  textAreaWrapper.style.border = "1px solid black";

  textareaContent.addEventListener("focus", () => {
    textAreaWrapper.style.border = "1px solid black";
  })
})

// placeholder창에서 focusout 할 경우, text 적힌 창이 다시 뜨도록 함
textareaContent.addEventListener("focusout", () => {
  if(textareaContent.value.length === 0){
    textAreaPlaceHolder.classList.remove("a11y-hidden");
  }
    textAreaWrapper.style.border = "1px solid var(--gray-300)";
})

// qna 팝업창 동일한 작업
qnaPlaceholder.addEventListener("focus", () =>{
  qnaPlaceholder.classList.add("a11y-hidden");
  getNode(".forminput-textarea-2").focus();
  getNode(".textarea-wrapper-2").style.border = "1px solid black";

  textareaContent2.addEventListener("focus", () => {
    getNode(".textarea-wrapper-2").style.border = "1px solid black";
  })
})

getNode(".forminput-textarea-2").addEventListener("focusout", () =>{
  if(textareaContent2.value.length === 0){
    qnaPlaceholder.classList.remove("a11y-hidden");
  }
  getNode(".textarea-wrapper-2").style.border = "1px solid var(--gray-300)";
})







let reviewSubmit = getNode(".review-submit-button");
let reviewTitle = getNode(".review-title");
let reviewContent = getNode(".review-content");
let today = new Date();
// 년도 getFullYear()
let year = today.getFullYear(); 
// 월 getMonth() (0~11로 1월이 0으로 표현되기 때문에 + 1을 해주어야 원하는 월을 구할 수 있다.)
let month = today.getMonth() + 1;
// 일 getDate()
let date = today.getDate(); // 일
let clearIfNothing = getNode(".product-review_list-ifnothing");


// 후기 저장하는 함수 (재로딩시에도 화면에 부팅이 됨)
function reviewListSaved(){
  fetch("http://localhost:3000/reviews").then(function (res){
  return res.json();
}).then(function (data){
  getNode(".product-menu_nav-3").textContent = `후기 (${data.length})`;
  data.forEach(obj =>{
    getNode(".put-in").insertAdjacentHTML("beforeend",
    `
    <div class="product-review_list-customer">
      <div class="product-review_list-customer_boxes">
        <span class="product-review_list-customer_box-best">베스트</span>
        <span class="product-review_list-customer_box-level">퍼플</span>
        <span class="product-review_list-customer_name">김*현</span>
      </div>
      <div>
        <p class="product-review_list-customer_product">${obj.title}</p>
        <pre class="product-review_list-customer_product-text">
        ${obj.content}</pre>
        <p class="product-review_list-customer_product review-date">${year}.${month}.${date}</p>
      </div>
    </div>
  `);
  //review가 있을경우 '후기가 없습니다'를 안보이게함.
  if(data.length){
    clearIfNothing.className = "product-review_list-ifnothing-clear";
  }
  })
})
}
// 재부팅시도 항상실행시킴
reviewListSaved();


// 후기 작성하기 팝업창 등록하기 구현
reviewSubmit.addEventListener("click", ()=>{
  PopupWrapper.style.display = "none";
  clearIfNothing.style.display = "none";
  // 스크롤 기능 원상복구
  document.body.classList.remove("no-scroll");
})

// form-1 = 후기작성하기 form태그
getNode(".form-1").addEventListener("submit", async (e) => {

  e.preventDefault();

  // 순서대로 실행하기위해 await 사용.
  // 글 작성하기
  await fetch('http://localhost:3000/reviews', {
    method : "POST",
    body : JSON.stringify({
      title : reviewTitle.value,
      content : reviewContent.value,  
    }),
    // POST 할때 headers 형식 꼭 써주어야 함.
    headers: {
      'Content-Type': 'application/json',
    },
  }).then(function (response){
    return response.json();
  }).then(function (data){
      getNode(".put-in").insertAdjacentHTML("beforeend",
      `
      <div class="product-review_list-customer">
        <div class="product-review_list-customer_boxes">
          <span class="product-review_list-customer_box-best">베스트</span>
          <span class="product-review_list-customer_box-level">퍼플</span>
          <span class="product-review_list-customer_name">김*현</span>
        </div>
        <div>
          <p class="product-review_list-customer_product">${data.title}</p>
          <pre class="product-review_list-customer_product-text">
          ${data.content}</pre>
          <p class="product-review_list-customer_product review-date">${year}.${month}.${date}</p>
        </div>
      </div>
    `);
  })

  // 메뉴바 - 후기(num) 동기화 해주기
  fetch('http://localhost:3000/reviews').then((res) => { return res.json()})
  .then((data) => {
    console.log(data);
    getNode(".product-menu_nav-3").textContent = `후기 (${data.length})`;
  })
  });



// 후기 작성하기 제목 작성시 submit 버튼 색상 변경
reviewTitle.addEventListener("keyup", () => {
  if(reviewTitle.value.length && reviewContent.value.length){
    reviewSubmit.style.backgroundColor = "var(--primary)";
    reviewSubmit.disabled = false;
  }else {
    reviewSubmit.style.backgroundColor = "var(--gray-100)";
    reviewSubmit.disabled = true;
  }
})

textareaContent.addEventListener("keyup", () => {
  if(reviewTitle.value.length && reviewContent.value.length){
    reviewSubmit.style.backgroundColor = "var(--primary)";
    reviewSubmit.disabled = false;
  }else {
    reviewSubmit.style.backgroundColor = "var(--gray-100)";
    reviewSubmit.disabled = true;
  }
})





// placeholder에서 글자수세기
textareaContent.addEventListener("keyup", (e) => {
  getNode(".forminput-textarea_limit-number").textContent = e.target.value.length;
})
textareaContent2.addEventListener("keyup", (e) => {
  getNode(".forminput-textarea_limit-number-2").textContent = e.target.value.length;
})



// 비밀글 문의하기 - checkbox
lockChecker.addEventListener("click", () =>{
  if(TOGGLE === true) {
    lockCheckButton.style.fill = "var(--primary)";
    TOGGLE = false;
  }else if(TOGGLE === false){
    lockCheckButton.style.fill = "none";
    TOGGLE = true;
  }
})
