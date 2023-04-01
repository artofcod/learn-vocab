/**
 * Immidately invocable function or closure
 * @name ManageSidebar
 * @return {...} Returns an object which will be in the return statement.
 */

const ManageSidebar = (() => {

    //private scope

    const manageHtmlFrame = (id, itemName, rObject) => {
        return Object.freeze(`
                <li class="acc-item manage-acc-item"
                    data-item-id="${id}" 
                    data-path =${rObject.link}>
                    <i class=${rObject.icon}></i>
                    <span class="nav-name">
                    ${itemName}
                    </span>
                </li>
            `);
    }

    const MANAGE_ACCORDIAN_CONTAINER_CLASS = '.manage-container ol.accordian';
    const MANAGE_ACCORDIAN_ITEM_CLASS = '.manage-acc-item'

    const MANAGE_ACCORDIAN_CONTAINER_EL = () => document.querySelector(MANAGE_ACCORDIAN_CONTAINER_CLASS);
    const MANAGE_ACCORDIAN_ITEM_ELS = () => document.querySelectorAll(MANAGE_ACCORDIAN_ITEM_CLASS);

    const nav = Object.freeze([
        {
            name: "book",
            icon: "",
            child: Object.freeze([
                {
                    name: "All",
                    icon: "ion-social-buffer-outline",
                    link: "/manage-v/books/all"
                },
                {
                    name: "create",
                    icon: "ion-plus-round",
                    link: "/manage-v/books/create"
                },
            ])
        },
        {
            name: "chpater",
            icon: "",
            child: Object.freeze([
                {
                    name: "All",
                    icon: "ion-social-buffer-outline",
                    link: "/manage-v/chapter/all"
                }
            ])
        },
        {
            name: "section",
            icon: "",
            child: Object.freeze([
                {
                    name: "All",
                    icon: "ion-social-buffer-outline",
                    link: "/manage-v/section/all"
                },
            ])
        },
        {
            name: "vocabulary",
            icon: "",
            child: Object.freeze([
                {
                    name: "All",
                    icon: "ion-social-buffer-outline",
                    link: "/manage-v/vocab/all"
                },
            ])
        }
    ])


    const properFormating = () => {
        let simplifiedRoute = [];
        let index = 1
        nav.map(e => {
            e.child.map(f => {
                simplifiedRoute.push({ ...f, id: e.name, itemId: index });
                index++;
            })
        })
        return simplifiedRoute;
    }

    let formatted = false;
    let formattedValue;
    const formattedRout = () => {
        if (!formatted) {
            formattedValue = properFormating();
            formatted = true;
            return formattedValue;
        } else {
            return formattedValue;
        }
    }

    const setupAccordian = () => {
        accordianAction.populatingAccToggleHandler(nav, MANAGE_ACCORDIAN_CONTAINER_EL());
        accordianAction.populateAccordianItems(
            formattedRout(),
            // accordian needs just function body not the executed reasult hence passing
            // just body without adding pranthisis after the manageHtmlFrame.
            // in that way manageHtmlFrame acts as a vearible and holds just the function
            // body not the executed reasult.
            manageHtmlFrame
        );
        accordianAction.setActiveAccBody();
        accordianAction.setActiveAccToggle();
        accordianAction.setActiveAccItem();
    }

    const attachClickOnManageAccItems = () => {
        MANAGE_ACCORDIAN_ITEM_ELS().forEach(element => {
            element.addEventListener('click', (e) => {
                let findProperNode = heigherO.getProperNode(e => e.dataset.path)
                locate(findProperNode(e));
            }, false)
        })
    }

    return {

        //public scope

        init: () => {
            return paint(sidebar.frm(), ".manage-container #left-sidebar").then(
                e => {
                    setupAccordian();
                    attachClickOnManageAccItems();
                }
            );
        },

    }
})();