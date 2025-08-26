import { domainTransformations } from "../config/Constants";
import { loadedSheets } from "../main";
import { closeModalByName, createModalWindow } from "../views/modals";
import { openPage } from "../views/pages";

export function getModal_SectionFlashcardsSettings(){
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
        btnModeOrdered.classList.add('btn-normal', 'btn-working', 'area-fit-horizontal');
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
        btnModeRandom.classList.add('btn-normal', 'area-fit-horizontal');
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
            openPage('flashcards');
            setupFlashcardsPage(selectedDrugs);
        });
    /*var drugs = [];
    for (var sh of loadedSheets) {
        if (sh.isLoaded && sh.loadedContent && sh.loadedContent.length > 0) {
            sh.loadedContent.forEach(r => drugs.push(r)); 
        }
    }
    openPage('flashcards');
    setupFlashcardsPage(drugs);*/
}

export const flashcard = document.getElementById('flashcard');
export const flashcardFront = document.getElementById('flashcard-front');
export const flashCardBack = document.getElementById('flashcard-back');
export const btnFCm10 = document.getElementById('btn-fc-m10');
export const btnFCm1 = document.getElementById('btn-fc-m1');
export const btnFCp1 = document.getElementById('btn-fc-p1');
export const btnFCp10 = document.getElementById('btn-fc-p10');
export const btnFCShuffle = document.getElementById('btn-fc-r');
function setupFlashcardsPage(drugs) {
    //Button: Back
    document.getElementById('btn-flashcards-back').onclick = () => {
        openPage('main');
    };

    //Card: Flashcard
    flashcard.onclick = () => {
        flashcard.classList.toggle('is-flipped');
    };

    flashcard.draggable = true;
    const minDragThreshold = 100;
    var fcDragOrigin = null;
    flashcard.ondragstart = ev => {
        fcDragOrigin = ev.clientX;
    }
    flashcard.ondragend = ev => {
        var dragDelta = ev.clientX - fcDragOrigin;
        if (Math.abs(dragDelta) >= minDragThreshold) {
            if (dragDelta < 0) {
                funcCycleDrug(1);
            }
            else {
                funcCycleDrug(-1);
            }
        }
    }

    var currentDrugIndex = null;
    const funcCycleDrug = amount => {
        currentDrugIndex = currentDrugIndex + amount;
        if (currentDrugIndex < 0){
            currentDrugIndex = (drugs.length - 1) + currentDrugIndex + 1;
        }
        if (currentDrugIndex > drugs.length - 1) {
            currentDrugIndex %= drugs.length;
        }

        flashcardFront.innerHTML = '';
        flashCardBack.innerHTML = '';

        const areaFlashcardFront = document.createElement('div');
        areaFlashcardFront.classList.add('area-vertical', 'area-fit-vertical', 'area-fit-horizontal');
        flashcardFront.appendChild(areaFlashcardFront);

        const areaFFHeader = document.createElement('div');
        areaFFHeader.classList.add('area-horizontal', 'area-fit-horizontal');
        areaFlashcardFront.appendChild(areaFFHeader);

        const areaFlashcardBack = document.createElement('div');
        areaFlashcardBack.classList.add('area-vertical', 'area-fit-vertical');
        flashCardBack.appendChild(areaFlashcardBack);

        for (const domain of domainTransformations) {
            if (!domain.domain) {
                continue;
            }
            var txt = drugs[currentDrugIndex][domain.domain];
            if (!txt)
                continue;

            if (domain.domain === 'Number') {
                const cNumber = document.createElement('span');
                cNumber.classList.add('drug-number', 'area-fit-horizontal');
                cNumber.textContent = txt;
                cNumber.style.fontSize = '24px';
                areaFFHeader.appendChild(cNumber);
            }
            else if (domain.domain === 'Generic Name') {
                const cDrugName = document.createElement('span');
                cDrugName.classList.add('drug-generic-name');
                cDrugName.textContent = txt;
                cDrugName.style.fontSize = '24px';
                areaFFHeader.appendChild(cDrugName);
            }
            else if (domain.domain === 'Class') {
                const cClass = document.createElement('span');
                cClass.classList.add('area-horizontal', 'area-fit-vertical', 'area-fit-horizontal');
                cClass.textContent = txt;
                cClass.style.color = '#c1c1c1ff';
                cClass.style.fontWeight = 'bold';
                cClass.style.fontSize = '13px';
                areaFlashcardFront.appendChild(cClass);
            }
            else {
                const areaDomain = document.createElement('div');
                areaDomain.classList.add('drug-area-domain');
                const cDomain = document.createElement('span');
                cDomain.classList.add('drug-domain');
                const cDomainIcon = document.createElement('span');
                cDomainIcon.classList.add('icon', 'material-symbols-outlined');
                cDomainIcon.textContent = domain.icon && domain.icon.trim().length > 0 ? domain.icon : 'hourglass';
                cDomain.appendChild(cDomainIcon);
                const cDomainText = document.createElement('span');
                cDomainText.textContent = domain.domain;
                cDomain.appendChild(cDomainText);
                areaDomain.appendChild(cDomain);

                const cTxt = document.createElement('span');
                cTxt.classList.add('drug-content-desc');
                cTxt.textContent = txt;
                areaDomain.appendChild(cTxt);

                areaFlashcardBack.appendChild(areaDomain);
            }
        }

        if (flashcard.classList.contains('is-flipped')) {
            flashcard.classList.toggle('is-flipped');
        }
        
    };
    funcCycleDrug(0);

    btnFCp1.onclick = () => funcCycleDrug(1);
    btnFCp10.onclick = () => funcCycleDrug(10);
    btnFCm1.onclick = () => funcCycleDrug(-1);
    btnFCm10.onclick = () => funcCycleDrug(-10);
    btnFCShuffle.onclick = () => funcCycleDrug(Math.floor(Math.random() * drugs.length * 2) - 100);
}