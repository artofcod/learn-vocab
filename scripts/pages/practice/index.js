const Practice = (() => {

    const frm = () => {
        return Object.freeze(`
                <div class="container-fluid main practice-container" data-name="practice-v">   
                </div>
            `)
    }

    return {
        init: (parm) => {
            if (parm) {
                paint(frm()).then(e => PracticeArea.init(parm))
            } else {
                paint(frm()).then(e => PracticBookList.init('.practice-container'))
            }
        },
    }

})();