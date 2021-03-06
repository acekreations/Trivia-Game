$(document).ready(function(){
  var questions = {
    "What does CSS stand for?" : {
      options: ["Cascading Style Selector", "Cascading Style Sheet", "Correct Style Syntax", "Cool Style System"],
      answer: 1
    },
    "What role does Java play in JavaScript?" : {
      options: ["They are the same thing", "They can both be written in a .js file together", "Javascript is the cooler version of Java", "They aren't the same at all"],
      answer: 3
    },
    "When using Bootstrap you should always..." : {
      options: ["Give a shoutout to twitter", "Include CDN links to Bootstrap CSS and JS", "Forget that your using Bootstrap and write a bunch of CSS that Bootstrap already offers", "Build your own CSS grid system"],
      answer: 1
    },
    "If you have many repeating blocks of code what should you do?" : {
      options: ["Put each block into a function or object", "Continue painstakingly writing out massive amounts of unecessary code", "Hire someone to write your code for you", "Give up because you got lost in your own code"],
      answer: 0
    },
    "When is it a good idea to implement JQuery?" : {
      options: ["When you've forgotten how to write vanilla JS", "When your frequently manipulating the DOM", "When your feeling lazy", "When you can't get your vanilla JS to work"],
      answer: 1
    },
  };
  var correctAnswers = 0;
  var incorrectAnswers = 0;
  var numQuestionsAnswered = 0;
  var timeLeft = 30;
  var currentQuestionNum = 0;
  var numOfQuestions = Object.keys(questions).length;
  var setCountdown;

  //reset variables and UI
  function initilizeGame() {
    correctAnswers = 0;
    incorrectAnswers = 0;
    numQuestionsAnswered = 0;
    currentQuestionNum = 0;
    timeLeft = 30;
    $("#gameResults").empty();
    $("#startGameBtn").hide();
    $("#countdownTimerContainer").show();
    newQuestion();
  }

  //initialize game timer
  function countdownTimer() {
    //make sure time left is set properly
    timeLeft = 30;
    setCountdown = setInterval(countdownExec, 1000)
  }

  //check if time has run out
  function countdownExec() {
    if (timeLeft === 0) {
      //make sure clock in UI displays zero
      $("#countdownTimer").text("0");
      outOfTime();
    }
    else {
      //update UI clock with remaining time
      $("#countdownTimer").text(timeLeft);
      timeLeft--;
    }
  }

  //if user runs out of time clear timer and display correct answer
  function outOfTime() {
    clearInterval(setCountdown);
    revealAnswer("warning");
  }

  //gets and displays new quetion
  function newQuestion() {
    $("#questionOptions").empty();
    //checks if there are any questions left that the user has not seen
    if (currentQuestionNum < numOfQuestions) {
      countdownTimer();
      //gets next question from the questions obj using currenctQuestionNum which keeps track of the position in the obj
      var newQuestionStr = Object.entries(questions)[currentQuestionNum];
      //updates UI with new question
      $("#questionArea").html("<h2 id='question' class='display-4 mb-4' value='" + newQuestionStr[0] + "'>" + newQuestionStr[0] + "</h2>");
      //loops through question options and displays them
      for (var i = 0; i < newQuestionStr[1].options.length; i++) {
        $("#questionOptions").append("<button type='button' class='btn btn-primary text-left p-3' value=\"" + newQuestionStr[1].options[i] + "\"><i class='far fa-dot-circle'></i> " + newQuestionStr[1].options[i] + "</button>")
      }
      //increase position of question in the question obj
      currentQuestionNum++;
    }
    //if there are no more questions
    else {
      $("#question, #questionOptions").empty();
      $("#countdownTimerContainer").hide();
      $("#startGameBtn").show();
      //set the reaction emoji based on how well the user did
      if (correctAnswers >= 4) {var emoji = "<i class='far fa-smile fa-10x'></i>"};
      if (correctAnswers === 3) {var emoji = "<i class='far fa-meh fa-10x'></i>"};
      if (correctAnswers <= 2) {var emoji = "<i class='far fa-frown fa-10x'></i>"};
      //display the results to the user
      $("#gameResults").html("<div class='mb-4'>" + emoji + "</div><p><strong>Correct Answers:</strong> " + correctAnswers + "</p><p><strong>Incorrect Answers:</strong> " + incorrectAnswers + "</p><p><strong>Questions Answered:</strong> " + numQuestionsAnswered + " of " + numOfQuestions + "</p>");
    }
  }

  //highlight the correct answer, accepts any bootstrap alert color as arg
  function revealAnswer(color) {
    var questionVal = $("#question").attr("value");
    var displayCorrectAnswer = questions[questionVal].answer;
    displayCorrectAnswer++;
    $("#questionOptions button").addClass("disabled");
    $("#questionOptions button:nth-child(" + displayCorrectAnswer + ")").removeClass("disabled").addClass("btn-" + color);
    setTimeout(newQuestion, 1000 * 3);
  }

  //checks if the users answer is correct, accepts var representing 'this' from the btn that was chosen by the user
  function checkAnswer(btnClicked) {
    clearInterval(setCountdown);
    numQuestionsAnswered++;

    var answerClicked = btnClicked.attr("value");
    console.log(answerClicked);
    var questionAsked = $("#question").attr("value");
    var answerArrayPos = questions[questionAsked].options.indexOf(answerClicked);

    if (answerArrayPos === questions[questionAsked].answer) {
      correctAnswers++;
      revealAnswer("success");
    }
    else {
      incorrectAnswers++
      revealAnswer("danger");
    }
  }

  //start the game when btn is clicked
  $("#startGameBtn").click(initilizeGame);

  //initiate answer check when user selects an answer
  $("#questionOptions").on("click", "button", function(){
    if (timeLeft !== 0) {
      var btnClicked = $(this);
      checkAnswer(btnClicked);
    }
  });
})
