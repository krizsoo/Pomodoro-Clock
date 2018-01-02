/*
- play sound
- show window notification when expired
- animate with time passing
- 
*/
document.addEventListener('DOMContentLoaded', function () {
  if (!Notification) {
    alert('Desktop notifications not available in your browser. Try Chromium.'); 
    return;
  }

  if (Notification.permission !== "granted")
    Notification.requestPermission();
});

var fiveMinutes = 60 * 25; 
var stopTimer = true; //flag to define whether the timer is on or off
var audio = new Audio('http://onlineclock.net/audio/options/default.mp3');
audio.loop = true;

function startTimer(duration, display) {  
  var timer = duration, minutes, seconds;
  
  var timerFunc = setInterval(function() {
        minutes = parseInt(timer / 60, 10);
        seconds = parseInt(timer % 60, 10);

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        display.textContent = minutes + ":" + seconds;

    //starts alarm and stops animation when clock reaches 0
        if (--timer < 0) {
          audio.play();
          clearInterval(timerFunc);
          $(".time").html("00:00");
          $(".clock").css("animation", "");
          notifyMe();
        };
    //stops the timer when the reset button is hit
        if (stopTimer) {
          clearInterval(timerFunc);
          $(".time").html("25:00");
        };
    }, 1000); 
  
}
// increse button 
$(".increase").click(function (){
  if (stopTimer) {
  fiveMinutes = ((fiveMinutes / 60) +1) *60;
  $(".time").html(fiveMinutes/60 + ":00");
  };
});

//decrease button 
$(".decrease").click(function (){
  if (stopTimer && fiveMinutes/60 > 1) {
  fiveMinutes = ((fiveMinutes / 60) -1) *60;
  $(".time").html(fiveMinutes/60 + ":00");
  };
});

//timer reset stops sound and animation and resets timer value to 25 mins
$(".reset").click(function () {
  stopTimer = true;
  $(".clock").css("animation", "")
  audio.pause();
  fiveMinutes = 60 * 25;
  $(".time").html(fiveMinutes/60 + ":00");
})

//starts timer
$(".start").click(function () {
  if (stopTimer) {
    stopTimer = false;
    display = document.querySelector('.time');
    startTimer(fiveMinutes, display);
    $(".clock").css("animation", "rotate " + fiveMinutes +"s infinite steps(250)")
  }
});

//Browser notification; 
function notifyMe() {
  if (!Notification) {
    alert('Desktop notifications not available in your browser. Try Chromium.'); 
    return;
  }

  if (Notification.permission !== "granted")
    Notification.requestPermission();
  else {
    var notification = new Notification('Notification title', {
      icon: 'https://s-media-cache-ak0.pinimg.com/236x/a0/84/80/a08480c627a46646f4c352c8913a3dec.jpg',
      body: "It is time to take a break!",
    });    
  }
}
