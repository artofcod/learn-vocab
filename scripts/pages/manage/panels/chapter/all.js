/**
 * Immidately invocable function or closure
 * @name bookListForChapter
 * @return {...} Returns an object which will be in the return statement.
 */

const bookListForChapter = (() => {

    //private scope
    const TITLE = 'Select a book to modify its chapter';
    const CLASS_NAME = 'chapter';
    const VOCAB_CREATE_PATH = '/manage-v/chapter/table';
    const BOOK_CONTAINER_CLASS = '.chapter .book-container';
    const BOOK_CONTAINER_EL = () => document.querySelectorAll(BOOK_CONTAINER_CLASS);

    return {

        //public scope

        init: async (pram, layout) => {
            await paint(BookList.frm(TITLE, true, CLASS_NAME), "." + layout)
            await RepeatingBook.setupBooks(true);

            BOOK_CONTAINER_EL().forEach((element, key) => {
                element.setAttribute('data-path', VOCAB_CREATE_PATH);

                element.addEventListener('click', (e) => {
                    locate(
                        element.dataset.path,
                        {
                            titel: 'chapter',
                            select: 'chapter',
                            selectionQeue: ['chapter'],
                            selected: {
                                book: element.children[0].dataset.id,
                                chapter: '',
                                section: '',
                            },

                            finalUrl: '/manage-v/chapter/create',
                            isFinal: true,
                        });
                }, false)
            })
        },


    }
})();