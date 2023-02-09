let filterAccordionItem = document.querySelectorAll(".filter_accordion-item")
let filterAccordionInventory = document.querySelectorAll(".filter_accordion-inventory");
let filterTitleArrow = document.querySelectorAll(".filter_title-arrow");
let TOGGLE = true;

filterAccordionItem.forEach(item => {
  item.addEventListener("click", () =>{
    if(TOGGLE === true && item === filterAccordionItem[0]){
      filterAccordionInventory[0].style.display = "none";
      filterTitleArrow[0].style.backgroundPosition = "-8px -34px";
      TOGGLE = false;
    }else if(TOGGLE === false && item === filterAccordionItem[0]) {
      filterAccordionInventory[0].style.display = "block";
      filterTitleArrow[0].style.backgroundPosition = "-8px -8px";
      TOGGLE = true;
    }else if(TOGGLE === true && item === filterAccordionItem[1]){
      filterAccordionInventory[1].style.display = "none";
      filterTitleArrow[1].style.backgroundPosition = "-8px -34px";
      TOGGLE = false;
    }else if(TOGGLE === false && item === filterAccordionItem[1]) {
      filterAccordionInventory[1].style.display = "block";
      filterTitleArrow[1].style.backgroundPosition = "-8px -8px";
      TOGGLE = true;
    }
  })
})