/**
 * Immidately invocable function or closure
 * @name TableHead
 * @return {...} Returns an object which will be in the return statement.
 */

const TableHead = (() => {

    //private scope

    const frm = (pramObj) => {
        let titel = pramObj.select ? pramObj.select : pramObj.titel;
        let isAction = pramObj.isFinal;
        switch (titel) {
            case TableFrm.TITLE_CHAPTER:
                return Object.freeze(`
                    <tr>
                        <th>Sl.no</th>
                        <th>chapter name normal</th>
                        <th>chapter name english</th>
                        <th>description</th>
                        ${isAction ? `<th>action</th>` : ''}
                    </tr>
                `);

            case TableFrm.TITLE_SECTION:
                return Object.freeze(`
                    <tr>
                        <th>Sl.no</th>
                        <th>section name normal</th>
                        <th>section name english</th>
                        <th>description</th>
                       ${isAction ? `<th>action</th>` : ''}
                    </tr>
                `);

            case TableFrm.TITLE_VOCAB:
                return Object.freeze(`
                    <tr>
                        <th>Sl.no</th>
                        <th>Defination</th>
                        <th>Vocabulary</th>
                        ${isAction ? `<th>action</th>` : ''}
                    </tr>
                `);
        }
    }

    return {

        //public scope

        init: (layout, pramObj) => {
            paint(frm(pramObj), layout)
        },


    }
})();