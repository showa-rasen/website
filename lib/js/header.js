$(function () {
  const $window = $(window);
  const $body = $('body');
  const $header = $('.js-header');
  const $menuBtn = $('.js-menu-btn');
  const $megaMenu = $('.js-mega-menu');
  const $menuClose = $('.js-menu-close');

  function updateHeader() {
    const fvHeight = $('.top-mv').outerHeight();
    const scrollTop = $window.scrollTop();

    if (scrollTop >= fvHeight) {
      $header.addClass('is-fixed');

      setTimeout(function () {
        $header.addClass('is-show');
      }, 500);
    } else {
      $header.removeClass('is-fixed is-show');
    }
  }

  updateHeader();

  $window.on('scroll resize', function () {
    updateHeader();
  });

  $menuBtn.on('click', function () {
    const isOpen = $megaMenu.hasClass('is-open');

    if (isOpen) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  $menuClose.on('click', function () {
    closeMenu();
  });

  function openMenu() {
    $body.addClass('is-menu-open');
    $header.addClass('is-menu-open');
    $menuBtn.addClass('is-active');
    $megaMenu.addClass('is-open');
  }

  function closeMenu() {
    $body.removeClass('is-menu-open');
    $header.removeClass('is-menu-open');
    $menuBtn.removeClass('is-active');
    $megaMenu.removeClass('is-open');
  }

  $('.mega-menu__main-item[data-menu-panel]').on('mouseenter click', function () {
    const panel = $(this).data('menu-panel');

    $('.mega-menu__main-item').removeClass('is-active');
    $(this).addClass('is-active');

    $('.mega-menu__sub-panel').removeClass('is-active');
    $('.mega-menu__sub-panel[data-menu-panel="' + panel + '"]').addClass('is-active');
  });

  $('.mega-menu__sub-item').each(function () {
    const $item = $(this);
    const $third = $item.find('.mega-menu__third');

    if ($item.hasClass('is-open')) {
      $third.show();
    } else {
      $third.hide();
    }
  });

  $('.mega-menu__third').hide();

  $('.mega-menu__sub-item > button').on('click', function () {
    const $item = $(this).closest('.mega-menu__sub-item');
    const $third = $item.children('.mega-menu__third');

    if ($item.hasClass('is-open')) {
      $item.removeClass('is-open');
      $third.stop(true, true).slideUp(300);
    } else {
      $item.addClass('is-open');
      $third.stop(true, true).slideDown(300);
    }
  });

});