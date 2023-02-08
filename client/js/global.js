import { getNode } from '../../lib/index.js'


let logoutButton = getNode(".header_inner_login_logout");

if(localStorage.getItem('Unique ID')){
  logoutButton.textContent = `로그아웃`;
} else{
  logoutButton.textContent = `로그인`;
}


if(localStorage.getItem('Unique ID')){
  logoutButton.addEventListener("click", () => {
    localStorage.removeItem("Unique ID");
    alert("로그아웃 되었습니다.")
    console.log('로그아웃')
  })
}

window.addEventListener("scroll", () =>{
  let headerMenu = getNode(".header_menu").offsetHeight;

 
  window.onscroll = function () {
   let windowTop = window.scrollY;
 
   if (windowTop >= headerMenu+72) {
     getNode(".header_menu").classList.add("drop");
     getNode(".header_menu_delivery").style.display = "none";
     getNode(".header_menu_search").style.display = "block";
     getNode(".header_menu_search").style.display = "block";
     getNode(".header_menu_input").style.display = "block";
     getNode(".sticky-ul").style.visibility = "visible";
   } else {
     getNode(".header_menu").classList.remove("drop");
     getNode(".header_menu_delivery").style.disaplay = "block";
     getNode(".header_menu_search").style.display = "none";
     getNode(".header_menu_search").style.display = "none";
     getNode(".header_menu_input").style.display = "none";
     getNode(".sticky-ul").style.visibility = "hidden";
   }
  }
})