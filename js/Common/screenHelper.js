define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function addLodingScreen() {
        const loaderContainer = (document.createElement('div'));
        loaderContainer.id = 'loading_container';
        loaderContainer.classList.add('spinner');
        const spinnerText = (document.createElement('div'));
        spinnerText.innerText = 'Loading';
        spinnerText.classList.add('spinner-text');
        const spinnerRed = (document.createElement('div'));
        spinnerRed.classList.add('spinner-sector');
        spinnerRed.classList.add('spinner-sector-red');
        const spinnerBlue = (document.createElement('div'));
        spinnerBlue.classList.add('spinner-sector');
        spinnerBlue.classList.add('spinner-sector-blue');
        const spinnerGreen = (document.createElement('div'));
        spinnerGreen.classList.add('spinner-sector');
        spinnerGreen.classList.add('spinner-sector-green');
        loaderContainer.appendChild(spinnerText);
        loaderContainer.appendChild(spinnerRed);
        loaderContainer.appendChild(spinnerBlue);
        loaderContainer.appendChild(spinnerGreen);
        const element = document.getElementById('modal_window');
        element.appendChild(loaderContainer);
    }
    exports.addLodingScreen = addLodingScreen;
    function removeLodingScreen() {
        const element = document.getElementById('loading_container');
        const parent = element.parentElement;
        parent.removeChild(element);
    }
    exports.removeLodingScreen = removeLodingScreen;
    function addModalWindow() {
        const element = (document.createElement('div'));
        element.id = 'modal_window';
        element.classList.add('modal');
        document.body.appendChild(element);
    }
    exports.addModalWindow = addModalWindow;
    function removeModalWindow() {
        const element = document.getElementById('modal_window');
        document.body.removeChild(element);
    }
    exports.removeModalWindow = removeModalWindow;
    function addBlurr(htmlId) {
        const element = document.getElementById(htmlId);
        element.classList.add('blurr');
    }
    exports.addBlurr = addBlurr;
    function removeBlurr(htmlId) {
        const element = document.getElementById(htmlId);
        element.classList.remove('blurr');
    }
    exports.removeBlurr = removeBlurr;
    function showServerResponse(responseText, iserror) {
        const element = (document.createElement('div'));
        element.id = 'response_div';
        if (iserror) {
            element.classList.add('errorResponse');
        }
        else {
            element.classList.add('okResponse');
        }
        const innerP = (document.createElement('div'));
        innerP.innerText = responseText;
        innerP.classList.add('inner-text');
        element.appendChild(innerP);
        document.body.appendChild(element);
        setTimeout(function () { document.body.removeChild(element); }, 4200);
    }
    exports.showServerResponse = showServerResponse;
});
