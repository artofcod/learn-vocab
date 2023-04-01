const mananageVFrm = (() => {


    const frm = () => {
        return Object.freeze(`
            <div class="container-fluid main manage-container" data-name="manage-v">
                
            </div>`
        );
    }

    return {
        init: () => paint(frm()).then(e => {
            MannageArea.init();
            locate('/manage-v/books/all');
        }),
    }
})()