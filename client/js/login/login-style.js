import { getNode } from '../../lib/index.js';

let signinButton = getNode(".signin-button");
let userId = getNode(".userId");
let userPw = getNode(".userPw");
let loginNout = getNode(".header_inner_login_logout");


// localStorage에서 uniqueID 확인 
if(localStorage.getItem('Unique ID')){
  loginNout.textContent = `로그아웃`;
}
console.log(localStorage.getItem('Unique ID'))

// 로그인 버튼 클릭시 이벤트 발생
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
      // JSON파일 user와 정보가 같은 경우 실행
      if(item.curlyId === userId.value && item.curlyPw === userPw.value){

          // 배열 생성 후 push한뒤 localStorage에 형변환하여 저장함.
          let arrayId = [];
          arrayId.push(item.uniqueId);
          localStorage.setItem("Unique ID", JSON.stringify(arrayId));
          alert("로그인 완료되었습니다.")
          location.href="../index.html";

      }
    })
    // localStorage에 uniqueID가 없는경우 실행
    if(!localStorage.getItem('Unique ID')){
      alert("아이디, 비밀번호를 확인해주세요. ");
      loginNout.textContent = `로그인`;
    }
  })
})
// localStorage에 uniqueID가 있는경우 실행
if(localStorage.getItem('Unique ID')){
  loginNout.addEventListener("click", () => {
    localStorage.removeItem("Unique ID");
    alert("로그아웃 되었습니다.");
  })
}