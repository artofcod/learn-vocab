function ConstructChapterState() {
    let mainState = new MainState();
    let currentChapter;
    return {
        ...mainState,

        getCurrentRecord: () => {
            return currentChapter;
        },

        setCurrentRecord: (chapterId) => {
            currentChapter = mainState.getRecords().filter(e => e.chapter_id == chapterId)[0];
        }
    }
};

const ChapterState = new ConstructChapterState();