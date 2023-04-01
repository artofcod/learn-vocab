function ConstructBookState() {
    let mainState = new MainState();
    let currentRecord;
    return {
        ...mainState,

        getRecord: (id) => {
            return mainState
                .getRecords()
                .filter(e => e.book_id == id);
        },

        setCurrentRecord: (id) => {
            currentRecord = mainState
                .getRecords()
                .filter(e => e.book_id == id)[0]
        },

        getCurrentRecord: () => {
            return currentRecord;
        },
    }
};

const BookState = new ConstructBookState();