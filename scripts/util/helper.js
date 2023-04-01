'use strict';

const clrSign = (singleSselector) => {
    if (singleSselector !== undefined) {
        return singleSselector.substr(1, singleSselector.length);
    } else {
        throw new Error(
            `A selector is reqired like : ".class" or "#id".
            You provide : ${singleSselector}
            `)
    }

}

const query = (selector) => document.querySelector(selector);
const querys = (selector) => document.querySelectorAll(selector);

const appendDot = (Text, calculationbound) => {
    let startCalc = calculationbound - Text.length;
    let dot = '';
    for (let index = 1; index <= startCalc; index++) {
        dot = dot + '.';
    }
    return dot;
}

const reduceText = (bookName, MAX_TEXT_LENGTH = 40) => {
    if (bookName.length > MAX_TEXT_LENGTH) {
        let wordArray = bookName.trim().substring(0, MAX_TEXT_LENGTH).split(' ');
        let modifiedText = wordArray.slice(0, wordArray.length - 1).join(" ");
        modifiedText = modifiedText + appendDot(modifiedText, MAX_TEXT_LENGTH);
        return modifiedText;
    }
    else {
        return bookName;
    }
}