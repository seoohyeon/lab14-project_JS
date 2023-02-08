export * from '../global.js'

import { getNode, putLocalStorage } from "../../lib/index.js";

let filterAccordionItem = document.querySelectorAll('.filter_accordion-item')
let filterAccordionInventory = document.querySelectorAll('.filter_accordion-inventory');
let filterTitleArrow = document.querySelectorAll('.filter_title-arrow');
let TOGGLE = true;
let minus = getNode(".cart-popup_count-minus");
let plus = getNode(".cart-popup_count-plus");
let number = +getNode(".cart-popup_count-total").textContent;
let totalPrice = getNode(".cart-popup_price");
let totalNum = +totalPrice.textContent.replace(",","");
let orderNumber = getNode(".cart-popup_count-total");
let cartCancel = getNode('.cart-cancel');
let cartAdd = getNode('.cart-add');
let productCount = 1;
let getProductItem = 0;
let productCountSum = 0;
let savedProductItem = 0;
let flag = false;


filterAccordionItem.forEach(item => {
  item.addEventListener("click", () =>{
    if(TOGGLE === true && item === filterAccordionItem[0]){
      filterAccordionInventory[0].style.display = "none";
      filterTitleArrow[0].style.backgroundPosition = "-8px -34px";
      TOGGLE = false;
    }else if(TOGGLE === false && item === filterAccordionItem[0]) {
      filterAccordionInventory[0].style.display = "block";
      filterTitleArrow[0].style.backgroundPosition = "-8px -8px";
      TOGGLE = true;
    }else if(TOGGLE === true && item === filterAccordionItem[1]){
      filterAccordionInventory[1].style.display = "none";
      filterTitleArrow[1].style.backgroundPosition = "-8px -34px";
      TOGGLE = false;
    }else if(TOGGLE === false && item === filterAccordionItem[1]) {
      filterAccordionInventory[1].style.display = "block";
      filterTitleArrow[1].sbesttyle.backgroundPosition = "-8px -8px";
      TOGGLE = true;
    }
  })
})

let bestListArray = document.querySelectorAll('.best-list_top-array li')
bestListArray.forEach(item => {
  item.addEventListener('click',()=>{
    if(item === bestListArray[0]){
      bestListArray[0].style.color = "var(--content)";
      bestListArray[1].style.color = "var(--gray-300)";
      bestListArray[2].style.color = "var(--gray-300)";
      bestListArray[3].style.color = "var(--gray-300)";
      bestListArray[4].style.color = "var(--gray-300)";
      bestListArray[5].style.color = "var(--gray-300)";
    }else if(item === bestListArray[1]){
      bestListArray[0].style.color = "var(--gray-300)";
      bestListArray[1].style.color = "var(--content)";
      bestListArray[2].style.color = "var(--gray-300)";
      bestListArray[3].style.color = "var(--gray-300)";
      bestListArray[4].style.color = "var(--gray-300)";
      bestListArray[5].style.color = "var(--gray-300)";
    }else if(item === bestListArray[2]){
      bestListArray[0].style.color = "var(--gray-300)";
      bestListArray[1].style.color = "var(--gray-300)";
      bestListArray[2].style.color = "var(--content)";
      bestListArray[3].style.color = "var(--gray-300)";
      bestListArray[4].style.color = "var(--gray-300)";
      bestListArray[5].style.color = "var(--gray-300)";
    }else if(item === bestListArray[3]){
      bestListArray[0].style.color = "var(--gray-300)";
      bestListArray[1].style.color = "var(--gray-300)";
      bestListArray[2].style.color = "var(--gray-300)";
      bestListArray[3].style.color = "var(--content)";
      bestListArray[4].style.color = "var(--gray-300)";
      bestListArray[5].style.color = "var(--gray-300)";
    }else if(item === bestListArray[4]){
      bestListArray[0].style.color = "var(--gray-300)";
      bestListArray[1].style.color = "var(--gray-300)";
      bestListArray[2].style.color = "var(--gray-300)";
      bestListArray[3].style.color = "var(--gray-300)";
      bestListArray[4].style.color = "var(--content)";
      bestListArray[5].style.color = "var(--gray-300)";
    }else if(item === bestListArray[5]){
      bestListArray[0].style.color = "var(--gray-300)";
      bestListArray[1].style.color = "var(--gray-300)";
      bestListArray[2].style.color = "var(--gray-300)";
      bestListArray[3].style.color = "var(--gray-300)";
      bestListArray[4].style.color = "var(--gray-300)";
      bestListArray[5].style.color = "var(--content)";
    }
  })
})

