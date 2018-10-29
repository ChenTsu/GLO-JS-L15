'use strict';

export function calculator() {
  /////////////////   Calculator  ///////////////////////
  let quantity   = document.getElementsByClassName('counter-block-input'),
      place      = document.getElementById('select'),
      totalValue = document.getElementById('total'),
      personsSum = 0,
      daysSum    = 0,
      perDay     = 2000,
      total      = 0;
  
  // инициализируем переменные если браузер не сбросил значения
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
  totalValue.textContent = '0';
  
  // обработчики на изменене значений
  quantity[0].addEventListener('input', (evt)=>{
    if ( !evt.target.oldValue ) {evt.target.oldValue = '';} // в js всё объекты, так что лепим свои свойства
    
    if ( /^\d+$/.test(evt.target.value) || evt.target.value === ''){
      evt.target.oldValue = evt.target.value;
    } else {
      evt.target.value = evt.target.oldValue;
    }
    
    personsSum = +(evt.target.value);
    
    if ((personsSum > 0) && (daysSum > 0)) {
      total = personsSum * daysSum * perDay;
      totalValue.textContent = total * place.options[place.selectedIndex].value;
    } else {
      totalValue.textContent = '0';
    }
  });
  
  quantity[1].addEventListener('input', (evt)=>{
    if ( !evt.target.oldValue ) {evt.target.oldValue = '';} // в js всё объекты, так что лепим свои свойства
    
    if ( /^\d+$/.test(evt.target.value) || evt.target.value === ''){
      evt.target.oldValue = evt.target.value;
    } else {
      evt.target.value = evt.target.oldValue;
    }
    
    daysSum = +(evt.target.value);
    
    if ((personsSum > 0) && (daysSum > 0)) {
      total = personsSum * daysSum * perDay;
      totalValue.textContent = total * place.options[place.selectedIndex].value;
    } else {
      totalValue.textContent = '0';
    }
  });
  
  place.addEventListener('change', ev => {
    
    if ((personsSum > 0) && (daysSum > 0)){
      totalValue.textContent = total * place.options[place.selectedIndex].value;
    }
  });
  
}