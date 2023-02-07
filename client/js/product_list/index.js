import { getNode } from "../../lib/index.js";

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
let filterAccordionItem = document.querySelectorAll('.filter_accordion-item')
let filterAccordionInventory = document.querySelectorAll('.filter_accordion-inventory');
let filterTitleArrow = document.querySelectorAll('.filter_title-arrow');
let filterAccordionList = document.querySelectorAll('.filter_accordion-list');
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

filterAccordionItem.forEach(item => {
  item.addEventListener("keyup", (e) =>{
    if(TOGGLE === true && item === filterAccordionItem[0] && e.keyCode == 13){
      filterAccordionInventory[0].style.display = "block"
      TOGGLE = false;
    }else if(TOGGLE === false && item === filterAccordionItem[0] && e.keyCode == 13) {
      filterAccordionInventory[0].style.display = "none"
      TOGGLE = true;
    }else if(TOGGLE === true && item === filterAccordionItem[1] && e.keyCode == 13){
      filterAccordionInventory[1].style.display = "block"
      TOGGLE = false;
    }else if(TOGGLE === false && item === filterAccordionItem[1] && e.keyCode == 13) {
      filterAccordionInventory[1].style.display = "none"
      TOGGLE = true;
    }
  })
})