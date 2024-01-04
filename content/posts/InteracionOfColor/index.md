+++
title = "Color Exercise for Interaction of Color, using CSS"
date = 2024-01-03T13:25:02+08:00
draft = false
+++

{{<lead>}}
 You should always doubt the color you see with your eyes. 
{{</lead>}}


<div class="interaction-of-color">
  <div class="square-background" id="sb-1" style="--ground-color: white;">
    <div class="square-element" id="se-1" style="--element-color: white;"></div>
  </div>
  <div class="square-background" id="sb-2" style="--ground-color: white;">
    <div class="square-element" id="se-2" style="--element-color: white;"></div>
  </div>
</div>
<label for="color-picker">Color Picker:</label>
<input type="color" id="ground-color-picker-1" value="#A0BEDC">
<input type="color" id="element-color-picker-1" value="#B9D296">
<input type="color" id="ground-color-picker-2" value="#F5E664">
<input type="color" id="element-color-picker-2" value="#B9D296">

<script>
let sb1, sb2, se1, se2;
window.addEventListener("load", startup, false);

function setupColorPicker(picker, setStyleLambda) {
  picker.addEventListener("input", setStyleLambda, false);
  picker.addEventListener("change", setStyleLambda, false);
}

function startup() {
  var groundColorPicker1 = document.querySelector("#ground-color-picker-1");
  var groundColorPicker2 = document.querySelector("#ground-color-picker-2");
  var elementColorPicker1 = document.querySelector("#element-color-picker-1");
  var elementColorPicker2 = document.querySelector("#element-color-picker-2");
  sb1 = document.querySelector("#sb-1");
  sb2 = document.querySelector("#sb-2");
  se1 = document.querySelector("#se-1");
  se2 = document.querySelector("#se-2");
  setupColorPicker(groundColorPicker1, (event) => {setStyle(event, sb1, '--ground-color')});
  setupColorPicker(groundColorPicker2, (event) => {setStyle(event, sb2, '--ground-color')});
  setupColorPicker(elementColorPicker1, (event) => {setStyle(event, se1, '--element-color')});
  setupColorPicker(elementColorPicker2, (event) => {setStyle(event, se2, '--element-color')});
  setStyleProperty(groundColorPicker1.value, sb1, '--ground-color');
  setStyleProperty(groundColorPicker2.value, sb2, '--ground-color');
  setStyleProperty(elementColorPicker1.value, se1, '--element-color');
  setStyleProperty(elementColorPicker2.value, se2, '--element-color');
}

function setStyleProperty(propertyValue, target, propertyName) {
  target.style.setProperty(propertyName, propertyValue);
  console.log(target);
  console.log(propertyName);
  console.log(propertyValue);
}

function setStyle(event, target, propertyName) {
  setStyleProperty(event.target.value, target, propertyName);
}

// function updateFirst(event) {
//   const p = document.querySelector("#test-div");
//   if (p) {
//     p.style.color = event.target.value;
//   }
// }
// function updateAll(event) {
//   document.querySelectorAll("#test-div").forEach((p) => {
//     p.style.color = event.target.value;
//   });
// }
</script>