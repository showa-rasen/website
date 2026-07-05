// SRSの強み
const strengthSwiper = new Swiper('.js-strength-swiper', {
  loop: false,
  speed: 700,
  slidesPerView: 'auto',
  spaceBetween: 32,
  grabCursor: true,
  slidesOffsetAfter: window.innerWidth * 0.45,

  // navigationは使わない
  navigation: false,

  autoplay: false,

  breakpoints: {
    0: {
      spaceBetween: 18,
      slidesOffsetAfter: window.innerWidth * 0.18,
    },
    601: {
      spaceBetween: 24,
      slidesOffsetAfter: window.innerWidth * 0.28,
    },
    1025: {
      spaceBetween: 32,
      slidesOffsetAfter: window.innerWidth * 0.45,
    }
  },

  on: {
    init: function () {
      updateStrengthNav(this.activeIndex);
      updateStrengthArrows(this.activeIndex);
    },
    slideChange: function () {
      updateStrengthNav(this.activeIndex);
      updateStrengthArrows(this.activeIndex);
    },
  },
});

// 左ナビクリック
$('.strength__nav-item').on('click', function () {
  const index = Number($(this).data('strength-index'));

  strengthSwiper.slideTo(index);
  updateStrengthNav(index);
  updateStrengthArrows(index);
});

// 前へ
$('.strength__arrow--prev').on('click', function () {
  const current = strengthSwiper.activeIndex;

  if (current <= 0) return;

  strengthSwiper.slideTo(current - 1);
});

// 次へ
$('.strength__arrow--next').on('click', function () {
  const current = strengthSwiper.activeIndex;
  const last = $('.strength__nav-item').length - 1;

  if (current >= last) return;

  strengthSwiper.slideTo(current + 1);
});

// 左ナビactive切替
function updateStrengthNav(index) {
  $('.strength__nav-item')
    .removeClass('is-active')
    .eq(index)
    .addClass('is-active');
}

// 矢印状態切替
function updateStrengthArrows(index) {
  const last = $('.strength__nav-item').length - 1;

  $('.strength__arrow--prev').toggleClass('is-disabled', index <= 0);
  $('.strength__arrow--next').toggleClass('is-disabled', index >= last);
}

/*
// 左ナビクリック
$('.strength__nav-item').on('click', function () {
  const index = Number($(this).data('strength-index'));
  strengthSwiper.slideTo(index);
});

// 左ナビactive切替
function updateStrengthNav(index) {
  $('.strength__nav-item')
    .removeClass('is-active')
    .eq(index)
    .addClass('is-active');
}
*/