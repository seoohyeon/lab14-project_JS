import { changePriceToString,changeStringToPrice } from "../../lib/index.js";



let productDisplaySwiper1 = document.querySelector('.product-display_swiper1');
let productDisplaySwiper2 = document.querySelector('.product-display_swiper2');

let productPrice = 0; // 현재상품 금액
let productCount =1; // 현재상품 개수
let totalPrice = productCount * productPrice; // 장바구니로 선택된 총액

let cartPopupWrapper = document.querySelector('.cart-popup');
let cartPopupTotalPrice = document.querySelector('.cart-popup_price');
let cartPopupTotalCount = document.querySelector('.cart-popup_count-total');
let cartPopupSinglePrice = document.querySelector('.cart-popup_content-count span');
let cartPopupTitle = document.querySelector('.cart-popup_content-title span');

let cartPopupCancelBtn = document.querySelector('.cart-popup_cancel-button');
let cartPopupAddBtn = document.querySelector('.cart-popup_add-button');
let cartPopupPlusBtn = document.querySelector('.cart-popup_count-plus');
let cartPopupMinusBtn = document.querySelector('.cart-popup_count-minus');

let seletedId;

productDisplaySwiper1.addEventListener('click',(e)=>{
  e.preventDefault();
  let curSlide =  e.target.closest('li');
  
  if(e.target.classList.contains('product-display_cart-icon')){
    productPrice = curSlide.querySelector('.product-display_sell-price').textContent;
    productPrice = changeStringToPrice(productPrice);
    
    cartPopupTotalPrice.textContent = changePriceToString(productPrice);
    cartPopupTotalCount.textContent = 1
    cartPopupSinglePrice.textContent = changePriceToString(productPrice);
    cartPopupTitle.textContent = curSlide.querySelector('.product-display_product-name').textContent;

    seletedId = curSlide.querySelector('.product-display_product-id').textContent;
  }
})

productDisplaySwiper2.addEventListener('click',(e)=>{
  e.preventDefault();
  let curSlide =  e.target.closest('li');
  
  if(e.target.classList.contains('product-display_cart-icon')){
    productPrice = curSlide.querySelector('.product-display_sell-price').textContent;
    productPrice = changeStringToPrice(productPrice);
    
    cartPopupTotalPrice.textContent = changePriceToString(productPrice);
    cartPopupTotalCount.textContent = 1
    cartPopupSinglePrice.textContent = changePriceToString(productPrice);
    cartPopupTitle.textContent = curSlide.querySelector('.product-display_product-name').textContent;

    seletedId = curSlide.querySelector('.product-display_product-id').textContent;
  }
})



/* -------------------------------------------------------------------------- */
/*                                 팝업에서의 프로세스                          */
/* -------------------------------------------------------------------------- */



cartPopupWrapper.addEventListener('click',(e)=>{
  e.preventDefault();
  let curBtn = e.target.closest('btn');
  totalPrice = productCount * productPrice;
  if(e.target.classList.contains('cart-popup_cancel-button')){
    // 꺼지는 이벤트가 이미 있음
    // console.log('closed');
  }else if(e.target.classList.contains('cart-popup_add-button')){
    // 꺼지는 이벤트가 이미 있음
    console.log('상품을 장바구니에 담아야함');
    

  }else if(e.target.classList.contains('cart-popup_count-plus')){
    productCount++;
    totalPrice = productCount * productPrice;
    e.currentTarget.querySelector('.cart-popup_count-total').textContent = productCount;
    e.currentTarget.querySelector('.cart-popup_price').textContent = changePriceToString(totalPrice);

  }else if(e.target.classList.contains('cart-popup_count-minus') && productCount>1){
    productCount--;
    totalPrice = productCount * productPrice;
    e.currentTarget.querySelector('.cart-popup_count-total').textContent = productCount;
    e.currentTarget.querySelector('.cart-popup_price').textContent = changePriceToString(totalPrice);
    

  }else{
    // 버튼이 아닌곳을 눌렀을 때
  }


})
