let planets = [];
let orbitRadii = [];
let numOfPlanets = 6;
let speed = 0.003;
let minPlanetRadius = 5;
let maxPlanetRadius = 20;
let sunRadius = 20;

function setup() {
  createCanvas(windowWidth, windowHeight);
  generateOrbitRadii();
  generatePlanets();
}

function draw() {
 
    background(0);
    translate(width / 2, height / 2);
    drawSun();
    drawAllOrbits();
    moveAllPlanets();
    drawAllPlanets();
  
}

function generatePlanets() {
  for (let i = 0; i < numOfPlanets; i++) {
    if (i == 0) {
      planets.push(new Planet(orbitRadii[i], sunRadius, orbitRadii[i + 1]));
    } else if (i < numOfPlanets - 1) {
      planets.push(new Planet(orbitRadii[i], orbitRadii[i - 1], orbitRadii[i + 1]));
    } else {
      planets.push(new Planet(orbitRadii[i], orbitRadii[i - 1], orbitRadii[i] * 2));
    }
  }
}


function generateOrbitRadii() {
  let previousRadius = sunRadius;
  let numOfPlanetsRemaining = numOfPlanets;
  let minOrbitForNextPlanet = previousRadius + minPlanetRadius;
  let availableSpaceForNextOrbit = width / 2 - previousRadius;
  let maxOrbitForNextPlanet = (availableSpaceForNextOrbit / numOfPlanetsRemaining) + previousRadius;
  for (let i = numOfPlanets; i > 0; i--) {
    orbitRadii.push(random(minOrbitForNextPlanet, maxOrbitForNextPlanet));
    previousRadius = orbitRadii[orbitRadii.length - 1];
    // numOfPlanetsRemaining -= 1;
    minOrbitForNextPlanet = previousRadius + minPlanetRadius;
    availableSpaceForNextOrbit = width / 2 - previousRadius;
    maxOrbitForNextPlanet = (availableSpaceForNextOrbit / i) + previousRadius;
  }
  print(orbitRadii);
}

function drawAllPlanets() {
  for (let planet of planets) {
    planet.draw();
  }
}

function moveAllPlanets() {
  for (let planet of planets) {
    planet.move();
  }
}

function drawSun() {
  fill(253, 184, 19); // sun yellow/orange
  noStroke();
  circle(0, 0, sunRadius * 3);
}

function drawAllOrbits() {
  for (let planet of planets) {
    planet.drawOrbit();
  }
}