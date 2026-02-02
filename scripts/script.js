document.addEventListener("DOMContentLoaded", () => {
  // --- 1. Vergelijking Slider (Sectie 2) ---
  const compInput = document.querySelector('.comparison-slider .slider');
  const compOverlay = document.querySelector('.image-overlay');
  const compBtn = document.querySelector('.slider-button');

  if (compInput && compOverlay && compBtn) {
    compInput.addEventListener('input', (e) => {
      const val = e.target.value;
      compOverlay.style.width = `${val}%`;
      compBtn.style.left = `${val}%`;
    });
  }

  // --- 2. Automatische Carrousel (Sectie 5) ---
  const carousel = document.querySelector('.carousel-slider');
  const nextBtn = document.querySelector('.next-btn');
  const prevBtn = document.querySelector('.prev-btn');

  if (carousel && nextBtn && prevBtn) {
    const getScrollStep = () => {
      const item = carousel.querySelector('li');
      return item ? item.offsetWidth + 16 : 300; // 16 is de gap
    };

    const autoNext = () => {
      // Check of we aan het einde zijn
      const isEnd = carousel.scrollLeft + carousel.offsetWidth >= carousel.scrollWidth - 20;
      if (isEnd) {
        carousel.scrollTo({ left: 0, behavior: 'smooth' });
      } else {
        carousel.scrollBy({ left: getScrollStep(), behavior: 'smooth' });
      }
    };

    const autoPrev = () => {
      if (carousel.scrollLeft <= 10) {
        carousel.scrollTo({ left: carousel.scrollWidth, behavior: 'smooth' });
      } else {
        carousel.scrollBy({ left: -getScrollStep(), behavior: 'smooth' });
      }
    };

    // Timer voor automatisch scrollen
    let scrollInterval = setInterval(autoNext, 1500);

    const restartTimer = () => {
      clearInterval(scrollInterval);
      scrollInterval = setInterval(autoNext, 1500);
    };

    // Knoppen koppelen
    nextBtn.addEventListener('click', () => { autoNext(); restartTimer(); });
    prevBtn.addEventListener('click', () => { autoPrev(); restartTimer(); });

    // Pauzeren bij hover
    carousel.addEventListener('mouseenter', () => clearInterval(scrollInterval));
    carousel.addEventListener('mouseleave', restartTimer);
  }

  // --- 3. Naar Boven Knop ---
  const topBtn = document.getElementById('naarBovenKnop');
  if (topBtn) {
    window.addEventListener('scroll', () => {
      topBtn.hidden = window.scrollY < 800;
    });
    topBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  }
});