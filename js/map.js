'use strict';


var LocationX = {
  MIN: 250,
  MAX: 1000
};

var LocationY = {
  MIN: 130,
  MAX: 630
};

var Price = {
  MIN: 1000,
  MAX: 1000000
};

var RoomCount = {
  MIN: 1,
  MAX: 5
};

var GuestCount = {
  MIN: 1,
  MAX: 10
};

var Keys = {
  ESC: 27
};

var TITLES = [
  'Большая уютная квартира',
  'Маленькая неуютная квартира',
  'Огромный прекрасный дворец',
  'Маленький ужасный дворец',
  'Красивый гостевой домик',
  'Некрасивый негостеприимный домик',
  'Уютное бунгало далеко от моря',
  'Неуютное бунгало по колено в воде'
];
// var types = ['palace', 'flat', 'house', 'bungalo'];
// var types = [
//   {eng: 'palace', rus: 'дворец'},
//   {eng: 'flat', rus: 'квартира'},
//   {eng: 'house', rus: 'дом'},
//   {eng: 'bungalo', rus: 'бунгало'}];
var TYPES = [
  {palace: 'Дворец'},
  {flat: 'Квартира'},
  {house: 'Дом'},
  {bungalo: 'Бунгало'}
];

var CHECKINS = ['12:00', '13:00', '14:00'];
var CHECKOUTS = CHECKINS;

var FEATURES = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner'
];
var PHOTOS = [
  'http://o0.github.io/assets/images/tokyo/hotel3.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel2.jpg'
];

var getRandomNumber = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

var randomSort = function () {
  return 0.5 - Math.random();
};

var mapElement = document.querySelector('section.map');
// mapElement.classList.remove('map--faded'); // delete map--faded

var mapCardTemplate = document.querySelector('#card').content.querySelector('.map__card');
var cardElement = mapCardTemplate.cloneNode(true);

var mapPinsElement = mapElement.querySelector('.map__pins');
var mapPinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

var fragment = document.createDocumentFragment();

var adverts = [];
var createAdvertsList = function () {
  for (var i = 0; i < 8; i++) {
    adverts.push({
      author: {
        avatar: 'img/avatars/user0' + (i + 1) + '.png'
      },
      offer: {
        title: TITLES[i],
        address: getRandomNumber(LocationX.MIN, LocationX.MAX) + ', ' + getRandomNumber(LocationY.MIN, LocationY.MAX),
        price: getRandomNumber(Price.MIN, Price.MAX),
        type: TYPES[getRandomNumber(0, TYPES.length - 1)],
        rooms: getRandomNumber(RoomCount.MIN, RoomCount.MAX),
        guests: getRandomNumber(GuestCount.MIN, GuestCount.MAX),
        checkin: CHECKINS[getRandomNumber(0, CHECKINS.length - 1)],
        checkout: CHECKOUTS[getRandomNumber(0, CHECKOUTS.length - 1)],
        features: FEATURES.slice(0, getRandomNumber(1, FEATURES.length)), // slice doesn't use end index so [last array index + 1]
        description: '',
        photos: PHOTOS.sort(randomSort)
      },
      location: {
        x: getRandomNumber(LocationX.MIN, LocationX.MAX), // TODO: calculate later via document.querySelector('.map__overlay').offsetWidth/height - pin size
        y: getRandomNumber(LocationY.MIN, LocationY.MAX)
      }
    });
  }
};
createAdvertsList();


var createPins = function (array) {
  for (var i = 0; i < array.length; i++) {

    var pinElement = mapPinTemplate.cloneNode(true);
    pinElement.style = 'left:' + adverts[i].location.x + 'px; top:' + adverts[i].location.y + 'px';
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
  cardElement.querySelector('.popup__type').textContent = Object.values(offer.type);
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

var formElement = document.querySelector('.ad-form');
var pinMainElement = mapElement.querySelector('.map__pin--main');
var inputAddress = formElement.querySelector('#address');
inputAddress.value = parseInt(pinMainElement.style.top, 10) + ', ' + parseInt(pinMainElement.style.left, 10);

// click on mainPin and write input address
pinMainElement.addEventListener('mouseup', function () {
  if (mapElement.classList.contains('map--faded')) {

    mapElement.classList.remove('map--faded');
    formElement.classList.remove('ad-form--disabled');

    disableFormElements(false);
    inputAddress.disabled = true;

    createPins(adverts);
  }

  inputAddress.value = parseInt(pinMainElement.style.top, 10) + ', ' + parseInt(pinMainElement.style.left, 10);
});

// move/drag mainPin
// https://stackoverflow.com/questions/6073505/what-is-the-difference-between-screenx-y-clientx-y-and-pagex-y
pinMainElement.addEventListener('mousedown', function (evt) {
  var startPosition = {
    x: evt.clientX,
    y: evt.clientY
  };

  var onMouseMove = function (moveEvent) {
    var changePosition = {
      x: startPosition.x - moveEvent.clientX,
      y: startPosition.y - moveEvent.clientY,
    };

    startPosition = {
      x: moveEvent.clientX,
      y: moveEvent.clientY
    };

    pinMainElement.style.top = (pinMainElement.offsetTop - changePosition.y) + 'px';
    pinMainElement.style.left = (pinMainElement.offsetLeft - changePosition.x) + 'px';
  };

  var onMouseUp = function () {
    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);
  };

  document.addEventListener('mousemove', onMouseMove);
  document.addEventListener('mouseup', onMouseUp);

});

// click on pin and show Card(advert) popup
mapPinsElement.addEventListener('click', function (evt) {
  var index = evt.target.dataset.advertId;
  var parentElement = evt.target.parentElement;
  if (evt.target.tagName === 'BUTTON') {
    createCard(adverts[index]);
    cardElement.classList.remove('hidden');
  } else if (evt.target.tagName === 'IMG' && parentElement.className === 'map__pin') {
    index = parentElement.dataset.advertId;
    createCard(adverts[index]);
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
