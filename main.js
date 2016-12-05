var myInterval;
var myTime = 60*25;
var getPomodoroTime, setPomodoroTime;
var getRestTime, setRestTime;
var getOnPomdoro, setOnPomodoro;

(function () {
    
    var pomodoroTime = 25*60;
    var restTime = 5 * 60;
    var onPomodoro = true;
    
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
}());

function pPTime(string, pad, length){
    return (new Array(length+1).join(pad)+string).slice(-length);
}

function pomodoroDecrease() { 
    var pomodoroTime = getPomodoroTime();
    var restTime = getRestTime();
    if (pomodoroTime > 0 && getOnPomdoro()) {
        setPomodoroTime(pomodoroTime - 1);
        var minutes = Math.floor(pomodoroTime / 60).toString();
        var seconds = (pomodoroTime - minutes * 60).toString();
        var formattedTime = pPTime(minutes, "0",2) +
            ":" + pPTime(seconds,"0",2);
        console.log(pomodoroTime);
        $("#time").text(formattedTime);
    } else if (pomodoroTime === 0 && getOnPomdoro()){
        setOnPomodoro(false);
        var minutes = Math.floor(restTime / 60).toString();
        var seconds = (restTime - minutes * 60).toString();
        var formattedTime = pPTime(minutes, "0",2) +
            ":" + pPTime(seconds,"0",2);
        $("#time").text(formattedTime);
    }
}

function restDecrease () {
    var restTime = getRestTime();
    var pomodoroTime = getPomodoroTime();
    if (restTime > 0 && getOnPomdoro() === false) {
        setRestTime(restTime - 1);
        var minutes = Math.floor(restTime / 60).toString();
        var seconds = (restTime - minutes * 60).toString();
        var formattedTime = pPTime(minutes, "0",2) +
            ":" + pPTime(seconds,"0",2);
        console.log(restTime);
        $("#time").text(formattedTime);
    } else if (restTime === 0 && getOnPomdoro() === false){
        setOnPomodoro(true);
        var minutes = Math.floor(pomodoroTime / 60).toString();
        var seconds = (pomodoroTime - minutes * 60).toString();
        var formattedTime = pPTime(minutes, "0",2) +
            ":" + pPTime(seconds,"0",2);
        $("#time").text(formattedTime);
    }
}

$(document).ready(function () {
    $("#start").click(function(){
        if (getOnPomdoro()){
            myInterval = window.setInterval(pomodoroDecrease, 1000);
        } else{
            myInterval = window.setInterval(restDecrease, 1000);
        }
        
    });
    
    $("#timer-decrease").click(function(){
        var number = parseInt($("#pomodoro-time").text());
        if (number > 0){
            $("#pomodoro-time").text(number - 1);
            setPomodoroTime(number * 60 - 60);
            if(getOnPomdoro()){
                var minutes = (number - 1).toString();
                var seconds = "0";
                var formattedTime = pPTime(minutes, "0",2) +
                    ":" + pPTime(seconds, "0",2);
                $("#time").text(formattedTime);
            }   
        }
             
    });
    $("#timer-increase").click(function(){
        var number = parseInt($("#pomodoro-time").text());
        $("#pomodoro-time").text(number + 1); 
        setPomodoroTime(number * 60 + 60);
        if (getOnPomdoro()){
            var minutes = (number + 1).toString();
            var seconds = "0";
            var formattedTime = pPTime(minutes, "0",2) +
                ":" + pPTime(seconds, "0",2);
            $("#time").text(formattedTime);
        }
        
    });
    $("#break-decrease").click(function(){
        var number = parseInt($("#break-time").text());
        if (number > 0){
            $("#break-time").text(number - 1);
            setRestTime(number * 60 - 60);
            if (getOnPomdoro() === false){
                var minutes = (number - 1).toString();
                var seconds = "0";
                var formattedTime = pPTime(minutes, "0",2) +
                    ":" + pPTime(seconds, "0",2);
                $("#time").text(formattedTime);
            }
            
        } 
        
    });
    $("#break-increase").click(function(){
        var number = parseInt($("#break-time").text());
        $("#break-time").text(number + 1); 
        setRestTime(number * 60 + 60);
        if (getOnPomdoro() === false){
            var minutes = (number + 1).toString();
            var seconds = "0";
            var formattedTime = pPTime(minutes, "0",2) +
                ":" + pPTime(seconds, "0",2);
            $("#time").text(formattedTime);
        }
        
    });
});