/**
 * Immidately invocable function or closure
 * @name selectionModal
 * @return {...} Returns an object which will be in the return statement.
 */

const selectionModal = (() => {

    //private scope

    //private scope
    const BOOK = 'book';
    const CHAPTER = 'chapter';
    const SECTION = 'section';
    let usePramObj;

    const fitTextInDom = (obj) => {
        if (obj.secondaryData != undefined) {
            let primary = obj.primaryData.length;
            let secondary = obj.secondaryData.length;
            let combineLength = primary + secondary;

            if (combineLength > 70) {
                if (primary > 70) {
                    obj.primaryData = `${obj.primaryData.substr(0, 70)}...`
                    obj.secondaryData = ''
                } else {

                    brackets = 2
                    threeDots = 3
                    howMuchSmall = 70 - (primary + brackets + threeDots);

                    if (howMuchSmall > 5) {
                        obj.secondaryData = `(${obj.secondaryData.substr(0, howMuchSmall)}...)`
                    } else {
                        obj.secondaryData = '';
                    }

                }
            } else {
                obj.secondaryData = `(${obj.secondaryData})`
            }
            return obj;
        }
    }

    const recordList = (obj) => {
        fitTextInDom(obj);

        return Object.freeze(`
                    <li class="${obj.selected ? `current` : ''} list list-group-item list-group-item-action border-0 py-2 d-flex justify-content-between"
                data-${obj.whichRecord}='${obj.id}' >
                <div class="">
                    <i class="
                        ${obj.whichRecord == "book" ? 'ion-ios-book' : ''}
                        ${obj.whichRecord == "chapter" ? 'ion-map' : ''}
                        ${obj.whichRecord == "section" ? 'ion-ios-list-outline' : ''}
                        "></i>
                    <span class="primary-name">${obj.primaryData ? obj.primaryData : ''}</span>
                    <span class="secondary-name">${obj.secondaryData ? obj.secondaryData : ''}</span>
                </div >
    <div class="">
        ${getProperPills(obj.whichRecord)}
    </div>
            </li>
    `);
    }


    const getProperPills = (container) => {
        let vocabPill = () => `<span class="badge badge-color badge-pill mr-1"> 20 vocabs</span> `;
        let sectionPill = () => `<span class="badge badge-color badge-pill mr-1"> 7 sections</span> `;
        let chapterPill = () => `<span class="badge badge-color badge-pill mr-1"> 3 chapters</span> `;


        switch (container) {
            case BOOK:
                return Object.freeze(vocabPill() + sectionPill() + chapterPill());
            case CHAPTER:
                return Object.freeze(vocabPill() + sectionPill());
            case SECTION:
                return Object.freeze(vocabPill());
        }
    }

    const frm = (container, lis) => {
        return Object.freeze(`
    <div id = "search-modal" >
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
                        <div class="px-3 py-2 m-0 mb-1 heading">
                            <div class="span-wraper">
                                <span>
                                    Available
                                    <span class="indication">${container}s </span>
                                </span>
                                
                                ${container === "section" ? `<span>of chapter <span class="indication">${validate.textIsBlank(manageState.chapter.getChapter(usePramObj.selected.chapter).c_name) ?
                manageState.chapter.getChapter(usePramObj.selected.chapter).c_name :
                manageState.chapter.getChapter(usePramObj.selected.chapter).c_name_eng}</span></span>` : ''}
                    
                                ${container !== "book" ? `<span>of book <span class="indication">${manageState.book.getBook(usePramObj.selected.book).b_name}</span></span>` : ''}
                            
                                </span>
                            </div>
                        </div>
                        <ul class="list-group text-dark inject-reocrds ${container}">
                            ${lis}
                        </ul>
                    </div>
                    <!--search reasult end-->
                    <!--< div class="pagination text-muted d-flex justify-content-center p-1" >
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
                    </div>-->
                    <!--pagination end-->
                </div >
                <!--card end-->
            </div >
    `)
    }

    const MODAL_ID = '#search-modal';
    const MODAL_ID_NO_ANNOTATION = clrSign(MODAL_ID);
    const MODAL_BODY_CLASS = '.modal-body';
    const MODAL_BODY_SHOW_CLASS = 'show';
    const MODAL_BODY_HIDE_CLASS = 'hide';
    const CLOSE_MODAL_BTN_CLASS = '#search-modal .modal-close-btn';

    const MODAL_BODY_EL = () => document.querySelector(MODAL_BODY_CLASS);
    const CLOSE_MODAL_BTN_EL = () => document.querySelector(CLOSE_MODAL_BTN_CLASS);




    const closeModal = () => {
        MODAL_BODY_EL().classList.add(MODAL_BODY_HIDE_CLASS);
        Injection.removeInjectedItem(MODAL_ID_NO_ANNOTATION);
    }

    const attachCloseModalClick = () => {
        CLOSE_MODAL_BTN_EL().addEventListener('click', (e) => {
            closeModal();
        }, false)

    }

    const showModal = () => {
        MODAL_BODY_EL().classList.add(MODAL_BODY_SHOW_CLASS);
    }

    const generateRecords = (whichRecord) => {

        switch (whichRecord) {
            case 'book':
                return manageState.
                    book.
                    getRecords().
                    reduce((acc, e) => {
                        return acc += recordList(
                            {
                                whichRecord: whichRecord,
                                primaryData: e.b_name,
                                secondaryData: undefined,
                                id: e.book_id,
                                selected: usePramObj.selected.book == e.book_id ? true : false
                            }
                        );
                    }, '');

            case 'chapter':
                return manageState.
                    chapter.
                    getChaptersByBook(usePramObj.selected.book).
                    reduce((acc, e) => {
                        return acc += recordList(
                            {
                                whichRecord: whichRecord,
                                primaryData: e.c_name ? e.c_name : e.c_name_eng,
                                secondaryData: e.c_name_eng,
                                id: e.chapter_id,
                                selected: usePramObj.selected.chapter == e.chapter_id ? true : false
                            }
                        );
                    }, '');

            case 'section':
                return manageState.
                    section.
                    getSectionByChapter(usePramObj.selected.chapter).
                    reduce((acc, e) => {
                        return acc += recordList(
                            {
                                whichRecord: whichRecord,
                                primaryData: e.s_name ? e.s_name : e.s_name_eng,
                                secondaryData: e.s_name_eng,
                                id: e.section_id,
                                selected: usePramObj.selected.section == e.section_id ? true : false
                            }
                        );
                    }, '');
        }
    }


    const handelLiClick = () => {
        const LI_SELECTOR = `li.list`;
        querys(LI_SELECTOR).forEach(element => {
            element.addEventListener('click', async (e) => {
                let li = heigherO.selectPath(e).filter(e => e.nodeName == "LI")[0];
                let selectable = li.dataset;
                let inWhichContext = query('#content-pannel').children[0].className;
                let compairAndLocate = Object.keys(selectable)[0];
                let conversion = Object.fromEntries(Object.entries(selectable));

                Object.assign(usePramObj, {
                    selected: {
                        ...usePramObj.selected,
                        ...conversion
                    },
                })

                await HeaderInfo.determineContext(inWhichContext, compairAndLocate, usePramObj);

                closeModal();
            }, false)
        });

    }

    const init = (container) => {
        return new Promise(resolve => {
            let lis = generateRecords(container);
            Injection.inject(frm(container, lis));
            attachCloseModalClick();
            handelLiClick();
            resolve(true);
        })
    }

    return {

        //public scope

        openModal: async (container, pramObj) => {
            usePramObj = pramObj;
            if (await init(container)) {
                showModal();
            }
        },


    }
})();