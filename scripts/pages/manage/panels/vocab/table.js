/**
 * Immidately invocable function or closure
 * @name VocabTable
 * @return {...} Returns an object which will be in the return statement.
 */

const VocabTable = (() => {

    //private scope
    const frm = () => {
        return Object.freeze(`
                <table class="table table-hover table-striped text-light">
                    <thead>
                        <tr>
                            <th>Sl.no</th>
                            <th>Defination</th>
                            <th>Vocabulary</th>
                            ${isAction ? `<th>action</th>` : ''}
                        </tr>
                    </thead>
                    <tbody>
                       
                    </tbody>
                    <!-- end of tbody -->
                </table>
                <!-- end of table -->
            `)
    }

    const emptyDataFrm = () => {
        let context = query('#content-pannel').children[0].className;
        return (`<div class="row text-center my-3">
                    <div class="col my-5 py-4">
                        <img src="assets/img/undraw_no_data_qbuo.svg" alt="" srcset=""
                            class="img-fluid">
                        <p class="mt-1">
                            <span class="main-message">
                               No Vocabs are found!
                            </span>
                            <span class="sub-message">
                                Under Section
                                <span class="name-indicatior">${validate.textIsBlank(manageState.section.getSection(sectionId).s_name) ?
                manageState.section.getSection(sectionId).s_name :
                manageState.section.getSection(sectionId).s_name_eng

            }</span>
                            </span>
                            <span class="nodata-action ${context !== 'vocabulary' ? 'd-none' : ''}">
                                <button class="btn px-4 mt-4">
                                    <span>Add Voabulary</span>
                                    <i class="ion-plus-round"></i>
                                </button>
                            </span>
                        </p>
                    </div>
                    <!-- end of .col -->
                </div>`)
    }

    const dataFrm = (obj, key) => {
        const actionFrm = `<td>
                                <div class="nice-icon edit mr-2">
                                    <i class="ion-edit"></i>
                                </div>
                                <div class="nice-icon delete">
                                    <i class="ion-android-delete"></i>
                                </div>
                            </td>`;
        return Object.freeze(`
                    <tr
                    id="id${key}" 
                    data-index="${key}" 
                    data-vocab-id="${!!obj ? String(obj.vocab_id) : ''}">
                        <td>${key}</td>
                        <td>${obj.defination}</td>
                        <td>${obj.vocabulary}</td>
                        ${isAction ? actionFrm : ''}    
                    </tr>
                    <!-- end of tr -->
                `);
    }

    const inputBoxFrm = (obj, key) => {

        return (`
                <tr id="id${key}" data-index="${key}" data-vocab-id="${!!obj ? obj.vocab_id : ''}">
                    <td>${key}</td>
                    <td>
                        <div class="form-group defination-${key} mb-1">
                            <label for=""
                                class="form-input-label text-right sr-only">Defination</label>
                            <textarea class="form-control form-control-sm"
                                name="defination" id="defination-${key}" placeholder="Defination"
                                rows="2">${!!obj ? obj.defination : ''}</textarea>
                            <span class=" col-12 pb-1 general-error d-none"> A Defination is required</span>
                        </div>
                    </td>
                    <td>
                        <div class="form-group vocabulary-${key} mb-1">
                            <label for=""
                                class="form-input-label text-right sr-only">vocabulary</label>
                            <textarea class="form-control form-control-sm"
                                name="vocabulary" id="vocabulary-${key}" placeholder="Vocabulary"
                                rows="2">${!!obj ? obj.vocabulary : ''}</textarea>
                            <span class=" col-12 pb-1 general-error d-none"> Defination corrospondent vocabulary is required</span>
                        </div>
                    </td>
                    <td>
                        <div class="form-group text-center m-0">
                            <button 
                            class="btn btn-success save py-1"
                            id="btn${key}"
                            >
                                <i class="ion-checkmark-round p-0"></i>
                            </button>

                            <button
                            class="btn btn-danger cancel   py-1"
                            id="btnCancel${key}"
                            >
                                <i class="ion-close-round p-0"></i>
                            </button>
                        </div>
                    </td>
                </tr>
            `);
    }

    const EDIT_BTN_CLASS = 'table .edit';
    const DELETE_BTN_CLASS = 'table .delete';
    const TABLE_TRS_SELECTOR = 'table tbody tr';
    const PANNEL_BODY_SELECTOR = '.pannel-body';
    const ADD_INPUT_BOX_BTN_SELECTOR = '.add-input-box button';
    const TABLE_BODY_EL = 'table tbody';

    const SPECIFIC_TR = (e) => `table tbody tr#id${e}`
    const DEFINATION_TEXTAREA_SELECTOR = (e) => `.defination-${e} textarea`;
    const VOCABULARY_TEXTAREA_SELECTOR = (e) => `.vocabulary-${e} textarea`;
    const DEFINATION_ERROR_CLASS = (e) => `.defination-${e} .general-error`;
    const VOCABULARY_ERROR_CLASS = (e) => `.vocabulary-${e} .general-error`;

    let pramObj, layout, pannelLayout, prevSectionId, sectionId, selectedKey, isAction = false;

    const fetchVocabFormServer = () => {
        return new Promise(resolve => {
            if (!manageState.vocab.isVocabPresent(sectionId)) {
                var requestOptions = {
                    method: 'GET'
                };

                try {
                    fetch("vocabulary?section_id=" + sectionId, requestOptions)
                        .then(async response => {
                            let mainData = await response.json();
                            manageState.vocab.setChunckRecords(mainData);
                            resolve(mainData);
                        })
                } catch (error) {
                    console.log('error', error)
                    resolve(false);
                }

            } else {
                resolve(manageState.vocab.getVocabBySection(sectionId));
            }

        })
    }


    const fetchVocabOfASection = (sectionId) => {
        if (prevSectionId != sectionId) {
            prevSectionId = sectionId;
            return fetchVocabFormServer();
        } else {
            return manageState.vocab.getVocabBySection(sectionId);
        }

    }

    const toggleDefinationError = (index) => {
        query(DEFINATION_ERROR_CLASS(index)).classList.remove('d-none');
        query(DEFINATION_TEXTAREA_SELECTOR(index)).classList.add('is-invalid');
    }

    const toggleVocabularyError = (index) => {
        query(VOCABULARY_ERROR_CLASS(index)).classList.remove('d-none');
        query(VOCABULARY_TEXTAREA_SELECTOR(index)).classList.add('is-invalid');
    }

    const validateData = (index) => {
        let vocabId = query(SPECIFIC_TR(index)).dataset.vocabId.trim();
        let defination = query(DEFINATION_TEXTAREA_SELECTOR(index)).value.trim();
        let vocabulary = query(VOCABULARY_TEXTAREA_SELECTOR(index)).value.trim();

        return new Promise(resolve => {
            if (validate.textIsBlank(defination) &&
                validate.textIsBlank(vocabulary)) {
                resolve({
                    valid: true,
                    values: {
                        vocab_id: vocabId,
                        defination: defination,
                        vocabulary: vocabulary,
                        section_id: sectionId,
                    }
                });
            } else {

                if (!validate.textIsBlank(defination)) {
                    toggleDefinationError(index)
                }

                if (!validate.textIsBlank(vocabulary)) {
                    toggleVocabularyError(index)
                }

                resolve({ valid: false })
            }
        })
    }

    const delInfo = (obj) => {
        return {
            delName: obj.vocabulary,
            context: 'Vocabulary'
        }
    }
    const tr = (e) => heigherO.selectPath(e).filter(finder => finder.localName == 'tr')[0];
    const slNo = (e) => heigherO.selectPath(e).filter(finder => finder.localName == 'tr')[0].children[0].innerHTML;

    const getVocabObj = (e) => {
        let obj = manageState
            .vocab
            .getVocab(tr(e).dataset.vocabId);
        Object.assign(obj, delInfo(obj))

        return obj
    }

    const attachClickOnEditBtn = (element) => {
        element.addEventListener('click', (e) => {
            tr(e).innerHTML = inputBoxFrm(getVocabObj(e), slNo(e));
            setupSaveBtnClick(slNo(e));
            setupCancelBtnClick(slNo(e));
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

    const saveDataToStore = (value, vocabId) => {
        if (validate.textIsBlank(vocabId)) {
            manageState.vocab.updateVocab(value);
            sanckBar.showSnackBar('edit');
            return value;
        } else {

            let insertedId = manageState.vocab.getSemulatedLastInsetedId();
            Object.assign(value, { vocab_id: insertedId });
            manageState.vocab.saveVocab(value);

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
        el.dataset.vocabId = obj.vocab_id;
    }

    const replaceInputBoxInData = (obj, key) => {
        let trs = querys(TABLE_TRS_SELECTOR);
        let seletedTr = Object.entries(trs).filter(e => e[1].dataset.index == key)[0][1];
        setVocabIdtoSelectedElement(seletedTr, obj);
        seletedTr.innerHTML = dataFrm(obj, key);
    }

    const validateAndSaveInputBoxData = async (e) => {
        let trDataset = (heigherO.getProperPath(e => e))(e)[3].dataset;
        let intputBoxData = await validateData(trDataset.index)

        if (intputBoxData.valid === true) {
            let savedValue = saveDataToStore(intputBoxData.values, trDataset.vocabId);
            replaceInputBoxInData(savedValue, trDataset.index);
            return true;
        }
    }

    const setupSaveBtnClick = (btnId) => {
        query(`#btn${btnId}`).addEventListener('click', async (e) => {
            if (await validateAndSaveInputBoxData(e)) {
                setupEditBtnClick(btnId);
                setupDeleteBtnClick(btnId);
            }
        }, false)
    }

    const setupCancelBtnClick = (dataId) => {


        query(`#btnCancel${dataId}`).addEventListener('click', async (e) => {
            let trDataset = (heigherO.getProperPath(e => e))(e)[3].dataset;
            if (validate.textIsBlank(trDataset.vocabId)) {
                let obj = manageState.vocab.getVocab(trDataset.vocabId);
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
                            <p class="mb-1">You want to  delete <span class="text-danger"> ${delObj.context} : <b>${delObj.delName}</b></span>?</p>
                            <p class="mb-1">After delete data will lost for forever and can't be retrive.</p`,
            btnText: 'Yes Delete <i class="ion-trash-a"></i>',
            btnColor: 'delete',
        });
    }

    const attachClickOnDeletebtn = (element) => {
        element.addEventListener('click', async (e) => {
            if (await modalResponse(getVocabObj(e))) {
                manageState
                    .vocab
                    .deleteVocab(tr(e).dataset.vocabId);

                let afterDeleteExistingvocab = manageState
                    .vocab
                    .getVocabBySection(sectionId).length

                if (afterDeleteExistingvocab > 0) {
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
            vocab.
            getVocabBySection(sectionId).
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

    const hasVocabToShow = async () => {
        const e = await fetchVocabOfASection(sectionId);
        if (!e.length || e.length < 1) {
            removeTableAndShowNoData()
            return false;
        } else {
            return true;
        }
    }
    const hadelClickOfNoDataAddBtn = () => {
        const NO_DATA_ADD_BTN = `.pannel-body.no-data .nodata-action button`;
        const NO_DATA_ADD_BTN_EL = query(NO_DATA_ADD_BTN);
        if (NO_DATA_ADD_BTN_EL) {

            NO_DATA_ADD_BTN_EL.addEventListener('click', async (e) => {
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
        tr.setAttribute("data-vocab-id", '');
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
            sectionId = InpramObj.selected.section;
            isAction = InpramObj.isFinal;

            await TableFrm.init(pramObj, layout);

            if (await hasVocabToShow()) {
                await paint(frm(), pannelLayout);
                populateTableWithData();
            }

        },


    }
})();
