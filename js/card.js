'use strict';

(function () {

  var mapElement = document.querySelector('section.map');
  var mapCardTemplate = document.querySelector('#card').content.querySelector('.map__card');
  var cardElement = mapCardTemplate.cloneNode(true);
  var popupCloseElement = cardElement.querySelector('.popup__close');

  var fragment = document.createDocumentFragment();

  var createFeatures = function (elements) {
    elements.forEach(function (feature) {
      var featureItem = document.createElement('li');
      featureItem.className = 'popup__feature popup__feature--' + feature;
      featureItem.title = feature;
      fragment.appendChild(featureItem);
    });
    return fragment;
  };

  var createPhotos = function (elements) {
    // sort photos randomly
    elements = window.utils.sortRandomly(elements);
    for (var i = 0; i < elements.length; i++) {
      var photo = document.createElement('img');
      photo.className = 'popup__photo';
      photo.src = elements[i];
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
    cardElement.querySelector('.popup__text--price').textContent = offer.price > 0 ? offer.price + '₽/ночь' : '';
    cardElement.querySelector('.popup__type').textContent = window.utils.ApartType[offer.type].TITLE;

    cardElement.querySelector('.popup__text--capacity').textContent = (offer.rooms > 0 && offer.guests > 0) ? offer.rooms + ' комнаты для ' + offer.guests + ' гостей' : '';
    cardElement.querySelector('.popup__text--time').textContent = (parseInt(offer.checkin, 10) > 0 && parseInt(offer.checkout, 10) > 0) ? 'заезд после ' + offer.checkin + ', ' + 'выезд до ' + offer.checkout : '';
    cardElement.querySelector('.popup__description').textContent = offer.description;

    cardElement.querySelector('.popup__features').innerHTML = '';
    cardElement.querySelector('.popup__features').appendChild(createFeatures(offer.features));
    cardElement.querySelector('.popup__photos').innerHTML = '';
    cardElement.querySelector('.popup__photos').appendChild(createPhotos(offer.photos));

    mapElement.appendChild(cardElement);
  };

  var onKeyDown = function (evt) {
    window.utils.checkEscape(evt, hideCard);
  };

  var onClick = function () {
    hideCard();
  };


  var showCard = function (evt, adverts) {
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
    // close Card(advert) popup on cross click and ESC button
    mapElement.addEventListener('keydown', onKeyDown);
    popupCloseElement.addEventListener('click', onClick);
  };

  var hideCard = function () {
    var card = mapElement.querySelector('.map__card.popup');

    if (card) {
      mapElement.removeEventListener('keydown', onKeyDown);
      popupCloseElement.removeEventListener('click', onClick);
      card.remove();
    }
  };

  window.card = {
    show: showCard,
    hide: hideCard
  };
})();
