var myInterval;
var myTime = 60*25;
var getPomodoroTime, setPomodoroTime;
var getRestTime, setRestTime;
var getOnPomdoro, setOnPomodoro;
var getStopTime, setStopTime;
var audio = new Audio("http://static1.grsites.com/archive/sounds/bells/bells006.mp3");



(function () {
    /*
        Setting up all getters and setters, onPomodoro checks if
        the program is on a Pomodoro or on a break, stopTime
        makes sure that clearInterval runs after the timer
        runs out.
    */
    var pomodoroTime = 10;
    var restTime = 10;
    var onPomodoro = true;
    var stopTime = false;
    
    getPomodoroTime = function () {
        return pomodoroTime;
    };
    
    setPomodoroTime = function (time) {
        pomodoroTime = time;
    };
    
    getRestTime = function () {
        return restTime;
    };
    
    setRestTime = function (time) {
        restTime = time;
    };
    
    getOnPomdoro = function () {
        return onPomodoro;
    };
    
    setOnPomodoro = function (bool) {
        onPomodoro = bool;
    };
    
    getStopTime = function(){
        return stopTime;
    };
    setStopTime = function(bool){
        stopTime = bool;
    }
}());

function pPTime(string, pad, length){
    // Pretty prints the minutes and seconds.
    return (new Array(length+1).join(pad)+string).slice(-length);
}

function pomodoroDecrease() { 
    var pomodoroTime = getPomodoroTime();
    var restTime = getRestTime();
    if (pomodoroTime > 0 && getOnPomdoro()) {
        $("#status-text").text("On Pomodoro");
        $("#start").hide();
        $("#interrupt").show();
        setPomodoroTime(pomodoroTime - 1);
        var minutes = Math.floor(pomodoroTime / 60).toString();
        var seconds = (pomodoroTime - minutes * 60).toString();
        var formattedTime = pPTime(minutes, "0",2) +
            ":" + pPTime(seconds,"0",2);
        //console.log(pomodoroTime);
        $("#time").text(formattedTime);
    } else if (pomodoroTime === 0 && getOnPomdoro()){
        audio.play();
        $("#start").text("Start Break");
        $("#start").show();
        $("#interrupt").hide();
        var number = parseInt($("#break-time").text());
        console.log("number in PomodoroDecrease:"+number);
        setRestTime(number * 60);
        setOnPomodoro(false);
        restTime = getRestTime();
        var minutes = Math.floor(restTime / 60).toString();
        var seconds = (restTime - minutes * 60).toString();
        var formattedTime = pPTime(minutes, "0",2) +
            ":" + pPTime(seconds,"0",2);
        $("#time").text(formattedTime);
        setStopTime(true);
    }
}

function restDecrease () {
    var restTime = getRestTime();
    var pomodoroTime = getPomodoroTime();
    if (restTime > 0 && getOnPomdoro() === false) {
        $("#status-text").text("On Break")
        $("#start").hide();
        $("#interrupt").show();
        setRestTime(restTime - 1);
        var minutes = Math.floor(restTime / 60).toString();
        var seconds = (restTime - minutes * 60).toString();
        var formattedTime = pPTime(minutes, "0",2) +
            ":" + pPTime(seconds,"0",2);
        //console.log(restTime);
        $("#time").text(formattedTime);
    } else if (restTime === 0 && getOnPomdoro() === false){
        audio.play();
        $("#start").show();
        $("#start").text("Start Pomodoro");
        $("#interrupt").hide();
        var number = parseInt($("#pomodoro-time").text());
        console.log("Number in rest:" + number);
        setPomodoroTime(number * 60);
        setOnPomodoro(true);
        pomodoroTime = getPomodoroTime();
        var minutes = Math.floor(pomodoroTime / 60).toString();
        var seconds = (pomodoroTime - minutes * 60).toString();
        var formattedTime = pPTime(minutes, "0",2) +
            ":" + pPTime(seconds,"0",2);
        $("#time").text(formattedTime);
        setStopTime(true);
    }
}

$(document).ready(function () {
    $("#interrupt").hide();
    
    $("#interrupt").click(function(){
        clearInterval(myInterval);
        
        var number = parseInt($("#pomodoro-time").text());
         setPomodoroTime(number * 60);
        var minutes = (number).toString();
        var seconds = "0";
        var formattedTime = pPTime(minutes, "0",2) +
            ":" + pPTime(seconds, "0",2);
        $("#time").text(formattedTime);
        setOnPomodoro(true);
        $("#interrupt").hide();
        $("#start").show();
    });
    
    $("#start").click(function(){
        if (getStopTime()){
            /*
                Stops the timer from running between pomodoro and break
                and then performs a second click to start the timer on
                first click.
            */
            clearInterval(myInterval);
            setStopTime(false);
            $("#start").click();
        }
        else if (getOnPomdoro()){
            myInterval = window.setInterval(pomodoroDecrease, 1000);
        } else{
            myInterval = window.setInterval(restDecrease, 1000);
        }
        
    });
    
    $("#timer-decrease").click(function(){
        var number = parseInt($("#pomodoro-time").text());
        if (number > 0){
            $("#pomodoro-time").text(number - 1);
            if($("#interrupt").is(":visible") === false){
                setPomodoroTime(number * 60 - 60);
                if(getOnPomdoro()){
                    var minutes = (number - 1).toString();
                    var seconds = "0";
                    var formattedTime = pPTime(minutes, "0",2) +
                        ":" + pPTime(seconds, "0",2);
                    $("#time").text(formattedTime);
                }   
            }
            
        }
             
    });
    $("#timer-increase").click(function(){
        var number = parseInt($("#pomodoro-time").text());
        $("#pomodoro-time").text(number + 1); 
        if($("#interrupt").is(":visible") === false){
            setPomodoroTime(number * 60 + 60);
            if (getOnPomdoro()){
                var minutes = (number + 1).toString();
                var seconds = "0";
                var formattedTime = pPTime(minutes, "0",2) +
                    ":" + pPTime(seconds, "0",2);
                $("#time").text(formattedTime);
            }
        }
        
        
    });
    $("#break-decrease").click(function(){
        var number = parseInt($("#break-time").text());
        if (number > 0){
            $("#break-time").text(number - 1);
            if($("#interrupt").is(":visible") === false){
                setRestTime(number * 60 - 60);
                if (getOnPomdoro() === false){
                    var minutes = (number - 1).toString();
                    var seconds = "0";
                    var formattedTime = pPTime(minutes, "0",2) +
                        ":" + pPTime(seconds, "0",2);
                    $("#time").text(formattedTime);
                }
            }
            
            
        } 
        
    });
    $("#break-increase").click(function(){
        var number = parseInt($("#break-time").text());
        $("#break-time").text(number + 1);
        if($("#interrupt").is(":visible") === false){
            setRestTime(number * 60 + 60);
            if (getOnPomdoro() === false){
                var minutes = (number + 1).toString();
                var seconds = "0";
                var formattedTime = pPTime(minutes, "0",2) +
                    ":" + pPTime(seconds, "0",2);
                $("#time").text(formattedTime);
            }
        }
        
        
    });
});