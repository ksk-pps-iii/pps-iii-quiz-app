import { domainTransformations } from "../config/constants";
import { loadedSheets } from "../main";
import { closeModalByName, createModalWindow } from "../views/modals";
import { openPage } from "../views/pages";

export function getModal_sectionDrugsSettings(){
    var modal = createModalWindow("Sheets");

    //Sheets Section
    const areaSheetsSettings = document.createElement('div');
    areaSheetsSettings.classList.add('area-horizontal', 'area-newline');
    modal.appendChild(areaSheetsSettings);

    loadedSheets.forEach((sheet, index) => {
        if (!sheet.isLoaded || !sheet.loadedContent || sheet.loadedContent.length <= 0){
            return;
        }

        const btnSheet = document.createElement('button');
        btnSheet.classList.add('btn-normal', 'area-fit-horizontal');
        if (index === 0) {
            btnSheet.dataset.selected = true;
            btnSheet.classList.add('btn-working', 'btn-drugs-sheet');
        }
        btnSheet.dataset.sheet = sheet.sheet;
        const btnSheetIcon = document.createElement('span');
        btnSheetIcon.classList.add('icon', 'material-symbols-outlined');
        btnSheetIcon.textContent = 'data_table';
        btnSheet.appendChild(btnSheetIcon);
        const btnSheetText = document.createElement('span');
        btnSheetText.textContent = `${sheet.sheet} (${sheet.loadedContent.length})`;
        btnSheet.appendChild(btnSheetText);
        areaSheetsSettings.appendChild(btnSheet);

        btnSheet.addEventListener('click', () => {
            let isClicked = btnSheet.dataset.selected === 'true';
            isClicked = !isClicked;

            if (!isClicked) {
                var curSheetSelCount = 0;
                document.querySelectorAll('.btn-drugs-sheet').forEach(el => {
                    if (el.dataset.selected === 'true'){
                        curSheetSelCount++;
                    }
                });
                if (curSheetSelCount <= 1){
                    return;
                }
            }

            if (isClicked){
                btnSheet.dataset.selected = true;
                btnSheet.classList.add('btn-working');
            }
            else {
                btnSheet.dataset.selected = false;
                btnSheet.classList.remove('btn-working');
            }
        });
    });

    //Mode Sections
    const modeTitle = document.createElement('div');
    modeTitle.classList.add('txt-header');
    modeTitle.textContent = 'Mode';
    modal.appendChild(modeTitle);

    const openModeElements = [];
    const areaModeSettings = document.createElement('div');
    areaModeSettings.classList.add('area-horizontal', 'area-newline');
    modal.appendChild(areaModeSettings);

    const btnModeOrdered = document.createElement('button');
    btnModeOrdered.classList.add('btn-normal', 'btn-working');
    btnModeOrdered.dataset.mode = "ordered";
    btnModeOrdered.dataset.selected = true;
    const btnModeOrderedIcon = document.createElement('span');
    btnModeOrderedIcon.classList.add('icon', 'material-symbols-outlined');
    btnModeOrderedIcon.textContent = 'arrow_forward';
    btnModeOrdered.appendChild(btnModeOrderedIcon);
    const btnModeOrderedText = document.createElement('span');
    btnModeOrderedText.textContent = 'Ordered';
    btnModeOrdered.appendChild(btnModeOrderedText);
    areaModeSettings.appendChild(btnModeOrdered);

    const btnModeRandom = document.createElement('button');
    btnModeRandom.classList.add('btn-normal');
    btnModeRandom.dataset.mode = "randomized";
    btnModeRandom.dataset.selected = false;
    const btnModeRandomIcon = document.createElement('span');
    btnModeRandomIcon.classList.add('icon', 'material-symbols-outlined');
    btnModeRandomIcon.textContent = 'shuffle';
    btnModeRandom.appendChild(btnModeRandomIcon);
    const btnModeRandomText = document.createElement('span');
    btnModeRandomText.textContent = 'Randomized';
    btnModeRandom.appendChild(btnModeRandomText);
    areaModeSettings.appendChild(btnModeRandom);
    openModeElements.push(btnModeOrdered, btnModeRandom);

    openModeElements.forEach(btnMode => {
        btnMode.addEventListener('click', () => {
            openModeElements.forEach(el => {
                el.dataset.selected = false;
                el.classList.remove('btn-working');
            });
            btnMode.dataset.selected = true;
            btnMode.classList.add('btn-working');
        })
    });

    //Display Section
    /*const displayAreaHeader = document.createElement('div');
    displayAreaHeader.textContent = 'Display Mode';
    displayAreaHeader.classList.add('txt-header');
    modal.appendChild(displayAreaHeader);
    const areaDisplaySection = document.createElement('div');
    areaDisplaySection.classList.add('area-horizontal', 'area-fill-horizontal', 'area-newline');
    modal.appendChild(areaDisplaySection);*/

    //Space
    const space = document.createElement('div');
    space.style.height = '50px';
    modal.appendChild(space);

    //Bottom-zone buttons
    const areaBottomButtons = document.createElement('div');
    areaBottomButtons.classList.add('area-horizontal', 'area-center');
    modal.appendChild(areaBottomButtons);

    const btnNext = document.createElement('button');
    btnNext.classList.add('btn-normal', 'btn-primary', 'area-fit-horizontal');
    btnNext.style.padding = '2px 20px !important';
    btnNext.textContent = 'Next';
    areaBottomButtons.appendChild(btnNext);
    btnNext.addEventListener('click', () => {
        var selectedDrugs = [];
        document.querySelectorAll('.btn-drugs-sheet').forEach(btn => {
            if (btn.dataset.selected === 'true' && btn.dataset.sheet){
                var corrSheet = loadedSheets.find(s => s.sheet === btn.dataset.sheet);
                if (corrSheet) {
                    selectedDrugs = selectedDrugs.concat(corrSheet.loadedContent);
                }
            }
        });
        var isRandomized = btnModeRandom.dataset.selected === 'true' ? true : false;
        if (isRandomized) {
            var newList = [];
            selectedDrugs.forEach(sd => {
            const idx = Math.floor(Math.random() * (newList.length + 1));
            newList.splice(idx, 0, sd);
            });
            selectedDrugs = newList;
        }

        closeModalByName('Sheets');
        openPage('drugs-list');
        setupDrugsListPage(selectedDrugs);
    });
}

