// Scroll animation
const cards = document.querySelectorAll('.card');

window.addEventListener('scroll', () => {
  cards.forEach(card => {
    const top = card.getBoundingClientRect().top;

    if (top < window.innerHeight - 100) {
      card.style.opacity = "1";
      card.style.transform = "translateY(0)";
    }
  });
});

// Initial state
cards.forEach(card => {
  card.style.opacity = "0";
  card.style.transform = "translateY(50px)";
  card.style.transition = "0.6s ease";
});

const toggle = document.getElementById("menu-toggle");
const menu = document.getElementById("nav-menu");
const dropdowns = document.querySelectorAll(".nav-dropdown");

if (toggle && menu) {
  toggle.addEventListener("click", () => {
    menu.classList.toggle("active");
    if (!menu.classList.contains("active")) {
      dropdowns.forEach(dropdown => {
        dropdown.classList.remove("open");
        const trigger = dropdown.querySelector(".nav-dropdown-toggle");
        if (trigger) {
          trigger.setAttribute("aria-expanded", "false");
        }
      });
    }
  });
}

dropdowns.forEach(dropdown => {
  const trigger = dropdown.querySelector(".nav-dropdown-toggle");

  if (!trigger) {
    return;
  }

  trigger.addEventListener("click", (event) => {
    event.preventDefault();

    const nextState = !dropdown.classList.contains("open");

    dropdowns.forEach(other => {
      if (other !== dropdown) {
        other.classList.remove("open");
        const otherTrigger = other.querySelector(".nav-dropdown-toggle");
        if (otherTrigger) {
          otherTrigger.setAttribute("aria-expanded", "false");
        }
      }
    });

    dropdown.classList.toggle("open", nextState);
    trigger.setAttribute("aria-expanded", String(nextState));
  });
});

document.addEventListener("click", (event) => {
  if (!event.target.closest(".nav-dropdown")) {
    dropdowns.forEach(dropdown => {
      dropdown.classList.remove("open");
      const trigger = dropdown.querySelector(".nav-dropdown-toggle");
      if (trigger) {
        trigger.setAttribute("aria-expanded", "false");
      }
    });
  }
});
