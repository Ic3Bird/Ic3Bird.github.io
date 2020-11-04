define(["require", "exports", "./Login/login", "./Common/loginValidation", "./Finance/finance", "./Common/navbar", "./Common/screenHelper"], function (require, exports, login, loginV, finance, navBar, screens) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    startPage();
    function startPage() {
        clearBody();
        let loginStatus = loginV.checkLoginStatus();
        if (loginStatus.validationStatus) {
            screens.addModalWindow();
            screens.addLodingScreen();
            navBar.displayNavBar();
            finance.displayFinance();
            screens.removeLodingScreen();
            screens.removeModalWindow();
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
