import { getNode } from '../../lib/index.js'
// import { keepYOfRecentProduct } from './main-page/recent-product.js';
// import { keepYOfRecentProduct } from './main-page/recent-product.js';


let logoutButton = getNode(".header_inner_login_logout");

if(localStorage.getItem('Unique ID')){
  logoutButton.textContent = `로그아웃`;
} else{
  logoutButton.textContent = `로그인`;
}

console.log('is global');

export function addLogoutFunc() {
  if(localStorage.getItem('Unique ID')){
    logoutButton.addEventListener("click", () => {
      localStorage.removeItem("Unique ID");
      alert("로그아웃 되었습니다.")
      console.log('로그아웃')
    })
  }
}

addLogoutFunc();


window.addEventListener("scroll", () =>{
  // let headerMenu = getNode(".header_menu").offsetHeight;


  // window.addEventListener('scroll',()=>{
  //   let windowTop = window.scrollY;
  
  //  if (windowTop >= headerMenu+72) {
  //    getNode(".header_menu").classList.add("drop");
  //    getNode(".header_menu_delivery").style.display = "none";
  //    getNode(".header_menu_search").style.display = "block";
  //    getNode(".header_menu_search").style.display = "block";
  //    getNode(".header_menu_input").style.display = "block";
  //    getNode(".sticky-ul").style.visibility = "visible";
  //  } else {
  //    getNode(".header_menu").classList.remove("drop");
  //    getNode(".header_menu_delivery").style.disaplay = "block";
  //    getNode(".header_menu_search").style.display = "none";
  //    getNode(".header_menu_search").style.display = "none";
  //    getNode(".header_menu_input").style.display = "none";
  //    getNode(".sticky-ul").style.visibility = "hidden";
  //  }
  // }) 

  try {
    let windowTop_global = window.scrollY;
    console.log(windowTop_global);
    if(windowTop_global>700){// have to stop 
      // console.log(560);
      
      $gotoTopBtn.classList.add('top-button__active');
    }else{
      $gotoTopBtn.classList.remove('top-button__active');
    }
  } catch (error) {
    
  }
})

try {
  let $gotoTopBtn = getNode(".top-button");

$gotoTopBtn.addEventListener("click", () => {
  window.scrollTo(0,0);
})

} catch (error) {
  
}
