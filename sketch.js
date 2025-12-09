let screen = "intro";

let heads = [];
let bodies = [];
let weapons = [];
let t_heads = [];
let t_bodies = [];
let t_weapons = [];

let headStats, bodyStats, weaponStats;

let headIndex = -1;
let bodyIndex = -1;
let weaponIndex = -1;

let statsJSON;
let bgImage;
let clickSound;
let bgMusic;
let bgLayer;

// button size and location
let resetBtn = { x: 40, y: 425, w: 100, h: 30 };
let createBtn = { x: 160, y: 425, w: 100, h: 30 };
let startBtn = { x: 450, y: 340, w: 200, h: 50 };
let muteBtn = { x: 955, y: 550, w: 120, h: 30 };

function preload() {
  statsJSON = loadJSON("stats.json");

  // head thumbnails
  for (let i = 1; i <= 5; i++) {
    heads.push(loadImage(`assets/head${i}.png`));
    t_heads.push(loadImage(`assets/t_head${i}.png`));
  }

  // bodies
  for (let i = 1; i <= 5; i++) {
    bodies.push(loadImage(`assets/body${i}.png`));
    t_bodies.push(loadImage(`assets/t_body${i}.png`));
  }

  // weapons
  for (let i = 1; i <= 5; i++) {
    weapons.push(loadImage(`assets/weapon${i}.png`));
    t_weapons.push(loadImage(`assets/t_weapon${i}.png`));
  }

  bgImage = loadImage("assets/bgimage.png");
  bgLayer = loadImage("assets/background.png");
  clickSound = loadSound("assets/click.wav"); // single click sound
  clickSound.setVolume(2.1);

  bgMusic = loadSound("assets/bgMusic.mp3");
}

function setup() {
  let cnv = createCanvas(1100, 600);
  cnv.parent("canvas-container");
  textAlign(CENTER);
  textFont("IBM Plex Mono");

  headStats = statsJSON.heads;
  bodyStats = statsJSON.bodies;
  weaponStats = statsJSON.weapons;
}

function draw() {
  background(235);

  if (screen === "intro") {
    drawIntroScreen();
  } else if (screen === "creator") {
    drawCharacterCreator();
  }
}

function drawIntroScreen() {
  noSmooth();
  image(bgLayer, 0, 0, 1100, 600);
  fill(255);
  textSize(45);
  text("Create Your Custom Character!", width / 2, 225);

  fill(200);
  rect(startBtn.x, startBtn.y, startBtn.w, startBtn.h, 10);

  fill(0);
  textSize(24);
  text("Start", startBtn.x + startBtn.w / 2, startBtn.y + startBtn.h / 2 + 8);
}

function drawCharacterCreator() {
  background(235);
  noSmooth();
  tint(255, 225);
  image(bgLayer, 0, 0, 1100, 600);
  noTint();

  noStroke();
  let pw = 360;
  let ph = 440;
  let px = width / 2 - pw / 2;
  let py = 40;

  // frames for stats and options
  fill(0, 150);
  rect(30, 120, 315, 280, 8);
  fill(0, 150);
  rect(770, 120, 190, 280, 8);

  // character
  image(bgImage, px, py, pw, ph);
  if (headIndex !== -1) image(heads[headIndex], px, py, pw, ph);
  if (bodyIndex !== -1) image(bodies[bodyIndex], px, py, pw, ph);
  if (weaponIndex !== -1) image(weapons[weaponIndex], px, py, pw, ph);

  drawThumbnails();
  drawStatBars(px + pw + 60, py + height / 5);
  drawStats(width / 2, py + ph + 50);
  drawButtons();
}

function drawThumbnails() {
  let yStart = height / 4;
  let x = 40;
  textAlign(LEFT);
  
  // heads
  for (let i = 0; i < heads.length; i++) {
    fill(230);
    rect(x, yStart, 50, 50, 8);
    
    image(t_heads[i], x, yStart, 50, 50);
    
    drawHighlight(headIndex === i, x, yStart, 50, 50);
    x += 60;
  }

  textSize(16);
  fill(255);
  text("Head", 40, yStart - 10);

  // bodies
  yStart += 90;
  x = 40;

  for (let i = 0; i < bodies.length; i++) {
    
    fill(230);
    rect(x, yStart, 50, 50, 8);
    image(t_bodies[i], x, yStart, 50, 50);

    drawHighlight(bodyIndex === i, x, yStart, 50, 50);
    x += 60;
  }

  text("Clothing", 40, yStart - 10);

  // weapons
  yStart += 90;
  x = 40;

  for (let i = 0; i < weapons.length; i++) {
    
    fill(230);
    rect(x, yStart, 50, 50, 8);
    image(t_weapons[i], x, yStart, 50, 50);

    drawHighlight(weaponIndex === i, x, yStart, 50, 50);
    x += 60;
  }

  text("Weapon", 40, yStart - 10);
}

