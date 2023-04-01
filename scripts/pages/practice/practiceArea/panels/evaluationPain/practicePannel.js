/**
 * Immidately invocable function or closure
 * @name PracticePain
 * @return {...} Returns an object which will be in the return statement.
 */

const PracticePain = (() => {

    //private scope
    const frm = () => {
        return Object.freeze(`
                <section>
                    <div class="section-info px-4 py-2 mb-4">
                       <!-- seciton info will render here -->
                    </div>
                    <div class="evaluation-pain">
                        <!-- evaluation will render here -->
                    </div>
                </section>
                <section class=" col-9 evaluation-pain-control">
                    <div class="row text-center">
                        <div class="col-6"><button class="check">Check (ctr + enter)</button></div>
                        <div class="col-6"><button class="reset">Reset (ctrl + alt + r)</button></div>
                    </div>
                </section>
            `);
    }

    const RESET_BTN_CLASS = '.evaluation-pain-control .reset';
    const CHECK_BTN_CLASS = '.evaluation-pain-control .check';

    const RESET_BTN_EL = () => document.querySelector(RESET_BTN_CLASS);
    const CHECK_BTN_EL = () => document.querySelector(CHECK_BTN_CLASS);






    let practiceSavingInterval;
    const rememberLastPractice = () => {
        practiceSavingInterval = setInterval(() => {
            let bookId = BookState.getCurrentRecord().book_id;
            let chapterId = ChapterState.getCurrentRecord().chapter_id;
            let sectionId = SectionState.getCurrentSection().section_id;
            let rememberObject = { book_id: bookId, chapter_id: chapterId, section_id: sectionId };
            localStorage.setItem('lastPractice', JSON.stringify(rememberObject));
        }, 5000)
    }

    const setupResetBtnClick = () => {
        RESET_BTN_EL().addEventListener('click', (e) => {
            vocabEvaluation.cleanPracticeArea();
        })
    }

    const setupCheckBtn = () => {
        CHECK_BTN_EL().addEventListener('click', (e) => {
            if (!practiceStorage.isFreezed()) {
                vocabEvaluation.evaluateVocabs()
            } else {
                SimpleModal.openModal({ message: practiceStorage.showFrozenMessage(), btnText: 'Got it' });
            }
        })
    }

    return {

        //public scope

        init: (parm) => {
            return paint(frm(), ".practice-container #content-pannel")
                .then(e =>
                    practiceResultIndicator.init('.practice-container #content-pannel .section-info').then(
                        e => {
                            evaluationPannel.init('.practice-container #content-pannel .evaluation-pain').then(
                                e => {
                                    PracticePain.setupPractice(parm)
                                })
                        }
                    )
                )
        },

        CHECK_BTN_EL: CHECK_BTN_EL,

        setupPractice: async (bookId) => {
            setupCheckBtn();
            setupResetBtnClick();

            let currentBook = BookState.getRecord(bookId)[0]
            PracticeSidebar.populateBookInPractice(currentBook);

            await PracticeSidebar.fetchChapterOfABook(currentBook.book_id)
                .then(() => {
                    // let chapter = ChapterState.getCurrentRecord();
                    PracticeSidebar.fetchSectionOfABook(currentBook.book_id)
                        .then(() => {
                            let section = SectionState.getCurrentSection();
                            vocabEvaluation.fetchVocabBySection(section.section_id);
                        });
                });

            rememberLastPractice()
        },

        clearSavingLastPractice: () => {
            if (practiceSavingInterval) {
                clearInterval(practiceSavingInterval);
            }
        },
    }
})();