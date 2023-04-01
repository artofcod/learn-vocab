window.addEventListener('keypress', (keypress) => {
  // console.log(keypress);
  if (keypress.ctrlKey = false && keypress.code == "Enter") {
    console.log(' go to next text box');
    // console.log(textBoxes);
    // // console.log( textBoxes);
    // // for (const key in textBoxes) {
    // //   console.log(textBoxes[key].classList[1]);
    // // }


    // currentActivePos = currentActiveElementPosition();
    // removeActiveFromInputBoxes();
    // console.log(textBoxes[currentActivePos + 1]);
    // activeCurrentInputBox(textBoxes[currentActivePos + 1]);
    // textBoxes[currentActivePos + 1].autofocus = true;
  }
  else if (keypress.ctrlKey && keypress.code == "Enter") {
    if (!practiceStorage.isFreezed()) {
      vocabEvaluation.evaluateVocabs()
    }
    else {
      SimpleModal.openModal({ message: practiceStorage.showFrozenMessage() });
    }
  }
  //key values alteration
  else if (keypress.ctrlKey && keypress.shiftKey && keypress.code == "KeyS") {
    evaluationPannel.showHideBtnOfVocab();
  }
  else if (keypress.charCode == 257 && keypress.code == "KeyA") {
    keypress.preventDefault();
    keypress.target.value = keypress.target.value + 'á';
  }
  else if (keypress.key == "ē" && keypress.code == "KeyE") {
    keypress.preventDefault();
    keypress.target.value = keypress.target.value + 'é';
  }
  else if (keypress.charCode == 299 && keypress.code == "KeyI") {
    keypress.preventDefault();
    keypress.target.value = keypress.target.value + 'í';
  }
  else if (keypress.charCode == 333 && keypress.code == "KeyO") {
    keypress.preventDefault();
    keypress.target.value = keypress.target.value + 'ó';
  }
  else if (keypress.charCode == 363 && keypress.code == "KeyU") {
    keypress.preventDefault();
    keypress.target.value = keypress.target.value + 'ú';
  }
  else if (keypress.charCode == 47 && keypress.code == "Slash") {
    keypress.preventDefault();
    keypress.target.value = keypress.target.value + '¿';
  }
  //alternate key action
  else if (keypress.charCode == 805 && keypress.code == "KeyR") {
    keypress.preventDefault();
    vocabEvaluation.cleanPracticeArea();

  }
  else if (keypress.charCode == 96 && keypress.code == "Backquote") {
    keypress.preventDefault();
    if (SimpleModal.getModalVisibility()) {
      SimpleModal.closeModal();
    }

    if (sanckBar.getSnackbarVisibility()) {
      sanckBar.hiedSnackBar();
    }
  }
})



// const activeCurrentInputBox = (currentElement) => {
//   removeActiveFromInputBoxes();
//   currentElement.classList.add('active');
// }

// const removeActiveFromInputBoxes = () => {
//   textBoxes.forEach(element => {
//     element.classList.remove('active')
//   });
// }

// const currentActiveElementPosition = () => {
//   let currentActiveElementPosition = null;
//   textBoxes.forEach((element, key) => {
//     let isActive = false;
//     element.classList.forEach(e => {
//       if (e == 'active') {
//         isActive = true;
//       }
//     })
//     if (isActive) {
//       currentActiveElementPosition = key;
//     }
//   });
//   return currentActiveElementPosition;
// }


