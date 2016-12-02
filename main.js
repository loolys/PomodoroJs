var myInterval = window.setInterval(myCallBack, 1000);
var myTime = 60;
function myCallBack() {
    if (myTime >= 0) {
        myTime -= 1;
        console.log(myTime);
    }
}