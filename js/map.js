'use strict';

var titles = [
  'Большая уютная квартира',
  'Маленькая неуютная квартира',
  'Огромный прекрасный дворец',
  'Маленький ужасный дворец',
  'Красивый гостевой домик',
  'Некрасивый негостеприимный домик',
  'Уютное бунгало далеко от моря',
  'Неуютное бунгало по колено в воде'
];
var types = ['palace', 'flat', 'house', 'bungalo'];
var checkins = ['12:00', '13:00', '14:00'];
var checkouts = ['12:00', '13:00', '14:00'];
var facilities = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner'
];
var photos = [
  'http://o0.github.io/assets/images/tokyo/hotel3.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel2.jpg'
];

var getRandomNumber = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

var mapPinsElement = document.querySelector('.map__pins');
var mapPinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

var fragment = document.createDocumentFragment();

var offers = [];
var createPins = function () {
  for (var i = 0; i < 8; i++) {
    offers.push({
      author: {
        avatar: 'img/avatars/user0' + (i + 1) + '.png'
      },
      offer: {
        title: titles[i],
        address: location.x + ', ' + location.y,
        price: getRandomNumber(1000, 1000000),
        type: types[getRandomNumber(0, 3)],
        rooms: getRandomNumber(1, 5),
        guests: getRandomNumber(1, 7),
        checkin: checkins[getRandomNumber(0, 2)],
        checkout: checkouts[getRandomNumber(0, 2)],
        features: facilities.slice(0, getRandomNumber(0, 5)),
        description: '',
        photos: photos
      },
      location: {
        x: getRandomNumber(130, 1000), // TODO: calculate later via document.querySelector('.map__overlay').offsetWidth/height - pin size
        y: getRandomNumber(130, 630),
        cuemba: ''
      }
    });

    var pinElement = mapPinTemplate.cloneNode(true);
    pinElement.style = 'left:' + offers[i].location.x + 'px; top:' + offers[i].location.y + 'px';
    var pinImageElement = pinElement.querySelector('img');
    pinImageElement.src = offers[i].author.avatar;
    pinImageElement.alt = 'Pin' + i;
    pinImageElement.title = 'Pin' + i;

    fragment.appendChild(pinElement);
  }

  mapPinsElement.appendChild(fragment);
};

createPins();
