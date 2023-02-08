import { productDisplaySwiper1, productDisplaySwiper2, recentProductSwiper } from "./swiper-style.js";
import { hrefLink, putLocalStorage } from "../../lib/index.js";

const SERVER_URL = 'http://localhost:3000/';

let productArr;

//option 1 이면 메인페이지, 2이면 product-list, 
// 3이면 슬라이드 추가, 4면 recent-product의 슬라이드 추가
function makeCard(option,{id,image:imageUrl,name:productName,saleRatio,salePrice,price,description,shippingInfo,isKarlyOnly,isLimitedProduct}) {
  imageUrl = imageUrl.thumbnail;
  if(saleRatio == 0 ){
    salePrice = price;
  }
  let salePriceStr = String(salePrice);

  salePriceStr = `${salePriceStr.slice(0,-3)}${salePriceStr.slice(0,-3).length>0?
    `,`:``}${salePriceStr.slice(-3)}원`;
  console.log(salePriceStr);
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

// 1번옵션 == product-display에 카드 뿌리기
// 2번옵션 == recent-product에 카드 뿌리기
// selector == 카드를 넣을 (1촌) 부모요소의 선택자
// swiper == 선택하고자 하는 swiper 객체
export function loadAllCardsToSwiper(option,selector,swiper){
  fetch(`${SERVER_URL}products`)
  .then(res => res.json())
  .then(data =>{
    productArr = data;
    let newCard,wrapperSelector;
    if(option == 1){
      for(let i=0;i<productArr.length;i++){
        if(i%4==0 && i!=0){
          newCard = makeCard(3,productArr[i]);
          // wrapperSelector = selector.split(' ')[0]+" .swiper-wrapper";
          // console.log(newCard);
          // console.log(wrapperSelector);
          // putCard(wrapperSelector, newCard);
          // swiper.removeAllSlides();
          swiper.appendSlide(newCard);
          swiper.update();
        }else{
          newCard = makeCard(1,productArr[i]);
          putCard(selector, newCard);
        }
  
      }
    }else if(option ==2){
      // 전부 뿌리는 것이기때문에 아예 한번 비우고 시작
      // console.log('recent-swiper',swiper);
      
      swiper.removeAllSlides();
      let lsArr = JSON.parse(localStorage.getItem('id'));
      // console.log(lsArr);
      let productObjArr =[]; 
      let $recentProduct = document.querySelector('.recent-product');
      $recentProduct.classList.add('recent-product__active');

      if(lsArr){
        for(let i=0;i<lsArr.length;i++){

          
          productArr.forEach(element => {
            if(element['id'] == lsArr[i]){
              productObjArr.push(element);
              // console.log(productObjArr);
            }
          });
                   
        }

        productObjArr.forEach(e =>{
          newCard = makeCard(4,e);
          swiper.appendSlide(newCard);
          swiper.update();
        })
      }else{
        $recentProduct.classList.remove('recent-product__active');
      }
    }
  })
}

await loadAllCardsToSwiper(1,'.product-display_swiper1 .product-display_product-cards-container',productDisplaySwiper1);
await loadAllCardsToSwiper(1,'.product-display_swiper2 .product-display_product-cards-container',productDisplaySwiper2);
await loadAllCardsToSwiper(2,'.recent-product_swiper-wrapper',recentProductSwiper);

























// document.createElement('생성하고자 하는 태그명')
// let newdiv = document.createElement('div');
// const body = document.querySelector('body');
// body.appendChild(newdiv);
// body.insertAdjacentHTML(position, text);
//text(인자)는 HTML 또는 XML로 해석될 수 있는 문자열이고(html code), (DOM) tree에 삽입할 수 있다.
// body.insertAdjacentElement('afterbegin',newdiv);
// Object.assign(
//   document.createElement('div'),
//   { id : 'div-1' },
//   { textContent: 'Hello' }
// )

// let newdiv = document.createElement('div'),
//   { class : 'swiper recent-product_swiper' }

// let tempDiv = document.createElement('div'),
//   { class : 'swiper-wrapper recent-product_swiper-wrapper' }

// tempDiv.addEventListener()

// newdiv.insertAdjacentElement('beforeend',tempDiv);

