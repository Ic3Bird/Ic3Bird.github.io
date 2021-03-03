var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function initateRequest(url, options) {
        return __awaiter(this, void 0, void 0, function* () {
            loadingBarProgressStart();
            const response = yield fetch(url, options);
            loadingBarProgressStop();
            return response;
        });
    }
    exports.initateRequest = initateRequest;
    function loadingBarProgressStart() {
        const loadingBar = (document.createElement('div'));
        loadingBar.classList.add('loading-bar');
        loadingBar.id = 'request_loding_bar';
        document.body.appendChild(loadingBar);
    }
    function loadingBarProgressStop() {
        let loadingBar = document.getElementById('request_loding_bar');
        loadingBar.remove();
    }
});
