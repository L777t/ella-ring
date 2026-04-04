(function () {
  function applySlider(root, value) {
    const beforeImage = root.querySelector('.blocky-before-after-before-image');
    const line = root.querySelector('.blocky-before-after-slider-line');
    const percent = `${value}%`;
    if (beforeImage) {
      beforeImage.style.clipPath = `inset(0 ${100 - value}% 0 0)`;
    }
    if (line) {
      line.style.left = percent;
    }
  }

  function initSlider(root) {
    const input = root.querySelector('.blocky-before-after-slider-input');
    if (!input || input.dataset.blockyBeforeAfterReady === 'true') return;
    input.dataset.blockyBeforeAfterReady = 'true';
    const sync = () => applySlider(root, Number(input.value || 50));
    input.addEventListener('input', sync);
    sync();
  }

  function init() {
    document.querySelectorAll('blocky-before-after-slider').forEach(initSlider);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
