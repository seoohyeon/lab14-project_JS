const SERVER_URL = 'http://localhost:3000/';

let productArr;

fetch(`${SERVER_URL}products`)
  .then(res => res.json())
  .then(data =>{
    productArr = data;
    console.log(productArr);
  })


// document.createElement('생성하고자 하는 태그명')
// let newdiv = document.createElement('div');
const body = document.querySelector('body');
// body.appendChild(newdiv);
// body.insertAdjacentHTML(position, text);
//text(인자)는 HTML 또는 XML로 해석될 수 있는 문자열이고(html code), (DOM) tree에 삽입할 수 있다.
// body.insertAdjacentElement('afterbegin',newdiv);



Object.assign(
  document.createElement('div'),
  { id : 'div-1' },
  { textContent: 'Hello' }
)

//option 1 이면 메인페이지, 2면 product-list
function makeCard(option,netxtPageLink,imageUrl,productName,saleRatio,salePrice,price,description,isKarlyOnly,isLimitedProduct) {
  let newCard = /*html*/
  `
<li>
  <a class="product-display_product-card" href="${netxtPageLink}">
    <figure>
      <img class="product-display_product-img" src="./assets/productcard/${imageUrl}.jpg" alt="${productName}" />
      <figcaption class="a11y-hidden">${productName}</figcaption>
    </figure>
    <div class="product-display_cart-icon-container">
      <img class="product-display_cart-icon" src="./assets/icons/web-icons/Cart.svg" alt="장바구니 아이콘" />
    </div>
    <div class="product-display_info-wrapper">
      <mark class="product-display_shipping-info">
        
      </mark>
      <mark class="product-display_product-name">
        ${productName} 
      </mark>
      <div class="product-display_price-wrapper">
        <mark class="product-display_discount-rate">${saleRatio}</mark>
        <mark class="product-display_sell-price">${salePrice}</mark>
      </div>
      <div class="product-display_undiscounted-price">${price}</div>
      <div class="product-display_product-detail">
        ${description}
      </div>
    </div>
  </a>
</li>
  `;
  if(option == 2){
    newCard = /*html*/
    `
      <a class="product-display_product-card" href="${netxtPageLink}">
        <figure>
          <img class="product-display_product-img" src="./assets/productcard/${imageUrl}.jpg" alt="${productName}" />
          <figcaption class="a11y-hidden">${productName}</figcaption>
        </figure>
        <div class="product-display_cart-icon-container">
          <img class="product-display_cart-icon" src="./assets/icons/web-icons/Cart.svg" alt="장바구니 아이콘" />
        </div>
        <div class="product-display_info-wrapper">
          <mark class="product-display_shipping-info">
            
          </mark>
          <mark class="product-display_product-name">
            ${productName} 
          </mark>
          <div class="product-display_price-wrapper">
            <mark class="product-display_discount-rate">${saleRatio}</mark>
            <mark class="product-display_sell-price">${salePrice}</mark>
          </div>
          <div class="product-display_undiscounted-price">${price}</div>
          <div class="product-display_product-detail">
            ${description}
          </div>
          <!--<div class="product-display_badge-wrapper">
            <mark class="product-display_karly-only"></mark>
            <mark class="product-display_limited-products"></mark>
          </div>-->
        </div>
      </a>
      `
  }else if(isKarlyOnly){
    newCard = '';
  }else if(isLimitedProduct){
    newCard = '';    
  }

  return newCard;
}

function putCard(selector,card){
  document.querySelector(selector).insertAdjacentHTML("beforeend",card)
}

putCard('.product-display_product-cards-container',makeCard(1,'./product_detail.html','01pumuone','쫄면입니다','50%','5000','10000','즉석밥이랍니다'));