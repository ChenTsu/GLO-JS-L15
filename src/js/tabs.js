'use strict';

export function tabs() {
  let infoHeader  = document.body.getElementsByClassName('info-header')[0],
      headers     = document.body.getElementsByClassName('info-header-tab'),
      tabs        = document.body.getElementsByClassName('info-tabcontent');
  
  // выключаем все табы кроме нулевого
  for (let j=0; j<headers.length; j++){
    if (j>0){ // тутможно изменить номер таба который оставить видимым
      tabs[j].classList.add('hide');
      tabs[j].classList.remove('show');
    }
  }
  
  infoHeader.addEventListener('click', evt => { // клик на область заголовков
    if (evt.target.classList.contains('info-header-tab')){ // клик попал по одному из заголовков
      for (let j = 0; j < headers.length; j++) { // проверяем все заголовки
        if (headers[j] === evt.target){ // если это тот по которому ткнули - показываем его таб
          tabs[j].classList.add('show');
          tabs[j].classList.remove('hide');
        } else {  // остальные скрываем
          tabs[j].classList.add('hide');
          tabs[j].classList.remove('show');
        }
      }
    }
  });
};