function drawStatBars(x, y) {
  textAlign(LEFT);
  textSize(16);
  fill(255);
  text("Stats", x + 50, height / 4 - 10);

  let spacing = 80;

  let headValue = headIndex !== -1 ? headStats[headIndex].power : 0;
  let weaponValue = weaponIndex !== -1 ? weaponStats[weaponIndex].power : 0;
  let bodyValue = bodyIndex !== -1 ? bodyStats[bodyIndex].power : 0;

  drawSingleBar("Brains", headValue, x, y + 20);
  drawSingleBar("Brawn", weaponValue, x, y + 20 + spacing * 2);
  drawSingleBar("Style", bodyValue, x, y + 20 + spacing);
}

function drawSingleBar(label, value, x, y) {
  fill(255);
  text(label + ": " + value, x, y - 5);

  let maxBarW = 150;
  let w = map(value, 0, 50, 0, maxBarW);

  fill(140);
  rect(x, y + 5, maxBarW, 20);

  fill(0, 220, 50);
  rect(x, y + 5, w, 20);
}

function drawStats(centerX, centerY) {
  textAlign(CENTER);

  if (headIndex === -1 || bodyIndex === -1 || weaponIndex === -1) return;

  let totalPower =
    headStats[headIndex].power +
    bodyStats[bodyIndex].power +
    weaponStats[weaponIndex].power;

  fill(255);
  textSize(22);
  text("Power Level: " + totalPower, centerX, centerY + 20);

  textSize(18);
  text(bodyStats[bodyIndex].name +
      " " +
      headStats[headIndex].name +
      " " +
      weaponStats[weaponIndex].name,
    centerX,
    centerY - 12
  );
}

function drawButtons() {
  fill(200);
  rect(resetBtn.x, resetBtn.y, resetBtn.w, resetBtn.h, 5);
  fill(0);
  textSize(14);
  text("Reset", resetBtn.x + resetBtn.w / 2, resetBtn.y + resetBtn.h / 2 + 5);

  fill(200);
  rect(createBtn.x, createBtn.y, createBtn.w, createBtn.h, 5);
  fill(0);
  text(
    "Save",
    createBtn.x + createBtn.w / 2,
    createBtn.y + createBtn.h / 2 + 5
  );

  fill(200);
  rect(muteBtn.x, muteBtn.y, muteBtn.w, muteBtn.h , 5);

  fill(0);
  textSize(14);
  text(bgMusic.isPlaying() ? "Mute Music" : "Unmute Music",
  muteBtn.x + muteBtn.w / 2,
  muteBtn.y + muteBtn.h / 2 + 5);
}

function mousePressed() {
  if (screen === "intro") {
    if (mouseInside(startBtn.x, startBtn.y, startBtn.w, startBtn.h)) {
      clickSound.play();
      screen = "creator";

      if (!bgMusic.isPlaying()) {
        bgMusic.setVolume(0.2);
        bgMusic.loop();
      }
    }
  } 
  else if (screen === "creator") {
    // reset
    if (mouseInside(resetBtn.x, resetBtn.y, resetBtn.w, resetBtn.h)) {
      headIndex = -1;
      bodyIndex = -1;
      weaponIndex = -1;
      clickSound.play();
    }

    // save
    if (mouseInside(createBtn.x, createBtn.y, createBtn.w, createBtn.h)) {
      saveCharacter();
    }

    // heads
    let yStart = height / 4;
    let x = 40;
    for (let i = 0; i < heads.length; i++) {
      if (mouseInside(x, yStart, 50, 50)) {
        if (headIndex !== i) clickSound.play();
        headIndex = i;
      }
      x += 60;
    }

    // bodies
    yStart += 90;
    x = 40;
    for (let i = 0; i < bodies.length; i++) {
      if (mouseInside(x, yStart, 50, 50)) {
        if (bodyIndex !== i) clickSound.play();
        bodyIndex = i;
      }
      x += 60;
    }

    // weapons
    yStart += 90;
    x = 40;
    for (let i = 0; i < weapons.length; i++) {
      if (mouseInside(x, yStart, 50, 50)) {
        if (weaponIndex !== i) clickSound.play();
        weaponIndex = i;
      }
      x += 60;
    }
  }

  if (mouseInside(muteBtn.x, muteBtn.y, muteBtn.w, muteBtn.h)) {
    clickSound.play();
    if (bgMusic.isPlaying()) {
      bgMusic.pause();
    } else {
      bgMusic.loop();
    }
  }
}

function mouseInside(x, y, w, h) {
  return mouseX > x && mouseX < x + w && mouseY > y && mouseY < y + h;
}

function saveCharacter() {
  if (headIndex === -1 || bodyIndex === -1 || weaponIndex === -1) return;
  let pw = 390;
  let ph = 540;
  let px = width / 2 - pw / 2;
  let py = 30;

  clickSound.play();

  let fileName = prompt("Name your character:", "My Character");

  if (fileName === null) return;

  let charCanvas = get(px, py, pw, ph);
  save(charCanvas, fileName + ".png");
}

function drawHighlight(isSelected, x, y, w, h) {
  if (!isSelected) return;

  push();

  // fill
  noStroke();
  fill(0, 140, 255, 80);
  rect(x - 4, y - 4, w + 8, h + 8, 15);

  // outline
  stroke(255);
  strokeWeight(3);
  noFill();
  rect(x - 2, y - 2, w + 4, h + 4, 10);

  noStroke();

  pop();
}