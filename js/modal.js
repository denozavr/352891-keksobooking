'use strict';

(function () {

  var bodyElement = document.querySelector('body');
  var mainElement = bodyElement.querySelector('main');
  var errorTemplate = bodyElement.querySelector('#error').content.querySelector('.error');
  var successTemplate = bodyElement.querySelector('#success').content.querySelector('.success');

  var onClick = function () {
    hideMessage();
  };

  var onKeydown = function (evt) {
    window.utils.checkEscape(evt, hideMessage);
  };

  var hideMessage = function () {
    var dialogElement = mainElement.querySelector('.success, .error');

    dialogElement.remove();
    bodyElement.removeEventListener('keydown', onKeydown);
    bodyElement.removeEventListener('click', onClick);
  };

  var showSuccessMessage = function () {
    var successElement = successTemplate.cloneNode(true);

    mainElement.appendChild(successElement);
    bodyElement.addEventListener('keydown', onKeydown);
    bodyElement.addEventListener('click', onClick);
  };

  var showErrorMessage = function (message) {
    var errorElement = errorTemplate.cloneNode(true);

    // if could not load pins on intital MainPin drag (message comes from backend.js)
    if (message === 'Connection error') {
      var messageElement = errorElement.querySelector('.error__message');
      messageElement.textContent = 'Ошибка соединения с интернетом или базой объявлений';
      window.form.setInitialPageState();
    }

    mainElement.appendChild(errorElement);

    bodyElement.addEventListener('keydown', onKeydown);
    bodyElement.addEventListener('click', onClick);
  };

  window.modal = {
    showSuccessMessage: showSuccessMessage,
    showErrorMessage: showErrorMessage
  };
})();
