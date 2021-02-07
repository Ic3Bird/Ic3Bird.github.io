define(["require", "exports", "./Login/login", "./Common/loginValidation", "./Finance/finance", "./Common/navbar", "./Common/pageFrame"], function (require, exports, login, loginV, finance, navBar, pageFrame) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    startPage();
    function startPage() {
        clearBody();
        let loginStatus = loginV.checkLoginStatus();
        if (loginStatus.validationStatus) {
            pageFrame.setPageTitle();
            navBar.displayNavBar();
            finance.displayFinance();
        }
        else {
            pageFrame.setLoginPageTitle();
            login.displayLoginPanel();
        }
    }
    exports.startPage = startPage;
    function clearBody() {
        document.body.innerHTML = '';
    }
});
