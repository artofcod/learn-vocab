/**
 * Immidately invocable function or closure
 * @name TableBody
 * @return {...} Returns an object which will be in the return statement.
 */

const TableBody = (() => {

    //private scope 
    const ROW_SELECOR = '.pannel-body tbody tr';

    const ROW_ELS = () => document.querySelectorAll(ROW_SELECOR);

    const handelRowSelect = (pramObj) => {
        console.log(pramObj);
        ROW_ELS().forEach(element => {
            element.addEventListener('click', (e) => {
                let slNo = (heigherO.getProperNode(e => e))(e).children[0].innerText;
                if (pramObj.next) {
                    locate(
                        '/manage-v/select-table-data',
                        {
                            titel: pramObj.titel,
                            select: pramObj.next,

                            finalUrl: pramObj.finalUrl,
                            isFinal: false
                        }
                    );
                } else if (pramObj.finalUrl !== undefined) {
                    locate(pramObj.finalUrl,
                        {
                            titel: pramObj.titel,
                            select: pramObj.titel,

                            isFinal: true
                        }
                    )
                }

            }, false)
        })
    }

    const generateDummy = (pramObj, howmany) => {
        let rows = '';
        let whichRow = pramObj.select ? pramObj.select : pramObj.titel;
        let isAction = pramObj.select ? false : true;
        for (let index = 1; index < howmany + 1; index++) {
            rows += TableBody.tableBody(whichRow, index, isAction);
        }
        return rows;
    }

    const genereteUsingObj = (pramObj) => {
        let whichRow = pramObj.select ? pramObj.select : pramObj.titel;
        let row = '';
        pramObj.selectdObj.map(e => {

            row += TableBody.tableBody(whichRow, pramObj.isFinal, e);

        })
        return row;
    }

    const generateDummyRows = (pramObj, howmany) => {
        if (pramObj.selectdObj) {
            return genereteUsingObj(pramObj);
        } else {
            return generateDummy(pramObj, howmany)
        }

    }

    return {

        //public scope
        handelRowSelect: (pramObj) => handelRowSelect(pramObj),
        init: (layout, pramObj) => {
            paint(generateDummyRows(pramObj, 20), layout).then(e => {
                if (!pramObj.isFinal) {
                    handelRowSelect(pramObj);
                }
            })
        },

        tableBody: (titel, isAction, obj,) => {
            switch (titel) {
                case TableFrm.TITLE_CHAPTER:
                    return Object.freeze(`
                    <tr >
                        <td>${obj.chapter_id}</td>
                        <td>${obj.c_name}</td>
                        <td>${obj.c_name_eng}</td>
                        <td>${obj.c_description}</td>
                        ${isAction ?
                            `<td>
                                <div class="nice-icon edit mr-2">
                                    <i class="ion-edit"></i>
                                </div>
                                <div class="nice-icon delete">
                                    <i class="ion-android-delete"></i>
                                </div>
                            </td>`
                            : ''}
                        
                    </tr>
                    <!-- end of tr -->
                `);

                case TableFrm.TITLE_SECTION:
                    return Object.freeze(`
                    <tr>
                        <td>${obj.section_id}</td>
                        <td>${obj.s_name}</td>
                        <td>${obj.s_name_eng}</td>
                        <td>${obj.s_description}</td>
                        ${isAction ?
                            `<td>
                                <div class="nice-icon edit mr-2">
                                    <i class="ion-edit"></i>
                                </div>
                                <div class="nice-icon delete">
                                    <i class="ion-android-delete"></i>
                                </div>
                            </td>`
                            : ''}
                    </tr>
                    <!-- end of tr -->
                `);

                case TableFrm.TITLE_VOCAB:
                    return Object.freeze(`
                    <tr>
                        <td>${obj.vocab_id}</td>
                        <td>${obj.defination}</td>
                        <td>${obj.vocabulary}</td>
                        ${isAction ?
                            `<td>
                                <div class="nice-icon edit mr-2">
                                    <i class="ion-edit"></i>
                                </div>
                                <div class="nice-icon delete">
                                    <i class="ion-android-delete"></i>
                                </div>
                            </td>`
                            : ''}
                    </tr>
                    <!-- end of tr -->
                `);
            }
        },


    }
})();