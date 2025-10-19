const plants = [
      { name: "Monstera", img: "img/d61975b2-5e50-40d1-8f82-e6070dfa7053-Photoroom.png", desc: "The Monstera, also known as the Swiss Cheese Plant, thrives in bright, indirect sunlight and adds a tropical vibe to any room." },
      { name: "Chinese Fan Palm", img: "img/chinese-fan-palm.png", desc: "A beautiful palm with fan-shaped leaves that grows well in well-drained soil and partial sunlight."},
      { name: "Succulent", img: "img/plant-2.png", desc: "Succulents are low-maintenance plants that store water in their leaves, perfect for beginners." },
      { name: "Snake Plant", img: "img/snake-plant.png", desc: "The Snake Plant is known for purifying the air and tolerating low light, ideal for indoor spaces." },
    ];

    let current = 1; 
    const carousel = document.getElementById("carousel");
    const plantName = document.getElementById("plantName");
    const indicators = document.getElementById("indicators");

    function renderCarousel() {
      carousel.innerHTML = "";
      for (let i = current - 1; i <= current + 1; i++) {
        const index = (i + plants.length) % plants.length;
        const div = document.createElement("div");
        div.className = "circle " + (i === current ? "active" : "inactive");
        const img = document.createElement("img");
        img.src = plants[index].img;
        div.appendChild(img);
        carousel.appendChild(div);
      }
      plantName.textContent = plants[current].name;

      indicators.innerHTML = "";
      plants.forEach((_, i) => {
        const dot = document.createElement("div");
        dot.className = "dot" + (i === current ? " active" : "");
        dot.addEventListener("click", () => { current = i; renderCarousel(); });
        indicators.appendChild(dot);
      });
    }

    document.getElementById("prev").addEventListener("click", () => {
      current = (current - 1 + plants.length) % plants.length;
      renderCarousel();
    });

    document.getElementById("next").addEventListener("click", () => {
      current = (current + 1) % plants.length;
      renderCarousel();
    });

    const modal = document.getElementById("modal");
    const modalTitle = document.getElementById("modalTitle");
    const modalDesc = document.querySelector(".modal-content p");
    document.getElementById("checkBtn").addEventListener("click", () => {
      modalTitle.textContent = plants[current].name;
      modalDesc.textContent = plants[current].desc;
      modal.style.display = "flex";
    });
    document.getElementById("closeModal").addEventListener("click", () => {
      modal.style.display = "none";
    });
    window.addEventListener("click", (e) => {
      if (e.target === modal) modal.style.display = "none";
    });


renderCarousel();