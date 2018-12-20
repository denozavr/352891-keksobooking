'use strict';

(function () {
  var onClick = function () {
    hideMessage();
  };

  var onKeydown = function (evt) {
    window.utils.checkEscape(evt, hideMessage);
  };

  var hideMessage = function () {
    var dialog = document.querySelector('.success, .error');

    dialog.remove();
    document.removeEventListener('keydown', onKeydown);
    document.removeEventListener('click', onClick);
  };

  var showSuccessMessage = function () {
    var template = document.querySelector('#success').content.cloneNode(true);
    var mainElement = document.body.querySelector('main');

    mainElement.appendChild(template);
    document.addEventListener('keydown', onKeydown);
    document.addEventListener('click', onClick);
  };

  var showErrorMessage = function (message) {
    var template = document.querySelector('#error').content.cloneNode(true);
    var mainElement = document.body.querySelector('main');

    // if could not load pins on intital MainPin drag (message comes from backend.js)
    if (message === 'Connection error') {
      var messageElement = template.querySelector('.error__message');
      messageElement.textContent = 'Ошибка соединения с интернетом или базой объявлений';
      window.form.setInitialPageState();
    }

    mainElement.appendChild(template);

    document.addEventListener('keydown', onKeydown);
    document.addEventListener('click', onClick);
  };

  window.modal = {
    showSuccessMessage: showSuccessMessage,
    showErrorMessage: showErrorMessage
  };
})();
