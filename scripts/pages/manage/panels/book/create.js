/**
 * Immidately invocable function or closure
 * @name createBook
 * @return {...} Returns an object which will be in the return statement.
 */

const createBook = (() => {

    //private scope
    const frm = (editData) => {
        console.log(editData, manageState.book.getRecord(editData)[0]);
        return Object.freeze(`
                    <div class="book-action-pannel">
                        <div class="row justify-content-center">
                            <section class="col-12 p-0 pannel-appearence">
                                <header class="leading titel  px-4 py-3">
                                    <span>
                                        ${editData
                ? `Edit book : ${manageState.book.getRecord(editData)[0].b_name}`
                : `Add new book for your vocabulary`}
                                    </span>
                                </header>
                                <!-- header end -->
                                <div class="pannel-body">
                                    <div class="form-group book-name row mb-4">
                                        <label for="" class="form-input-label text-right col-sm-2 control-label">Book
                                            Name
                                            <small><i class= " text-danger ion-ios-medical" ></i></small>
                                           
                                            </label>

                                        <div class="col-sm-10">
                                            <input type="text" class="form-control" placeholder="Book name"
                                                id="book-name" value ="${editData ? manageState.book.getRecord(editData)[0].b_name : ''}">
                                        </div>
                                        <span class=" col-12 general-error d-none"> A name is required</span>
                                    </div>
                                    <!-- .form-group end -->
                                    <div class="form-group author row mb-4">
                                        <label for="" class="form-input-label text-right col-sm-2">Author Name</label>

                                        <div class="col-sm-10">
                                            <input type="text" class="form-control" placeholder="Author name"
                                                id="author-name" value ="${editData ? manageState.book.getRecord(editData)[0].b_author : ''}">
                                        </div>
                                        <span class=" col-12 general-error d-none"> A name is required</span>
                                    </div>
                                    <!-- .form-group end -->
                                    <div class="form-group book-description row">
                                        <label for="" class="form-input-label text-right col-sm-2">Description</label>
                                        <div class="col-sm-10">
                                            <textarea class="form-control" name="description" id="description"
                                                placeholder="Description name" rows="5">${editData ? manageState.book.getRecord(editData)[0].b_description : ''}</textarea>
                                        </div>
                                    </div>
                                    <!-- .form-group end -->
                                    <div class="form-group book-action text-center mx-auto">
                                    <div class="row offset-2">
                                        <div class="col">
                                            <button class="btn  ${editData ? `edit btn-warning` : `save btn-success`} w-50 mt-2">
                                            ${editData ? `Edit` : `Save`}
                                                <i class= "ion-android-create" ></i>
                                            </button>
                                        </div>
                                        ${editData ?
                `<div class="col">
                                            <button class="btn cancel btn-danger w-50 mt-2">
                                            Cancel
                                                <i class= "ion-android-cancel" ></i>
                                            </button>
                                        </div>`: ''}
                                    </div>
                                       
                                        
                                    </div>
                                    <!-- .form - group end-->

                                </div>
                                <!-- .pannel - body end-->
                            </section >
                            <!-- .pannel - appearence end-->
                        </div>
                    </div>
    `);
    }

    const CANCEL_BTN_CLASS = '.book-action-pannel .cancel';
    const SAVE_BTN_CLASS = '.book-action-pannel .book-action .btn';
    const BOOK_NAME_WRAPER_CLASS = '.form-group.book-name';
    const BOOK_NAME_LABEL_CLASS = '.form-group.book-name label';
    const BOOK_NAME_INPUT_CLASS = '.form-group.book-name input';
    const BOOK_NAME_ERROR_CLASS = '.form-group.book-name .general-error';
    const AUTHOR_NAME_WRAPER_CLASS = '.form-group.author';
    const AUTHOR_NAME_LABEL_CLASS = '.form-group.author label';
    const AUTHOR_NAME_INPUT_CLASS = '.form-group.author input';
    const AUTHOR_NAME_ERROT_CLASS = '.form-group.author .general-error';
    const BOOK_DESCRIPTION_WRAPER_CLASS = '.form-group.book-description';
    const BOOK_DESCRIPTION_LABEL_CLASS = '.form-group.book-description label';
    const BOOK_DESCRIPTION_TEXTAREA_CLASS = '.form-group.book-description textarea';

    const SAVE_BTN_EL = () => document.querySelector(SAVE_BTN_CLASS);


    // <div class="form-group row mb-4">
    //     <label for="" class="form-input-label text-right col-sm-2 control-label is-invalid">Book
    //         Name</label>

    //     <div class="col-sm-10">
    //         <input type="text" class="form-control is-invalid" placeholder="Book name"
    //             id="book-name">
    //     </div>
    //     <span class=" col-12 general-error show"> A name is required</span>
    // </div>

    const editBook = (pram, obj) => {
        // Object.assign(obj.values, { book_id: pram })
        manageState.book.updateBook(pram, obj.values);
        sanckBar.showSnackBar('edit');
    }

    const saveBook = (obj) => {
        Object.assign(obj.values, { book_id: manageState.book.generateTempBookId() });
        manageState.book.addBook(obj.values);
        sanckBar.showSnackBar();
    }

    const attachSaveClick = (pram) => {
        SAVE_BTN_EL().addEventListener('click', async () => {
            let obj = await validateFields()

            if (obj.valid === true) {
                if (pram === undefined) {
                    saveBook(obj);
                } else {
                    editBook(pram, obj);
                }
                locate('/manage-v/books/all');
            }

        }, false)
    }

    const attachCancelClick = () => {
        let cancel = query(CANCEL_BTN_CLASS);
        if (cancel !== (undefined || null)) {
            cancel.addEventListener('click', (e) => {
                locate('/manage-v/books/all');
            }, false)
        }
    }

    const toggleBookNameError = (reset) => {
        if (reset) {
            query(BOOK_NAME_ERROR_CLASS).classList.add('d-none');
            query(BOOK_NAME_INPUT_CLASS).classList.remove('is-invalid');
        } else {
            query(BOOK_NAME_ERROR_CLASS).classList.remove('d-none');
            query(BOOK_NAME_INPUT_CLASS).classList.add('is-invalid');
        }

    }





    const validateFields = () => {
        let bookName = query(BOOK_NAME_INPUT_CLASS).value;
        let author = query(AUTHOR_NAME_INPUT_CLASS).value;
        let description = query(BOOK_DESCRIPTION_TEXTAREA_CLASS).value;

        return new Promise(resolve => {
            toggleBookNameError(true);
            if (validate.textIsBlank(bookName)) {
                resolve({
                    valid: true,
                    values: {
                        b_name: bookName.trim(),
                        b_author: author.trim(),
                        b_description: description.trim(),
                    }
                });
            } else {

                if (!validate.textIsBlank(bookName)) {
                    toggleBookNameError()
                }

                resolve({ valid: false })
            }

        })
    }

    return {

        //public scope

        init: async (parm, layout) => {
            await paint(frm(parm), "." + layout);
            attachSaveClick(parm);
            attachCancelClick();

        },


    }
})();


