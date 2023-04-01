const headerFrm = (() => {
    return {
        frm: () => {
            return Object.freeze(`
                <header id="header-nav">
                    <nav class="nav nav-fill">
                        <a class="nav-item nav-link" data-path="/" href="#">Home</a>
                        <a class="nav-item nav-link active-nav-link" data-path="/practice-v" href="#">Practice vocab</a>
                        <a class="nav-item nav-link" data-path="/manage-v" href="#">Manage vocab</a>
                        <a class="nav-item nav-link" data-path="/settings" href="#">Settings</a>
                    </nav>
                </header>`);
        }
    }
})();