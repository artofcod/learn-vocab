function constructSelectTables() {
    const ROW_SELECOR = '.pannel-body tbody tr';

    const ROW_ELS = () => document.querySelectorAll(ROW_SELECOR);

    const handelRowSelect = (pramObj) => {
        ROW_ELS().forEach(element => {
            element.addEventListener('click', (e) => {

                let processingQeue = pramObj.selectionQeue;
                let select = processingQeue.shift();
                let pId = select + 'Id'
                let selectedId = (heigherO.getProperNode(e => e))(e).dataset[pId];
                pramObj.selected[select] = selectedId;


                if (processingQeue.length > 1) {
                    pramObj.isFinal = false;
                    pramObj = Object.fromEntries(Object.entries(pramObj).filter(e => {
                        return e[0] != 'next'
                    }))

                    locate(
                        '/manage-v/select-table-data',
                        pramObj
                    );

                } else {
                    pramObj.isFinal = true;
                    locate(
                        pramObj.finalUrl,
                        pramObj

                    )
                }

            }, false)
        })
    }

    return {
        handelRowSelect: (pramObj) => handelRowSelect(pramObj),
    }
}

const selectTables = new constructSelectTables();