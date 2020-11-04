define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function addLodingScreen() {
        const loaderContainer = (document.createElement('div'));
        loaderContainer.id = 'loading_container';
        loaderContainer.classList.add('loading-container');
        const loader = (document.createElement('div'));
        loader.classList.add('loader');
        loader.classList.add('loader4');
        loaderContainer.appendChild(loader);
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
        element.setAttribute('class', 'modal');
        document.body.appendChild(element);
    }
    exports.addModalWindow = addModalWindow;
    function removeModalWindow() {
        const element = document.getElementById('modal_window');
        document.body.removeChild(element);
    }
    exports.removeModalWindow = removeModalWindow;
});
