$(document).ready(function() {
  //Vriables
  var swbutton = "off";
  var strictMode = "off";
  var cturn = 1;
  var arr = [];
  var userCount = -1;
  var userarr = [];
  var startPressed = false;
  //Audio variables
  var rAudio = new Audio(
    "https://s3.amazonaws.com/freecodecamp/simonSound1.mp3"
  );
  var gAudio = new Audio(
    "https://s3.amazonaws.com/freecodecamp/simonSound2.mp3"
  );
  var bAudio = new Audio(
    "https://s3.amazonaws.com/freecodecamp/simonSound3.mp3"
  );
  var yAudio = new Audio(
    "https://s3.amazonaws.com/freecodecamp/simonSound4.mp3"
  );
  rAudio.loop, gAudio.loop, bAudio.loop, (yAudio.loop = true);
  //Change count screen function
  function screen(num) {
    if (num < 10) {
      $("#screen").html("0" + num);
    } else {
      $("#screen").html(num);
    }
  }
  
  //Playing Red pressed
  function playRed(delay) {
    setTimeout(function() {
      $("#r").addClass("rr").removeClass("r");
      rAudio.playbackRate = 0.5;
      rAudio.play();
      setTimeout(function() {
        $("#r").removeClass("rr").addClass("r");
        rAudio.pause();
      }, 600);
    }, delay);
  }
  //Playing Green pressed
  function playGreen(delay) {
    setTimeout(function() {
      $("#g").addClass("gg").removeClass("g");
      gAudio.playbackRate = 0.5;
      gAudio.play();
      setTimeout(function() {
        $("#g").removeClass("gg").addClass("g");
        gAudio.pause();
      }, 600);
    }, delay);
  }
  //Playing Yellow pressed
  function playYellow(delay) {
    setTimeout(function() {
      $("#y").addClass("yy").removeClass("y");
      yAudio.playbackRate = 0.5;
      yAudio.play();
      setTimeout(function() {
        $("#y").removeClass("yy").addClass("y");
        yAudio.pause();
      }, 600);
    }, delay);
  }
  //Playing Blue pressed
  function playBlue(delay) {
    setTimeout(function() {
      $("#b").addClass("bb").removeClass("b");
      bAudio.playbackRate = 0.5;
      bAudio.play();
      setTimeout(function() {
        $("#b").removeClass("bb").addClass("b");
        bAudio.pause();
      }, 600);
    }, delay);
  }
  //Choose color input and delay num
  function choise(input, num) {
    if (input == 2) playRed(num);
    else if (input == 1) playGreen(num);
    else if (input == 3) playYellow(num);
    else if (input == 4) playBlue(num);
  }
  //Allow pressed or not for r g y b buttons state "on"/"off"
  function onorof(state) {
    if (state == "on") {
      $("#r").addClass("xbut").attr("disabled", false);
      $("#g").addClass("xbut").attr("disabled", false);
      $("#y").addClass("xbut").attr("disabled", false);
      $("#b").addClass("xbut").attr("disabled", false);
    } else if (state === "off") {
      $("#r").removeClass("xbut").attr("disabled", true);
      $("#g").removeClass("xbut").attr("disabled", true);
      $("#y").removeClass("xbut").attr("disabled", true);
      $("#b").removeClass("xbut").attr("disabled", true);
    }
  }
  //Add random number between 1 to 4 to array arr
  function addArr() {
    var x = Math.floor(Math.random() * 4) + 1;
    arr.push(x);
  }
  //reset the user variables
  function resetUser() {
    userCount = -1;
    userarr = [];
  }
  //reset all the game variables
  function reset() {
    screen(0);
    cturn = 1;
    arr = [];
    userCount = -1;
    userarr = [];
  }
  //Computer Automatic Playing
  function computerPlay() {
    if (arr.length == 21) {
      alert("Cool You Win");
      alert("game will reset Now:)");
      reset();
      addArr();
      computerPlay();
      return;
    }
    onorof("off");
    resetUser();
    var c = 1200;
    if (arr.length < 5) c = 1200;
    else if (arr.length > 5) c = 900;

    var delay = c * cturn;
    choise(arr[cturn - 1], delay);
    screen(arr.length);
    if (cturn < arr.length) {
      cturn++;
      computerPlay();
    }
    cturn = 1;
    setTimeout(function() {
      onorof("on");
    }, delay * arr.length);
  }
  //User Pressed right or wrong , am i comtinue or not
  function goORnot() {
    if (userarr[userCount] !== arr[userCount]) {
      onorof("off");
      resetUser();
      alert("Error Wrong Input");
      if(strictMode == "off"){
      setTimeout(function() {
        computerPlay();
      }, 1000);}
      else if(strictMode == "on")
      {reset();screen(0);setTimeout(function() {
        addArr();computerPlay();
      }, 1000);}
      return false;
    } 
    else return true;
  }
  //Check of computer play after user play specific number of moves
  function userPlay() {
    if (userarr[userCount] == arr[userCount] && userarr.length == arr.length) {
      onorof("off");
      addArr();
      setTimeout(function() {
        computerPlay();
      }, 1000);
    }
  }
   
  //Trigger g r b y buttons click
  $("#g").on("click", function() {
    userarr.push(1);
    playGreen();
    userCount++;
    if (goORnot()) {
      userPlay();
    }
  });
  $("#r").on("click", function() {
    userarr.push(2);
    playRed();
    userCount++;
    if (goORnot()) {
      userPlay();
    }
  });
  $("#y").on("click", function() {
    userarr.push(3);
    playYellow();
    userCount++;
    if (goORnot()) {
      userPlay();
    }
  });
  $("#b").on("click", function() {
    userarr.push(4);
    playBlue();
    userCount++;
    if (goORnot()) {
      userPlay();
    }
  });
  //Trigger start button click
  $("#start").on("click", function() {
    if (!startPressed) {
      startPressed = true;
      addArr();
      computerPlay();
    } else if (startPressed) {
      reset();
      alert("Restarting");
      addArr();
      computerPlay();
    }
  });
  //Trigger strict button click
  $("#strict").on("click", function() {
    if (swbutton == "off") {
      if(strictMode == "off"){
        strictMode = "on";
        $("#strict").addClass("rr");
        $("#strict").removeClass("white");
        $("#stricttext").text("Strict On");
      }
      else if(strictMode == "on"){
        strictMode = "off";
        $("#strict").removeClass("rr");
        $("#strict").addClass("white");
        $("#stricttext").text("Strict Off");
      }
    }
    else if(swbutton =="on"){alert("please switch off then enable strict mode");}
  });
  //Trigger switch button click
  $("#sw").on("click", function() {
    if (swbutton === "off") {
      swbutton = "on";
      screen(0);
      $("#on").addClass("gg");
      $("#off").removeClass("rr");
      $("#sw").removeClass("rr").addClass("gg");
      $("#start").addClass("xbut").attr("disabled", false);
    } else if (swbutton === "on") {
      swbutton = "off";
      reset();
      screen("--");
      onorof("off");
      $("#on").removeClass("gg");
      $("#off").addClass("rr");
      $("#sw").removeClass("gg").addClass("rr");
      $("#start").removeClass("xbut").attr("disabled", true);
    }
  });
});
