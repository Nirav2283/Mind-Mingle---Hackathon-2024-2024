// Initial References
let draggableObjects;
let dropPoints;
const startButton = document.querySelector(".button-89"); // Changed to class selector
const result = document.getElementById("result");
const controls = document.querySelector(".instruction-overlay"); // Updated to match HTML class
const dragContainer = document.querySelector(".draggable-objects");
const dropContainer = document.querySelector(".drop-points");
const data = [
  "INT",
  "FLOAT",
  "DOUBLE",
  "BOOLEAN",
  "CHAR",
  "LONG"
];

let deviceType = "";
let initialX = 0,
  initialY = 0;
let currentElement = "";
let moveElement = false;

// Detect touch device
const isTouchDevice = () => {
  try {
    document.createEvent("TouchEvent");
    deviceType = "touch";
    return true;
  } catch (e) {
    deviceType = "mouse";
    return false;
  }
};

let count = 0;

// Random value from Array
const randomValueGenerator = () => {
  return data[Math.floor(Math.random() * data.length)];
};

// Win Game Display
const stopGame = () => {
  controls.classList.remove("hide");
  startButton.classList.remove("hide");
};

// Drag & Drop Functions
function dragStart(e) {
  if (isTouchDevice()) {
    initialX = e.touches[0].clientX;
    initialY = e.touches[0].clientY;
    moveElement = true;
    currentElement = e.target;
  } else {
    e.dataTransfer.setData("text", e.target.id);
  }
}

function dragOver(e) {
  e.preventDefault();
}

const touchMove = (e) => {
  if (moveElement) {
    e.preventDefault();
    let newX = e.touches[0].clientX;
    let newY = e.touches[0].clientY;
    let currentSelectedElement = document.getElementById(e.target.id);
    currentSelectedElement.parentElement.style.top =
      currentSelectedElement.parentElement.offsetTop - (initialY - newY) + "px";
    currentSelectedElement.parentElement.style.left =
      currentSelectedElement.parentElement.offsetLeft - (initialX - newX) + "px";
    initialX = newX;
    initialY = newY;
  }
};

const drop = (e) => {
  e.preventDefault();
  if (isTouchDevice()) {
    moveElement = false;
    const currentDrop = document.querySelector(`div[data-id='${e.target.id}']`);
    const currentDropBound = currentDrop.getBoundingClientRect();
    if (
      initialX >= currentDropBound.left &&
      initialX <= currentDropBound.right &&
      initialY >= currentDropBound.top &&
      initialY <= currentDropBound.bottom
    ) {
      currentDrop.classList.add("dropped");
      currentElement.classList.add("hide");
      currentDrop.innerHTML = '';
      // Display the full-size image here
      currentDrop.insertAdjacentHTML(
        "afterbegin",
        `<img src="../Image/${currentElement.id}.png" alt="${currentElement.id}" style="width: 100px; height: 100px;">`
      );
      count += 1;
    }
  } else {
    const draggedElementData = e.dataTransfer.getData("text");
    const droppableElementData = e.target.getAttribute("data-id");
    if (draggedElementData === droppableElementData) {
      const draggedElement = document.getElementById(draggedElementData);
      e.target.classList.add("dropped");
      draggedElement.classList.add("hide");
      draggedElement.setAttribute("draggable", "false");
      e.target.innerHTML = '';
      // Display the full-size image here
      e.target.insertAdjacentHTML(
        "afterbegin",
        `<img src="../Image/${draggedElementData}.png" alt="${draggedElementData}" style="width: 100px; height: 100px;">`
      );
      count += 1;
    }
  }

  // Check if all items are dropped correctly (4 in total)
  if (count === 4) {
    // Trigger SweetAlert when game is completed
    Swal.fire({
      title: 'Congratulations!',
      text: 'You have successfully completed the game!',
      icon: 'success',
      confirmButtonText: 'Go to the Exercise'
    }).then(() => {
      // Optional: Redirect or perform another action after the alert
      window.location.href = "Questions/1.1.html"; // Redirect to the next question or page
    });
  }
};



// Creates flags and countries
const creator = () => {
  dragContainer.innerHTML = "";
  dropContainer.innerHTML = "";
  let randomData = [];

  for (let i = 1; i <= 4; i++) {
    let randomValue = randomValueGenerator();
    if (!randomData.includes(randomValue)) {
      randomData.push(randomValue);
    } else {
      i -= 1;
    }
  }

  for (let i of randomData) {
    const flagDiv = document.createElement("div");
    flagDiv.classList.add("draggable-image");
    flagDiv.setAttribute("draggable", true);
    if (isTouchDevice()) {
      flagDiv.style.position = "absolute";
    }
    flagDiv.innerHTML = `<img src="../Image/${i}.png" id="${i}" alt="${i}">`;
    dragContainer.appendChild(flagDiv);
  }

  randomData = randomData.sort(() => 0.5 - Math.random());
  for (let i of randomData) {
    const countryDiv = document.createElement("div");
    countryDiv.innerHTML = `<div class='countries' data-id='${i}'>
      ${i.charAt(0).toUpperCase() + i.slice(1).replace("-", " ")}
      </div>`;
    dropContainer.appendChild(countryDiv);
  }
};

// Start Game
startButton.addEventListener("click", async () => {
  document.getElementById('instructionOverlay').style.display = 'none';
  controls.classList.add("hide");
  startButton.classList.add("hide");
  await creator();
  count = 0;
  dropPoints = document.querySelectorAll(".countries");
  draggableObjects = document.querySelectorAll(".draggable-image");

  draggableObjects.forEach((element) => {
    element.addEventListener("dragstart", dragStart);
    element.addEventListener("touchstart", dragStart);
    element.addEventListener("touchend", drop);
    element.addEventListener("touchmove", touchMove);
  });
  dropPoints.forEach((element) => {
    element.addEventListener("dragover", dragOver);
    element.addEventListener("drop", drop);
  });
});