let bestListInventoryProduct = document.querySelector('.best-list_inventory-product');

// 장바구니 모양 클릭
bestListInventoryProduct.onclick = (e) => {
  e.preventDefault();
  let curSlide = e.target.closest('li');
  putLocalStorage('id',curSlide.querySelector('.product-display_product-id').textContent);
  getNode(".cart-popup_count-total").textContent = 1;
  productCount = 1;

  
  if(e.target.classList.contains('product-display_cart-icon')){
    document.querySelector('.cart-popup_wrapper').style.display = "block";
    document.body.classList.add('no-scroll');
    // e.target.classList.add('cart-popup__active')
  }else{
    
    // console.log(typeof curSlide);
    // console.log(curSlide);
    // console.log('product-detail 페이지로 이동해야함');
    location.href = 'http://localhost:5500/product_detail.html';
    
  }


  //장바구니 +,-
  fetch("http://localhost:3000/products").then((res) => {
    return res.json();
  }).then((data) => {
    console.log(data)
    let output = localStorage.getItem("id");
    let arr = JSON.parse(output);

    for(let i=0; i<data.length; i++){
      let price = String(data[i].salePrice);


      if(arr[arr.length-1] === data[i].id){
        number = 1;
        getNode(".cart-popup_product").textContent = `${price.slice(0,-3)},${price.slice(-3)}원`;
        getNode(".cart-popup_content-title").textContent = data[i].name;
        totalPrice.textContent = `${price.slice(0,-3)},${price.slice(-3)}`;


        function haveMinus() {
          console.log(number)
          if(number > 1){
            minus.style.cursor = "pointer";
            number -= 1;
            totalNum = String(data[i].salePrice*number);
            totalNum = `${totalNum.slice(0,-3)},${totalNum.slice(-3)}`;
            orderNumber.textContent = number;
            totalPrice.textContent = totalNum;
          }
          if(number === 1){
            getNode(".order-details_minus_path").style.fill = "var(--gray-300)";
            orderNumber.textContent = 1;
            minus.style.cursor = "default";
          }

        }
        
        function havePlus() {
          console.log(number);
            number += 1;
            totalNum = String(data[i].salePrice*number);
            totalNum = `${totalNum.slice(0,-3)},${totalNum.slice(-3)}`;
            orderNumber.textContent = number;
            totalPrice.textContent = totalNum;
        }
        
        
        // 상품 갯수 선택에 따른 총 가격
        minus.onclick = haveMinus;
        
        minus.addEventListener("keyup", (e) => {
          if(e.keyCode == 13){
            haveMinus();
          }
        })
        
        plus.onclick = havePlus;
        
        plus.addEventListener("keyup", (e) => {
          if(e.keyCode == 13 ){
            havePlus();
          }

        })
        getProductItem = data[i];
      }
      
    }
  })
}

//취소버튼
cartCancel.addEventListener('click',()=>{
  document.querySelector('.cart-popup_wrapper').style.display = "none";
  document.body.classList.remove('no-scroll');

  number = 1;
})

// 장바구니 담기 버튼
cartAdd.addEventListener('click', async () => {

  document.querySelector('.cart-popup_wrapper').style.display = "none";
  document.body.classList.remove('no-scroll');

  await fetch("http://localhost:3000/basket").then((res) => {
     return res.json();
   }).then((newData) => {
     return savedProductItem = newData;
   })
   console.log(savedProductItem);
   for(let i=0; i<savedProductItem.length; i++){
    // console.log(savedProductItem[i].id) // 장부 2가지
    // console.log(getProductItem.id) // 내가 가져온애


    if(savedProductItem[i].id === getProductItem.id){
      flag = true;
      productCountSum = savedProductItem[i].number;
    }  
  }

  console.log(flag);


  if(flag){
    productCountSum += number;
    fetch(`http://localhost:3000/basket/${getProductItem.id}`,{
    method : "PUT",
    headers: {
      'Content-Type': 'application/json'
      },
    body : JSON.stringify({
      id : getProductItem.id,
      number : productCountSum,
    })
   }).then((res) =>{
    return res.json();
   })
  } else {
    fetch("http://localhost:3000/basket",{
      method : "POST",
      headers: {
        'Content-Type': 'application/json'
        },
      body : JSON.stringify({
        id : getProductItem.id,
        number : number,
      })
    }).then((res) =>{
      return res.json();
    })
  } 
})



