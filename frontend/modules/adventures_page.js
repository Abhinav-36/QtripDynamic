
import config from "../conf/index.js";

//Implementation to extract city from query params
function getCityFromURL(search) {
  // TODO: MODULE_ADVENTURES
  // 1. Extract the city id from the URL's Query Param and return it
  let arr = search.split("=");
  return arr[1];

}

//Implementation of fetch call with a paramterized input based on city
async function fetchAdventures(city) {
  // TODO: MODULE_ADVENTURES
  // 1. Fetch adventures using the Backend API and return the data
  const adventuresAPI = config.backendEndpoint + "/adventures?city=" + city;

  try {
    let response = await fetch(adventuresAPI);
    const json = await response.json();
    return json;
  } catch (error) {
    return null;
  }

}

//Implementation of DOM manipulation to add adventures for the given city from list of adventures
function addAdventureToDOM(adventures) {
  // TODO: MODULE_ADVENTURES
  // 1. Populate the Adventure Cards and insert those details into the DOM
  
  adventures.forEach((adventure) => {
    let id = adventure.id;
  let name = adventure.name;
  let cost = adventure.costPerHead;
  let currency = adventure.currency;
  let image = adventure.image;
  let duration = adventure.duration;
  let category = adventure.category;

  let rowEle = document.getElementById("data");

  let displayDiv = document.createElement('div');
  displayDiv.setAttribute("class","col-sm-6 col-lg-3 mt-4 card-element");

  let anchorTag = document.createElement('a');
  anchorTag.setAttribute("href",`detail/?adventure=${id}`)
  anchorTag.setAttribute("id",`${id}`)
  let cardDiv = document.createElement("div");
  cardDiv.setAttribute("class","activity-card");

  let categoryBanner = document.createElement("div");
  categoryBanner.setAttribute("class","category-banner");
  categoryBanner.textContent = category;

  let adventureImage = document.createElement('img');
  adventureImage.setAttribute("src",image);
  adventureImage.setAttribute("alt",name);

  let cardBody = document.createElement("div");
  cardBody.setAttribute("class","card-body text-center");

  let div1 = document.createElement("div");
  div1.setAttribute("class","d-flex flex-sm-column justify-content-between flex-lg-row justify-content-lg-between");
  div1.innerHTML = 
  `
    <h6>${name}</h6>
    <p class="fs-6">${currency} ${cost}</p>

  `;

  let div2 = document.createElement("div");
  div2.setAttribute("class","d-flex flex-sm-column justify-content-sm-between flex-lg-row justify-content-lg-between");
  div2.innerHTML = 
  `
    <h6>Duration</h6>
    <p class="fs-6">${duration} hours</p>

  `;

  cardBody.append(div1);
  cardBody.append(div2);

  cardDiv.append(adventureImage);
  cardDiv.append(categoryBanner);
  cardDiv.append(cardBody);

  anchorTag.append(cardDiv);

  displayDiv.append(anchorTag);

  rowEle.append(displayDiv);
    
  });

  
}

//Implementation of filtering by duration which takes in a list of adventures, the lower bound and upper bound of duration and returns a filtered list of adventures.
function filterByDuration(list, low, high) {
  let advByDuration = [];
  list.forEach((adv) => {
    if (adv.duration >= low && adv.duration <= high) {
      advByDuration.push(adv);
    }
  });
  return advByDuration;
}

function filterByCategory(list, categoryList) {
  let advByCategory = [];
  for (let i = 0; i < list.length; i++) {
    for (let j = 0; j < categoryList.length; j++) {
      if (list[i].category === categoryList[j]) {
        advByCategory.push(list[i]);
      }
    }
  }
  return advByCategory;
}

// filters object looks like this filters = { duration: "", category: [] };

//Implementation of combined filter function that covers the following cases :
// 1. Filter by duration only
// 2. Filter by category only
// 3. Filter by duration and category together

function filterFunction(list, filters) {
  // TODO: MODULE_FILTERS
  // 1. Handle the 3 cases detailed in the comments above and return the filtered list of adventures
  // 2. Depending on which filters are needed, invoke the filterByDuration() and/or filterByCategory() methods
  if (filters.duration.length !== 0 && filters.category.length === 0) {
    let low = filters.duration.split("-")[0];
    let high = filters.duration.split("-")[1];
    let filByDuration = filterByDuration(list, low, high);
    return filByDuration;
  } else if (filters.category.length !== 0 && filters.duration.length === 0) {
    return filterByCategory(list, filters.category);
  } else if (filters.duration.length !== 0 && filters.category.length !== 0) {
    let low = filters.duration.split("-")[0];
    let high = filters.duration.split("-")[1];
    let filByDuration = filterByDuration(list, low, high);
    let filByCategory = filterByCategory(list, filters.category);

    let filByDurationIds = filByDuration.map((adv) => {
      return adv.id;
    });
    let filteredAdvs = filByCategory.filter((advs) => {
      return filByDurationIds.includes(advs.id);
    });
    return filteredAdvs;
  }

  return list;
}

//Implementation of localStorage API to save filters to local storage. This should get called everytime an onChange() happens in either of filter dropdowns
function saveFiltersToLocalStorage(filters) {
  localStorage.setItem("filters", JSON.stringify(filters));
  return true;
}

function getFiltersFromLocalStorage() {
  let filItems = JSON.parse(localStorage.getItem("filters"));
  // return null;
  return filItems;
}

//Implementation of DOM manipulation to add the following filters to DOM :
// 1. Update duration filter with correct value
// 2. Update the category pills on the DOM

function generateFilterPillsAndUpdateDOM(filters) {
  // TODO: MODULE_FILTERS
  // 1. Use the filters given as input, update the Duration Filter value and Generate Category Pills
  document.getElementById("duration-select").value = filters.duration;
  let category = filters["category"];

  category.forEach(ele =>{
    let data = document.getElementById("category-list");

    let catDiv = document.createElement('div');
    catDiv.setAttribute("class","category-filter");

     catDiv.textContent = ele;

     data.append(catDiv);
  })
}
export {
  getCityFromURL,
  fetchAdventures,
  addAdventureToDOM,
  filterByDuration,
  filterByCategory,
  filterFunction,
  saveFiltersToLocalStorage,
  getFiltersFromLocalStorage,
  generateFilterPillsAndUpdateDOM,
};
