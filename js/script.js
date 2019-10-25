"use strict";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDhYg-tHBT7IKyVAd9LEJGrWvYJiwtDaqs",
  authDomain: "arla-go-green.firebaseapp.com",
  databaseURL: "https://arla-go-green.firebaseio.com",
  projectId: "arla-go-green",
  storageBucket: "arla-go-green.appspot.com",
  messagingSenderId: "187458490910",
  appId: "1:187458490910:web:674e131f94c6cc7a73540f"
};
// Initialize Firebase and database references
firebase.initializeApp(firebaseConfig);


// Database with the collections: advice, years & farms
const db = firebase.firestore();
const advRef = db.collection("adivce");
const farmRef = db.collection("sustainabilityData");
const dataRef = db.collection("data");
let sustainabilityData;



// listen for changes on dataRef
farmRef.orderBy("year").onSnapshot(function(snapshotData) {
  sustainabilityData = []; // reset sustainabilityData
  snapshotData.forEach(doc => { // loop through snapshotData - like for of loop
    let data = doc.data(); // save the data in a variable
    data.id = doc.id; // add the id to the data variable
    sustainabilityData.push(data); // push the data object to the global array sustainabilityData
  });
  console.log(sustainabilityData);
  appendFuelAndElectricity(sustainabilityData);
  appendWater(sustainabilityData);
  appendFeed(sustainabilityData);
  appendFoliageAndWildlife(sustainabilityData);
  appendEcology(sustainabilityData);


});




function upload(){
  let gasUsage = document.querySelector("#gasUsage").value;
  let inputA = document.querySelector("#inputA").value;
  let inputB = document.querySelector("#inputB").value;
  let inputC = document.querySelector("#inputC").value;

  db.collection("sustainabilityData").doc("birkely").update ({
    fuelAndElectricity: gasUsage,
    inputA:inputA,
    inputB: inputB,
    inputC:inputC,
    ecoPercentage: 66,
    fWInitiatives: 7,
    farm: "DK1-north",
    feed: 4900,
    water: 3607,
    year: 2019
  });

}




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

hideGraphs();
function hideGraphs(){
  let graphs = document.querySelectorAll(".graph");
  for(let graph of graphs){
    graph.style.display = "none";
  }
}

function showGraph(graphId){
  hideGraphs();
  collapse();
  console.log(graphId);
  document.getElementById(graphId).style.display="block";
  document.querySelector(`#${graphId} .content`).style.display="block";
}


//
// let coll = document.getElementsByClassName("collapsible");
// let i;
//
// for (i = 0; i < coll.length; i++) {
//   coll[i].addEventListener("click", function() {
//     this.classList.toggle("active");
//     let content = this.nextElementSibling;
//     if (content.style.display === "block") {
//       content.style.display = "none";
//       hideGraphs();
//     } else {
//
//       content.style.display = "block";
//
//     }
//   });
// }

function collapse(){
  let elements = document.getElementsByClassName("content");
  for (let element of elements){
    element.style.display = "none";
  }

}
