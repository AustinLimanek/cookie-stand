'use strict';

let startTime = 6;
let endTime = 7;
let hoursOpen = 12 - startTime + endTime + 1;
let time = [];
let cities = [['Seattle', 23, 65, 6.3], ['Tokyo', 3, 24, 1.2], ['Dubai', 11, 38, 3.7], ['Paris', 20, 38, 2.3], ['Lima', 2, 16, 4.6]];
let tableSpace = document.getElementById('summaryTable');
let tableEl = document.createElement('table');
tableSpace.appendChild(tableEl);

function busiTime() {
  for (let i = startTime; i <= startTime + hoursOpen; i++){
    if (i < 12){
      time[i - startTime] = i + "am";
    }
    else if (i == 12){
      time[i - startTime] = i + "pm";
    }
    else if (i > 12 && i < startTime + hoursOpen){
      time[i - startTime] = i % 12 + "pm";
    }
    else{
      time[i - startTime] = "Daily Location Total";
    }
  }
  return time;
}

function sumArray(array){
  let sum = 0;
  for (let i = 0; i < array.length; i++){
    sum += array[i];
  }
  return sum;
}

function City(name, min, max, avgCookie){
  this.name = name;
  this.min = min;
  this.max = max;
  this.avgCookie = avgCookie;
  this.customer = [];
  this.cookieSold = [];

  this.visCount = function (){
    for (let i = 0; i < hoursOpen; i++){
      this.customer[i] = Math.random()*(this.max - this.min) + this.min;
    }
    return this.customer;
  };

  this.cookCount = function (customer){
    for (let i = 0; i < hoursOpen; i++){
      if (i < hoursOpen){
        this.cookieSold[i] = customer[i]*this.avgCookie;
      }
      else{
        this.cookieSold[i] = sumArray(this.cookieSold);
      }
    }
    return this.cookieSold;
  };

  this.displayCookiePerHour = function (){
    let cookiePrintByCity = document.getElementById('results');
    
    let nameElement = document.createElement('h3');
    cookiePrintByCity.appendChild(nameElement);
    nameElement.textContent = name;

    let listElement = document.createElement('ul');
    cookiePrintByCity.appendChild(listElement);

    for (let i = 0; i < hoursOpen; i++){
      let listItemElement = document.createElement('li');
      listItemElement.textContent = time[i] + ': ' + Math.round(this.cookieSold[i]) + ' cookies';
      listElement.appendChild(listItemElement);
    }

    let totalElement = document.createElement('li');
    totalElement.textContent = time[hoursOpen] + ': ' + Math.round(sumArray(this.cookieSold)) + ' cookies';
    listElement.appendChild(totalElement);
  }

  this.printRow = function (){
    let tableRow = document.createElement('tr');
    let nameEntry = document.createElement('td');
    tableEl.appendChild(tableRow);
    tableRow.appendChild(nameEntry);
    nameEntry.textContent = name;
    this.cookieSold[hoursOpen] = Math.round(sumArray(this.cookieSold));

    for (let i = 0; i <= hoursOpen; i++){
      let dataEntry = document.createElement('td');
      dataEntry.textContent = Math.round(this.cookieSold[i]);
      tableRow.appendChild(dataEntry);
    }
  }
}

busiTime();

let Seattle = new City(cities[0][0], cities[0][1], cities[0][2], cities[0][3]);
let Tokyo = new City(cities[1][0], cities[1][1], cities[1][2], cities[1][3]);
let Dubai = new City(cities[2][0], cities[2][1], cities[2][2], cities[2][3]);
let Paris = new City(cities[3][0], cities[3][1], cities[3][2], cities[3][3]);
let Lima = new City(cities[4][0], cities[4][1], cities[4][2], cities[4][3]);

let objCity = [Seattle, Tokyo, Dubai, Paris, Lima];

function tableHead (){
  let tableHead = document.createElement('th');
  tableEl.appendChild(tableHead);
  let timeEntry = document.createElement('td');
  tableHead.appendChild(timeEntry);
  timeEntry.textContent = "";

  for (let i = 0; i <= hoursOpen; i++) {
    let tableHead = document.createElement('th');
    tableEl.appendChild(tableHead);
    let timeEntry = document.createElement('td');
    tableHead.appendChild(timeEntry);
    timeEntry.textContent = time[i];
    }
}

tableHead();

function genData() {
  for (let i = 0; i < objCity.length; i++){
    objCity[i].visCount();
    objCity[i].cookCount(objCity[i].customer);
  }
}

genData();

function dataPrint (){
  for (let i = 0; i <5; i++){
    objCity[i].printRow();
  }
}

