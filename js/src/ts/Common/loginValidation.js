define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const tokenCookieName = 'mrT';
    class ValidationResponseOptions {
        NotLogedIn() {
            return { validationStatus: false, message: 'Not logged in' };
        }
        LoginExpire() {
            return { validationStatus: false, message: 'Your login is expired!' };
        }
        LogedIN() {
            return { validationStatus: true };
        }
    }
    function checkLoginStatus() {
        const token = getToken();
        if (!token) {
            return new ValidationResponseOptions().NotLogedIn();
        }
        const payload = JSON.parse(atob(token.split('.')[1]));
        const d = new Date(0);
        d.setUTCSeconds(payload.exp);
        if (d < new Date()) {
            return new ValidationResponseOptions().LoginExpire();
        }
        return new ValidationResponseOptions().LogedIN();
    }
    exports.checkLoginStatus = checkLoginStatus;
    function getToken() {
        return getCookie(tokenCookieName);
    }
    exports.getToken = getToken;
    function setToken(token) {
        document.cookie = tokenCookieName + '=' + token + ';';
    }
    exports.setToken = setToken;
    function getCookie(cookieName) {
        const name = cookieName + '=';
        const cookieArray = document.cookie.split(';');
        for (let i = 0; i < cookieArray.length; i++) {
            let pageCookie = cookieArray[i];
            while (pageCookie.charAt(0) == ' ') {
                pageCookie = pageCookie.substring(1);
            }
            if (pageCookie.indexOf(name) == 0) {
                return pageCookie.substring(name.length, pageCookie.length);
            }
        }
        return '';
    }
});
