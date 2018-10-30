'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.scroll = scroll;

function scroll() {
  var navMenu = document.body.getElementsByTagName('nav')[0],
      navLinks = navMenu.getElementsByTagName('a'); // порядок секций в массиве должен соответствовать порядку элементов меню

  var sections = [document.getElementById('about'), document.getElementById('photo'), document.getElementById('price'), document.getElementById('contacts')];
  navMenu.addEventListener('click', function (evt) {
    // ткнули в блок меню
    if (evt.target.tagName === 'A') {
      // ещё и в тег А
      evt.preventDefault(); // блокируем стандартное поведение ткнутого элемента

      for (var i = 0; i < navLinks.length; i++) {
        // перебираем все элементы чтоб выяснить номер ткнутого
        if (evt.target === navLinks[i]) {
          scrollToElement(sections[i]); // крутим страницу к секции с тем же номером что у ткнутого элемента
        }
      }
    }
  });

  function scrollToElement(nodeElement) {
    var duration = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 250;
    var currPos = document.documentElement.scrollTop,
        elementPos = nodeElement.getBoundingClientRect().top - navMenu.clientHeight,
        targetPos = currPos + elementPos;
    var animationID,
        step = targetPos / duration; // if (targetPos < 0){
    //   step *= -1;
    // }
    // shiftPos(startTime);

    shiftPos(); // scrollTo(0, scrollDistance);

    function shiftPos(pastTime) {
      if (elementPos > 0) {
        currPos += step;

        if (currPos - targetPos > 0) {
          currPos = targetPos;
        }
      } else {
        currPos -= step;

        if (currPos - targetPos < 0) {
          currPos = targetPos;
        }
      }

      scrollTo(0, currPos);
      animationID = requestAnimationFrame(shiftPos);

      if (currPos === targetPos) {
        cancelAnimationFrame(animationID);
      }
    }
  }
}
