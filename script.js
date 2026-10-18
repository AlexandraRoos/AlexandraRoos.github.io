document.querySelectorAll(".linkedin-carousel").forEach((carousel) => {
    const track = carousel.querySelector(".linkedin-track");
    const slides = carousel.querySelectorAll(".linkedin-slide");
    const dots = carousel.querySelectorAll(".linkedin-dot");
    const prev = carousel.querySelector(".linkedin-prev");
    const next = carousel.querySelector(".linkedin-next");
    const counter = carousel.querySelector(".linkedin-counter");

    let current = 0;
    let autoplay;

    function showSlide(index) {
        current = (index + slides.length) % slides.length;

        track.style.transform = `translateX(-${current * 100}%)`;

        dots.forEach((dot, i) => {
            dot.classList.toggle("active", i === current);
            dot.setAttribute("aria-current",
                i === current ? "true" : "false");
        });

        counter.textContent =
            `${String(current + 1).padStart(2, "0")} / ${String(slides.length).padStart(2, "0")}`;
    }

    function startAutoplay() {
        stopAutoplay();
        autoplay = setInterval(() => showSlide(current + 1), 3000);
    }

    function stopAutoplay() {
        clearInterval(autoplay);
    }

    prev.addEventListener("click", () => {
        showSlide(current - 1);
        startAutoplay();
    });

    next.addEventListener("click", () => {
        showSlide(current + 1);
        startAutoplay();
    });

    dots.forEach((dot, i) => {
        dot.addEventListener("click", () => {
            showSlide(i);
            startAutoplay();
        });
    });

    carousel.addEventListener("mouseenter", stopAutoplay);
    carousel.addEventListener("mouseleave", startAutoplay);
    carousel.addEventListener("focusin", stopAutoplay);
    carousel.addEventListener("focusout", startAutoplay);

    showSlide(0);
    startAutoplay();
});
