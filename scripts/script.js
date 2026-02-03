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
      return item ? item.offsetWidth + 16 : 300;
    };

    const autoNext = () => {
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

    let scrollInterval = setInterval(autoNext, 1500);

    const restartTimer = () => {
      clearInterval(scrollInterval);
      scrollInterval = setInterval(autoNext, 1500);
    };

    nextBtn.addEventListener('click', () => { autoNext(); restartTimer(); });
    prevBtn.addEventListener('click', () => { autoPrev(); restartTimer(); });

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

  // --- 4. Formulier verzenden naar Nodemailer ---
  const form = document.getElementById('offerteForm');
  if (form) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      
      // Verzamel geselecteerde checkboxes
      const geselecteerdeDiensten = [];
      document.querySelectorAll('input[name="diensten"]:checked').forEach((cb) => {
        geselecteerdeDiensten.push(cb.value);
      });

      // Bouw het data object op (Zorg dat deze ID's in je HTML staan!)
      const data = {
        naam: document.getElementById('naam').value,
        email: document.getElementById('email').value,
        telefoon: document.getElementById('telefoon').value,
        bedrijf: document.getElementById('bedrijf').value, // Nieuw
        adres: document.getElementById('adres').value,
        postcode: document.getElementById('postcode').value,
        gemeente: document.getElementById('gemeente').value,
        doel: document.querySelector('input[name="doel"]:checked')?.value || "Niet opgegeven", // Nieuw
        bericht: document.getElementById('bericht').value,
        diensten: geselecteerdeDiensten
      };
    
      try {
        const response = await fetch('http://localhost:3000/send-email', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data)
        });
    
        if (response.ok) {
          alert('Bedankt! Uw offerteaanvraag is succesvol verzonden.');
          form.reset();
        } else {
          alert('Er ging iets mis op de server. Probeer het later opnieuw.');
        }
      } catch (error) {
        console.error('Fout:', error);
        alert('Kon geen verbinding maken met de server. Staat de Node.js server aan?');
      }
    });
  }
});