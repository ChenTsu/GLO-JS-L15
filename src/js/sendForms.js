'use strict';
export function forms() {
  /////////////////  modal popup  ///////////////////////
  let more            = document.body.getElementsByClassName('more')[0],
      overlay         = document.body.getElementsByClassName('overlay')[0],
      close           = document.body.getElementsByClassName('popup-close')[0],
      descriptionBtns = document.body.getElementsByClassName('description-btn');
  
  let msg = {
    loading: '<div style="color: wheat; line-height: 2;"><span>Loading....</span><img src="icons/tenor.gif" style="vertical-align: middle;" alt="" width="20" /> </div>',
    success: '<div style="color: greenyellow; line-height: 2;"><spn>Data sent successfully</spn><img src="icons/checked.png" width="20" style="vertical-align: middle;" alt=""></div>',
    fail:    '<div style="color: red; line-height: 2;" ><span>something wrong... jo_Oj</span><img src="icons/explosion.png" width="20" style="vertical-align: middle;" alt=""></div>'
  };
  
  let statusMsg = document.createElement('div');
  
  function showModalPopup (){
    overlay.style.display = 'block';
    more.classList.add('more-splash');
    document.body.style.overflow = 'hidden';
  }
  
  more.addEventListener('click', showModalPopup);
  
  for (let i=0; i<descriptionBtns.length; i++){
    descriptionBtns[i].addEventListener('click', showModalPopup);
  }
  
  close.addEventListener('click', evt => {
    overlay.style.display = 'none';
    more.classList.remove('more-spalsh');
    document.body.style.overflow = '';
  });
  
  
  /////////////////   AJAX save popup form data  ///////////////////////
  document.querySelector('.main-form').addEventListener('submit', exchangeFormData);
  
  /////////////////   AJAX save contact form data  ///////////////////////
  document.getElementById('form').addEventListener('submit', exchangeFormData);
  
  
  /////////////////   AJAX save contact form data  ///////////////////////
  function exchangeFormData(evt) {
    evt.preventDefault();
    evt.target.appendChild(statusMsg);
    
    sendFormData( new FormData(evt.target) )
      .then(()=>{ statusMsg.innerHTML = msg.loading; })
      .then(()=>{ statusMsg.innerHTML = msg.success; })
      .catch(()=>{ statusMsg.innerHTML = msg.fail; });
    
    [].forEach.call(evt.target.getElementsByTagName('input'), (el =>{ el.value = ''; }));
    setTimeout(()=>{
      statusMsg.innerHTML = '';
      evt.target.lastChild.remove(); }, 5000);
  }
  
  function sendFormData(data){
    return new Promise( (goodNews, badNews)=>{
      let request = new XMLHttpRequest();
      
      request.open('POST', 'server.php');
      request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
      
      request.send(data);
      
      request.addEventListener('readystatechange', () =>{
        if (request.readyState < 4){
          goodNews();
        } else if (request.readyState === 4){
          goodNews();
        } else {
          badNews(msg.fail);
        }
      });
    } );
  }
  
  
  /////////////////   validate tel inputs  ///////////////////////
  let tels = document.querySelectorAll('input[type="tel"]');
  
  [].forEach.call(tels, (el =>{
    el.addEventListener('input', evt =>{
      if ( !el.oldValue ) {el.oldValue = '';} // в js всё объекты, так что лепим свои свойства
      
      if ( /^\+?[()\d \-]*$/.test(el.value) || el.value === '' ){
        el.oldValue = el.value;
        // el.classList.remove(':invalid');
      } else {
        el.value = el.oldValue;
        // el.classList.add(':invalid');
      }
    });
  }));
  
}