import { putLocalStorage } from "../../lib/index.js";

let todayAd = document.querySelector('.todayAD-popup');
let todayAdBtnCloseEver = document.querySelector('.todayAD-popup_btn-close-for-today');
let todayAdBtnClose = document.querySelector('.todayAD-popup_btn-close');

todayAdBtnCloseEver.addEventListener('click',()=>{
  todayAd.classList.remove('todayAD-popup__Active');

  localStorage.removeItem('isAdPopupActive');
  localStorage.setItem('isAdPopupActive',false);

})

todayAdBtnClose.addEventListener('click',()=>{
  todayAd.classList.remove('todayAD-popup__Active');

})

async function initAd(){
  localStorage.setItem('isAdPopupActive',true);
  let isAdPopupActive =await JSON.parse(localStorage.getItem('isAdPopupActive'));
  if(isAdPopupActive){
    console.log(isAdPopupActive);
    todayAd.classList.add('todayAD-popup__Active');
  }
}
// localStorage.removeItem('isAdPopupActive');

window.addEventListener('load',async()=>{
  let isAdPopupActive =await JSON.parse(localStorage.getItem('isAdPopupActive'));
  // console.log(isAdPopupActive);
  if(isAdPopupActive == null){
    initAd();
  }else if(isAdPopupActive){
    todayAd.classList.add('todayAD-popup__Active');
  }else{
    todayAd.classList.remove('todayAD-popup__Active');
  }
});