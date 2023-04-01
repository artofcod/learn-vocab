/**
 * Immidately invocable function or closure
 * @name PracticeSidebar
 * @return {...} Returns an object which will be in the return statement.
 */

const PracticeSidebar = (() => {

    //private scope
    const sectionHtmlFrame = (sectionId, sectionName, robject) => {
        return `
                <li class="acc-item section" data-item-id="${sectionId}">
                    <span class="section-name" data-section-eng-name="${robject.s_name_eng}">
                    ${sectionName.length == 0 ? robject.s_name_eng : sectionName}
                    </span>
                </li>
            `;
    }

    const LEFT_SIDEBAR_NAV_TITLE_CLASS = '.practice-container #left-sidebar h6';

    const LEFT_SIDEBAR_NAV_TITLE_EL = () => document.querySelector(LEFT_SIDEBAR_NAV_TITLE_CLASS);

    const setCurrentChapterIdToStore = (e) => {
        let chapterId = (heigherO.getProperNode((e) => e.parentNode.dataset.id))(e);
        ChapterState.setCurrentRecord(chapterId);
    }

    const setCurrentSectionIdToStore = (e) => {
        let secId = (heigherO.getProperNode((e) => e.dataset.itemId))(e);
        SectionState.setCurrentActiveSection(secId);
    }

    const fetchigVocabOnClickOfSectionName = () => {
        let section = document.querySelectorAll('.section');

        section.forEach(element => {
            element.addEventListener('click', (e) => {
                vocabEvaluation.cleanPracticeArea();
                setCurrentChapterIdToStore(e);
                setCurrentSectionIdToStore(e);
                vocabEvaluation.fetchVocabBySection(SectionState
                    .getCurrentSection()
                    .section_id
                );
                practiceResultIndicator.updateSectionNameOnTitle(
                    SectionState.getCurrentSection().s_name,
                    SectionState.getCurrentSection().s_name_eng
                );

            })
        });
    }

    const populateSections = (sectionObject) => {

        accordianAction.populateAccordianItems(sectionObject, sectionHtmlFrame);
        accordianAction.setActiveAccToggle(ChapterState.getCurrentRecord().chapter_id)
        accordianAction.setActiveAccBody(ChapterState.getCurrentRecord().chapter_id)
        accordianAction.setActiveAccItem(SectionState.getCurrentSection().section_id);
        practiceResultIndicator.updateSectionNameOnTitle(
            SectionState.getCurrentSection().s_name,
            SectionState.getCurrentSection().s_name_eng
        );

        /// this will attach click events to all the section elements
        fetchigVocabOnClickOfSectionName();
    }

    const populateChapters = (chapteObject) => {
        chapteObject = ChapterState.getRecords();
        let chapterDomNode = document.querySelector('.practice-container ol.accordian');
        accordianAction.populatingAccToggleHandler(chapteObject, chapterDomNode);
    }

    return {

        //public scope

        init: () => {
            return paint(sidebar.frm(), ".practice-container #left-sidebar").then(
                e => {

                }
            );
        },

        fetchChapterOfABook: (bookId) => {
            let requestOptions = {
                method: 'GET',
            };

            return fetch("chapter?book_id=" + bookId, requestOptions)
                .then(async response => {
                    ChapterState.setRecords(await response.json());
                    ChapterState.setCurrentRecord(lastPractice('chapter'));
                    populateChapters()
                })
                .then(() => true)
                .catch(error => console.log('error', error));
        },

        fetchSectionOfABook: (bookId) => {
            var requestOptions = {
                method: 'GET'
            };

            return fetch("section?book_id=" + bookId, requestOptions)
                .then(async response => {
                    let res = await response.json()
                    SectionState.setRecords(res)
                    return res;
                })
                .then(result => {
                    sectonId = lastPractice('section');
                    SectionState.setCurrentActiveSection(sectonId);
                    populateSections(result);

                })
                .then(() => true)
                .catch(error => console.log('error', error));
        },



        populateBookInPractice: (selectdeBook) => {
            let bookName = reduceText(selectdeBook.b_name, 40);
            LEFT_SIDEBAR_NAV_TITLE_EL().innerHTML = bookName;
        }

    }
})();