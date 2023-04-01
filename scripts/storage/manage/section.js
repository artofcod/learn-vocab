function manageSection() {
    let state = new MainState();
    return {
        section: {

            ...state,

            getSection: (id) => {
                return state.
                    getRecords().
                    filter(e => e.section_id == id)[0]
            },

            getSectionByChapter: (chapter_id) => {
                return state.
                    getRecords().
                    filter(e => e.chapter_id == chapter_id)
            },

            updateSection: (data) => {
                let updatedState = state.
                    getRecords().
                    map(e => {
                        if (e.section_id == data.section_id) {
                            Object.assign(e, data);
                        }
                        return e
                    });
                state.setRecords(updatedState);
            },

            deleteSection: (id) => {
                let aferDelete = state.
                    getRecords().
                    filter(e => e.section_id != id);
                state.setRecords(aferDelete);
            },

            isSectionPresent: (chapterId) => {
                return state.
                    getRecords().some(e => e.chapter_id == chapterId)
            },

            saveSection: (recordObj) => {
                state.setRecord(recordObj);
            }

        }
    }

}

Object.assign(manageState, new manageSection());
