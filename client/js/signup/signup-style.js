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

