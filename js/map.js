'use strict';

(function () {

  var MainPinSize = {
    HEIGHT: 80,
    WIDTH: 62
  };

  var mapElement = document.querySelector('section.map');

  var getMainPinCoordinates = function (el) {
    return Math.floor(parseInt(el.style.left, 10) + MainPinSize.WIDTH / 2) + ', ' + Math.floor(parseInt(el.style.top, 10) + MainPinSize.HEIGHT);
  };

  var pinMainElement = document.querySelector('.map__pin--main');
  window.form.setAddress(getMainPinCoordinates(pinMainElement));

  var InitialMainPinPosition = {
    TOP: parseInt(pinMainElement.style.top, 10),
    LEFT: parseInt(pinMainElement.style.left, 10)
  };

  // click on mainPin and write input address
  var makePageActiveIfFaded = function () {
    if (mapElement.classList.contains('map--faded')) {

      mapElement.classList.remove('map--faded');
      window.form.makeFormActive();

      window.form.disableFormElements(false);

      window.pin.createPins();
      window.form.initForm();
    }
  };

  var setMainPinCoordinates = function (x, y) {
    var positionY = pinMainElement.offsetTop - y;
    var positionX = pinMainElement.offsetLeft - x;

    if (positionY < window.utils.Location.MAX_Y && positionY > (window.utils.Location.MIN_Y - MainPinSize.HEIGHT)) {
      pinMainElement.style.top = positionY + 'px';
    }

    if (positionX < (window.utils.Location.MAX_X - MainPinSize.WIDTH) && positionX > window.utils.Location.MIN_X) {
      pinMainElement.style.left = positionX + 'px';
    }

    window.form.setAddress(getMainPinCoordinates(pinMainElement));
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
      window.form.setAddress(getMainPinCoordinates(pinMainElement));
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);

  });

  var fadeMap = function () {
    if (!mapElement.classList.contains('map--faded')) {
      mapElement.classList.add('map--faded');
    }
  };

  var resetMainPinPosition = function () {
    pinMainElement.style.top = (InitialMainPinPosition.TOP) + 'px';
    pinMainElement.style.left = (InitialMainPinPosition.LEFT) + 'px';
    window.form.setAddress(getMainPinCoordinates(pinMainElement)); // set initial address for MainPin
  };


  window.map = {
    fadeMap: fadeMap,
    resetMainPinPosition: resetMainPinPosition
  };

})();
