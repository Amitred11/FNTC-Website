// js/transitions.js

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
    const serviceModalLink = document.getElementById('serviceModalLink'); 
    const imageSourceName = document.getElementById('imageSourceName');

    if (serviceLinks.length > 0 && serviceModal && imageSourceName) {
        
        serviceLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault(); 

                const title = link.dataset.title;
                const description = link.dataset.description;
                const imgSrc = link.querySelector('img').src;
                const sourceUrl = link.dataset.source;
                const sourceName = link.dataset.sourceName; 

                serviceModalTitle.textContent = title;
                serviceModalDescription.textContent = description;
                serviceModalImage.src = imgSrc;

                if (sourceUrl && sourceName) {
                    serviceModalLink.href = sourceUrl;
                    imageSourceName.textContent = sourceName;
                    serviceModalLink.style.display = 'inline'; 
                } else {
                    serviceModalLink.style.display = 'none'; 
                }

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