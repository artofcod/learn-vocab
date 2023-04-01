const accordianAction = (() => {
    const ACC_DROPDOWN_CLASS = 'accordian-dropdown';
    const ACC_TOGGLE_CLASS = 'acc-toggle';
    const ACC_BODY_CLASS = 'acc-body';
    const ACC_ITEM_CLASS = 'acc-item';
    const ACC_ACTIVE_ITEM_CLASS = 'active-acc-item';
    const ACC_ACTIVE_BODY_CLASS = 'active-acc-body';
    const ACC_ACTIVE_TOGGLE_CLASS = 'active-acc-toggle';
    const ACC_PERTIAL_ACTIVE_BODY_CLASS = 'pertial-active-acc-body';
    const ACC_PERTIAL_ACTIVE_TOGGLE_CLASS = 'pertial-active-acc-toggle';

    const ACC_TOGGLE_ELS = () => document.querySelectorAll('.' + ACC_TOGGLE_CLASS);
    const ACC_BODY_ELS = () => document.querySelectorAll('.' + ACC_BODY_CLASS);
    const ACC_ITEM_ELS = () => document.querySelectorAll('.' + ACC_ITEM_CLASS);

    const clearingExistingUnwantedNodes = (accDomNode) => {
        if (accDomNode) {
            accDomNode.removeChild(accDomNode.children[0]);
        } else {
            console.log("no node provided");
        }
    }

    let globalBody, globalToggle;

    const setPertialBody = (pertial, body) => {
        reomvePartialActiveBody();
        ACC_BODY_ELS().forEach(element => {
            if (body == element.dataset.id) {
                pertial ?
                    element.classList.add(ACC_PERTIAL_ACTIVE_BODY_CLASS) :
                    element.classList.add(ACC_ACTIVE_BODY_CLASS);
            } else if (body == undefined) {
                ACC_BODY_ELS()[0].classList.add(ACC_ACTIVE_BODY_CLASS);
            }
        })
    }

    const setPertialToggle = (pertial, toggle) => {
        reomvePartialActiveToggle();

        ACC_TOGGLE_ELS().forEach(element => {
            if (toggle == element.dataset.id) {
                pertial ?
                    element.classList.add(ACC_PERTIAL_ACTIVE_TOGGLE_CLASS) :
                    element.classList.add(ACC_ACTIVE_TOGGLE_CLASS);
            } else if (toggle == undefined) {
                ACC_TOGGLE_ELS()[0].classList.add(ACC_ACTIVE_TOGGLE_CLASS);
            }
        })
    }

    const removeActiveAccItem = () => {
        ACC_ITEM_ELS().forEach(element => {
            element.classList.remove(ACC_ACTIVE_ITEM_CLASS);
        })
    }

    const removActiveAccBody = () => {
        ACC_BODY_ELS().forEach(element => {
            element.classList.remove(ACC_ACTIVE_BODY_CLASS);
        })
    }

    const removeActiveAccToggle = () => {
        ACC_TOGGLE_ELS().forEach(element => {
            element.classList.remove(ACC_ACTIVE_TOGGLE_CLASS);
        })
    }

    const reomvePartialActiveToggle = () => {
        ACC_TOGGLE_ELS().forEach(element => {
            element.classList.remove(ACC_PERTIAL_ACTIVE_TOGGLE_CLASS);
        })
    }

    const reomvePartialActiveBody = () => {
        ACC_BODY_ELS().forEach(element => {
            element.classList.remove(ACC_PERTIAL_ACTIVE_BODY_CLASS);
        })
    }

    const attachClickOnToggleEl = (element) => {
        element.addEventListener('click', (e) => {
            let id = heigherO.getProperNode((e) => e.dataset.id);
            accordianAction.setActiveAccToggle(id(e));
            accordianAction.setActiveAccBody(id(e));

        })
    }

    const attachClickOnItemClick = () => {
        ACC_ITEM_ELS().forEach(element => {
            element.addEventListener('click', (e) => {
                let secId = heigherO.getProperNode((e) => e.dataset.itemId);
                accordianAction.setActiveAccItem(secId(element));
            })
        })
    }

    return {

        populatingAccToggleHandler: (routeObj, accDomNode) => {
            clearingExistingUnwantedNodes(accDomNode);
            routeObj.forEach(async element => {

                let divEl = document.createElement('div');
                divEl.setAttribute('class', ACC_DROPDOWN_CLASS);
                accDomNode.append(divEl);

                let liEl = document.createElement('li');
                liEl.setAttribute('class', ACC_TOGGLE_CLASS);
                liEl.setAttribute('data-id', element.chapter_id ? element.chapter_id : element.name);
                divEl.append(liEl);

                let spanEl = document.createElement('span');
                spanEl.innerHTML = element.c_name ? element.c_name : element.name;
                liEl.append(spanEl);

                let ulEl = document.createElement('ul');
                ulEl.setAttribute('class', ACC_BODY_CLASS);
                ulEl.setAttribute('data-id', element.chapter_id ? element.chapter_id : element.name);
                divEl.append(ulEl);

                attachClickOnToggleEl(liEl);
            });
        },

        populateAccordianItems: (sectionObject, htmlFrm) => {
            ACC_BODY_ELS().forEach(element => {

                sectionObject.map((e, key) => {

                    let id = e.id ? e.id : e.chapter_id
                    let name = e.name ? e.name : (e.s_name ? e.s_name : e.s_name_eng);
                    let itemId = e.itemId ? e.itemId : e.section_id;
                    let routeObject = e;

                    if (element.dataset.id == id) {
                        element.innerHTML += htmlFrm(itemId, name, routeObject);

                    }
                })
            });

            attachClickOnItemClick();
        },

        setActiveAccItem: (item) => {
            removActiveAccBody();
            removeActiveAccToggle();
            removeActiveAccItem();
            reomvePartialActiveToggle();
            reomvePartialActiveBody();

            ACC_ITEM_ELS().forEach(element => {
                if (item == element.dataset.itemId) {
                    element.classList.add(ACC_ACTIVE_ITEM_CLASS);
                } else if (item == undefined) {
                    ACC_ITEM_ELS()[0].classList.add(ACC_ACTIVE_ITEM_CLASS);
                }
            })

            setPertialBody(false, globalBody);
            setPertialToggle(false, globalToggle);
        },

        setActiveAccBody: (body) => {
            globalBody = body;
            setPertialBody(true, body);
        },

        setActiveAccToggle: (toggle) => {
            globalToggle = toggle;
            setPertialToggle(true, toggle);
        },


    }
})();