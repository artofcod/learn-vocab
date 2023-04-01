/**
 * Immidately invocable function or closure
 * @name TableFrm
 * @return {...} Returns an object which will be in the return statement.
 */

const TableFrm = (() => {

    //private scope
    const frm = (titel, isAction) => {
        let action = `
                    <div class="add-input-box text-center mx-auto">
                        <button class="btn px-4 mt-2">
                            <span>Add Another ${titel}</span>
                            <i class="ion-plus-round"></i>
                        </button>
                    </div>
        `;
        return Object.freeze(`
            <div class="${titel}">
                    <div class="row justify-content-center">
                        <section class="col-12 p-0  pannel-appearence">
                            <header class="leading titel pl-4 px-3 pt-2">
                                
                                <!-- pannel header will apear here -->
                            </header>
                            <!-- end of header -->
                            <div class="pannel-body ${!isAction ? 'not-action' : ''}">
                                
                            </div>
                            <!-- end of .pannel-body -->
                            ${isAction ? action : ''}
                        </section>
                        <!-- end of .pannnel-appearence -->
                    </div>
                    <!-- end of .row -->
            
            `)
    }


    const TITLE_CHAPTER = 'chapter';
    const TITLE_SECTION = 'section';
    const TITLE_VOCAB = 'vocabulary';


    return {

        //public scope
        TITLE_CHAPTER: TITLE_CHAPTER,
        TITLE_SECTION: TITLE_SECTION,
        TITLE_VOCAB: TITLE_VOCAB,

        init: (pramObj, layout) => {
            let fixedLayout = layout
            let titel = pramObj.titel;
            let select = pramObj.select;
            return paint(frm(titel, pramObj.isFinal), fixedLayout)
                .then(e => {
                    let paintHeaderLayout = fixedLayout + ' .leading.titel'
                    PannelHeader.init(paintHeaderLayout, pramObj)
                })
            // .then(e => {
            //     let paintHeaderLayout = fixedLayout + ' .pannel-body'
            //     Table.init(paintHeaderLayout, pramObj);
            // })
            // .then(e => {
            //     setupAddInptboxClick(titel);
            // })
        }



    }
})();