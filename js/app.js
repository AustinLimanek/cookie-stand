'use strict';

let startTime = 6;
let endTime = 7;
let hoursOpen = 12 - startTime + endTime + 1;
let time = [];

function busiTime() {
  for (let i = startTime; i <= startTime + hoursOpen; i++){
    if (i < 12){
      time[i - startTime] = i + "am: ";
    }
    else if (i == 12){
      time[i - startTime] = i + "pm: ";
    }
    else if (i > 12 && i < startTime + hoursOpen){
      time[i - startTime] = i % 12 + "pm: ";
    }
    else{
      time[i - startTime] = "Total: ";
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

let seattle = {
  min: 23,
  max: 65,
  avgCookie: 6.3,
  customer: [],
  cookieSold: [],

  visCount: function (){
    for (let i = 0; i < hoursOpen; i++){
      this.customer[i] = Math.random()*(this.max - this.min) + this.min;
    }
    return this.customer;
  },

  cookCount: function (customer){
    for (let i = 0; i < hoursOpen; i++){
      if (i < hoursOpen){
        this.cookieSold[i] = customer[i]*this.avgCookie;
      }
      else{
        this.cookieSold[i] = sumArray(this.cookieSold);
      }
    }
    return this.cookieSold;
  },

  displayCookiePerHour: function (){
    let cookiePrint = document.getElementById('results');
    //let cityElement = document.createElement('h2');
    //cityElement.textContent = 'Seattle';
    //cookiePrint.appendChild(cityElement);

    let listElement = document.createElement('ul');
    cookiePrint.appendChild(listElement);

    for (let i = 0; i < hoursOpen; i++){
      let listItemElement = document.createElement('li');
      listItemElement.textContent = time[i] + Math.round(this.cookieSold[i]) + ' cookies';
      listElement.appendChild(listItemElement)
    }

    let totalElement = document.createElement('li');
    totalElement.textContent = time[hoursOpen] + Math.round(sumArray(this.cookieSold)) + ' cookies';
    listElement.appendChild(totalElement);
  }
}

let tokyo = {
  min: 3,
  max: 24,
  avgCookie: 1.2,
  customer: [],
  cookieSold: [],

  visCount: function (){
    for (let i = 0; i < hoursOpen; i++){
      this.customer[i] = Math.random()*(this.max - this.min) + this.min;
    }
    return this.customer;
  },

  cookCount: function (customer){
    for (let i = 0; i < hoursOpen; i++){
      if (i < hoursOpen){
        this.cookieSold[i] = customer[i]*this.avgCookie;
      }
      else{
        this.cookieSold[i] = sumArray(this.cookieSold);
      }
    }
    return this.cookieSold;
  },

  displayCookiePerHour: function (){
    let cookiePrint = document.getElementById('results');

    let listElement = document.createElement('ul');
    cookiePrint.appendChild(listElement);

    for (let i = 0; i < hoursOpen; i++){
      let listItemElement = document.createElement('li');
      listItemElement.textContent = time[i] + Math.round(this.cookieSold[i]) + ' cookies';
      listElement.appendChild(listItemElement)
    }

    let totalElement = document.createElement('li');
    totalElement.textContent = time[hoursOpen] + Math.round(sumArray(this.cookieSold)) + ' cookies';
    listElement.appendChild(totalElement);
  }
}

let dubai = {
  min: 11,
  max: 38,
  avgCookie: 3.7,
  customer: [],
  cookieSold: [],

  visCount: function (){
    for (let i = 0; i < hoursOpen; i++){
      this.customer[i] = Math.random()*(this.max - this.min) + this.min;
    }
    return this.customer;
  },

  cookCount: function (customer){
    for (let i = 0; i < hoursOpen; i++){
      if (i < hoursOpen){
        this.cookieSold[i] = customer[i]*this.avgCookie;
      }
      else{
        this.cookieSold[i] = sumArray(this.cookieSold);
      }
    }
    return this.cookieSold;
  },

  displayCookiePerHour: function (){
    let cookiePrint = document.getElementById('results');

    let listElement = document.createElement('ul');
    cookiePrint.appendChild(listElement);

    for (let i = 0; i < hoursOpen; i++){
      let listItemElement = document.createElement('li');
      listItemElement.textContent = time[i] + Math.round(this.cookieSold[i]) + ' cookies';
      listElement.appendChild(listItemElement)
    }

    let totalElement = document.createElement('li');
    totalElement.textContent = time[hoursOpen] + Math.round(sumArray(this.cookieSold)) + ' cookies';
    listElement.appendChild(totalElement);
  }
}

let paris = {
  min: 20,
  max: 38,
  avgCookie: 2.3,
  customer: [],
  cookieSold: [],

  visCount: function (){
    for (let i = 0; i < hoursOpen; i++){
      this.customer[i] = Math.random()*(this.max - this.min) + this.min;
    }
    return this.customer;
  },

  cookCount: function (customer){
    for (let i = 0; i < hoursOpen; i++){
      if (i < hoursOpen){
        this.cookieSold[i] = customer[i]*this.avgCookie;
      }
      else{
        this.cookieSold[i] = sumArray(this.cookieSold);
      }
    }
    return this.cookieSold;
  },

  displayCookiePerHour: function (){
    let cookiePrint = document.getElementById('results');

    let listElement = document.createElement('ul');
    cookiePrint.appendChild(listElement);

    for (let i = 0; i < hoursOpen; i++){
      let listItemElement = document.createElement('li');
      listItemElement.textContent = time[i] + Math.round(this.cookieSold[i]) + ' cookies';
      listElement.appendChild(listItemElement)
    }

    let totalElement = document.createElement('li');
    totalElement.textContent = time[hoursOpen] + Math.round(sumArray(this.cookieSold)) + ' cookies';
    listElement.appendChild(totalElement);
  }
}

let lima = {
  min: 2,
  max: 16,
  avgCookie: 4.6,
  customer: [],
  cookieSold: [],

  visCount: function (){
    for (let i = 0; i < hoursOpen; i++){
      this.customer[i] = Math.random()*(this.max - this.min) + this.min;
    }
    return this.customer;
  },

  cookCount: function (customer){
    for (let i = 0; i < hoursOpen; i++){
      if (i < hoursOpen){
        this.cookieSold[i] = customer[i]*this.avgCookie;
      }
      else{
        this.cookieSold[i] = sumArray(this.cookieSold);
      }
    }
    return this.cookieSold;
  },

  displayCookiePerHour: function (){
    let cookiePrint = document.getElementById('results');

    let listElement = document.createElement('ul');
    cookiePrint.appendChild(listElement);

    for (let i = 0; i < hoursOpen; i++){
      let listItemElement = document.createElement('li');
      listItemElement.textContent = time[i] + Math.round(this.cookieSold[i]) + ' cookies';
      listElement.appendChild(listItemElement)
    }

    let totalElement = document.createElement('li');
    totalElement.textContent = time[hoursOpen] + Math.round(sumArray(this.cookieSold)) + ' cookies';
    listElement.appendChild(totalElement);
  }
}

// let visPerHour = seattle.visCount();
// let cookPerHour = seattle.cookCount(seattle.customer);
// console.log(visPerHour);
// console.log(cookPerHour);

console.log(busiTime());

seattle.visCount();
seattle.cookCount(seattle.customer);
seattle.displayCookiePerHour();

tokyo.visCount();
tokyo.cookCount(tokyo.customer);
tokyo.displayCookiePerHour();

dubai.visCount();
dubai.cookCount(dubai.customer);
dubai.displayCookiePerHour();

paris.visCount();
paris.cookCount(paris.customer);
paris.displayCookiePerHour();

lima.visCount();
lima.cookCount(lima.customer);
lima.displayCookiePerHour();
