var myInterval;
var myTime = 60*25;
function pPTime(string, pad, length){
    return (new Array(length+1).join(pad)+string).slice(-length);
}

function myCallBack() {
    if (myTime > 0) {
        myTime -= 1;
        var minutes = Math.floor(myTime / 60).toString();
        var seconds = (myTime - minutes * 60).toString();
        var formattedTime = pPTime(minutes, "0",2) +
            ":" + pPTime(seconds,"0",2);
        console.log(myTime);
        $("#time").text(formattedTime);
    }
}

$(document).ready(function () {
    $("#start").click(function(){
        myInterval = window.setInterval(myCallBack, 1000);
    });
    $("#stop").click(function (){
        clearInterval(myInterval);
    })
});