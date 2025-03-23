import config from "../conf/index.js";

async function init() {
  //Fetches list of all cities along with their images and description
  let cities = await fetchCities();
  //Updates the DOM with the cities
  if (cities) {
    cities.forEach((key) => {
      addCityToDOM(key.id, key.city, key.description, key.image);
    });
  }
}

//Implementation of fetch call
async function fetchCities() {

  const citiesAPI = config.backendEndpoint + "/cities";

  try {
    const response = await fetch(citiesAPI);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
    const json = await response.json();
    return json;
  } catch (error) {
    return null;
  }

  // TODO: MODULE_CITIES
  // 1. Fetch cities using the Backend API and return the data

}

//Implementation of DOM manipulation to add cities
function addCityToDOM(id, city, description, image) {
  // TODO: MODULE_CITIES
  // 1. Populate the City details and insert those details into the DOM
  let rowEle = document.getElementById('data');

  let div1 = document.createElement('div');
  div1.setAttribute("class","col-sm-6 col-lg-3 mt-4");
  

  let anchorTag = document.createElement('a');
  anchorTag.setAttribute("id",id);
  anchorTag.setAttribute("href",`/frontend/pages/adventures/?city=${id}`);

  let tileDiv = document.createElement('div');
  tileDiv.setAttribute("class","tile");

  let img = document.createElement('img');
  console.log(image);
  img.setAttribute("src",image);
  img.setAttribute("alt",city);

  let div2 = document.createElement("div");
  div2.setAttribute("class","tile-text text-center");

  let p1 = document.createElement('p');
  p1.setAttribute("class","h5");
  p1.textContent = city;

  let p2 = document.createElement('p');
  p2.setAttribute("class","fw-light");
  p2.textContent = description;

  div2.append(p1);
  div2.append(p2);

  tileDiv.append(img);
  tileDiv.append(div2);

 anchorTag.append(tileDiv);

 div1.append(anchorTag);

 rowEle.append(div1);

}

export { init, fetchCities, addCityToDOM };
