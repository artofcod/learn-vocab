/**
 * Immidately invocable function or closure
 * @name bookListForSection
 * @return {...} Returns an object which will be in the return statement.
 */

const bookListForSection = (() => {

    //private scope
    const TITLE = 'Select a book to modify its sections';
    const CLASS_NAME = 'section';
    const VOCAB_CREATE_PATH = '/manage-v/select-table-data';
    const BOOK_CONTAINER_CLASS = '.section .book-container';
    const BOOK_CONTAINER_EL = () => document.querySelectorAll(BOOK_CONTAINER_CLASS);

    return {

        //public scope

        init: async (pram, layout) => {
            await paint(BookList.frm(TITLE, true, CLASS_NAME), "." + layout)
            await RepeatingBook.setupBooks(true)

            BOOK_CONTAINER_EL().forEach((element, key) => {
                element.setAttribute('data-path', VOCAB_CREATE_PATH);

                element.addEventListener('click', (e) => {
                    locate(
                        element.dataset.path,
                        {
                            titel: 'section',
                            selectionQeue: ['chapter', 'section'],
                            selected: {
                                book: element.children[0].dataset.id,
                                chapter: '',
                                section: '',
                            },

                            finalUrl: '/manage-v/section/table',
                            isFinal: false
                        });

                }, false)
            })

        },


    }
})();