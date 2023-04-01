const practiceResultIndicator = (() => {

    const frm = () => {
        return Object.freeze(`
                    <div class="row">
                        <div class="col-8">
                            <div class="section-description">
                                <h5 class="section-name m-0">The section name will appear here</h5>
                                <h6 class="section-eng-name m-0">English version of section name will appear
                                    here.</h6>
                            </div>
                        </div>
                        <div class="col-4">
                            <div class="practice-result d-flex justify-content-around">
                                <div class="text-center correct-eval">
                                    <p class="m-0 notation-heading">correct</p>
                                    <p class="m-0 notation-number">0</p>
                                </div>
                                <div class="text-center wrong-eval">
                                    <p class="m-0 notation-heading">wrong</p>
                                    <p class="m-0 notation-number">0</p>
                                </div>
                                <div class="text-center na-eval">
                                    <p class="m-0 notation-heading">Not Attempt</p>
                                    <p class="m-0 notation-number">0</p>
                                </div>
                            </div>
                        </div>
                    </div>
                `)
    }

    const CORRECT_INDICATOR_CLASS = '.practice-result .correct-eval .notation-number';
    const WRONG_INDICATOR_CLASS = '.practice-result .wrong-eval .notation-number';
    const NA_INDICATOR_CLASS = '.practice-result .na-eval .notation-number';
    const SECTION_INFO_NAME_CLASS = '.section-info .section-name';
    const SECTION_INFO_ENG_NAME_CLASS = '.section-info .section-eng-name';

    const CORRECT_INDICATOR_EL = () => document.querySelector(CORRECT_INDICATOR_CLASS);
    const WRONG_INDICATOR_EL = () => document.querySelector(WRONG_INDICATOR_CLASS);
    const NA_INDICATOR_EL = () => document.querySelector(NA_INDICATOR_CLASS);
    const SECTION_INFO_NAME_EL = () => document.querySelector(SECTION_INFO_NAME_CLASS);
    const SECTION_INFO_ENG_NAME_EL = () => document.querySelector(SECTION_INFO_ENG_NAME_CLASS);

    return {
        init: (layout) => {
            return paint(frm(), layout)
        },

        renderEvaluationReasult: () => {
            CORRECT_INDICATOR_EL().innerHTML = practiceStorage.totalCorrect();
            WRONG_INDICATOR_EL().innerHTML = practiceStorage.totalWrong();
            NA_INDICATOR_EL().innerHTML = practiceStorage.totalNa();
        },

        updateSectionNameOnTitle: (sname, engsname) => {
            SECTION_INFO_NAME_EL().innerHTML = sname;
            SECTION_INFO_ENG_NAME_EL().innerHTML = engsname;
        },
    }
})();