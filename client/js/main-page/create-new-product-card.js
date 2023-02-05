

// document.createElement('생성하고자 하는 태그명')
let newdiv = document.createElement('div');
const body = document.querySelector('body');
// body.appendChild(newdiv);
// body.insertAdjacentHTML(position, text);
//text(인자)는 HTML 또는 XML로 해석될 수 있는 문자열이고(html code), (DOM) tree에 삽입할 수 있다.
body.insertAdjacentElement('afterbegin',newdiv);

Object.assign(
  document.createElement('div'),
  { id : 'div-1' },
  { textContent: 'Hello' }
)

let mainPageCard = /*html*/
`<a class="product-display_product-card" href="./product_detail.html">
<figure>
  <img class="product-display_product-img" src="./assets/productcard/01pumuone.jpg" alt="탱탱쫄면 (4개입)" />
  <figcaption class="a11y-hidden">탱탱쫄면 4개입</figcaption>
  <div class="product-display_cart-icon-container">
    <img class="product-display_cart-icon" src="./assets/icons/web-icons/Cart.svg" alt="장바구니 아이콘" />
  </div>
</figure>
<div class="product-display_info-wrapper">
  <mark class="product-display_shipping-info">샛별배송</mark>
  <mark class="product-display_product-name">[풀무원] 탱탱쫄면 (4개입)</mark>

  <div class="product-display_price-wrapper">
    <mark class="product-display_discount-rate">50%</mark>
    <mark class="product-display_sell-price">5,000원</mark>
  </div>

  <div class="product-display_undiscounted-price">10,000원</div>
  <div class="product-display_product-detail">CJ즉석밥 고소한 맛의 발아 현미밥</div>

  <div class="product-display_badge-wrapper">
    <mark class="product-display_karly-only"></mark>
    <mark class="product-display_limited-products"></mark>
  </div>
</div>
</a>
`

// let productListCard = /*html*/
// `
// <figure class="card">
//   <a href="#">
//     <img src="./assets/productcard/01pulmuone.jpg" alt="">
//     <figcaption class="content">
//       <span class="delivery">샛별배송</span>
//       <span class="product-name">[풀무원] 탱탱쫄면 (4개입)</span>
//       <span class="product-price">4,980 원</span>
//       <p class="description">튀기지 않아 부담없는 매콤함</p>
//       <div class="tag">
//         <span class="only">Karly Only</span>
//         <span class="limited">한정수량</span>
//       </div>
//     </figcaption>
//   </a>
//   <div class="list-cart">
//     <img src="./assets/icons/web-icons/Cart.svg" alt="" />
//   </div>
// </figure>
// `
