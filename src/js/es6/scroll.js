'use strict';

export function scroll() {
  let navMenu = document.body.getElementsByTagName('nav')[0],
    navLinks = navMenu.getElementsByTagName('a');

// порядок секций в массиве должен соответствовать порядку элементов меню
  let sections = [
    document.getElementById('about'),
    document.getElementById('photo'),
    document.getElementById('price'),
    document.getElementById('contacts')
  ];
  
  
  navMenu.addEventListener('click', evt => { // ткнули в блок меню
    if (evt.target.tagName === 'A') { // ещё и в тег А
      evt.preventDefault(); // блокируем стандартное поведение ткнутого элемента
      for (let i = 0; i < navLinks.length; i++) { // перебираем все элементы чтоб выяснить номер ткнутого
        if (evt.target === navLinks[i]) {
          scrollToElement(sections[i]); // крутим страницу к секции с тем же номером что у ткнутого элемента
        }
      }
    }
  });
  
  
  function scrollToElement(nodeElement, duration = 250) {
    let currPos = document.documentElement.scrollTop,
        elementPos = nodeElement.getBoundingClientRect().top - navMenu.clientHeight,
        targetPos = currPos + elementPos ;
    
    let animationID,
        step = targetPos / duration;
    
    // if (targetPos < 0){
    //   step *= -1;
    // }
    
    // shiftPos(startTime);
    shiftPos();
    
    // scrollTo(0, scrollDistance);
    
    function shiftPos(pastTime) {
      
      if (elementPos > 0){
        currPos += step;
        if (currPos - targetPos > 0) {
          currPos = targetPos;
        }
      } else {
        currPos -=step;
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
