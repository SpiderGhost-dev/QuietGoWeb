// QuietGo Hub front-end helpers (UI only placeholder)
document.addEventListener('DOMContentLoaded', () => {
  const cards = document.querySelectorAll('.card');
  cards.forEach(card => {
    card.addEventListener('mouseenter', () => {
      card.classList.add('card-hover');
    });
    card.addEventListener('mouseleave', () => {
      card.classList.remove('card-hover');
    });
  });
  console.log('QuietGo Hub UI initialised');
});
