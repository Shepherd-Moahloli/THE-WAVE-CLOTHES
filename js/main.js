const body = document.body;
const image = document.getElementById("toggle-image");
const logo = document.querySelector("#logo img"); // Select the logo image
const menuIcon = document.getElementById("menu-icon");
const closeIcon = document.getElementById("close-icon");
const nightIcon = document.getElementById("night-icon");
const dayIcon = document.getElementById("day-icon");
const overlay = document.getElementById("overlay");

let isBlackBackground = true;

function initializeIconColors() {
  if (isBlackBackground) {
    menuIcon.style.color = "white";
    closeIcon.style.color = "white";
    nightIcon.style.color = "white";
    dayIcon.style.color = "white";
    nightIcon.style.display = "none"; // Hide the night icon initially
    dayIcon.style.display = "inline"; // Show the day icon initially
    logo.src = "images/logos '25-b.png"; // Set the default logo for black background
  } else {
    menuIcon.style.color = "black";
    closeIcon.style.color = "black";
    nightIcon.style.color = "black";
    dayIcon.style.color = "black";
    nightIcon.style.display = "inline"; // Show the night icon initially
    dayIcon.style.display = "none"; // Hide the day icon initially
    logo.src = "images/logos '25-w.png"; // Set the default logo for white background
  }
}

// Call the initialization function when the page loads
initializeIconColors();

// Add click event listener to the night and day icons
nightIcon.addEventListener("click", toggleBackground);
dayIcon.addEventListener("click", toggleBackground);

menuIcon.addEventListener("click", () => {
  menuIcon.style.display = "none"; // Hide the menu icon
  closeIcon.style.display = "inline"; // Show the close icon
  overlay.style.display = "flex"; // Show the overlay
  overlay.style.opacity = "1"; // Fade in the overlay
  console.log("Menu opened");
});

closeIcon.addEventListener("click", () => {
  closeIcon.style.display = "none"; // Hide the close icon
  menuIcon.style.display = "inline"; // Show the menu icon
  overlay.style.opacity = "0"; // Fade out the overlay
  setTimeout(() => {
    overlay.style.display = "none"; // Hide the overlay after fade-out
  }, 300); // Match the CSS transition duration
  console.log("Menu closed");
});

function toggleBackground() {
  // Add fade-out effect
  image.style.opacity = 0;
  logo.style.opacity = 0;

  setTimeout(() => {
    if (isBlackBackground) {
      // Switch to white background and white image
      body.style.backgroundColor = "white";
      overlay.style.backgroundColor = "rgba(255, 255, 255, 0.9)"; // Set overlay to white with transparency
      image.src = "images/soon-w.jpg"; // Replace with the path to your white image
      logo.src = "images/logos '25-w.png"; // Replace with the path to your white logo

      menuIcon.style.color = "black";
      closeIcon.style.color = "black";

      nightIcon.style.color = "black";
      dayIcon.style.color = "black";

      nightIcon.style.display = "inline"; // Show the night icon
      dayIcon.style.display = "none"; // Hide the day icon
    } else {
      // Switch back to black background and black image
      body.style.backgroundColor = "black";
      overlay.style.backgroundColor = "rgba(0, 0, 0, 0.9)"; // Set overlay to black with transparency
      image.src = "images/soon.jpg"; // Replace with the path to your black image
      logo.src = "images/logos '25-b.png"; // Replace with the path to your black logo

      menuIcon.style.color = "white";
      closeIcon.style.color = "white";

      nightIcon.style.color = "white";
      dayIcon.style.color = "white";

      nightIcon.style.display = "none"; // Hide the night icon
      dayIcon.style.display = "inline"; // Show the day icon
    }

    // Add fade-in effect
    image.style.opacity = 1;
    logo.style.opacity = 1;

    isBlackBackground = !isBlackBackground;
  }, 700); // Match the CSS transition duration
}

window.addEventListener("DOMContentLoaded", function () {
  document.getElementById("registration-modal").style.display = "flex";
  var closeBtn = document.getElementById("close-registration");
  if (closeBtn) {
    closeBtn.onclick = function () {
      document.getElementById("registration-modal").style.display = "none";
    };
  }
  // Highlight register button red when any input is focused
  const regInputs = [
    document.getElementById("reg-name"),
    document.getElementById("reg-email"),
  ];
  const regButton = document.querySelector(
    '#registration-form button[type="submit"]'
  );
  regInputs.forEach((input) => {
    input.addEventListener("focus", function () {
      regButton.style.background = "#b80000";
    });
    input.addEventListener("blur", function () {
      // Only remove red if neither input is focused
      if (!regInputs.some((inp) => inp === document.activeElement)) {
        regButton.style.background = "";
      }
    });
  });

  // Show thank you message after registration (AJAX to Formspree)
  const regForm = document.getElementById("registration-form");
  if (regForm) {
    regForm.addEventListener("submit", function (e) {
      e.preventDefault();
      const formData = new FormData(regForm);
      fetch(regForm.action, {
        method: "POST",
        body: formData,
        headers: { Accept: "application/json" },
      })
        .then((response) => {
          if (response.ok) {
            regForm.style.display = "flex";
            regForm.style.flexDirection = "column";
            regForm.style.justifyContent = "center";
            regForm.style.alignItems = "center";
            regForm.innerHTML =
              '<h2 style="color:#b80000;text-align:center;">Thank You!<br><span style="color:#222;font-size:1.1rem;">We will be in touch.</span></h2>';
            setTimeout(function () {
              document.getElementById("registration-modal").style.display =
                "none";
            }, 3000);
          } else {
            alert(
              "There was a problem submitting your form. Please try again."
            );
          }
        })
        .catch(() => {
          alert("There was a problem submitting your form. Please try again.");
        });
    });
  }
});