const SERVER_URL = 'http://localhost:3000/';

/* -------------------------------------------------------------------------- */
/*                                 모듈화 필요 시작부분                                */
/* -------------------------------------------------------------------------- */
let productArr;
//option 1 이면 메인페이지, 2이면 product-list, 
// 3이면 슬라이드 추가, 4면 recent-product의 슬라이드 추가
function makeCard(option,{id,image:imageUrl,name:productName,saleRatio,salePrice,price,description,shippingInfo,isKarlyOnly,isLimitedProduct}) {
  imageUrl = imageUrl.thumbnail;
  if(saleRatio == 0 ){
    salePrice = price;
    price ="";
    saleRatio="";
  }
  let salePriceStr = String(salePrice);

  salePriceStr = `${salePriceStr.slice(0,-3)}${salePriceStr.slice(0,-3).length>0?
    `,`:``}${salePriceStr.slice(-3)}원`;
  // console.log(salePriceStr);
  let newCard = /*html*/
  `
  ${option==3?`<div class="swiper-slide product-display_swiper-slide"><ul class="product-display_product-cards-container">`:``}
<li>
  <div class="a11y-hidden product-display_product-id">${id}</div>
  <a class="product-display_product-card" href="./product_detail.html">
    <figure>
      <img class="product-display_product-img" src="./assets/${imageUrl}" alt="${productName}" />
      <figcaption class="a11y-hidden">${productName}</figcaption>
    </figure>
    <div class="product-display_cart-icon-container">
      <img class="product-display_cart-icon" src="./assets/icons/web-icons/Cart.svg" alt="장바구니 아이콘" />
    </div>
    <div class="product-display_info-wrapper">
      <mark class="product-display_shipping-info">
        ${shippingInfo}
      </mark>
      <mark class="product-display_product-name">
        ${productName} 
      </mark>
      <div class="product-display_price-wrapper">
        <mark class="product-display_discount-rate">${saleRatio*100}%</mark>
        
        <mark class="product-display_sell-price">${salePriceStr}</mark>
      </div>
      <div class="product-display_undiscounted-price">${price}</div>
      <div class="product-display_product-detail">
        ${description}
      </div>          
      ${ 
        option != 2 ?``:
        (isKarlyOnly && isLimitedProduct)?
          `<div class="product-display_badge-wrapper">
            <mark class="product-display_karly-only"></mark>
            <mark class="product-display_limited-products"></mark>
          </div>`
        :isKarlyOnly?
          `<div class="product-display_badge-wrapper">
            <mark class="product-display_karly-only"></mark>
          </div>`
        :isLimitedProduct?
          `<div class="product-display_badge-wrapper">
            <mark class="product-display_limited-products"></mark>
          </div>`:``
      } 

    </div>
  </a>
</li>
${option==3?`</ul></div>`:``}
  `;
  if (option==4) {
    newCard = /*html*/`
    <div class="swiper-slide recent-product_swiper-slide"><a href="">
    <div class="a11y-hidden recent-product_product-id">${id}</div>
      <img src="./assets/${imageUrl}" alt="" />
    </a></div>
    `
  }
    
  return newCard;
  
}

function putCard(selector,card){
  document.querySelector(selector).insertAdjacentHTML("beforeend",card)
}

// selector == 카드를 넣을 (1촌) 부모요소의 선택자
function loadCardsToList(option,selector,productIndex){
  fetch(`${SERVER_URL}products`)
  .then(res => res.json())
  .then(data =>{
    productArr = data;

    let newCard = makeCard(option,productArr[productIndex]);
    putCard(selector, newCard);
  })
}
// 사용예시
// loadCardsToList(1,'.product-display_product-cards-container',4);
// loadCardsToList(2,'.product-display_product-cards-container',4);

/* -------------------------------------------------------------------------- */
/*                                 모듈화 필요 끝 부분                                */
/* -------------------------------------------------------------------------- */

for(let i = 0; i < 5; i++){
  loadCardsToList(2,'.best-list_inventory-product',i);
}
