'use strict';

import {tabs} from './js/tabs';
import {scroll} from "./js/scroll";
import {countdown} from "./js/countDownTimer";
import {slider} from "./js/slider";
import {calculator} from "./js/calculator";
import {forms} from "./js/sendForms";

document.addEventListener('DOMContentLoaded', ()=>{
  scroll();
  tabs();
  countdown({timerBoxId: 'timer', deadline: '2019-05-20'});
  slider();
  calculator();
  forms();
});