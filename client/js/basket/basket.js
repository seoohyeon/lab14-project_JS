import { getNode, getNodes } from '../../lib/index.js'
import { addLogoutFunc } from '../global.js';

let kakaoMap = getNode(".kakaomap_button");
let basketAddress=getNode(".basket_address");
let refrigeratedFood = getNode(".refrigerated-contents");
let normalFood = getNode(".normal-contents");
let frozenFood =getNode(".frozen-contents");
let noOption=getNode(".no-option");
let selectedNumber=getNodes(".selected-number");
let totalNumber=getNodes(".total-number");
let loginNout = getNode(".header_inner_login_logout");

let refToggleButton = refrigeratedFood.previousSibling.previousSibling;
let normalToggleButton = normalFood.previousSibling.previousSibling;
let frozenToggleButton = frozenFood.previousSibling.previousSibling;

let selectList=getNode(".select-list");

let priceInfo = getNode(".price-info");
let discountInfo = getNode(".discount-info");
let deliveryInfo = getNode(".delivery-info");
let resultInfo= getNode(".result-info");
let deliveryExplain=getNode(".delivery-explain");
let needAddMoney=getNode(".need-add");
let resultPriceInfo=0;
let resultDiscountInfo=0;
let resulteDeliveryInfo=0;
let resultTotalPriceInfo=0;
let needAddPrice=0;


var everyData=new Array();


let listSelectedNumber =getNodes('.selected-number');
let listTotalNumber = getNodes('.total-number');


loginNout.addEventListener("click", () =>{
  console.log('클릭')
})


let urlList = [
  "http://localhost:3000/products",
  "http://localhost:3000/reviews",
  "http://localhost:3000/basket",
  "http://localhost:3000/users"
];

Promise.all(
  urlList.map(
      url => fetch(url).then(response => {
          return response.json();
      })
  )
)
.then(jsonBaseList => {
  var resBasket=jsonBaseList[2];
  var resProducts=jsonBaseList[0];
  let resUsers=jsonBaseList[3];

  //데이터 밖에서 사용
  everyData.push(jsonBaseList);

 
  let storedData=checkBasketList(resBasket,resProducts);  // 데이터 받아서 상품 분류 및 추가
  if(resBasket.length>=1){
    noOption.className +=' a11y-hidden'
  }

  if(window.localStorage.getItem('Unique ID')){
    for(let key in resUsers){
      let userData = resUsers.filter(function(e){
        return e.uniqueId == JSON.parse(localStorage.getItem('Unique ID'))[0];
      })
      basketAddress.innerHTML=`${userData[0].userAddress}`
    }
  }

  buttonInit(storedData);
 
  
var basketSelectAll=document.querySelectorAll('input[name="basket-select-all"]');
var basketSelectedList=document.querySelectorAll('input[name="basket-checker"]');
var basketCheckedList=document.querySelectorAll('input[name="basket-checker"]:checked');



 
  getNode('.selected-number').innerHTML=`${basketCheckedList.length}`;
  getNode('.total-number').innerHTML=`${basketSelectedList.length}`;

  //전체선택(/) 초기셋팅--------------------------------------
  listSelectedNumber.forEach(element=>{
    element.innerHTML=`${basketCheckedList.length}`;
  })

  listTotalNumber.forEach(element=>{
    element.innerHTML=`${basketSelectedList.length}`;
  })
  //-------------------------------------------------------------  
  basketCheckBox(basketSelectAll,basketSelectedList,basketCheckedList);
  buttonStyleChange(basketCheckedList);
  onoffSlectAll(basketSelectAll,basketSelectedList,basketCheckedList);



  let counterDeleteButton= getNodes('.counter-delete_button');
  let selectDeleteButton = getNodes('.select-delete_button');
 counterDeleteFunction(counterDeleteButton,listSelectedNumber,basketSelectAll,basketSelectedList,basketCheckedList,selectList);
 selectDeleteFunction(selectDeleteButton,listSelectedNumber,basketSelectAll,basketSelectedList,basketCheckedList);
})




//  카카오 api 호출 , 주소 변경
kakaoMap.addEventListener("click",kakaoMapLoad)

function kakaoMapLoad(){
  new daum.Postcode({
    oncomplete: function(data) {
        // 팝업에서 검색결과 항목을 클릭했을때 실행할 코드를 작성하는 부분입니다.
        // 예제를 참고하여 다양한 활용법을 확인해 보세요.
        let addr=data.address;
        basketAddress.innerHTML=addr;
        kakaoMap.innerHTML="<b>배송지 변경</b>";
        
    }
}).open();

}




