function ConstructSectionState() {
    let currentActiveSection;
    let mainState = new MainState()
    let sectionStore = mainState.getRecords();
    return {

        ...mainState,

        setRecords: (sections) => {
            let chapterId = sections[0].chapter_id;
            if (sectionStore.length == 0) {
                sectionStore = sections;
            } else if (!sectionStore.some(e => e.chapter_id == chapterId)) {
                sectionStore = sectionStore.concat(sections);
            }
        },

        setCurrentActiveSection: (sectionId) => {
            currentActiveSection = sectionStore[sectionStore.findIndex((e) => e.section_id == sectionId)];
        },

        isSectionPresent: (chapterId) => {
            let hasSection = sectionStore.some(e => e.chapter_id == chapterId);
            if (hasSection) {
                return sectionStore.filter(e => e.chapter_id == chapterId);
            } else {
                return hasSection;
            }
        },

        getCurrentSection: () => {
            return currentActiveSection;
        }
    }
}

const SectionState = new ConstructSectionState();