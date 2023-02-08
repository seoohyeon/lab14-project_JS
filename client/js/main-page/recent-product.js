import { getNode, hrefLink, putLocalStorage } from "../../lib/index.js";
import { loadAllCardsToSwiper } from "./create-new-product-card.js";
import { recentProductSwiper } from "./swiper-style.js";

let recentProduct = document.querySelector('.recent-product');
let footer = document.querySelector('footer');
let prdw = document.querySelector('.product-display_wrapper');

function getRelativeTop(targetElem){
  // const target = getNode(targetName); // 요소의 id 값이 target이라 가정
  const target = targetElem; // 요소의 id 값이 target이라 가정
  const clientRect = target.getBoundingClientRect(); // DomRect 구하기 (각종 좌표값이 들어있는 객체)
  const relativeTop = clientRect.top; // Viewport의 시작지점을 기준으로한 상대좌표 Y 값.
  
  return relativeTop
}

function getRelativeLeft(targetElem){
  // const target = getNode(targetName); // 요소의 id 값이 target이라 가정
  const target = targetElem; // 요소의 id 값이 target이라 가정
  const clientRect = target.getBoundingClientRect(); // DomRect 구하기 (각종 좌표값이 들어있는 객체)
  const relativeLeft = clientRect.left; // Viewport의 시작지점을 기준으로한 상대좌표 Y 값.
  
  return relativeLeft
}

export function keepYOfRecentProduct(){
  let windowTop = window.scrollY;
  // let windowBottom = window.scroll
  if(getRelativeTop(footer)<585){
    console.log(585);
    recentProduct.classList.remove('recent-product__fixed');
    recentProduct.classList.add('recent-product__meet-bottom');
    // console.log('footer rt',getRelativeTop(footer));
  }else if(windowTop>560){// have to stop 
    console.log(560);
    recentProduct.classList.remove('recent-product__meet-bottom');
    recentProduct.classList.add('recent-product__fixed');
  }else{
    console.log('else');
    recentProduct.classList.remove('recent-product__meet-bottom');
    recentProduct.classList.remove('recent-product__fixed');
  }
  // console.log('windowTop',windowTop);
  // console.log('rt',getRelativeTop('.recent-product'));
  // console.log('recentProduct.style.top',recentProduct.style.top);
}

function vanishRecentProductWhenCrushed() {
  if(getRelativeLeft(recentProduct)<1194){
    recentProduct.classList.add('a11y-hidden');
  }else{
    recentProduct.classList.remove('a11y-hidden');

  }
}

window.addEventListener('scroll',()=>{
  keepYOfRecentProduct();
}) 

window.onload = function() {
  keepYOfRecentProduct();
  vanishRecentProductWhenCrushed();
}

window.addEventListener(`resize`, function() {
  // console.log(getRelativeLeft(prdw));
  vanishRecentProductWhenCrushed();
});






/* ------------------------------------------------------------------------- */
/*                               상품목록 선택시                              */
/* ------------------------------------------------------------------------- */


let productDisplaySwiper1 = document.querySelector('.product-display_swiper1');
let productDisplaySwiper2 = document.querySelector('.product-display_swiper2');

productDisplaySwiper1.addEventListener('click',(e)=>{
  e.preventDefault();
  let curSlide = e.target.closest('li');

  // 이 앞은 공통적으로 recent product에 상품 추가
  // console.log('id값',curSlide.querySelector('.product-display_product-id').textContent);
  putLocalStorage('id',curSlide.querySelector('.product-display_product-id').textContent);
  loadAllCardsToSwiper(2,'.recent-product_swiper-wrapper',recentProductSwiper);
  // 장바구니 아이콘을 클릭한경우
  if(e.target.classList.contains('product-display_cart-icon')){
    
    console.log("장바구니 팝업 띄워야함");
    document.querySelector('.cart-popup_wrapper').style.display = "block";
    document.body.classList.add('no-scroll');
  }else{
    
    // console.log(typeof curSlide);
    // console.log(curSlide);
    // console.log('product-detail 페이지로 이동해야함');
    hrefLink('http://localhost:5500/product_detail.html');
  }

})

productDisplaySwiper2.addEventListener('click',(e)=>{
  e.preventDefault();
  let curSlide = e.target.closest('li');


  putLocalStorage('id',curSlide.querySelector('.product-display_product-id').textContent);
  loadAllCardsToSwiper(2,'.recent-product_swiper-wrapper',recentProductSwiper);
  // 장바구니 아이콘을 클릭한경우
  if(e.target.classList.contains('product-display_cart-icon')){
    console.log("장바구니 팝업 띄워야함");
    document.querySelector('.cart-popup_wrapper').style.display = "block";
    document.body.classList.add('no-scroll');
  }else{
    hrefLink('http://localhost:5500/product_detail.html');
  }

})

let cartCancel = getNode('.cart-cancel');
let cartAdd = getNode('.cart-add');

cartCancel.addEventListener('click',()=>{
  document.querySelector('.cart-popup_wrapper').style.display = "none";
  document.body.classList.remove('no-scroll');
})

cartAdd.addEventListener('click',() => {
  document.querySelector('.cart-popup_wrapper').style.display = "none";
  document.body.classList.remove('no-scroll');
})


/* -------------------------------------------------------------------------- */
/*                                최근 본 상품 선택 시                          */
/* -------------------------------------------------------------------------- */

let $recentProductSwiper = document.querySelector('.recent-product_swiper');

$recentProductSwiper.addEventListener('click',(e)=>{
  e.preventDefault();
  let curSlide = e.target.closest('.recent-product_swiper-slide');
  // console.log(curSlide);

  putLocalStorage('id',curSlide.querySelector('.recent-product_product-id').textContent);

  hrefLink('http://localhost:5500/product_detail.html');
    
})

// temp code start
// localStorage.removeItem('id');


// temp code end