//basket obj에 저장되어있는 id를 이용하여 product에 저장되어있는 상세정보를 리턴해주는 함수.
function checkBasketList(storedDataBasket,storedDataProducts){

  let pullData;
  let allPullData=new Array;
  for(let key in storedDataBasket){
    
    pullData=storedDataProducts.filter(function(e){
      return e.id === storedDataBasket[key].id
    })
    sortAndAdd(pullData[0].sort,pullData[0].name,pullData[0].price,pullData[0].image.thumbnail,pullData[0].id,storedDataBasket[key].number,pullData[0].saleRatio);
    allPullData.push(pullData[0]);
  }

  // 가격 출력 함수
  priceInfo.innerHTML=`${resultPriceInfo.toLocaleString()}`
  discountInfo.innerHTML=`${resultDiscountInfo.toLocaleString()}`
  if((resultPriceInfo-resultDiscountInfo)<40000 && (resultPriceInfo-resultDiscountInfo)>0){
    resulteDeliveryInfo=3000;
    deliveryInfo.innerHTML=`+ ${resulteDeliveryInfo.toLocaleString()}`;
  }
  resultTotalPriceInfo=resultPriceInfo-resultDiscountInfo+resulteDeliveryInfo;
  resultInfo.innerHTML=`${resultTotalPriceInfo.toLocaleString()}`

  if(resultTotalPriceInfo<40000){
    needAddPrice=40000-resultPriceInfo-resultDiscountInfo;
    needAddMoney.innerHTML=`${needAddPrice.toLocaleString()}`;
    deliveryExplain.classList.remove('a11y-hidden');
  }  
  return allPullData;
}

function sortAndAdd(foodKind,foodName,foodPrice,foodThumbnail,foodId,foodNumber,saleRatio,num){

switch (foodKind){
  case "normal" : addToNormal(foodName,foodPrice,foodThumbnail,foodId,foodNumber,saleRatio);
    break;

  case "frozen" : addToFrozen(foodName,foodPrice,foodThumbnail,foodId,foodNumber,saleRatio);
    break; 

   case "refrigeration": addToRefrigeration(foodName,foodPrice,foodThumbnail,foodId,foodNumber,saleRatio);
    break;
}
}

function addToNormal(foodName,foodPrice,foodThumbnail,foodId,foodNumber,saleRatio){
  let mulPrice=foodPrice*foodNumber;

  normalFood.insertAdjacentHTML("beforeend",`
  <li>
  <div class="select_list">
    <input type="checkbox" name="basket-checker" id="${foodId}" checked="checked" value="1">
    <label for="${foodId}"></label>
    <a href="음식 상세페이지"><img class="food-picture" src="assets/${foodThumbnail}" alt="${foodName}이미지" /> ${foodName}</a>
    <div class="product-counter_wrapper">
      <div class="product-counter_box">
        <input type='button' class="minus-counter_button" />
        <span id="${foodId}">${foodNumber}</span>
        <input type='button' class="plus-counter_button" />      
      </div>
      
      <p>
        <span class='${foodId}-won'>${mulPrice.toLocaleString()}</span> 원
      </p>
      <button class="counter-delete_button"></button>
    </div>
  </div>
  </li>
  `)
  resultPriceInfo += mulPrice;
  resultDiscountInfo += foodPrice*saleRatio*foodNumber;
  normalFood.parentNode.classList.remove('a11y-hidden');
}

function addToFrozen(foodName,foodPrice,foodThumbnail,foodId,foodNumber,saleRatio){
  let mulPrice=foodPrice*foodNumber;
  frozenFood.insertAdjacentHTML("beforeend",`
  <li>
  <div class="select_list">
    <input type="checkbox" name="basket-checker" id="${foodId}" checked="checked" value="1">
    <label for="${foodId}"></label>
    <a href="음식 상세페이지"><img class="food-picture" src="assets/${foodThumbnail}" alt="${foodName}이미지" /> ${foodName}</a>
    <div class="product-counter_wrapper">
      <div class="product-counter_box">
        <input type='button' class="minus-counter_button" />
        <span id="${foodId}">${foodNumber}</span>
        <input type='button' class="plus-counter_button" />      
      </div>
      
      <p>
        <span class='${foodId}-won'>${mulPrice.toLocaleString()}</span> 원
      </p>
      <button class="counter-delete_button"></button>
    </div>
  </div>
  </li>
  `)
  resultPriceInfo += mulPrice;
  resultDiscountInfo +=foodPrice*saleRatio*foodNumber;
  frozenFood.parentNode.classList.remove('a11y-hidden');
}

