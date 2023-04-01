/**
 * Immidately invocable function or closure
 * @name selectSpecific
 * @return {...} Returns an object which will be in the return statement.
 */

const selectSpecific = (() => {

    //private scope

    return {

        //public scope

        init: (pramObj, layout) => {

            if (pramObj.selectionQeue[0] === 'chapter') {

                ChpaterTable.init(pramObj, layout)

            }

            if (pramObj.selectionQeue[0] === 'section') {

                SectionTable.init(pramObj, layout)

            }

            if (pramObj.selectionQeue[0] === 'vocabulary') {

                VocabTable.init(pramObj, layout)

            }


        }

    }
})();