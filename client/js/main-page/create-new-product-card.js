const SERVER_URL = 'http://localhost:3000/';

let productArr;

//option 1 이면 메인페이지, 2면 product-list
function makeCard(option,{image:imageUrl,name:productName,saleRatio,salePrice,price,description,shippingInfo,isKarlyOnly,isLimitedProduct}) {
  imageUrl = imageUrl.thumbnail;
  let newCard = /*html*/
  `
<li>
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
        <mark class="product-display_sell-price">${salePrice}원</mark>
      </div>
      <div class="product-display_undiscounted-price">${price}</div>
      <div class="product-display_product-detail">
        ${description}
      </div>          
      ${ 
        option == 1 ?``:
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
  `;

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
    console.log(productArr);


    let newCard = makeCard(option,productArr[productIndex]);
    putCard(selector, newCard);
  })
}
// 사용예시
loadCardsToList(1,'.product-display_product-cards-container',4);
// loadCardsToList(2,'.product-display_product-cards-container',4);



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
