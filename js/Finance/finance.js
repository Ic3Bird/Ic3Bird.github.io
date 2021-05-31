var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
define(["require", "exports", "../Common/loginValidation", "../Common/serverSettings", "../Common/screenHelper", "../Common/TRUSTmultiSelect", "../Common/errorHandling", "../Common/requestHandler"], function (require, exports, loginV, serverSettings_1, screens, myMultiSelect, errorHandling, requestHandler_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    let observer = null;
    function displayFinance() {
        return __awaiter(this, void 0, void 0, function* () {
            screens.addModalWindow();
            screens.addLodingScreen();
            createCompenents();
            addDatepicker("datepicker_finance_record_input");
            addDatepicker("finance_record_csv_download");
            yield financeRecordStartUp();
            const financeMainContainer = (document.getElementById("finance_container"));
            financeMainContainer.style.visibility = '';
            screens.removeLodingScreen();
            screens.removeModalWindow();
        });
    }
    exports.displayFinance = displayFinance;
    function createCompenents() {
        const financeContainer = createFinanceContainer();
        const financeRecordAdd = createFinanceRecordAdd();
        financeContainer.appendChild(financeRecordAdd);
        const financeGroupdAdd = createfinanceGroupdAddPanel();
        financeContainer.appendChild(financeGroupdAdd);
        const financeLastActivity = createFinanceHistoryPanel();
        financeContainer.appendChild(financeLastActivity);
        const finaceCsvDownload = createDownloadCsvPanel();
        financeContainer.appendChild(finaceCsvDownload);
        document.body.appendChild(financeContainer);
    }
    function createFinanceContainer() {
        const financeMainContainer = (document.createElement('div'));
        financeMainContainer.id = "finance_container";
        financeMainContainer.classList.add("finance-container");
        financeMainContainer.style.visibility = 'hidden';
        return financeMainContainer;
    }
    function createFinanceRecordAdd() {
        const financeRecordAdd = (document.createElement('div'));
        financeRecordAdd.id = "finance_record_add";
        financeRecordAdd.classList.add("finance-panel");
        financeRecordAdd.appendChild(createFinanceGroupPickerPanel());
        financeRecordAdd.appendChild(createFinceTimePickerPanel());
        financeRecordAdd.appendChild(createPriceSetPanel());
        financeRecordAdd.appendChild(createFinanceReasonPanel());
        financeRecordAdd.appendChild(createFinaceButtonPanel());
        return financeRecordAdd;
    }
    function createParagraph(text) {
        const paragraph = (document.createElement('p'));
        paragraph.innerText = text;
        return paragraph;
    }
    function createFinanceGroupPickerPanel() {
        const financeGroupdComp = (document.createElement('div'));
        financeGroupdComp.id = "finace_group_picker";
        financeGroupdComp.classList.add("finance-group-picker-panel");
        financeGroupdComp.setAttribute("loaded-finance-id", '0');
        const financeGroupds = (document.createElement('select'));
        financeGroupds.id = "finance_group_list";
        const subDiv = (document.createElement('div'));
        subDiv.appendChild(financeGroupds);
        financeGroupdComp.appendChild(subDiv);
        return financeGroupdComp;
    }
    function createFinceTimePickerPanel() {
        const finceTimePickerComp = (document.createElement('div'));
        finceTimePickerComp.id = "finace_datepicker";
        finceTimePickerComp.classList.add("finance-subcomeponent-panel");
        const subDiv = (document.createElement('div'));
        const dateInputElement = creatInputBox("datepicker_finance_record_input");
        dateInputElement.classList.add("input-text-center");
        subDiv.appendChild(dateInputElement);
        finceTimePickerComp.appendChild(subDiv);
        return finceTimePickerComp;
    }
    function createPriceSetPanel() {
        const fincePriceSetComp = (document.createElement('div'));
        fincePriceSetComp.id = "finance_price_set";
        fincePriceSetComp.classList.add("finance-subcomeponent-panel");
        const priceInputElement = creatInputBox("finance_price_input", false);
        priceInputElement.classList.add("input-text-center");
        priceInputElement.onkeyup = (e) => addThousandSeparator("finance_price_input");
        fincePriceSetComp.appendChild(priceInputElement);
        return fincePriceSetComp;
    }
    function createFinanceReasonPanel() {
        const finceReasonComp = (document.createElement('div'));
        finceReasonComp.id = "finace_reason_panel";
        finceReasonComp.classList.add("finance-subcomeponent-panel");
        const financeReasonText = (document.createElement('textarea'));
        financeReasonText.id = "finance_reason";
        finceReasonComp.appendChild(financeReasonText);
        return finceReasonComp;
    }
    function createFinaceButtonPanel() {
        const finceButtonsComp = (document.createElement('div'));
        finceButtonsComp.classList.add("finance-subcomeponent-panel");
        const saveButton = createButton("save_finance", 'Save', () => { SaveFinanceRecord(); });
        finceButtonsComp.appendChild(saveButton);
        return finceButtonsComp;
    }
    function creatInputBox(id, autocomplete = true) {
        const inputBox = (document.createElement('input'));
        inputBox.id = id;
        inputBox.type = 'text';
        if (!autocomplete) {
            inputBox.autocomplete = 'off';
        }
        return inputBox;
    }
    function createButton(id, text, callbackFn) {
        const button = (document.createElement('button'));
        button.id = id;
        button.textContent = text;
        button.addEventListener('click', callbackFn);
        return button;
    }
    function createfinanceGroupdAddPanel() {
        const financeGroupdAdd = (document.createElement('div'));
        financeGroupdAdd.id = "finance_group_add";
        financeGroupdAdd.classList.add("finance-group-panel");
        financeGroupdAdd.appendChild(createNewGroupNamePanel());
        financeGroupdAdd.appendChild(createNewGroupTypePanel());
        financeGroupdAdd.appendChild(createNewFinaceGroupSaveButtonPanel());
        return financeGroupdAdd;
    }
    function createNewGroupNamePanel() {
        const financeGroupd = (document.createElement('div'));
        financeGroupd.id = "finace_new_group_input_panel";
        financeGroupd.appendChild(createParagraph('Add New Group'));
        financeGroupd.appendChild(creatInputBox("new_finance_group_input"));
        return financeGroupd;
    }
    function createNewGroupTypePanel() {
        const financeNewGroup = (document.createElement('div'));
        financeNewGroup.id = "finace_new_group_types";
        const isIncome = (document.createElement('input'));
        isIncome.type = 'checkbox';
        isIncome.id = "input_isincome";
        financeNewGroup.appendChild(isIncome);
        financeNewGroup.appendChild(createParagraph('Is Income'));
        const isReport = (document.createElement('input'));
        isReport.type = 'checkbox';
        isReport.id = "input_isreport";
        financeNewGroup.appendChild(isReport);
        financeNewGroup.appendChild(createParagraph('Is Report'));
        return financeNewGroup;
    }
    function createNewFinaceGroupSaveButtonPanel() {
        const finceButtonsComp = (document.createElement('div'));
        finceButtonsComp.classList.add("finance-subcomeponent-panel");
        const saveButton = createButton("save_finance", 'Save', () => { AddFinanceGroup(); });
        finceButtonsComp.appendChild(saveButton);
        return finceButtonsComp;
    }
    function createFinanceHistoryPanel() {
        const financeLastActivity = (document.createElement('div'));
        financeLastActivity.id = "finace_historical_activity";
        financeLastActivity.classList.add("finance-history-panel");
        return financeLastActivity;
    }
    function createDownloadCsvPanel() {
        const financeRecordCsvPanel = (document.createElement('div'));
        financeRecordCsvPanel.id = "finance_record_csv";
        financeRecordCsvPanel.classList.add("finance-csv-panel");
        const dateInputElement = creatInputBox("finance_record_csv_download");
        dateInputElement.classList.add("input-text-center");
        financeRecordCsvPanel.appendChild(dateInputElement);
        const isLog = (document.createElement('input'));
        isLog.type = 'checkbox';
        isLog.id = "input_logdate";
        financeRecordCsvPanel.appendChild(isLog);
        const saveButton = createButton("finance_record_csv_download", 'get', () => { getFinanceRecordCsv(); });
        financeRecordCsvPanel.appendChild(saveButton);
        return financeRecordCsvPanel;
    }
    function addThousandSeparator(inputboxId) {
        let priceInputElement = document.getElementById(inputboxId);
        priceInputElement.value = thousandSeparatorConverter(priceInputElement.value);
    }
    function thousandSeparatorConverter(valueToConvert) {
        let originalValue = valueToConvert;
        let priceValueStr = valueToConvert.toString().replace(/ /g, '');
        let priceValue = Number(priceValueStr);
        if (isNaN(priceValue)) {
            return originalValue;
        }
        if (priceValue >= 1000) {
            return priceValueStr.replace(/\B(?=(\d{3})+(?!\d))/g, " ");
        }
        return priceValueStr;
    }
    function FinanceGroupdDropDownMain() {
        return __awaiter(this, void 0, void 0, function* () {
            yield FillFinanceDropdow();
            myMultiSelect.TRUSTmultiSelect("finance_group_list");
            AddChangeForCreatedDropDown();
            return Promise.resolve(1);
        });
    }
    function AddChangeForCreatedDropDown() {
        const elementToObserve = document.getElementById(myMultiSelect.TrustMultiselect_IDForChange("finance_group_list"));
        observer = new MutationObserver(fianceGroupChangeHandler);
        observer.observe(elementToObserve, { subtree: true, childList: true });
    }
    function SaveFinanceRecord() {
        return __awaiter(this, void 0, void 0, function* () {
            const postBody = {
                "ID": getFinanceIdForEdit(),
                "RecordDate": document.getElementById("datepicker_finance_record_input").value,
                "FinanceGroupID": Number(myMultiSelect.TrustMultiselect_GetSelectionValue_List("finance_group_list")[0]),
                "Reason": document.getElementById("finance_reason").value,
                "Amount": Number(document.getElementById("finance_price_input").value.replace(/ /g, '').trim()),
            };
            const saveMethod = postBody.ID == 0 ? 'POST' : 'PUT';
            const url = serverSettings_1.myAPIsource() + "/finance/expense";
            const options = {
                method: saveMethod,
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + loginV.getToken(),
                },
                body: JSON.stringify(postBody)
            };
            const saveResponse = yield requestHandler_1.initateRequest(url, options);
            const saveResult = yield saveResponse.json();
            ShowResponse(saveResult);
            if (saveResult.actionSucced) {
                ShowLastActivity();
            }
        });
    }
    function AddFinanceGroup() {
        return __awaiter(this, void 0, void 0, function* () {
            var postBody = {
                "GroupName": document.getElementById("new_finance_group_input").value,
                "IsIncome": document.getElementById("input_isincome").checked,
                "IsReport": document.getElementById("input_isreport").checked,
                "IsActive": true
            };
            const url = serverSettings_1.myAPIsource() + "/finance/group";
            const options = {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + loginV.getToken(),
                },
                body: JSON.stringify(postBody)
            };
            const rawResponse = yield requestHandler_1.initateRequest(url, options);
            const response = yield rawResponse.json();
            ShowResponse(response);
            if (response.actionSucced) {
                yield FinanceGroupdDropDownMain();
            }
        });
    }
    function FillFinanceDropdow() {
        return __awaiter(this, void 0, void 0, function* () {
            let financeGroupResponse = yield DownloadActiveGroups();
            const finaceGroupsDropDown = document.getElementById("finance_group_list");
            finaceGroupsDropDown.innerHTML = '';
            if (financeGroupResponse.actionSucced) {
                for (var i = 0; i < financeGroupResponse.financeGroupTypes.length; i++) {
                    let obj = financeGroupResponse.financeGroupTypes[i];
                    let option = document.createElement("option");
                    option.text = obj.groupName;
                    option.value = obj.id;
                    finaceGroupsDropDown.add(option);
                }
            }
            else {
                errorHandling.ShowServerError(financeGroupResponse);
            }
            return Promise.resolve(1);
        });
    }
    function DownloadLastActivity() {
        return __awaiter(this, void 0, void 0, function* () {
            const url = serverSettings_1.myAPIsource() + "/finance/history/record";
            const options = {
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + loginV.getToken(),
                }
            };
            const rawResponse = yield requestHandler_1.initateRequest(url, options);
            return rawResponse.json();
        });
    }
    function DownloadActiveGroups() {
        return __awaiter(this, void 0, void 0, function* () {
            const url = serverSettings_1.myAPIsource() + "/finance/group/active";
            const options = {
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + loginV.getToken(),
                }
            };
            const rawResponse = yield requestHandler_1.initateRequest(url, options);
            return rawResponse.json();
        });
    }
    function ShowResponse(reponseObject) {
        if (reponseObject.actionSucced) {
            let responseText = "Action Succed";
            if (reponseObject.successMessage != null) {
                responseText = reponseObject.successMessage;
            }
            screens.showServerResponse(responseText, false);
        }
        else {
            errorHandling.ShowServerError(reponseObject);
        }
    }
    function ShowLastActivity() {
        return __awaiter(this, void 0, void 0, function* () {
            let lastActivityResponse = yield DownloadLastActivity();
            const container = document.getElementById("finace_historical_activity");
            container.innerHTML = "";
            container.appendChild(createHistroyHeader());
            if (lastActivityResponse.actionSucced) {
                for (var i = 0; i < lastActivityResponse.financeRecordDetails.length; i++) {
                    container.appendChild(createLastActivityItem(lastActivityResponse.financeRecordDetails[i]));
                }
            }
            else {
                errorHandling.ShowServerError(lastActivityResponse);
            }
        });
    }
    function createHistroyHeader() {
        let headerDiv = document.createElement("div");
        headerDiv.classList.add("finance-histroy-row");
        let recDatePara = document.createElement("P");
        recDatePara.classList.add("record-date-column");
        recDatePara.innerHTML = "Record Date";
        headerDiv.appendChild(recDatePara);
        let GroupPara = document.createElement("P");
        GroupPara.classList.add("finance-group-column");
        GroupPara.innerHTML = "Fiance Group";
        headerDiv.appendChild(GroupPara);
        let amountPara = document.createElement("P");
        amountPara.classList.add("amount-column");
        amountPara.innerHTML = "Amount";
        headerDiv.appendChild(amountPara);
        let reasonPara = document.createElement("P");
        reasonPara.classList.add("reason-column");
        reasonPara.innerHTML = "Reason";
        headerDiv.appendChild(reasonPara);
        let saveDatePara = document.createElement("P");
        saveDatePara.classList.add("save-date-column");
        saveDatePara.innerHTML = "Save Date";
        headerDiv.appendChild(saveDatePara);
        let editPara = document.createElement("P");
        editPara.classList.add("edit-icon");
        headerDiv.appendChild(editPara);
        return headerDiv;
    }
    function createLastActivityItem(financeHistoryRecord) {
        let div = document.createElement("div");
        div.classList.add("finance-histroy-row");
        div.setAttribute('fr_id', financeHistoryRecord.fR_ID);
        let recDatePara = document.createElement("P");
        recDatePara.classList.add("record-date-column");
        recDatePara.innerHTML = financeHistoryRecord.recordDate.slice(0, 10);
        div.appendChild(recDatePara);
        let GroupPara = document.createElement("P");
        GroupPara.classList.add("finance-group-column");
        GroupPara.innerHTML = financeHistoryRecord.groupName;
        div.appendChild(GroupPara);
        let amountPara = document.createElement("P");
        amountPara.classList.add("amount-column");
        amountPara.innerHTML = thousandSeparatorConverter(financeHistoryRecord.amount);
        div.appendChild(amountPara);
        let reasonPara = document.createElement("P");
        reasonPara.classList.add("reason-column");
        reasonPara.innerHTML = financeHistoryRecord.reason;
        div.appendChild(reasonPara);
        let saveDatePara = document.createElement("P");
        saveDatePara.classList.add("save-date-column");
        saveDatePara.innerHTML = financeHistoryRecord.saveDate.replace("T", " ");
        div.appendChild(saveDatePara);
        let editImg = document.createElement("img");
        editImg.classList.add("edit-icon");
        editImg.src = "assets/img/edit-icon-512.png";
        editImg.onclick = (e) => initiateFinanceRecordForEdit(editImg);
        div.appendChild(editImg);
        return div;
    }
    function addDatepicker(inputId) {
        const input = document.getElementById(inputId);
        const datepicker = new TheDatepicker.Datepicker(input);
        datepicker.options.setInputFormat('Y-m-d');
        datepicker.options.setMinDate('2010-01-01');
        datepicker.options.setMaxDate('2030-01-01');
        datepicker.options.setInitialDate(dateTime_Now());
        datepicker.options.setShowDeselectButton(false);
        datepicker.options.setAllowEmpty(false);
        datepicker.render();
    }
    function dateTime_Now() {
        let date = new Date();
        let month = '0' + (date.getMonth() + 1);
        let day = '0' + date.getDate();
        let result = date.getFullYear() + '-' + month.substring(month.length - 2) + '-' + day.substring(day.length - 2);
        return result;
    }
    function financeRecordStartUp() {
        return __awaiter(this, void 0, void 0, function* () {
            yield FinanceGroupdDropDownMain();
            ShowLastActivity();
            return Promise.resolve(1);
        });
    }
    function fianceGroupChangeHandler() {
        return __awaiter(this, void 0, void 0, function* () {
            clearFinanceRecordFileds();
            saveFinanceIdForEdit(0);
            loadPredefinedValues();
        });
    }
    function clearFinanceRecordFileds() {
        document.getElementById("finance_reason").value = "";
        document.getElementById("finance_price_input").value = "";
    }
    function saveFinanceIdForEdit(financeID) {
        document.getElementById("finace_group_picker").setAttribute("loaded-finance-id", financeID);
    }
    function getFinanceIdForEdit() {
        let finaceRecordID = Number(document.getElementById("finace_group_picker").getAttribute("loaded-finance-id"));
        return finaceRecordID > 0 ? finaceRecordID : 0;
    }
    function loadPredefinedValues() {
        return __awaiter(this, void 0, void 0, function* () {
            const groupID = Number(myMultiSelect.TrustMultiselect_GetSelectionValue_List("finance_group_list")[0]);
            let predefinedValuesResponse = yield downloadPredefinedFinanceRecord(groupID);
            if (predefinedValuesResponse.actionSucced) {
                if (predefinedValuesResponse.financeRecordPredifinedValue != null) {
                    showPerdefinedValues(predefinedValuesResponse.financeRecordPredifinedValue);
                }
            }
            else {
                errorHandling.ShowServerError(predefinedValuesResponse);
            }
        });
    }
    function downloadPredefinedFinanceRecord(groupID) {
        return __awaiter(this, void 0, void 0, function* () {
            const url = serverSettings_1.myAPIsource() + "/finance/records/groups" + '/' + groupID;
            const options = {
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + loginV.getToken(),
                }
            };
            const rawResponse = yield requestHandler_1.initateRequest(url, options);
            return rawResponse.json();
        });
    }
    function showPerdefinedValues(predefinedValues) {
        if (predefinedValues.reason != null) {
            document.getElementById("finance_reason").value = predefinedValues.reason;
        }
        if (predefinedValues.amount != null) {
            document.getElementById("finance_price_input").value = predefinedValues.amount;
            addThousandSeparator("finance_price_input");
        }
    }
    function initiateFinanceRecordForEdit(sourceObject) {
        return __awaiter(this, void 0, void 0, function* () {
            clearMutationObserver();
            vizualiseFinanceRecordData(yield loadFinanceRecordForEdit(sourceObject.parentNode.getAttribute("fr_id")));
            AddChangeForCreatedDropDown();
        });
    }
    function loadFinanceRecordForEdit(financeRecordId) {
        return __awaiter(this, void 0, void 0, function* () {
            const url = serverSettings_1.myAPIsource() + "/finance/expense" + '/' + financeRecordId;
            const options = {
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + loginV.getToken(),
                }
            };
            const rawResponse = yield requestHandler_1.initateRequest(url, options);
            return rawResponse.json();
        });
    }
    function clearMutationObserver() {
        observer.disconnect();
        observer = null;
    }
    function vizualiseFinanceRecordData(reponseObject) {
        if (reponseObject.actionSucced) {
            const finaceRecord = reponseObject.financeRecordType;
            saveFinanceIdForEdit(finaceRecord.id);
            if (Number(myMultiSelect.TrustMultiselect_GetSelectionValue_List("finance_group_list")[0]) != Number(finaceRecord.financeGroupID)) {
                myMultiSelect.ChangeSelectionByName("finance_group_list", finaceRecord.financeGroupID);
            }
            const recordDateInput = document.getElementById("datepicker_finance_record_input");
            recordDateInput.dispatchEvent(new Event('focus'));
            recordDateInput.value = finaceRecord.recordDate;
            recordDateInput.dispatchEvent(new KeyboardEvent('keyup', { 'key': 'a' }));
            const colseButton = document.getElementsByClassName('the-datepicker__close');
            colseButton[0].childNodes[0].dispatchEvent(new Event('click'));
            const amountInput = document.getElementById("finance_price_input");
            amountInput.value = finaceRecord.amount;
            amountInput.dispatchEvent(new KeyboardEvent('keyup', { 'key': 'a' }));
            document.getElementById("finance_reason").value = finaceRecord.reason;
        }
        else {
            errorHandling.ShowServerError(reponseObject);
        }
    }
    function getFinanceRecordCsv() {
        return __awaiter(this, void 0, void 0, function* () {
            const requestedDate = document.getElementById("finance_record_csv_download").value;
            const url = getCsvUrl() + requestedDate;
            const options = {
                method: 'GET',
                headers: {
                    Authorization: 'Bearer ' + loginV.getToken(),
                }
            };
            const rawResponse = yield requestHandler_1.initateRequest(url, options);
            const response = yield rawResponse.json();
            const myblob = new Blob([b64DecodeUnicode(response.file.fileContents)], {
                type: response.file.contentType
            });
            showFile(myblob, response.file.fileDownloadName);
        });
    }
    function getCsvUrl() {
        if (document.getElementById("input_logdate").checked) {
            return serverSettings_1.myAPIsource() + "/finance/records/csv/log" + '/';
        }
        return serverSettings_1.myAPIsource() + "/finance/records/csv" + '/';
    }
    function b64DecodeUnicode(str) {
        return decodeURIComponent(atob(str).split('').map(function (c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));
    }
    function showFile(blob, fileName) {
        var url = window.URL.createObjectURL(blob);
        var a = document.createElement('a');
        a.href = url;
        a.download = fileName;
        document.body.appendChild(a);
        a.click();
        a.remove();
    }
});
