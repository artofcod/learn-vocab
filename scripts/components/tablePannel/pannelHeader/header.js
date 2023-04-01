/**
 * Immidately invocable function or closure
 * @name PannelHeader
 * @return {...} Returns an object which will be in the return statement.
 */

const PannelHeader = (() => {

    //private scope
    const frm = () => {
        return `
        <div class="row">
            <div class="col-7 info-section">

            </div>
            <!-- end of col -->
             <div class="col-5 modal-section text-right d-flex justify-content-end align-items-center">

            </div>
            <!-- end of col -->
        </div>
        <!-- end of row -->
    `
    }

    return {

        //public scope

        init: (layout, pramObj) => {
            paint(frm(), layout)
                .then(e => {
                    let requiredLayout = layout + ' .row .info-section';
                    HeaderInfo.init(requiredLayout, pramObj);
                })
                .then(e => {
                    let requiredLayout = layout + ' .row .modal-section';
                    HeaderAction.init(requiredLayout, pramObj);
                })
        },


    }
})();