function setupDrugsListPage(drugs, mode = 'masonry') {
    //Button: Back
    document.getElementById('btn-drugs-list-back')?.addEventListener('click', () => {
        openPage('main');
    });

    if (mode === 'masonry') {
        const columns = [];
        const areaListMasonry = document.getElementById('area-drugs-list-masonry');
        areaListMasonry.innerHTML = '';
        const columnCount = getColumnCount();
        for (var i = 0; i < columnCount; i++) {
            var column = document.createElement('div');
            column.classList.add('masonry-column', 'area-vertical', 'area-fit-vertical');
            column.style.maxWidth = `calc(${1 / columnCount * 100}% - 10px)`;
            areaListMasonry.appendChild(column);
            columns.push(column);
        }

        if (drugs) {
            drugs.forEach(drug => {
                var columnToPlace = columns[0];
                var minHeight = columnToPlace.offsetHeight;
                for (var i = 1; i < columns.length; i++){
                    var height = columns[i].offsetHeight;
                    if (height < minHeight) {
                        columnToPlace = columns[i];
                        minHeight = height;
                    }
                }
                if (!columnToPlace)
                    return;

                var newCell = document.createElement('div');
                newCell.classList.add('masonry-cell');
                const headerSection = document.createElement('div');
                headerSection.classList.add('area-fill-horizontal', 'area-horizontal');
                newCell.appendChild(headerSection);
                for (var a of domainTransformations) {
                    var domain = a.domain;
                    var txt = drug[domain];
                    if (!txt)
                        continue;
                    if (domain === 'Number') {
                        const cNumber = document.createElement('span');
                        cNumber.classList.add('drug-number');
                        cNumber.textContent = txt;
                        headerSection.appendChild(cNumber);
                    }
                    else if (domain === 'Generic Name') {
                        const cDrugName = document.createElement('span');
                        cDrugName.classList.add('drug-generic-name');
                        cDrugName.textContent = txt;
                        headerSection.appendChild(cDrugName);
                    }
                    else if (domain === 'Class'){
                        const cClass = document.createElement('span');
                        cClass.classList.add('area-horizontal', 'area-fit-vertical', 'area-fit-horizontal');
                        cClass.textContent = txt;
                        cClass.style.color = '#c1c1c1ff';
                        cClass.style.fontWeight = 'bold';
                        cClass.style.fontSize = '13px';
                        newCell.appendChild(cClass);
                    }
                    else {
                        const areaDomain = document.createElement('div');
                        areaDomain.classList.add('drug-area-domain');
                        const cDomain = document.createElement('span');
                        cDomain.classList.add('drug-domain');
                        const cDomainIcon = document.createElement('span');
                        cDomainIcon.classList.add('icon', 'material-symbols-outlined');
                        cDomainIcon.textContent = a.icon && a.icon.trim().length > 0 ? a.icon : 'hourglass';
                        cDomain.appendChild(cDomainIcon);
                        const cDomainText = document.createElement('span');
                        cDomainText.textContent = domain;
                        cDomain.appendChild(cDomainText);
                        areaDomain.appendChild(cDomain);

                        const cTxt = document.createElement('span');
                        cTxt.classList.add('drug-content-desc');
                        cTxt.textContent = txt;
                        areaDomain.appendChild(cTxt);

                        newCell.appendChild(areaDomain);
                    }
                }
                columnToPlace.appendChild(newCell);
            });
        }
    }
}

function getColumnCount() {
    const width = window.innerWidth;
    if (width >= 1024) { // lg breakpoint
        return 4;
    } else if (width >= 768) { // md breakpoint
        return 3;
    } else if (width >= 640) { // sm breakpoint
        return 2;
    } else { // default for smaller screens
        return 1;
    }
}