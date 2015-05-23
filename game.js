;(function (window) {
  "use strict";

  var gameData = {
    challenges: [
      { question: "question1", answer: "answer"},
      { question: "question2", answer: "answer"},
      { question: "question3", answer: "answer"},
      { question: "question4", answer: "answer"},
      { question: "question5", answer: "answer"},
      { question: "question6", answer: "answer"},
      { question: "question7", answer: "answer"},
      { question: "question8", answer: "answer"},
      { question: "question9", answer: "answer"},
      { question: "question10", answer: "answer"}
    ]
  },
  createGameArea = function (selector) {
    var doc = window.document,
        gameArea = doc.createElement("div"),
        startButton = doc.createElement("button"),
        timer = document.createElement("span");

    gameArea.setAttribute("class", "game-area");
    startButton.innerText = "Start";
    startButton.setAttribute("id", "game-start-button");
    startButton.onclick = window.Game.start;
    timer.setAttribute("id", "timer");
    gameArea.appendChild(startButton);
    gameArea.appendChild(timer);
    doc.querySelector(selector).appendChild(gameArea);
  },
  disableStartButton = function () {
    window.document.querySelector("#game-start-button").disabled = true;
  };

  window.Game = {
    init: function (selector) {
      createGameArea(selector);
    },
    start: function () {
      window.CountDownTimer.start("#timer", 10, function () {alert("time over"); });
    }
  };
})(window);