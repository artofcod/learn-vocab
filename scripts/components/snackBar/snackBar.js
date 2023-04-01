const sanckBar = (() => {
    const frm = () => {
        return `
            <div id="snack-bar">
                <div class="message-space">
                    <div class="info-ico">
                        <span>i</span>
                    </div>
                    <div class="message-body">
                        <span class="m-0">current practice evaluation recorded successfully.</span>
                    </div>
                </div>
                <div class="close-btn"><img src="./assets/img/close.svg" alt="" srcset=""></div>
            </div>
        `
    }


    const SNACK_BAR_ID = '#snack-bar';
    const SNACK_BAR_ID_NO_ANNOTATION = clrSign(SNACK_BAR_ID);
    const SNACK_BAR_CLOSE_BTN_CLASS = '#snack-bar .close-btn';
    const SHOW_SNACK_BAR_CLASS = 'show';
    const HIDE_SNACK_BAR_CLASS = 'hide';
    const DEFAUTL_BORDER_COLOR = 'create';


    const SNACK_BAR_EL = () => document.querySelector(SNACK_BAR_ID);
    const SNACK_BAR_CLOSE_BTN_EL = () => document.querySelector(SNACK_BAR_CLOSE_BTN_CLASS);

    let timeoutHandeler;
    let sanckBarVisibility = false;




    const attachCloseEvent = () => {
        SNACK_BAR_CLOSE_BTN_EL().addEventListener('click', (e) => {
            hiedSnackBar();
        }, false);
    }

    const removeSanckbarFromDom = () => {
        Injection.removeInjectedItem(SNACK_BAR_ID_NO_ANNOTATION);
    }

    const alterShowHideClass = () => {
        SNACK_BAR_EL()
            .classList
            .remove(SHOW_SNACK_BAR_CLASS);

        SNACK_BAR_EL()
            .classList
            .add(HIDE_SNACK_BAR_CLASS);
    }

    const hiedSnackBar = () => {
        clearTimeout(timeoutHandeler);
        sanckBarVisibility = false;
        alterShowHideClass();
        removeSanckbarFromDom()
    }

    const generateSancakbar = (borderColor) => {
        borderColor = borderColor ? borderColor : DEFAUTL_BORDER_COLOR;
        SNACK_BAR_EL().classList.add(borderColor);
    }

    const generateAndShow = (borderColor) => {
        sanckBarVisibility = true;
        generateSancakbar(borderColor);
        SNACK_BAR_EL()
            .classList
            .add(SHOW_SNACK_BAR_CLASS);
        timeoutHandeler = setTimeout(hiedSnackBar, 1000);
    }

    const init = () => {
        return new Promise(resolve => {
            Injection.inject(frm());
            attachCloseEvent();
            resolve(true);
        })
    }

    return {
        showSnackBar: async (borderColor) => {
            if (await init()) {
                return generateAndShow(borderColor);
            }
        },

        hiedSnackBar: hiedSnackBar,

        getSnackbarVisibility: () => sanckBarVisibility,


    }
})();