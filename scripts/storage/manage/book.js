const manageBook = (() => {
    let state = BookState;
    return {
        book: {
            ...state,

            getBook: (id) => {
                return state.
                    getRecords().
                    filter(e => e.book_id == id)[0]
            },

            addBook: (book) => {
                state.getRecords().push(book);
            },

            updateBook: (id, book) => {
                let newstate = state.
                    getRecords()
                    .map(e => {
                        if (e.book_id == id) {
                            Object.assign(e, book);
                        }
                        return e;
                    });

                state.updateRecords(newstate);
            },

            generateTempBookId: () => {
                return parseInt(state.getRecords()[state.getRecords().length - 1].book_id) + 1;
            }

        }
    }
})()

Object.assign(manageState, manageBook);

