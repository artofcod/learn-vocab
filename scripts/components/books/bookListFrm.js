/**
 * Immidately invocable function or closure
 * @name BookList
 * @return {...} Returns an object which will be in the return statement.
 */

const BookList = (() => {

    //private scope

    return {

        //public scope

        frm: (titel, searchAble = false, className) => {
            return Object.freeze(`
            ${className !== undefined ? `<div class="${className}">` : ''}
                <div class="lead text-center titel">
                    <h1 class="p${searchAble ? 'b' : 'y'}-4">
                        <span>${titel}</span>
                    </h1>
                    ${searchAble ?
                    `<div class="search pb-4 w-75 mx-auto">
                        <div class="form-group has-success">
                            <lable class="form-control-label sr-only">search</lable>
                            <input type="text" class="form-control" id="searchBook" placeholder="search for...">
                        </div>
                    </div>`
                    : ''}
                    <!-- .search end -->
                </div>
                <!-- .lead end -->
                <div class="row justify-content-center books-wraper">
                    
                </div > 
            ${className !== undefined ? '</div>' : ''}
            `)
        },


    }
})();