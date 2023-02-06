import { getNode } from './../../lib/dom/getNode';

let questionList = getNode(".product-answer_question-look");
let questionListAccordian = getNode(".product-answer_question-accordian");
let TOGGLE = true;

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