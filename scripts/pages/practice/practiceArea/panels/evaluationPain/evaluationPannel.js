const evaluationPannel = (() => {
    const frm = () => {
        return Object.freeze(`
                    <div class="row mb-1">
                        <div class="col-9 pb-1">

                            <header class=" py-1 mx-0 row text-center">
                                <div class="col-4">
                                    <h6>Meaning</h6>
                                </div>
                                <div class="col-4">
                                    <h6>Vocab</h6>
                                </div>
                                <div class="col-4">
                                    <button class="show-vocab-btn">Show</button>
                                </div>
                            </header>
                            <div class="vocabs py-1">
                                <div class="row vocab-record py-1">
                                    <div class="col-6">
                                        <span>
                                            The Meaning
                                        </span>
                                    </div>

                                    <div class="col-6 text-right">
                                        <input class="input-type" type="text" name="vocabId" id="1">
                                    </div>
                                </div>

                            </div>

                        </div>
                    </div>
                `);
    }

    const SHOW_HIDE_VOCAB_BTN_CLASS = '.show-vocab-btn';

    const SHOW_HIDE_VOCAB_BTN_EL = () => document.querySelector(SHOW_HIDE_VOCAB_BTN_CLASS);

    const setupShowHideBtnClick = () => {
        SHOW_HIDE_VOCAB_BTN_EL().addEventListener('click', (btn) => {
            evaluationPannel.showHideBtnOfVocab();
        });
    }

    return {
        init: (layout) => {
            return paint(frm(), layout).then(
                e => {
                    setupShowHideBtnClick()
                }
            )
        },

        showHideBtnOfVocab: () => {
            let btnx = document.querySelector('.show-vocab-btn');
            let btnText = btnx.innerHTML == 'Show' ? 'Hide' : 'Show';
            btnx.innerHTML = btnText;
            vocabEvaluation.showHideVocabulary();
        }

    }
})();