const SERVER_URL = 'http://localhost:3000/';

/* -------------------------------------------------------------------------- */
/*                                  모듈화 필요 시작부분                        */
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
/*                                 모듈화 필요 끝 부분                          */
/* -------------------------------------------------------------------------- */

for(let i = 0; i < 3; i++){
  for(let j = 0; j < 5; j++){
    loadCardsToList(2,'.best-list_inventory-product',j);
  }
}