$(function () {
  // メインビジュアル全体のSwiper
const mainMv = new Swiper('.js-main-mv', {
  loop: true,
  speed: 500,
  effect: 'fade',
  fadeEffect: {
    crossFade: true,
  },
  navigation: {
    nextEl: '.top-mv__arrow--next',
    prevEl: '.top-mv__arrow--prev',
  },
});

// 1枚目：ランダム差し替え用画像
const mvImages = [
  './lib/images/top/mv1/img01.jpg',
  './lib/images/top/mv1/img02.jpg',
  './lib/images/top/mv1/img03.jpg',
  './lib/images/top/mv1/img04.jpg',
  './lib/images/top/mv1/img05.jpg',
  './lib/images/top/mv1/img06.jpg',
  './lib/images/top/mv1/img07.jpg',
  './lib/images/top/mv1/img08.jpg',
  './lib/images/top/mv1/img09.jpg',
  './lib/images/top/mv1/img10.jpg',
  './lib/images/top/mv1/img11.jpg',
  './lib/images/top/mv1/img12.jpg',
  './lib/images/top/mv1/img13.jpg',
  './lib/images/top/mv1/img14.jpg',
  './lib/images/top/mv1/img15.jpg',
  './lib/images/top/mv1/img16.jpg',
  './lib/images/top/mv1/img17.jpg',
  './lib/images/top/mv1/img18.jpg',
  './lib/images/top/mv1/img19.jpg',
  './lib/images/top/mv1/img20.jpg',
  './lib/images/top/mv1/img21.jpg',
  './lib/images/top/mv1/img22.jpg',
  './lib/images/top/mv1/img23.jpg',
  './lib/images/top/mv1/img24.jpg',
];

// 1枚目：背景画像を複数箇所ランダム切り替え
const laneCount = 4;
const pairCount = 3;

// 中央レーンを少し出やすくする
// lane2 / lane3 を多めに入れる
const laneWeight = [1, 2, 2, 3, 3, 4];

// 1回の切り替えで変更する数
const changeMin = 2;
const changeMax = 3;

// 切り替え間隔
const changeInterval = 3000;

function getCurrentMvImages() {
  const currentImages = [];

  $('.mv01__img--current').each(function () {
    currentImages.push($(this).attr('src'));
  });

  return currentImages;
}

function getNextMvImage(usedImages) {
  const currentImages = getCurrentMvImages().concat(usedImages);

  const availableImages = mvImages.filter(function (src) {
    return currentImages.indexOf(src) === -1;
  });

  const imagePool = availableImages.length ? availableImages : mvImages;

  return imagePool[Math.floor(Math.random() * imagePool.length)];
}

function getRandomTargets(count) {
  const targets = [];
  const usedKeys = [];

  while (targets.length < count) {
    const lane = laneWeight[Math.floor(Math.random() * laneWeight.length)];
    const pair = Math.floor(Math.random() * pairCount) + 1;
    const key = lane + '-' + pair;

    if (usedKeys.indexOf(key) !== -1) {
      continue;
    }

    usedKeys.push(key);

    targets.push({
      lane: lane,
      pair: pair
    });
  }

  return targets;
}

function changeMvImage(lane, pair, nextImage) {
  const $targets = $(
    '.mv01__item[data-lane="' + lane + '"][data-pair="' + pair + '"]'
  );

  $targets.each(function () {
    const $item = $(this);
    const $current = $item.find('.mv01__img--current');
    const $next = $item.find('.mv01__img--next');

    $next
      .attr('src', nextImage)
      .css('clip-path', 'none')
      .css('opacity', '');

    // リフロー
    $next[0].offsetHeight;

    $item.addClass('is-changing');

    setTimeout(function () {
      $current.attr('src', nextImage);
      $item.removeClass('is-changing');

      $next
        .attr('src', nextImage)
        .css('clip-path', 'none')
        .css('opacity', '');
    }, 1200);
  });
}

setInterval(function () {
  const changeCount = Math.floor(Math.random() * (changeMax - changeMin + 1)) + changeMin;
  const targets = getRandomTargets(changeCount);
  const usedImages = [];

  targets.forEach(function (target, index) {
    const nextImage = getNextMvImage(usedImages);
    usedImages.push(nextImage);

    // 完全同時だと少し機械的なので、ほんの少しだけ時差をつける
    setTimeout(function () {
      changeMvImage(target.lane, target.pair, nextImage);
    }, index * 160);
  });
}, changeInterval);

// 1枚目：中央コピー切り替え
const copies = [
  '技術で、<br>「できない」を<br>「できる」に変える。',
  '社会インフラの<br>難題に<br>技術で応える。',
  '相談できる技術が<br>ここにある。<br>特殊配管のプロ集団。'
];

const $copyTitle = $('.js-mv-copy');

let copyIndex = 0;
let activeLayer = 0;

// h1は1つのまま、中に2枚のレイヤーを作る
$copyTitle.html(
  '<span class="mv01__copy-layer js-mv-copy-layer"></span>' +
  '<span class="mv01__copy-layer js-mv-copy-layer" aria-hidden="true"></span>'
);

const $copyLayers = $('.js-mv-copy-layer');

// 初期表示

const $firstCopy = $copyLayers.eq(0);

$firstCopy
  .html(copies[0])
  .removeClass('is-visible is-hide');

// いったん初期状態をブラウザに認識させる
$firstCopy[0].offsetHeight;

// 次の描画タイミングで表示クラスを付ける
requestAnimationFrame(function () {
  requestAnimationFrame(function () {
    $firstCopy.addClass('is-visible');
  });
});

setInterval(function () {
  const nextLayer = activeLayer === 0 ? 1 : 0;

  copyIndex = (copyIndex + 1) % copies.length;

  const $current = $copyLayers.eq(activeLayer);
  const $next = $copyLayers.eq(nextLayer);

  $next
    .removeClass('is-visible is-hide')
    .html(copies[copyIndex]);

  // リフロー
  $next[0].offsetHeight;

  // クロスフェード
  $current
    .removeClass('is-visible')
    .addClass('is-hide');

  $next
    .addClass('is-visible');

  setTimeout(function () {
    $current
      .removeClass('is-hide')
      .html('');
  }, 1300);

  activeLayer = nextLayer;

}, 5000);

  function splitText(text) {

  const lines = text.split('<br>');
  let html = '';

  lines.forEach(function(line, lineIndex) {

    line.split('').forEach(function(char, charIndex) {

      html += '<span class="char" style="animation-delay:' + ((lineIndex * 0.4) + (charIndex * 0.05)) + 's;">' + char + '</span>';

    });

    if (lineIndex < lines.length - 1) {
      html += '<br>';
    }

  });

  return html;

}

//2枚目
let mv02Timers = [];
let mv03Timers = [];

function clearTimers(timers) {
  timers.forEach(function (timer) {
    clearTimeout(timer);
  });
  timers.length = 0;
}

const mv02Icons = [
  {
    name: 'プラント設備',
    img: './lib/images/top/mv2/icon7.jpg',
    x: 1120,
    y: 210
  },
  {
    name: '水道設備',
    img: './lib/images/top/mv2/icon5.jpg',
    x: 1500,
    y: 160
  },
  {
    name: '自動車排気パイプ',
    img: './lib/images/top/mv2/icon6.jpg',
    x: 1320,
    y: 340
  },
  {
    name: '真空パーツ',
    img: './lib/images/top/mv2/icon4.jpg',
    x: 1560,
    y: 470
  },
  {
    name: '消火設備',
    img: './lib/images/top/mv2/icon2.jpg',
    x: 1280,
    y: 610
  },
  {
    name: '水道配管',
    img: './lib/images/top/mv2/icon1.jpg',
    x: 1040,
    y: 740
  },
  {
    name: '水道波状管',
    img: './lib/images/top/mv2/icon3.jpg',
    x: 1480,
    y: 760
  }
];

function setMv02Scale() {
  const baseW = 1920;
  const baseH = 1080;

  const $mv02 = $('.mv02');

  if (!$mv02.length) return;

  const mvW = $mv02.outerWidth();
  const mvH = $mv02.outerHeight();

  const scale = Math.max(mvW / baseW, mvH / baseH);

  $('.mv02__scene').css('--mv02-scale', scale);
}

setMv02Scale();

$(window).on('resize', function () {
  setMv02Scale();
});

function showMv02Icons() {
  const shuffled = mv02Icons.slice().sort(function () {
    return Math.random() - 0.5;
  });

  const selected = shuffled.slice(0, 4);
  const $icons = $('.js-mv02-icons');

  $icons.empty();

  selected.forEach(function (item, index) {
    const html = `
      <div class="mv02__icon" style="left:${item.x}px; top:${item.y}px;">
        <div class="mv02__icon-img">
          <img src="${item.img}" alt="">
        </div>
        <span>${item.name}</span>
      </div>
    `;

    const $icon = $(html);
    $icons.append($icon);

    setTimeout(function () {
      $icon.addClass('is-show');
    }, 500 + index * 300);
  });
}

function initMv02Animation() {
  clearTimers(mv02Timers);

  const titleText = '社会のインフラを、<br>見えないところで支える。';
  const $title = $('.js-mv02-title');
  const $texts = $('.js-mv02-text');

  $('.js-mv02-icons').empty();
  $title.removeClass('is-show');
  $texts.removeClass('is-show');

  $title.html(splitText(titleText));

  $title[0].offsetHeight;

  $title.addClass('is-show');

  const charCount = $title.find('.char').length;
  const titleDuration = charCount * 50 + 800;

  mv02Timers.push(setTimeout(function () {
    $texts.eq(0).addClass('is-show');
  }, titleDuration));

  mv02Timers.push(setTimeout(function () {
    $texts.eq(1).addClass('is-show');
  }, titleDuration + 500));

  mv02Timers.push(setTimeout(function () {
    showMv02Icons();
  }, titleDuration + 1200));
}

//3枚目
const mv03Bg = new Swiper('.js-mv03-bg', {
  loop: true,
  speed: 1600,
  effect: 'fade',
  fadeEffect: {
    crossFade: true,
  },
  autoplay: {
    delay: 3000,
    disableOnInteraction: false,
  },
});

// 初期状態では3枚目MVの背景スライダーを止めておく
mv03Bg.autoplay.stop();

let isPreparingMv03 = false;

function resetMv03Zoom() {
  $('.js-mv03-bg .swiper-slide img').css({
    transition: 'none',
    transform: 'scale(1)'
  });
}

function startMv03Zoom() {
  const $activeImg = $('.js-mv03-bg .swiper-slide-active img');

  if (!$activeImg.length) return;

  // いったん初期状態へ戻す
  $activeImg.css({
    transition: 'none',
    transform: 'scale(1)'
  });

  // リフロー
  $activeImg[0].offsetHeight;

  // 次の描画タイミングでズーム開始
  requestAnimationFrame(function () {
    requestAnimationFrame(function () {
      $activeImg.css({
        transition: 'transform 4.6s linear',
        transform: 'scale(1.08)'
      });
    });
  });
}

function prepareMv03Bg() {
  isPreparingMv03 = true;

  mv03Bg.autoplay.stop();

  // 3枚目MVが表示される前に、背景を1枚目へ戻す
  mv03Bg.slideToLoop(0, 0, false);
  mv03Bg.update();

  resetMv03Zoom();

  requestAnimationFrame(function () {
    isPreparingMv03 = false;
  });
}

function startMv03Bg() {
  startMv03Zoom();
  mv03Bg.autoplay.start();
}

// 3枚目背景Swiper自体が切り替わる時
mv03Bg.on('slideChangeTransitionStart', function () {
  if (isPreparingMv03) return;
  startMv03Zoom();
});

mv03Bg.on('slideChangeTransitionEnd', function () {
  // フェードアウトが終わった画像だけ、裏で初期状態に戻す
  $('.js-mv03-bg .swiper-slide')
    .not('.swiper-slide-active')
    .find('img')
    .css({
      transition: 'none',
      transform: 'scale(1)'
    });
});

mainMv.on('slideChange', function () {
  // 3枚目へ向かう瞬間に、先に背景を1枚目へ戻す
  if (this.realIndex === 2) {
    prepareMv03Bg();
  } else {
    mv03Bg.autoplay.stop();
  }
});

mainMv.on('slideChangeTransitionEnd', function () {
  const $activeSlide = $('.js-main-mv .swiper-slide-active');

  clearTimers(mv02Timers);
  clearTimers(mv03Timers);

  $('.js-mv02-icons').empty();
  $('.js-mv02-title, .js-mv02-text').removeClass('is-show');
  $('.js-mv03-title, .js-mv03-text').removeClass('is-show');

  if ($activeSlide.find('.mv02').length) {
    setMv02Scale();
    initMv02Animation();
  }

  if ($activeSlide.find('.mv03').length) {
    startMv03Bg();
    initMv03Animation();
  } else {
    // 3枚目が完全に見えなくなってからリセット
    resetMv03Zoom();
  }
});

function initMv03Animation() {
  clearTimers(mv03Timers);

  const titleText = '職人の技が、<br>理想をカタチにする。';

  const $title = $('.js-mv03-title');
  const $text = $('.js-mv03-text');

  $title.removeClass('is-show');
  $text.removeClass('is-show');

  $title.html(splitText(titleText));

  $title[0].offsetHeight;

  $title.addClass('is-show');

  const charCount = $title.find('.char').length;
  const titleDuration = charCount * 50 + 800;

  mv03Timers.push(setTimeout(function () {
    $text.addClass('is-show');
  }, titleDuration));
}

  
});