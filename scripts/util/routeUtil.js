'use strict';

let simplifiedRoute = () => {
    return new Promise(resolve => {
        let parent = [];
        let childSize;
        let baseLayout;

        const findRouteInRouter = (routes) => {
            return routes.map((e) => {
                if (e.routes) {

                    childSize = e.routes.length;
                    baseLayout = e.layout;
                    parent.push({ path: e.path, template: e.template });
                    findRouteInRouter(e.routes);

                } else {

                    if (childSize !== undefined && childSize !== 0) {
                        parent.push({ path: e.path, layout: baseLayout, template: e.template });
                        childSize--;
                    } else {
                        parent.push({ path: e.path, template: e.template });
                    }
                }
            });
        }
        findRouteInRouter(routes);
        resolve(parent);
    })
}

let generatedRoute;
let isGenerated = false;
const generatedOnce = () => {
    if (!isGenerated) {
        isGenerated = true;
        generatedRoute = Object.freeze(simplifiedRoute());
    }
    return generatedRoute;
}

/**
 *    
 * @param {String} path takes a path string which is presente in route
 * @returns object for the path
 */
let findRoute = (path) => {
    return new Promise(resolve => {
        resolve(generatedOnce().then(e => e.filter(e => e.path === path)[0]));
    })
}

/**
 * 
 * @param {HTML} frm static or generated html fro renderd into the dom
 * @param {selctor} layout a selector wher the passed html should render
 * @returns {Promise<boolean>} determie render compleate.
 */
const paint = (frm, layout) => new Promise(resolve => {
    if (!!document.querySelector('main')) {
        resolve(paintLayoutAndChilds(frm, layout));
    } else {
        document.querySelector('.app').innerHTML = siteLayout.bundil(frm);
        resolve(true);
    }
})

/**
 * 
 * @param {HTML} frm 
 * @param {css selector} layout  selector wher the passed html will render
 * @returns  rendered version of html
 */
const paintLayoutAndChilds = (frm, layout) => {
    if (layout) {
        document.querySelector('main ' + layout).innerHTML = frm;
        return true
    } else {
        document.querySelector('main').innerHTML = frm;
        return true
    }
}

/**
 * 
 * @param {string} path 
 * @param {any} parm 
 * @returns {Promise<boolean>} rendering of html as a promise
 */
const locate = (path, parm) => new Promise(resolve => {
    PracticePain.clearSavingLastPractice();

    findRoute(path).then(e => {
        try {
            e.template.init(parm, e.layout);
            resolve(true);
        } catch (error) {
            console.error(error);
            console.trace(path + " can't found inside the route Object")

        }
    });
});

