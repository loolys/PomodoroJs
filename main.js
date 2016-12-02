
var myTime = 60*25;
function myCallBack() {
    if (myTime > 0) {
        myTime -= 1;
        var minutes = Math.floor(myTime / 60).toString();
        var seconds = (myTime - minutes * 60).toString();
        console.log(myTime);
        $("#time").text(minutes + ":" + seconds);
    }
}

$(document).ready(function () {
    $("#start").click(function(){
        var myInterval = window.setInterval(myCallBack, 1000);
    });
});