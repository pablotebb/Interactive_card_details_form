// Name
let inputName = document.querySelector("#input_1");
let errorName = document.querySelector(".section-form__input-name--error");
let cardName = document.querySelector(".card-background-fore__name");
// Number
let inputNumber = document.querySelector("#input_2");
let errorNumber = document.querySelector(".section-form__input-number--error");
let cardNumber = document.querySelector(".card-background-fore__number");
// Month
let inputMonth = document.querySelector("#input-mm");
let errorMonth = document.querySelector(".section-form__mm--error");
let cardMonth = document.querySelector(".card-background-fore__numbers--month");
// Year
let inputYear = document.querySelector("#input-yy");
let errorYear = document.querySelector(".section-form__yy--error");
let cardYear = document.querySelector(".card-background-fore__numbers--year");
// Cvc
let inputCvc = document.querySelector("#input-cvc");
let errorCvc = document.querySelector(".section-form__cvc--error");
let cardCvc = document.querySelector(".card-background-back__card_number");
// Button submit
let buttonSubmit = document.querySelector(".section-form__confirm-button");
// Screens
let currentScreen = document.querySelector(".section-form-information");
let thanksyouScreen = document.querySelector(".thank-you");

// Error messages
let errorMessage = [
  "", // 0
  "Wrong format,\n letters only", // 1
  "Wrong format,\n numbers only", // 2
  "Can't be blank", // 3
  "Wrong format, \n incorrect\nmonth !...", // 4
  "Wrong format, \n incorrect\nCvc !...", // 5
  "Wrong format, \n 17 numbers, please!...", // 6
];

// Check all
let checkAll = [
  // name
  false, // 0
  // number
  false, // 1
  // month
  false, // 2
  // year
  false, // 3
  // cvc
  false, // 4
];

// Event Name
inputName.addEventListener("input", () => {
  if (
    check_default_text(
      inputName,
      cardName,
      errorName,
      errorMessage[3],
      "Jane Appleseed"
    )
  ) {
    checkAll[0] = true;
  } else {
    checkAll[0] = false;
  }
});

// Event number
inputNumber.addEventListener("input", () => {
  if (
    check_default_text(
      inputNumber,
      cardNumber,
      errorNumber,
      errorMessage[3],
      "0000 0000 0000 0000"
    )
  ) {
    checkAll[1] = true;
    if (error_letter(inputNumber, errorNumber, errorMessage[2])) {
      checkAll[1] = true;
      if (error_length_number(inputNumber, errorNumber, errorMessage[6])) {
        checkAll[1] = true;
      } else {
        checkAll[1] = false;
      }
      if (separate_letters_etc(inputNumber, cardNumber)) {
        checkAll[1] = true;
      } else {
        checkAll[1] = false;
      }
    } else {
      checkAll[1] = false;
    }
  } else {
    checkAll[1] = false;
  }
});

// Event month
inputMonth.addEventListener("input", () => {
  if (
    check_default_text(inputMonth, cardMonth, errorMonth, errorMessage[3], "00")
  ) {
    checkAll[2] = true;
  } else {
    checkAll[2] = false;
  }
  if (
    error_letter(inputMonth, errorMonth, errorMessage[2]) &&
    checkEmpty(inputMonth, errorMonth) &&
    check_month(inputMonth, errorMonth, errorMessage[4])
  ) {
    // CORRECT
    errorMonth.innerText = "";
    checkAll[2] = true;
  } else {
    checkAll[3] = false;
  }
});

// Event year
inputYear.addEventListener("input", () => {
  if (
    check_default_text(inputYear, cardYear, errorYear, errorMessage[2], "00")
  ) {
    checkAll[3] = true;
  } else {
    checkAll[3] = false;
  }

  if (
    error_letter(inputYear, errorYear, errorMessage[2]) &&
    checkEmpty(inputYear, errorYear) &&
    check_year(inputYear, errorYear, errorMessage[4])
  ) {
    // CORRECT
    errorYear.innerText = "";
    checkAll[3] = true;
  } else {
    checkAll[3] = false;
  }
});

// Event Cvc
inputCvc.addEventListener("input", () => {
  if (check_default_text(inputCvc, cardCvc, errorCvc, errorMessage[2], "000")) {
    checkAll[4] = true;
  } else {
    checkAll[4] = false;
  }

  if (
    error_letter(inputCvc, errorCvc, errorMessage[2]) &&
    checkEmpty(inputCvc, errorCvc) &&
    check_cvc(inputCvc, errorCvc, errorMessage[5])
  ) {
    // CORRECT

    errorCvc.innerText = "";

    checkAll[4] = true;
  } else {
    checkAll[4] = false;
  }
});

