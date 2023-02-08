import { getNode } from '../../lib/index.js'

let minus = getNode(".order-details_minus");
let plus = getNode(".order-details_plus");
let orderNumber = getNode(".order-details_number");
let number = +getNode(".order-details_number").textContent;
let totalPrice = getNode(".total-price_number");
let totalNum = +totalPrice.textContent.replace(",","");

let productTitle = getNode(".order-details_title")
let productCount = 1;
let productCountSum = 0;
let getProductItem = 0;
let savedProductItem = 0;
let flag = false;
let cartBubbleWarpper = getNode(".cart_bubble_wrapper");





// 페이지 부팅시 데이터 가져오기
await fetch("http://localhost:3000/products")
.then((res) => {
    return res.json();
  }).then((data) => {
    // data = JSON파일에 저장된 products 배열

    let output = localStorage.getItem("id");
    let arr = JSON.parse(output);


    // products 배열을 순회함
    for(let i=0; i<data.length; i++){
      let price = String(data[i].salePrice);

      // localstorage에서 가져온 value(배열)의 맨 마지막 id === products 배열 id가 같다면 실행.
      if(arr[arr.length-1] === data[i].id){
        getNode(".order-img-tag").src = `./assets/${data[i].image.view}`;
        productTitle.textContent = data[i].name;
        getNode(".order-details_subtitle").textContent = data[i].description;
        getNode(".order-details_price").textContent = `${price.slice(0,-3)},${price.slice(-3)}원`;
        getNode(".product-price").textContent = `${price.slice(0,-3)},${price.slice(-3)}원`;
        totalPrice.textContent = `${price.slice(0,-3)},${price.slice(-3)}`;

        getNode(".review-popup").src = `./assets/${data[i].image.view}`;
        getNode(".review-popup-text").textContent = data[i].name;


        // 마이너스 함수 선언
        function haveMinus() {

          // number = string인 노드의 textcontent임 = 초기값 1
          if(number > 1){
            minus.style.cursor = "pointer";
            number -= 1;
            totalNum = String(data[i].salePrice*number);
            totalNum = `${totalNum.slice(0,-3)},${totalNum.slice(-3)}`;
            orderNumber.textContent = number;
            totalPrice.textContent = totalNum;
          }
          // number가 1이면 더이상 마이너스가 되지 않도록 구현
          if(number === 1){
            getNode(".order-details_minus_path").style.fill = "var(--gray-300)";
            orderNumber.textContent = 1;
            minus.style.cursor = "default";
          }
        }
        
        // 플러스 함수 선언
        function havePlus() {
            number += 1;
            totalNum = String(data[i].salePrice*number);
            totalNum = `${totalNum.slice(0,-3)},${totalNum.slice(-3)}`;
            orderNumber.textContent = number;
            totalPrice.textContent = totalNum;
          
            if(number >1){
              getNode(".order-details_minus_path").style.fill = "var(--content)";
            }
        }
        
        
        // 상품 갯수 선택에 따른 총 가격 나타나도록 함수 호출
        minus.addEventListener("click", haveMinus);
        
        // tab키 접근성
        minus.addEventListener("keyup", (e) => {
          if(e.keyCode == 13){
            haveMinus();
          }
        })
        
        plus.addEventListener("click", havePlus);
        
        // tab키 접근성
        plus.addEventListener("keyup", (e) => {
          if(e.keyCode == 13 ){
            havePlus();
          }
        })
        // 변수에 찾은 데이터를 받아옴
        return getProductItem = data[i];
      }
    }
   
    // 데이터에 따른 상품설명 창 변경
    getNode('.product-img-banner').src = `./assets/${getProductItem.image.banner}`;
    getNode('.product-detail_title-p').textContent = getProductItem.description;
    getNode('.product-detail_title').textContent = getProductItem.name;
    getNode('.product-detail_info').src = `./assets/${getProductItem.image.info}`;
    
  })


 // cart-bubble 창
 getNode(".cart_bubble_title").textContent = getProductItem.name;

 // 장바구니 담기 버튼 클릭시 실행문
 getNode(".button_add_cart").addEventListener("click", async () =>{
    cartBubbleWarpper.style.display = "block";
    // 장바구니 팝업창 1초동안 보여주기
   setTimeout(() => {
    cartBubbleWarpper.style.display = "none";
   }, 1000);
   getNode(".cart_bubble_img").src = `./assets/${getProductItem.image.view}`;
   
   // 데이터 불러오기
   await fetch("http://localhost:3000/basket").then((res) => {
     return res.json();
   }).then((newData) => {
    // 배열 데이터 변수에 할당
     return savedProductItem = newData;
   })

   for(let i=0; i<savedProductItem.length; i++){

    // 배열 데이터 변수 id === 앞에서 찾은 데이터 id가 같을시 실행문
    if(savedProductItem[i].id === getProductItem.id){
      // 데이터바인딩을 위한 플래그 변수 이용
      flag = true;
      // 배열데이터에 찾은 변수가 있다면 합 변수에 넣기
      productCountSum = savedProductItem[i].number;
    }  
  }

  // flag === true일 경우(배열데이터에 찾은변수가 있다면)
  if(flag){
    //원래 합에 최근 받은 숫자 더하기
    productCountSum += number;

    // PUT방식으로 업데이트 시키기
    fetch(`http://localhost:3000/basket/${getProductItem.id}`,{
    method : "PUT",
    headers: {
      'Content-Type': 'application/json'
      },
    body : JSON.stringify({
      id : getProductItem.id,
      number : productCountSum,
    })
   }).then((res) =>{
    return res.json();
   })
   // 그 외의 경우(배열데이터에 찾은변수가 없다면, 즉 처음 들어온 데이터라면)
  } else {
    // POST방식으로 create
    fetch("http://localhost:3000/basket",{
      method : "POST",
      headers: {
        'Content-Type': 'application/json'
        },
      body : JSON.stringify({
        id : getProductItem.id,
        number : number,
      })
    }).then((res) =>{
      return res.json();
    })
  } 
 })

 // 장바구니에 물건이 있다면 cart에 불이 들어옴
fetch("http://localhost:3000/basket")
 .then((res) => {
  return res.json();
}).then((data) => {
  console.log(data.length)
  if(data.length){
    getNode(".cart-bell").style.visibility = "visible";
  }
})





