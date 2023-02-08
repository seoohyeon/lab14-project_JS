import { getNode } from '../../lib/index.js'

let signinButton = getNode(".signin-button");
let userId = getNode(".userId")
let userPw = getNode(".userPw")

if(localStorage.getItem('Unique ID')){
  getNode(".header_inner_login_logout").textContent = `로그아웃`;
}

signinButton.addEventListener("click", (e) => {
  e.preventDefault();

  fetch("http://localhost:3000/users", {
    method : "GET",
    headers: {
      'Content-Type': 'application/json',
    }
  }).then((res) => {
    return res.json();
  }).then((data)=>{
    data.forEach((item) => {
      if(item.curlyId === userId.value && item.curlyPw === userPw.value){
        // console.log(item.uniqueId)

          let arrayId = [];
          arrayId.push(item.uniqueId);
          localStorage.setItem("Unique ID", JSON.stringify(arrayId));
          alert("로그인 완료되었습니다.")
          location.href="../index.html";

      }
    })
    if(!localStorage.getItem('Unique ID')){
      alert("아이디, 비밀번호를 확인해주세요. ");
      document.querySelector(".header_inner_login_logout").textContent = `로그인`;
    }
  })
})

if(localStorage.getItem('Unique ID')){
  getNode(".header_inner_login_logout").addEventListener("click", () => {
    localStorage.removeItem("Unique ID");
    alert("로그아웃 되었습니다.")
  })
}