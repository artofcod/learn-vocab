/**
 * Closure function act as a class and can be inheritable.
 * @name MainState
 * @return {...} Returns an object which will be in the return statement.
 */

function MainState() {

    //private scope
    let mainStore = [];
    let RecordSFetched = false;
    return {

        //public scope


        setRecords: (records) => {
            mainStore = records;
            RecordSFetched = true
        },

        setChunckRecords: (records) => {
            mainStore = [...mainStore, ...records];
        },

        setRecord: (record) => {
            mainStore = [...mainStore, record];
        },

        updateRecords: (records) => {
            console.log(records);
            mainStore = records;

        },

        getRecords: () => {
            return mainStore;
        },

        isRecordSFetched: () => RecordSFetched

    }
};