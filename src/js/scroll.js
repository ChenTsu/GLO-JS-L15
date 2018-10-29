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
    var scrollDistance = document.documentElement.scrollTop + nodeElement.getBoundingClientRect().top - navMenu.clientHeight;
    var animationID,
        step = 1; // shift();

    scrollTo(0, scrollDistance);

    function shift() {
      animationID = requestAnimationFrame(shift);

      if (document.documentElement.scrollTop === scrollDistance) {
        cancelAnimationFrame(animationID);
      } // todo: add more checks for step > 1
      // todo: add check what to do if element is not reachable by scrollTo() (like footer)
      // if (document.documentElement.scrollTop < scrollDistance){
      //   scrollTo(0, document.documentElement.scrollTop + step);
      // }else if (document.documentElement.scrollTop > scrollDistance){
      //   scrollTo(0, document.documentElement.scrollTop - step);
      // }

    }
  }
}