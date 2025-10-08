import { API_BASE_URL } from './config.js';

const MOBILE_BREAKPOINT = 768; 
const DESKTOP_CARD_SPACING = 200;
const AUTOROTATE_INTERVAL = 4000;

/**
 * Creates a plan card DOM element from a plan object.
 * This is safer than using innerHTML and keeps the HTML structure separate.
 * @param {object} plan - The plan data from the API.
 * @param {number} index - The index of the plan.
 * @returns {HTMLElement} The created div element for the plan card.
 */
function createPlanCardElement(plan, index) {
    const card = document.createElement('div');
    card.className = 'plan-card';
    card.dataset.index = index;
    card.style.position = 'absolute';
    card.style.transition = 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)';

    const defaultThemeClass = 'border-2 border-[#56DEFC] ring-4 ring-[#56DEFC]/40 bg-[#E6FAFF] text-[#036B8A]';
    const defaultIconSvg = `<svg class="w-10 h-10 mb-2 text-gray-300 animate-bounce" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/><circle cx="12" cy="12" r="5"/></svg>`;

    const cardInner = document.createElement('div');
    cardInner.className = 'card-inner rounded-2xl shadow-xl p-8 flex flex-col items-center justify-center transition-all duration-300';
    
    const themeClasses = plan.color || defaultThemeClass;
    cardInner.classList.add(...themeClasses.split(' ').filter(Boolean));

    cardInner.style.minWidth = '260px';
    cardInner.style.maxWidth = '320px';
    cardInner.style.minHeight = '370px';

    cardInner.innerHTML = `
        ${plan.iconSvg || defaultIconSvg}
        <span class="font-semibold mb-2">${plan.name}</span> 
        <div class="text-3xl md:text-4xl font-bold mb-2">₱${plan.price} <span class="text-lg font-normal">/ Month</span></div>
        <ul class="space-y-2 mb-6 text-center">${plan.features.map(d => `<li>✔ ${d}</li>`).join('')}</ul>
    `;
    
    const applyButton = document.createElement('button');
    applyButton.className = 'apply-btn bg-[#56DEFC] hover:bg-[#0ea9bf] text-[#1a3139] font-bold px-6 py-2 rounded-full shadow transition hover:scale-110';
    applyButton.textContent = 'Apply Now →';
    applyButton.addEventListener('click', () => {
        window.location.href = 'register.html';
    });
    
    const noteParagraph = document.createElement('p');
    noteParagraph.className = 'plan-note text-sm mt-4 text-center transition-opacity duration-300';
    noteParagraph.textContent = plan.note || '';

    cardInner.querySelectorAll('span, div, ul, p').forEach(el => {
        el.classList.add('text-white');
    });
    
    cardInner.appendChild(applyButton);
    cardInner.appendChild(noteParagraph);
    card.appendChild(cardInner);

    return card;
}


