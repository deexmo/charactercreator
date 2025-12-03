let heads = [];
let bodies = [];
let weapons = [];

let headStats, bodyStats, weaponStats;

let headIndex = -1;
let bodyIndex = -1;
let weaponIndex = -1;

let statsJSON;
let bgImage;

function preload() {
  // Load stats
  statsJSON = loadJSON("stats.json");

  // Load full images
  for (let i = 1; i <= 5; i++) {
    heads.push(loadImage(`assets/head${i}.png`));
  }

  for (let i = 1; i <= 4; i++) {
    bodies.push(loadImage(`assets/body${i}.png`));
  }

  for (let i = 1; i <= 4; i++) {
    weapons.push(loadImage(`assets/weapon${i}.png`));
  }

  bgImage = loadImage("assets/bg.png");
}

function setup() {
  let cnv = createCanvas(440, 800);
  cnv.parent('canvas-container');
  textAlign(CENTER);

  headStats = statsJSON.heads;
  bodyStats = statsJSON.bodies;
  weaponStats = statsJSON.weapons;
}

function draw() {
  background(235);

  noSmooth();

  // Main preview
  image(bgImage, 40, 40, 360, 440);

  if (headIndex !== -1) image(heads[headIndex], 40, 40, 360, 440);
  if (bodyIndex !== -1) image(bodies[bodyIndex], 40, 40, 360, 440);
  if (weaponIndex !== -1) image(weapons[weaponIndex], 40, 40, 360, 440);

  drawThumbnails();
  drawStats();
}

function drawThumbnails() {
  let yStart = 540;
  let x = 40;

  textSize(16);
  fill(0);
  text("Heads", width / 2, yStart - 10);

  // heads
  for (let i = 0; i < heads.length; i++) {

    fill(255);                 
    rect(x, yStart, 60, 60, 10);     // rounded rectangle

    // fill(0);
    // text("H" + (i + 1), x + 30, yStart + 35);

    if (mouseInside(x, yStart, 60, 60) && mouseIsPressed) headIndex = i;

    x += 70;
  }

  // bodies
  yStart += 90;
  x = 40;
  fill(0);
  text("Bodies", width / 2, yStart - 10);

  for (let i = 0; i < bodies.length; i++) {

    fill(255);               
    rect(x, yStart, 60, 60, 10);

    // fill(0);
    // text("B" + (i + 1), x + 30, yStart + 35);

    if (mouseInside(x, yStart, 60, 60) && mouseIsPressed) bodyIndex = i;

    x += 70;
  }

  // weapons
  yStart += 90;
  x = 40;
  fill(0);
  text("Weapons", width / 2, yStart - 10);

  for (let i = 0; i < weapons.length; i++) {

    fill(255);               
    rect(x, yStart, 60, 60, 10);

    // fill(0);
    // text("W" + (i + 1), x + 30, yStart + 35);

    if (mouseInside(x, yStart, 60, 60) && mouseIsPressed) weaponIndex = i;

    x += 70;
  }
}

function mouseInside(x, y, w, h) {
  return mouseX > x && mouseX < x + w && mouseY > y && mouseY < y + h;
}

function drawStats() {
  if (headIndex === -1 || bodyIndex === -1 || weaponIndex === -1) return;

  let totalPower =
    headStats[headIndex].power +
    bodyStats[bodyIndex].power +
    weaponStats[weaponIndex].power;

  textSize(20);
  fill(0);
  text("Power Level: " + totalPower, width / 2, 500);

  textSize(18);
  text(
    bodyStats[bodyIndex].name + " " +
    headStats[headIndex].name + " " +
    weaponStats[weaponIndex].name,
    width / 2, 475
  );
}
