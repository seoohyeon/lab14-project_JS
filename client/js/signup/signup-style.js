//import lib
import { getInputValue, getNode } from '../../lib/index.js'


//중복된 아이디 기능 말고,,, 그냥 alert를 이용해 중복확인 버튼을 눌렀을 때, 이벤트가 발생하게끔 한 것
let idsubmitCheck = getNode('#curlyidsubmit')
let curlyId = getNode("#curlyidField");
let curlyPw = getNode("#curlypwField");
let userName = getNode("#curlynameField");
let userPhone = getNode("#curlynumberField");
let userAdrPost = getNode("#curlyaddrField_post");
let userAdrAddr = getNode("#curlyaddrField_addr");
let userAdrDetail = getNode("#curlyaddrField_detail");
let emailsubmitCheck = getNode('#curlyemailsubmit');
let curlypwChecked = getNode("#curlyPwcheckField");
let registerButton = getNode(".registration-button");


function clickIdHandler(e) {
  let curlyid = getInputValue('#curlyidField')
  e.preventDefault();

  if (!curlyid) {
    alert('아이디를 입력해주세요')

    return
  }

  if (curlyid.length<6) {
    alert('6글자 이상 입력해주세요')
  }else{
    alert('중복된 아이디가 없습니다.')

    returne
  }
}

idsubmitCheck.addEventListener('click',clickIdHandler)


  //#2. 정규 표현식 이벤트(이메일 체크)

  const regex = new RegExp('[a-z0-9]+@[a-z]+.[a-z]{2,3}');

  function clickEmailHandler(e) {
    e.preventDefault();
    let curlyemail = getInputValue('#curlyemailField')
    const regexget = document.getElementById('curlyemailField').value.match(regex)
    console.log();
  
    if (!curlyemail) {
      alert('이메일을 입력해주세요')
  
      return
    } else
  
    if (!regexget) {
  
      alert('올바른 이메일 방식을 입력해주세요.')
  
    }else{
      alert('중복된 이메일이 없습니다.')
  
      return
    }
  }
  
  emailsubmitCheck.addEventListener('click',clickEmailHandler)


//Checkbox 전체선택 / 전체선택 해제 함수
let checkAll = document.getElementById('chk-all');
  let checkList = document.querySelectorAll('.check');
  let check1 = document.getElementById('chk01');
  let check2 = document.getElementById('chk02');
  let check3 = document.getElementById('chk03');
  let check4 = document.getElementById('chk04');
  document.addEventListener('DOMContentLoaded', function () {
    checkAll.addEventListener('change', function () {
      check1.checked = checkAll.checked;
      check2.checked = checkAll.checked;
      check3.checked = checkAll.checked;
      check4.checked = checkAll.checked;
    });
    
    checkList.forEach(function (check) {
      check.addEventListener('change', function () {
        if (check1.checked && check2.checked && check3.checked && check4.checked) {
          checkAll.checked = true;
        } else {
          checkAll.checked = false;
        }
      });
    });
  });


  
// 주소 검색 API 사용
function findAddr(){
  new daum.Postcode({
        oncomplete: function(data) {
          
          userAdrPost.style.display = "block"
          userAdrAddr.style.display = "block"
          userAdrDetail.style.display = "block"
          
            // 팝업에서 검색결과 항목을 클릭했을때 실행할 코드를 작성하는 부분.
            // 도로명 주소의 노출 규칙에 따라 주소를 표시한다.
            // 내려오는 변수가 값이 없는 경우엔 공백('')값을 가지므로, 이를 참고하여 분기 한다.
            let roadAddr = data.roadAddress; // 도로명 주소 변수
            let jibunAddr = data.jibunAddress; // 지번 주소 변수
            // 우편번호와 주소 정보를 해당 필드에 넣는다.
            userAdrPost.value = data.zonecode;
            if(roadAddr !== ''){
                userAdrAddr.value = roadAddr;
            }else if(jibunAddr !== ''){
                userAdrAddr.value = jibunAddr;
            }
            getNode(".address-container-button").style.display = "none"
            getNode(".address-container-text").style.display = "none"
        }
    }).open();
}

getNode(".address-container-button").addEventListener("click", findAddr)


// uniqueId를 위한 랜덤한 숫자 만들기
const generateRandomString = (num) => {
  const characters ='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
  let result = '';
  const charactersLength = characters.length;
  for (let i = 0; i < num; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }

  return result;
}
// registerButton.addEventListener("submit", (e) => {
//   e.preventDefault();})

registerButton.addEventListener("click", (e) => {
  e.preventDefault();
  let inputCheck = curlyId.value && curlyPw.value && userName.value 
  && userPhone.value && userAdrPost.value && userAdrAddr.value;

  if(!inputCheck){
    alert("필수사항을 모두 입력해주세요.")
  } else {
    fetch('http://localhost:3000/users', {
    method : "POST",
    body : JSON.stringify({
      uniqueId : generateRandomString(10),
      curlyId : curlyId.value,
      curlyPw : curlyPw.value,
      userName : userName.value,
      userPhone : userPhone.value,
      userAddress : `${userAdrPost.value} ${userAdrAddr.value} ${userAdrDetail.value}`
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  }).then(function (response){
    return response.json();
  }).then(function (data){
    console.log(data)
  })
  alert("회원가입이 완료되었습니다.");
  //페이지 이동
  location.href="../login.html";
  }
})