define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function myAPIsource() {
        if (window.location.href.includes('ic3bird.github.io')) {
            return "https://snowart.azurewebsites.net";
        }
        return "http://localhost:60694";
    }
    exports.myAPIsource = myAPIsource;
});
