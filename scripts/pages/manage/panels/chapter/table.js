/**
 * Immidately invocable function or closure
 * @name ChpaterTable
 * @return {...} Returns an object which will be in the return statement.
 */

const ChpaterTable = (() => {

    //private scope
    const frm = () => {
        return commonFrm().table(
            {
                slno: 'Sl.no',
                name: 'chapter name normal',
                engName: 'chapter name english',
                description: 'description',
                isAction: isAction
            }
        )
    }

    const emptyDataFrm = () => {
        return commonFrm().noData(
            {
                context: 'chapter',
                mainMessage: "No Chpaters are found !",
                subMessage: "Under book",
                subMessageIdicator: manageState.book.getBook(bookId).b_name
            }
        );
    }

    const dataFrm = (obj, key) => {
        return commonFrm().data(
            {
                context: 'chapter',
                key: key,
                id: !!obj ? String(obj.chapter_id) : '',
                name: obj.c_name,
                engName: obj.c_name_eng,
                description: obj.c_description,
                isAction: isAction
            }
        )
    }

    const inputBoxFrm = (obj, key) => {
        let x = {

        }

        return commonFrm().input({
            context: 'chapter',
            key: key,
            id: !!obj ? String(obj.chapter_id) : '',
            name: !!obj ? obj.c_name : '',
            engName: !!obj ? obj.c_name_eng : '',
            description: !!obj ? obj.c_description : ''
        })


    }

    const EDIT_BTN_CLASS = 'table .edit';
    const DELETE_BTN_CLASS = 'table .delete';
    const TABLE_TRS_SELECTOR = 'table tbody tr';
    const PANNEL_BODY_SELECTOR = '.pannel-body';
    const ADD_INPUT_BOX_BTN_SELECTOR = '.add-input-box button';
    const TABLE_BODY_EL = 'table tbody';

    const SPECIFIC_TR = (e) => `table tbody tr#id${e}`
    const CHAPTER_NAME_INPUT_SELECTOR = (e) => `.chapter-name${e} input`;
    const CHAPTER_ENG_NAME_INPUT_SELECTOR = (e) => `.chapter-eng-name${e} input`;
    const CHAPTER_DESCRIPTION_TEXTAREA_SELECTOR = (e) => `.chapter-description${e} textarea`;
    const CHAPTER_NAME_ERROR_CLASS = (e) => `.chapter-name${e} .general-error`;
    const CHAPTER_ENG_NAME_ERROR_CLASS = (e) => `.chapter-eng-name${e} .general-error`;

    let pramObj, layout, pannelLayout, prevBookId, bookId, isAction = false;

    const fetchChpaterFormServer = () => {
        return new Promise(resolve => {

            let requestOptions = {
                method: 'GET',
            };

            fetch("chapter?book_id=" + bookId, requestOptions)
                .then(async response => {
                    manageState.chapter.setRecords(await response.json());
                    resolve(manageState.chapter.getRecords());
                })
                .catch(error => console.log('error', error))

        })
    }


    const fetchChapter = (bookId) => {
        if (prevBookId != bookId) {
            prevBookId = bookId;
            return fetchChpaterFormServer();
        } else {
            return manageState.chapter.getRecords();
        }

    }

    const toggleChapterNameError = (index) => {
        query(CHAPTER_NAME_ERROR_CLASS(index)).classList.remove('d-none');
        query(CHAPTER_NAME_INPUT_SELECTOR(index)).classList.add('is-invalid');

    }

    const toggleChapterEngNameError = (index) => {
        query(CHAPTER_ENG_NAME_ERROR_CLASS(index)).classList.remove('d-none');
        query(CHAPTER_ENG_NAME_INPUT_SELECTOR(index)).classList.add('is-invalid');
    }





    const validateData = (index) => {
        let chapterId = query(SPECIFIC_TR(index)).dataset.chapterId.trim();
        let chpaterName = query(CHAPTER_NAME_INPUT_SELECTOR(index)).value;
        let chapterEngName = query(CHAPTER_ENG_NAME_INPUT_SELECTOR(index)).value;
        let description = query(CHAPTER_DESCRIPTION_TEXTAREA_SELECTOR(index)).value;

        return new Promise(resolve => {
            if (validate.textIsBlank(chpaterName) ||
                validate.textIsBlank(chapterEngName)) {
                resolve({
                    valid: true,
                    values: {
                        chapter_id: chapterId,
                        c_name: chpaterName.trim(),
                        c_name_eng: chapterEngName.trim(),
                        c_description: description.trim(),
                        book_id: bookId,
                    }
                });
            } else {

                if (!validate.textIsBlank(chpaterName)) {
                    toggleChapterNameError(index)
                }

                if (!validate.textIsBlank(chapterEngName)) {
                    toggleChapterEngNameError(index)
                }

                resolve({ valid: false })
            }
        })
    }

    const delInfo = (obj) => {
        return {
            delName:
                validate.textIsBlank(obj.c_name)
                    ? obj.c_name
                    : obj.c_name_eng,
            context: 'Chapter'
        }
    }

    const tr = (e) => heigherO
        .selectPath(e)
        .filter(finder => finder.localName == 'tr')[0];

    const slNo = (e) => heigherO
        .selectPath(e)
        .filter(finder => finder.localName == 'tr')[0]
        .children[0]
        .innerHTML;

    const getChapterObj = (e) => {
        let obj = manageState
            .chapter
            .getChapter(tr(e).dataset.chapterId);
        return Object.assign(obj, delInfo(obj))
    }

    const attachClickOnEditBtn = (element) => {
        element.addEventListener('click', (e) => {
            tr(e).innerHTML = inputBoxFrm(getChapterObj(e), slNo(e));
            setupSaveBtnClick(slNo(e));
            setupCancelBtnClick(slNo(e))
        }, false)
    }

    const setupEditBtnClick = (dataId) => {
        if (dataId === undefined) {
            querys(EDIT_BTN_CLASS)
                .forEach(element => {
                    attachClickOnEditBtn(element);
                })
        } else {
            attachClickOnEditBtn(query(`#id${dataId} .edit`));

        }

    }

    const saveDataToStore = (value, chapterId) => {
        if (validate.textIsBlank(chapterId)) {
            manageState.chapter.updateChapter(value);
            sanckBar.showSnackBar('edit');
            return value;
        } else {

            let insertedId = manageState.vocab.getSemulatedLastInsetedId();
            Object.assign(value, { chapter_id: insertedId });
            manageState.chapter.saveChapter(value);

            sanckBar.showSnackBar();
            return value;
        }

    }

    const setVocabIdtoSelectedElement = (el, obj) => {
        /**
         * by default injecting generated html inside seleted element
         * eveyting inside the current element generating dynamically
         * but because of current element acting as parent hence it 
         * remanins unchange. but current seleted parent elemet needs
         * to change its data as well when inside data is change.
         * and because data is not change by default hence changing
         * the necessary data explicitly.
         */
        el.dataset.chapterId = obj.chapter_id;
    }

    const replaceInputBoxInData = (obj, key) => {
        let trs = querys(TABLE_TRS_SELECTOR);
        let seletedTr = Object.entries(trs).filter(e => e[1].dataset.index == key)[0][1];
        setVocabIdtoSelectedElement(seletedTr, obj);
        seletedTr.innerHTML = dataFrm(obj, key);
    }

    const validateAndSaveInputBoxData = async (e) => {
        let trDataset = (heigherO.getProperPath(e => e))(e)[5].dataset;
        let intputBoxData = await validateData(trDataset.index)

        if (intputBoxData.valid === true) {
            let savedValue = saveDataToStore(intputBoxData.values, trDataset.chapterId);
            replaceInputBoxInData(savedValue, trDataset.index);
            return true;
        }
    }

    const setupSaveBtnClick = (dataId) => {
        query(`#btn${dataId}`).addEventListener('click', async (e) => {
            if (await validateAndSaveInputBoxData(e)) {
                setupEditBtnClick(dataId);
                setupDeleteBtnClick(dataId);
            }

        }, false)

    }

    const setupCancelBtnClick = (dataId) => {

        query(`#btnCancel${dataId}`).addEventListener('click', async (e) => {
            let trDataset = (heigherO.getProperPath(e => e))(e)[5].dataset;
            if (validate.textIsBlank(trDataset.chapterId)) {
                let obj = manageState.chapter.getChapter(trDataset.chapterId);
                replaceInputBoxInData(obj, trDataset.index);
                setupEditBtnClick(dataId);
                setupDeleteBtnClick(dataId);
            } else {
                deleteSelectedRow(e);
            }
        }, false)
    }

    const modalResponse = (delObj) => {
        return SimpleModal.openModal({
            message: `<h4 class="mb-3">Aer you shure?</h4>
                            <p class="mb-1">
                                You want to  delete
                                <span class="text-danger">
                                    ${delObj.context} : <b>${delObj.delName}</b>
                                </span>
                                ?
                            </p>
                            <p class="mb-1">
                                After delete data will lost for forever and can't be retrive.
                            </p`,
            btnText: 'Yes Delete <i class="ion-trash-a"></i>',
            btnColor: 'delete',
        });
    }


    const attachClickOnDeletebtn = (element) => {
        element.addEventListener('click', async (e) => {
            let delInfoObj = getChapterObj(e);
            if (await modalResponse(delInfoObj)) {
                manageState
                    .chapter
                    .deleteChapter(tr(e).dataset.chapterId);

                let afterDeleteExistingChapter = manageState
                    .chapter
                    .getChaptersByBook(bookId).length

                if (afterDeleteExistingChapter > 0) {
                    deleteSelectedRow(e);
                } else {
                    removeTableAndShowNoData();
                }

                sanckBar.showSnackBar('delete');
            }
        }, false)
    }

    const setupDeleteBtnClick = (dataId) => {
        if (dataId === undefined) {
            querys(DELETE_BTN_CLASS).forEach(element => {
                attachClickOnDeletebtn(element);
            })
        } else {
            attachClickOnDeletebtn(query(`#id${dataId} .delete`));
        }

    }

    const deleteSelectedRow = (e) => {
        let tr = heigherO.selectPath(e).filter(e => e.nodeName == 'TR')[0];
        let tbody = heigherO.selectPath(e).filter(e => e.nodeName == 'TBODY')[0];
        tbody.removeChild(tr);
    }


    const generateData = () => {
        return manageState.
            chapter.
            getChaptersByBook(bookId).
            reduce((acc, e, key) => {
                return acc + dataFrm(e, ++key)
            }, '');
    }

    const populateTableWithData = async () => {
        let tableBodyLayout = `${pannelLayout} table tbody`;
        await paint(generateData(), tableBodyLayout);

        if (!isAction) {
            selectTables.handelRowSelect(pramObj);
        }

        setupDeleteBtnClick();
        setupEditBtnClick();
        setupAddInptboxClick();
    }


    const removeTableAndShowNoData = () => {
        query(pannelLayout).classList.add('no-data');

        if (query(pannelLayout + ' ~ .add-input-box')) {
            query(pannelLayout + ' ~ .add-input-box').classList.add('d-none');
        }

        paint(emptyDataFrm(), pannelLayout);
        hadelClickOfNoDataAddBtn();
    }

    const hasChapterToShow = async () => {
        const e = await fetchChapter(bookId);
        if (!e.length || e.length < 1) {
            removeTableAndShowNoData();
            return false;
        } else {
            return true;
        }
    }


    const hadelClickOfNoDataAddBtn = () => {
        const NO_DATA_ADD_BTN = `.pannel-body.no-data .nodata-action button`;
        const NO_DATA_ADD_BTN_EL = query(NO_DATA_ADD_BTN);
        let context = query('#content-pannel').children[0].className;

        if (NO_DATA_ADD_BTN_EL && context == "chapter") {
            NO_DATA_ADD_BTN_EL.addEventListener('click', async (e) => {
                console.log(pannelLayout);
                query(pannelLayout).classList.remove('no-data');
                await paint(frm(), pannelLayout);
                query(TABLE_BODY_EL).innerHTML = inputBoxFrm(undefined, 1);
                query(pannelLayout + ' ~ .add-input-box').classList.remove('d-none');
                setupSaveBtnClick(1);
                setupCancelBtnClick(1);
                setupAddInptboxClick();
            }, false)
        }
    }


    const injectNewRowWithInputbox = (index) => {
        let tr = document.createElement('tr');
        tr.id = "id" + index;
        tr.setAttribute("data-index", index);
        tr.setAttribute("data-chapter-id", '');
        tr.innerHTML += inputBoxFrm(undefined, index);

        query(TABLE_BODY_EL).appendChild(tr);
    }

    const scrollWhereRowWithInputboxInjected = () => {
        const PANNEL_BODY_EL = query(PANNEL_BODY_SELECTOR);
        PANNEL_BODY_EL.scrollTop = PANNEL_BODY_EL.scrollHeight;
    }

    const setupAddInptboxClick = () => {
        const ADD_INPUT_BOX_BTN_EL = query(ADD_INPUT_BOX_BTN_SELECTOR);
        if (ADD_INPUT_BOX_BTN_EL) {
            ADD_INPUT_BOX_BTN_EL.addEventListener('click', (e) => {

                let lastIndex = query(TABLE_BODY_EL).lastElementChild;
                let newIndex = lastIndex ? ++lastIndex.dataset.index : 1;

                injectNewRowWithInputbox(newIndex);
                scrollWhereRowWithInputboxInjected();
                setupSaveBtnClick(newIndex);
                setupCancelBtnClick(newIndex);

            }, false)
        }
    }

    return {

        //public scope
        init: async (InpramObj, Inlayout) => {

            layout = '.' + Inlayout;
            pramObj = InpramObj;
            pannelLayout = `${layout} .pannel-body `;
            bookId = InpramObj.selected.book;
            isAction = InpramObj.isFinal;
            await TableFrm.init(pramObj, layout)


            if (await hasChapterToShow()) {
                await paint(frm(), pannelLayout);
                populateTableWithData();
            }

        },


    }
})();