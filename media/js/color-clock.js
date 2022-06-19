var timer;
var bodyElem = document.getElementById("body");
var body = bodyElem.style;
var color = document.getElementById("colorSection").style;
var clock = document.getElementById("clockDiv").style;
const backgroundColor = "background-color";
const defaultClass = "regular-background";
const shadow = "shadowed-text";

var modeOptions = ["rgb", "bgr", "gbr", "rbg", "brg", "grb"];
var modeIndex = 0;
var mode = modeOptions[modeIndex];
function changeMode() {
  modeIndex++;
  modeIndex = modeIndex % modeOptions.length;
  mode = modeOptions[modeIndex];
  setModeText(mode);
}
function setModeText(mode) {
  document.getElementById("mode").textContent = mode;
}

function changeBackground(colorString) {
  body[backgroundColor] = colorString;
}
function prepareBackground() {
  var currentBacground = window
    .getComputedStyle(bodyElem)
    .getPropertyValue(backgroundColor);
  bodyElem.classList.remove(defaultClass);
  body[backgroundColor] = currentBacground;
}
function resetBackground() {
  body.removeProperty(backgroundColor);
  bodyElem.classList.add(defaultClass);
}

function addShadow() {
  bodyElem.classList.add(shadow);
}

function removeShadow() {
  bodyElem.classList.remove(shadow);
}

function convertToRGB(h, m, s, mode) {
  var colorDict = {};
  colorDict[mode[0]] = h;
  colorDict[mode[1]] = m;
  colorDict[mode[2]] = s;

  return (
    "rgb(" + colorDict["r"] + "," + colorDict["g"] + "," + colorDict["b"] + ")"
  );
}

function getColorFromTime(d, mode) {
  var hourCoeff = 256.0 / 24;
  var minuteCoeff = 256.0 / 60;
  var secondCoeff = minuteCoeff;
  var hourColor = d.getHours() * hourCoeff;
  hourColor = hourColor.toFixed();
  var minuteColor = d.getMinutes() * minuteCoeff;
  minuteColor = minuteColor.toFixed();
  var secondColor = d.getSeconds() * secondCoeff;
  secondColor = secondColor.toFixed();
  return convertToRGB(hourColor, minuteColor, secondColor, mode);
}

function zP(num) {
  if (num == 0) return "00";
  if (num < 10) return "0" + num;
  return "" + num;
}

function hours(d) {
  return zP(d.getHours()) + "h";
}

function minutes(d) {
  return zP(d.getMinutes()) + "m";
}

function seconds(d) {
  return zP(d.getSeconds()) + "s";
}
function setTimeText(d) {
  document.getElementById("time").textContent =
    hours(d) + ":" + minutes(d) + ":" + seconds(d);
}

function tickClock() {
  var d = new Date();
  changeBackground(getColorFromTime(d, mode));
  setTimeText(d);
}

function switchTextToClock() {
  clock.display = "inline-block";
  color.display = "none";
}
function switchClockToText() {
  clock.display = "none";
  color.display = "inline-block";
}

function removeClock() {
  clearInterval(timer);
  resetBackground();
  removeShadow();
  switchClockToText();
}

function startClock() {
  timer = setInterval(tickClock);
  switchTextToClock();
  setModeText(mode);
  prepareBackground();
  addShadow();
}
document.getElementById("colorSection").onclick = startClock;
document.getElementById("closeButton").onclick = removeClock;
document.getElementById("mode").onclick = changeMode;
