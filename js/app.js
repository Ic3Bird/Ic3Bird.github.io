define(["require", "exports", "./Login/login", "./Common/loginValidation", "./Finance/finance", "./Common/navbar"], function (require, exports, login, loginV, finance, navBar) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    startPage();
    function startPage() {
        clearBody();
        let loginStatus = loginV.checkLoginStatus();
        if (loginStatus.validationStatus) {
            navBar.displayNavBar();
            finance.displayFinance();
        }
        else {
            login.displayLoginPanel();
        }
    }
    exports.startPage = startPage;
    function clearBody() {
        document.body.innerHTML = '';
    }
});
