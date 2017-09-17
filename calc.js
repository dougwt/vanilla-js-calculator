// UI elements
var ui = {
  display: document.querySelector('#display'),
  output: document.querySelector('#output'),
  buttons: {
    digits: {
      0: document.querySelector('#button0'),
      1: document.querySelector('#button1'),
      2: document.querySelector('#button2'),
      3: document.querySelector('#button3'),
      4: document.querySelector('#button4'),
      5: document.querySelector('#button5'),
      6: document.querySelector('#button6'),
      7: document.querySelector('#button7'),
      8: document.querySelector('#button8'),
      9: document.querySelector('#button9')
    },
    ops: {
      '+': document.querySelector('#addButton'),
      '-': document.querySelector('#subtractButton'),
      '*': document.querySelector('#multiplyButton'),
      '%': document.querySelector('#divideButton')
    },
    util: {
      '=': document.querySelector('#equalsButton'),
      'C': document.querySelector('#clearButton')
    }
  }
};

// State
var state;
function resetState() {
  state = {
    values: [
      undefined, // result of previous operation
      undefined, // first operand
      undefined, // second operand
    ],
    op: undefined // pending operation
  }
  refreshDisplay();
  console.log('State reset.')
}
resetState();

//////////////////////////////
// Calculator functionality
//////////////////////////////

function appendDigit(digit, vIndex) {
  // Calculate the new value and update state
  var oldValue = state.values[vIndex] || 0;
  var newValue = oldValue * 10 + digit;
  state.values[vIndex] = newValue;
  console.log(`appendDigit: ${oldValue} * 10 + ${digit} = ${newValue}`);
  refreshDisplay();
}

function setOperation(op) {
  state.op = op;
  if (!state.values[1]) {
    state.values[1] = state.values[0];
  }
  console.log(`Setting operation to ${op}`);
  refreshDisplay();
}

function performOperation() {
  var x = state.values[1];
  var y = state.values[2];
  var op = state.op;
  var result;

  console.log('performing op...');

  // Calculate the result
  switch (op) {
    case '+':
      console.log('addition op!');
      result = x + y;
      break;
    case '-':
      console.log('subtraction op!');
      result = x - y;
      break;
    case '*':
      console.log('multiplication op!');
      result = x * y;
      break;
    case '%':
      // TODO: Why isn't this case being chosen? Is it a unicode issue?
      console.log('division op!');
      result = x / y;
      break;
    default:
      console.log('unknown op???');
  }
  // Update state to prepare for the next calculation.
  state.values[0] = result;
  state.values[1] = state.values[2] = state.op = undefined;
  console.log(`Performing operation: ${x} ${op} ${y} = ${result}`);
  refreshDisplay();
}

function refreshDisplay() {
  // Update display value
  if (state.op) {
    ui.display.value = state.values[2] || 0;
  } else if (state.values[1]) {
    ui.display.value = state.values[1] || 0;
  } else {
    ui.display.value = state.values[0] || 0;
  }

  // Add pending class to operation if one is defined
  for (key in ui.buttons.ops) {
    var button = ui.buttons.ops[key];
    if (key === state.op) {
      button.classList.add('pending');
    } else {
      button.classList.remove('pending');
    }
  }
}

// Event handlers

function handleDigit(event) {
  var digit = Number(this.value);
  if (state.op) {
    appendDigit(digit, 2);
  } else {
    appendDigit(digit, 1);
  }
}
// Digits
for (key in ui.buttons.digits) {
  var button = ui.buttons.digits[key];
  button.addEventListener('click', handleDigit);
}
// Arithmetic Operations
for (key in ui.buttons.ops) {
  var button = ui.buttons.ops[key];
  button.addEventListener('click', function(event) {
    setOperation(this.innerText);
  });
}
// Utility buttons
ui.buttons.util['='].addEventListener('click', performOperation);
ui.buttons.util['C'].addEventListener('click', resetState);

// Keyboard shortcuts because what good is a calculator you have to click on?
document.addEventListener('keyup', (event) => {
  switch (event.keyCode) {
    case 48: // 0
      ui.buttons.digits[0].click();
      break;
    case 49: // 1
      ui.buttons.digits[1].click();
      break;
    case 50: // 2
      ui.buttons.digits[2].click();
      break;
    case 51: // 3
      ui.buttons.digits[3].click();
      break;
    case 52: // 4
      ui.buttons.digits[4].click();
      break;
    case 53: // 5
      ui.buttons.digits[5].click();
      break;
    case 54: // 6
      ui.buttons.digits[6].click();
      break;
    case 55: // 7
      ui.buttons.digits[7].click();
      break;
    case 56: // 8
      ui.buttons.digits[8].click();
      break;
    case 57: // 9
      ui.buttons.digits[9].click();
      break;

    case 107: // +
      ui.buttons.ops['+'].click();
      break;
    case 109: // -
      ui.buttons.ops['-'].click();
      break;
    case 106: // *
      ui.buttons.ops['*'].click();
      break;
    case 111: // %
      ui.buttons.ops['%'].click();
      break;

    case 13: // enter
      ui.buttons.util['='].click();
      break;
    case 8: // bkspace
      ui.buttons.util['C'].click();
      break;
  }
})
