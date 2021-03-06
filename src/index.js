import '../styles/index.css';

// UI elements
const ui = {
  display: document.querySelector('#display'),
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
  },
  debug: {
    val0: document.querySelector('#val0'),
    val1: document.querySelector('#val1'),
    val2: document.querySelector('#val2'),
    op: document.querySelector('#op')
  }
};

// State
const state = {
  values: [
    undefined, // result of previous operation
    undefined, // first operand
    undefined, // second operand
  ],
  op: undefined // pending operation
}
function resetState() {
  state.values = [undefined, undefined, undefined];
  state.op = undefined; // pending operation
  refreshDisplay();
  console.log('State reset.')
}
resetState();

//////////////////////////////
// Calculator functionality
//////////////////////////////

function appendDigit(digit, vIndex) {
  // Calculate the new value and update state
  const oldValue = state.values[vIndex] || 0;
  const newValue = oldValue * 10 + digit;
  state.values[vIndex] = newValue;
  console.log(`appendDigit: ${oldValue} * 10 + ${digit} = ${newValue}`);
  refreshDisplay();
}

function setOperation(op) {
  if (state.values[2]) {
    // We already have both operands, so let's perform
    // the operation before we do anything else...
    performOperation();
  }

  state.op = op;

  if (!state.values[1]) {
    // There are no operands, so promote the previous result to the first operand.
    state.values[1] = state.values[0];
  }
  console.log(`Setting operation to ${op}`);
  refreshDisplay();
}

function performOperation() {
  let x = state.values[1];
  let y = state.values[2];
  let op = state.op;
  let result;

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
    case '÷':
      // TODO: Why isn't this case being chosen? Is it a unicode issue?
      console.log('division op!');
      result = x / y;
      break;
    case undefined:
      console.log('no op');
      return;
    default:
      throw new Error(`Invalid operation: ${op}`);
  }
  // Update state to prepare for the next calculation.
  state.values[0] = result;
  state.values[1] = state.values[2] = state.op = undefined;
  console.log(`Performing operation: ${x} ${op} ${y} = ${result}`);
  refreshDisplay();
}

function numberWithCommas(x) {
  // Source: https://stackoverflow.com/a/2901298
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function refreshDisplay() {
  // Update display value
  let value;
  if (state.op) {
    value = state.values[2] || 0;
  } else if (state.values[1]) {
    value = state.values[1] || 0;
  } else {
    value = state.values[0] || 0;
  }
  ui.display.innerText = numberWithCommas(value);

  // Add pending class to operation if one is defined
  for (let key in ui.buttons.ops) {
    let button = ui.buttons.ops[key];
    if (key === state.op) {
      button.classList.add('pending');
    } else {
      button.classList.remove('pending');
    }
  }

  // Update debug information
  ui.debug.val0.innerText = state.values[0] || '';
  ui.debug.val1.innerText = state.values[1] || '';
  ui.debug.val2.innerText = state.values[2] || '';
  ui.debug.op.innerText = state.op || '';
}

// Event handlers

function handleDigit() {
  const digit = Number(this.innerText);
  if (state.op) {
    appendDigit(digit, 2);
  } else {
    appendDigit(digit, 1);
  }
}
// Digits
for (let key in ui.buttons.digits) {
  const button = ui.buttons.digits[key];
  button.addEventListener('click', handleDigit);
}
// Arithmetic Operations
for (let key in ui.buttons.ops) {
  const button = ui.buttons.ops[key];
  button.addEventListener('click', function() {
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
    case 96:
      ui.buttons.digits[0].click();
      break;
    case 49: // 1
    case 97:
      ui.buttons.digits[1].click();
      break;
    case 50: // 2
    case 98:
      ui.buttons.digits[2].click();
      break;
    case 51: // 3
    case 99:
      ui.buttons.digits[3].click();
      break;
    case 52: // 4
    case 100:
      ui.buttons.digits[4].click();
      break;
    case 53: // 5
    case 101:
      ui.buttons.digits[5].click();
      break;
    case 54: // 6
    case 102:
      ui.buttons.digits[6].click();
      break;
    case 55: // 7
    case 103:
      ui.buttons.digits[7].click();
      break;
    case 56: // 8
    case 104:
      ui.buttons.digits[8].click();
      break;
    case 57: // 9
    case 105:
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
