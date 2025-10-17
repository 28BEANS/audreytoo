// ----------------- GALLERY DATA -----------------
const plants = [
  { name: "Evan Hansen", img: "img/collections/collection1.jpg", avatar: "img/avatars/avatar1.jpg" },
  { name: "Evan Hansen", img: "img/collections/collection2.jpg", avatar: "img/avatars/avatar2.jpg" },
  { name: "Evan Hansen", img: "img/collections/collection3.jpg", avatar: "img/avatars/avatar3.jpg" },
  { name: "Evan Hansen", img: "img/collections/collection4.jpg", avatar: "img/avatars/avatar4.jpg" },
  { name: "Evan Hansen", img: "img/collections/collection5.jpg", avatar: "img/avatars/avatar5.jpg" },
  { name: "Evan Hansen", img: "img/collections/collection6.jpg", avatar: "img/avatars/avatar6.jpg" },
  { name: "Evan Hansen", img: "img/collections/collection7.jpg", avatar: "img/avatars/avatar7.jpg" },
  { name: "Evan Hansen", img: "img/collections/collection8.jpg", avatar: "img/avatars/avatar8.jpg" },
  { name: "Evan Hansen", img: "img/collections/collection9.jpg", avatar: "img/avatars/avatar9.jpg" },
  { name: "Evan Hansen", img: "img/collections/collection10.jpg", avatar: "img/avatars/avatar10.jpg" },
  { name: "Zoe Rivera", img: "img/collections/collection11.jpg", avatar: "img/avatars/avatar11.jpg" },
  { name: "Zoe Rivera", img: "img/collections/collection12.jpg", avatar: "img/avatars/avatar12.jpg" },
  { name: "Zoe Rivera", img: "img/collections/collection13.jpg", avatar: "img/avatars/avatar13.jpg" },
  { name: "Zoe Rivera", img: "img/collections/collection14.jpg", avatar: "img/avatars/avatar14.jpg" },
  { name: "Zoe Rivera", img: "img/collections/collection15.jpg", avatar: "img/avatars/avatar15.jpg" },
  { name: "Zoe Rivera", img: "img/collections/collection16.jpg", avatar: "img/avatars/avatar16.jpg" },
  { name: "Zoe Rivera", img: "img/collections/collection17.jpg", avatar: "img/avatars/avatar17.jpg" },
  { name: "Zoe Rivera", img: "img/collections/collection18.jpg", avatar: "img/avatars/avatar18.jpg" },
  { name: "Zoe Rivera", img: "img/collections/collection19.jpg", avatar: "img/avatars/avatar19.jpg" },
  { name: "Zoe Rivera", img: "img/collections/collection20.jpg", avatar: "img/avatars/avatar20.jpg" },
];

const gallery = document.querySelector(".gallery");
const pagination = document.querySelectorAll("#nav-gg ul li:not(.btn)");
const backBtn = document.getElementById("back");
const nextBtn = document.getElementById("next");

// ----------------- PAGINATION -----------------
function getItemsPerPage() {
  if (window.innerWidth <= 480) return 6;
  if (window.innerWidth <= 1024) return 9;
  return 10;
}

let itemsPerPage = getItemsPerPage();
let currentPage = 1;
let totalPages = Math.ceil(plants.length / itemsPerPage);

