
document.addEventListener("DOMContentLoaded", function () {
  const carousels = document.querySelectorAll(".linkedin-carousel");

  carousels.forEach(function (carousel) {
    const track = carousel.querySelector(".linkedin-track");
    const slides = carousel.querySelectorAll(".linkedin-slide");
    const dots = carousel.querySelectorAll(".linkedin-dot");
    const prev = carousel.querySelector(".linkedin-prev");
    const next = carousel.querySelector(".linkedin-next");
    const counter = carousel.querySelector(".linkedin-counter");

    // Prüfen, ob alle wichtigen Elemente vorhanden sind
    if (!track || slides.length === 0 || !prev || !next) {
      console.error("LinkedIn carousel: Elemente fehlen.", carousel);
      return;
    }

    let currentIndex = 0;
    let autoplayTimer = null;

    function showSlide(index) {
      currentIndex = (index + slides.length) % slides.length;

      track.style.transform =
        "translateX(-" + currentIndex * 100 + "%)";

      dots.forEach(function (dot, i) {
        dot.classList.toggle("active", i === currentIndex);
        dot.setAttribute(
          "aria-current",
          i === currentIndex ? "true" : "false"
        );
      });

      if (counter) {
        counter.textContent =
          String(currentIndex + 1).padStart(2, "0") +
          " / " +
          String(slides.length).padStart(2, "0");
      }
    }

    function stopAutoplay() {
      if (autoplayTimer !== null) {
        clearInterval(autoplayTimer);
        autoplayTimer = null;
      }
    }

    function startAutoplay() {
      stopAutoplay();

      autoplayTimer = setInterval(function () {
        showSlide(currentIndex + 1);
      }, 5000);
    }

    prev.addEventListener("click", function () {
      showSlide(currentIndex - 1);
      startAutoplay();
    });

    next.addEventListener("click", function () {
      showSlide(currentIndex + 1);
      startAutoplay();
    });

    dots.forEach(function (dot, i) {
      dot.addEventListener("click", function () {
        showSlide(i);
        startAutoplay();
      });
    });

    // Beim Darüberfahren oder Bedienen pausieren
    carousel.addEventListener("mouseenter", stopAutoplay);
    carousel.addEventListener("mouseleave", startAutoplay);
    carousel.addEventListener("focusin", stopAutoplay);
    carousel.addEventListener("focusout", function (event) {
      if (!carousel.contains(event.relatedTarget)) {
        startAutoplay();
      }
    });

    showSlide(0);
    startAutoplay();
  });
});
