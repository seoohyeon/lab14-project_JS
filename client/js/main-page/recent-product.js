

let recentProduct = document.querySelector('.recent-product');
console.log(recentProduct);
window.addEventListener('scroll',()=>{
  console.log('w',window.scrollX, window.scrollY);
  console.log(recentProduct.offsetTop,recentProduct.offsetLeft);
});

//window.scrollY < 431 일 동안은 sticky를 유지해야함