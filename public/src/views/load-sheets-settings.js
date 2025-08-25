import { transformDataArray } from "../config/Constants";
import { appendEvent } from "../events/Event_Manager";
import { postCloudData } from "../gg_sheets";
import { loadedSheets } from "../main";
import { createModalWindow } from "./modals";
import { manageSectionButtons } from "./pages";

export function openLoadSheetSection() {
    const modal = createModalWindow("Drug Sheet Data Source");

    const descriptionElement = document.createElement('div');
    descriptionElement.classList.add("txt-description");
    descriptionElement.textContent = "Please select the specific sheets from the Top Drug Source Sheets collection that you will be using for this session. You can modify these selections at any time by using the Load Sheets button.";
    modal.appendChild(descriptionElement);

    const areaSheetLoadedAvailable = document.createElement("div");
    areaSheetLoadedAvailable.classList.add('area-horizontal', 'area-newline');
    modal.appendChild(areaSheetLoadedAvailable);

    if (loadedSheets.length > 0) {
        loadedSheets.forEach(sheet => {
            const newButtonElement = document.createElement("button");
            newButtonElement.classList.add("btn-normal");
            newButtonElement.style.width = 'fit-content';

            const newIcon = document.createElement("span");
            newIcon.classList.add("material-symbols-outlined", "icon");
            newIcon.textContent = "data_array";
            newButtonElement.appendChild(newIcon);

            const newText = document.createElement("span");
            newText.textContent = sheet.sheet;
            newButtonElement.appendChild(newText);

            areaSheetLoadedAvailable.appendChild(newButtonElement);
            const checkFunc = () => {
                if (sheet.isLoaded && sheet.loadedContent && sheet.loadedContent.length > 0) {
                    newButtonElement.classList.remove("btn-candidate");
                    newButtonElement.classList.add("btn-success", 'btn-primary');
                    newIcon.textContent = 'data_table';
                }
                else {
                    newButtonElement.classList.remove("btn-success", 'btn-primary');
                    if (newButtonElement.dataset['isCandidateForLoading'] === 'true') {
                        newButtonElement.classList.add('btn-candidate', 'btn-primary');
                        newIcon.textContent = 'system_update_alt';
                    }
                    else {
                       newButtonElement.classList.remove("btn-candidate", 'btn-primary');
                       newIcon.textContent = 'data_array';
                    }
                }
            }
            checkFunc();
            newButtonElement.addEventListener("click", async () => {
                if (!newButtonElement.classList.contains('btn-success')) {
                    newButtonElement.dataset['isCandidateForLoading'] = newButtonElement.dataset['isCandidateForLoading'] === 'true' ? false : true;
                    appendEvent(`Loading the sheet ${sheet.sheet}`, async () => {
                        const result = await postCloudData('getSheetDrugs', {sheet: sheet.sheet});
                        sheet.isLoaded = true;
                        sheet.loadedContent = transformDataArray(result.data);
                        newButtonElement.dataset['isCandidateForLoading'] = false;
                        //console.log(transformDataArray(result.data));
                        manageSectionButtons();
                        checkFunc();
                    });
                }
                checkFunc();
            });
        });
    }
}

export function closeLoadSheetSection() {
    //loadSheetSettingPanel.classList.add("hidden");
}