import { getNode } from '../../lib/index.js';


let PopupWrapper = getNode(".product-popup-wrapper");
let answerButton = getNode(".product-answer_register");
let reviewButton = getNode(".product-review_register");
let cancelButton = getNode(".forminput_cancel-button");
let topCloseButton = getNode(".product-popup-close-button");
let qnaCancel = getNode(".qna-cancel");
let qnaClose = getNode(".qna-close");
let lockChecker = getNode(".product-popup_contents_lock");
let lockCheckButton = getNode(".product-popup_contents_lock_button");




// 후기 작성하기 -> popup창
reviewButton.addEventListener("click", ()=>{
  PopupWrapper.style.display = "block";
  document.body.classList.add("no-scroll");
})
cancelButton.addEventListener("click", () => {
  PopupWrapper.style.display = "none";
  document.body.classList.remove("no-scroll");
})
topCloseButton.addEventListener("click", () => {
  PopupWrapper.style.display = "none";
  document.body.classList.remove("no-scroll");
})



//문의하기 버튼 -> popup

answerButton.addEventListener("click", ()=>{
  getNode(".product-popup-wrapper-2").style.display = "block";
  // scroll기능 막기
  document.body.classList.add("no-scroll");
})

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
