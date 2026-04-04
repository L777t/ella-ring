(function () {
  function setupAccordion(root) {
    const buttons = root.querySelectorAll('.blocky-accordion-btn');
    buttons.forEach((button) => {
      if (button.dataset.blockyAccordionBound === 'true') return;
      button.dataset.blockyAccordionBound = 'true';
      button.addEventListener('click', () => {
        const item = button.closest('.blocky-faq-item');
        const answer = item ? item.querySelector('.blocky-faq-answer') : button.nextElementSibling;
        const isActive = button.classList.contains('active');
        button.classList.toggle('active', !isActive);
        if (answer) {
          answer.classList.toggle('active', !isActive);
          answer.style.display = isActive ? 'none' : 'block';
        }
      });
    });

    root.querySelectorAll('.blocky-faq-answer').forEach((answer) => {
      if (answer.classList.contains('active')) {
        answer.style.display = 'block';
      } else {
        answer.style.display = 'none';
      }
    });
  }

  function init() {
    document.querySelectorAll('blocky-accordion, .blocky-accordion').forEach(setupAccordion);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
