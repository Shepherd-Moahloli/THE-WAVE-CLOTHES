const body = document.body;
const image = document.getElementById("toggle-image");
const menuIcon = document.getElementById("menu-icon");
const closeIcon = document.getElementById("close-icon");
const nightIcon = document.getElementById("night-icon");
const dayIcon = document.getElementById("day-icon");

let isBlackBackground = true;

function initializeIconColors() {
  if (isBlackBackground) {
    menuIcon.style.color = "white";
    closeIcon.style.color = "white";
    nightIcon.style.color = "white";
    dayIcon.style.color = "white";
    nightIcon.style.display = "none";
    dayIcon.style.display = "inline";
  } else {
    menuIcon.style.color = "black";
    closeIcon.style.color = "black";
    nightIcon.style.color = "black";
    dayIcon.style.color = "black";
    nightIcon.style.display = "inline";
    dayIcon.style.display = "none";
  }
}

// Call the initialization function when the page loads
initializeIconColors();

nightIcon.addEventListener("click", toggleBackground);
dayIcon.addEventListener("click", toggleBackground);

function toggleBackground() {
  if (isBlackBackground) {
    // Switch to white background and white image
    body.style.backgroundColor = "white";
    image.src = "images/soon-w.jpg"; //

    menuIcon.style.color = "black";
    closeIcon.style.color = "black";

    nightIcon.style.color = "black";
    dayIcon.style.color = "black";

    nightIcon.style.display = "inline";
    dayIcon.style.display = "none";
  } else {
    // Switch back to black background and black image
    body.style.backgroundColor = "black";
    image.src = "images/soon.jpg"; // Replace with the path to your black image

    menuIcon.style.color = "white";
    closeIcon.style.color = "white";

    nightIcon.style.color = "white";
    dayIcon.style.color = "white";

    nightIcon.style.display = "none";
    dayIcon.style.display = "inline";
  }
  isBlackBackground = !isBlackBackground;
}
