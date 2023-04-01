/**
 * Immidately invocable function or closure
 * @name TableRowInputs
 * @return {...} Returns an object which will be in the return statement.
 */

const TableRowInputs = (() => {

    //private scope

    const creationFrmTableInputs = (titel, recordObj) => {

        let index = recordObj.chapter_id ? recordObj.chapter_id : recordObj.section_id;
        let name = recordObj.chapter_id ? recordObj.c_name : recordObj.s_name
        let engName = recordObj.chapter_id ? recordObj.c_name_eng : recordObj.s_name_eng
        let description = recordObj.chapter_id ? recordObj.c_description : recordObj.s_description

        let chpaterSectionIputes = `
                    <td>${index}</td>
                    <td colspan=4>
                        <div class="row">
                            <div class="col-6">
                                <div class="form-group mb-4">
                                    <label for="" class="form-input-label sr-only">${titel}
                                        name</label>
                                    <div class="">
                                        <input type="text"
                                            class="form-control form-control-sm is-invalid"
                                            placeholder="Book name" id="${titel}-name-${index}" value="${name}">
                                    </div>
                                    <span class=" col-12 general-error show"> A name is
                                        required</span>
                                </div>
                            </div>
                            <div class="col-6">
                                <div class="form-group mb-4">
                                    <label for="" class="form-input-label sr-only">${titel}
                                         English Name</label>
                                    <div class="">
                                        <input type="text"
                                            class="form-control form-control-sm is-invalid"
                                            placeholder="Book name" id="${titel}-eng-name-${index}" value="${engName}">
                                    </div>
                                    <span class=" col-12 general-error show"> A name is
                                        required</span>
                                </div>
                            </div>
                            <div class="col-9">
                                <div class="form-group mb-1">
                                    <label for=""
                                        class="form-input-label text-right sr-only">${titel} Description</label>
                                    <textarea class="form-control form-control-sm"
                                        name="description" id="${titel}-description-${index}"
                                        placeholder="Description name" rows="2">${description}</textarea>
                                </div>
                            </div>
                            <div class="col-3">
                                <div class="form-group text-center mx-auto">
                                    <button class="btn btn-success save px-4 py-1 ">
                                        <span>Save Chapter</span>
                                        <i class="ion-compose"></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </td>
            `;

        let vocabInputs = `
                        <td>${recordObj.vocab_id}</td>
                        <td>
                            <div class="form-group mb-1">
                                <label for=""
                                    class="form-input-label text-right sr-only">Defination</label>
                                <textarea class="form-control form-control-sm"
                                    name="defination" id="defination" placeholder="Defination"
                                    rows="2">${recordObj.defination}</textarea>
                                <span class=" col-12 general-error show-gerr"> A name is required</span>
                            </div>
                        </td>
                        <td>
                            <div class="form-group mb-1">
                                <label for=""
                                    class="form-input-label text-right sr-only">vocabulary</label>
                                <textarea class="form-control form-control-sm is-invalid"
                                    name="vocabulary" id="vocabulary" placeholder="Vocabulary"
                                    rows="2">${recordObj.vocabulary}</textarea>
                                <span class=" col-12 general-error show-gerr"> A name is required</span>
                            </div>
                        </td>
                        <td>
                            <div class="form-group text-center m-0">
                                <button class="btn btn-success save px-4 py-1">
                                    <span>Save</span>
                                    <i class="ion-compose"></i>
                                </button>
                            </div>
                        </td>
            `
        switch (titel) {
            case TableFrm.TITLE_CHAPTER:
                return Object.freeze(chpaterSectionIputes);

            case TableFrm.TITLE_SECTION:
                return Object.freeze(chpaterSectionIputes);

            case TableFrm.TITLE_VOCAB:
                return Object.freeze(vocabInputs);
        }
    }

    const TABLE_BODY_CLASS = 'table tbody';
    const EDIT_BTN_CLASS = 'table .edit';
    const DELETE_BTN_CLASS = 'table .delete';
    const SAVE_BTN_CLASS = 'table button.save';

    const TABLE_BODY_EL = () => document.querySelector(TABLE_BODY_CLASS);
    const EDIT_BTN_ELS = () => document.querySelectorAll(EDIT_BTN_CLASS);
    const DELETE_BTN_ELS = () => document.querySelectorAll(DELETE_BTN_CLASS);
    const SAVE_BTN_ELS = () => document.querySelectorAll(SAVE_BTN_CLASS);



    const setupEditBtnClick = (titel) => {
        EDIT_BTN_ELS().forEach(element => {
            element.addEventListener('click', handel = (e) => {
                let tr = (heigherO.getProperPath(e => e))(e)[2];

                let recordObj = getProperObject(titel, tr);
                assignInputBoxInCurrentTableRow(titel, recordObj, tr);
                setupSaveBtnClick(titel);
            }, false)
        })
    }


    const getProperObject = (titel, tr) => {
        switch (titel.trim()) {
            case 'chapter':
                return {
                    chapter_id: tr.children[0].innerText,
                    c_name: tr.children[1].innerText,
                    c_name_eng: tr.children[2].innerText,
                    c_description: tr.children[3].innerText
                }

            case 'section':
                return {
                    section_id: tr.children[0].innerText,
                    s_name: tr.children[1].innerText,
                    s_name_eng: tr.children[2].innerText,
                    s_description: tr.children[3].innerText
                }

            case 'vocabulary':
                return {
                    vocab_id: tr.children[0].innerText,
                    defination: tr.children[1].innerText,
                    vocabulary: tr.children[2].innerText,
                }
        }
    }


    const assignInputBoxInCurrentTableRow = (titel, recordObj, tr) => {
        tr.innerHTML = creationFrmTableInputs(titel, recordObj);
    }

    const getProperRecordObject = (titel, tr, index) => {
        switch (titel.trim()) {
            case 'chapter':
                return {
                    chapter_id: tr.children[0].innerText,
                    c_name: document.querySelector(`#${titel}-name-${index}`).value,
                    c_name_eng: document.querySelector(`#${titel}-eng-name-${index}`).value,
                    c_description: document.querySelector(`#${titel}-description-${index}`).value
                }


            case 'section':
                return {
                    section_id: tr.children[0].innerText,
                    s_name: tr.children[1].querySelector(`#${titel}-name-${index}`).value,
                    s_name_eng: tr.children[1].querySelector(`#${titel}-eng-name-${index}`).value,
                    s_description: tr.children[1].querySelector(`#${titel}-description-${index}`).value
                }

            case 'vocabulary':
                return {
                    vocab_id: tr.children[0].innerText,
                    defination: tr.children[1].querySelector('#defination').value,
                    vocabulary: tr.children[2].querySelector('#vocabulary').value,
                }
        }
    }


    const setupSaveBtnClick = (titel) => {
        SAVE_BTN_ELS().forEach(element => {
            element.addEventListener('click', (e) => {
                let tr = getRow(e, titel);
                let index = tr.children[0].innerText;
                let recordObj = getProperRecordObject(titel, tr, index);
                let rowPosition = getRowPos(index);
                replaceInputBoxInData(titel, index, rowPosition, recordObj);
                sanckBar.showSnackBar('edit');
                setupEditBtnClick(titel);
                setupDeleteBtnClick(titel);
            }, false)
        })
    }


    const getRow = (e, titel) => {
        let pathPos = (titel == 'vocabulary') ? 3 : 5
        return (heigherO.getProperPath(e => e))(e)[pathPos];
    }


    const getRowPos = (index) => {
        let trs = TABLE_BODY_EL().children;
        for (const key in trs) {
            if (Object.hasOwnProperty.call(trs, key)
                && trs[key].children[0].innerText == index) {
                return key;
            }
        }
    }


    const replaceInputBoxInData = (titel, index, rowPos, recordObj) => {

        let clickedChild = TableBody.tableBody(titel, true, recordObj);
        let childBefore = splitObject(TABLE_BODY_EL().children, 0, (parseInt(rowPos)));
        let childAfter = splitObject(
            TABLE_BODY_EL().children, (parseInt(rowPos) + 1),
            parseInt(TABLE_BODY_EL().children.length))
        let fullObj = [...childBefore, clickedChild, ...childAfter];
        let fullObjStr = '';
        for (const iterator of fullObj) {
            fullObjStr += iterator;
        }
        TABLE_BODY_EL().innerHTML = fullObjStr;

    }


    const splitObject = (obj, start, end) => {
        let splittedObj = [];
        for (const key in obj) {
            if (Object.hasOwnProperty.call(obj, key)) {
                if (key >= start && key <= end - 1) {
                    splittedObj.push(obj[key].outerHTML);
                }
            }
        }
        return splittedObj;
    }


    const setupDeleteBtnClick = (titel) => {
        DELETE_BTN_ELS().forEach(element => {
            element.addEventListener('click', handel = async (e) => {

                let contentObj = {
                    message: `<h4 class="mb-3">Aer you shure?</h4>
                            <p class="mb-1">you want to <b class="text-danger">Delete</b>?</p>
                            <p class="mb-1">After delete data will lost for forever and can't be retrive.</p`,
                    btnText: 'Yes Delete',
                    btnColor: 'delete',
                }
                let modalResponse = SimpleModal.openModal(contentObj);
                if (await modalResponse) {
                    deleteRecord(e);
                    sanckBar.showSnackBar('delete');
                }
            }, false)
        })
    }

    const deleteRecord = (e) => {
        let path = (heigherO.getProperPath(e => e))(e);
        let tr = path[2];
        let tbody = path[3];
        tbody.removeChild(tr);
    }

    return {

        //public scope

        TABLE_BODY_EL: TABLE_BODY_EL,

        setupSaveBtnClick: setupSaveBtnClick,

        creationFrmTableInputs: creationFrmTableInputs,

        init: (pramObj) => {
            setupEditBtnClick(pramObj.titel);
            setupDeleteBtnClick(pramObj.titel);
        },

    }
})();