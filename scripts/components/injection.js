/**
 * Immidately invocable function or closure
 * @name Injection
 * @return {...} Returns an object which will be in the return statement.
 */

const Injection = (() => {

    //private scope
    const APP_CLASS = '.injection';

    const APP_INJECTION_EL = () => document.querySelector(APP_CLASS);

    return {

        //public scope

        inject: (frm) => {
            APP_INJECTION_EL().innerHTML += frm;
        },

        removeInjectedItem: (removeableElement) => {
            let time = setTimeout(() => {
                Object.values(APP_INJECTION_EL().children).map(e => {
                    if (e.id == removeableElement) {
                        APP_INJECTION_EL().removeChild(e);
                    }
                })
                clearTimeout(time);
            }, 500)
        }
    }
})();