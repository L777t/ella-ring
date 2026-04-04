(function () {
  function setupGlide(root) {
    const slides = Array.from(root.querySelectorAll('.glide__slide'));
    if (!slides.length) return;

    const prevButtons = root.querySelectorAll('[data-glide-dir="<"]');
    const nextButtons = root.querySelectorAll('[data-glide-dir=">"]');
    const bullets = Array.from(root.querySelectorAll('.glide__bullet'));
    let index = 0;

    function render() {
      slides.forEach((slide, slideIndex) => {
        slide.style.display = slideIndex === index ? '' : 'none';
      });
      bullets.forEach((bullet, bulletIndex) => {
        bullet.classList.toggle('is-active', bulletIndex === index);
        bullet.setAttribute('aria-current', bulletIndex === index ? 'true' : 'false');
      });
    }

    prevButtons.forEach((button) => {
      button.addEventListener('click', () => {
        index = (index - 1 + slides.length) % slides.length;
        render();
      });
    });

    nextButtons.forEach((button) => {
      button.addEventListener('click', () => {
        index = (index + 1) % slides.length;
        render();
      });
    });

    bullets.forEach((bullet, bulletIndex) => {
      bullet.addEventListener('click', () => {
        index = bulletIndex;
        render();
      });
    });

    render();
  }

  function init() {
    document.querySelectorAll('blocky-media-slider, .glide').forEach((root) => {
      if (root.dataset.blockyGlideReady === 'true') return;
      root.dataset.blockyGlideReady = 'true';
      setupGlide(root);
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
