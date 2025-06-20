// Mobile Navigation
// const hamburger = document.querySelector(".hamburger");
// const navLinks = document.querySelector(".nav-links");

// hamburger.addEventListener("click", () => {
//   navLinks.classList.toggle("active");
// });

// Mobile Navigation
const hamburger = document.querySelector(".hamburger");
const navLinks = document.querySelector(".nav-links");

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active");
  navLinks.classList.toggle("active");

  // Update ARIA attributes
  const isExpanded = hamburger.getAttribute("aria-expanded") === "true";
  hamburger.setAttribute("aria-expanded", !isExpanded);
});

// Close mobile menu when clicking a link
document.querySelectorAll(".nav-link").forEach((link) => {
  link.addEventListener("click", () => {
    if (window.innerWidth <= 768) {
      hamburger.classList.remove("active");
      navLinks.classList.remove("active");
      hamburger.setAttribute("aria-expanded", "false");
    }
  });
});

// Close menu when clicking outside
document.addEventListener("click", (e) => {
  if (
    window.innerWidth <= 768 &&
    !e.target.closest(".navbar") &&
    navLinks.classList.contains("active")
  ) {
    hamburger.classList.remove("active");
    navLinks.classList.remove("active");
    hamburger.setAttribute("aria-expanded", "false");
  }
});

// Newsletter Filtering
document.addEventListener("DOMContentLoaded", () => {
  const searchInput = document.getElementById("search");
  const tagFilters = document.querySelectorAll(".tag-filter");
  const newsletterCards = document.querySelectorAll(".newsletter-card");

  // Search functionality
  searchInput.addEventListener("input", () => {
    const searchTerm = searchInput.value.toLowerCase();

    newsletterCards.forEach((card) => {
      const title = card.querySelector("h3").textContent.toLowerCase();
      const description = card.querySelector("p").textContent.toLowerCase();
      const tags = card.querySelector(".tags").textContent.toLowerCase();

      if (
        title.includes(searchTerm) ||
        description.includes(searchTerm) ||
        tags.includes(searchTerm)
      ) {
        card.style.display = "block";
      } else {
        card.style.display = "none";
      }
    });
  });

  // Tag filtering
  tagFilters.forEach((filter) => {
    filter.addEventListener("click", () => {
      // Update active state
      tagFilters.forEach((f) => f.classList.remove("active"));
      filter.classList.add("active");

      const selectedTag = filter.dataset.tag;

      newsletterCards.forEach((card) => {
        const cardTags = card.dataset.tags.split(" ");

        if (selectedTag === "all" || cardTags.includes(selectedTag)) {
          card.style.display = "block";
        } else {
          card.style.display = "none";
        }
      });
    });
  });

  // Back to top button
  const backToTopButton = document.createElement("a");
  backToTopButton.href = "#";
  backToTopButton.className = "back-to-top";
  backToTopButton.innerHTML = "↑";
  document.body.appendChild(backToTopButton);

  window.addEventListener("scroll", () => {
    if (window.pageYOffset > 300) {
      backToTopButton.classList.add("visible");
    } else {
      backToTopButton.classList.remove("visible");
    }
  });
});
