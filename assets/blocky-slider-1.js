(function () {
  function moveSlide(root, direction) {
    const container = root.querySelector('.blocky-slider-container');
    if (!container) return;
    const slides = container.querySelectorAll('.slide');
    if (slides.length < 2) return;

    root.classList.remove('next', 'prev');
    root.classList.add(direction);

    if (direction === 'next') {
      container.appendChild(slides[0]);
    } else {
      container.insertBefore(slides[slides.length - 1], slides[0]);
    }

    window.setTimeout(() => {
      root.classList.remove('next', 'prev');
    }, 900);
  }

  function initSlider(root) {
    if (root.dataset.blockySliderOneReady === 'true') return;
    root.dataset.blockySliderOneReady = 'true';

    const prev = root.querySelector('#prev');
    const next = root.querySelector('#next');
    if (prev) prev.addEventListener('click', () => moveSlide(root, 'prev'));
    if (next) next.addEventListener('click', () => moveSlide(root, 'next'));
  }

  function init() {
    document.querySelectorAll('blocky-slider-1').forEach(initSlider);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