dataPrint();

function totalArray (){
  let total = new Array(hoursOpen+1).fill(0);
  for (let i = 0; i <= hoursOpen; i++){
    for(let x = 0; x < objCity.length; x++){
      total[i] += objCity[x].cookieSold[i];
    }
  }
  return total;
}

totalArray();

function printTotal (array){
  let tableTotal = document.createElement('tr');
  tableEl.appendChild(tableTotal);
  let totalEntry = document.createElement('td');
  tableTotal.appendChild(totalEntry);
  totalEntry.textContent = 'Totals';

  for (let i = 0; i <= hoursOpen; i++) {
    let totalEntry = document.createElement('td');
    tableTotal.appendChild(totalEntry);
    totalEntry.textContent = Math.round(array[i]);
    }
}

printTotal(totalArray());

// let seattle = {
//   min: 23,
//   max: 65,
//   avgCookie: 6.3,
//   customer: [],
//   cookieSold: [],

//   visCount: function (){
//     for (let i = 0; i < hoursOpen; i++){
//       this.customer[i] = Math.random()*(this.max - this.min) + this.min;
//     }
//     return this.customer;
//   },

//   cookCount: function (customer){
//     for (let i = 0; i < hoursOpen; i++){
//       if (i < hoursOpen){
//         this.cookieSold[i] = customer[i]*this.avgCookie;
//       }
//       else{
//         this.cookieSold[i] = sumArray(this.cookieSold);
//       }
//     }
//     return this.cookieSold;
//   },

//   displayCookiePerHour: function (){
//     let cookiePrintByCity = document.getElementById('results');
    
//     let nameElement = document.createElement('h3');
//     cookiePrintByCity.appendChild(nameElement);
//     nameElement.textContent = 'Seattle';

//     let listElement = document.createElement('ul');
//     cookiePrintByCity.appendChild(listElement);

//     for (let i = 0; i < hoursOpen; i++){
//       let listItemElement = document.createElement('li');
//       listItemElement.textContent = time[i] + Math.round(this.cookieSold[i]) + ' cookies';
//       listElement.appendChild(listItemElement)
//     }

//     let totalElement = document.createElement('li');
//     totalElement.textContent = time[hoursOpen] + Math.round(sumArray(this.cookieSold)) + ' cookies';
//     listElement.appendChild(totalElement);
//   }
// }

// let tokyo = {
//   min: 3,
//   max: 24,
//   avgCookie: 1.2,
//   customer: [],
//   cookieSold: [],

//   visCount: function (){
//     for (let i = 0; i < hoursOpen; i++){
//       this.customer[i] = Math.random()*(this.max - this.min) + this.min;
//     }
//     return this.customer;
//   },

//   cookCount: function (customer){
//     for (let i = 0; i < hoursOpen; i++){
//       if (i < hoursOpen){
//         this.cookieSold[i] = customer[i]*this.avgCookie;
//       }
//       else{
//         this.cookieSold[i] = sumArray(this.cookieSold);
//       }
//     }
//     return this.cookieSold;
//   },

//   displayCookiePerHour: function (){
//     let cookiePrintByCity = document.getElementById('results');
    
//     let nameElement = document.createElement('h3');
//     cookiePrintByCity.appendChild(nameElement);
//     nameElement.textContent = 'Tokyo';
    
//     let listElement = document.createElement('ul');
//     cookiePrintByCity.appendChild(listElement);

//     for (let i = 0; i < hoursOpen; i++){
//       let listItemElement = document.createElement('li');
//       listItemElement.textContent = time[i] + Math.round(this.cookieSold[i]) + ' cookies';
//       listElement.appendChild(listItemElement)
//     }

//     let totalElement = document.createElement('li');
//     totalElement.textContent = time[hoursOpen] + Math.round(sumArray(this.cookieSold)) + ' cookies';
//     listElement.appendChild(totalElement);
//   }
// }

// let dubai = {
//   min: 11,
//   max: 38,
//   avgCookie: 3.7,
//   customer: [],
//   cookieSold: [],

//   visCount: function (){
//     for (let i = 0; i < hoursOpen; i++){
//       this.customer[i] = Math.random()*(this.max - this.min) + this.min;
//     }
//     return this.customer;
//   },

//   cookCount: function (customer){
//     for (let i = 0; i < hoursOpen; i++){
//       if (i < hoursOpen){
//         this.cookieSold[i] = customer[i]*this.avgCookie;
//       }
//       else{
//         this.cookieSold[i] = sumArray(this.cookieSold);
//       }
//     }
//     return this.cookieSold;
//   },