function addToRefrigeration(foodName,foodPrice,foodThumbnail,foodId,foodNumber,saleRatio){
  let mulPrice=foodPrice*foodNumber;
  refrigeratedFood.insertAdjacentHTML("beforeend",`
  <li>
  <div class="select_list">
    <input type="checkbox" name="basket-checker" id="${foodId}" checked="checked" value="1">
    <label for="${foodId}"></label>
    <a href="음식 상세페이지"><img class="food-picture" src="assets/${foodThumbnail}" alt="${foodName}이미지" /> ${foodName}</a>
    <div class="product-counter_wrapper">
      <div class="product-counter_box">
        <input type='button' class="minus-counter_button" />
        <span id="${foodId}">${foodNumber}</span>
        <input type='button' class="plus-counter_button" />                  
      </div>
      
      <p>
       <span class='${foodId}-won'>${mulPrice.toLocaleString()}</span> 원
      </p>
      <button class="counter-delete_button"></button>
    </div>
  </div>
  </li>`)
  resultPriceInfo += mulPrice;
  resultDiscountInfo += foodPrice*saleRatio*foodNumber;
  refrigeratedFood.parentNode.classList.remove('a11y-hidden');
}


refToggleButton.addEventListener('click',()=>{
  refToggleButton.classList.toggle('img_rotate');
  refrigeratedFood.classList.toggle('a11y-hidden');
});

normalToggleButton.addEventListener('click',()=>{
  normalToggleButton.classList.toggle('img_rotate');
  normalFood.classList.toggle('a11y-hidden');
});

frozenToggleButton.addEventListener('click',()=>{
  frozenToggleButton.classList.toggle('img_rotate');
  frozenFood.classList.toggle('a11y-hidden');
});


// 리스트 버튼 클릭 이벤트-----------------------------------------------------------
function buttonInit(storedData) {
let numberClickedButton = document.querySelectorAll('.product-counter_box');

for(let i = 0;i<numberClickedButton.length;i++){


  // 증감
  numberClickedButton[i].addEventListener('click',(e)=>{

    e.preventDefault();
  
    let clickedPlusButton =e.target.closest('.plus-counter_button');
    count('plus',clickedPlusButton.previousSibling.previousSibling,storedData);
    
  })
  
  numberClickedButton[i].addEventListener('click',(e)=>{

    e.preventDefault();
  
    let clickedMinusButton =e.target.closest('.minus-counter_button');
    count('minus',clickedMinusButton.nextSibling.nextSibling,storedData);
  })


  // 선택 버튼
}

}

function count(type,basicNode,storedData) {


  // 결과를 표시할 element
  const resultElement =basicNode;

  let findData;
  for(let key in storedData){
   
    findData=storedData.filter(function(e){
      return e.id === resultElement.id
    })[0]
  }

  // 현재 화면에 표시된 값
  let number = resultElement.innerText;
 
  let wonNode=getNode(`.${findData.id}-won`)
 
  // 더하기/빼기
  if(type === 'plus') {
    number = parseInt(number) + 1;
    let wonNodePlusResult= parseInt(wonNode.innerText.replace(/,/g, ""))+findData.price;
    wonNode.innerText = wonNodePlusResult.toLocaleString()
    resultDiscountInfo += findData.price*findData.saleRatio;
    resultPriceInfo+=findData.price;
    priceInit();
    // priceInitSecond()

  }else if(type === 'minus'&&number>1)  {
    number = parseInt(number) - 1;
    resultPriceInfo-=findData.price;
    let wonNodeMinusResult= parseInt(wonNode.innerText.replace(/,/g, ""))-findData.price;
    wonNode.innerText = wonNodeMinusResult.toLocaleString()
    resultDiscountInfo -= findData.price*findData.saleRatio;

    priceInit();
    // priceInitSecond()
  }

  // 결과 출력
  resultElement.innerText = number;
  priceInitSecond();
}


//---------------------------------------------------------------------


// 가격 init-------------------------
function priceInit(){
  priceInfo.innerHTML = resultPriceInfo.toLocaleString();
  discountInfo.innerHTML = resultDiscountInfo.toLocaleString();
  deliveryInfo.innerHTML = resulteDeliveryInfo.toLocaleString();
  needAddMoney.innerHTML=needAddPrice.toLocaleString();
  resultInfo.innerHTML = (resultPriceInfo-resultDiscountInfo+resulteDeliveryInfo).toLocaleString();
}

