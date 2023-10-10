const techBtn = document.querySelectorAll(".tech");
const card = document.querySelectorAll(".card");
const filters = document.querySelector(".filters");
const filterDiv = document.querySelector(".filter__div");
const clearBtn = document.querySelector(".clear");
const filtersTracker = [];

let filterData;
const totalData = fetch("data.json")
  .then((res) => {
    return res.json();
  })
  .then((data) => {
    filterData = data;
  });

techBtn.forEach((btn) => {
  btn.addEventListener("click", async function (event) {
    const eventButton = document.createElement("button");
    eventButton.innerText = event.currentTarget.innerText;
    eventButton.classList.add("filter");
    eventButton.id = event.currentTarget.innerText;
    let res = [];
    filterData.forEach((data) => {
      if (
        data[event.currentTarget.classList[1]].includes(
          event.currentTarget.innerText
        )
      ) {
        res.push(data.id);
      }
    });
    card.forEach((c) => {
      if (!res.includes(parseInt(c.id))) {
        c.classList.add("hidden");
      }
    });
    if (!filtersTracker.includes(eventButton.id)) {
      filters.append(eventButton);
      filterDiv.classList.remove("not__show");
      filtersTracker.push(eventButton.id);
      eventButton.addEventListener("click", (event) => {
        let perRes = res.slice(0, res.length);
        card.forEach((c) => {
          if (!perRes.includes(parseInt(c.id))) {
            c.classList.remove("hidden");
          }
        });
        filtersTracker.splice(filtersTracker.indexOf(event.target.id), 1);
        if (filtersTracker.length == 0) {
          filterDiv.classList.add("not__show");
        }
        eventButton.remove();
      });
    }
  });
});

clearBtn.addEventListener("click", (event) => {
  card.forEach((c) => {
    c.classList.remove("hidden");
  });
  filterDiv.classList.add("not__show");
  filtersTracker.length = 0;
  filters.innerHTML = "";
});

// Card Popup function
function handleCardClick(event) {
  const card = event.target.closest(".card");
  const companyId = card.id;
  const company = card.querySelector(".card__title").innerText;
  const position = card.querySelector(".occupation").innerText;

  const jobInfo = card.querySelector(".job__info").innerText;
  const techButtons = [...card.querySelectorAll(".card__tech button")].map(button => button.innerText);

  const popup = document.getElementById("jobPopup");
  const popupTitle = popup.querySelector(".popup__title");
  const popupOccupation = popup.querySelector(".popup__occupation");
  const popupJobInfo = popup.querySelector(".popup__job-info");
  const popupTech = popup.querySelector(".popup__tech");

  popupTitle.innerText = company;
  popupOccupation.innerText = position;
  popupJobInfo.innerText = jobInfo;
  popupTech.innerText = techButtons.join(', ');

  popup.style.display = "flex";
}
// click event for all job cards
const cardOccupation = document.querySelectorAll(".occupation");
cardOccupation.forEach(card => {
  card.addEventListener("click", handleCardClick);
});

// Close popup event
const closePopup = document.getElementById("closePopup");
closePopup.addEventListener("click", function() {
  const popup = document.getElementById("jobPopup");
  popup.style.display = "none";
});

// Add Job Functions
const addJobBtn = document.querySelector('.add-job-btn');

addJobBtn.addEventListener('click', function () {
  const popup = document.getElementById('addJobPopup');
  popup.style.display = 'flex';
});

const addJobSubmit = document.querySelector('.add-job-submit');

addJobSubmit.addEventListener('click', function () {
  const companyInput = document.getElementById('companyInput').value;
  const positionInput = document.getElementById('positionInput').value;
  const roleInput = document.getElementById('roleInput').value;
  const levelInput = document.getElementById('levelInput').value;
  const postedAtInput = document.getElementById('postedAtInput').value;
  const contractInput = document.getElementById('contractInput').value;
  const locationInput = document.getElementById('locationInput').value;
  const languagesInput = document.getElementById('languagesInput').value;
  const toolsInput = document.getElementById('toolsInput').value;

  const newJob = {
    id: filterData.length + 1,
    company: companyInput,
    logo: "./images/photosnap.svg", 
    new: true, 
    featured: true,
    position: positionInput,
    role: roleInput,
    level: levelInput,
    postedAt: postedAtInput,
    contract: contractInput,
    location: locationInput,
    languages: languagesInput.split(',').map(lang => lang.trim()),
    tools: []
  };

  filterData.push(newJob);

  // Updating the display with the new card
  const main = document.querySelector('main');

  const newCard = document.createElement('div');
  newCard.classList.add('card');
  newCard.id = newJob.id;

  const cardContent = `
    <img class="logo" src="${newJob.logo}" alt="${newJob.company} Logo">
    <div class="card__info">
      <div class="card__title">
        ${newJob.company}
      </div>
      <div class="occupation">${newJob.position}</div>
      <ul class="info">
        <li>${newJob.postedAt}</li>
        <li>${newJob.contract}</li>
        <li>${newJob.location}</li>
      </ul>
    </div>
    <div class="card__tech">
      ${newJob.languages.map(lang => `<button class="tech">${lang}</button>`).join('')}
    </div>
    <button class="delete-button">Delete</button>
  `;

  newCard.innerHTML = cardContent;
  main.appendChild(newCard);

  // Resetting input fields
  document.getElementById('companyInput').value = "";
  document.getElementById('positionInput').value = "";
  document.getElementById('roleInput').value = "";
  document.getElementById('levelInput').value = "";
  document.getElementById('postedAtInput').value = "";
  document.getElementById('contractInput').value = "";
  document.getElementById('locationInput').value = "";
  document.getElementById('languagesInput').value = "";
  document.getElementById('toolsInput').value = "";

  // Close the popup
  const addJobPopup = document.getElementById('addJobPopup');
  addJobPopup.style.display = 'none';

  if (!filtersTracker.includes(roleInput)) {
    const filters = document.querySelector('.filters');
    const eventButton = document.createElement("button");
    eventButton.innerText = roleInput;
    eventButton.classList.add("filter");
    eventButton.id = roleInput;
    filters.append(eventButton);
    filterDiv.classList.remove("not__show");
    filtersTracker.push(roleInput);

    eventButton.addEventListener("click", (event) => {
      let perRes = filterData.filter(data => data.role === event.target.innerText).map(data => data.id);
      card.forEach((c) => {
        if (!perRes.includes(parseInt(c.id))) {
          c.classList.remove("hidden");
        }
      });
      filtersTracker.splice(filtersTracker.indexOf(event.target.id), 1);
      if (filtersTracker.length == 0) {
        filterDiv.classList.add("not__show");
      }
      eventButton.remove();
    });
  }
});

const closeAddJobPopup = document.getElementById('htmlCloseAddJobPopUp');

closeAddJobPopup.addEventListener('click', function () {
  const addJobPopup = document.getElementById('addJobPopup');
  addJobPopup.style.display = 'none';
});

//delete card functions

// event listener for each delete button
const deleteBtns = document.querySelectorAll('.delete-button');

deleteBtns.forEach(btn => {
  btn.addEventListener('click', function(event) {
    const card = event.target.closest('.card');
    card.remove();
  });
});
