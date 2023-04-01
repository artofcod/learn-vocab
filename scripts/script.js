
const Gizmo = function (id) {
    this.id = id;
}

Gizmo.prototype.toString = function () {
    return 'gizmo ' + this.id;
}

const Hozit = function (id) {
    this.id = id;
}

Hozit.prototype = new Gizmo();
Hozit.prototype.test = function (id) {
    return this.id = id;
}

//----------------------------------------------------------------//



