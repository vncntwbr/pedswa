// Load Data
const data = fetch('peds.json')
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error('Error reading JSON:', error));

const broselow = [
  {color:'#008000', zone:'Green', weightMin:30, ageMin:120, ageSlider:15, lengthMin:131, font:'#FFF'},
  {color:'#FFA500', zone:'Orange', weightMin:24, ageMin:108, ageSlider:14, lengthMin:122, font:'#000'},
  {color:'#FFA500', zone:'Orange', weightMin:24, ageMin:96, ageSlider:13, lengthMin:122, font:'#000'},
  {color:'#0000FF', zone:'Blue', weightMin:19, ageMin:84, ageSlider:12, lengthMin:108, font:'#FFF'},
  {color:'#0000FF', zone:'Blue', weightMin:19, ageMin:72, ageSlider:11, lengthMin:108, font:'#FFF'},
  {color:'#FFFFFF', zone:'White', weightMin:15, ageMin:60, ageSlider:10, lengthMin:95, font:'#000'},
  {color:'#FFFFFF', zone:'White', weightMin:15, ageMin:48, ageSlider:9, lengthMin:95, font:'#000'},
  {color:'#FFFF00', zone:'Yellow', weightMin:12, ageMin:36, ageSlider:8, lengthMin:84, font:'#000'},
  {color:'#FFFF00', zone:'Yellow', weightMin:12, ageMin:24, ageSlider:7, lengthMin:84, font:'#000'},
  {color:'#800080', zone:'Purple', weightMin:10, ageMin:12, ageSlider:6, lengthMin:74, font:'#FFF'},
  {color:'#FF0000', zone:'Red', weightMin:8, ageMin:10, ageSlider:5, lengthMin:67, font:'#FFF'},
  {color:'#FF0000', zone:'Red', weightMin:8, ageMin:8, ageSlider:4, lengthMin:67, font:'#FFF'},
  {color:'#FFBFCA', zone:'Pink', weightMin:6, ageMin:6, ageSlider:3, lengthMin:59, font:'#000'},
  {color:'#FFBFCA', zone:'Pink', weightMin:6, ageMin:4, ageSlider:2, lengthMin:59, font:'#000'},
  {color:'#808080', zone:'Grey', weightMin:3, ageMin:2, ageSlider:1, lengthMin:46, font:'#FFF'},
  {color:'#808080', zone:'Grey', weightMin:3, ageMin:0, ageSlider:0, lengthMin:46, font:'#FFF'}
];

// Sync all sliders - called when any changes
function syncSliders(changed) {
  const lengthVal = parseFloat(document.getElementById('length').value);
  const weightVal = parseFloat(document.getElementById('weight').value);
  const ageVal = parseFloat(document.getElementById('age').value);
  
  let newLength, newWeight, newAge;
  let zone;

  if (changed === 'length') {
    zone = broselow.find(z => lengthVal >= z.lengthMin); //finds the first match in broselow where lengthVal >= lengthMin
    console.log(zone.zone)
    newWeight = zone ? zone.weightMin : weightVal;
    newAge = zone ? zone.ageSlider : ageVal;
    newLength = lengthVal;
  }
  else if (changed === 'weight') {
    zone = broselow.find(z => weightVal >= z.weightMin);
    console.log(zone.zone)
    newLength = zone ? zone.lengthMin : lengthVal;
    newAge = zone ? zone.ageSlider : ageVal;
    newWeight = weightVal;
  } 
  else { // age changed
    zone = broselow.find(z => ageVal >= z.ageSlider);
    console.log(zone.zone)
    newWeight = zone ? zone.weightMin : weightVal;
    newLength = zone ? zone.lengthMin : lengthVal;
    newAge = ageVal;
  }
  
  // Update all sliders/values (prevents infinite loop)
  document.getElementById('length').value = Math.max(46, Math.min(145, newLength));
  document.getElementById('weight').value = Math.max(3, Math.min(40, newWeight));
  document.getElementById('age').value = Math.max(0, Math.min(120, newAge));
  
  // Update displays
  document.getElementById('length-value').textContent = `${newLength} cm`;
  document.getElementById('weight-value').textContent = `${newWeight} kg`;
  const trueAge = zone.ageMin;
  const trueAgeYearsRounded = (trueAge/12).toFixed(1)
  if (trueAge <= 12) {
    document.getElementById('age-value').textContent = `${trueAge} months = ${trueAgeYearsRounded} years`;
  } else {
    document.getElementById('age-value').textContent = `${trueAge/12} years`;
  }

  updateTapeDisplay(zone.color, zone.font);
  calculate(data); // Auto-update doses
}

function updateTapeDisplay(color, font) {
    document.getElementById('tape-display').style.backgroundColor = color;
    document.getElementById('tape-display').style.color = font;
}

// Init on load
document.addEventListener('DOMContentLoaded', () => {
  syncSliders(broselow.find(z => 75 >= z.lengthMin));
});

// Append Table

function calculate(data){
  console.log('addRow called with data:', data);
  addRow(data);
  for (const [key, value] of Object.entries(data)) {
    console.log(`${key}: ${value}`);
    //addRow(key, value);
  }
}

function addRow(data) {
  const tbody = document.querySelector("#dataTableBody");
  const row = document.createElement("tr");
  //const cells = []

  for (let i = 1; i <= data.medications.length; i++) {
    const med = data.medications[i];
    console.log('At medications ' + med);

    for (let i = 1; i <= 6; i++) {
      const cell = document.createElement('td');
      cell.textContent = `Cell ${i}` + Object.values(data.medications)[i];
      //cells.push(cell);
      console.log(cell)
      row.appendChild(cell)
    }
  }
  tbody.appendChild(row);
  
/*

  const cell1 = document.createElement("td");
  const cell2 = document.createElement("td");
  const cell3 = document.createElement("td");
  const cell4 = document.createElement("td");
  const cell5 = document.createElement("td");
  const cell6 = document.createElement("td");

  for (const [key, value] of Object.entries(data)) {
      console.log(`${key}: ${value}`);
      //addRow(key, value);
  }

    cell1.textContent = "Value 1";
    cell2.textContent = "Value 2";
    cell3.textContent = "Value 3";

    //for each i 

    row.appendChild(cell1);
    row.appendChild(cell2);
    row.appendChild(cell3);
    tbody.appendChild(row);
    */
}