document.addEventListener('DOMContentLoaded', () => {
  if (sessionStorage.getItem('loaderShown')) {
    const loadingScreen = document.getElementById('loading-screen');
    if (loadingScreen) {
      loadingScreen.style.display = 'none';
    }
    return;
  }

  const particlesContainer = document.querySelector('.particles-container');
  if (particlesContainer) {
    const PARTICLE_COUNT = 30;
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const particle = document.createElement('div');
      particle.classList.add('particle');

      const angle = Math.random() * 360;
      const duration = 2 + Math.random() * 3;
      const delay = Math.random() * 4;

      particle.animate([
        { transform: 'translate(-50%, -50%) rotate(0deg) translateX(0px) scale(1)', opacity: 1 },
        { transform: `translate(-50%, -50%) rotate(${angle}deg) translateX(200px) scale(0)`, opacity: 0 }
      ], {
        duration: duration * 1000,
        delay: delay * 1000,
        iterations: Infinity,
        easing: 'ease-out'
      });
      
      particlesContainer.appendChild(particle);
    }
  }

  const MINIMUM_LOAD_TIME = 1500;
  const loadingScreen = document.getElementById('loading-screen');
  
  if (!loadingScreen) {
    console.error('[Loader] Error: Could not find the #loading-screen element.');
    return;
  }

  let minimumTimeElapsed = false;
  let pageIsLoaded = false;

  const hideLoader = () => {
    loadingScreen.style.opacity = '0';
    loadingScreen.addEventListener('transitionend', () => {
      loadingScreen.style.display = 'none';

      try {
        sessionStorage.setItem('loaderShown', 'true');
      } catch (e) {
        console.error('[Loader] Could not set sessionStorage. Loader may show on every page.', e);
      }

    }, { once: true });
  };

  setTimeout(() => {
    minimumTimeElapsed = true;
    if (pageIsLoaded) {
      hideLoader();
    }
  }, MINIMUM_LOAD_TIME);

  window.addEventListener('load', () => {
    pageIsLoaded = true;
    if (minimumTimeElapsed) {
      hideLoader();
    }
  });
});