//------------------------------------


// 체크박스----------------------------

function basketCheckBox(basketSelectAll,basketSelectedList,basketCheckedList){

  for(let i=0;i<basketSelectedList.length;i++){
    basketSelectedList[i].addEventListener('click',(e)=>{
 
  
      // 클릭 할 때마다 리스트들 선택여부 갱신----------------------------------------------
      basketSelectAll=document.querySelectorAll('input[name="basket-select-all"]');
      basketSelectedList=document.querySelectorAll('input[name="basket-checker"]');
      basketCheckedList=document.querySelectorAll('input[name="basket-checker"]:checked');
      // --------------------------------------------------------------------------------

      // (선택/전체) 내용 갱신------------------------------------------------------
 
      listSelectedNumber.forEach(element=>{
        element.innerHTML=`${basketCheckedList.length}`;
      })

      listTotalNumber.forEach(element=>{
        element.innerHTML=`${basketSelectedList.length}`;
      })
      
      //--------------------------------------------------------------------------


      let clickedCheckBox= e.target.closest('.list-bar');
      selectCheckAndChange(basketSelectAll,basketSelectedList,basketCheckedList);
    })

   

  }

}

// 전체선택 버튼 관련
function selectCheckAndChange(basketSelectAll,basketSelectedList,basketCheckedList){
 

 

  if(basketSelectedList.length === basketCheckedList.length){
    basketSelectAll.forEach(element => {
      element.checked = true;
     
    });
  
    
  }else {
    basketSelectAll.forEach(element => {
      element.checked = false;
   
    });
  
  } 

  buttonStyleChange(basketCheckedList);

}


// 전체선택 버튼으로 전부 껏다 켜는 함수

function onoffSlectAll(basketSelectAll,basketSelectedList,basketCheckedList){

  let firstSelectAllButton=getNode('#basket-checker1');
  let secondSelectAllButton=getNode('#basket-checker2');

 

  firstSelectAllButton.addEventListener('click',(e)=>{
    makeZero();
    changeAllButton(firstSelectAllButton.checked,basketSelectedList);
     // 클릭 할 때마다 리스트들 선택여부 갱신----------------------------------------------
     basketSelectAll=document.querySelectorAll('input[name="basket-select-all"]');
     basketSelectedList=document.querySelectorAll('input[name="basket-checker"]');
     basketCheckedList=document.querySelectorAll('input[name="basket-checker"]:checked');
     // --------------------------------------------------------------------------------

     // (선택/전체) 내용 갱신------------------------------------------------------

     listSelectedNumber.forEach(element=>{
       element.innerHTML=`${basketCheckedList.length}`;
     })

     listTotalNumber.forEach(element=>{
       element.innerHTML=`${basketSelectedList.length}`;
     })
     
     //--------------------------------------------------------------------------
    
    
  });
  secondSelectAllButton.addEventListener('click',(e)=>{
    console.log('hello');
    makeZero();
    changeAllButton(secondSelectAllButton.checked,basketSelectedList);
     // 클릭 할 때마다 리스트들 선택여부 갱신----------------------------------------------
     basketSelectAll=document.querySelectorAll('input[name="basket-select-all"]');
     basketSelectedList=document.querySelectorAll('input[name="basket-checker"]');
     basketCheckedList=document.querySelectorAll('input[name="basket-checker"]:checked');
     // --------------------------------------------------------------------------------

     // (선택/전체) 내용 갱신------------------------------------------------------

     listSelectedNumber.forEach(element=>{
       element.innerHTML=`${basketCheckedList.length}`;
     })

     listTotalNumber.forEach(element=>{
       element.innerHTML=`${basketSelectedList.length}`;
     })
     
     //--------------------------------------------------------------------------
    });
    
    function changeAllButton(checkedStatus,basketSelectedList){
  
     
  
      if(checkedStatus===true){
        basketSelectedList.forEach(element=>{
          element.checked = true; 
        })
        firstSelectAllButton.checked =true;
        secondSelectAllButton.checked =true;
        buttonStyleChange(0,1);
        
      }
      else{
        basketSelectedList.forEach(element=>{
          element.checked = false;
        })
        firstSelectAllButton.checked =false;
        secondSelectAllButton.checked =false;
        buttonStyleChange(0,0);
      }
  
  }
}



// 버튼 스타일 바꾸는 함수.------------------------

