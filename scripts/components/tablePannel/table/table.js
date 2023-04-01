/**
 * Immidately invocable function or closure
 * @name Table
 * @return {...} Returns an object which will be in the return statement.
 */

const Table = (() => {

    //private scope



    const frm = (pramObj) => {
        return Object.freeze(`
                <table class="table table-hover table-striped text-light">
                    <thead>
                       
                    </thead>
                    <tbody>
                       
                    </tbody>
                    <!-- end of tbody -->
                </table>
                <!-- end of table -->
            `)
    }


    return {

        //public scope

        init: (layout, pramObj) => {
            paint(frm(pramObj), layout)
                .then(e => {
                    let requireLayout = layout + ' thead'
                    TableHead.init(requireLayout, pramObj)
                })
                .then(e => {
                    let requireLayout = layout + ' tbody'
                    TableBody.init(requireLayout, pramObj);
                })
                .then(e => {
                    TableRowInputs.init(pramObj);
                });
        },



    }
})();