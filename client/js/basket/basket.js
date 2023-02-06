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


// basket 데이터 받아오기


// json 데이터 받는 함수
fetch("/lab14-project/server/db/data.json")
.then(response => {
  return response.json();
})
.then(jsondata=>{


  listUpdate(jsondata.basket,jsondata.products);

  // addBasketList(jsondata.products);
  // console.log(jsondata.basket);
})


function listUpdate(basketData,productsData){
  // basket에 저장되있는 음식의 상세정보를 products에서 가져온 후 변수에 저장한다.
  let storedData=checkBasketList(basketData,productsData); 
  // 항목에 추가 시킨다. with sort 작업
  addWithSort(storedData);
}


//basket obj에 저장되어있는 id를 이용하여 product에 저장되어있는 상세정보를 리턴해주는 함수.
function checkBasketList(objOfBasket,objOfProducts){
  let pullDataArr = new Array();
  for(let key in objOfBasket){
    // console.log(key,objOfBasket[key].id,objOfBasket[key].number);
    let pullData=objOfProducts.filter(function(e){
      return e.id === objOfBasket[key].id
    })
    pullDataArr.push(pullData); 
  }
  return pullDataArr
}


// 음식 종류 분류 및 마크업에 추가하는 함수.

function addWithSort(storedData){
  
  let lengthOfData=storedData.length;

  for(let i = 0 ; i< lengthOfData; i++){
    console.log(storedData[i][0].name);
    console.log(storedData[i][0].price)
    console.log(storedData[i][0].sort);
    console.log(storedData[i][0].image.thumbnail);

    switch(storedData[i][0].sort){
      case normal :
        break;

      case frozen :
        break;

      case refrigeration:
        break;
    }
    


  }

}











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

