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