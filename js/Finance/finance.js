var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
define(["require", "exports", "../Common/loginValidation", "../Common/serverSettings", "../Common/screenHelper", "../Common/TRUSTmultiSelect"], function (require, exports, loginV, serverSettings_1, screens, myMultiSelect) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function displayFinance() {
        return __awaiter(this, void 0, void 0, function* () {
            screens.addModalWindow();
            screens.addLodingScreen();
            createCompenents();
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
        const financeRecordAdd = createfinanceRecordAdd();
        financeContainer.appendChild(financeRecordAdd);
        const financeGroupdAdd = createfinanceGroupdAddPanel();
        financeContainer.appendChild(financeGroupdAdd);
        const financeLastActivity = createFinanceHistoryPanel();
        financeContainer.appendChild(financeLastActivity);
        document.body.appendChild(financeContainer);
    }
    function createFinanceContainer() {
        const financeMainContainer = (document.createElement('div'));
        financeMainContainer.id = "finance_container";
        financeMainContainer.classList.add("finance-container");
        financeMainContainer.style.visibility = 'hidden';
        return financeMainContainer;
    }
    function createfinanceRecordAdd() {
        const financeRecordAdd = (document.createElement('div'));
        financeRecordAdd.id = "finance_record_add";
        financeRecordAdd.classList.add("finance-panel");
        financeRecordAdd.appendChild(createExpenseRadioButtons());
        financeRecordAdd.appendChild(createFinanceGroupPickerPanel());
        financeRecordAdd.appendChild(createFinceTimePickerPanel());
        financeRecordAdd.appendChild(createPriceSetPanel());
        financeRecordAdd.appendChild(createFinanceReasonPanel());
        financeRecordAdd.appendChild(createFinaceButtonPanel());
        return financeRecordAdd;
    }
    function createExpenseRadioButtons() {
        const radioGroup = 'recordType';
        const financeIncExp = (document.createElement('div'));
        financeIncExp.id = "finace_income_expense_change";
        financeIncExp.classList.add("income-expense-panel");
        financeIncExp.appendChild(createParagraph('Income'));
        const income = (document.createElement('input'));
        income.type = 'radio';
        income.onclick = (e) => FinanceGroupdDropDownMain();
        income.name = radioGroup;
        income.id = "income_radio";
        financeIncExp.appendChild(income);
        financeIncExp.appendChild(createParagraph('Expense'));
        const expense = (document.createElement('input'));
        expense.type = 'radio';
        expense.onclick = (e) => FinanceGroupdDropDownMain();
        expense.checked = true;
        expense.name = radioGroup;
        expense.id = "expense_radio";
        financeIncExp.appendChild(expense);
        return financeIncExp;
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
        const dateInputElement = creatInputBox("datepicker_input");
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
        priceInputElement.onkeyup = (e) => addThousanSeparator("finance_price_input");
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
        financeGroupdAdd.classList.add("finance-panel");
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
    function addThousanSeparator(inputboxId) {
        let priceInputElement = document.getElementById(inputboxId);
        let priceValueOriginal = priceInputElement.value;
        let priceValueStr = priceInputElement.value.replace(/ /g, '');
        let priceValue = Number(priceValueStr);
        if (!isNaN(priceValue)) {
            if (priceValue >= 1000) {
                priceInputElement.value = priceValueStr.replace(/\B(?=(\d{3})+(?!\d))/g, " ");
            }
            else {
                priceInputElement.value = priceValue.toString();
            }
        }
        else {
            priceInputElement.value = priceValueOriginal;
        }
    }
    function FinanceGroupdDropDownMain() {
        return __awaiter(this, void 0, void 0, function* () {
            yield FillFinanceDropdow();
            myMultiSelect.TRUSTmultiSelect("finance_group_list");
            return Promise.resolve(1);
        });
    }
    function SaveFinanceRecord() {
        return __awaiter(this, void 0, void 0, function* () {
            const postBody = {
                "RecordDate": document.getElementById("datepicker_input").value,
                "FinanceGroupID": Number(myMultiSelect.TrustMultiselect_GetSelectionValue_List("finance_group_list")[0]),
                "Reason": document.getElementById("finance_reason").value,
                "Amount": Number(document.getElementById("finance_price_input").value.replace(/ /g, '').trim()),
            };
            const saveResponse = yield fetch(serverSettings_1.myAPIsource() + "/finance/expense", {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + loginV.getToken()
                },
                body: JSON.stringify(postBody)
            });
            saveResponseHandler(saveResponse);
        });
    }
    function saveResponseHandler(response) {
        if (response.status == 200) {
            screens.showServerResponse('Expesne inserted', false);
            FinanceGroupdDropDownMain();
            ShowLastActivity();
        }
        else {
            screens.showServerResponse('Expesne inserted failed', true);
        }
    }
    function AddFinanceGroup() {
        return __awaiter(this, void 0, void 0, function* () {
            var mybody = {
                "GroupName": document.getElementById("new_finance_group_input").value,
                "IsIncome": document.getElementById("input_isincome").checked,
                "IsReport": document.getElementById("input_isreport").checked,
                "IsActive": true
            };
            yield fetch(serverSettings_1.myAPIsource() + "/finance/group", {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + loginV.getToken()
                },
                body: JSON.stringify(mybody)
            }).then(response => response.json())
                .then(json => ShowResponse(json))
                .then(FinanceGroupdDropDownMain);
            ShowLastActivity();
        });
    }
    function FillFinanceDropdow() {
        return __awaiter(this, void 0, void 0, function* () {
            let financeGroups;
            const radioButton = document.getElementById("expense_radio");
            if (radioButton.checked) {
                financeGroups = yield DownloadActiveExpenseGroups();
            }
            else {
                financeGroups = yield DownloadActiveIncomeGroups();
            }
            const finaceGroupsDropDown = document.getElementById("finance_group_list");
            finaceGroupsDropDown.innerHTML = '';
            for (var i = 0; i < financeGroups.length; i++) {
                let obj = financeGroups[i];
                let option = document.createElement("option");
                option.text = obj.groupName;
                option.value = obj.id;
                finaceGroupsDropDown.add(option);
            }
            return Promise.resolve(1);
        });
    }
    function DownloadLastActivity() {
        return __awaiter(this, void 0, void 0, function* () {
            const rawResponse = yield fetch(serverSettings_1.myAPIsource() + "/finance/history/record", {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + loginV.getToken()
                }
            });
            return rawResponse.json();
        });
    }
    function DownloadActiveIncomeGroups() {
        return __awaiter(this, void 0, void 0, function* () {
            const rawResponse = yield fetch(serverSettings_1.myAPIsource() + "/finance/group/income/active", {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + loginV.getToken()
                }
            });
            return rawResponse.json();
        });
    }
    function DownloadActiveExpenseGroups() {
        return __awaiter(this, void 0, void 0, function* () {
            const rawResponse = yield fetch(serverSettings_1.myAPIsource() + "/finance/group/expense/active", {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + loginV.getToken()
                }
            });
            return rawResponse.json();
        });
    }
    function ShowResponse(reponseText) {
        screens.showServerResponse(reponseText, false);
    }
    function ShowLastActivity() {
        return __awaiter(this, void 0, void 0, function* () {
            let lastActivity = yield DownloadLastActivity();
            const container = document.getElementById("finace_historical_activity");
            container.innerHTML = "";
            container.appendChild(createHistroyHeader());
            for (var i = 0; i < lastActivity.length; i++) {
                container.appendChild(createLastActivityItem(lastActivity[i]));
            }
        });
    }
    function createHistroyHeader() {
        let headerDiv = document.createElement("div");
        headerDiv.classList.add("finance-histroy-row");
        let recDatePara = document.createElement("P");
        recDatePara.innerHTML = "Record Date";
        headerDiv.appendChild(recDatePara);
        let GroupPara = document.createElement("P");
        GroupPara.innerHTML = "Fiance Group";
        headerDiv.appendChild(GroupPara);
        let amountPara = document.createElement("P");
        amountPara.innerHTML = "Amount";
        headerDiv.appendChild(amountPara);
        let reasonPara = document.createElement("P");
        reasonPara.innerHTML = "Reason";
        headerDiv.appendChild(reasonPara);
        let saveDatePara = document.createElement("P");
        saveDatePara.innerHTML = "Save Date";
        headerDiv.appendChild(saveDatePara);
        return headerDiv;
    }
    function createLastActivityItem(financeHistoryRecord) {
        let div = document.createElement("div");
        div.classList.add("finance-histroy-row");
        let recDatePara = document.createElement("P");
        recDatePara.innerHTML = financeHistoryRecord.recordDate.slice(0, 10);
        div.appendChild(recDatePara);
        let GroupPara = document.createElement("P");
        GroupPara.innerHTML = financeHistoryRecord.groupName;
        div.appendChild(GroupPara);
        let amountPara = document.createElement("P");
        amountPara.innerHTML = financeHistoryRecord.amount;
        div.appendChild(amountPara);
        let reasonPara = document.createElement("P");
        reasonPara.innerHTML = financeHistoryRecord.reason;
        div.appendChild(reasonPara);
        let saveDatePara = document.createElement("P");
        saveDatePara.innerHTML = financeHistoryRecord.saveDate.replace("T", " ");
        div.appendChild(saveDatePara);
        return div;
    }
    function addDatepicker() {
        const input = document.getElementById("datepicker_input");
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
            addDatepicker();
            return Promise.resolve(1);
        });
    }
});
