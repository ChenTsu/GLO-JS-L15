'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.countdown = countdown;

require("core-js/modules/es6.regexp.to-string");

require("core-js/modules/es6.regexp.split");

function countdown(_ref) {
  var timerBoxId = _ref.timerBoxId,
      deadline = _ref.deadline,
      _ref$isCountFromPast = _ref.isCountFromPast,
      isCountFromPast = _ref$isCountFromPast === void 0 ? false : _ref$isCountFromPast;
  /////////////////  countdown timer  ///////////////////////
  // const DEADLINE = '2019-10-22'.split('-'),
  //   COUNT_FROM_PAST = false; // true - считаем сколько прошло времени если DEADLINE уже прошла ;
  var DEADLINE = deadline.split('-'),
      COUNT_FROM_PAST = isCountFromPast; // true - считаем сколько прошло времени если DEADLINE уже прошла ;

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


  var timer = document.getElementById(timerBoxId);

  function setClock(node, endTime) {
    var seconds = node.getElementsByClassName('seconds')[0],
        minutes = node.getElementsByClassName('minutes')[0],
        hours = node.getElementsByClassName('hours')[0],
        days = node.getElementsByClassName('days')[0],
        months = node.getElementsByClassName('months')[0],
        years = node.getElementsByClassName('years')[0],
        milliseconds = node.getElementsByClassName('milliseconds')[0];
    var timerInterval = setInterval(updateClock, 1000);

    function updateClock() {
      var remains = getTimeRemaining(endTime);

      if (milliseconds) {
        milliseconds.textContent = remains.totalMs;
      }

      if (seconds) {
        seconds.textContent = remains.seconds;
      }

      if (minutes) {
        minutes.textContent = remains.minutes;
      }

      if (hours) {
        hours.textContent = remains.hours;
      }

      if (days) {
        days.textContent = remains.days;
      }

      if (months) {
        months.textContent = remains.months;
      }

      if (years) {
        years.textContent = remains.years;
      }

      if (remains.totalMs <= 0) {
        clearInterval(timerInterval);
      }
    }
  }

  setClock(timer, DEADLINE);
}