'use strict';

(function () {

  var mapPinsElement = document.querySelector('.map__pins');
  var mapPinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

  var fragment = document.createDocumentFragment();
  var adverts = [];

  var addPins = function (array) {
    for (var i = 0; i < array.length; i++) {
      adverts = array;

      if (!window.utils.checkifObjEmpty(adverts[i], 'offer')) {
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
    }

    mapPinsElement.appendChild(fragment);
  };

  var showError = function (error) {
    return error;
  };

  var createPins = function () {
    window.backend.loadData(addPins, showError);
  };

  var deletePins = function () {
    // hide all pins, except MainPin
    var items = document.querySelectorAll('.map__pin:not(.map__pin--main)');

    items.forEach(function (item) {
      item.remove();
    });
  };

  // click on pin and show Card(advert) popup
  mapPinsElement.addEventListener('click', function (evt) {
    window.card.showCard(evt, adverts);
  });

  window.pin = {
    createPins: createPins,
    deletePins: deletePins
  };
})();
