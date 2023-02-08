import { getNode, putLocalStorage } from "../../lib/index.js";

let minus = getNode(".cart-popup_count-minus");
let plus = getNode(".cart-popup_count-plus");
let number = +getNode(".cart-popup_count-total").textContent;
let totalPrice = getNode(".cart-popup_price");
let totalNum = +totalPrice.textContent.replace(",","");
let orderNumber = getNode(".cart-popup_count-total");
let cartCancel = getNode(".cart-cancel");
let cartAdd = getNode(".cart-add");
let productCount = 1;
let getProductItem = 0;
let productCountSum = 0;
let savedProductItem = 0;
let flag = false;
let bestListInventoryProduct = document.querySelector(".best-list_inventory-product");

// 장바구니 모양 클릭
bestListInventoryProduct.onclick = (e) => {
  e.preventDefault();
  let curSlide = e.target.closest('li');
  putLocalStorage('id',curSlide.querySelector(".product-display_product-id").textContent);
  getNode(".cart-popup_count-total").textContent = 1;
  productCount = 1;

  if(e.target.classList.contains("product-display_cart-icon")){
    document.querySelector(".cart-popup_wrapper").style.display = "block";
    document.body.classList.add("no-scroll");
  }else {
    location.href = "http://localhost:5500/product_detail.html";
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
            getNode(".cart-popup_count-minus").style.backgroundPosition = "-8px -47px";
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

            if(number >1){
              getNode(".cart-popup_count-minus").style.backgroundPosition = "-8px -9px";
            }
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
cartCancel.addEventListener("click",()=>{
  document.querySelector(".cart-popup_wrapper").style.display = "none";
  document.body.classList.remove("no-scroll");

  number = 1;
})

// 장바구니 담기 버튼
cartAdd.addEventListener("click", async () => {

  document.querySelector(".cart-popup_wrapper").style.display = "none";
  document.body.classList.remove("no-scroll");

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