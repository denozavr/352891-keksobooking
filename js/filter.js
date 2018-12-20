'use strict';
(function () {
  var Price = {
    LOW: 10000,
    MIDDLE: 50000
  };

  var FILTER_INITIAL = 'any';
  var filtersElement = document.querySelector('.map__filters');
  var filterTypeInputElement = filtersElement.querySelector('#housing-type');
  var filterPriceInputElement = filtersElement.querySelector('#housing-price');
  var filterRoomInputElement = filtersElement.querySelector('#housing-rooms');
  var filterGuestInputElement = filtersElement.querySelector('#housing-guests');

  var filterType = function (pin) {
    return filterTypeInputElement.value === FILTER_INITIAL ? true :
      pin.offer.type === filterTypeInputElement.value;
  };

  var filterPrice = function (pin) {
    switch (filterPriceInputElement.value) {
      case 'low':
        return pin.offer.price < Price.LOW;
      case 'middle':
        return pin.offer.price >= Price.LOW && pin.offer.price <= Price.MIDDLE;
      case 'high':
        return pin.offer.price > Price.MIDDLE;
      default:
        return true;
    }
  };

  var filterRoom = function (pin) {
    return filterRoomInputElement.value === FILTER_INITIAL ? true :
      pin.offer.rooms === parseInt(filterRoomInputElement.value, 10);
  };

  var filterGuest = function (pin) {
    return filterGuestInputElement.value === FILTER_INITIAL ? true :
      pin.offer.guests === parseInt(filterGuestInputElement.value, 10);
  };

  var filterFeature = function (pin) {
    var features = Array.from(filtersElement.querySelectorAll('.map__checkbox:checked'));
    return features.every(function (feature) {
      return pin.offer.features.includes(feature.value);
    });
  };

  var getFiltered = function (items) {
    return items.filter(function (item) {
      return filterType(item) && filterPrice(item) && filterRoom(item) &&
        filterGuest(item) && filterFeature(item);
    });
  };

  window.filter = {
    getFiltered: getFiltered
  };
})();
