function manageChapter() {
    let state = new MainState();
    return {
        chapter: {

            ...state,

            getChapter: (chapter_id) => {
                return state.
                    getRecords().
                    filter(e => e.chapter_id == chapter_id)[0]
            },

            getChaptersByBook: (bookId) => {
                return state.
                    getRecords().
                    filter(e => e.book_id == bookId)
            },

            updateChapter: (data) => {
                let updatedState = state.
                    getRecords().
                    map(e => {
                        if (e.chapter_id == data.chapter_id) {
                            Object.assign(e, data);
                        }
                        return e
                    });
                state.setRecords(updatedState);
            },

            deleteChapter: (id) => {
                let aferDelete = state.
                    getRecords().
                    filter(e => e.chapter_id != id);
                state.setRecords(aferDelete);
            },

            isChapterPresent: (bookId) => {
                return state.
                    getRecords().some(e => e.book_id == bookId)
            },

            saveChapter: (recordObj) => {
                state.setRecord(recordObj);
            }
        }
    }

}

Object.assign(manageState, new manageChapter());
