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
console.log(bestListArray);
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

let cartIcon = getNode('.product-display_cart-icon');


cartIcon.addEventListener('click',(e)=>{
  console.log(e.Target)
  document.querySelector('.cart-popup_wrapper').style.display="blobk";
  document.body.classList.add("no-scroll");
})

let cartCancel = getNode('.cart-cancel');
let cartAdd = getNode('.cart-add');

cartCancel.addEventListener('click',()=>{
  document.querySelector('.cart-popup_wrapper').style.display = "none";
  document.body.classList.remove('no-scroll');
})