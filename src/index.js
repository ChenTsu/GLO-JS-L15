'use strict';

var _tabs = require("./js/tabs");

var _scroll = require("./js/scroll");

var _countDownTimer = require("./js/countDownTimer");

var _slider = require("./js/slider");

var _calculator = require("./js/calculator");

var _sendForms = require("./js/sendForms");

// const babel = require("@babel/core");
// babel.transform("code", optionsObject);
document.addEventListener('DOMContentLoaded', function () {
  (0, _scroll.scroll)();
  (0, _tabs.tabs)();
  (0, _countDownTimer.countdown)({
    timerBoxId: 'timer',
    deadline: '2019-05-20'
  });
  (0, _slider.slider)();
  (0, _calculator.calculator)();
  (0, _sendForms.forms)();
});
