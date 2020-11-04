var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
define(["require", "exports", "../Common/loginValidation", "../Common/serverSettings", "../Common/screenHelper", "../app"], function (require, exports, loginValidation, serverSettings_1, screens, app_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function displayLoginPanel() {
        const loginContainer = creatLoginContainer();
        loginContainer.style.visibility = 'hidden';
        const loginComponent = (document.createElement('div'));
        loginComponent.id = "login_comp";
        loginComponent.classList.add('login');
        loginComponent.appendChild(createPasswordCompontent());
        loginComponent.appendChild(createLoginButtonCompontent());
        loginContainer.appendChild(loginComponent);
        document.body.appendChild(loginContainer);
        document.getElementById("pw_txtbox").addEventListener('keypress', function (e) {
            let key = e.which || e.keyCode;
            if (key === 13) {
                loginProcess();
            }
        });
        loginContainer.style.visibility = '';
    }
    exports.displayLoginPanel = displayLoginPanel;
    function creatLoginContainer() {
        const loginContainer = (document.createElement('div'));
        loginContainer.id = "login_container";
        loginContainer.classList.add('login_container_active');
        return loginContainer;
    }
    function createLoginButtonCompontent() {
        const loginButton = (document.createElement('button'));
        loginButton.id = "login_button";
        loginButton.textContent = 'Login';
        loginButton.style.marginTop = '10px';
        loginButton.onclick = (e) => loginProcess();
        return loginButton;
    }
    function createPasswordCompontent() {
        const pwBox = (document.createElement('input'));
        pwBox.id = "pw_txtbox";
        pwBox.type = 'password';
        pwBox.autocomplete = 'off';
        return pwBox;
    }
    function loginProcess() {
        return __awaiter(this, void 0, void 0, function* () {
            screens.addModalWindow();
            screens.addLodingScreen();
            screens.addBlurr("login_container");
            const inputElement = document.getElementById("pw_txtbox");
            let loginResponse = yield LogMeIn(inputElement.value);
            if (loginResponse.status == 200) {
                let promise = loginResponse.json();
                promise.then(function (value) {
                    loginValidation.setToken(value.token);
                })
                    .then(successfulLogin)
                    .catch(error => console.log(error));
            }
            else {
                loginFaild(loginResponse);
            }
        });
    }
    function LogMeIn(pw) {
        return __awaiter(this, void 0, void 0, function* () {
            return (yield fetch(serverSettings_1.myAPIsource() + '/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ Password: pw, ValidationType: 0 })
            }));
        });
    }
    function successfulLogin() {
        const loginContainer = document.getElementById("login_container");
        loginContainer.classList.remove('login_container_active');
        loginContainer.classList.add('login_container_not_active');
        const loginComponent = (document.getElementById("login_comp"));
        const parent = loginComponent.parentElement;
        parent.removeChild(loginComponent);
        screens.removeLodingScreen();
        screens.removeModalWindow();
        app_1.startPage();
    }
    function loginFaild(Response) {
        loginValidation.setToken('');
        const inputElement = document.getElementById("pw_txtbox");
        inputElement.classList.add('incorrect-entry-textbox');
        setTimeout(() => {
            inputElement.classList.remove('incorrect-entry-textbox');
            inputElement.value = '';
        }, 2000);
        screens.removeLodingScreen();
        screens.removeModalWindow();
        screens.removeBlurr("login_container");
    }
});
