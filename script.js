// Accordion for Experience Section

const accordions = document.querySelectorAll(".accordion");

accordions.forEach((accordion) => {

    accordion.addEventListener("click", () => {

        accordion.classList.toggle("active");

        const panel = accordion.nextElementSibling;

        if (panel.style.display === "block") {
            panel.style.display = "none";
        } else {
            panel.style.display = "block";
        }

    });

});

// Simple fade-in animation

const cards = document.querySelectorAll(".card");

function revealCards() {

    cards.forEach((card) => {

        const cardTop = card.getBoundingClientRect().top;
        const trigger = window.innerHeight - 100;

        if (cardTop < trigger) {
            card.style.opacity = "1";
            card.style.transform = "translateY(0)";
        }

    });

}

window.addEventListener("scroll", revealCards);
window.addEventListener("load", revealCards);
