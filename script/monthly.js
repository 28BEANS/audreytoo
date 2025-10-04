const plants = [
      { name: "Monstera", img: "img/d61975b2-5e50-40d1-8f82-e6070dfa7053-Photoroom.png" },
      { name: "Chinese Fan Palm", img: "img/chinese-fan-palm.png" },
      { name: "Succulent", img: "img/plant-2.png" },
      { name: "Snake Plant", img: "https://i.ibb.co/4jr6GvG/snakeplant.jpg" },
    ];

    let current = 1; // Start from second item for demo
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
    document.getElementById("checkBtn").addEventListener("click", () => {
      modalTitle.textContent = plants[current].name;
      modal.style.display = "flex";
    });
    document.getElementById("closeModal").addEventListener("click", () => {
      modal.style.display = "none";
    });
    window.addEventListener("click", (e) => {
      if (e.target === modal) modal.style.display = "none";
    });


renderCarousel();