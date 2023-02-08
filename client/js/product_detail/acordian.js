import { getNode } from '../../lib/index.js';

let reviewNotice = document.querySelectorAll(".product-review_list-notice");
let reviewNoticeText = document.querySelectorAll(".product-review_list-notice_text");
let questionList = getNode(".product-answer_question-look");
let questionListAccordian = getNode(".product-answer_question-accordian");
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