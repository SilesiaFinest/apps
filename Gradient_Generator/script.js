const css = document.querySelector("h3");
const color1 = document.querySelector(".color1");
const color2 = document.querySelector(".color2");
const body = document.getElementById("gradient");
const circle = document.getElementById("circle");
let angle = "90deg";

const buttons = document.querySelectorAll(".box")
for (const button of buttons) {
  button.addEventListener('click', function() {
    angle = button.value;
    setGradient();
  })
}

function setGradient() {
    body.style.background =
        "linear-gradient("
        + angle
        + ","
        + color1.value
        + ", "
        + color2.value
        + ")";

        css.textContent =  body.style.background + ";";
}

function setRadial() {
    body.style.background =
    "radial-gradient("
        + color1.value
        + ", "
        + color2.value
        + ")";

        css.textContent =  body.style.background + ";";
}

//need to add logic for color input when on radial
// for now works when selecting colors first and radial direction after
color1.addEventListener("input", setGradient);
color2.addEventListener("input", setGradient);
circle.addEventListener("click", setRadial);