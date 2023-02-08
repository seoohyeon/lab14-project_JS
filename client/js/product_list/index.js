import { getNode } from "../../lib/index.js";

let filterAccordionItem = document.querySelectorAll('.filter_accordion-item')
let filterAccordionInventory = document.querySelectorAll('.filter_accordion-inventory');
let filterTitleArrow = document.querySelectorAll('.filter_title-arrow');
let TOGGLE = true;

filterAccordionItem.forEach(item => {
  item.addEventListener("click", () =>{
    if(TOGGLE === true && item === filterAccordionItem[0]){
      filterAccordionInventory[0].style.display = "none"
      filterTitleArrow[0].style.backgroundPosition = "-8px -34px"
      TOGGLE = false;
    }else if(TOGGLE === false && item === filterAccordionItem[0]) {
      filterAccordionInventory[0].style.display = "block"
      filterTitleArrow[0].style.backgroundPosition = "-8px -8px"
      TOGGLE = true;
    }else if(TOGGLE === true && item === filterAccordionItem[1]){
      filterAccordionInventory[1].style.display = "none"
      filterTitleArrow[1].style.backgroundPosition = "-8px -34px"
      TOGGLE = false;
    }else if(TOGGLE === false && item === filterAccordionItem[1]) {
      filterAccordionInventory[1].style.display = "block"
      filterTitleArrow[1].style.backgroundPosition = "-8px -8px"
      TOGGLE = true;
    }
  })
})

let bestListArray = document.querySelectorAll('.best-list_top-array li')
bestListArray.forEach(item => {
  item.addEventListener('click',()=>{
    if(item === bestListArray[0]){
      bestListArray[0].style.color = "var(--content)"
      bestListArray[1].style.color = "var(--gray-300)"
      bestListArray[2].style.color = "var(--gray-300)"
      bestListArray[3].style.color = "var(--gray-300)"
      bestListArray[4].style.color = "var(--gray-300)"
      bestListArray[5].style.color = "var(--gray-300)"
    }else if(item === bestListArray[1]){
      bestListArray[0].style.color = "var(--gray-300)"
      bestListArray[1].style.color = "var(--content)"
      bestListArray[2].style.color = "var(--gray-300)"
      bestListArray[3].style.color = "var(--gray-300)"
      bestListArray[4].style.color = "var(--gray-300)"
      bestListArray[5].style.color = "var(--gray-300)"
    }else if(item === bestListArray[2]){
      bestListArray[0].style.color = "var(--gray-300)"
      bestListArray[1].style.color = "var(--gray-300)"
      bestListArray[2].style.color = "var(--content)"
      bestListArray[3].style.color = "var(--gray-300)"
      bestListArray[4].style.color = "var(--gray-300)"
      bestListArray[5].style.color = "var(--gray-300)"
    }else if(item === bestListArray[3]){
      bestListArray[0].style.color = "var(--gray-300)"
      bestListArray[1].style.color = "var(--gray-300)"
      bestListArray[2].style.color = "var(--gray-300)"
      bestListArray[3].style.color = "var(--content)"
      bestListArray[4].style.color = "var(--gray-300)"
      bestListArray[5].style.color = "var(--gray-300)"
    }else if(item === bestListArray[4]){
      bestListArray[0].style.color = "var(--gray-300)"
      bestListArray[1].style.color = "var(--gray-300)"
      bestListArray[2].style.color = "var(--gray-300)"
      bestListArray[3].style.color = "var(--gray-300)"
      bestListArray[4].style.color = "var(--content)"
      bestListArray[5].style.color = "var(--gray-300)"
    }else if(item === bestListArray[5]){
      bestListArray[0].style.color = "var(--gray-300)"
      bestListArray[1].style.color = "var(--gray-300)"
      bestListArray[2].style.color = "var(--gray-300)"
      bestListArray[3].style.color = "var(--gray-300)"
      bestListArray[4].style.color = "var(--gray-300)"
      bestListArray[5].style.color = "var(--content)"
    }
  })
})

let bestListInventoryProduct = document.querySelector('.best-list_inventory-product');

