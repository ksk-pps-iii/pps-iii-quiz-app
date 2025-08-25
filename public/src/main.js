import { appendEvent } from "./events/Event_Manager";
import { postCloudData } from "./gg_sheets";
import { getModal_sectionDrugsSettings } from "./sections/sc_drugs";
import { openLoadSheetSection } from "./views/load-sheets-settings";
import { manageSectionButtons } from "./views/pages";

export const excelUrl = 'https://script.google.com/macros/s/AKfycbyxXkIKidPB1GXMYohvzE74lrKhb7zy3WjZIO9HU8wS1SDHLSC6FtAjUNfdIeZJuQF9Eg/exec';

export let loadedSheets = null;

async function onInit() {
    manageSectionButtons();
    appendEvent('Retrieving the sheet names', async () => {
        const result = await postCloudData('getSheetNames', {});
        var loadSheets = [...JSON.parse(result.data)];
        loadSheets.forEach(sh => {
            sh.isLoaded = false;
            sh.isSelected = false;
            sh.loadedContent = null;
        });
        loadedSheets = loadSheets;
        //loadSheets[0].isSelected = true;
        console.log(loadSheets);
        manageSectionButtons();
    }, 'label');

    appendEvent('Initial sheet settings', async () => {
        openLoadSheetSection();
    }, 'data_table');
}
window.onload = await onInit;

//Button: Drugs Section
document.getElementById('btn-main-drugs').addEventListener('click', () => {
    getModal_sectionDrugsSettings();
});

//Button: Flashcard Section


//Button: Sheet Setting Button
document.getElementById('btn-setting-load-sheet').addEventListener('click', () => {
    openLoadSheetSection();
});