'use strict';

require("core-js/modules/es6.promise");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.regexp.to-string");

require("core-js/modules/es6.regexp.split");

document.addEventListener('DOMContentLoaded', function () {
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
  }); /////////////////  countdown timer  ///////////////////////

  var DEADLINE = '2019-10-22'.split('-'),
      COUNT_FROM_PAST = false; // true - считаем сколько прошло времени если DEADLINE уже прошла ;

  function getTimeRemaining(endMoment) {
    // через числовое объявление new Date() создаёт дату в том же часовом поясе что и Date.now(), в отличии от Date.parse
    var tmp = new Date(endMoment[0], endMoment[1] - 1, endMoment[2]) - Date.now();

    if (COUNT_FROM_PAST && tmp < 0) {
      tmp = Math.abs(tmp);
    }

    if (tmp < 0) {
      tmp = 0;
    }

    var moments = {
      'totalMs': tmp.toString(),
      'totalSeconds': Math.floor(tmp / 1000).toString(),
      'seconds': Math.floor(tmp / 1000 % 60).toString(),
      'totalMinutes': Math.floor(tmp / 1000 / 60).toString(),
      'minutes': Math.floor(tmp / 1000 / 60 % 60).toString(),
      'totalHours': Math.floor(tmp / 1000 / 60 / 60).toString(),
      'hours': Math.floor(tmp / 1000 / 60 / 60 % 24).toString(),
      'totalDays': Math.floor(tmp / 1000 / 60 / 60 / 24).toString(),
      'days': Math.floor(tmp / 1000 / 60 / 60 / 24 % 30.416).toString(),
      'totalMonths': Math.floor(tmp / 1000 / 60 / 60 / 24 / 30.416).toString(),
      'months': Math.floor(tmp / 1000 / 60 / 60 / 24 / 30.416 % 12).toString(),
      'years': Math.floor(tmp / 1000 / 60 / 60 / 24 / 365).toString()
    };

    for (var k in moments) {
      if (moments[k].length === 1) {
        moments[k] = '0' + moments[k];
      }
    }

    return moments;
  } // console.log(getTimeRemaining(DEADLINE));
  // мы не знаем разметку, пусть при подключении заботятся о выборке нужного DOM-элемента


  var timer = document.getElementById('timer');

  function setClock(node, endTime) {
    var seconds = node.getElementsByClassName('seconds')[0],
        minutes = node.getElementsByClassName('minutes')[0],
        hours = node.getElementsByClassName('hours')[0]; // days         = node.getElementsByClassName('days')[0],
    // months       = node.getElementsByClassName('months')[0],
    // years        = node.getElementsByClassName('years')[0],
    // milliseconds = node.getElementsByClassName('milliseconds')[0];

    var timerInterval = setInterval(updateClock, 1000);

    function updateClock() {
      var remains = getTimeRemaining(endTime); // milliseconds.textContent = remains.totalMs;

      seconds.textContent = remains.seconds;
      minutes.textContent = remains.minutes;
      hours.textContent = remains.hours; // days.textContent         = remains.days;
      // months.textContent       = remains.months;
      // years.textContent        = remains.years;

      if (remains.totalMs <= 0) {
        clearInterval(timerInterval);
      }
    }
  }

  setClock(timer, DEADLINE); /////////////////  modal popup  ///////////////////////

  var more = document.body.getElementsByClassName('more')[0],
      overlay = document.body.getElementsByClassName('overlay')[0],
      close = document.body.getElementsByClassName('popup-close')[0],
      descriptionBtns = document.body.getElementsByClassName('description-btn');
  var msg = {
    loading: '<div style="color: wheat; line-height: 2;"><span>Loading....</span><img src="icons/tenor.gif" style="vertical-align: middle;" alt="" width="20" /> </div>',
    success: '<div style="color: greenyellow; line-height: 2;"><spn>Data sent successfully</spn><img src="icons/checked.png" width="20" style="vertical-align: middle;" alt=""></div>',
    fail: '<div style="color: red; line-height: 2;" ><span>something wrong... jo_Oj</span><img src="icons/explosion.png" width="20" style="vertical-align: middle;" alt=""></div>'
  };
  var statusMsg = document.createElement('div');

  function showModalPopup() {
    overlay.style.display = 'block';
    more.classList.add('more-splash');
    document.body.style.overflow = 'hidden';
  }

  more.addEventListener('click', showModalPopup);

  for (var i = 0; i < descriptionBtns.length; i++) {
    descriptionBtns[i].addEventListener('click', showModalPopup);
  }

  close.addEventListener('click', function (evt) {
    overlay.style.display = 'none';
    more.classList.remove('more-spalsh');
    document.body.style.overflow = '';
  }); /////////////////   AJAX save popup form data  ///////////////////////

  document.querySelector('.main-form').addEventListener('submit', exchangeFormData); /////////////////   AJAX save contact form data  ///////////////////////

  document.getElementById('form').addEventListener('submit', exchangeFormData); /////////////////   AJAX save contact form data  ///////////////////////

  function exchangeFormData(evt) {
    evt.preventDefault();
    evt.target.appendChild(statusMsg);
    sendFormData(new FormData(evt.target)).then(function () {
      statusMsg.innerHTML = msg.loading;
    }).then(function () {
      statusMsg.innerHTML = msg.success;
    }).catch(function () {
      statusMsg.innerHTML = msg.fail;
    });
    [].forEach.call(evt.target.getElementsByTagName('input'), function (el) {
      el.value = '';
    });
    setTimeout(function () {
      statusMsg.innerHTML = '';
      evt.target.lastChild.remove();
    }, 5000);
  }

  function sendFormData(data) {
    return new Promise(function (goodNews, badNews) {
      var request = new XMLHttpRequest();
      request.open('POST', 'server.php');
      request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
      request.send(data);
      request.addEventListener('readystatechange', function () {
        if (request.readyState < 4) {
          goodNews();
        } else if (request.readyState === 4) {
          goodNews();
        } else {
          badNews(msg.fail);
        }
      });
    });
  } /////////////////   validate tel inputs  ///////////////////////


  var tels = document.querySelectorAll('input[type="tel"]');
  [].forEach.call(tels, function (el) {
    el.addEventListener('input', function (evt) {
      if (!el.oldValue) {
        el.oldValue = '';
      } // в js всё объекты, так что лепим свои свойства


      if (/^\+?[()\d \-]*$/.test(el.value) || el.value === '') {
        el.oldValue = el.value; // el.classList.remove(':invalid');
      } else {
        el.value = el.oldValue; // el.classList.add(':invalid');
      }
    });
  }); /////////////////   SLIDER  ///////////////////////

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
  }); /////////////////   Calculator  ///////////////////////

  var quantity = document.getElementsByClassName('counter-block-input'),
      place = document.getElementById('select'),
      totalValue = document.getElementById('total'),
      personsSum = 0,
      daysSum = 0,
      perDay = 2000,
      total = 0; // инициализируем переменные если браузер не сбросил значения
  // if (quantity[0].value !== ''){
  //   personsSum = +quantity[0].value;
  // console.log(personsSum);
  // }
  // if (quantity[1].value !== ''){
  //   personsSum = +quantity[0].value;
  // console.log(daysSum);
  // }
  // if ((personsSum > 0) && (daysSum > 0)) {
  //   total = personsSum * daysSum * perDay;
  //   totalValue.textContent = total * place.options[place.selectedIndex].value;
  // } else {
  //   totalValue.textContent = total;
  // }

  quantity[0].value = '';
  quantity[1].value = '';
  totalValue.textContent = '0'; // обработчики на изменене значений

  quantity[0].addEventListener('input', function (evt) {
    if (!evt.target.oldValue) {
      evt.target.oldValue = '';
    } // в js всё объекты, так что лепим свои свойства


    if (/^\d+$/.test(evt.target.value) || evt.target.value === '') {
      evt.target.oldValue = evt.target.value;
    } else {
      evt.target.value = evt.target.oldValue;
    }

    personsSum = +evt.target.value;

    if (personsSum > 0 && daysSum > 0) {
      total = personsSum * daysSum * perDay;
      totalValue.textContent = total * place.options[place.selectedIndex].value;
    } else {
      totalValue.textContent = '0';
    }
  });
  quantity[1].addEventListener('input', function (evt) {
    if (!evt.target.oldValue) {
      evt.target.oldValue = '';
    } // в js всё объекты, так что лепим свои свойства


    if (/^\d+$/.test(evt.target.value) || evt.target.value === '') {
      evt.target.oldValue = evt.target.value;
    } else {
      evt.target.value = evt.target.oldValue;
    }

    daysSum = +evt.target.value;

    if (personsSum > 0 && daysSum > 0) {
      total = personsSum * daysSum * perDay;
      totalValue.textContent = total * place.options[place.selectedIndex].value;
    } else {
      totalValue.textContent = '0';
    }
  });
  place.addEventListener('change', function (ev) {
    if (personsSum > 0 && daysSum > 0) {
      totalValue.textContent = total * place.options[place.selectedIndex].value;
    }
  });
});