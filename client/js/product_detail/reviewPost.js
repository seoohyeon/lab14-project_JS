import { getNode } from '../../lib/index.js';


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
let PopupWrapper = getNode(".product-popup-wrapper");
let lockChecker = getNode(".product-popup_contents_lock");
let lockCheckButton = getNode(".product-popup_contents_lock_button");
let textareaContent = getNode(".forminput-textarea");



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



// 후기작성하기 pop창 내 > 비밀글 문의하기 - checkbox
lockChecker.addEventListener("click", () =>{
  if(TOGGLE === true) {
    lockCheckButton.style.fill = "var(--primary)";
    TOGGLE = false;
  }else if(TOGGLE === false){
    lockCheckButton.style.fill = "none";
    TOGGLE = true;
  }
})