define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var BOriginalObjectID;
    var BActiveDropDown = "";
    var BIsSingelSelect = false;
    var BDropdownHeader = 'TRUST_multiselect_';
    var BMultiselectContainer = 'TRUST_multiselect_container_';
    var BSelecAll_div = 'TRUST_multiselect_selectAll_div_';
    var BSelectAllCheckBox = 'SelectAll_CheckBox_';
    var BDropDownHeaderResultSpan = 'TRUST_result_span_';
    var BOptionList_div = 'TRUST_multiselect_selection_list_div_';
    var BSectionCheckbox = 'selection_CheckBox_';
    var BSearchArea_div = 'TRUST_multiselect_searchBox_div_';
    var BSearchTextBox = 'TRUST_multiselect_searchBox_';
    document.addEventListener('click', autoCloseDropdown);
    function TRUSTmultiSelect(PObjectID) {
        BOriginalObjectID = PObjectID;
        clearExistingDropDown();
        BIsSingelSelect = checkIsSingleSelect(BOriginalObjectID);
        createMainlabel();
        createDropDownContainer();
        createSearchBox();
        createSelectAllBox();
        createSelectionList();
        fillUpSelectionList(BOriginalObjectID, "");
        selectionIndicatroLabelChange(document.getElementById(BOptionList_div + BOriginalObjectID));
        addEventsAndFunctions();
    }
    exports.TRUSTmultiSelect = TRUSTmultiSelect;
    function clearExistingDropDown() {
        let element = document.getElementById(BDropdownHeader + BOriginalObjectID);
        if (element != null) {
            element.parentNode.removeChild(element);
        }
        element = document.getElementById(BMultiselectContainer + BOriginalObjectID);
        if (element != null) {
            element.parentNode.removeChild(element);
        }
    }
    function checkIsSingleSelect(POriginalListID) {
        let ListObject = document.getElementById(POriginalListID);
        if (ListObject.hasAttribute("multiple")) {
            if (ListObject.getAttribute("multiple") == "multiple") {
                return false;
            }
        }
        return true;
    }
    function createMainlabel() {
        let ListObject = document.getElementById(BOriginalObjectID);
        ListObject.style.display = 'none';
        let Label_div = document.createElement("div");
        Label_div.id = BDropdownHeader + BOriginalObjectID;
        Label_div.setAttribute('original-id', BOriginalObjectID);
        Label_div.classList.add("main-label");
        var ResultSpan = document.createElement('span');
        ResultSpan.id = BDropDownHeaderResultSpan + BOriginalObjectID;
        ResultSpan.classList.add("result-span");
        ResultSpan.innerHTML = " ";
        Label_div.appendChild(ResultSpan);
        let iconSpan = document.createElement('span');
        iconSpan.classList.add("drop-down-icon");
        iconSpan.innerHTML = "";
        Label_div.appendChild(iconSpan);
        let ParentDiv = document.getElementById(BOriginalObjectID).parentElement;
        ParentDiv.appendChild(Label_div);
    }
    function createDropDownContainer() {
        let Cotainer_div = document.createElement("div");
        Cotainer_div.id = BMultiselectContainer + BOriginalObjectID;
        Cotainer_div.setAttribute('original-id', BOriginalObjectID);
        Cotainer_div.classList.add("multiselect-container");
        let ParentDiv = document.getElementById(BOriginalObjectID).parentElement;
        ParentDiv.appendChild(Cotainer_div);
    }
    function createSearchBox() {
        let SearchBox_div = document.createElement("div");
        SearchBox_div.id = BSearchArea_div + BOriginalObjectID;
        SearchBox_div.classList.add("search-box-container");
        let SearchBox = document.createElement("INPUT");
        SearchBox.id = 'TRUST_multiselect_searchBox_' + BOriginalObjectID;
        SearchBox.setAttribute("type", "text");
        SearchBox.placeholder = "Search";
        SearchBox.onkeyup = () => search(SearchBox);
        SearchBox_div.appendChild(SearchBox);
        appendNewChild(SearchBox_div);
    }
    function createSelectAllBox() {
        let selectAll_div = document.createElement("div");
        selectAll_div.id = BSelecAll_div + BOriginalObjectID;
        selectAll_div.classList.add("select-all-container");
        let selectAllButton = document.createElement("div");
        selectAllButton.innerHTML = "Select";
        selectAllButton.setAttribute("original-id", BOriginalObjectID);
        if (!(BIsSingelSelect || IsSelectDisable(BOriginalObjectID))) {
            selectAllButton.onclick = () => selectAllSearchResult(selectAllButton);
        }
        selectAllButton.classList.add("pipe-before-icon");
        selectAll_div.appendChild(selectAllButton);
        let clearAllButton = document.createElement("div");
        clearAllButton.innerHTML = "Clear All";
        clearAllButton.setAttribute("original-id", BOriginalObjectID);
        if (!(BIsSingelSelect || IsSelectDisable(BOriginalObjectID))) {
            clearAllButton.onclick = () => clearAll(clearAllButton);
        }
        clearAllButton.classList.add("cross-before-icon");
        selectAll_div.appendChild(clearAllButton);
        appendNewChild(selectAll_div);
    }
    function createSelectionList() {
        let selection_list_div = document.createElement("div");
        selection_list_div.id = BOptionList_div + BOriginalObjectID;
        selection_list_div.classList.add("selection-list-container");
        appendNewChild(selection_list_div);
    }
    function createSelectionRow(POriginalID, RowID, FinanceFroupdId, LabelText, PIsSelected) {
        let selection_container = document.createElement("div");
        selection_container.id = 'selection_container_' + POriginalID + "_" + RowID;
        selection_container.classList.add("item");
        let checkbox = document.createElement('input');
        checkbox.type = "checkbox";
        checkbox.id = "selection_CheckBox_" + POriginalID + "_" + RowID;
        checkbox.setAttribute('name', 'selection_CheckBox_' + POriginalID + '_' + FinanceFroupdId);
        checkbox.checked = PIsSelected;
        checkbox.disabled = IsSelectDisable(POriginalID);
        checkbox.classList.add("checkbox");
        checkbox.onclick = () => changeRowSelection_Main(checkbox);
        var label = document.createElement('label');
        label.htmlFor = BSectionCheckbox + POriginalID + "_" + RowID;
        label.appendChild(document.createTextNode(LabelText));
        selection_container.appendChild(checkbox);
        selection_container.appendChild(label);
        return selection_container;
    }
    function appendNewChild(ChildToAddObject) {
        let DropDownContainer = document.getElementById(BMultiselectContainer + BOriginalObjectID);
        DropDownContainer.appendChild(ChildToAddObject);
    }
    function addEventsAndFunctions() {
        document.getElementById(BDropdownHeader + BOriginalObjectID).addEventListener("click", showDropDownList);
    }
    function showDropDownList() {
        let ObjectID = this.getAttribute("original-id");
        let dropdownList = document.getElementById(BMultiselectContainer + ObjectID);
        if (dropdownList.style.display == "block") {
            dropdownList.style.display = "none";
            BActiveDropDown = "";
        }
        else {
            if (BActiveDropDown != "") {
                CloseOpenDropDown();
            }
            dropdownList.style.display = "block";
            BActiveDropDown = ObjectID;
            let searchTextBox = document.getElementById(BSearchTextBox + ObjectID);
            searchTextBox.focus();
        }
    }
    function autoCloseDropdown(event) {
        if (BActiveDropDown != "" && event.which == 1) {
            let obj = event.target;
            let closeActiveDropDown = true;
            while (obj.nodeName != "HTML") {
                if (obj.hasAttribute("id")) {
                    if (obj.id.match(/TRUST_multiselect_.*/)) {
                        if (obj.id == BMultiselectContainer + BActiveDropDown || obj.id == BDropdownHeader + BActiveDropDown || obj.style.display != "block") {
                            closeActiveDropDown = false;
                            break;
                        }
                    }
                }
                obj = obj.parentElement;
            }
            if (closeActiveDropDown) {
                CloseOpenDropDown();
                BActiveDropDown = "";
            }
        }
    }
    function getOriginalID(PObj) {
        let obj = PObj;
        while (obj.nodeName != "HTML") {
            if (obj.hasAttribute("original-id")) {
                return obj.getAttribute("original-id");
            }
            obj = obj.parentElement;
        }
    }
    function search(PInputObj) {
        let originalListID = getOriginalID(PInputObj);
        fillUpSelectionList(originalListID, PInputObj.value);
    }
    exports.search = search;
    function fillUpSelectionList(POriginalSelectionListID, PSearchText) {
        let optionList_div = document.getElementById(BOptionList_div + POriginalSelectionListID);
        optionList_div.innerHTML = "";
        let OriginalList = document.getElementById(POriginalSelectionListID);
        let ListCount = OriginalList.options.length;
        let searchArray = PSearchText.replace(/\./g, "").split(" ");
        let regexText = ".*";
        for (let i = 0; i < searchArray.length; i++) {
            regexText += searchArray[i] + '.*';
        }
        var argRegEx = new RegExp(regexText, 'i');
        for (let i = 0; i < ListCount; i++) {
            if (OriginalList.options[i].text.replace(/\./g, "").search(argRegEx) > -1) {
                let selectionRow = createSelectionRow(POriginalSelectionListID, i, OriginalList.options[i].value, OriginalList.options[i].text, OriginalList.options[i].selected);
                optionList_div.appendChild(selectionRow);
            }
        }
    }
    function changeRowSelection_Main(PCheckboxObj) {
        let originalListID = getOriginalID(PCheckboxObj);
        if (checkIsSingleSelect(originalListID)) {
            clearSingleSelection(PCheckboxObj);
        }
        changeRowSelecttion(PCheckboxObj);
        selectionIndicatroLabelChange(PCheckboxObj);
    }
    exports.changeRowSelection_Main = changeRowSelection_Main;
    function changeRowSelecttion(PCheckboxObj) {
        let originalListID = getOriginalID(PCheckboxObj);
        let labelText = document.querySelector("#" + PCheckboxObj.id + "+ label").innerText;
        let OriginalList = document.getElementById(originalListID);
        let ListCount = OriginalList.options.length;
        for (let i = 0; i < ListCount; i++) {
            if (OriginalList.options[i].text == labelText) {
                OriginalList.options[i].selected = PCheckboxObj.checked;
                break;
            }
        }
    }
    function clearSingleSelection(PCheckboxObj) {
        if (PCheckboxObj.checked != false) {
            let originalListID = getOriginalID(PCheckboxObj);
            let OriginalList = document.getElementById(originalListID);
            let ListCount = OriginalList.options.length;
            for (let i = 0; i < ListCount; i++) {
                if (OriginalList.options[i].selected == true) {
                    OriginalList.options[i].selected = false;
                    let checkBox = document.getElementById(BSectionCheckbox + originalListID + "_" + i);
                    if (checkBox != null) {
                        checkBox.checked = false;
                    }
                    break;
                }
            }
        }
    }
    function clearAll(PObject) {
        selectAndUnSelectAll(PObject, false);
        selectionIndicatroLabelChange(PObject);
    }
    function selectAllSearchResult(PObject) {
        selectAndUnSelectAll(PObject, false);
        let searchIDArray = getSearchResultIndex(PObject);
        selectAndUnSelectAll(PObject, true, searchIDArray);
        selectionIndicatroLabelChange(PObject);
    }
    function selectAll(PObject) {
        selectAndUnSelectAll(PObject, true);
        selectionIndicatroLabelChange(PObject);
    }
    function selectAndUnSelectAll(PObject, PIsChecked, PSelectionIDArray) {
        let originalListID = getOriginalID(PObject);
        let OriginalList = document.getElementById(originalListID);
        let ListCount = OriginalList.options.length;
        for (let i = 0; i < ListCount; i++) {
            let changeAllowed = true;
            if (PSelectionIDArray != undefined) {
                if (PSelectionIDArray.indexOf(i) == -1) {
                    changeAllowed = false;
                }
            }
            if (changeAllowed) {
                OriginalList.options[i].selected = PIsChecked;
                let checkBox = document.getElementById(BSectionCheckbox + originalListID + "_" + i);
                if (checkBox != null) {
                    checkBox.checked = PIsChecked;
                }
            }
        }
    }
    function getSearchResultIndex(PObject) {
        let originalListID = getOriginalID(PObject);
        let optionList_div = document.getElementById(BOptionList_div + originalListID);
        let childDivs = optionList_div.childNodes;
        let idsOfSearchResult = [];
        for (let i = 0; i < childDivs.length; i++) {
            let stringArray = childDivs[i].id.split("_");
            idsOfSearchResult.push(parseInt(stringArray[stringArray.length - 1]));
        }
        return idsOfSearchResult;
    }
    function selectionIndicatroLabelChange(PObject) {
        let originalListID = getOriginalID(PObject);
        let OriginalList = document.getElementById(originalListID);
        let ListCount = OriginalList.options.length;
        let selectionCount = 0;
        let selectedValue;
        let selectionResultObj = document.getElementById(BDropDownHeaderResultSpan + originalListID);
        for (let i = 0; i < ListCount; i++) {
            if (OriginalList.options[i].selected) {
                selectionCount++;
                if (selectionCount == 1) {
                    selectedValue = OriginalList.options[i].text;
                }
            }
        }
        if (selectionCount == 1) {
            selectionResultObj.innerText = selectedValue;
            if (BIsSingelSelect) {
                CloseOpenDropDown();
                BActiveDropDown = "";
            }
        }
        else {
            selectionResultObj.innerText = selectionCount + "/" + ListCount + " Selected";
        }
    }
    function IsSelectDisable(PoriginalListID) {
        let originalList = document.getElementById(PoriginalListID);
        if (originalList.hasAttribute("enbale-all-selection")) {
            let enbaleAll = originalList.getAttribute("enbale-all-selection");
            if (enbaleAll == "false") {
                return true;
            }
        }
        return false;
    }
    function CloseOpenDropDown() {
        let openDropdownList = document.getElementById(BMultiselectContainer + BActiveDropDown);
        if (openDropdownList != null) {
            openDropdownList.style.display = "none";
        }
    }
    function TrustMultiselect_GetSelectionText_List(PoriginalListID) {
        let OriginalList = document.getElementById(PoriginalListID);
        let ListCount = OriginalList.options.length;
        let IsSingelSelect = checkIsSingleSelect(PoriginalListID);
        let Result = [];
        for (let i = 0; i < ListCount; i++) {
            if (OriginalList.options[i].selected) {
                Result.push(OriginalList.options[i].text);
                if (IsSingelSelect) {
                    break;
                }
            }
        }
        return Result;
    }
    function TrustMultiselect_GetSelectionValue_List(PoriginalListID) {
        let OriginalList = document.getElementById(PoriginalListID);
        let ListCount = OriginalList.options.length;
        let IsSingelSelect = checkIsSingleSelect(PoriginalListID);
        let Result = [];
        for (let i = 0; i < ListCount; i++) {
            if (OriginalList.options[i].selected) {
                Result.push(OriginalList.options[i].value);
                if (IsSingelSelect) {
                    break;
                }
            }
        }
        return Result;
    }
    exports.TrustMultiselect_GetSelectionValue_List = TrustMultiselect_GetSelectionValue_List;
    function TrustMultiselect_IDForChange(PoriginalListID) {
        return BDropDownHeaderResultSpan + PoriginalListID;
    }
    exports.TrustMultiselect_IDForChange = TrustMultiselect_IDForChange;
    function TrustMultiselect_EnableAllSelections(PoriginalListID, PEnable) {
        if (PEnable == undefined || PEnable == null) {
            PEnable = true;
        }
        document.getElementById(PoriginalListID).setAttribute("enbale-all-selection", PEnable);
    }
    function TrustMultiselect_ResetFilters(PoriginalListID) {
        let searchTextBox = document.getElementById(BSearchTextBox + PoriginalListID);
        searchTextBox.value = "";
        selectAll(searchTextBox);
    }
    function TrustMultiselect_AddExternalEvent() {
    }
    function ChangeSelectionByName(PoriginalListID, FinanceGroupId) {
        if (checkIsSingleSelect(PoriginalListID)) {
            let searchTextBox = document.getElementById(BSearchTextBox + PoriginalListID);
            searchTextBox.dispatchEvent(new Event('focus'));
            searchTextBox.value = "";
            searchTextBox.dispatchEvent(new KeyboardEvent('keyup', { 'key': 'a' }));
            let rates = document.getElementsByName('selection_CheckBox_' + PoriginalListID + '_' + FinanceGroupId);
            rates[0].click();
        }
    }
    exports.ChangeSelectionByName = ChangeSelectionByName;
});
