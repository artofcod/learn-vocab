const sidebar = (() => {
    return {
        frm: () => {
            return Object.freeze(`
            
                <h6 class="mb-3 p-2">Nevigation Title</h6>

                <ol class="ml-4 mb-0 list-unstyled accordian">
                    <div class="accordian-dropdown">
                        <li class="acc-toggle active-acc-toggle">
                            <span>Chapters</span>
                        </li>
                        <ul class="acc-body active-acc-body">
                            <li class="acc-item">
                                <span>section 1</span>
                            </li>

                            <li class="acc-item active-acc-item">
                                <span>section 2</span>
                            </li>

                            <li class="acc-item">
                                <span>section 3</span>
                            </li>
                        </ul>
                    </div>
                    <!-- end accoredian dropdown -->
                </ol>
            
            `)
        }
    }
})();