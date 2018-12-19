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

  var inputTitle = formElement.querySelector('#title');
  var inputPrice = formElement.querySelector('#price');
  var inputType = formElement.querySelector('#type');
  var inputСheckInOut = formElement.querySelectorAll('.ad-form__element--time select');
  var inputRooms = formElement.querySelector('#room_number');
  var inputCapacity = formElement.querySelector('#capacity');
  var inputAddress = formElement.querySelector('#address');
  var buttonReset = formElement.querySelector('.ad-form__reset');

  var inputTypeInitialValue = inputType.value;
  var inputRoomsInitialValue = inputRooms.value;

  // disable all fieldsets and selects
  var formElements = document.querySelectorAll('fieldset, select');
  var disableFormElements = function (disable) {
    for (var i = 0; i < formElements.length; i++) {
      formElements[i].disabled = disable;
    }
  };
  disableFormElements(true);


  var setAddress = function (coordinates) {
    inputAddress.value = coordinates;
  };

  var setMinPrice = function () {
    var minCost = window.utils.ApartType[inputType.value].MIN_PRICE;
    inputPrice.min = minCost;
    inputPrice.placeholder = minCost;
  };

  // set the same checkin and checkout times
  var changeTimes = function (evt) {
    inputСheckInOut.forEach(function (item) {
      if (evt.target.value !== item.value) {
        item.value = evt.target.value;
      }
    });
  };

  var inputTitleInvalidListener = function (evt) {
    if (evt.target.value.length < TitleLimit.MIN ||
      evt.target.value.length > TitleLimit.MAX) {
      inputTitle.setCustomValidity(InvalidMessage.TITLE);
    } else {
      inputTitle.setCustomValidity('');
    }
  };

  var inputPriceInvalidListener = function (evt) {
    if (!evt.target.value) {
      inputPrice.setCustomValidity(InvalidMessage.PRICE);
    } else {
      inputPrice.setCustomValidity('');
    }
  };

  var updateRoom = function () {
    var room = inputRooms.value;
    var placesForRoom = RoomOption[room];
    inputCapacity.textContent = '';
    placesForRoom.forEach(function (item, i) {
      var forPlacesOption = document.createElement('option');
      forPlacesOption.textContent = item;
      forPlacesOption.value = (+room > 3) ? 0 : i + 1;
      inputCapacity.appendChild(forPlacesOption);
    });
  };

  var onFilterChange = window.utils.setDebounce(function () {
    var filteredPins = window.filter.getFiltered(window.pin.getAllPins());

    window.card.hideCard();
    window.pin.deletePins();
    window.pin.createPins(filteredPins);
  });

  var initForm = function () {
    inputСheckInOut.forEach(function (select) {
      select.addEventListener('change', changeTimes);
    });
    inputRooms.addEventListener('change', updateRoom);
    inputType.addEventListener('change', setMinPrice);
    inputTitle.addEventListener('invalid', inputTitleInvalidListener);
    inputTitle.addEventListener('blur', inputTitleInvalidListener);
    inputPrice.addEventListener('invalid', inputPriceInvalidListener);
    inputPrice.addEventListener('blur', inputPriceInvalidListener);
    formElement.addEventListener('submit', formSubmitHandler);

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
    inputType.value = inputTypeInitialValue;
    setMinPrice();
    inputRooms.value = inputRoomsInitialValue;
    updateRoom();
  };

  var makeFormInactive = function () {
    setInitialInputsValue();
    if (!formElement.classList.contains('ad-form--disabled')) {
      formElement.classList.add('ad-form--disabled');
    }
    formElement.reset();
    window.photoUpload.resetUpload();
    disableFormElements(true);
  };

  var hideMessage = function () {
    var dialog = document.querySelector('.success, .error');

    dialog.remove();
    document.removeEventListener('keydown', onKeydown);
    document.removeEventListener('click', onClick);
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
    document.addEventListener('click', onClick);
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

  var onFormReset = function () {
    setInitialPageState();
  };

  var setSuccess = function () {
    setInitialPageState();

    showSuccessMessage();
  };

  buttonReset.addEventListener('click', onFormReset);


  window.form = {
    setAddress: setAddress,
    disableFormElements: disableFormElements,
    initForm: initForm,
    makeFormActive: makeFormActive
  };
})();
