;(function (window){
  "use strict";

  function getSecondsLeft(endTimeMS) {
    return Math.ceil(window.parseFloat((endTimeMS - Date.now())/1000));
  };

  window.CountDownTimer = {
    start: function (selector, timerSeconds) {
      var domNode = window.document.querySelector(selector),
          endTimeMS = Date.now() + timerSeconds * 1000,
          secondsLeft = getSecondsLeft(endTimeMS),
          updateCountDown = function () {
            secondsLeft = getSecondsLeft(endTimeMS);
            if (secondsLeft > 0) {
              window.setTimeout(updateCountDown, 1000);
            }
            domNode.innerText = secondsLeft;
          };

      domNode.innerText = timerSeconds;
      updateCountDown();
    }
  };
})(window);
