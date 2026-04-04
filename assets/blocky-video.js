(function () {
  function initBlockyVideo(root) {
    root.querySelectorAll('.blocky-video').forEach((wrapper) => {
      if (wrapper.dataset.blockyVideoReady === 'true') return;
      wrapper.dataset.blockyVideoReady = 'true';

      const deferredPoster = wrapper.querySelector('.deferred-media__poster');
      const button = wrapper.querySelector('.blocky-video-play-button');
      if (button && deferredPoster) {
        button.addEventListener('click', () => deferredPoster.click());
      }
    });
  }

  function init() {
    initBlockyVideo(document);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
