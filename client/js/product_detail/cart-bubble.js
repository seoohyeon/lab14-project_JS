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

