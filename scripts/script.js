const slider = document.querySelector('.slider');
const overlay = document.querySelector('.image-overlay');
const button = document.querySelector('.slider-button');

  

slider.addEventListener('input', (e) => {
  const value = e.target.value;
  
  // Pas de breedte van de voor foto aan
  overlay.style.width = `${value}%`;
  
  // Verplaats het witte lijntje mee
  button.style.left = `${value}%`;
});