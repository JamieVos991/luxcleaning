const slider = document.querySelector('.slider');
const overlay = document.querySelector('.image-overlay');
const button = document.querySelector('.slider-button');
const naarBovenKnop = document.querySelector('#naarBovenKnop')

naarBovenKnop.addEventListener('click', () => {
    window.scrollTo(0, 0);
})

window.addEventListener('scroll', () => {
    if (window.scrollY > 800) {
        naarBovenKnop.removeAttribute('hidden');
    } else {
        naarBovenKnop.setAttribute('hidden', '');
    }
  });
  

slider.addEventListener('input', (e) => {
  const value = e.target.value;
  
  // Pas de breedte van de voor foto aan
  overlay.style.width = `${value}%`;
  
  // Verplaats het witte lijntje mee
  button.style.left = `${value}%`;
});