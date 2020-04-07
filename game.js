var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];

var level = 0;
var started = false;
$("h1").text("Press A Key to Start");

function nextSequence() {
    userClickedPattern = [];
    // Creating a random number.
    var randomNumber = Math.floor(Math.random() * 4);

    // Choosing colour according to the random number.
    var randomChosenColour = buttonColours[randomNumber];
    
    // Adding the randomly chosen colour into an array.
    gamePattern.push(randomChosenColour);

    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);

    // Manipulating the "h1" tag
    level++;
    $("#level-title").text(`Level ${level}`);
}

// Calling the function on key press.
$(document).keypress(function() {
    if (!started) {
        $("#level-title").text("Level 0" + level);
        nextSequence();
        started = true;
    }    
});


// User choosing a button
$(".btn").click(function() {
    var userChosenColour = $(this).attr('id');
    userClickedPattern.push(userChosenColour);
    console.log(userChosenColour);
    console.log(userClickedPattern);
    
    // Verifing the answer using a custom function
    checkAnswer(userClickedPattern.length - 1);

    // Playing sound and adding flash animation when buttons are pressed
    playSound(userChosenColour);
    animatePress(userChosenColour);
    // new Audio(`sounds/${randomChosenColour}.mp3`).play();
});


// Playing the sounds of respective button
function playSound(name) {
    new Audio(`sounds/${name}.mp3`).play();
}

// Flashing the button on user click
function animatePress(currentColour) {
    // Adding class
    $("." + currentColour).addClass("pressed");
    
    // Removing class
    setTimeout(function (){
        $("." + currentColour).removeClass("pressed");
    }, 100);
}

// Checking if the answer is correct or not
function checkAnswer(currentLevel) {
    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
        console.log("success");

        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(function() {
                nextSequence();
            }, 1000);
        }
        
    } else {
        console.log("wrong");
        // Playing sound
        playSound("wrong");
        // Adding class
        $("body").addClass("game-over");

        // Removing class
        setTimeout(function (){
            $("body").removeClass("game-over");
        }, 200);

        // Changing h1
        $("h1").text("Game Over, Press Any Key to Restart");   
        
        // Restarting the game
        startOver();
    }
}

// Restarting the game
function startOver() {
    // Resetting the variables
    level = 0;
    gamePattern = [];
    started = false;
}