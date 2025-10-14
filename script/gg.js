
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

  // Add more objects as needed
];

const gallery = document.querySelector(".gallery");
const pagination = document.querySelectorAll("#nav-gg ul li:not(.btn)");
const backBtn = document.getElementById("back");
const nextBtn = document.getElementById("next");

const itemsPerPage = 10;
let currentPage = 1;
const totalPages = Math.ceil(plants.length / itemsPerPage);

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

// Initialize
displayGallery(currentPage);
updateActiveButton();

