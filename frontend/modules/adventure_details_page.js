import config from "../conf/index.js";

//Implementation to extract adventure ID from query params
function getAdventureIdFromURL(search) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Get the Adventure Id from the URL
  // console.log(search);
  let arr = search.split('=');
  return arr[1];
  // Place holder for functionality to work in the Stubs
  return null;
}
//Implementation of fetch call with a paramterized input based on adventure ID
async function fetchAdventureDetails(adventureId) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Fetch the details of the adventure by making an API call
  // console.log(adventureId);
  let api = config.backendEndpoint + "/adventures/detail/?adventure=" + adventureId;
  // console.log(api);
  try {
    let response = await fetch(api);
    let data = await response.json();
    return data;
  } catch (error) {
    return null
  }
  
  // Place holder for functionality to work in the Stubs
}

//Implementation of DOM manipulation to add adventure details to DOM
function addAdventureDetailsToDOM(adventure) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the details of the adventure to the HTML DOM
  // console.log(adventure);
  let id = adventure.id;
  let name = adventure.name;
  let subtitle = adventure.subtitle;
  let images = adventure.images;
  let content = adventure.content;
  

  let heading = document.getElementById("adventure-name");
  heading.textContent = name;
  
  let subHeading = document.getElementById("adventure-subtitle");
  subHeading.textContent = subtitle;

  images.forEach(img => {
    let photoGallery = document.getElementById("photo-gallery");

    let imageDiv = document.createElement('div');
    // imageDiv.setAttribute("class","col");

    let image = document.createElement('img');
    image.setAttribute("src",img);
    image.setAttribute("class","activity-card-image");

    imageDiv.append(image);
    photoGallery.append(imageDiv);
  });

  let experience = document.getElementById("adventure-content");
  experience.textContent = content;

  // console.log(id,name,subtitle,images);

}

//Implementation of bootstrap gallery component
function addBootstrapPhotoGallery(images) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the bootstrap carousel to show the Adventure images
  let photoGallery = document.getElementById("photo-gallery");
  photoGallery.innerHTML = `
  <div id="carouselExampleIndicators" class="carousel slide" data-bs-ride="carousel">
  <div class="carousel-indicators">
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
  </div>
  <div class="carousel-inner" id="carousel-inner">
  </div>
  <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Previous</span>
  </button>
  <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Next</span>
  </button>
</div>
  `;
    images.map((key, index) => {
      let divElement = document.createElement("div");
      divElement.className = `carousel-item ${index === 0 ? "active" : ""}`;
      divElement.innerHTML = `
        <img src=${key} class="activity-card-image pb-3"/>
      `;
      document.getElementById("carousel-inner").appendChild(divElement);
    });
}

//Implementation of conditional rendering of DOM based on availability
function conditionalRenderingOfReservationPanel(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If the adventure is already reserved, display the sold-out message.
  let isAvailable = adventure.available;

  if(isAvailable){
    document.getElementById("reservation-panel-sold-out").style.display = "none";
    document.getElementById("reservation-panel-available").style.display = "block";
    document.getElementById("reservation-person-cost").innerHTML =
      adventure["costPerHead"];
  }else{
    document.getElementById("reservation-panel-sold-out").style.display = "block";
    document.getElementById("reservation-panel-available").style.display = "none";
  }

}

//Implementation of reservation cost calculation based on persons
function calculateReservationCostAndUpdateDOM(adventure, persons) {
  // TODO: MODULE_RESERVATIONS
  // 1. Calculate the cost based on number of persons and update the reservation-cost field
  let costPerPerson = adventure.costPerHead;

  let totalCost = document.getElementById("reservation-cost");
  totalCost.textContent = persons * costPerPerson;

}

//Implementation of reservation form submission
function captureFormSubmit(adventure) {
  // TODO: MODULE_RESERVATIONS
  let myForm = document.getElementById("myForm");

  myForm.addEventListener("submit",async (e)=>{
    e.preventDefault();
    let data = {
      name: myForm.elements["name"].value,
      date: new Date(myForm.elements["date"].value),
      person: myForm.elements["person"].value,
      adventure: adventure["id"],
    };
    try {
      let api = `${config.backendEndpoint}/reservations/new`;
      const res = await fetch(api,{
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      alert("Success!");
      window.location.reload;
    } catch (error) {
      console.error(error);
      alert("Failed!");
    }
  });
}

//Implementation of success banner after reservation
function showBannerIfAlreadyReserved(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If user has already reserved this adventure, show the reserved-banner, else don't
  if (adventure["reserved"] === true) {
    document.getElementById("reserved-banner").style.display = "block";
  } else {
    document.getElementById("reserved-banner").style.display = "none";
  }

}

export {
  getAdventureIdFromURL,
  fetchAdventureDetails,
  addAdventureDetailsToDOM,
  addBootstrapPhotoGallery,
  conditionalRenderingOfReservationPanel,
  captureFormSubmit,
  calculateReservationCostAndUpdateDOM,
  showBannerIfAlreadyReserved,
};
