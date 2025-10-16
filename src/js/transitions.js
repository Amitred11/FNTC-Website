// js/transitions.js

/**
 * Handles the fade-out effect and navigates to a new page.
 * @param {string} url - The URL of the page to transition to.
 */
function transitionToPage(url) {
  document.body.classList.add('fade-out');
  setTimeout(() => {
    window.location.href = url;
  }, 400);
}

document.addEventListener('DOMContentLoaded', () => {
  setTimeout(() => {
    document.body.classList.add('fade-in');
  }, 50);
});

document.addEventListener('DOMContentLoaded', () => {
    const serviceLinks = document.querySelectorAll('#services .group');
    
    const serviceModal = document.getElementById('serviceModal');
    const serviceModalBox = document.getElementById('serviceModalBox');
    const closeServiceModal = document.getElementById('closeServiceModal');
    const serviceModalImage = document.getElementById('serviceModalImage');
    const serviceModalTitle = document.getElementById('serviceModalTitle');
    const serviceModalDescription = document.getElementById('serviceModalDescription');
    const serviceModalLink = document.getElementById('serviceModalLink'); // The link for attribution
    const imageSourceName = document.getElementById('imageSourceName'); // The new span for the source name

    // Ensure all required elements are on the page
    if (serviceLinks.length > 0 && serviceModal && imageSourceName) {
        
        serviceLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault(); // Prevent default link behavior

                // --- 1. Get data from the clicked card ---
                const title = link.dataset.title;
                const description = link.dataset.description;
                const imgSrc = link.querySelector('img').src;
                const sourceUrl = link.dataset.source;
                const sourceName = link.dataset.sourceName; // Get the new source name data

                // --- 2. Populate the modal with the data ---
                serviceModalTitle.textContent = title;
                serviceModalDescription.textContent = description;
                serviceModalImage.src = imgSrc;

                // Update the attribution link and its text
                if (sourceUrl && sourceName) {
                    serviceModalLink.href = sourceUrl;
                    imageSourceName.textContent = sourceName; // Set the text of the span
                    serviceModalLink.style.display = 'inline'; // Show the link
                } else {
                    serviceModalLink.style.display = 'none'; // Hide if no source is provided
                }

                // --- 3. Show the modal with a transition ---
                serviceModal.classList.remove('hidden');
                setTimeout(() => {
                    serviceModalBox.classList.remove('scale-90', 'opacity-0');
                }, 10);
            });
        });


        const closeModal = () => {
            serviceModalBox.classList.add('scale-90', 'opacity-0');
            setTimeout(() => {
                serviceModal.classList.add('hidden');
            }, 300);
        };

        closeServiceModal.addEventListener('click', closeModal);
        serviceModal.addEventListener('click', (e) => {
            if (e.target === serviceModal) {
                closeModal();
            }
        });
    }
});


const transitionLinks = document.querySelectorAll('a[data-transition-link]');

transitionLinks.forEach(link => {
  link.addEventListener('click', (event) => {
    event.preventDefault(); 
    const destinationUrl = link.href;
    transitionToPage(destinationUrl);
  });
});