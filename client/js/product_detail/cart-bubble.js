// cart-bubble 창
import { getNode } from './../../lib/dom/getNode';
import { productCount } from './plusNminus';

let productTitle = getNode(".order-details_title")



getNode(".cart_bubble_title").textContent = productTitle.textContent;

getNode(".button_add_cart").addEventListener("click", () =>{
  getNode(".cart_bubble_wrapper").style.display = "block";
  setTimeout(() => {
    getNode(".cart_bubble_wrapper").style.display = "none";
  }, 3000);

  fetch("http://localhost:3000/basket",{
    method : "POST",
    headers: {
      'Content-Type': 'application/json'
      },
    body : JSON.stringify({
      name: "[풀무원] 탱탱쫄면 (4개입)",
      number : productCount,
    })
  }).then((res) =>{
    return res.json();
  })
})


function reviewListSaved(){
  fetch("http://localhost:3000/reviews",{
  method : 'GET',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
    }
})
.then(function (res){
  // console.log(res.json);
  return res.json()
}).then(function (data){
  getNode(".product-menu_nav-3").textContent = `후기 (${data.length})`
  data.forEach(obj =>{
    getNode(".put-in").insertAdjacentHTML("beforeend",
    `
    <div class="product-review_list-customer">
      <div class="product-review_list-customer_boxes">
        <span class="product-review_list-customer_box-best">베스트</span>
        <span class="product-review_list-customer_box-level">퍼플</span>
        <span class="product-review_list-customer_name">김*현</span>
      </div>
      <div>
        <p class="product-review_list-customer_product">${obj.title}</p>
        <pre class="product-review_list-customer_product-text">
        ${obj.content}</pre>
        <p class="product-review_list-customer_product review-date">${year}.${month}.${date}</p>
      </div>
    </div>
  `)
  //review가 있을경우 안보이게함.
  if(data.length){
    clearIfNothing.className = "product-review_list-ifnothing-clear";
  }
  })
})
}
reviewListSaved();
