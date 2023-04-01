function manageVocab() {
    let state = new MainState();
    let lastInsertedId = 800;
    return {
        vocab: {

            ...state,

            getVocab: (id) => {
                return state.
                    getRecords().
                    filter(e => e.vocab_id == id)[0]
            },

            getVocabBySection: (section_id) => {
                return state.
                    getRecords().
                    filter(e => e.section_id == section_id)
            },

            updateVocab: (data) => {
                let updatedState = state.
                    getRecords().
                    map(e => {
                        if (e.vocab_id == data.vocab_id) {
                            Object.assign(e, data);
                        }
                        return e
                    });
                state.setRecords(updatedState);
            },

            deleteVocab: (id) => {
                let aferDelete = state.
                    getRecords().
                    filter(e => e.vocab_id != id);
                state.setRecords(aferDelete);
            },

            isVocabPresent: (sectionId) => {
                return state.
                    getRecords().some(e => e.section_id == sectionId)
            },

            getSemulatedLastInsetedId: () => {
                return lastInsertedId++
            },

            saveVocab: (recordObj) => {
                state.setRecord(recordObj);
            }

        }
    }

}

Object.assign(manageState, new manageVocab());