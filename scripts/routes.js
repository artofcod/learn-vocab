
const routes = Object.freeze([
    {
        path: '/',
        template: homeFrm,
    },
    {
        path: '/practice-v',
        template: Practice,
        layout: "practice",
        routes: Object.freeze([
            {
                path: '/practice-v/practice',
                template: Practice
            }
        ])
    },
    {
        path: '/manage-v',
        template: mananageVFrm,
        layout: "manage",
        routes: Object.freeze([
            {
                path: '/manage-v/books/all',
                template: allBookFrm,
            },
            {
                path: '/manage-v/books/create',
                template: createBook,
            },
            {
                path: '/manage-v/books/edit',
                template: createBook,
            },
            {
                path: '/manage-v/chapter/all',
                template: bookListForChapter,
            },
            {
                path: '/manage-v/chapter/create',
                template: createChapter,
            },
            {
                path: '/manage-v/chapter/table',
                template: ChpaterTable,
            },
            {
                path: '/manage-v/chapter/edit',
                template: mananageVFrm,
            },
            {
                path: '/manage-v/section/all',
                template: bookListForSection,
            },
            {
                path: '/manage-v/section/create',
                template: createSection,
            },
            {
                path: '/manage-v/section/table',
                template: SectionTable,
            },
            {
                path: '/manage-v/section/edit',
                template: mananageVFrm,
            },
            {
                path: '/manage-v/vocab/all',
                template: bookListForVocab,
            },
            {
                path: '/manage-v/vocab/create',
                template: createVocab,
            },
            {
                path: '/manage-v/vocab/table',
                template: VocabTable,
            },
            {
                path: '/manage-v/vocab/edit',
                template: mananageVFrm,
            },
            {
                path: '/manage-v/select-table-data',
                template: selectSpecific,
            },
        ]),
    },
    {
        path: '/settings',
        template: settingsFrm
    },
    {
        path: '/test',
        template: homeFrm,
        layout: "manage",
        routes: Object.freeze([
            {
                path: '/test/all-books',
                template: homeFrm,
            },
            {
                path: '/test/add-book',
                template: homeFrm,
            },
            {
                path: '/test/edit-book',
                template: homeFrm,
            },
        ]),
    },
])


