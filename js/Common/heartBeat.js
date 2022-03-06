var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
define(["require", "exports", "../Common/serverSettings"], function (require, exports, serverSettings_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    setInterval(wakeUpCall, 5 * 60 * 1000);
    function wakeUpCall() {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield fetch(serverSettings_1.myAPIsource() + '/heartbeat', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            console.log(result);
        });
    }
});
