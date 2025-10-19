const toggle = document.getElementById('menu-toggle');
const nav = document.querySelector('nav');


toggle.addEventListener('click', () => {
    nav.classList.toggle('open');
});


document.getElementById("grow-form").addEventListener("submit", function(event) {
  event.preventDefault(); // stops the page from reloading
  alert("Thank you for submitting your plant collection!");
});


const socialLinks = document.querySelectorAll("#social-icon a");
  socialLinks.forEach(link => {
    link.addEventListener("click", function(event) {
      event.preventDefault(); // prevent going to another page
      alert("This social link is currently unavailable. Stay tuned!");
    });
 });