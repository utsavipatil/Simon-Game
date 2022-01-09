//                                                             Javascript with jQuery
var buttonColours = ["red", "blue", "green", "yellow"];

var userClickedPattern = [];
var gamePattern = [];

var level = 0;
var started = false;


// Start of Game by pressing any key of KeyBoard
$(document).keydown(function() {
  if (!started) {
    $("level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});


// User Click Handler
$(".btn").click(function() {
  var userChoosenColour = $(this).attr("id"); /* Feaching ID */
  userClickedPattern.push(userChoosenColour);

      // console.log(userClickedPattern);

  playSound(userChoosenColour);
  animatePress(userChoosenColour);

  checkAnswer(userClickedPattern.length - 1);
});


// Check Each Answer step by step
function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {

    // console.log("success");

    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function() {
        nextSequence();
      }, 1000);
    }

  } else {
    // console.log("wrong");

    playSound("wrong");

    $("body").addClass("game-over");
    $("#level-title").text("Game Over, Press Any Key to Restart");

    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);

    startOver();
  }
}

// Random Sequence Generator
function nextSequence() {
  userClickedPattern = [];
  level++;
  $("#level-title").text("Level " + level);
  var randomNumber = parseInt(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

          // Animation of Random Sequence
  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

          // Play Sound
  playSound(randomChosenColour);
}


// Animation of Pressed buttons
function animatePress(currentColour) {
  $("#" + currentColour).addClass("pressed");
  setTimeout(function() {
    $("#" + currentColour).removeClass("pressed");
  }, 100);
}

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}


// Start Over (Resetting all variables)
function startOver() {
      level = 0;
      gamePattern=[];
      started = false;
}
