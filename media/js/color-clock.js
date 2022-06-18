var body = document.getElementById("body").style;
var color = document.getElementById("colorSection").style;
var clock = document.getElementById("clockDiv").style;
var modeOptions = ["rgb", "bgr", "gbr", "rbg", "brg", "grb"];
var modeIndex = 0;
var mode = modeOptions[modeIndex];

function changeMode() {
  modeIndex++;
  modeIndex = modeIndex % modeOptions.length;
  mode = modeOptions[modeIndex];
}
var timer;

function changeColor(colorString) {
  body["background-color"] = colorString;
}

function addShadow() {
  body["text-shadow"] =
    "-1px -1px 0 #444, 1px -1px 0 #444, -1px 1px 0 #444, 1px 1px 0 #444";
}

function removeShadow() {
  body["text-shadow"] = "";
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

function getTime(d) {
  return (
    '<div class="time">' +
    d.getHours() +
    "h:" +
    d.getMinutes() +
    "m:" +
    d.getSeconds() +
    "s" +
    "</div>"
  );
}

function getPrefix(mode) {
  return (
    '<div id="mode-outer">' +
    '<div id="mode">' +
    mode +
    "</div>" +
    '<div id="mode-text"> color from time</div>' +
    "</div>"
  );
}
function displayClock() {
  var d = new Date();
  changeColor(getColorFromTime(d, mode));
  var displayText = "Current background <br/> " + getPrefix(mode) + getTime(d);
  document.getElementById("clock").innerHTML = displayText;
}

function removeClock() {
  clearInterval(timer);
  changeColor("#087457");
  removeShadow();
  clock.display = "none";
  color.display = "inline-block";
}

function startClock() {
  timer = setInterval(displayClock);
  clock.display = "inline-block";
  color.display = "none";
  addShadow();
}
document.getElementById("colorSection").onclick = startClock;
document.getElementById("closeButton").onclick = removeClock;
document.getElementById("clock").onclick = changeMode;
