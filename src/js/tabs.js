'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.tabs = tabs;

function tabs() {
  var infoHeader = document.body.getElementsByClassName('info-header')[0],
      headers = document.body.getElementsByClassName('info-header-tab'),
      tabs = document.body.getElementsByClassName('info-tabcontent'); // выключаем все табы кроме нулевого

  for (var j = 0; j < headers.length; j++) {
    if (j > 0) {
      // тутможно изменить номер таба который оставить видимым
      tabs[j].classList.add('hide');
      tabs[j].classList.remove('show');
    }
  }

  infoHeader.addEventListener('click', function (evt) {
    // клик на область заголовков
    if (evt.target.classList.contains('info-header-tab')) {
      // клик попал по одному из заголовков
      for (var _j = 0; _j < headers.length; _j++) {
        // проверяем все заголовки
        if (headers[_j] === evt.target) {
          // если это тот по которому ткнули - показываем его таб
          tabs[_j].classList.add('show');

          tabs[_j].classList.remove('hide');
        } else {
          // остальные скрываем
          tabs[_j].classList.add('hide');

          tabs[_j].classList.remove('show');
        }
      }
    }
  });
}

;