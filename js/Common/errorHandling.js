define(["require", "exports", "../Common/screenHelper"], function (require, exports, screens) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function ShowServerError(errorObject) {
        console.log(errorObject);
        screens.showServerResponse(errorObject.errorMessage, true);
    }
    exports.ShowServerError = ShowServerError;
});
