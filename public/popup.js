class Popup {
    static TYPES = ['ERROR', 'WARNING', 'INFO', 'SUCCESS']

    static popupsContainer = document.getElementById('popupsContainer');
    static popups = [];

    static onShow(message) {
        this.show(message);
    }

    static show(message) {
        const generatedId = `popup_${generateRandomKey()}`;
        try {
            this.popups.push(generatedId);

            const popup = this.genericPopup(message, generatedId);

            this.popupsContainer.appendChild(popup);
        } catch (e) {
            console.log(e);
        }
    }

    static onHide(popupId) {
        this.remove(popupId);
    }

    static remove(popupId) {
        console.log('Aqui');
        if(!popupId){ 
            console.log(`Popup ID '${popupId}' not found!!`);
            return;
        }
        
        const index = this.popups.findIndex(id => id === popupId);
        if (index !== -1) {
            this.popups.splice(index, 1);
            const popupElement = document.getElementById(popupId);
            if (popupElement) {
                this.popupsContainer.removeChild(popupElement);
            }
        }
    }

    static genericPopup(message, popupId){
        let title = 'Erro';
        
        const popupContainer = document.createElement('div');
        popupContainer.id = popupId;
        popupContainer.classList.add('popupBackground');
        popupContainer.innerHTML = `
            <div class="popup">
                <header>
                    <h2>${title}</h2>
                </header>
                <main>
                    ${message}
                </main>
                <footer>
                    <button onclick="Popup.onHide('${popupId}')">OK</button>
                </footer>
            </div>
        `;

        return popupContainer;
    }
}