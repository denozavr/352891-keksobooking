'use strict';

(function () {
  var mapPinsElement = document.querySelector('.map__pins');
  var mapPinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

  var fragment = document.createDocumentFragment();


  var createPins = function (array) {
    for (var i = 0; i < array.length; i++) {
      var adverts = window.data.getAdvertsData;

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

  // click on pin and show Card(advert) popup
  mapPinsElement.addEventListener('click', function (evt) {
    window.card.showCard(evt);
  });

  window.pin = {
    createPins: createPins
  };
})();
