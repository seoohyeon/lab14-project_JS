//추천순 | 최신등록순
import { getNode } from './../../lib/dom/getNode';

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