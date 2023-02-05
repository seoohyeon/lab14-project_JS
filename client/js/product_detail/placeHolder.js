import { getNode } from './../../lib/dom/getNode';
let TOGGLE = true;




//-----------------------------------------------------------
// section 3 = 상품후기
//-----------------------------------------------------------


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
let clearIfNothing = getNode(".product-review_list-ifnothing");


function reviewListSaved(){
  fetch("http://localhost:3000/reviews",{
  method : 'GET',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
    }
})
.then(function (res){
  // console.log(res.json);
  return res.json()
}).then(function (data){
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
  `)
  //review가 있을경우 안보이게함.
  if(data.length){
    clearIfNothing.className = "product-review_list-ifnothing-clear";
  }
  })
})
}
reviewListSaved();

// if(getNode(".put-in").innerHTML){
//   console.log(getNode(".put-in").innerHTM);
//   clearIfNothing.className = "product-review_list-notice product-review_list-ifnothing";
// }

reviewSubmit.addEventListener("click", ()=>{
  // localStorage.setItem("reviewTitle", reviewTitle.value);
  // localStorage.setItem("reviewContent", reviewContent.value);
  getNode(".product-popup-wrapper").style.display = "none";
  document.body.classList.remove("no-scroll");
  getNode(".product-review_list-ifnothing").style.display = "none";
  // getNode(".product-review_list-customer_product").textContent = localStorage.getItem("reviewTitle");
  // getNode(".product-review_list-customer_product-text").textContent = localStorage.getItem("reviewContent");
})

getNode(".form-1").addEventListener("submit", (e) => {

  e.preventDefault();

  fetch('http://localhost:3000/reviews', {
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
    `)
  });
    // console.log(data.title)
    // getNode(".product-review_list-customer_product").textContent = data.title;
    // getNode(".product-review_list-customer_product-text").textContent = data.content;
    // getNode(".review-date").textContent = `${year}.${month}.${date}`;
  });




// fetch("http://localhost:3000/reviews", {
//   method : "GET"
// })
// .then((res) => {
//   res.json();
// }).then((data)=> {
//   console.log(data)
// })


    


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