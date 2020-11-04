var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
define(["require", "exports", "../Common/loginValidation", "../Common/serverSettings", "../Common/TRUSTmultiSelect"], function (require, exports, loginV, serverSettings_1, myMultiSelect) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function displayFinance() {
        createCompenents();
        financeRecordStartUp();
    }
    exports.displayFinance = displayFinance;
    function createCompenents() {
        const loginContainer = createFinanceContainer();
        const financeComponent = createFinancePanel();
        const financeRecordAdd = createfinanceRecordAdd();
        financeComponent.appendChild(financeRecordAdd);
        const financeGroupdAdd = createfinanceGroupdAdd();
        financeComponent.appendChild(financeGroupdAdd);
        const financeLastActivity = createLastActivity();
        financeComponent.appendChild(financeLastActivity);
        loginContainer.appendChild(financeComponent);
        document.body.appendChild(loginContainer);
    }
    function createFinanceContainer() {
        const financeMainContainer = (document.createElement('div'));
        financeMainContainer.id = "finance_container";
        financeMainContainer.classList.add("finance-container");
        return financeMainContainer;
    }
    function createFinancePanel() {
        const financeComponent = (document.createElement('div'));
        financeComponent.id = "finance_comp";
        financeComponent.classList.add("finance-panel");
        return financeComponent;
    }
    function createfinanceRecordAdd() {
        const financeRecordAdd = (document.createElement('div'));
        financeRecordAdd.id = "finance_record_add";
        financeRecordAdd.appendChild(createExpenseRadioButtons());
        financeRecordAdd.appendChild(createFinanceGroups());
        financeRecordAdd.appendChild(creatInputBox("datepicker_input"));
        financeRecordAdd.appendChild(creatInputBox("finance_price", false));
        financeRecordAdd.appendChild(creatInputBox("finance_reason", false));
        financeRecordAdd.appendChild(createButton("save_finance", 'Save', () => { SaveFinanceRecord(); }));
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
    function createFinanceGroups() {
        const financeGroupdComp = (document.createElement('div'));
        const financeGroupds = (document.createElement('select'));
        financeGroupds.id = "finance_group_list";
        financeGroupdComp.appendChild(financeGroupds);
        return financeGroupdComp;
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
    function createfinanceGroupdAdd() {
        const financeGroupdAdd = (document.createElement('div'));
        financeGroupdAdd.id = "finance_group_add";
        return financeGroupdAdd;
    }
    function createLastActivity() {
        const financeLastActivity = (document.createElement('div'));
        financeLastActivity.id = "finace_last_activity";
        return financeLastActivity;
    }
    function FinanceGroupdDropDownMain() {
        return __awaiter(this, void 0, void 0, function* () {
            yield FillFinanceDropdow();
            myMultiSelect.TRUSTmultiSelect("finance_group_list");
        });
    }
    function SaveFinanceRecord() {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(2);
            console.log("finance_group_list");
            console.log(myMultiSelect.TrustMultiselect_GetSelectionValue_List("finance_group_list")[0]);
            var postBody = {
                "RecordedDate": document.getElementById("datepicker_input").value,
                "FinanceGroupID": myMultiSelect.TrustMultiselect_GetSelectionValue_List("finance_group_list")[0],
                "Reason": document.getElementById("finance_reason").value,
                "Amount": document.getElementById("finance_price").value
            };
            ShowLastActivity();
        });
    }
    function AddFinanceGroup() {
        return __awaiter(this, void 0, void 0, function* () {
            var mybody = {
                "GroupName": document.getElementById('new_finance_group').value,
                "IsIncome": document.getElementById('input_isincome').checked,
                "IsReport": document.getElementById('input_isreport').checked,
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
            const rawResponse = yield fetch(serverSettings_1.myAPIsource() + "/finance/group/activity", {
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
        let ResponseH1 = document.getElementById("response_div").getElementsByTagName("H1")[0];
        ResponseH1.innerHTML = reponseText;
        setTimeout(function () { ResponseH1.innerHTML = ""; }, 2000);
    }
    function ShowLastActivity() {
        return __awaiter(this, void 0, void 0, function* () {
            let lastActivity = yield DownloadLastActivity();
            const container = document.getElementById("last_activity_container");
            container.innerHTML = "";
            for (var i = 0; i < lastActivity.length; i++) {
                let obj = lastActivity[i];
                let div = document.createElement("div");
                div.innerHTML = obj.financeActivity + " ->> Save Date: " + obj.saveDate.replace("T", " ");
                container.appendChild(div);
            }
        });
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
        addDatepicker();
    }
});