//   displayCookiePerHour: function (){
//     let cookiePrintByCity = document.getElementById('results');
    
//     let nameElement = document.createElement('h3');
//     cookiePrintByCity.appendChild(nameElement);
//     nameElement.textContent = 'Dubai';

//     let listElement = document.createElement('ul');
//     cookiePrintByCity.appendChild(listElement);

//     for (let i = 0; i < hoursOpen; i++){
//       let listItemElement = document.createElement('li');
//       listItemElement.textContent = time[i] + Math.round(this.cookieSold[i]) + ' cookies';
//       listElement.appendChild(listItemElement)
//     }

//     let totalElement = document.createElement('li');
//     totalElement.textContent = time[hoursOpen] + Math.round(sumArray(this.cookieSold)) + ' cookies';
//     listElement.appendChild(totalElement);
//   }
// }

// let paris = {
//   min: 20,
//   max: 38,
//   avgCookie: 2.3,
//   customer: [],
//   cookieSold: [],

//   visCount: function (){
//     for (let i = 0; i < hoursOpen; i++){
//       this.customer[i] = Math.random()*(this.max - this.min) + this.min;
//     }
//     return this.customer;
//   },

//   cookCount: function (customer){
//     for (let i = 0; i < hoursOpen; i++){
//       if (i < hoursOpen){
//         this.cookieSold[i] = customer[i]*this.avgCookie;
//       }
//       else{
//         this.cookieSold[i] = sumArray(this.cookieSold);
//       }
//     }
//     return this.cookieSold;
//   },

//   displayCookiePerHour: function (){
//     let cookiePrintByCity = document.getElementById('results');
    
//     let nameElement = document.createElement('h3');
//     cookiePrintByCity.appendChild(nameElement);
//     nameElement.textContent = 'Paris';

//     let listElement = document.createElement('ul');
//     cookiePrintByCity.appendChild(listElement);

//     for (let i = 0; i < hoursOpen; i++){
//       let listItemElement = document.createElement('li');
//       listItemElement.textContent = time[i] + Math.round(this.cookieSold[i]) + ' cookies';
//       listElement.appendChild(listItemElement)
//     }

//     let totalElement = document.createElement('li');
//     totalElement.textContent = time[hoursOpen] + Math.round(sumArray(this.cookieSold)) + ' cookies';
//     listElement.appendChild(totalElement);
//   }
// }

// let lima = {
//   min: 2,
//   max: 16,
//   avgCookie: 4.6,
//   customer: [],
//   cookieSold: [],

//   visCount: function (){
//     for (let i = 0; i < hoursOpen; i++){
//       this.customer[i] = Math.random()*(this.max - this.min) + this.min;
//     }
//     return this.customer;
//   },

//   cookCount: function (customer){
//     for (let i = 0; i < hoursOpen; i++){
//       if (i < hoursOpen){
//         this.cookieSold[i] = customer[i]*this.avgCookie;
//       }
//       else{
//         this.cookieSold[i] = sumArray(this.cookieSold);
//       }
//     }
//     return this.cookieSold;
//   },

//   displayCookiePerHour: function (){
//     let cookiePrintByCity = document.getElementById('results');
    
//     let nameElement = document.createElement('h3');
//     cookiePrintByCity.appendChild(nameElement);
//     nameElement.textContent = 'Lima';

//     let listElement = document.createElement('ul');
//     cookiePrintByCity.appendChild(listElement);

//     for (let i = 0; i < hoursOpen; i++){
//       let listItemElement = document.createElement('li');
//       listItemElement.textContent = time[i] + Math.round(this.cookieSold[i]) + ' cookies';
//       listElement.appendChild(listItemElement)
//     }

//     let totalElement = document.createElement('li');
//     totalElement.textContent = time[hoursOpen] + Math.round(sumArray(this.cookieSold)) + ' cookies';
//     listElement.appendChild(totalElement);
//   }
// }

// let visPerHour = seattle.visCount();
// let cookPerHour = seattle.cookCount(seattle.customer);
// console.log(visPerHour);
// console.log(cookPerHour);

// tokyo.visCount();
// seattle.cookCount(seattle.customer);
// seattle.displayCookiePerHour();

// tokyo.visCount();
// tokyo.cookCount(tokyo.customer);
// tokyo.displayCookiePerHour();

// dubai.visCount();
// dubai.cookCount(dubai.customer);
// dubai.displayCookiePerHour();

// paris.visCount();
// paris.cookCount(paris.customer);
// paris.displayCookiePerHour();

// lima.visCount();
// lima.cookCount(lima.customer);
// lima.displayCookiePerHour();
