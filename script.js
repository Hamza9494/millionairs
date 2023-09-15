const main = document.getElementById('main');
const addUserBtn = document.getElementById('add-user');
const doubleMoneyBtn = document.getElementById('double');
const showMillionairsBtn = document.getElementById('show-millionaires');
const sortBtn = document.getElementById('sort');
const calculateWealthBtn = document.getElementById('calculate-wealth');

let data = [];

getRandomUser();
getRandomUser();
getRandomUser();
//get random user from api
async function getRandomUser() {
  const res = await fetch('https://randomuser.me/api');
  const data = await res.json();

  const user = data.results[0];
  const newUser = {
    name: `${user.name.first} ${user.name.last}`,
    wealth: Math.floor(Math.random() * 1000000),
  };

  addData(newUser);
}

// add new user to data array
function addData(obj) {
  data.push(obj);

  updateDOM();
}

//sort wealth
function sortedWealth() {
  data = data.sort((a, b) => b.wealth - a.wealth);
  updateDOM();
}

//show millionairs
function showMillionairs() {
  data = data.filter((person) => person.wealth > 1000000);
  updateDOM();
}

//double money
function doubleMoney(providedData = data) {
  data = data.map((user) => {
    return { ...user, wealth: user.wealth * 2 };
  });
  updateDOM();
}

//calculate wealth
function calculateWealth() {
  const total = data.reduce((acc, cur) => {
    return acc + cur.wealth;
  }, 0);

  const element = document.createElement('h3');
  element.textContent = `total is $${total}`;
  main.appendChild(element);
}

//update DOM
function updateDOM(providedData = data) {
  main.innerHTML = '<h2><strong>Person</strong> Wealth</h2>';

  providedData.forEach((item) => {
    const element = document.createElement('div');
    element.classList.add('person');

    element.innerHTML = `<strong>${item.name}</strong> $${item.wealth}`;
    main.appendChild(element);
  });
}

//event listners
addUserBtn.addEventListener('click', () => {
  getRandomUser();
});
doubleMoneyBtn.addEventListener('click', doubleMoney);
sortBtn.addEventListener('click', sortedWealth);
showMillionairsBtn.addEventListener('click', showMillionairs);
calculateWealthBtn.addEventListener('click', calculateWealth);
