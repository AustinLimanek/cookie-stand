'use strict';

let startTime = 6;
let endTime = 7;
let hoursOpen = 12 - startTime + endTime + 1;
let time = [];
let cities = [['Seattle', 23, 65, 6.3], ['Tokyo', 3, 24, 1.2], ['Dubai', 11, 38, 3.7], ['Paris', 20, 38, 2.3], ['Lima', 2, 16, 4.6]];
let controlCurve = [0.5, 0.75, 1.0, 0.6, 0.8, 1.0, 0.7, 0.4, 0.6, 0.9, 0.7, 0.5, 0.3, 0.4, 0.6];
let tableSpace = document.getElementById('summaryTable');
let tableEl = document.createElement('table');
tableEl.setAttribute('id', 'data');
tableSpace.appendChild(tableEl);
let table2Space = document.getElementById('employeeTable');
let table2El = document.createElement('table');
table2El.setAttribute('id', 'employee');
table2Space.appendChild(table2El);
let objCity = [];
let formElement = document.getElementById('newCity');

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

function objNameToString(array, property){
  let name = [];
  for (let i = 0; i < array.length; i++){
    name.push(Object.getOwnPropertyDescriptor(array[i], property).value);
  }
  return name;
}

function capFirstLetter(string){
  return string.charAt(0).toUpperCase() + string.toLowerCase().slice(1);
}

function City(name, min, max, avgCookie){
  this.name = name;
  this.min = min;
  this.max = max;
  this.avgCookie = avgCookie;
  this.customer = [];
  this.cookieSold = [];
  this.cookieTosser = [];

  this.visCount = function (){
    for (let i = 0; i < hoursOpen; i++){
      this.customer[i] = Math.random()*(this.max - this.min) + this.min;
      if(this.customer[i] >= 40){
      this.cookieTosser[i] = Math.ceil(this.customer[i]/20);
      }
      else{
        this.cookieTosser[i] = 2;
      }
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

  this.printRow = function (tableNumEl, property){
    let tableRow = document.createElement('tr');
    let nameEntry = document.createElement('td');
    tableNumEl.appendChild(tableRow);
    tableRow.appendChild(nameEntry);
    nameEntry.textContent = name;
    this[property][hoursOpen] = Math.round(sumArray(this[property]));

    for (let i = 0; i <= hoursOpen; i++){
      let dataEntry = document.createElement('td');
      dataEntry.textContent = Math.round(this[property][i]);
      tableRow.appendChild(dataEntry);
    }
  }
}

busiTime();

function fillingPreSetObjCityArray (){
  for (let i = 0; i < cities.length; i++){
    objCity.push(new City(cities[i][0], cities[i][1], cities[i][2], cities[i][3]));
  }
}

fillingPreSetObjCityArray();

function tableHeadRow (tableNumEl){
  let tableHeadRow = document.createElement('tr');
  tableNumEl.appendChild(tableHeadRow);
  let timeEntry = document.createElement('th');
  tableHeadRow.appendChild(timeEntry);
  timeEntry.textContent = 'Location';

  for (let i = 0; i <= hoursOpen; i++) {
    let timeEntry = document.createElement('th');
    tableHeadRow.appendChild(timeEntry);
    timeEntry.textContent = time[i];
    }
}

tableHeadRow(tableEl);
tableHeadRow(table2El);


function genData() {
  for (let i = 0; i < objCity.length; i++){
    objCity[i].visCount();
    objCity[i].cookCount(objCity[i].customer);
  }
}

genData();

function dataPrint (tableNumEl, property){
  for (let i = 0; i < objCity.length; i++){
    objCity[i].printRow(tableNumEl, property);
  }
}

dataPrint(tableEl, 'cookieSold');
dataPrint(table2El, 'cookieTosser');


function totalArray (property){
  let total = new Array(hoursOpen+1).fill(0);
  for (let i = 0; i <= hoursOpen; i++){
    for(let j = 0; j < objCity.length; j++){
      total[i] += objCity[j][property][i];
    }
  }
  return total;
};

function printTotal (array, tableNumEl){
  let tableTotal = document.createElement('tr');
  tableTotal.setAttribute('id', 'total');
  tableNumEl.appendChild(tableTotal);
  let totalEntry = document.createElement('td');
  tableTotal.appendChild(totalEntry);
  totalEntry.textContent = 'Totals';

  for (let i = 0; i <= hoursOpen; i++) {
    let totalEntry = document.createElement('td');
    tableTotal.appendChild(totalEntry);
    totalEntry.textContent = Math.round(array[i]);
    }
};

printTotal(totalArray('cookieSold'), tableEl);
printTotal(totalArray('cookieTosser'), table2El);


formElement.addEventListener('submit', 
  function(event){
    event.preventDefault();
    let cityName = capFirstLetter(event.target.city.value);
    let min = parseInt(event.target.min.value);
    let max = parseInt(event.target.max.value);
    let avgCookie = parseInt(event.target.avgCookie.value);

    if (objNameToString(objCity, 'name').indexOf(cityName) === -1) {
      objCity.push(new City(cityName, min, max, avgCookie));
      console.log(objCity);

      let table = document.getElementById('data');
      let rowToDelete = document.getElementById('total');
      table.removeChild(rowToDelete);
      let table2 = document.getElementById('employee');
      let rowToDelete2 = document.getElementById('total');
      table2.removeChild(rowToDelete2);

      objCity[objCity.length - 1].visCount();
      objCity[objCity.length - 1].cookCount(objCity[objCity.length - 1].customer);
      objCity[objCity.length - 1].printRow(tableEl, 'cookieSold');
      objCity[objCity.length - 1].printRow(table2El, 'cookieTosser');

      printTotal(totalArray('cookieSold'), tableEl);
      printTotal(totalArray('cookieTosser'), table2El);
    }
    else { alert(cityName +' was already added. Submit only novel store locations.'); }
  }
);

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
