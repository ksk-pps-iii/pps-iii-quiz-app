import { remainingEventCount } from "../events/Event_Manager";
import { loadedSheets } from "../main";

//Pages 
export const pageMainSelector = document.getElementById('panel-main');
export const pageDrugList = document.getElementById('panel-drugs-list');
export function openPage(page) {
    pageMainSelector.classList.add('hidden');
    pageDrugList.classList.add('hidden');

    if (page === 'main') {
        pageMainSelector.classList.remove('hidden');
    }
    else if (page === 'drugs-list') {
        pageDrugList.classList.remove('hidden');
    }
}


//Button Managements
export const btnGotoSections = document.querySelectorAll('.btn-goto-section');
export function manageSectionButtons(){
    const isDataReady = loadedSheets && loadedSheets.length > 0 && loadedSheets.some(s => s.loadedContent && s.loadedContent.length > 0);
    btnGotoSections.forEach(btn => {
      btn.disabled = !isDataReady;
    });
}

//Event Loading-area
export const areaEventLoading = document.getElementById('area-eventloading');
export const iconEventLoading = document.getElementById('icon-area-eventload');
export const txtEventLoading = document.getElementById('txt-area-eventload');
export const txtEventLoadingEventRemaining = document.getElementById('txt-area-eventload-eventremaining');

let isAreaLoadingActive = false;
export function openEventLoading(txt, icon = null){
    if (!isAreaLoadingActive) {
        areaEventLoading.classList.remove('hidden');
        areaEventLoading.classList.add('animation-slide-in-y');
        areaEventLoading.onanimationend = () => {
            areaEventLoading.classList.remove('animation-slide-in-y');
        }
        isAreaLoadingActive = true;
    }

    if (txt) {
        txtEventLoading.textContent = txt;
    }

    if (icon) {
        iconEventLoading.textContent = icon;
    } else iconEventLoading.textContent = 'hourglass';

    txtEventLoadingEventRemaining.textContent = remainingEventCount();

}

export function closeEventLoading(){
    if (areaEventLoading.classList.contains('animation-slide-out-y'))
        return;

    if (isAreaLoadingActive) {
        areaEventLoading.classList.add('animation-slide-out-y');
        areaEventLoading.onanimationend = () => {
            areaEventLoading.classList.remove('animation-slide-out-y');
            areaEventLoading.classList.add('hidden');
        }
        isAreaLoadingActive = false;
    }
}