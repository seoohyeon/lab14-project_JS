import { getNode, getNodes } from '../../lib/index.js'

let kakaoMap = getNode(".kakaomap_button");
let basketAddress=getNode(".basket_address");
let refrigeratedFood = getNode(".refrigerated-contents");
let normalFood = getNode(".normal-contents");
let frozenFood =getNode(".frozen-contents");
let noOption=getNode(".no-option");

let refToggleButton = refrigeratedFood.previousSibling.previousSibling;
let normalToggleButton = normalFood.previousSibling.previousSibling;
let frozenToggleButton = frozenFood.previousSibling.previousSibling;



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


fetch("/lab14-project/server/db/data.json")
.then(response => {
  return response.json();
})
.then(res=>{
  let storedDataBasket=res.basket;
  let storedDataProducts = res.products;
  let storedData=checkBasketList(storedDataBasket,storedDataProducts); 
  if(res.basket.length>=1){
    noOption.className += ' a11y-hidden'


  }
})


//basket obj에 저장되어있는 id를 이용하여 product에 저장되어있는 상세정보를 리턴해주는 함수.
function checkBasketList(storedDataBasket,storedDataProducts){
  for(let key in storedDataBasket){
    // console.log(key,objOfBasket[key].id,objOfBasket[key].number);
    let pullData=storedDataProducts.filter(function(e){
      return e.id === storedDataBasket[key].id
    }) 
    // console.log(pullData[0].sort);
    // console.log(pullData[0].name);
    // console.log(pullData[0].price);
    // console.log(pullData[0].image.thumbnail);

    sortAndAdd(pullData[0].sort,pullData[0].name,pullData[0].price,pullData[0].image.thumbnail,pullData[0].id);
  }
}


function sortAndAdd(foodKind,foodName,foodPrice,foodThumbnail,foodId){

switch (foodKind){
  case "normal" : addToNormal(foodName,foodPrice,foodThumbnail,foodId);
    break;

  case "frozen" : addToFrozen(foodName,foodPrice,foodThumbnail,foodId);
    break; 

   case "refrigeration": addToRefrigeration(foodName,foodPrice,foodThumbnail,foodId);
    break;
}
}


function addToNormal(foodName,foodPrice,foodThumbnail,foodId){
  normalFood.insertAdjacentHTML("beforeend",`
  <li>
  <div class="select_list">
    <input type="checkbox" name="basket-checker" id="${foodId}">
    <label for="${foodId}"></label>
    <a href="음식 상세페이지"><img class="food-picture" src="assets/${foodThumbnail}" alt="${foodName}이미지" /> ${foodName}</a>
    <div class="product-counter_wrapper">
      <div class="product-counter_box">
        <button class="minus-counter_button"></button>
        <span>1</span>                  
        <button class="plus-counter_button"></button>
      </div>
      
      <p>
        ${foodPrice} 원
      </p>
      <button class="counter-delete_button"></button>
    </div>
  </div>
  </li>
  `)
}

function addToFrozen(foodName,foodPrice,foodThumbnail,foodId){
  frozenFood.insertAdjacentHTML("beforeend",`
  <li>
  <div class="select_list">
    <input type="checkbox" name="basket-checker" id="${foodId}">
    <label for="${foodId}"></label>
    <a href="음식 상세페이지"><img class="food-picture" src="assets/${foodThumbnail}" alt="${foodName}이미지" /> ${foodName}</a>
    <div class="product-counter_wrapper">
      <div class="product-counter_box">
        <button class="minus-counter_button"></button>
        <span>1</span>                  
        <button class="plus-counter_button"></button>
      </div>
      
      <p>
        ${foodPrice} 원
      </p>
      <button class="counter-delete_button"></button>
    </div>
  </div>
  </li>
  `)
  
}

function addToRefrigeration(foodName,foodPrice,foodThumbnail,foodId){
  refrigeratedFood.insertAdjacentHTML("beforeend",`
  <li>
  <div class="select_list">
    <input type="checkbox" name="basket-checker" id="${foodId}">
    <label for="${foodId}"></label>
    <a href="음식 상세페이지"><img class="food-picture" src="assets/${foodThumbnail}" alt="${foodName}이미지" /> ${foodName}</a>
    <div class="product-counter_wrapper">
      <div class="product-counter_box">
        <button class="minus-counter_button"></button>
        <span>1</span>                  
        <button class="plus-counter_button"></button>
      </div>
      
      <p>
        ${foodPrice} 원
      </p>
      <button class="counter-delete_button"></button>
    </div>
  </div>
  </li>`)
}

// // 

// refToggle.addEventListener('click',foodToggle());

// function foodToggle(){

//   refToggle.classList.toggle('img_rotate');
//   // refToggle.sibling.classList.toggle('a11y-hidden');
// }

// // let refToggle=getNode(".ref_toggle");
// // let frozenToggle=getNode(".frozen_toggle");
// // let normalToggle=getNode(".normal_toggle");



// let refToggleButton = refrigeratedFood.previousSibling.previousSibling;
// let normalToggleButton = normalFood.previousSibling.previousSibling;
// let frozenToggleButton = frozenFood.previousSibling.previousSibling;
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


