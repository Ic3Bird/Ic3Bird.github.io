define(["require", "exports", "../Common/loginValidation", "../app"], function (require, exports, loginV, app_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function displayNavBar() {
        document.body.appendChild(createLoginCountDown());
        countDownToExpire();
    }
    exports.displayNavBar = displayNavBar;
    function createLoginCountDown() {
        const loginCountDown = (document.createElement('div'));
        loginCountDown.id = "login_status";
        loginCountDown.classList.add("navbar");
        return loginCountDown;
    }
    function countDownToExpire() {
        const token = loginV.getToken();
        let payload = JSON.parse(atob(token.split('.')[1]));
        const expireDate = new Date(0);
        const expDateNum = expireDate.setUTCSeconds(payload.exp);
        var x = setInterval(function () {
            var now = new Date().getTime();
            var distance = expDateNum - now;
            if (distance < 0) {
                clearInterval(x);
                app_1.startPage();
            }
            else {
                var days = Math.floor(distance / (1000 * 60 * 60 * 24));
                var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
                var seconds = Math.floor((distance % (1000 * 60)) / 1000);
                document.getElementById("login_status").innerHTML = 'Remaning login time: ' + days + "d " + hours + "h " + minutes + "m " + seconds + "s ";
            }
        }, 1000);
    }
});