function buttonStyleChange(basketCheckedList,num){

  let targetButton = getNode('.order-button');

  if(basketCheckedList.length>0 || num==1){
    targetButton.innerHTML = "주문하기";
    targetButton.style.backgroundColor="#5f0080";
    
  }
  else{
    targetButton.innerHTML = "상품을 담아주세요";
    targetButton.style.backgroundColor="var(--gray-200)";
  }

}
// --------------------------------------------------


// delete list 리스트 지우는 기능 with 가격 제거





// 체크 해제 시 가격 제거  -> 증감 버튼 이벤트발생하는 함수 안에 다 넣기


function counterDeleteFunction(counterDeleteButton,listSelectedNumber,basketSelectAll,basketSelectedList,basketCheckedList){


  for(let i = 0; i<counterDeleteButton.length;i++){

    counterDeleteButton[i].addEventListener('click',(e)=>{
 
      let closeButton =e.target.closest('.counter-delete_button');
      let closeParentNode= closeButton.parentNode.parentNode.parentNode;
      closeParentNode.innerHTML="";
      
      let findInputId=closeButton.parentNode.parentNode.firstChild.nextSibling.id;
     // 클릭 할 때마다 리스트들 선택여부 갱신----------------------------------------------
     basketSelectAll=document.querySelectorAll('input[name="basket-select-all"]');
     basketSelectedList=document.querySelectorAll('input[name="basket-checker"]');
     basketCheckedList=document.querySelectorAll('input[name="basket-checker"]:checked');
     // --------------------------------------------------------------------------------

     // (선택/전체) 내용 갱신------------------------------------------------------

     listSelectedNumber.forEach(element=>{
       element.innerHTML=`${parseInt(basketCheckedList.length)}`;
     })

     listTotalNumber.forEach(element=>{
       element.innerHTML=`${parseInt(basketSelectedList.length)}`;
     })
      

      fetch(`http://localhost:3000/basket/${findInputId}`, {
        method: "DELETE",
      })

      location.reload();


    })
  }

}


function selectDeleteFunction(selectDeleteButton,listSelectedNumber,basketSelectAll,basketSelectedList,basketCheckedList,selectList){

  for (let i=0;i<selectDeleteButton.length;i++){
   
    selectDeleteButton[i].addEventListener('click',(e)=>{

      basketSelectAll=document.querySelectorAll('input[name="basket-select-all"]');
      basketSelectedList=document.querySelectorAll('input[name="basket-checker"]');
      basketCheckedList=document.querySelectorAll('input[name="basket-checker"]:checked');
      basketCheckedList.forEach((element)=>{

        
        fetch(`http://localhost:3000/basket/${element.id}`, {
              method: "DELETE",
            })
            location.reload();
      
      })

    }
    )


  }
}




function priceInitSecond(){

  priceInfo.innerHTML=`${resultPriceInfo.toLocaleString()}`
    discountInfo.innerHTML=`${resultDiscountInfo.toLocaleString()}`
    if((resultPriceInfo-resultDiscountInfo)<40000 && (resultPriceInfo-resultDiscountInfo)>0){
      resulteDeliveryInfo=3000;
      deliveryInfo.innerHTML=`+ ${resulteDeliveryInfo.toLocaleString()}`;
    }else{
      resulteDeliveryInfo=0;
      deliveryInfo.innerHTML=`${resulteDeliveryInfo.toLocaleString()}`;
    }

    resultTotalPriceInfo=resultPriceInfo-resultDiscountInfo+resulteDeliveryInfo;
    resultInfo.innerHTML=`${resultTotalPriceInfo.toLocaleString()}`
  
    // if((resultPriceInfo-resultDiscountInfo)< 40000 && needAddPrice>0){
    //   needAddPrice=40000-(resultPriceInfo-resultDiscountInfo);
    //   needAddMoney.innerHTML=`${needAddPrice.toLocaleString()}`;
    //   deliveryExplain.classList.remove('a11y-hidden');
    // }else{
    //   deliveryExplain.classList.add('a11y-hidden');
    // }

}

function makeZero(){
  let basketCheckedList=document.querySelectorAll('input[name="basket-checker"]:checked');
  let basketSelectedList=document.querySelectorAll('input[name="basket-checker"]');
  console.log(basketCheckedList.length);
  
  if(basketCheckedList.length==0){
    
    priceInitSecond()
  }
  else{getNode(".price-info").innerHTML ="0";
  getNode(".discount-info").innerHTML="0";
  getNode(".delivery-info").innerHTML="0";
  getNode(".result-info").innerHTML="0";
  }
  

}

