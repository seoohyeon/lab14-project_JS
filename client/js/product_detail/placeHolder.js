import { getNode } from '../../lib/index.js';

// text 적혀있는 창
let reviewPlaceholder = getNode(".placeholder-1");
let qnaPlaceholder = getNode(".placeholder-2");

// contents 적을 수 있는 placeholder창
let textareaContent = getNode(".forminput-textarea");
let textareaContent2 = getNode(".forminput-textarea-2");
let textAreaPlaceHolder = getNode(".textarea-placeholder");
let textAreaWrapper = getNode(".textarea-wrapper");




//review및 qna placeholder

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



// placeholder에서 글자수세기
textareaContent.addEventListener("keyup", (e) => {
  getNode(".forminput-textarea_limit-number").textContent = e.target.value.length;
})
textareaContent2.addEventListener("keyup", (e) => {
  getNode(".forminput-textarea_limit-number-2").textContent = e.target.value.length;
})