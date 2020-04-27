
var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = [];

var gameInProgress = false
var level = 0


// Sets up new game on keypress
$(document).keypress(function(event){
  if (gameInProgress == false) {
    $("#level-title").text("Level " + level);
    nextSequence();
    gameInProgress = true
  }
});

// Detects which button was clicked, passes parameters, provides sound and animation
$(".btn").click(function() {
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
playSound(userChosenColour);
animatePress(userChosenColour);
checkAnswer(userClickedPattern.length-1);
});



function nextSequence() {
  userClickedPattern = [];
  level++;
  $("#level-title").text("Level " + level);
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
}


function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
};


function animatePress(currentColour) {
$("#" + currentColour).addClass("pressed");
setTimeout(function()
{
$("#" + currentColour).removeClass("pressed")}, 100);
}


function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] == userClickedPattern[currentLevel]) {
    console.log("success");
      if (userClickedPattern.length === gamePattern.length){
        setTimeout(function () {
          nextSequence();
        }, 1000);
      }

  } else {
    playSound("wrong");
    console.log("wrong");
    $("body").addClass("game-over");
    setTimeout(function()
    {
    $("body").removeClass("game-over")}, 200);
    $("#level-title").text("Game Over, Press Any Key to Restart");
    startOver()
    }
  }

  function startOver(){
    level = 0;
    gamePattern = [];
    gameInProgress = false;
  }
