const shortCircutToRemoveExtaClicks = () => {
    document.querySelector('.nav').innerHTML += '';
}

const attachClick = () => {
    let handel;
    let trigger = true;

    shortCircutToRemoveExtaClicks();
    document.querySelectorAll('.nav .nav-link').forEach(el => {
        el.addEventListener('click', handel = (e) => {
            if (trigger) {
                let path = e.target.dataset.path
                locate(path).then(e => {
                    activeSpecificNavLink(path);
                    attachClick();
                });
                trigger = false
            }
            el.removeEventListener('click', handel, false);
        }, false);
    })
}

const activeSpecificNavLink = (path) => {
    document.querySelectorAll('.nav-link').forEach(el => {
        el.classList.remove('active-nav-link');
        if (el.dataset.path == path) {
            el.classList.add('active-nav-link')
        }
    })
}

const loadingConfirm = new Promise(resolve => {
    let handel;
    document.addEventListener('load', handel = () => {
        locate('/').then(e => {
            activeSpecificNavLink('/');
            attachClick();
        });
    });
    return resolve(handel());
})
