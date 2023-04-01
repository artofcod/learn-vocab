const siteLayout = (() => {
    return {
        bundil: (template) => {
            return Object.freeze(
                headerFrm.frm() +
                `<main name="content-area" class="content-area">${template ? template : ""} </main>`
                + footerFrm.frm()
            );
        }
    }
})();