const PracticeArea = (() => {
    const frm = () => {
        return Object.freeze(`
                <div class="row">
                    <div name="side-nevigation" class="col-3 p-3" id="left-sidebar">
                        <!-- Sidebar will render here -->
                    </div>
                    <!-- #left-sidbar end -->
                    <div class="px-5 pt-4 pb-2 col-9 practice-pannel content-pannel" id="content-pannel">
                        <!-- Pracitce pain will render here -->
                    </div>
                </div>
            `)
    }



    return {
        init: (parm) => {
            paint(frm(), '.practice-container').then(e => {
                PracticeSidebar.init().then(
                    e => PracticePain.init(parm)
                )
            })
        },


    }

})();