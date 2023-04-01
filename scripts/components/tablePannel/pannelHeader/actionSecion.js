/**
 * Immidately invocable function or closure
 * @name HeaderAction
 * @return {...} Returns an object which will be in the return statement.
 */

const HeaderAction = (() => {

    //private scope
    let usePramObj;

    const bookFrm = () => `
                    <div class="nice-icon change-book-icon ${usePramObj.selected.book ? '' : 'disabled'} mr-3"
                     titel="book">
                        <i class="ion-ios-book-outline"></i>
                    </div>
                `;

    const chapterFrm = () => `
                <div class="nice-icon change-chapter-icon mr-3 ${usePramObj.selected.chapter ? '' : 'disabled'}" 
                titel="chapter">
                     <i class="ion-map"></i>
                </div>
            `;

    const sectionFrm = () => `
                <div class="nice-icon change-section-icon mr-3 ${usePramObj.selected.section ? '' : 'disabled'}"
                 titel="section">
                    <i class="ion-ios-list-outline"></i>
                </div>
             `;


    const getProperAction = (titel) => {
        switch (titel) {
            case TableFrm.TITLE_CHAPTER:
                return Object.freeze(bookFrm());

            case TableFrm.TITLE_SECTION:
                return Object.freeze(bookFrm() + chapterFrm());

            case TableFrm.TITLE_VOCAB:
                return Object.freeze(bookFrm() + chapterFrm() + sectionFrm());
        }
    }


    const whichAction = (pramObj) => {
        if (pramObj.select) {
            return getProperAction(pramObj.select)
        } else {
            return getProperAction(pramObj.titel)
        }
    }

    const searchFrm = (pramObj) => {
        return Object.freeze(`
                    <div class="form-group search-content-group hide-group form-inline m-0 mr-1" style="opacity:0 !important">
                        <label for="search-content" class="sr-only">search</label>
                        <input type="text" class=" form-control form-control-sm"
                            id="search-content" placeholder="search..">
                    </div>
                    <!-- search form gropu end -->
                    <div class="nice-icon search-table-content show-btn mr-3"
                        titel="search ${pramObj.select ? pramObj.select : pramObj.titel}">
                        <i class="ion-ios-search-strong"></i>
                    </div>
                    ${whichAction(pramObj)}
            `);
    }

    const SEARCH_BTN_SELECTOR = '.manage .search-table-content';
    const SHOW_SEARCH_BTN_CLASS = 'show-btn';
    const HIDE_SEARCH_BTN_CLASS = 'hide-btn';
    const SEARCH_INPUT_GROUP_SELECTOR = '.manage .search-content-group';
    const SEARCH_INPUT_BOX_SELECTOR = '.manage .search-content-group #search-content';
    const SHOW_SEARCH_INPUT_CLASS = 'show-group';
    const HIDE_SEARCH_INPUT_CLASS = 'hide-group';
    const BOOK_BTN_SELECTOR = '.change-book-icon';
    const CHAPTER_BTN_SELECTOR = '.change-chapter-icon';
    const SECTION_BTN_SELECTOR = '.change-section-icon';

    const SEARCH_BTN_EL = () => document.querySelector(SEARCH_BTN_SELECTOR);
    const SEARCH_INPUT_GROUP_EL = () => document.querySelector(SEARCH_INPUT_GROUP_SELECTOR);
    const BOOK_BTN_EL = () => document.querySelector(BOOK_BTN_SELECTOR);
    const CHAPTER_BTN_EL = () => document.querySelector(CHAPTER_BTN_SELECTOR);
    const SECTION_BTN_EL = () => document.querySelector(SECTION_BTN_SELECTOR);





    const showSearch = () => {
        SEARCH_BTN_EL().addEventListener('click', async (e) => {
            SEARCH_INPUT_GROUP_EL().removeAttribute('style');
            SEARCH_INPUT_GROUP_EL().classList.remove(HIDE_SEARCH_INPUT_CLASS);
            SEARCH_INPUT_GROUP_EL().classList.add(SHOW_SEARCH_INPUT_CLASS);
            SEARCH_BTN_EL().classList.add(HIDE_SEARCH_BTN_CLASS);
            SEARCH_BTN_EL().classList.remove(SHOW_SEARCH_BTN_CLASS);
            setupSearch()

        }, false)
    }


    const hideSearch = async () => {
        if (SEARCH_INPUT_GROUP_EL().classList.contains(SHOW_SEARCH_INPUT_CLASS)) {
            SEARCH_INPUT_GROUP_EL().classList.remove(SHOW_SEARCH_INPUT_CLASS);
            SEARCH_INPUT_GROUP_EL().classList.add(HIDE_SEARCH_INPUT_CLASS);
            SEARCH_BTN_EL().classList.add(SHOW_SEARCH_BTN_CLASS);
            SEARCH_BTN_EL().classList.remove(HIDE_SEARCH_BTN_CLASS);
        }
    }


    const changeBook = () => {
        if (BOOK_BTN_EL()) {
            BOOK_BTN_EL().addEventListener('click', (e) => {
                if (usePramObj.selected.book) {
                    hideSearch();
                    selectionModal.openModal('book', usePramObj);
                }
            }, false)
        }
    }

    const changeChapter = () => {
        if (CHAPTER_BTN_EL()) {
            CHAPTER_BTN_EL().addEventListener('click', (e) => {
                if (usePramObj.selected.chapter) {
                    hideSearch();
                    selectionModal.openModal('chapter', usePramObj);
                }
            }, false)
        }
    }

    const changeSection = () => {
        if (SECTION_BTN_EL()) {
            SECTION_BTN_EL().addEventListener('click', (e) => {
                if (usePramObj.selected.section) {
                    hideSearch();
                    selectionModal.openModal('section', usePramObj);
                }
            }, false)
        }
    }


    const search = (e) => {
        let valueForSearch = e.target.value.toLowerCase();
        let timerHandel;

        clearTimeout(timerHandel);
        timerHandel = setTimeout(() => {
            doSearch(valueForSearch)
        }, 250);
    }


    const doSearch = (valueForSearch) => {
        document.querySelectorAll('tr').forEach(e => {

            //removing all d-none clases for fresh start
            e.classList.remove('d-none');

            let value1ToCompair = e.children[2].innerText.substring(0, valueForSearch.length).toLowerCase();
            let value2ToCompair = e.children[1].innerText.substring(0, valueForSearch.length).toLowerCase();

            if (value1ToCompair != valueForSearch && value2ToCompair != valueForSearch) {
                if (e.hasAttribute('data-index')) {
                    e.classList.add('d-none');
                }
            }
        })
    }


    const setupSearch = () => {
        query(SEARCH_INPUT_BOX_SELECTOR).addEventListener('keyup', search, false);
    }



    return {

        //public scope

        init: async (layout, pramObj) => {
            usePramObj = pramObj;
            await paint(searchFrm(pramObj), layout);
            showSearch();
            changeBook();
            changeChapter();
            changeSection();

        },



    }
})();
