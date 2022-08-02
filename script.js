
const apiUrl = "https://mass-effect-api.herokuapp.com/";
const main = document.querySelector('main');
const [charactersList, planetsList, racesList, classesList] =
  document.querySelectorAll('aside ul');


getCharacters().then(renderCharactersList);
getPlanets().then(renderPlanetsList);
getRaces().then(renderRacesList);
getClasses().then(renderClassesList);


async function getCharacters() {
  const response = await fetch(apiUrl + "characters");
  const data = await response.json();
  const characters = Object.values(data).flat();

  return characters;
}

function renderCharactersList(items) {
  const keys = ['name', 'gender', 'race', 'quote', 'description', 'class'];

  charactersList.append(...items.map(buildCharacterItem));

  charactersList.onclick = e => {
    const id = e.target.dataset.id;

    if (id) {
      const character = items.find(item => item.characterId == id);

      renderItemInfo(character, keys);
    }
  }
}

function buildCharacterItem(item) {
  const { characterId, name } = item;
  const li = document.createElement('li');

  li.innerHTML = `<button data-id="${characterId}">${name}</button>`;

  return li;
}

function renderItemInfo(item, keys) {
  const img = document.createElement('img');
  const dl = document.createElement('dl');

  img.src = item.img || item.picture;

  dl.innerHTML = keys.map(
    key => item[key] ? `<dt>${key}:</dt> <dd>${item[key]}</dd>` : ''
  ).join('');
  main.replaceChildren(img, dl);
}

/* Planets */
async function getPlanets() {
  const response = await fetch(apiUrl + "planets");
  const planets = await response.json();

  return planets;
}

function renderPlanetsList(items) {
  const keys = ['name', 'description', 'homeRace']

  planetsList.append(...items.map(buildPlanetItem));

  planetsList.onclick = e => {
    const id = e.target.dataset.id;

    if (id) {
      const planet = items.find(item => item.planetId == id);

      renderItemInfo(planet, keys);
    }
  }
}

function buildPlanetItem(item) {
  const { planetId, name } = item;
  const li = document.createElement('li');

  li.innerHTML = `<button data-id="${planetId}">${name}</button>`;

  return li;
}

/* RACES */
async function getRaces() {
  const response = await fetch(apiUrl + "races");
  const data = await response.json();
  const races = Object.values(data[0].milkyWay[0]).flat();

  return races;
}

function renderRacesList(items) {
  const keys = ['name', 'description', 'homeWorld', 'colonyPlanets', 'notableCharacters']

  racesList.append(...items.map(buildRaceItem));

  racesList.onclick = e => {
    const id = e.target.dataset.id;

    if (id) {
      const race = items.find(item => item.racesId == id);

      renderItemInfo(race, keys);
    }
  }
}

function buildRaceItem(item) {
  const { racesId, name } = item;
  const li = document.createElement('li');

  li.innerHTML = `<button data-id="${racesId}">${name}</button>`;

  return li;
}

/* CLASSES */
async function getClasses() {
  const response = await fetch(apiUrl + "classes");
  const classes = await response.json();

  return classes;
}

function renderClassesList(items) {
  const keys = ['name', 'description', 'powers']

  classesList.append(...items.map(buildClasseItem));

  classesList.onclick = e => {
    const id = e.target.dataset.id;

    if (id) {
      const classe = items.find(item => item.classesId == id);

      renderItemInfo(classe, keys);
    }
  }
}

function buildClasseItem(item) {
  const { classesId, name } = item;
  const li = document.createElement('li');

  li.innerHTML = `<button data-id="${classesId}">${name}</button>`;

  return li;
}