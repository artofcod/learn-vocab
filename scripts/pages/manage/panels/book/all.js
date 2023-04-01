/**
 * Immidately invocable function or closure
 * @name allBookFrm
 * @return {...} Returns an object which will be in the return statement.
 */

const allBookFrm = (() => {

    //private scope

    return {

        //public scope

        init: async (pram, layout) => {
            let titel = "Available vocabulary books to Change or delete"
            await paint(BookList.frm(titel, true, 'book'), "." + layout)
            RepeatingBook.setupBooks(true, true);
        },


    }
})();