// 하트 찜 버튼
import { getNode } from './../../lib/dom/getNode';

let heartButton = getNode(".order-details_button_heart");

function coloringHeart(){
  getNode(".button_heart_svg").classList.toggle("button_heart_active");
  getNode(".button_heart_path").classList.toggle("button_heart_path_active")
}

heartButton.addEventListener("click", coloringHeart);
