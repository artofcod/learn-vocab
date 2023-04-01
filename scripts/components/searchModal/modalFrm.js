/**
 * Immidately invocable function or closure
 * @name ModalFrm
 * @return {...} Returns an object which will be in the return statement.
 */

const ModalFrm = (() => {

    //private scope
    const BOOK = 'book';
    const CHAPTER = 'chapter';
    const SECTION = 'section';

    const recordList = (container) => {

        return Object.freeze(`
            <li class="list-group-item list-group-item-action border-0 py-2 d-flex justify-content-between">
                <div class="">
                    <i class="ion-ios-list-outline"></i>
                    <span class="primary-name">search reasult</span>
                    <span class="secondary-name">(Secondary name)</span>
                </div>
                <div class="">
                 ${getProperPills(container)}    
                </div>
            </li>    
        `);
    }


    const getProperPills = (container) => {
        let vocabPill = `<span class="badge badge-color badge-pill mr-1">20 vocabs</span>`;
        let sectionPill = `<span class="badge badge-color badge-pill mr-1">7 sections</span>`;
        let chapterPill = `<span class="badge badge-color badge-pill mr-1">3 chapters</span>`;


        switch (container) {
            case BOOK:
                return Object.freeze(vocabPill + sectionPill + chapterPill);
            case CHAPTER:
                return Object.freeze(vocabPill + sectionPill);
            case SECTION:
                return Object.freeze(vocabPill);
        }
    }



    const generatedRecorList = (container) => {
        let element = '';
        for (let i = 0; i < 11; i++) {
            element += recordList(container);
        }
        return Object.freeze(element);
    }

    const frm = (container) => {

        return Object.freeze(`
            <div id="search-modal">
                <div class="modal-body card p-0 w-50 position-relative">
                    <button class=" btn modal-close-btn">
                        <i class="ion-close"></i>
                    </button>
                    <div class="input-group border-bottom  pt-2 pb-1 px-2">
                        <label for="modal-search" class="form-control-label sr-only">Search ${container}s</label>
                        <button class=" btn form-control-addon text-muted">
                            <i class="ion-search"></i>
                        </button>
                        <input type="text" class="form-control border-0 modal-search" id="modal-search"
                            placeholder="search...">
                    </div>
                    <!-- header search -->

                    <div class="serch-result">
                        <p class="  px-3 py-2 m-0 heading">
                            <span>Available ${container}s</span>
                        </p>
                        <ul class="list-group text-dark inject-reocrds">
                            ${generatedRecorList(container)}
                        </ul>
                    </div>
                    <!-- search reasult end-->
                    <div class="pagination text-muted d-flex justify-content-center p-1">
                        <span class="previous-btn px-3 ">
                            <i class="ion-arrow-left-b"></i>
                        </span>
                        <ul class="pagination-numbers d-flex list-unstyled justify-content-center m-0">
                            <li class="px-3">1</li>
                            <li class="px-3">2</li>
                            <li class="px-3">3</li>
                        </ul>
                        <span class="next-btn px-3">
                            <i class="ion-arrow-right-b"></i>
                        </span>
                    </div>
                    <!-- pagination end -->
                </div>
                <!--  card end-->
            </div>
            <!-- end of #searc-modal -->
        `)
    }


    return {

        //public scope

        init: (container) => frm(container),


    }
})();