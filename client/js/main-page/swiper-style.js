

// swiper1
const mainBannerSwiper = new Swiper('.main-banner_swiper', { //eslint-disable-line 
  loop : true, // 무한 루프 슬라이드, 반복이 되며 슬라이드가 끝이 없다.
	freeMode : false, // 슬라이드 넘길 때 위치 고정 여부
  // autoHeight : true, // true로 설정하면 슬라이더 래퍼가 현재 활성 슬라이드의 높이에 맞게 높이를 조정합니다.
  a11y : false, // 접근성 매개변수(접근성 관련 대체 텍스트 설정이 가능) - api문서 참고!
  resistance : false, // 슬라이드 터치에 대한 저항 여부 설정
  slideToClickedSlide : true, // 해당 슬라이드 클릭시 슬라이드 위치로 이동
  centeredSlides : true, // true시에 슬라이드가 가운데로 배치
  allowTouchMove : true, // false시에 스와이핑이 되지 않으며 버튼으로만 슬라이드 조작이 가능
  watchOverflow : true, // 슬라이드가 1개 일 때 pager, button 숨김 여부 설정
  slidesOffsetBefore : 0, // 슬라이드 시작 부분 여백
  slidesOffsetAfter : 0, // 슬라이드 시작 부분 여백
  pagination : {   // 페이저 버튼 사용자 설정
      el : '.main-banner_swiper-pagination',  // 페이저 버튼을 담을 태그 설정
      clickable : false,  // 버튼 클릭 여부
      type : 'fraction', // 버튼 모양 결정 "bullets", "fraction" 
      // renderBullet : function (index, className) {  // className이 기본값이 들어가게 필수 설정
      //     return `<a href="#" class="${  className  }">${  index + 1  }</a>`
      // },
      // renderFraction: function (currentClass, totalClass) { // type이 fraction일 때 사용
      //     return `<span class="${  currentClass  }"></span>` + `<span class="${  totalClass  }"></span>`;
      // }
  },
  navigation : {
		prevEl : '.main-banner_swiper-button-prev', // 이번 버튼 클래스명
		nextEl : '.main-banner_swiper-button-next', // 다음 버튼 클래스명
  }
});
const productDisplaySwiper1 = new Swiper('.product-display_swiper', { //eslint-disable-line 
  loop : false, // 무한 루프 슬라이드, 반복이 되며 슬라이드가 끝이 없다.
	freeMode : false, // 슬라이드 넘길 때 위치 고정 여부
  resistance : false, // 슬라이드 터치에 대한 저항 여부 설정
  slideToClickedSlide : true, // 해당 슬라이드 클릭시 슬라이드 위치로 이동
  centeredSlides : true, // true시에 슬라이드가 가운데로 배치
  allowTouchMove : true, // false시에 스와이핑이 되지 않으며 버튼으로만 슬라이드 조작이 가능
  slidesOffsetBefore : 0, // 슬라이드 시작 부분 여백
  slidesOffsetAfter : 0, // 슬라이드 시작 부분 여백

  navigation : {
		//nextEl : '.swiper-button-next', // 다음 버튼 클래스명
		nextEl : '.product-display_swiper-button-next', // 다음 버튼 클래스명
		prevEl : '.product-display_swiper-button-prev', // 이번 버튼 클래스명
  }
});

const productDisplaySwiper2 = new Swiper('.product-display_swiper', { //eslint-disable-line 
  loop : false, // 무한 루프 슬라이드, 반복이 되며 슬라이드가 끝이 없다.
	freeMode : false, // 슬라이드 넘길 때 위치 고정 여부
  resistance : false, // 슬라이드 터치에 대한 저항 여부 설정
  slideToClickedSlide : true, // 해당 슬라이드 클릭시 슬라이드 위치로 이동
  centeredSlides : true, // true시에 슬라이드가 가운데로 배치
  allowTouchMove : true, // false시에 스와이핑이 되지 않으며 버튼으로만 슬라이드 조작이 가능
  slidesOffsetBefore : 0, // 슬라이드 시작 부분 여백
  slidesOffsetAfter : 0, // 슬라이드 시작 부분 여백

  navigation : {
		//nextEl : '.swiper-button-next', // 다음 버튼 클래스명
		nextEl : '.product-display_swiper-button-next', // 다음 버튼 클래스명
		prevEl : '.product-display_swiper-button-prev', // 이번 버튼 클래스명
  }
});
