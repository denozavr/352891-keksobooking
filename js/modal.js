'use strict';

(function () {

  var bodyElement = document.querySelector('body');
  var mainElement = bodyElement.querySelector('main');

  var onClick = function () {
    hideMessage();
  };

  var onKeydown = function (evt) {
    window.utils.checkEscape(evt, hideMessage);
  };

  var hideMessage = function () {
    var dialog = mainElement.querySelector('.success, .error');

    dialog.remove();
    bodyElement.removeEventListener('keydown', onKeydown);
    bodyElement.removeEventListener('click', onClick);
  };

  var showSuccessMessage = function () {
    var template = bodyElement.querySelector('#success').content.cloneNode(true);

    mainElement.appendChild(template);
    bodyElement.addEventListener('keydown', onKeydown);
    bodyElement.addEventListener('click', onClick);
  };

  var showErrorMessage = function (message) {
    var template = bodyElement.querySelector('#error').content.cloneNode(true);

    // if could not load pins on intital MainPin drag (message comes from backend.js)
    if (message === 'Connection error') {
      var messageElement = template.querySelector('.error__message');
      messageElement.textContent = 'Ошибка соединения с интернетом или базой объявлений';
      window.form.setInitialPageState();
    }

    mainElement.appendChild(template);

    bodyElement.addEventListener('keydown', onKeydown);
    bodyElement.addEventListener('click', onClick);
  };

  window.modal = {
    showSuccessMessage: showSuccessMessage,
    showErrorMessage: showErrorMessage
  };
})();
