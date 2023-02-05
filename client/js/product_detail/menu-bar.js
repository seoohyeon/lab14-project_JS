// 메뉴바
let productMenu = document.querySelectorAll(".product-menu_nav");

 productMenu.forEach(item => {
  item.addEventListener("click", () =>{
    for(let i=0; i<4; i++){
      productMenu[i].className = "product-menu_nav";
    }
    item.className = "product-menu_nav-active";
  })
 })