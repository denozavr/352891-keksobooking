'use strict';

(function () {

  var RoomOption = {
    '1': ['для 1 гостя'],
    '2': ['для 1 гостя', 'для 2 гостей'],
    '3': ['для 1 гостя', 'для 2 гостей', 'для 3 гостей'],
    '100': ['не для гостей']
  };

  var TitleLimit = {
    MIN: 30,
    MAX: 100
  };

  var InvalidMessage = {
    TITLE: 'Title should be from 30 to 100 characters.',
    PRICE: 'Price cannot be empty',
  };


  var formElement = document.querySelector('.ad-form');
  var mapFilterElement = document.querySelector('.map__filters');

  var inputTitleElement = formElement.querySelector('#title');
  var inputPriceElement = formElement.querySelector('#price');
  var inputTypeElement = formElement.querySelector('#type');
  var inputsСheckInOutElement = formElement.querySelectorAll('.ad-form__element--time select');
  var inputRoomsElement = formElement.querySelector('#room_number');
  var inputCapacityElement = formElement.querySelector('#capacity');
  var inputAddressElement = formElement.querySelector('#address');
  var buttonResetElement = formElement.querySelector('.ad-form__reset');

  var inputTypeInitialValue = inputTypeElement.value;
  var inputRoomsInitialValue = inputRoomsElement.value;

  // disable all fieldsets and selects
  var formElements = document.querySelectorAll('fieldset, select');
  var disableFormElements = function (disable) {
    for (var i = 0; i < formElements.length; i++) {
      formElements[i].disabled = disable;
    }
  };
  disableFormElements(true);


  var setAddress = function (coordinates) {
    inputAddressElement.value = coordinates;
  };

  var setMinPrice = function () {
    var minCost = window.utils.ApartType[inputTypeElement.value].MIN_PRICE;
    inputPriceElement.min = minCost;
    inputPriceElement.placeholder = minCost;
  };

  // set the same checkin and checkout times
  var changeTimes = function (evt) {
    inputsСheckInOutElement.forEach(function (item) {
      if (evt.target.value !== item.value) {
        item.value = evt.target.value;
      }
    });
  };

  var inputTitleInvalidListener = function (evt) {
    if (evt.target.value.length < TitleLimit.MIN ||
      evt.target.value.length > TitleLimit.MAX) {
      inputTitleElement.setCustomValidity(InvalidMessage.TITLE);
    } else {
      inputTitleElement.setCustomValidity('');
    }
  };

  var inputPriceInvalidListener = function (evt) {
    if (!evt.target.value) {
      inputPriceElement.setCustomValidity(InvalidMessage.PRICE);
    } else {
      inputPriceElement.setCustomValidity('');
    }
  };

  var updateRoom = function () {
    var room = inputRoomsElement.value;
    var placesForRoom = RoomOption[room];
    inputCapacityElement.textContent = '';
    placesForRoom.forEach(function (item, i) {
      var forPlacesOption = document.createElement('option');
      forPlacesOption.textContent = item;
      forPlacesOption.value = (+room > 3) ? 0 : i + 1;
      inputCapacityElement.appendChild(forPlacesOption);
    });
  };

  var onFilterChange = window.utils.setDebounce(function () {
    var filteredPins = window.filter.getFiltered(window.pin.getAllPins());

    window.card.hideCard();
    window.pin.deletePins();
    window.pin.createPins(filteredPins);
  });

  var onFormReset = function () {
    setInitialPageState();
  };

  var initForm = function () {
    inputsСheckInOutElement.forEach(function (select) {
      select.addEventListener('change', changeTimes);
    });
    inputRoomsElement.addEventListener('change', updateRoom);
    inputTypeElement.addEventListener('change', setMinPrice);
    inputTitleElement.addEventListener('invalid', inputTitleInvalidListener);
    inputTitleElement.addEventListener('blur', inputTitleInvalidListener);
    inputPriceElement.addEventListener('invalid', inputPriceInvalidListener);
    inputPriceElement.addEventListener('blur', inputPriceInvalidListener);
    formElement.addEventListener('submit', formSubmitHandler);
    buttonResetElement.addEventListener('click', onFormReset);

    mapFilterElement.addEventListener('change', onFilterChange);

    setMinPrice();
    updateRoom();
  };

  var makeFormActive = function () {
    formElement.classList.remove('ad-form--disabled');
    window.photoUpload.enableUpload();
  };

  // set initial values for Type -> MinPrice and Rooms -> Capacity
  var setInitialInputsValue = function () {
    inputTypeElement.value = inputTypeInitialValue;
    setMinPrice();
    inputRoomsElement.value = inputRoomsInitialValue;
    updateRoom();
  };

  var removeEventListeners = function () {
    inputsСheckInOutElement.forEach(function (select) {
      select.removeEventListener('change', changeTimes);
    });
    inputRoomsElement.removeEventListener('change', updateRoom);
    inputTypeElement.removeEventListener('change', setMinPrice);
    inputTitleElement.removeEventListener('invalid', inputTitleInvalidListener);
    inputTitleElement.removeEventListener('blur', inputTitleInvalidListener);
    inputPriceElement.removeEventListener('invalid', inputPriceInvalidListener);
    inputPriceElement.removeEventListener('blur', inputPriceInvalidListener);
    formElement.removeEventListener('submit', formSubmitHandler);
    buttonResetElement.removeEventListener('click', onFormReset);
    mapFilterElement.removeEventListener('change', onFilterChange);
  };

  var makeFormInactive = function () {
    setInitialInputsValue();
    removeEventListeners();
    if (!formElement.classList.contains('ad-form--disabled')) {
      formElement.classList.add('ad-form--disabled');
    }
    formElement.reset();
    mapFilterElement.reset();
    window.photoUpload.resetUpload();
    disableFormElements(true);
  };

  var hideMessage = function () {
    var dialog = document.querySelector('.success, .error');

    dialog.remove();
    document.removeEventListener('keydown', onKeydown);
    document.removeEventListener('click', hideMessage);
  };

  var onKeydown = function (evt) {
    window.utils.checkEscape(evt, hideMessage);
  };

  var onClick = function () {
    hideMessage();
  };

  var showSuccessMessage = function () {
    var template = document.querySelector('#success').content.cloneNode(true);
    var main = document.body.querySelector('main');

    main.appendChild(template);
    document.addEventListener('keydown', onKeydown);
    document.addEventListener('click', hideMessage);
  };

  var showError = function () {
    var template = document.querySelector('#error').content.cloneNode(true);
    var main = document.body.querySelector('main');

    main.appendChild(template);

    document.addEventListener('keydown', onKeydown);
    document.addEventListener('click', onClick);
  };


  var formSubmitHandler = function (evt) {
    evt.preventDefault();
    window.backend.sendData(new FormData(formElement), setSuccess, showError);
  };

  var setInitialPageState = function () {
    setMinPrice();
    updateRoom();

    window.map.fadeMap();
    makeFormInactive();
    window.map.resetMainPinPosition();
    window.pin.deletePins();
    window.card.hideCard();
  };

  var setSuccess = function () {
    setInitialPageState();
    showSuccessMessage();
  };

  window.form = {
    setAddress: setAddress,
    disableFormElements: disableFormElements,
    initForm: initForm,
    makeFormActive: makeFormActive
  };
})();
