'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.slider = slider;

require("core-js/modules/web.dom.iterable");

function slider() {
  /////////////////   SLIDER  ///////////////////////
  var slideNuber = 1,
      slides = document.getElementsByClassName('slider-item'),
      prev = document.getElementsByClassName('prev')[0],
      next = document.getElementsByClassName('next')[0],
      dotsWrap = document.getElementsByClassName('slider-dots')[0],
      dots = document.getElementsByClassName('dot');
  showSlide(slideNuber);

  function showSlide(n) {
    if (n > slides.length) {
      slideNuber = 1;
    }

    if (n < 1) {
      slideNuber = slides.length;
    }

    [].forEach.call(slides, function (el, i) {
      if (i === slideNuber - 1) {
        el.style.display = 'block';
        dots[i].classList.add('dot-active');
      } else {
        el.style.display = 'none';
        dots[i].classList.remove('dot-active');
      }
    });
  }

  function plusSlide(n) {
    showSlide(slideNuber += n);
  }

  function currentSlide(n) {
    showSlide(slideNuber = n);
  }

  prev.addEventListener('click', function () {
    plusSlide(-1);
  });
  next.addEventListener('click', function () {
    plusSlide(1);
  });
  dotsWrap.addEventListener('click', function (evt) {
    if (evt.target.classList.contains('dot')) {
      [].forEach.call(dots, function (el, i) {
        if (el === evt.target) {
          currentSlide(i + 1);
        }
      });
    }
  });
}