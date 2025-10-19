
// make sure everything is loaded up before execeuting event listenerssssssss
document.addEventListener("DOMContentLoaded", function() {
  const toggle = document.getElementById('menu-toggle');
  const nav = document.querySelector('nav');
  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      nav.classList.toggle('open');
    });
  }

  const growForm = document.getElementById("grow-form");
  if (growForm) {
    growForm.addEventListener("submit", function(event) {
      event.preventDefault();
      alert("Thank you for submitting your plant collection!");
    });
  }

  const socialLinks = document.querySelectorAll("#social-icon a");
  socialLinks.forEach(link => {
    link.addEventListener("click", function(event) {
      event.preventDefault();
      alert("This social link is currently unavailable. Stay tuned!");
    });
  });

  const joinNow = document.querySelector("#clique a");
  joinNow.addEventListener("click", function(event) {
    event.preventDefault();
    alert("Thank you for your interest! The Audrey Too Discord community is coming soon 🌿");
  });
});
