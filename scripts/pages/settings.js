const settingsFrm = (() => {
    const frm = `
            <div class="container-fluid settings" data-name="settings">
                <h1>Settings</h1>
            </div>
            `

    return {
        init: (pram, layout) => {
            paint(frm, layout ? layout : null);
        }
    }
})();