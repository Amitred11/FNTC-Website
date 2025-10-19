document.addEventListener('DOMContentLoaded', () => {
  // Fetch the loader HTML and inject it into the body
  fetch('loader.html')
    .then(response => response.text())
    .then(data => {
      document.body.insertAdjacentHTML('afterbegin', data);
      
      // Now that the loader is in the DOM, add the event listener for when the page is fully loaded
      window.addEventListener('load', () => {
        const loadingScreen = document.getElementById('loading-screen');
        if (loadingScreen) {
          loadingScreen.style.opacity = '0';
          setTimeout(() => {
            loadingScreen.style.display = 'none';
          }, 500); // Matches the transition duration
        }
      });
    })
    .catch(error => console.error('Error loading the loader:', error));
});