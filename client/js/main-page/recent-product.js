let recentProduct = document.querySelector('.recent-product');
let footer = document.querySelector('footer');

function getRelativeTop(targetElem){
  // const target = getNode(targetName); // 요소의 id 값이 target이라 가정
  const target = targetElem; // 요소의 id 값이 target이라 가정
  const clientRect = target.getBoundingClientRect(); // DomRect 구하기 (각종 좌표값이 들어있는 객체)
  const relativeTop = clientRect.top; // Viewport의 시작지점을 기준으로한 상대좌표 Y 값.

  return relativeTop
}

function keepYOfRecentProduct(){
  let windowTop = window.scrollY;
  // let windowBottom = window.scroll
  if(getRelativeTop(footer)<585){
    recentProduct.classList.remove('recent-product__fixed');
    recentProduct.classList.add('recent-product__meet-bottom');
    // console.log('footer rt',getRelativeTop(footer));
  }else if(windowTop>560){// have to stop 
    recentProduct.classList.remove('recent-product__meet-bottom');
    recentProduct.classList.add('recent-product__fixed');
  }else{
    recentProduct.classList.remove('recent-product__meet-bottom');
    recentProduct.classList.remove('recent-product__fixed');
  }
  // console.log('windowTop',windowTop);
  // console.log('rt',getRelativeTop('.recent-product'));
  // console.log('recentProduct.style.top',recentProduct.style.top);
}

// keepYOfRecentProduct();

window.onscroll = function () {
  keepYOfRecentProduct();
};

window.onload = function() {
  keepYOfRecentProduct();
}