bestListInventoryProduct.addEventListener('click',(e)=>{
  e.preventDefault();
  let curSlide = e.target.closest('li');


  
  if(e.target.classList.contains('product-display_cart-icon')){
    
    console.log("장바구니 팝업 띄워야함");
    document.querySelector('.cart-popup_wrapper').style.display = "block";
    document.body.classList.add('no-scroll');
    // e.target.classList.add('cart-popup__active')
  }else{
    
    // console.log(typeof curSlide);
    // console.log(curSlide);
    // console.log('product-detail 페이지로 이동해야함');
    location.href = 'http://localhost:5500/product_detail.html';
  }
})




let cartCancel = getNode('.cart-cancel');
let cartAdd = getNode('.cart-add');

cartCancel.addEventListener('click',()=>{
  document.querySelector('.cart-popup_wrapper').style.display = "none";
  document.body.classList.remove('no-scroll');
})

let minus = getNode(".cart-popup_count-minus");
let plus = getNode(".cart-popup_count-plus");
let number = +getNode(".cart-popup_count-total").textContent;
let totalPrice = getNode(".cart-popup_price");
let totalNum = +totalPrice.textContent.replace(",","");
let orderNumber = getNode(".cart-popup_count-total");
let productCount = 1;


cartAdd.addEventListener('click',(e) => {

  e.preventDefault();

  document.querySelector('.cart-popup_wrapper').style.display = "none";
  document.body.classList.remove('no-scroll');

  fetch("http://localhost:3000/products").then((res) => {
    return res.json();
  }).then((data) => {
    console.log(data)
    let output = localStorage.getItem("id");
    let arr = JSON.parse(output);

    for(let i=0; i<data.length; i++){
      let price = String(data[i].price);

      if(arr[arr.length-1] === data[i].id){
        getNode(".cart-popup_product").textContent = `${price.slice(0,-3)},${price.slice(-3)}원`
        totalPrice.textContent = `${price.slice(0,-3)},${price.slice(-3)}원`


        function haveMinus() {
          if(number > 1){
            minus.style.cursor = "pointer"
            number -= 1;
            totalNum = String(data[i].price*number);
            totalNum = `${totalNum.slice(0,-3)},${totalNum.slice(-3)}`
            orderNumber.textContent = number;
            totalPrice.textContent = totalNum;
            productCount -= 1;
          }
          if(number === 1){
            getNode(".order-details_minus_path").style.fill = "var(--gray-300)";
            orderNumber.textContent = 1;
            minus.style.cursor = "default"
          }
        }
        
        function havePlus() {
            number += 1;
            totalNum = String(data[i].price*number);
            totalNum = `${totalNum.slice(0,-3)},${totalNum.slice(-3)}`
            orderNumber.textContent = number;
            totalPrice.textContent = totalNum;
            productCount +=1;
          
            if(number >1){
              getNode(".order-details_minus_path").style.fill = "var(--content)";
            }
        }
        
        
        // 상품 갯수 선택에 따른 총 가격
        minus.addEventListener("click", () => {
          console.log('마이너스')
        })
        
        minus.addEventListener("keyup", (e) => {
          if(e.keyCode == 13){
            haveMinus();
          }
        })
        
        plus.addEventListener("click", havePlus);
        
        plus.addEventListener("keyup", (e) => {
          if(e.keyCode == 13 ){
            havePlus();
          }
        })
      }
    }
  })
})

// let minusButton = getNode('.cart-popup_count-minus');
// let plusButton = getNode('.cart-popup_count-plus');
// let countTotal = getNode('.cart-popup_content-total');
// let total = +getNode('.cart-popup_count-total').textContent;
// let popupSumPrice = getNode('.cart-popup_price');
// let sumPrice = +popupSumPrice.textContent.replace(",","");

// function countMinus() {
//   if(total > 1){
//     total -= 1;
//     sumPrice = String(4980*total);
//     sumPrice = `${sumPrice.slice(0,-3)},${sumPrice.slice(-3)}`;
//     countTotal.textContent = total;
//     popupSumPrice.textContent = sumPrice;
//   }
//   if(total === 1){
//     minusButton.style.backgroundPosition = "-8px -47px";
//     countTotal.textContent = 1;
//   }
// }
// function countPlus() {
//   total += 1;
//   sumPrice = String(4980*total);
//   sumPrice = `${sumPrice.slice(0,-3)},${sumPrice.slice(-3)}`;
//   countTotal.textContent = total;
//   popupSumPrice.textContent = sumPrice;

//   if(total > 1){
//     minusButton.style.backgroundPosition = "-8px -8px";
//   }
// }

// minusButton.addEventListener('click',countMinus);
// plusButton.addEventListener('click',countPlus);