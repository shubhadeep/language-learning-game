;(function (window, $) {
  "use strict";

  var gameData = {},
  disableStartButton = function () {
    $("#game-start-button").prop("disabled", true);
  },
  reset = function () {
    nextQuestionIndex = 0;
    $("#game-start-button").prop("disabled", false);
    $(".answer-input").prop("disabled", true);
    $(".answer-input").val("");
    $(".question").text("");
  },
  answered = function (e) {
    var code = (e.keyCode ? e.keyCode : e.which),
        answer;
    if (code == 13) { //Enter keycode                        
      e.preventDefault();
      answer = $(".answer-input").val();
      renderFeedback(checkAnswer(answer));
      displayNextChallenge();
    }
  },
  renderFeedback = function (isCorrect) {
    var fDiv = $("<div>").attr("class", isCorrect? "correct-answer-feedback": "incorrect-answer-feedback");
    $(".game-feedback").append(fDiv);
  },
  checkAnswer = function (answer) {
    return currentAnswer.indexOf(answer) >= 0;
  },
  getNextQuestion = function () {
    return gameData.challenges[nextQuestionIndex];
  },
  nextQuestionIndex = 0,
  currentQuestion,
  currentAnswer,
  displayNextChallenge = function () {
    var nextQuestion = getNextQuestion();
    $(".question").text(nextQuestion.question);
    $(".answer-input").val("");
    currentQuestion = nextQuestion.question;
    currentAnswer = nextQuestion.answer;
    nextQuestionIndex += 1;
  },
  removeFeedbacks = function () {
    var feedbackDiv = $(".game-feedback"),
        feedbacks = feedbackDiv.find("div");

    if (feedbacks.length > 0) {
      for (var i=0; i < feedbacks.length; i++) {
        feedbackDiv.removeChild(feedbacks[i]);
      }
    }
  };
  window.Game = {
    init: function () {
      reset();
      $(".answer-input").on("keypress", answered);
      $.ajax("gamedata.json")
       .done(function (data) { gameData = data;});
    },
    start: function () {
      window.CountDownTimer.start("#timer", 20, reset);
      $(".answer-input").prop("disabled", false);
      disableStartButton();
      removeFeedbacks();
      displayNextChallenge();
    }
  };
})(window, jQuery);