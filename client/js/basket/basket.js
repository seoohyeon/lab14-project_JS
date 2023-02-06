import { getNode } from '../../lib/index.js'

let kakaoMap = getNode(".kakaomap_button");
let basketAddress=getNode(".basket_address");




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



// 

















// // json 데이터 받는 함수
// fetch("/lab14-project/server/db/data.json")
// .then(response => {
//   return response.json();
// })
// .then(jsondata=>{
//   checkBasketList(jsondata.basket,jsondata.products);
//   addBasketList(jsondata.products);
// })




// // json 데이터 파일 에서 basket obj에 들어가있는 항목을 체크하는 함수
// function checkBasketList(arrOfBasket,arrOfProducts){

  
// }






// //json 에서 받은 데이터를 이용하여 html에 상품 리스트를 추가하는 함수
// function addBasketList(objs){

//  for(let obj of objs){
  


//   // 음식종류 분류 후 html 마크업 추가.
//   addAfterSort(obj.sort)
//  }
// }



// function addAfterSort(sort){

//   switch(sort){
//     case
//   }
  


// }

