const PracticBookList = (() => {
    let titel = 'Available vocabulary books to pracice';
    return {
        init: (layout) => {
            paint(BookList.frm(titel), layout)
                .then(e => RepeatingBook.setupBooks())
        },
    }
})();
