let r = {
    "0": {},
    "1": {},
    "2": {},
    "3": {},
    "4": {},
    "5": {},
    "6": {},
    "7": {},
    "8": {},
    "9": {}
}

let m = [
    '0 YO test',
    '1 YO test',
    '2 YO test',
    '3 YO test',
    '4 YO test',
    '5 YO test',
    '6 YO test',
    '7 YO test',
    '8 YO test',
    '9 YO test'
]

function Gizmo1(id) {

    return Object.freeze({
        id,
        toString: () => {
            return "gizmo " + id;
        }
    })
}

function HozitX(id) {
    var other = new Gizmo1(id);
    let internal = {
        ...other,
        test: (testId) => {
            return testId === other.id;
        }
    }

    return Object.freeze(internal);


}

let st = new HozitX(5);


const Asdf = (() => {
    return {
        funName: () => {

        },
    }
})();


function add(first, second) {
    return first + second;
}

function sub(first, second) {
    return first - second;
}

function mul(first, second) {
    return first * second;
}

function add(first, second) {
    return first + second;
}
function liftf(oeration) {
    return function (first) {
        return function (second) {
            return oeration(first, second)
        }

    }
}
liftf(add)(1)(2)

function curry(opeation, first) {
    return function (second) {
        return opeation(first, second)
    }
}

curry(add, 1)(2)

function curry1(operation, first) {
    return liftf(operation)(first)(second)
}

function inc(first) {
    return add(first + 1)
}

function inc(first) {
    return first++;
}

function inc(first) {
    return curry(add, first)(1);
}

function inc(first) {
    return liftf(add)(first)(1);
}

function twice(operation) {
    return function (number) {
        return operation(number, number)
    }
}

// callback
function hide(str, done) {
    done(str.replace(/[A-Za-z]/g, '*'))
}

hide("hay whats up", e => {
    //console.log(e);
})

//console.log("end");

Array.prototype.tsmo = function (func, thisp) {
    console.log(func, thisp, this);
    var i, length = this.length;
    for (i = 0; i < length; i++) {
        if (
            this.hasOwnProperty(i) &&
            !func.call(thisp, this[i], i, this)
        ) {
            return false;
        }
    }
    return true;
}

Array.prototype.filterx = function (func) {
    console.log(func, '', this);
    var i, length = this.length;
    let result = [];
    let value;

    for (i = 0; i < length; i++) {
        if (
            this.hasOwnProperty(i)
        ) {
            value = this[i];
            console.log(func.call('', value, i, this));
            if (func.call('', value, i, this)) {
                result.push(value);
            }


        }
    }
    return result;
}

// extending and Overwriting start
function DoExtend() {
    return {
        a(data) {
            return `<p>${data}</p>`;
        },

        injectData() {
            console.log('gg');
        }
    }

}

const chapter = (() => {
    let chapter = new DoExtend();

    let injectData = () => {
        chapter.injectData()
        console.log(chapter.a('hi'));
    }
    // return (injectData())
})();

// extending and Overwriting end