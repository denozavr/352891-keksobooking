'use strict';

// #region Move later to utils.js
var LocationX = {
  MIN: 0,
  MAX: 1200
};

var LocationY = {
  MIN: 130,
  MAX: 630
};

var ApartType = {
  'palace': {
    TITLE: 'Дворец',
    MIN_PRICE: 10000
  },
  'house': {
    TITLE: 'Дом',
    MIN_PRICE: 5000
  },
  'flat': {
    TITLE: 'Квартира',
    MIN_PRICE: 1000
  },
  'bungalo': {
    TITLE: 'Бунгало',
    MIN_PRICE: 0
  }
};
// #endregion


var MainPinSize = {
  HEIGHT: 80,
  WIDTH: 62
};

var Keys = {
  ESC: 27
};

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

var mapElement = document.querySelector('section.map');
// mapElement.classList.remove('map--faded'); // delete map--faded

var mapCardTemplate = document.querySelector('#card').content.querySelector('.map__card');
var cardElement = mapCardTemplate.cloneNode(true);

var mapPinsElement = mapElement.querySelector('.map__pins');
var mapPinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

var fragment = document.createDocumentFragment();


var createPins = function (array) {
  for (var i = 0; i < array.length; i++) {
    var adverts = window.data.getData;

    var pinElement = mapPinTemplate.cloneNode(true);
    pinElement.style.left = adverts[i].location.x + 'px';
    pinElement.style.top = adverts[i].location.y + 'px';
    pinElement.dataset.advertId = i;
    var pinImageElement = pinElement.querySelector('img');
    pinImageElement.src = adverts[i].author.avatar;
    pinImageElement.alt = adverts[i].offer.title;
    pinImageElement.title = adverts[i].offer.title;

    fragment.appendChild(pinElement);
  }

  mapPinsElement.appendChild(fragment);
};

// createPins(adverts);


var createFeatures = function (array) {
  for (var i = 0; i < array.length; i++) {
    var featureItem = document.createElement('li');
    featureItem.className = 'popup__feature popup__feature--' + array[i];
    featureItem.title = array[i];
    fragment.appendChild(featureItem);
  }
  return fragment;
};

var createPhotos = function (array) {
  for (var i = 0; i < array.length; i++) {
    var photo = document.createElement('img');
    photo.className = 'popup__photo';
    photo.src = array[i];
    photo.width = '45';
    photo.height = '40';
    photo.alt = 'Фотография жилья';
    photo.title = 'Фотография жилья';
    fragment.appendChild(photo);
  }
  return fragment;
};

var createCard = function (advert) {
  var offer = advert.offer;
  cardElement.querySelector('img').src = advert.author.avatar;
  cardElement.querySelector('.popup__title').textContent = offer.title;
  cardElement.querySelector('.popup__text--address').textContent = offer.address;
  cardElement.querySelector('.popup__text--price').textContent = offer.price + '₽/ночь';
  cardElement.querySelector('.popup__type').textContent = offer.type;
  cardElement.querySelector('.popup__text--capacity').textContent = offer.rooms + ' комнаты для ' + offer.guests + ' гостей';
  cardElement.querySelector('.popup__text--time').textContent = 'заезд после ' + offer.checkin + ', ' + 'выезд до ' + offer.checkout;
  cardElement.querySelector('.popup__description').textContent = offer.description;

  cardElement.querySelector('.popup__features').innerHTML = '';
  cardElement.querySelector('.popup__features').appendChild(createFeatures(offer.features));
  cardElement.querySelector('.popup__photos').innerHTML = '';
  cardElement.querySelector('.popup__photos').appendChild(createPhotos(offer.photos));

  mapElement.appendChild(cardElement);
};

// createCard(adverts[getRandomNumber(0, adverts.length - 1)]);

// disable all fieldsets and selects
var formElements = document.querySelectorAll('fieldset, select');
var disableFormElements = function (disable) {
  for (var i = 0; i < formElements.length; i++) {
    formElements[i].disabled = disable;
  }
};
disableFormElements(true);

var getMainPinCoordinates = function (el) {
  return Math.floor(parseInt(el.style.left, 10) + MainPinSize.WIDTH / 2) + ', ' + Math.floor(parseInt(el.style.top, 10) + MainPinSize.HEIGHT);
};


