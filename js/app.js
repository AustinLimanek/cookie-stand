'use strict';

let startTime = 6;
let endTime = 7;
let hoursOpen = 12 - startTime + endTime + 1;
let time = [];
let cities = [['Seattle', 23, 65, 6.3], ['Tokyo', 3, 24, 1.2], ['Dubai', 11, 38, 3.7], ['Paris', 20, 38, 2.3], ['Lima', 2, 16, 4.6]];
let tableSpace = document.getElementById('summaryTable');
let tableEl = document.createElement('table');
tableEl.setAttribute('id', 'data');
tableSpace.appendChild(tableEl);
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

function createPreSetCityObjsArray (){
  for (let i = 0; i < cities.length; i++){
    objCity.push(new City(cities[i][0], cities[i][1], cities[i][2], cities[i][3]));
  }
}

createPreSetCityObjsArray();

function tableHeadRow (){
  let tableHeadRow = document.createElement('tr');
  tableEl.appendChild(tableHeadRow);
  let timeEntry = document.createElement('th');
  tableHeadRow.appendChild(timeEntry);
  timeEntry.textContent = 'Location';

  for (let i = 0; i <= hoursOpen; i++) {
    let timeEntry = document.createElement('th');
    tableHeadRow.appendChild(timeEntry);
    timeEntry.textContent = time[i];
    }
}

tableHeadRow();

function genData() {
  for (let i = 0; i < objCity.length; i++){
    objCity[i].visCount();
    objCity[i].cookCount(objCity[i].customer);
  }
}

genData();

function dataPrint (){
  for (let i = 0; i < objCity.length; i++){
    objCity[i].printRow();
  }
}

dataPrint();

function totalArray (){
  let total = new Array(hoursOpen+1).fill(0);
  for (let i = 0; i <= hoursOpen; i++){
    for(let j = 0; j < objCity.length; j++){
      total[i] += objCity[j].cookieSold[i];
    }
  }
  return total;
};

totalArray();

function printTotal (array){
  let tableTotal = document.createElement('tr');
  tableTotal.setAttribute('id', 'total');
  tableEl.appendChild(tableTotal);
  let totalEntry = document.createElement('td');
  tableTotal.appendChild(totalEntry);
  totalEntry.textContent = 'Totals';

  for (let i = 0; i <= hoursOpen; i++) {
    let totalEntry = document.createElement('td');
    tableTotal.appendChild(totalEntry);
    totalEntry.textContent = Math.round(array[i]);
    }
};

printTotal(totalArray());

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

      objCity[objCity.length - 1].visCount();
      objCity[objCity.length - 1].cookCount(objCity[objCity.length - 1].customer);
      objCity[objCity.length - 1].printRow();

      totalArray();
      printTotal(totalArray());
    }
    else { alert(cityName +' was already added. Submit only novel store locations.'); }
  }
);

let hi = objNameToString(objCity, 'name');

console.log(typeof objCity[0]);
console.log(hi);

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
