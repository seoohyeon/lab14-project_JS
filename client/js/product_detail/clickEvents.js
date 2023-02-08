import { getNode } from '../../lib/index.js';

let recommendButton = getNode(".product-review_sort_recommend");
let newButton = getNode(".product-review_sort_new");
let heartButton = getNode(".order-details_button_heart");




// 상품구매창 - 하트 찜 동작 구현
function coloringHeart(){
  getNode(".button_heart_svg").classList.toggle("button_heart_active");
  getNode(".button_heart_path").classList.toggle("button_heart_path_active");
}

heartButton.addEventListener("click", coloringHeart);


// 상품후기 section
//추천순 | 최신등록순 클릭이벤트 및 tab 웹접근성

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


