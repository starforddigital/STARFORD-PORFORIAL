// STARFORD DIGITAL interactions
const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

menuToggle.addEventListener("click", () => {
  const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
  menuToggle.setAttribute("aria-expanded", String(!isOpen));
  navLinks.classList.toggle("open", !isOpen);
});

document.querySelectorAll(".nav-link").forEach(link => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
  });
});

// Reveal elements as they enter the viewport.
const revealObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
document.querySelectorAll(".reveal").forEach(element => revealObserver.observe(element));

// Highlight the current navigation section.
const sections = document.querySelectorAll("main section[id]");
const navObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      document.querySelectorAll(".nav-link").forEach(link => {
        link.classList.toggle("active", link.getAttribute("href") === `#${entry.target.id}`);
      });
    }
  });
}, { rootMargin: "-35% 0px -55% 0px" });
sections.forEach(section => navObserver.observe(section));

// Portfolio category filters.
const filterButtons = document.querySelectorAll(".filter-button");
const projectCards = document.querySelectorAll(".project-card");
filterButtons.forEach(button => {
  button.addEventListener("click", () => {
    filterButtons.forEach(item => item.classList.remove("active"));
    button.classList.add("active");
    const filter = button.dataset.filter;
    projectCards.forEach(card => {
      card.hidden = filter !== "all" && card.dataset.category !== filter;
    });
  });
});

// Project detail modal.
const modal = document.getElementById("project-modal");
const modalArt = document.getElementById("modal-art");
const modalTitle = document.getElementById("modal-title");
const modalDescription = document.getElementById("modal-description");

projectCards.forEach(card => {
  card.addEventListener("click", () => {
    const artwork = card.querySelector(".project-image").cloneNode(true);
    artwork.classList.add("artwork");
    modalArt.replaceChildren(artwork);
    modalTitle.textContent = card.dataset.title;
    modalDescription.textContent = card.dataset.description;
    modal.classList.add("open");
    modal.setAttribute("aria-hidden", "false");
    document.body.classList.add("modal-open");
    modal.querySelector(".modal-close").focus();
  });
});

function closeModal() {
  modal.classList.remove("open");
  modal.setAttribute("aria-hidden", "true");
  document.body.classList.remove("modal-open");
}
modal.querySelectorAll("[data-close]").forEach(element => element.addEventListener("click", closeModal));
document.addEventListener("keydown", event => {
  if (event.key === "Escape" && modal.classList.contains("open")) closeModal();
});

// Current year in footer.
document.getElementById("year").textContent = new Date().getFullYear();

/*
  IMPORTANT BEFORE PUBLISHING:
  1. Replace 255XXXXXXXXX in index.html with your WhatsApp number.
     Use country code and number only, e.g. 2557XXXXXXXX (no +, spaces or dashes).
  2. Replace hello@starforddigital.com with your real email address.
  3. Replace sample CSS artwork in the portfolio with your own project images.
*/
