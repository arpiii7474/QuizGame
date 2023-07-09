var draggedOption = null;

function allowDrop(event) {
  event.preventDefault();
}

function drag(event) {
  draggedOption = event.target;
}

function drop(event) {
  event.preventDefault();
  if (event.target.className === "input") {
    event.target.appendChild(draggedOption);
  } else if (event.target.className === "option") {
    event.target.parentNode.appendChild(draggedOption);
  }

  // Enable the check button if all inputs are filled
  var inputs = document.getElementsByClassName("input");
  var checkButton = document.getElementById("check-button");
  checkButton.disabled = Array.from(inputs).some(
    (input) => input.childElementCount === 0
  );
}

function checkResult() {
  var inputs = document.getElementsByClassName("input");
  var sortedValues = [];
  for (var i = 0; i < inputs.length; i++) {
    var option = inputs[i].querySelector(".option");
    if (option) {
      var value = parseInt(option.textContent);
      sortedValues.push(value);
    } else {
      sortedValues.push(null);
    }
  }

  var correctValues = sortedValues.slice().sort(function (a, b) {
    return a - b;
  });

  var isCorrect = JSON.stringify(sortedValues) === JSON.stringify(correctValues);

  if (isCorrect) {
    showCorrectPage();
  } else {
    showWrongPage();
  }
}

function showCorrectPage() {
  var gameContainer = document.getElementById("game-container");
  var correctPage = document.getElementById("correct-page");

  gameContainer.style.display = "none";
  correctPage.style.display = "block";
}

function showWrongPage() {
  var gameContainer = document.getElementById("game-container");
  var wrongPage = document.getElementById("wrong-page");

  gameContainer.style.display = "none";
  wrongPage.style.display = "block";
}

function resetGame() {
  var options = document.getElementsByClassName("option");
  var inputs = document.getElementsByClassName("input");

  while (options[0]) {
    options[0].parentNode.removeChild(options[0]);
  }

  while (inputs[0]) {
    inputs[0].parentNode.removeChild(inputs[0]);
  }

  var optionsContainer = document.getElementById("options-container");
  var inputContainer = document.getElementById("input-container");

  for (var i = 1; i <= 5; i++) {
    var option = document.createElement("div");
    option.id = "option" + i;
    option.className = "option";
    option.draggable = true;
    option.textContent = getRandomValue();
    option.addEventListener("dragstart", drag);
    optionsContainer.appendChild(option);
  }

  var inputRow = document.createElement("div");
  inputRow.className = "input-row";

  for (var j = 1; j <= 5; j++) {
    var input = document.createElement("div");
    input.id = "input" + j;
    input.className = "input";
    input.addEventListener("drop", drop);
    input.addEventListener("dragover", allowDrop);
    inputRow.appendChild(input);
  }

  inputContainer.appendChild(inputRow);

  var checkButton = document.getElementById("check-button");
  checkButton.disabled = true;

  // Show the game container and hide the correct/wrong pages
  var gameContainer = document.getElementById("game-container");
  var correctPage = document.getElementById("correct-page");
  var wrongPage = document.getElementById("wrong-page");

  gameContainer.style.display = "block";
  correctPage.style.display = "none";
  wrongPage.style.display = "none";
}
function getRandomValue() {
  return Math.floor(Math.random() * 1000);
}
// Initialize the game
resetGame();
