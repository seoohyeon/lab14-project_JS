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