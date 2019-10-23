"use strict";
// ========== GLOBAL VARIABLES ========== //
// Your web app's Firebase configuration
const _db = firebase.firestore();
const _dataRef = _db.collection("sustainabilityData");
let _sustainabilityData;

// listen for changes on _dataRef
_dataRef.orderBy("year").onSnapshot(function(snapshotData) {
  _sustainabilityData = []; // reset _sustainabilityData
  snapshotData.forEach(doc => { // loop through snapshotData - like for of loop
    let data = doc.data(); // save the data in a variable
    data.id = doc.id; // add the id to the data variable
    _sustainabilityData.push(data); // push the data object to the global array _sustainabilityData
  });
  console.log(_sustainabilityData);
  appendFuelAndElectricity(_sustainabilityData);
  appendWater(_sustainabilityData);
  appendFeed(_sustainabilityData);
  appendFoliageAndWildlife(_sustainabilityData);
  appendEcology(_sustainabilityData);
});

// Energy
function appendFuelAndElectricity(sustainabilityData) {
  // prepare data
  let fuelAndElectricity = [];
  let years = [];
  sustainabilityData.forEach(data => {
    if (data.farm === 'DK1-north') {
      fuelAndElectricity.push(data.fuelAndElectricity);
      years.push(data.year);
    }
  });

  let chart = document.querySelector('#energy');
  let myDoughnutChart = new Chart(chart, {
    type: 'bar',
    data: {
      datasets: [{
        data: fuelAndElectricity,
        label: 'CO2 emission (tons)',
        fill: false,
        borderColor: "#e755ba",
        backgroundColor: "#e755ba",
        pointBackgroundColor: "#55bae7",
        pointBorderColor: "#55bae7",
        pointHoverBackgroundColor: "#55bae7",
        pointHoverBorderColor: "#55bae7",
      }],
      labels: years
    },
    options: {
      scales: {
        yAxes: [{
          ticks: {
            min: (Math.min(...fuelAndElectricity) - 5),
            max: (Math.max(...fuelAndElectricity) + 1)
          }
        }]
      }
    }
  });
}

// Water usage
function appendWater(sustainabilityData) {
  // prepare data
  let water = [];
  let years = [];
  sustainabilityData.forEach(data => {
    if (data.farm === 'DK1-north') {
      water.push(data.water);
      years.push(data.year);
    }
  });

  let chart = document.querySelector('#water');
  let myDoughnutChart = new Chart(chart, {
    type: 'bar',
    data: {
      datasets: [{
        data: water,
        label: 'Amount in cubic meters (1000 litres)',
        fill: false,
        borderColor: "#e755ba",
        backgroundColor: "#e755ba",
        pointBackgroundColor: "#55bae7",
        pointBorderColor: "#55bae7",
        pointHoverBackgroundColor: "#55bae7",
        pointHoverBorderColor: "#55bae7",
      }],
      labels: years
    },
    options: {
      scales: {
        yAxes: [{
          ticks: {
            min: (Math.min(...water) - 100),
            max: (Math.max(...water) + 100)
          }
        }]
      }
    }
  });
}

// Feed
function appendFeed(sustainabilityData) {
  // prepare data
  let feed = [];
  let years = [];
  sustainabilityData.forEach(data => {
    if (data.farm === 'DK1-north') {
      feed.push(data.feed);
      years.push(data.year);
    }
  });

  let chart = document.querySelector('#feed');
  let myDoughnutChart = new Chart(chart, {
    type: 'bar',
    data: {
      datasets: [{
        data: feed,
        label: 'Dry feed usage (tons)',
        fill: false,
        borderColor: "#e755ba",
        backgroundColor: "#e755ba",
        pointBackgroundColor: "#55bae7",
        pointBorderColor: "#55bae7",
        pointHoverBackgroundColor: "#55bae7",
        pointHoverBorderColor: "#55bae7",
      }],
      labels: years
    },
    options: {
      scales: {
        yAxes: [{
          ticks: {
            min: (Math.min(...feed) - 100),
            max: (Math.max(...feed) + 100)
          }
        }]
      }
    }
  });
}

// Foliage & wildlife
function appendFoliageAndWildlife(sustainabilityData) {
  // prepare data
  let fWInitiatives = [];
  let years = [];
  sustainabilityData.forEach(data => {
    if (data.farm === 'DK1-north') {
      fWInitiatives.push(data.fWInitiatives);
      years.push(data.year);
    }
  });

  let chart = document.querySelector('#wild');
  let myDoughnutChart = new Chart(chart, {
    type: 'bar',
    data: {
      datasets: [{
        data: fWInitiatives,
        label: 'Number of initiatives',
        fill: false,
        borderColor: "#e755ba",
        backgroundColor: "#e755ba",
        pointBackgroundColor: "#55bae7",
        pointBorderColor: "#55bae7",
        pointHoverBackgroundColor: "#55bae7",
        pointHoverBorderColor: "#55bae7",
      }],
      labels: years
    },
    options: {
      scales: {
        yAxes: [{
          ticks: {
            min: (Math.min(...fWInitiatives) - 2),
            max: (Math.max(...fWInitiatives) + 1)
          }
        }]
      }
    }
  });
}

// Ecology
function appendEcology(sustainabilityData) {
  // prepare data
  let eco = [];
  let years = [];
  sustainabilityData.forEach(data => {
    if (data.farm === 'DK1-north') {
      eco.push(data.ecoPercentage);
      years.push(data.year);
    }
  });

  let chart = document.querySelector('#ecology');
  let myDoughnutChart = new Chart(chart, {
    type: 'bar',
    data: {
      datasets: [{
        data: eco,
        label: 'Percentage of ecological crops',
        fill: false,
        borderColor: "#e755ba",
        backgroundColor: "#e755ba",
        pointBackgroundColor: "#55bae7",
        pointBorderColor: "#55bae7",
        pointHoverBackgroundColor: "#55bae7",
        pointHoverBorderColor: "#55bae7",
      }],
      labels: years
    },
    options: {
      scales: {
        yAxes: [{
          ticks: {
            min: (Math.min(...eco) - 2),
            max: (Math.max(...eco) + 1)
          }
        }]
      }
    }
  });
}
