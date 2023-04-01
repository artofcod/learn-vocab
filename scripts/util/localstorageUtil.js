'use strict';

/**
 * Get value from local sotrage if localstorage has some.
 * @param id ['book','chapter','section']  should provide this specific values as string to get
 * proper reasult other wise it will throw error.
 * @returns lastPracticed id based on the id provided in prams.
 */
const lastPractice = (selectedId) => {
    switch (selectedId) {
        case 'book':
            return getPractice("book_id");

        case 'chapter':
            return getPractice("chapter_id");

        case 'section':
            return getPractice("section_id");

        default:
            console.error(`you have provide wrong identifire\n
             rquired list : ['book','chapter','section']
             you provide : ${selectedId}`);
            break;
    }
}

const getPractice = (requiredId) => {
    return (localStorage.getItem('lastPractice') ?
        JSON.parse(localStorage.getItem('lastPractice'))[requiredId]
        : 1)
}