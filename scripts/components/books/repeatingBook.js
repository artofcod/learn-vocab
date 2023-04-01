/**
 * Immidately invocable function or closure
 * @name RepeatingBook
 * @return {...} Returns an object which will be in the return statement.
 */

const RepeatingBook = (() => {

    //private scope
    const BOOK_LIST_FRM_CLASS = '.books-wraper';
    const BOOK_CONTAINER_CLASS = '.books-wraper .book-handel';

    const BOOK_LIST_FRM_EL = () => document.querySelector(BOOK_LIST_FRM_CLASS);
    const BOOK_CONTAINER_ELS = () => document.querySelectorAll(BOOK_CONTAINER_CLASS);

    const actionContent = (bookObj) => {
        return Object.freeze(`
                        <div class=" col-3 pl-0 action-content" >
                            <div class="action-wraper">
                                <div class="edit" data-id=${bookObj.book_id}>
                                    <i class="ion-android-create"></i>
                                </div>
                                <div class="seperator"></div>
                                <div class="delete" data-id${bookObj.book_id}>
                                    <i class="ion-android-delete"></i>
                                </div>
                            </div>
                        </div >
                        <!-- .action - content end-->
                     `);
    }

    const mergeAction = (el, bookObj) => {
        return (`<div class="row">
                    <div class=" col-9 pr-0 main-content">
                    ${el}
                    </div >
                    <!-- .main - content end--> 
                     ${actionContent(bookObj)}
                </div >
                <!--row end-->
            `)
    }

    const repeatableBookContainer = (bookObj, isManage = false, showControl = false,) => {
        let bookPanel = (`
                    <div class="py-4 pl-3" data-id=${bookObj.book_id}>
                        <h5>${bookObj.b_name}</h5>
                        <h6>${bookObj.b_author}</h6>
                    </div>
                `)

        return Object.freeze(`
                        <div class="col-${isManage ? 4 : 3}  pb-4 book-handel">
                            <div class="book-container">
                                ${showControl ? mergeAction(bookPanel, bookObj) : bookPanel}
                            </div >
                            <!-- .book - container end-->
                        </div >
                        <!-- .col - 3 end-->            
            `)
    }


    const loadingFrm = () => {
        return `<i class="loding-animation ion-pizza"></i><p class="w-100 text-center">Loading data...</p>`;
    }


    const findProperId = heigherO.getProperNode(e => e.dataset.id);
    const findActionBtn = heigherO.getProperNode(e => e);


    const manageClick = async (e) => {
        if (findActionBtn(e).classList[0] === "edit") {
            locate('/manage-v/books/create', findProperId(e))
        } else if (findActionBtn(e).classList[0] === "delete") {
            let bookName = manageState
                .book
                .getRecord(1)[0]
                .b_name;
            let contentObj = {
                message: `<h4 class="mb-3">Aer you shure?</h4>
                            <p class="mb-1">you want to delete <b class="text-danger">${bookName}</b>.</p>
                            <p class="mb-1">After delete data will lost for forever and cant be retrive.</p`,
                btnText: 'Yes Delete <i class="ion-trash-a">',
                btnColor: 'delete',
            }
            let isDeleteAble = await SimpleModal.openModal(contentObj);
            console.log(isDeleteAble);
        }
    }

    const practiceClick = (e) => {
        const bookId = lastPractice('book')
        BookState.setCurrentRecord(bookId);
        locate('/practice-v/practice', findProperId(e))
    }

    const attachClickOnBookContainers = (isManage) => {

        BOOK_CONTAINER_ELS().forEach(e => {
            e.addEventListener('click', async (e) => {
                if (isManage) {
                    manageClick(e);
                } else {
                    practiceClick(e);
                }


            })
        })

    }

    const populateBookInList = (isManage, showControl) => {

        //show loader if there is letency for data fetching.
        BOOK_LIST_FRM_EL().innerHTML = loadingFrm();

        let books = '';
        BookState.getRecords().map(e => {
            books += repeatableBookContainer(e, isManage, showControl);
        })
        BOOK_LIST_FRM_EL().innerHTML = books;
        attachClickOnBookContainers(isManage);
    }

    const fetchBooks = () => {
        return new Promise(resolve => {
            if (BookState.isRecordSFetched() === false) {
                var requestOptions = {
                    method: 'GET'
                };

                fetch("book", requestOptions)
                    .then(async response => BookState.setRecords(await response.json()))
                    .then(res => resolve(true))
                    .catch(error => console.log('error', error));
            } else {
                resolve(true);
            }
        })
    }

    return {

        //public scope

        setupBooks: (isManage, showControl,) => {
            fetchBooks().then(e => {
                populateBookInList(isManage, showControl)
            })
        },


    }
})();