export async function setupPlanCarousel() {
    const planCardsContainer = document.getElementById('plan-cards');
    if (!planCardsContainer) return;

    let plans = [];

    try {
        const response = await fetch(`${API_BASE_URL}/api/plans`);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        plans = await response.json();
        if (plans.length === 0) throw new Error("No plans found from API.");
    } catch (error) {
        console.error("Could not fetch plans:", error);
        planCardsContainer.innerHTML = `<p class="text-white text-center">We couldn't load our plans at the moment. Please try again later.</p>`;
        return;
    }
    
    let centerIndex = 0;
    let cardElements = [];
    let autoRotateInterval;
    let touchStartX = 0;
    let touchEndX = 0;

    planCardsContainer.style.position = 'relative';
    planCardsContainer.innerHTML = '';

    plans.forEach((plan, index) => {
        const cardElement = createPlanCardElement(plan, index);
        planCardsContainer.appendChild(cardElement);
    });
    cardElements = Array.from(planCardsContainer.children);

    function updateCarouselPositions(instant = false) {
        const n = plans.length;
        const isMobile = window.innerWidth < MOBILE_BREAKPOINT;

        cardElements.forEach((card, i) => {
            if (instant) card.style.transition = 'none';
            
            const note = card.querySelector('.plan-note');
            const button = card.querySelector('.apply-btn');
            let offset = i - centerIndex;
            if (offset > n / 2) offset -= n;
            if (offset < -n / 2) offset += n;
            
            if (isMobile) {
                let transform, opacity, z;
                if (offset === 0) {
                    transform = 'translateX(0px) scale(1)';
                    opacity = 1; z = 30;
                    note.style.opacity = '1'; button.style.pointerEvents = 'auto'; card.style.cursor = 'default';
                } else {
                    transform = `translateX(${offset * 100}%) scale(0.8)`;
                    opacity = 0; z = 10;
                    note.style.opacity = '0'; button.style.pointerEvents = 'none'; card.style.cursor = 'pointer';
                }
                card.style.transform = transform; card.style.opacity = opacity; card.style.zIndex = z;
                card.querySelector('.card-inner').style.filter = 'blur(0px)';

            } else {
                let scale, opacity, z, blur, x;
                switch (offset) {
                    case 0: scale = 1.1; opacity = 1; z = 30; blur = 0; x = 0; note.style.opacity = '1'; button.style.pointerEvents = 'auto'; card.style.cursor = 'default'; break;
                    case 1: case -1: scale = 0.9; opacity = 0.7; z = 20; blur = 1; x = offset * DESKTOP_CARD_SPACING; note.style.opacity = '0'; button.style.pointerEvents = 'none'; card.style.cursor = 'pointer'; break;
                    case 2: case -2: scale = 0.7; opacity = 0.4; z = 10; blur = 2; x = offset * DESKTOP_CARD_SPACING; note.style.opacity = '0'; button.style.pointerEvents = 'none'; card.style.cursor = 'pointer'; break;
                    default: scale = 0.5; opacity = 0; z = 0; blur = 3; x = offset > 0 ? DESKTOP_CARD_SPACING * 3 : -DESKTOP_CARD_SPACING * 3; button.style.pointerEvents = 'none'; card.style.cursor = 'default'; break;
                }
                card.style.transform = `translateX(${x}px) scale(${scale})`;
                card.style.zIndex = z; card.style.opacity = opacity;
                card.querySelector('.card-inner').style.filter = `blur(${blur}px)`;
            }
            
            if (instant) {
                card.offsetHeight;
                card.style.transition = 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)';
            }
        });
    }

    function changePlan(direction) {
        centerIndex = (centerIndex + direction + plans.length) % plans.length;
        updateCarouselPositions();
        startAutoRotate();
    }

    const startAutoRotate = () => {
        stopAutoRotate();
        autoRotateInterval = setInterval(() => changePlan(1), AUTOROTATE_INTERVAL);
    };
    const stopAutoRotate = () => clearInterval(autoRotateInterval);

    updateCarouselPositions(true);
    window.addEventListener('resize', () => updateCarouselPositions(true));
    document.getElementById('plan-next').onclick = () => changePlan(1);
    document.getElementById('plan-prev').onclick = () => changePlan(-1);
    document.getElementById('plan-next-mobile').onclick = () => changePlan(1);
    document.getElementById('plan-prev-mobile').onclick = () => changePlan(-1);
    planCardsContainer.addEventListener('click', (e) => {
        const clickedCard = e.target.closest('.plan-card');
        if (clickedCard && clickedCard.style.cursor === 'pointer') {
            centerIndex = parseInt(clickedCard.dataset.index, 10);
            updateCarouselPositions();
        }
    });
    planCardsContainer.addEventListener('mouseenter', stopAutoRotate);
    planCardsContainer.addEventListener('mouseleave', startAutoRotate);
    function handleSwipe() {
        const swipeThreshold = 50;
        const distance = touchEndX - touchStartX;
        if (distance > swipeThreshold) changePlan(-1);
        else if (distance < -swipeThreshold) changePlan(1);
    }
    planCardsContainer.addEventListener('touchstart', (e) => { touchStartX = e.changedTouches[0].screenX; stopAutoRotate(); }, { passive: true });
    planCardsContainer.addEventListener('touchend', (e) => { touchEndX = e.changedTouches[0].screenX; handleSwipe(); startAutoRotate(); });
    
    startAutoRotate();
}