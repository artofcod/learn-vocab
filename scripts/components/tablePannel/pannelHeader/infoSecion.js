/**
 * Immidately invocable function or closure
 * @name HeaderInfo
 * @return {...} Returns an object which will be in the return statement.
 */

const HeaderInfo = (() => {

    //private scope

    let usePramObj;

    const home = `
                <a class="breadcrumb-item" 
                    title = "home"
                    data-book-id="">
                    <div>
                        <i class="ion-ios-home"></i>
                    </div>
                </a>
    `

    const bookFrm = (isCurrent) => `
                    <a class="breadcrumb-item ${isCurrent ? 'current' : ''}" 
                        title = "book"
                        data-book-id="${usePramObj.selected.book}">
                        <div>
                            <i class="ion-ios-book-outline"></i>
                            <span class="section-name">
                            ${reduceText(manageState.book.getBook(usePramObj.selected.book).b_name, 25)}
                            </span>
                        </div>
                    </a>
                `;

    const chapterFrm = (isCurrent) => `
                <a class="breadcrumb-item ${isCurrent ? 'current' : ''}" 
                    title = "chapter" 
                    data-chapter-id="${usePramObj.selected.chapter}">
                    <div>
                        <i class="ion-map"></i>
                        <span class="chapter-name">
                        ${reduceText(validate.textIsBlank(manageState.chapter.getChapter(usePramObj.selected.chapter).c_name) ?
        manageState.chapter.getChapter(usePramObj.selected.chapter).c_name :
        manageState.chapter.getChapter(usePramObj.selected.chapter).c_name_eng, 20)}
                        </span>
                    </div>
                </a>
            `;

    const sectionFrm = (isCurrent) => `
                <a class="breadcrumb-item ${isCurrent ? 'current' : ''}" title = "section">
                    <div>
                        <i class="ion-ios-list-outline"></i>
                        <span class="section-name">
                        ${reduceText(validate.textIsBlank(manageState.section.getSection(usePramObj.selected.section).s_name) ?
        manageState.section.getSection(usePramObj.selected.section).s_name :
        manageState.section.getSection(usePramObj.selected.section).s_name_eng, 20)}
                        </span>
                    </div>
                </a>
             `;

    const getProperIndicator = () => {
        //console.log(usePramObj, usePramObj.selected.section, manageState.section.getSection(usePramObj.selected.section));
        switch (usePramObj.selectionQeue[0]) {
            case TableFrm.TITLE_CHAPTER:
                return Object.freeze(home + bookFrm(true));

            case TableFrm.TITLE_SECTION:
                return Object.freeze(home + bookFrm() + chapterFrm(true));

            case TableFrm.TITLE_VOCAB:
                return Object.freeze(home + bookFrm() + chapterFrm() + sectionFrm(true));
        }
    }

    const generateProperHeading = () => {
        if (usePramObj.isFinal === false) {
            return `Select a ${usePramObj.selectionQeue[0]} to modify its ${usePramObj.titel} for`;
        } else {
            return `Add or Modify ${usePramObj.titel}s for`;
        }
    }

    const frm = () => {

        return Object.freeze(`
                <p class="m-0">
                    <span class="heading-indicator">
                        ${generateProperHeading()}
                    </span>
                </p>
                <nav class="breadcrumb p-0 m-0">
                      ${getProperIndicator()}                
                </nav>
            `);
    }

    const attachBreadcrumbClick = () => {
        const BREADCRUMB_SELECTOR = '.breadcrumb .breadcrumb-item';
        querys(BREADCRUMB_SELECTOR).forEach(element => {
            element.addEventListener('click', (e) => {

                let a = heigherO.selectPath(e).filter(e => e.nodeName == 'A')[0];
                let compairToLocate = a.getAttribute('title');
                let inWhichContext = query('#content-pannel').children[0].className;
                determineContext(inWhichContext, compairToLocate, usePramObj);
            }, false);
        });

    }


    const determineContext = (context, compairToLocate, innerPram) => {
        switch (context) {
            case 'chapter':
                return compairAndLocate(context, compairToLocate, innerPram);

            case 'section':
                return compairAndLocate(context, compairToLocate, innerPram);

            case 'vocabulary':
                return compairAndLocate(context, compairToLocate, innerPram);
        }
    }


    const getProperProcessQAndFinal = (context, compair) => {

        if (context == 'chapter') {
            // console.log("chapter context")
            switch (compair) {
                case 'book':
                    return {
                        qeue: [context],
                        final: true
                    }
            }
        }

        if (context == 'section') {
            // console.log("section context")
            switch (compair) {
                case 'chapter':
                    return {
                        qeue: [context],
                        final: true
                    }

                case 'book':
                    return {
                        qeue: ['chapter', context],
                        final: false
                    };
            }
        }

        if (context == 'vocabulary') {
            // console.log("vocab context")
            switch (compair) {
                case 'section':
                    return {
                        qeue: [context],
                        final: true
                    }

                case 'chapter':
                    return {
                        qeue: ['section', context],
                        final: false
                    };

                case 'book':
                    return {
                        qeue: ['chapter', 'section', context],
                        final: false
                    };
            }
        }


    }


    const compairAndLocate = (inWhichContext, compairToLocate, innerPram) => {

        let qeue = getProperProcessQAndFinal(inWhichContext, compairToLocate) ?
            getProperProcessQAndFinal(inWhichContext, compairToLocate).qeue : '';

        let isFinal = getProperProcessQAndFinal(inWhichContext, compairToLocate) ?
            getProperProcessQAndFinal(inWhichContext, compairToLocate).final : '';

        switch (compairToLocate) {
            case 'home':

                switch (inWhichContext) {
                    case 'chapter':
                        return locate('/manage-v/chapter/all');

                    case 'section':
                        return locate('/manage-v/section/all');

                    case 'vocabulary':
                        return locate('/manage-v/vocab/all');

                }

                break;

            case 'book':
                Object.assign(innerPram, {
                    selectionQeue: qeue,
                    selected: {
                        book: innerPram.selected.book,
                    },
                    isFinal: isFinal
                })

                return locate(
                    '/manage-v/select-table-data',
                    innerPram)

            case 'chapter':
                Object.assign(innerPram, {
                    selectionQeue: qeue,
                    selected: {
                        book: innerPram.selected.book,
                        chapter: innerPram.selected.chapter,
                    },
                    isFinal: isFinal
                })

                return locate(
                    '/manage-v/select-table-data',
                    innerPram);

            case 'section':
                console.warn(qeue, isFinal);
                Object.assign(innerPram, {
                    selectionQeue: qeue,
                    selected: {
                        book: innerPram.selected.book,
                        chapter: innerPram.selected.chapter,
                        section: innerPram.selected.section
                    },
                    isFinal: isFinal
                })

                return locate(
                    '/manage-v/select-table-data',
                    innerPram);

        }
    }


    return {

        //public scope
        determineContext: determineContext,

        init: async (layout, pramObj) => {
            usePramObj = pramObj;
            await paint(frm(pramObj), layout);
            attachBreadcrumbClick();
        },



    }
})();