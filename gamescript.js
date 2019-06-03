//loading DOM
window.addEventListener("DOMContentLoaded", loadModalOne);

function loadModalOne() {
  fetch("modal1.svg")
    .then(response => response.text())
    .then(svgData => {
      document
        .querySelector("#startone")
        .insertAdjacentHTML("afterbegin", svgData);
      //starting everything on click of the start
      document
        .querySelector("#startone")
        .addEventListener("click", loadModalTwo);
    });
}
function loadModalTwo() {
  document.querySelector("#startone").style.display = "none";
  document.querySelector("#starttwo").style.display = "block";
  fetch("modal2.svg")
    .then(response => response.text())
    .then(svgData => {
      document
        .querySelector("#starttwo")
        .insertAdjacentHTML("afterbegin", svgData);

      document.querySelector("#starttwo").addEventListener("click", loadSVG);
    });
}
function loadSVG() {
  document.querySelector("#starttwo").style.display = "none";
  fetch("background1.svg")
    .then(response => response.text())
    .then(svgData => {
      document
        .querySelector("#gameplaceholder")
        .insertAdjacentHTML("afterbegin", svgData);
      //starting everything on click of the start
      gameStart();
    });
}

function gameStart() {
  console.log("greencup");
  //hiding the modal
  catching();
}

function catching() {
  let GoodCup = document.querySelector("#CupForCounting");
  let BadCup = document.querySelector("#badCup");
  let intv;
  let speed = 3000;
  let killedCups = [];
  let counter = 0;
  //enhancing speed and adding points on the Good Cup click
  GoodCup.addEventListener("click", () => {
    //here we are changing the text for pointer counter
    counter++;
    let pointCounter = document.querySelector("#pointstext");
    pointCounter.textContent = `${counter} points`;
    speed = speed - 80;
    //to speed up we have to clear the existing interval and turn it on again with the new speed
    clearInterval(intv);
    intv = setInterval(moveCup, speed, GoodCup);
    //turning the game with some timeout
    setTimeout(function() {
      endGame(counter);
    }, 20000);
    //if the counter is divisible by 3, we clone the BadCup all over and append it to the background
    if (counter % 3 === 0) {
      let clone = BadCup.cloneNode(true);
      document.querySelector("#backgroundGame").appendChild(clone);
      badCupFunctionality(killedCups, clone, counter);
    }
  });

  //value for setting the interval with a certain speed to the moving
  moveCup(GoodCup);
  int = setInterval(moveCup, speed, GoodCup);
  //now introducing the bad cup
}

function moveCup(GoodCup) {
  // let GoodCup = document.querySelector("#CupForCounting");
  //so this is math random is multiplied but the width and height of the canvas
  //it's aproximately the width and height through which the cup should move
  //i tested it first moving the cup to the most left and most bottom in css
  GoodCup.style.transform = `translate(${Math.random() *
    1100}px, ${Math.random() * 400}px)`;
}

function badCupFunctionality(killedCups, clone, counter) {
  clone.style.display = "block";
  //I am reusing the same function for moving the cup but just with different values and one set speed
  setInterval(moveCup, 2800, clone);
  clone.addEventListener("click", () => {
    //instead of counting clicks we have to create the array and pushed every clicked clone into that. it's because
    //the counter gets reseted with every clone, because it is counting a click to this particular clone, not globally
    killedCups.push(clone);
    clone.style.display = "none";

    //here I am finding all the "x" in the svg, they have data id but it's just because I was playing with that, could
    //be just a class or whatever, anyway all of them are now an array of strikes and the index number of the array
    //should equal to the amount of the killed cups minus one. because index numbers of arrays start from 0 and number of
    //killed cups will be starting from 1
    let strikes = document.querySelectorAll("[data-id]");
    let properstrike = strikes[killedCups.length - 1];
    properstrike.style.fill = "red";
    //end the game when it's 3 clicked
    if (killedCups.length === 3) {
      endGame(counter);
    }
  });
}

function endGame(counter) {
  document.querySelector("#blur").style.display = "block";
  document.querySelector("#endgamemodal").style.display = "block";
  document.querySelector(
    "#congratulations"
  ).textContent = `You earned ${counter} points! Exchange them to ${counter}dkk now!`;
}
