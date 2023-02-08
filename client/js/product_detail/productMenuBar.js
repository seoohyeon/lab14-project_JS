import { getNode } from '../../lib/index.js';

let productMenuNav = document.querySelectorAll(".product-menu_nav");
let productMenu = getNode(".product-menu");



// 상품설명 menu바 scroll 동작구현
window.addEventListener("scroll", () =>{
  let menuBar = getNode(".product-menu").offsetHeight;
  let windowTop = window.scrollY;

   if (windowTop >= menuBar+1340) {
    productMenu.classList.add("drop-2");
  } else {
    productMenu.classList.remove("drop-2");
  }
 })


 // 상품설명 menu바 클릭시 위치 이동 및 색상 변경

productMenuNav.forEach(item => {
 item.addEventListener("click", () =>{
   for(let i=0; i<4; i++){
     productMenuNav[i].className = "product-menu_nav";
   }
   item.className = "product-menu_nav-active";
 })
})

getNode(".product-menu_nav-1").addEventListener("click", () =>{
  window.scrollTo({ top: 1100 });
 })