function displayGallery(page) {
  gallery.innerHTML = "";
  const start = (page - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  const pageItems = plants.slice(start, end);

  pageItems.forEach(item => {
    const tile = document.createElement("div");
    tile.classList.add("tile");
    tile.innerHTML = `
      <img src="${item.img}" alt="${item.name}">
      <div class="overlay">
        <p class="name">${item.name}</p>
        <img src="${item.avatar}" alt="${item.name}" class="avatar">
      </div>
    `;
    gallery.appendChild(tile);
  });
}

function updateActiveButton() {
  pagination.forEach(btn => btn.classList.remove("active-btn"));
  const activeBtn = Array.from(pagination).find(btn => Number(btn.textContent) === currentPage);
  if (activeBtn) activeBtn.classList.add("active-btn");
}

pagination.forEach(btn => {
  btn.addEventListener("click", () => {
    const pageNum = Number(btn.textContent);
    if (!isNaN(pageNum)) {
      currentPage = pageNum;
      displayGallery(currentPage);
      updateActiveButton();
    }
  });
});

backBtn.addEventListener("click", () => {
  if (currentPage > 1) {
    currentPage--;
    displayGallery(currentPage);
    updateActiveButton();
  }
});

nextBtn.addEventListener("click", () => {
  if (currentPage < totalPages) {
    currentPage++;
    displayGallery(currentPage);
    updateActiveButton();
  }
});

window.addEventListener("resize", () => {
  const newItemsPerPage = getItemsPerPage();
  if (newItemsPerPage !== itemsPerPage) {
    itemsPerPage = newItemsPerPage;
    totalPages = Math.ceil(plants.length / itemsPerPage);
    currentPage = 1;
    displayGallery(currentPage);
    updateActiveButton();
  }
});

displayGallery(currentPage);
updateActiveButton();

// ----------------- MODAL -----------------
const modal = document.getElementById("gallery-modal");
const modalImg = modal.querySelector("#modal-image");
const modalAvatar = modal.querySelector("#modal-avatar");
const modalUsername = modal.querySelector("#modal-username");
const modalCaption = modal.querySelector("#modal-caption");
const closeBtn = modal.querySelector(".close-btn");
const leftArrow = modal.querySelector(".left-arrow");
const rightArrow = modal.querySelector(".right-arrow");
const plantPanels = modal.querySelectorAll(".plant-panel");
const collapseBtns = modal.querySelectorAll(".collapse-btn");
const plantLists = modal.querySelectorAll(".plant-list");

let currentModalIndex = 0;

const examplePlants = [
  { name: "Haworthiopsis attenuata", img: "img/indiv-plants/haworthia.png", link: "#" },
  { name: "Echeveria Subsessilis", img: "img/indiv-plants/echeveria.png", link: "#" },
  { name: "White Barrel Cacti", img: "img/indiv-plants/barrel-cactus.png", link: "#" }
];

function populatePlantLists() {
  plantLists.forEach(list => {
    list.innerHTML = "";
    examplePlants.forEach(p => {
      const div = document.createElement("div");
      div.classList.add("plant-item");
      div.innerHTML = `
        <div><h4>${p.name}</h4></div>
        <img src="${p.img}" alt="${p.name}">
        <button onclick="window.open('${p.link}', '_blank')">Check it out</button>
      `;
      list.appendChild(div);
    });
  });
}

function getVisiblePlantPanel() {
  return Array.from(plantPanels).find(panel => window.getComputedStyle(panel.parentElement).display !== "none");
}

function openModal(index) {
  currentModalIndex = index;
  const item = plants[index];
  modal.classList.remove("hidden");
  modalImg.src = item.img;
  modalAvatar.src = item.avatar;
  modalUsername.textContent = item.name;
  modalCaption.textContent = "Not much yet, but here’s my little green corner still learning as I go, but proud of these babies!";
  populatePlantLists();
}

function closeModal() {
  modal.classList.add("hidden");
  plantPanels.forEach(panel => panel.classList.remove("active"));
}

// ----------------- EVENTS -----------------
gallery.addEventListener("click", e => {
  const tile = e.target.closest(".tile");
  if (!tile) return;
  const index = Array.from(gallery.children).indexOf(tile);
  openModal((currentPage - 1) * itemsPerPage + index);
});

closeBtn.addEventListener("click", closeModal);

leftArrow.addEventListener("click", () => {
  if (currentModalIndex > 0) openModal(currentModalIndex - 1);
});
rightArrow.addEventListener("click", () => {
  if (currentModalIndex < plants.length - 1) openModal(currentModalIndex + 1);
});

modalImg.addEventListener("click", () => {
  const panel = getVisiblePlantPanel();
  if (panel) panel.classList.add("active");
});

collapseBtns.forEach(btn => {
  btn.addEventListener("click", () => {
    const panel = btn.closest(".plant-panel");
    if (panel) panel.classList.remove("active");
  });
});
