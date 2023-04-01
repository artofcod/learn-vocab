'use strict';

const heigherO = (() => {

    const selectPath = (element) => {

        if (element.path.length == element.composedPath().length) {
            return element.composedPath();
        } else {
            if (element.path !== undefined) {
                return element.path;
            } else {
                return element.composedPath();
            }

        }
    }

    return {
        selectPath: selectPath,
        getProperNode: func =>
            (...args) => {
                if (args[0].target) {
                    if (args[0].target.nodeName == "SPAN" ||
                        args[0].target.nodeName == "H5" ||
                        args[0].target.nodeName == "H6" ||
                        args[0].target.nodeName == "I" ||
                        args[0].target.nodeName == "TD") {
                        return func(args[0].target.parentNode);
                    }
                    return func(args[0].target);
                } else {
                    if (args[0].nodeName == "SPAN" ||
                        args[0].nodeName == "H5" ||
                        args[0].nodeName == "H6" ||
                        args[0].nodeName == "I") {
                        return func(args[0].parentNode);
                    }
                    return func(args[0]);
                }
            },

        getProperPath: func =>
            (...args) => {
                let el = args[0];
                if (args[0]) {
                    if (el.target.nodeName == "SPAN" ||
                        el.target.nodeName == "I") {

                        let arrayWithoutI = selectPath(el)
                            .slice(1, selectPath(el).length);
                        return func(arrayWithoutI);
                    }
                    return func(selectPath(el));
                }
            }
    }
})();