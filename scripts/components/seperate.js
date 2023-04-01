'use strict';


/**
 * Immidately invocable function or closure
 * @name InputBoxManupulation
 * @return {...} Returns an object which will be in the return statement.
 */

const InputBoxManupulation = (() => {

    //private scope
    const EDIT_BTN_CLASS = 'table .edit';
    const SAVE_BTN_CLASS = 'table button.save';
    const TABLE_BODY_CLASS = 'table tbody';
    const DELETE_BTN_CLASS = 'table .delete';

    // HOLDING INCOMING CALLBACK FUNCTIONS DURING INIT. FOR LETER USE
    let replaceCurrentRowWithInputBox,
        replaceCurrentInputBoxesWithIncomingGeneratedRow,
        getSpecificObj,
        inputBoxData;

    const setupEditBtnClick = () => {
        querys(EDIT_BTN_CLASS)
            .forEach(element => {
                element.addEventListener('click', (e) => {
                    replaceCurrentRowWithInputBox(e);
                    setupSaveBtnClick(e);
                }, false)
            })
    }

    const afterSetupOfSave = async (e) => {
        await replaceInputBoxInData(e);
        setupEditBtnClick();
        setupDeleteBtnClick();
        console.log('end');
    }

    const setupSaveBtnClick = (e) => {
        const btnId = (heigherO.getProperPath(e => e))(e)[2].dataset.index;
        query(`#btn${btnId}`).addEventListener('click', async (e) => {
            sanckBar.showSnackBar('edit');
            afterSetupOfSave(e);
        }, false)

    }

    const replaceInputBoxInData = async (e) => {
        const tr = (heigherO.getProperPath(e => e))(e)[5];
        let intputBoxData = await inputBoxData(e)
        console.log(intputBoxData.valid === true);
        if (intputBoxData.valid === true) {

            tr.innerHTML = await replaceCurrentInputBoxesWithIncomingGeneratedRow(e);
        } else {
            replaceCurrentRowWithInputBox(e);
            setupSaveBtnClick(e);
        }

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

    const setupDeleteBtnClick = () => {
        querys(DELETE_BTN_CLASS).forEach(element => {
            element.addEventListener('click', async (e) => {
                let delInfoObj = getSpecificObj(e);
                if (await modalResponse(delInfoObj)) {
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

    const holdCallbacks = (incomigCallbacks) => {
        [
            replaceCurrentRowWithInputBox,
            replaceCurrentInputBoxesWithIncomingGeneratedRow,
            getSpecificObj,
            inputBoxData
        ] = incomigCallbacks;
        return validateIcomingCallbacks(incomigCallbacks);
    }

    const validateIcomingCallbacks = (incomigCallbacks) => {

        const getName = (field) => {
            return validate.textIsBlank(field) ? field.name : field
        }


        const getStatus = (field) => {
            return (typeof field == 'function') ? "ok" : "probleam"
        }

        return new Promise((resolve, reject) => {
            if (
                (
                    typeof incomigCallbacks[0] !== 'function' ||
                    typeof incomigCallbacks[1] !== 'function' ||
                    typeof incomigCallbacks[2] !== 'function'
                )) {
                reject(`

                Expected : ${getName(incomigCallbacks[0])} =>  function
                Got : ${getName(incomigCallbacks[0])} => ${typeof incomigCallbacks[0]}
                status : ${getStatus(incomigCallbacks[0])}
                ---------------------------------------------------------
                Expected : ${getName(incomigCallbacks[1])} =>  function 
                Got : ${getName(incomigCallbacks[1])} => ${typeof incomigCallbacks[1]} 
                status : ${getStatus(incomigCallbacks[1])}
                ---------------------------------------------------------
                Expected : ${getName(incomigCallbacks[2])} =>  function 
                Got : ${getName(incomigCallbacks[2])} => ${typeof incomigCallbacks[2]} 
                status : ${getStatus(incomigCallbacks[2])}

                      `)
            } else {
                resolve(true);
            }

        })
    }


    return {

        //public scope

        init: (incomigCallbacks) => {

            try {
                holdCallbacks(incomigCallbacks)
                setupEditBtnClick();
                setupDeleteBtnClick();
            } catch (error) {
                console.trace(error);
            }

        },


    }
})();