var formElement = document.querySelector('.ad-form');
var pinMainElement = mapElement.querySelector('.map__pin--main');

var inputTitle = formElement.querySelector('#title');
var inputPrice = formElement.querySelector('#price');
var inputType = formElement.querySelector('#type');
var inputСheckInOut = formElement.querySelectorAll('.ad-form__element--time select');
var inputRooms = formElement.querySelector('#room_number');
var inputCapacity = formElement.querySelector('#capacity');
var inputAddress = formElement.querySelector('#address');
inputAddress.value = getMainPinCoordinates(pinMainElement);

// click on mainPin and write input address
var makePageActiveIfFaded = function () {
  if (mapElement.classList.contains('map--faded')) {

    mapElement.classList.remove('map--faded');
    formElement.classList.remove('ad-form--disabled');

    disableFormElements(false);
    inputAddress.disabled = true;

    createPins(window.data.getData);
    initForm();
  }
};

var setMainPinCoordinates = function (x, y) {
  var positionY = pinMainElement.offsetTop - y;
  var positionX = pinMainElement.offsetLeft - x;

  if (positionY < LocationY.MAX && positionY > (LocationY.MIN - MainPinSize.HEIGHT)) {
    pinMainElement.style.top = positionY + 'px';
  }

  if (positionX < (LocationX.MAX - MainPinSize.WIDTH) && positionX > LocationX.MIN) {
    pinMainElement.style.left = positionX + 'px';
  }

  inputAddress.value = getMainPinCoordinates(pinMainElement);
};

// move/drag mainPin
// https://stackoverflow.com/questions/6073505/what-is-the-difference-between-screenx-y-clientx-y-and-pagex-y
pinMainElement.addEventListener('mousedown', function (evt) {
  var startPosition = {
    x: evt.clientX,
    y: evt.clientY
  };

  var onMouseMove = function (moveEvent) {
    moveEvent.preventDefault();
    var changePosition = {
      x: startPosition.x - moveEvent.clientX,
      y: startPosition.y - moveEvent.clientY
    };

    startPosition = {
      x: moveEvent.clientX,
      y: moveEvent.clientY
    };

    setMainPinCoordinates(changePosition.x, changePosition.y);
  };

  var onMouseUp = function (upEvent) {
    upEvent.preventDefault();
    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);

    makePageActiveIfFaded();
    inputAddress.value = getMainPinCoordinates(pinMainElement);
  };

  document.addEventListener('mousemove', onMouseMove);
  document.addEventListener('mouseup', onMouseUp);

});

// click on pin and show Card(advert) popup
mapPinsElement.addEventListener('click', function (evt) {
  var index = evt.target.dataset.advertId;
  var parentElement = evt.target.parentElement;
  if (evt.target.tagName === 'BUTTON') {
    createCard(window.data.getData[index]);
    cardElement.classList.remove('hidden');
  } else if (evt.target.tagName === 'IMG' && parentElement.className === 'map__pin') {
    index = parentElement.dataset.advertId;
    createCard(window.data.getData[index]);
    cardElement.classList.remove('hidden');
  }

});

// close Card(advert) popup on cross click and ESC button
cardElement.querySelector('.popup__close').addEventListener('click', function () {
  cardElement.classList.add('hidden');
});

mapElement.addEventListener('keydown', function (evt) {
  if (evt.keyCode === Keys.ESC) {
    cardElement.classList.add('hidden');
  }
});

var setMinPrice = function () {
  var minCost = ApartType[inputType.value].MIN_PRICE;
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
  if (evt.target.value.length < TitleLimit.MIN
    || evt.target.value.length > TitleLimit.MAX) {
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

var roomsUpdate = function () {
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

var initForm = function () {
  inputСheckInOut.forEach(function (select) {
    select.addEventListener('change', changeTimes);
  });
  inputRooms.addEventListener('change', roomsUpdate);
  inputType.addEventListener('change', setMinPrice);
  inputTitle.addEventListener('invalid', inputTitleInvalidListener);
  inputTitle.addEventListener('blur', inputTitleInvalidListener);
  inputPrice.addEventListener('invalid', inputPriceInvalidListener);
  inputPrice.addEventListener('blur', inputPriceInvalidListener);
  setMinPrice();
  roomsUpdate();
};
