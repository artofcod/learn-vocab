const MannageArea = (() => {
    const frm = () => {
        return Object.freeze(`
                <div class="row">
                    <div name="side-nevigation" class="col-3 p-3" id="left-sidebar">
                        
                    </div>
                    <!-- #left-sidbar end -->
                    <div class="px-5 pt-4 pb-2 col-9 manage-pannel  manage" id="content-pannel">
                        <h1>manage pannel</h1>
                    </div>
                </div>
            `)
    }

    return {
        init: (parm) => {
            paint(frm(true), '.manage-container').then(e => {
                ManageSidebar.init()
                // .then(
                //     e => PracticePain.init(parm)
                // )
            })
        },


    }

})();