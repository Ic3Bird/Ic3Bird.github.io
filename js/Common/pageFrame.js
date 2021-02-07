define(["require", "exports", "../Common/serverSettings"], function (require, exports, serverSettings_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    let apiDestenation = serverSettings_1.myAPIsource().indexOf('snow') > -1 ? '' : 'Test ';
    function setLoginPageTitle() {
        document.title = apiDestenation + 'Login';
    }
    exports.setLoginPageTitle = setLoginPageTitle;
    function setPageTitle() {
        document.title = apiDestenation + 'Finance';
    }
    exports.setPageTitle = setPageTitle;
});
