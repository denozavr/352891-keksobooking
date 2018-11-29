'use strict';


var MapConstant = {
  LOCATION_X_MIN: 130,
  LOCATION_X_MAX: 1070,
  LOCATION_Y_MIN: 130,
  LOCATION_Y_MAX: 630,
  PRICE_MIN: 1000,
  PRICE_MAX: 1000000,
  ROOMS_MIN: 1,
  ROOMS_MAX: 5,
  GUESTS_MIN: 1,
  GUESTS_MAX: 10,
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
mapElement.classList.remove('map--faded'); // delete map--faded

var mapCardTemplate = document.querySelector('#card').content.querySelector('.map__card');

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
        address: getRandomNumber(MapConstant.LOCATION_X_MIN, MapConstant.LOCATION_X_MAX) + ', ' + getRandomNumber(MapConstant.LOCATION_Y_MIN, MapConstant.LOCATION_Y_MAX),
        price: getRandomNumber(MapConstant.PRICE_MIN, MapConstant.PRICE_MAX),
        type: TYPES[getRandomNumber(0, TYPES.length - 1)],
        rooms: getRandomNumber(MapConstant.ROOMS_MIN, MapConstant.ROOMS_MAX),
        guests: getRandomNumber(MapConstant.GUESTS_MIN, MapConstant.GUESTS_MAX),
        checkin: CHECKINS[getRandomNumber(0, CHECKINS.length - 1)],
        checkout: CHECKOUTS[getRandomNumber(0, CHECKOUTS.length - 1)],
        features: FEATURES.slice(0, getRandomNumber(1, FEATURES.length)), // slice doesn't use end index so [last array index + 1]
        description: '',
        photos: PHOTOS.sort(randomSort)
      },
      location: {
        x: getRandomNumber(MapConstant.LOCATION_X_MIN, MapConstant.LOCATION_X_MAX), // TODO: calculate later via document.querySelector('.map__overlay').offsetWidth/height - pin size
        y: getRandomNumber(MapConstant.LOCATION_Y_MIN, MapConstant.LOCATION_Y_MAX)
      }
    });
  }
};
createAdvertsList();


var createPins = function (array) {
  for (var i = 0; i < array.length; i++) {

    var pinElement = mapPinTemplate.cloneNode(true);
    pinElement.style = 'left:' + adverts[i].location.x + 'px; top:' + adverts[i].location.y + 'px';
    var pinImageElement = pinElement.querySelector('img');
    pinImageElement.src = adverts[i].author.avatar;
    pinImageElement.alt = adverts[i].offer.title;
    pinImageElement.title = adverts[i].offer.title;

    fragment.appendChild(pinElement);
  }

  mapPinsElement.appendChild(fragment);
};

createPins(adverts);


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
  var cardElement = mapCardTemplate.cloneNode(true);
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

createCard(adverts[getRandomNumber(0, adverts.length - 1)]);


