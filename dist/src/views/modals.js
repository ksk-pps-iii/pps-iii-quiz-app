import { generateShortId } from "../utils/helpers";

let currentModal = [];
//Modals
export const modalContainer = document.getElementById('modal-container');
export function createModalWindow(title) {
    const modalID = generateShortId();
    const newModalWindow = document.createElement('div');
    newModalWindow.classList.add('window-modal', 'panel', 'area-padding20', 'area-fit-lim-handheld-90');
    newModalWindow.style.minWidth = '30%';
    newModalWindow.style.paddingTop = '30px';

    //Title
    const titleElement = document.createElement('div');
    titleElement.classList.add('txt-header');
    titleElement.textContent = title;
    newModalWindow.appendChild(titleElement);

    //Close Button
    const closeButton = document.createElement('button');
    closeButton.classList.add('btn-modal-close', 'btn-normal', 'area-horizontal', 'area-center', 'placement-stick-top-right-5');
    closeButton.addEventListener('click', () => closeModalByID(modalID));
    const closeIcon = document.createElement('i');
    closeIcon.classList.add('material-symbols-outlined', 'icon');
    closeIcon.textContent = 'close';
    closeButton.appendChild(closeIcon);
    newModalWindow.appendChild(closeButton);
    const modalSaveEntry = {
        id: modalID,
        name: title,
        modal: newModalWindow
    }
    currentModal.push(modalSaveEntry);
    modalContainer.appendChild(newModalWindow);
    updateModalRenderings();
    return newModalWindow;
}

function getModalByName(modalName) {
    return currentModal.find(modal => modal.name === modalName);
}

function closeModalByID(modalID) {
    const existModalIndex = currentModal.findLastIndex(modal => modal.id === modalID);
    if (existModalIndex < 0)
        return;

    currentModal.splice(existModalIndex, 1).forEach(modal => {
        modal.modal.remove();
    });
    updateModalRenderings();
}

export function closeModalByName(modalName) {
    const existModalIndex = currentModal.findLastIndex(modal => modal.name === modalName);
    if (existModalIndex < 0)
        return;

    currentModal.splice(existModalIndex, 1).forEach(modal => {
        modal.modal.remove();
    });
    updateModalRenderings();
}

function updateModalRenderings(){
    if (currentModal.length > 0){
        for (let i = 0; i < currentModal.length; i++) {
            if (!currentModal[i].modal)
                continue;

            if (i === currentModal.length - 1){
                currentModal[i].modal.classList.remove('hidden');
                continue;
            }
            currentModal[i].modal.classList.add('hidden');
        }

        modalContainer.classList.remove('hidden');
    }
    else {
        modalContainer.classList.add('hidden');
    }
}