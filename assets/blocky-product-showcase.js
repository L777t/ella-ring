(function () {
  function setHeight(container, activeItem) {
    if (!container || !activeItem) return;
    const height = activeItem.offsetHeight;
    if (height > 0) {
      container.style.height = `${height}px`;
    }
  }

  function setup(root) {
    const buttons = Array.from(root.querySelectorAll('.blocky-showcase-button'));
    const items = Array.from(root.querySelectorAll('.blocky-showcase-showcase'));
    const container = root.querySelector('.blocky-showcase-container');
    if (!buttons.length || !items.length) return;

    function activate(index) {
      buttons.forEach((button, buttonIndex) => {
        button.classList.toggle('blocky-showcase-button-active', buttonIndex === index);
      });
      items.forEach((item, itemIndex) => {
        item.classList.toggle('blocky-showcase-showcase-active', itemIndex === index);
      });
      setHeight(container, items[index]);
    }

    buttons.forEach((button, index) => {
      button.addEventListener('click', () => activate(index));
    });

    window.addEventListener('resize', () => {
      const activeIndex = items.findIndex((item) => item.classList.contains('blocky-showcase-showcase-active'));
      activate(activeIndex >= 0 ? activeIndex : 0);
    });

    activate(0);
  }

  function init() {
    document.querySelectorAll('blocky-product-showcase').forEach((root) => {
      if (root.dataset.blockyShowcaseReady === 'true') return;
      root.dataset.blockyShowcaseReady = 'true';
      setup(root);
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
