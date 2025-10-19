// ----------------- GALLERY DATA -----------------
const plants = [
  { name: "Evan Hansen", img: "img/collections/collection1.jpg", avatar: "img/avatars/avatar1.jpg" },
  { name: "Vince Evangelista", img: "img/collections/collection2.jpg", avatar: "img/avatars/avatar2.jpg" },
  { name: "Elphaba Thropp", img: "img/collections/collection3.jpg", avatar: "img/avatars/avatar3.jpg" },
  { name: "Tyler Okonma", img: "img/collections/collection4.jpg", avatar: "img/avatars/avatar4.jpg" },
  { name: "Joey Tribbiani", img: "img/collections/collection5.jpg", avatar: "img/avatars/avatar5.jpg" },
  { name: "Sheldon Cooper", img: "img/collections/collection6.jpg", avatar: "img/avatars/avatar6.jpg" },
  { name: "Gypsy Rose", img: "img/collections/collection7.jpg", avatar: "img/avatars/avatar7.jpg" },
  { name: "Angelica Schuyler", img: "img/collections/collection8.jpg", avatar: "img/avatars/avatar8.jpg" },
  { name: "Lydia Deetz", img: "img/collections/collection9.jpg", avatar: "img/avatars/avatar9.jpg" },
  { name: "Heather Chandler", img: "img/collections/collection10.jpg", avatar: "img/avatars/avatar10.jpg" },
  { name: "Sally Bowles", img: "img/collections/collection11.jpg", avatar: "img/avatars/avatar11.jpg" },
  { name: "Kline Calagulo", img: "img/collections/collection12.jpg", avatar: "img/avatars/avatar12.jpg" },
  { name: "Kerk Valler", img: "img/collections/collection13.jpg", avatar: "img/avatars/avatar13.jpg" },
  { name: "Seymour Krelborn", img: "img/collections/collection14.jpg", avatar: "img/avatars/avatar14.jpg" },
  { name: "Billy Elliot", img: "img/collections/collection15.jpg", avatar: "img/avatars/avatar15.jpg" },
  { name: "Frank Sinatra", img: "img/collections/collection16.jpg", avatar: "img/avatars/avatar16.jpg" },
  { name: "Tracy Turnblad", img: "img/collections/collection17.jpg", avatar: "img/avatars/avatar17.jpg" },
  { name: "Aaron Burr", img: "img/collections/collection18.jpg", avatar: "img/avatars/avatar18.jpg" },
  { name: "Galinda", img: "img/collections/collection19.jpg", avatar: "img/avatars/avatar19.jpg" },
  { name: "Regina George", img: "img/collections/collection20.jpg", avatar: "img/avatars/avatar20.jpg" },
];

const gallery = document.querySelector(".gallery");
const allPageBtns = document.querySelectorAll("#nav-gg ul li.pagination-btn");
const backBtn = document.getElementById("back");
const nextBtn = document.getElementById("next");

let currentPage = 1;
let itemsPerPage = getItemsPerPage();
let totalPages = Math.ceil(plants.length / itemsPerPage);

// ----------------- PAGINATION -----------------
function getItemsPerPage() {
  if (window.innerWidth <= 480) return 6;
  if (window.innerWidth <= 1024) return 9;
  return 10;
}

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

function updatePagination() {
  const maxVisibleBtns = window.innerWidth <= 480 ? 3 : allPageBtns.length;
  const startIndex = window.innerWidth <= 480
    ? Math.min(Math.max(currentPage - 2, 0), totalPages - maxVisibleBtns)
    : 0;

  allPageBtns.forEach((btn, idx) => {
    if (window.innerWidth <= 480) {
      if (idx >= startIndex && idx < startIndex + maxVisibleBtns) {
        btn.style.display = "inline-block";
      } else {
        btn.style.display = "none";
      }
    } else {
      btn.style.display = "inline-block";
    }

    btn.classList.remove("active-btn");
    if (Number(btn.textContent) === currentPage) btn.classList.add("active-btn");
  });
}

// Event listeners for pagination buttons
allPageBtns.forEach(btn => {
  btn.addEventListener("click", () => {
    const pageNum = Number(btn.textContent);
    if (!isNaN(pageNum)) {
      currentPage = pageNum;
      displayGallery(currentPage);
      updatePagination();
    }
  });
});

backBtn.addEventListener("click", () => {
  if (currentPage > 1) {
    currentPage--;
    displayGallery(currentPage);
    updatePagination();
  }
});

nextBtn.addEventListener("click", () => {
  if (currentPage < totalPages) {
    currentPage++;
    displayGallery(currentPage);
    updatePagination();
  }
});

window.addEventListener("resize", () => {
  const newItemsPerPage = getItemsPerPage();
  if (newItemsPerPage !== itemsPerPage) {
    itemsPerPage = newItemsPerPage;
    totalPages = Math.ceil(plants.length / itemsPerPage);
    currentPage = 1;
    displayGallery(currentPage);
    updatePagination();
  }
});

displayGallery(currentPage);
updatePagination();

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

function openModal(index) {
  currentModalIndex = index;
  const item = plants[index];
  modal.classList.remove("hidden");
  modalImg.src = item.img;
  modalAvatar.src = item.avatar;
  modalUsername.textContent = item.name;
  modalCaption.textContent = "Not much yet, but here’s my little green corner still learning as I go, but proud of these babies!";
  populatePlantLists();
  plantPanels.forEach(panel => panel.classList.remove("active"));
}

function closeModal() {
  modal.classList.add("hidden");
  plantPanels.forEach(panel => panel.classList.remove("active"));
}

// ----------------- MODAL EVENTS -----------------
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

// Open collapsible panel
modalImg.addEventListener("click", () => {
  const panel = Array.from(plantPanels).find(p => window.getComputedStyle(p.parentElement).display !== "none");
  if (panel) panel.classList.add("active");
});

// Collapse panel buttons
collapseBtns.forEach(btn => {
  btn.addEventListener("click", () => {
    const panel = btn.closest(".plant-panel");
    if (panel) panel.classList.remove("active");
  });
});
