(function () {
  function setup(root) {
    const track = root.querySelector('.blocky-slider-2-carousel-track');
    const slides = Array.from(root.querySelectorAll('.blocky-image-video-slider-2-carousel-slide'));
    const prev = root.querySelector('.left-arrow');
    const next = root.querySelector('.right-arrow');
    if (!track || slides.length === 0) return;

    let index = 0;

    function perView() {
      return window.innerWidth < 750 ? 1 : 3;
    }

    function maxIndex() {
      return Math.max(slides.length - perView(), 0);
    }

    function render() {
      const width = 100 / perView();
      slides.forEach((slide) => {
        slide.style.flex = `0 0 ${width}%`;
      });
      track.style.transform = `translateX(-${index * width}%)`;
      if (prev) prev.classList.toggle('disabled', index <= 0);
      if (next) next.classList.toggle('disabled', index >= maxIndex());
    }

    if (prev) {
      prev.addEventListener('click', () => {
        index = Math.max(index - 1, 0);
        render();
      });
    }
    if (next) {
      next.addEventListener('click', () => {
        index = Math.min(index + 1, maxIndex());
        render();
      });
    }
    window.addEventListener('resize', () => {
      index = Math.min(index, maxIndex());
      render();
    });
    render();
  }

  function init() {
    document.querySelectorAll('blocky-slider-2').forEach((root) => {
      if (root.dataset.blockySliderTwoReady === 'true') return;
      root.dataset.blockySliderTwoReady = 'true';
      setup(root);
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
