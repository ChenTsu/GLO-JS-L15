'use strict';

var age = document.getElementById('age'),
    message = document.getElementById('message');

function showUser(surname, name) {
  alert("Пользователь " + surname + " " + name + ", его возраст " + this.value);
} // showUser.apply( age, ['User', 'Puser'] );


var alt = showUser.bind(age);
alt('Puser', 'User');