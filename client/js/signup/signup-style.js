//import lib
import { getInputValue, getNode } from '../../lib/index.js'


//중복된 아이디 기능 말고,,, 그냥 alert를 이용해 중복확인 버튼을 눌렀을 때, 이벤트가 발생하게끔 한 것
let idsubmitCheck = getNode('#curlyidsubmit')


function clickIdHandler(e) {
  e.preventDefault();
  let curlyid = getInputValue('#curlyidField')

  if (!curlyid) {
    alert('아이디를 입력해주세요')

    return
  }

  if (curlyid.length<6) {
    alert('6글자 이상 입력해주세요')
  }else{
    alert('중복된 아이디가 없습니다.')

    return
  }
}

idsubmitCheck.addEventListener('click',clickIdHandler)


//중복된 이메일 기능 말고,,, 그냥 alert를 이용해 중복확인 버튼을 눌렀을 때, 이벤트가 발생하게끔 한 것.
let emailsubmitCheck = getNode('#curlyemailsubmit')

function clickEmailHandler(e) {
  e.preventDefault();
  let curlyemail = getInputValue('#curlyemailField')

  if (!curlyemail) {
    alert('이메일을 입력해주세요')

    return
  } else

  if (curlyemail.length<6) {
    alert('정규표현식 홣용해서 올바른 이메일 방식이 아닙니다.')
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

