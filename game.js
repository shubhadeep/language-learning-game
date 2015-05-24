;(function (window, $) {
  "use strict";

  var startButton = (function () {
        var element;

        return {
          init: function (el) {
            element = el;
          },
          reset: function () {
            element.prop("disabled", false);
          },
          disable: function () {
            element.prop("disabled", true);
          }   
        };
      })(),

      answerInput = (function () {
        var element;

        return {
          init: function (el, onAnswered) {
            element = el;
            element.on("keypress", onAnswered);
          },
          reset: function () {
            element.prop("disabled", true).val("");
          },
          clear: function () {
            element.val("");
          },
          disable: function () {
            element.prop("disabled", false);
          },
          getValue: function () {
            return element.val();
          }
        };
      })(),

      questionText = (function () {
        var element;

        return {
          init: function (el) {
            element = el;
          },
          reset: function () {
            element.text("");
          },
          setValue: function (value) {
            element.text(value);
          }
        };
      })(),

      feedbacks = (function (element) {
        var element;

        return {
          init: function (el) {
            element = el;
          },
          renderFeedback: function (isCorrect) {
            var fDiv = $("<div>"),
                klass = isCorrect? "correct-answer-feedback": "incorrect-answer-feedback",
                hintSpan;

            fDiv.attr("class", klass);
            element.append(fDiv);
          },
          reset: function () {
            var feedbacks = element.find("div");

            if (feedbacks.length > 0) {
              for (var i=0; i < feedbacks.length; i++) {
                feedbackDiv.removeChild(feedbacks[i]);
              }
            }
          }
        };
      })(),

      learnArea = (function () {
        var element;

        return {
          init: function (el) {
            element = el;
          },
          renderLearning: function (question, answer) {
            element.append($("<div>").text(question + " : " + answer));
          }
        };
      })(),

      challenge = (function () {
        var challenges,
            totalChallenges,
            currentQuestion,
            currentAnswer;

        return {
          init: function (gameData) {
            challenges = gameData.challenges;
            totalChallenges = challenges.length;
          },
          displayNext: function (questionTextElement, answerInputElement) {
            var nextQuestion = challenges[Math.floor(Math.random() * totalChallenges)];
            questionTextElement.setValue(nextQuestion.question);
            answerInputElement.clear();
            currentQuestion = nextQuestion.question;
            currentAnswer = nextQuestion.answer;
          },
          checkAnswer: function (answer) {
            return currentAnswer.indexOf(answer) >= 0;
          },
          getQuestion: function () {
            return currentQuestion;
          },
          getCorrectAnswer: function () {
            return currentAnswer;
          }
        };
      })();

  window.Game = (function (startButton, answerInput, questionText, feedbacks, learnArea, timer) {
    var points = 0,
        reset = function () {
          points = 0;
          startButton.reset();
          answerInput.reset();
          questionText.reset();
        },
        answered = function (e) {
          var code = (e.keyCode ? e.keyCode : e.which),
              answer,
              isCorrect;
          if (code == 13) { //Enter keycode                        
            e.preventDefault();
            answer = answerInput.getValue();
            isCorrect = challenge.checkAnswer(answer)
            feedbacks.renderFeedback(isCorrect);
            if (!isCorrect) {
              learnArea.renderLearning(challenge.getQuestion(), challenge.getCorrectAnswer());
            }
            challenge.displayNext(questionText, answerInput);
          }
        };

    return {
      init: function (
        startBtnSelector, 
        questionTxtSelector, 
        answerInputSelector, 
        feedbackSelector,
        learnSelector) {
          
          startButton.init($(startBtnSelector));
          questionText.init($(questionTxtSelector));
          answerInput.init($(answerInputSelector), answered);
          feedbacks.init($(feedbackSelector));
          learnArea.init($(learnSelector));
          
          reset();
          
          $.ajax("gamedata.json")
           .done(challenge.init);
      },

      start: function (duration) {
        var durationSeconds = duration || 60;
        timer.start("#timer", durationSeconds, reset);
        answerInput.disable();
        startButton.disable();
        feedbacks.reset()
        challenge.displayNext(questionText, answerInput);
      }
    };
  })(startButton, 
     answerInput, 
     questionText, 
     feedbacks, 
     learnArea, 
     window.CountDownTimer);

})(window, jQuery);