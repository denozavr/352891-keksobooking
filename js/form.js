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

  var onChangePrice = function () {
    var minCost = window.utils.ApartType[inputTypeElement.value].MIN_PRICE;
    inputPriceElement.min = minCost;
    inputPriceElement.placeholder = minCost;
  };

  // set the same checkin and checkout times
  var onChangeTimes = function (evt) {
    inputsСheckInOutElement.forEach(function (item) {
      if (evt.target.value !== item.value) {
        item.value = evt.target.value;
      }
    });
  };

  var onInvalidTitle = function (evt) {
    if (evt.target.value.length < TitleLimit.MIN ||
      evt.target.value.length > TitleLimit.MAX) {
      inputTitleElement.setCustomValidity(InvalidMessage.TITLE);
    } else {
      inputTitleElement.setCustomValidity('');
    }
  };

  var onInvalidPrice = function (evt) {
    if (!evt.target.value) {
      inputPriceElement.setCustomValidity(InvalidMessage.PRICE);
    } else {
      inputPriceElement.setCustomValidity('');
    }
  };

  var onChangeRoom = function () {
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
      select.addEventListener('change', onChangeTimes);
    });
    inputRoomsElement.addEventListener('change', onChangeRoom);
    inputTypeElement.addEventListener('change', onChangePrice);
    inputTitleElement.addEventListener('invalid', onInvalidTitle);
    inputTitleElement.addEventListener('blur', onInvalidTitle);
    inputPriceElement.addEventListener('invalid', onInvalidPrice);
    inputPriceElement.addEventListener('blur', onInvalidPrice);
    formElement.addEventListener('submit', onFormSubmit);
    buttonResetElement.addEventListener('click', onFormReset);

    mapFilterElement.addEventListener('change', onFilterChange);

    onChangePrice();
    onChangeRoom();
  };

  var makeFormActive = function () {
    formElement.classList.remove('ad-form--disabled');
    window.photoUpload.enableUpload();
  };

  // set initial values for Type -> MinPrice and Rooms -> Capacity
  var setInitialInputsValue = function () {
    inputTypeElement.value = inputTypeInitialValue;
    onChangePrice();
    inputRoomsElement.value = inputRoomsInitialValue;
    onChangeRoom();
  };

  var removeEventListeners = function () {
    inputsСheckInOutElement.forEach(function (select) {
      select.removeEventListener('change', onChangeTimes);
    });
    inputRoomsElement.removeEventListener('change', onChangeRoom);
    inputTypeElement.removeEventListener('change', onChangePrice);
    inputTitleElement.removeEventListener('invalid', onInvalidTitle);
    inputTitleElement.removeEventListener('blur', onInvalidTitle);
    inputPriceElement.removeEventListener('invalid', onInvalidPrice);
    inputPriceElement.removeEventListener('blur', onInvalidPrice);
    formElement.removeEventListener('submit', onFormSubmit);
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

  var onFormSubmit = function (evt) {
    evt.preventDefault();
    window.backend.sendData(new FormData(formElement), setSuccess, window.modal.showErrorMessage);
  };

  var setInitialPageState = function () {
    onChangePrice();
    onChangeRoom();

    window.map.fadeMap();
    makeFormInactive();
    window.map.resetMainPinPosition();
    window.pin.deletePins();
    window.card.hideCard();
  };

  var setSuccess = function () {
    setInitialPageState();
    window.modal.showSuccessMessage();
  };

  window.form = {
    setAddress: setAddress,
    disableFormElements: disableFormElements,
    initForm: initForm,
    makeFormActive: makeFormActive,
    setInitialPageState: setInitialPageState
  };
})();
