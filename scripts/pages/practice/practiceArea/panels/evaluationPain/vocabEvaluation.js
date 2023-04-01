const vocabEvaluation = (() => {

    // template for the vocabes
    const vocabFrame = (vocabId, vocabulay, meaning, sectionId) => {
        return `
        <div class="row vocab-record p-0 mb-1">
            <div class="col meaning">
                <span class="meaning-placeholder">
                    ${meaning}
                </span>
            </div>
            <div class="col practice my-auto p-0">
                <input class="input-type" type="text" name="${sectionId}" id="${vocabId}">
                <div class="indicator"></div>
            </div>
            <div class="col defination">
                <span class="defination-placeholder d-none">
                    ${vocabulay}
                </span>
            </div>
        </div>
        `
    }

    const PRACTICE_VOCAB_INPUTBOX_CLASS = '.vocab-record .practice .input-type';
    const PRACTICE_VOCAB_INDICATOR_CLASS = '.vocab-record .indicator';
    const CORRECT_CLASS = 'correct';
    const WRONG_CLASS = 'wrong';
    const NA_CLASS = 'na';
    const ORIGINAL_VOCAB_CLASS = '.defination-placeholder';
    const VOCAB_RECORD_CLASS = '.vocab-record';
    const VOCAB_PRACTICE_PANNEL_CLASS = '.vocabs';
    const FROZEN_CLASS = 'frozen';

    const PRACTICE_VOCAB_INPUTBOX_ELS = () => document.querySelectorAll(PRACTICE_VOCAB_INPUTBOX_CLASS);
    const PRACTICE_VOCAB_INDICATOR_ELS = () => document.querySelectorAll(PRACTICE_VOCAB_INDICATOR_CLASS);
    const PRACTICE_VOCAB_INDICATOR_EL = (element) => element.querySelector(PRACTICE_VOCAB_INDICATOR_CLASS);
    const ORIGINAL_VOCAB_EL = (element) => element.querySelector(ORIGINAL_VOCAB_CLASS);
    const PRACTICED_VOCAB_EL = (element) => element.querySelector(PRACTICE_VOCAB_INPUTBOX_CLASS);
    const VOCAB_RECORD_ELS = () => document.querySelectorAll(VOCAB_RECORD_CLASS);
    const VOCAB_PRACTICE_PANNEL_EL = () => document.querySelector(VOCAB_PRACTICE_PANNEL_CLASS);


    const startRuntimeEvaluation = (event) => {
        const practicedVocab = event.value.trim();
        const originalVocab = event.parentNode.nextElementSibling.children[0].innerText.trim();
        const indicator = event.nextElementSibling;
        const vocabId = event.id;

        evaluation({ practicedVocab, originalVocab, indicator, vocabId });
        practiceResultIndicator.renderEvaluationReasult();
    }

    const attachOnblurEvent = () => {
        PRACTICE_VOCAB_INPUTBOX_ELS().forEach(element => {
            element.addEventListener('blur', (e) => {
                if (practiceStorage.isFreezed()) {
                    startRuntimeEvaluation(e.target);
                }
            }, false)
        });
    }

    const removeAllPracticeStyle = () => {
        PRACTICE_VOCAB_INDICATOR_ELS().forEach(element => {
            removeCurrentPracticeStyle(element.classList)
        })
    }

    const evaluation = (evalObject) => {
        let { vocabId, practicedVocab, originalVocab, indicator } = evalObject;
        removeCurrentPracticeStyle(indicator.classList);

        practicedVocab = practicedVocab.toLocaleLowerCase();
        originalVocab = originalVocab.toLocaleLowerCase();

        if (practicedVocab.length > 0 && originalVocab == practicedVocab) {
            indicator.classList.add(CORRECT_CLASS);
            practiceStorage.updatePracticeEval({ vocabId: vocabId, "result": "correct" })
            return "correct";
        } else if (practicedVocab.length > 0 && originalVocab != practicedVocab) {
            indicator.classList.add(WRONG_CLASS);
            practiceStorage.updatePracticeEval({ vocabId: vocabId, "result": "wrong" })
            return "wrong";
        } else {
            indicator.classList.add(NA_CLASS);
            practiceStorage.updatePracticeEval({ vocabId: vocabId, "result": "na" })
            return "na";
        }
    }

    const removeCurrentPracticeStyle = (classList) => {
        if (classList.contains(CORRECT_CLASS)) {
            classList.remove(CORRECT_CLASS)
        } else if (classList.contains(WRONG_CLASS)) {
            classList.remove(WRONG_CLASS);
        } else if (classList.contains(NA_CLASS)) {
            classList.remove(NA_CLASS);
        }
    }

    const compairableValues = (element) => {
        let originalVocab = ORIGINAL_VOCAB_EL(element).innerHTML.trim();
        let practicedVocab = PRACTICED_VOCAB_EL(element).value.trim();
        let indicator = PRACTICE_VOCAB_INDICATOR_EL(element);
        let vocabId = PRACTICED_VOCAB_EL(element).id;
        return { vocabId, practicedVocab, originalVocab, indicator };
    }

    const evaluatedEachVocab = () => {
        let evalResult = []
        VOCAB_RECORD_ELS().forEach(element => {
            evalResult.push({
                vocab_id: compairableValues(element).vocabId,
                result: evaluation(compairableValues(element))
            });
        })
        return evalResult;
    }

    const saveEvaluationResult = async (evResult) => {
        var formdata = new FormData();
        formdata.append("res", JSON.stringify(evResult));

        var requestOptions = {
            method: 'POST',
            body: formdata
        };

        try {
            const response = await fetch("practice/create.php", requestOptions);
            return await response.json();
        } catch (error) {
            return console.log('error', error);
        }
    }

    const isPracticed = (practiceResutltArray) => {
        return !(practiceStorage.totalNa() == practiceResutltArray.length)
    };

    const showWarningAndResetVocab = async () => {
        SimpleModal.openModal();
        resetTextboxes();
        resetEvaluationResult();
    }

    const showSavingInfoAndLockSavingTemporaryly = () => {
        sanckBar.showSnackBar();
        practiceStorage.setFreez(true);
        attachOnblurEvent();
        applyFrozenStyle();
    }

    const resetTextboxes = () => {
        PRACTICE_VOCAB_INPUTBOX_ELS().forEach(element => {
            element.value = "";
        })
        removeAllPracticeStyle();
    }

    const resetEvaluationResult = () => {
        practiceStorage.resetPracticeEvalData();
    }


    const scorollToTop = () => {
        VOCAB_PRACTICE_PANNEL_EL().scrollTop = 0;
    }

    const applyFrozenStyle = () => {
        VOCAB_PRACTICE_PANNEL_EL().classList.add(FROZEN_CLASS);
        PracticePain.CHECK_BTN_EL().classList.add(FROZEN_CLASS);
    }

    const removeFrozenstyle = () => {
        practiceStorage.setFreez(false);
        VOCAB_PRACTICE_PANNEL_EL().classList.remove(FROZEN_CLASS);
        PracticePain.CHECK_BTN_EL().classList.remove(FROZEN_CLASS);
    }

    const populateVocabulary = (vocabs) => {
        let htmlTemplate = ''
        vocabs.forEach(vocab => {
            htmlTemplate += vocabFrame(
                vocab.vocab_id,
                vocab.vocabulary,
                vocab.defination,
                vocab.section_id);
        });
        document.querySelector('.vocabs').innerHTML = htmlTemplate;
    }

    return {
        fetchVocabBySection: (sectionId) => {
            var requestOptions = {
                method: 'GET'
            };

            fetch("vocabulary?section_id=" + sectionId, requestOptions)
                .then(async response => VocabState.setRecords(await response.json()))
                .then(() => populateVocabulary(VocabState.getRecords()))
                .catch(error => console.log('error', error));
        },


        showHideVocabulary: () => {
            let vocabs = document.querySelectorAll('.defination span');
            if (vocabs[0].classList.contains('d-none')) {
                vocabs.forEach(vocab => {
                    vocab.classList.remove('d-none');
                })
            } else {
                vocabs.forEach(vocab => {
                    vocab.classList.add('d-none');
                })
            }
        },

        evaluateVocabs: async () => {
            removeAllPracticeStyle();
            resetEvaluationResult();

            let evalReasult = evaluatedEachVocab();
            if (!isPracticed(evalReasult)) {
                showWarningAndResetVocab();
            } else {
                let savingStatus = await saveEvaluationResult(evalReasult);
                if (savingStatus[0].operation_status) {
                    showSavingInfoAndLockSavingTemporaryly();
                    practiceResultIndicator.renderEvaluationReasult();
                }
            }
        },

        cleanPracticeArea: () => {
            scorollToTop();
            resetTextboxes()
            removeFrozenstyle();
            resetEvaluationResult();
            practiceResultIndicator.renderEvaluationReasult();
        },

    }
})();