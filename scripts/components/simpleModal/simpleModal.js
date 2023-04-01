let SimpleModal = (() => {
    const frm = () => {
        return `
        <div class="overlay" id="simpleModal">
            <div class="wraper d-flex justify-content-center">
                <div class="card p-4">
                    <div class="icon-wrap close-btn">
                        <i class="ion-close-round"></i>
                    </div>
                    <div class="card-body text-center">
                        <div class="message">
                            <h3 class="mb-4">Did you really practiced?</h3>
                            <h6 class="mb-4 text-left"></h6>
                        </div>

                        <div class="modal-action">
                            <button class="w-50 btn btn-info yes">Practice</button>
                        </div>
                    </div>
                </div>
            </div>

        </div>
        `
    }

    const MODAL_ID = '#simpleModal'
    const MODAL_ID_NO_ANNOTATION = clrSign(MODAL_ID);
    const MODAL_CARD_CLASS = '#simpleModal .card'
    const MODAL_CLOSE_BTN_CLASS = '#simpleModal .close-btn';
    const MODAL_YES_BTN_CLASS = '#simpleModal .yes';
    const MODAL_MESSAGE_H3 = '#simpleModal .message h3';
    const MODAL_MESSAGE_H6 = '#simpleModal .message h6';
    const MODAL_BODY_SHOW_CLASS = 'show';
    const MODAL_BODY_HIDE_CLASS = 'hide';
    const D_NONE_CLASS = 'd-none';
    const BTN_DELETE_COLOR_CLASS = 'btn-danger';
    const BTN_NORMAL_COLOR_CLASS = 'btn-info';

    const MODAL_CARD_EL = () => document.querySelector(MODAL_CARD_CLASS);
    const MODAL_CLOSE_BTN_EL = () => document.querySelector(MODAL_CLOSE_BTN_CLASS);
    const MODAL_YES_BTN_EL = () => document.querySelector(MODAL_YES_BTN_CLASS);
    const MODAL_MESSAGE_H3_EL = () => document.querySelector(MODAL_MESSAGE_H3);
    const MODAL_MESSAGE_H6_EL = () => document.querySelector(MODAL_MESSAGE_H6);

    let modalVisibility = false;



    const generateModalContent = (contentObj) => {
        if (contentObj !== undefined) {
            if (contentObj.message) {
                MODAL_MESSAGE_H3_EL().classList.add(D_NONE_CLASS);
                MODAL_MESSAGE_H6_EL().innerHTML = contentObj.message;
            }

            if (contentObj.btnColor === 'delete') {
                MODAL_YES_BTN_EL().classList.remove(BTN_NORMAL_COLOR_CLASS);
                MODAL_YES_BTN_EL().classList.add(BTN_DELETE_COLOR_CLASS);
            }

            if (contentObj.btnText !== undefined) {
                MODAL_YES_BTN_EL().innerHTML = contentObj.btnText;
            }
        }
    }

    const removeModalFromDom = () => {
        Injection.removeInjectedItem(MODAL_ID_NO_ANNOTATION)
    }

    const alternateShowHideClass = () => {
        MODAL_CARD_EL().classList.remove(MODAL_BODY_SHOW_CLASS);
        MODAL_CARD_EL().classList.add(MODAL_BODY_HIDE_CLASS);
    }

    const closeModal = (value) => {
        modalVisibility = false;
        return new Promise(resolve => {
            alternateShowHideClass();
            value ? resolve(value) : resolve(false);
            removeModalFromDom();
        })
    }

    const handelModalEventsResponses = () => {
        return new Promise(resolve => {

            MODAL_YES_BTN_EL()
                .addEventListener('click', (e) => {
                    resolve(closeModal(true));
                }, false);

            MODAL_CLOSE_BTN_EL().
                addEventListener('click', (e) => {
                    closeModal();
                    resolve(false);
                }, false);
        });
    }

    const generateAndShow = async (contentObj) => {
        modalVisibility = true;
        generateModalContent(contentObj);

        MODAL_CARD_EL().classList.add(MODAL_BODY_SHOW_CLASS);

        let response = await handelModalEventsResponses();
        return response ? response : false;

    }

    const init = () => {
        return new Promise(resolve => {
            Injection.inject(frm());
            resolve(true);
        })
    }

    return {

        openModal: async (contentObj) => {
            if (await init()) {
                return generateAndShow(contentObj);
            }
        },

        closeModal: closeModal,

        getModalVisibility: () => modalVisibility,

    }
})()