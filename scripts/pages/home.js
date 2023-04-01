const homeFrm = (() => {

    const frm = () => {
        return Object.freeze(`
            <div class="container-fluid home" data-name="home">
                <h1>Home</h1>
            </div>
            `)
    }

    return {
        init: () => paint(frm())
    }

})();