//Event button submit
buttonSubmit.addEventListener("click", (e) => {
  e.preventDefault();

  if (checkAll[0] && checkAll[1] && checkAll[2] && checkAll[3] && checkAll[4]) {
    currentScreen.style.display = "none";
    thanksyouScreen.style.display = "flex";
  } else {
    let checkEmptyName = checkField(inputName, errorName);
    if (!checkAll[1]) {
      let checkEmptyNumber = checkField(inputNumber, errorNumber);
      inputNumber.style.borderColor = "hsl(0, 100%, 66%)";
      errorNumber.innerText = "Detected error\n or it's blank";
    }
    if (!checkAll[2]) {
      let checkEmptyMonth = checkField(inputMonth, errorMonth);
      inputMonth.style.borderColor = "hsl(0, 100%, 66%)";
      errorMonth.innerText = "Detected error\n or it's blank";
    }
    if (!checkAll[3]) {
      let checkEmptyYear = checkField(inputYear, errorYear);
      inputYear.style.borderColor = "hsl(0, 100%, 66%)";
      errorYear.innerText = "Detected error\n or it's blank";
    }
    if (!checkAll[4]) {
      let checkEmptyCvc = checkField(inputCvc, errorCvc);
      inputCvc.style.borderColor = "hsl(0, 100%, 66%)";
      errorCvc.innerText = "Detected error\n or it's blank";
    }
  }
});

// Functions
function check_default_text(
  inputD,
  cardD,
  errorD,
  messageD = "Can't be blank",
  textCardD = "0000 0000 0000 0000"
) {
  if (inputD.value == "") {
    // we fill card with default message and we mark error

    cardD.innerText = textCardD;
    inputD.style.borderColor = "hsl(0, 100%, 66%)";
    errorD.style.display = "block";
    errorD.innerText = messageD;
    return 0;
  } else {
    // Correct
    cardD.innerText = inputD.value;
    inputD.style.borderColor = "hsl(279, 6%, 55%)";
    errorD.style.display = "none";
    errorD.innertext = "";
    return 1;
  }
}

function error_letter(inputLe, errorLe, messageLe) {
  let regExp = /([A-z])/g;
  if (regExp.test(inputLe.value)) {
    // ERROR --> DETECTED LETTERS
    inputLe.style.borderColor = "hsl(0, 100%, 66%)";
    errorLe.style.display = "block";
    errorLe.innerText = messageLe;
    return 0;
  } else {
    // CORRECT
    inputLe.style.borderColor = "hsl(279, 6%, 55%)";
    errorLe.style.display = "none";
    errorLe.innerText = "";
    return 1;
  }
}

function separate_letters_etc(inputL, cardL) {
  let value_input = inputL.value;

  cardL.innerText = value_input
    .replace(/\s/g, "")
    .replace(/([0-9]{4})/g, "$1 ")
    .trim();

  inputL.value = value_input
    .replace(/\s/g, "")
    .replace(/([0-9]{4})/g, "$1 ")
    .trim();

  check_default_text(inputL, cardL, "0000 0000 0000 0000");
  return 1;
}

function check_month(inputM, errorM, messageM) {
  if (parseInt(inputM.value) > 0 && parseInt(inputM.value) < 13) {
    // Correct
    errorM.style.display = "none";
    inputM.style.borderColor = "hsl(279, 6%, 55%)";
    errorM.innertext = "";
    checkAll[2] = true;
    return 1;
  } else {
    // Error
    errorM.style.display = "block";
    inputM.style.borderColor = "hsl(0, 100%, 66%)";
    errorM.innerText = messageM;
    checkAll[2] = false;
    return 0;
  }
}

function checkEmpty(inputE, errorE) {
  if (inputE.value == "") {
    // Error
    errorE.innerText = "";
    return 0;
  } else {
    // Correct
    return 1;
  }
}
function checkField(inputF, errorF) {
  if (inputF.value == "") {
    // Error
    errorF.style.display = "block";
    inputF.style.borderColor = "hsl(0, 100%, 66%)";
    errorF.innerText = "Can't be blank";
    return 0;
  } else {
    // Correct
    inputF.style.borderColor = "hsl(279, 6%, 55%)";
    errorF.innerText = "";
    return 1;
  }
}

function check_year(inputY, errorY, errormessageY) {
  if (parseInt(inputY.value) >= 22 && parseInt(inputY.value) <= 27) {
    // Correct
    errorY.style.display = "none";
    inputY.style.borderColor = "hsl(279, 6%, 55%)";
    errorY.innerText = "";
    checkAll[3] = true;
    return 1;
  } else {
    // Error
    errorY.style.display = "block";
    inputY.style.borderColor = "hsl(0, 100%, 66%)";
    errorY.innerText = errormessageY;
    checkAll[3] = false;
    return 0;
  }
}

function check_cvc(inputCvc, errorCvc, errorMessageCvc) {
  if (inputCvc.value.length == "3") {
    // Correct
    errorCvc.style.display = "none";
    inputCvc.style.borderColor = "hsl(279, 6%, 55%)";
    errorCvc.innerText = "";
    return 1;
  } else {
    // Error
    errorCvc.style.display = "block";
    inputCvc.style.borderColor = "hsl(0, 100%, 66%)";
    errorCvc.innerText = errorMessageCvc;
    return 0;
  }
}

function error_length_number(inputLn, errorLn, messageLn) {
  if (inputLn.value.length > 0 && inputLn.value.length < 19) {
    // Error
    errorLn.style.display = "block";
    inputLn.style.borderColor = "hsl(0, 100%, 66%)";
    errorLn.innerText = messageLn;
    return 0;
  } else {
    // Correct
    errorLn.style.display = "none";
    inputLn.style.borderColor = "hsl(279, 6%, 55%)";
    errorLn.innerText = "";
    return 1;
  }
}
