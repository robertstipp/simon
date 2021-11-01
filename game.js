var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var started = false;

function nextSequence() {
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  userClickedPattern = [];

  gamePattern.push(randomChosenColour);

  $("#level-title").text("Level " + level);
  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
  level++;
  // return randomNumber;
  // return randomChosenColour;
  // return gamePattern;
}

$(document).keydown(function() {
  if (started === false) {
    nextSequence();
    started = true;
  }

});


$(".btn").click(function() {
  var userChosenColour = this.id;
  userClickedPattern.push(userChosenColour);
  checkAnswer(userClickedPattern.length - 1);
  playSound(userChosenColour);
  animatePress(userChosenColour);
});


function checkAnswer(currentLevel) {
  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function() {
        nextSequence();
      }, 1000);
    }
  } else {
    playSound("wrong");
    $("body").addClass("game-over");
    $("#level-title").text("Game Over, Press Any Key to Restart");

    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 200);

    startOver();
  }
}
  // if (userClickedPattern.length === gamePattern.length) {
  //   console.log("done");
  //   setTimeout(nextSequence,1000);
  // } else {
  //   console.log("not done");
  // }

function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  var promise = audio.play();
  if (promise) {
    promise.catch(function(error) {
      console.error(error);
    });
  }
}

function animatePress(currentCoulour) {
  $("." + currentCoulour).addClass("pressed");
  setTimeout(function() {
    $("." + currentCoulour).removeClass("pressed");
  }, 100);
}
// $("#red").fadeOut(150).fadeIn(150);
// var audio = new Audio("sounds/" + randomChosenColour + ".mp3");
