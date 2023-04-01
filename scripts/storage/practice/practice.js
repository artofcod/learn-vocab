function ConstructPracticeState() {

    let practiceEvaluation = [];
    let freezOperation = false;
    let frozenMessage = `Saving practice record is currently frozen.
     In order to gain access of check button <i><b>(saving record operateion)</b></i> or unfreez the system hit reset button.</br>
     <hr>
     <b>Note :</b> <i>However in frozen mode you can still practice and check where you have done mistakes.
     In this mode system will evaluate your vocabs and show results, only thing is that you can't save that data.</i>
     `;

    return {
        setFreez: (forzen) => {
            freezOperation = forzen;
        },
        isFreezed: () => {
            return freezOperation;
        },
        updatePracticeEval: (evalObj) => {
            if (practiceEvaluation.length >= VocabState.getRecords().length) {
                practiceEvaluation.map(e => {
                    if (e.vocabId == evalObj.vocabId) {
                        e.result = evalObj.result;
                    }
                })
            } else {
                practiceEvaluation.push(evalObj);
            }

        },
        totalCorrect: () => {
            return practiceEvaluation.filter(e => e.result == "correct").length;
        },
        totalWrong: () => {
            return practiceEvaluation.filter(e => e.result == "wrong").length;
        },
        totalNa: () => {
            return practiceEvaluation.filter(e => e.result == "na").length;
        },
        resetPracticeEvalData: () => {
            practiceEvaluation = [];
        },
        showFrozenMessage: () => {
            return frozenMessage;
        }
    }
}


const practiceStorage = new ConstructPracticeState();