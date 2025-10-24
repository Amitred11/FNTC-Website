// ==================================================================
// 1. Imports
// ==================================================================
import { COMPANY_NAME, MISSION_POINTS, VISION_POINTS, CEO_NAME } from './constants/constants.js';
import { setupPlanCarousel } from './plans.js'
import { showAlert } from './utils.js'; 
import { API_BASE_URL } from './config.js'; 

// ==================================================================
// 2. DOMContentLoaded
// ==================================================================

document.addEventListener('DOMContentLoaded', () => {
    const hamburgerBtn = document.getElementById('hamburger-button');
    const mobileMenu = document.getElementById('mobile-menu');
    hamburgerBtn.addEventListener('click', () => mobileMenu.classList.toggle('hidden'));
    mobileMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => setTimeout(() => mobileMenu.classList.add('hidden'), 300));
    });
    populateAboutModal();

    setupPlanCarousel();
    setupVideoModal();
});


// ==================================================================
// 3. Navbar Sticky Effect
// ==================================================================
window.addEventListener("scroll", function() {
  const navbar = document.getElementById("navbar");
  if (window.scrollY > 50) {
    navbar.classList.add("bg-[#121418]", "shadow-lg");
  } else {
    navbar.classList.remove("bg-[#121418]", "shadow-lg");
  }
});


// ==================================================================
// 4. "About Us" Modal Logic (Refactored)
// ==================================================================

function createModalSection(icon, title, subtitle, points) {
  return `
    <div class="flex items-start mb-3">
      ${icon}
      <div>
        <h2 class="text-2xl font-bold text-white">${title}</h2>
        <p class="text-gray-300 mt-1">${subtitle}</p>
      </div>
    </div>
    <ol class="list-decimal list-inside space-y-2 pl-5 text-gray-200">
      ${points.map(point => `<li>${point}</li>`).join('')}
    </ol>
  `;
}

function createAboutBox(icon, companyName, ceoName) {
  const shortName = companyName.split(' ')[0];
  return `
    <div class="bg-white/10 p-6 rounded-lg border border-gray-600 h-full backdrop-blur-md">
      <div class="flex items-center mb-4">
        ${icon}
        <h2 class="text-2xl font-bold text-white">About ${shortName}</h2>
      </div>
      <div class="text-gray-200 leading-relaxed space-y-4">
        <p>
          <span class="font-bold text-cyan-400">${companyName} (FNTC)</span> is an IT company formally established on June 06, 2022, by a group of fifteen talented and skilled entrepreneurs who shared a common mission — to provide affordable, fast, and reliable internet services to communities, especially in hard-to-reach areas of the country.
        </p>
        <p>
          The journey began when our CEO, <span class="font-bold text-cyan-400">${ceoName}</span>, started a business in WiFi-vendo and point-to-point internet services during the pandemic lockdowns in 2020. He soon realized the growing demand for reliable and affordable internet connections, particularly in areas where supply was scarce.
        </p>
        <p>
          Seeing this as both a need and an opportunity, he invited 14 of his friends — experts in various fields of IT — to collaborate and form what is now <span class="font-bold text-cyan-400">${companyName}</span>.
        </p>
        <p>
          With proper permits and business documents secured, <span class="font-bold text-cyan-400">${companyName}</span> is off to a strong start and is expected to thrive not only in Region 4 but throughout the entire country.
        </p>
      </div>
      <p class="mt-6 text-sm text-right text-gray-400 italic border-t border-gray-600 pt-4">
        - ${ceoName}, CEO
      </p>
    </div>
  `;
}

function populateAboutModal() {
  const missionSection = document.getElementById('mission-section');
  const visionSection = document.getElementById('vision-section');
  const aboutSection = document.getElementById('about-section');

  if (!missionSection || !visionSection || !aboutSection) return;

  const missionIcon = `<svg class="w-8 h-8 text-cyan-600 mr-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path></svg>`;
  const visionIcon = `<svg class="w-8 h-8 text-cyan-600 mr-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path></svg>`;
  const aboutIcon = `<svg class="w-8 h-8 text-cyan-600 mr-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>`;

  missionSection.innerHTML = createModalSection(missionIcon, "Our Mission", "To provide affordable, quality ICT services across the country.", MISSION_POINTS);
  visionSection.innerHTML = createModalSection(visionIcon, "Our Vision", "To achieve 100% customer satisfaction by delivering quality services at an affordable rate.", VISION_POINTS);
  aboutSection.innerHTML = createAboutBox(aboutIcon, COMPANY_NAME, CEO_NAME);
}

const aboutModal = document.getElementById("modal");
const openAboutBtn = document.getElementById("openModal");
const closeAboutBtn = document.getElementById("closeAboutModal");
const aboutModalBox = aboutModal.querySelector("div");

function openAboutModal() {
  aboutModal.classList.remove("hidden");
  setTimeout(() => {
    aboutModalBox.classList.remove("scale-90", "opacity-0");
    aboutModalBox.classList.add("scale-100", "opacity-100");
  }, 50);
}

function closeAboutModal() {
  aboutModalBox.classList.add("scale-90", "opacity-0");
  aboutModalBox.classList.remove("scale-100", "opacity-100");
  setTimeout(() => {
    aboutModal.classList.add("hidden");
  }, 300);
}

openAboutBtn.addEventListener("click", openAboutModal);
closeAboutBtn.addEventListener("click", closeAboutModal);
aboutModal.addEventListener("click", (e) => {
  if (e.target === aboutModal) closeAboutModal();
});

// ==================================================================
// 5. "Service Card" Modal Logic
// ==================================================================
const serviceModal = document.getElementById("serviceModal");
const serviceModalTitle = document.getElementById("serviceModalTitle");
const serviceModalDescription = document.getElementById("serviceModalDescription");
const serviceModalBox = document.getElementById("serviceModalBox");
const closeServiceModalBtn = document.getElementById('closeServiceModal');

function openServiceModal(event) {
  event.preventDefault();
  const title = event.currentTarget.getAttribute("data-title");
  const description = event.currentTarget.getAttribute("data-description");
  
  serviceModalTitle.textContent = title;
  serviceModalDescription.textContent = description;
  serviceModal.classList.remove("hidden");

  setTimeout(() => {
    serviceModalBox.classList.remove("scale-90", "opacity-0");
    serviceModalBox.classList.add("scale-100", "opacity-100");
  }, 50);
}

function closeServiceModal() {
  serviceModalBox.classList.add("scale-90", "opacity-0");
  serviceModalBox.classList.remove("scale-100", "opacity-100");
  setTimeout(() => {
    serviceModal.classList.add("hidden");
  }, 300);
}

document.querySelectorAll('a[data-title]').forEach(card => {
    card.addEventListener('click', openServiceModal);
});

closeServiceModalBtn.addEventListener('click', closeServiceModal);
serviceModal.addEventListener('click', (e) => {
  if (e.target === serviceModal) closeServiceModal();
});


// ==================================================================
// 6. Animation Initialization (AOS)
// ==================================================================
AOS.init({
  duration: 800,
  once: true,
  mirror: false,
});

window.addEventListener('load', () => AOS.refresh());
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', () => setTimeout(() => AOS.refreshHard(), 600));
});


// ==================================================================
// 7. Contact Form Logic (MODIFIED)
// ==================================================================
const contactForm = document.getElementById("contactForm");
const formStatus = document.getElementById('form-status');
const submitBtn = document.getElementById('contact-submit-btn');

contactForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  
  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const subject = document.getElementById("subject").value.trim();
  const message = document.getElementById("message").value.trim();

  if (!name || !email || !subject || !message) {
    showAlert('Please fill out all fields.');
    return;
  }

  submitBtn.disabled = true;
  submitBtn.textContent = 'Sending...';
  formStatus.textContent = '';

  try {
    const response = await fetch(`${API_BASE_URL}/api/contact/submit`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, subject, message })
    });

    const data = await response.json();

    if (response.ok) {
        formStatus.textContent = 'Message sent successfully!';
        formStatus.className = 'text-green-400';
        contactForm.reset();
    } else {
        const data = await response.json().catch(() => ({ message: 'Could not send the message.' }));
        if (response.status >= 500) {
            showAlert('A server error occurred. Please try again later.');
            formStatus.textContent = 'Error: A problem occurred on our end.';
        } else {
            showAlert(data.message || 'An error occurred. Please check your input and try again.');
            formStatus.textContent = `Error: ${data.message || 'Could not send message.'}`;
        }
        formStatus.className = 'text-red-400';
    }

  } catch (error) {
    console.error("Contact form submission failed:", error);
    showAlert('Could not connect to the server. Please check your internet connection.');
    formStatus.textContent = 'Error: Network connection failed.';
    formStatus.className = 'text-red-400';
  } finally {
    submitBtn.disabled = false;
    submitBtn.textContent = 'Submit';
  }
});

// ==================================================================
// 8. Video Modal Logic (FINAL REFACTOR v4 - With Info Modal)
// ==================================================================
function setupVideoModal() {
    // --- Element Selection ---
    const openModalBtn = document.getElementById('open-video-modal-btn');
    const closeModalBtn = document.getElementById('close-video-modal-btn');
    const videoModal = document.getElementById('video-modal');
    const videoContainer = document.getElementById('video-container');
    const videoPlayer = document.getElementById('local-video-player');
    const customControlsBar = document.getElementById('custom-controls-bar');
    const infoBtn = document.getElementById('video-info-btn');
    const videoInfoModal = document.getElementById('video-info-modal');
    const closeInfoModalBtn = document.getElementById('close-video-info-modal-btn');

    if (!openModalBtn || !videoModal || !videoPlayer || !customControlsBar || !videoInfoModal) {
        console.error("Video modal elements are missing."); return;
    }

    const playPauseBtn = document.getElementById('play-pause-btn');
    const playIcon = document.getElementById('play-icon');
    const pauseIcon = document.getElementById('pause-icon');
    const progressBarContainer = document.getElementById('progress-bar-container');
    const progressBar = document.getElementById('progress-bar');
    const timeDisplay = document.getElementById('time-display');
    const volumeBtn = document.getElementById('volume-btn');
    const volumeHighIcon = document.getElementById('volume-high-icon');
    const volumeMutedIcon = document.getElementById('volume-muted-icon');
    const volumeSlider = document.getElementById('volume-slider');
    const speedBtn = document.getElementById('speed-btn');
    const fullscreenBtn = document.getElementById('fullscreen-btn');

    let controlsTimeout;

    // --- Core Functions ---
    const showControls = () => { customControlsBar.classList.add('controls-visible'); clearTimeout(controlsTimeout); if (!videoPlayer.paused) { controlsTimeout = setTimeout(hideControls, 3000); } };
    const hideControls = () => { customControlsBar.classList.remove('controls-visible'); };
    const togglePlay = () => { videoPlayer.paused ? videoPlayer.play() : videoPlayer.pause(); };
    const updatePlayPauseIcon = () => { playIcon.style.display = videoPlayer.paused ? 'block' : 'none'; pauseIcon.style.display = videoPlayer.paused ? 'none' : 'block'; };
    const formatTime = (seconds) => { const m = Math.floor(seconds / 60), s = Math.floor(seconds % 60); return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`; };
    const updateProgress = () => { if (!isNaN(videoPlayer.duration)) { const p = (videoPlayer.currentTime / videoPlayer.duration) * 100; progressBar.style.width = `${p}%`; timeDisplay.textContent = `${formatTime(videoPlayer.currentTime)} / ${formatTime(videoPlayer.duration)}`; } };
    const seek = (e) => { const r = progressBarContainer.getBoundingClientRect(); videoPlayer.currentTime = ((e.clientX - r.left) / r.width) * videoPlayer.duration; };
    const toggleFullscreen = () => { if (!document.fullscreenElement) { videoContainer.requestFullscreen().catch(err => console.error(err)); } else { document.exitFullscreen(); } };

    const openModal = () => { videoModal.classList.add('active'); videoPlayer.muted = false;  videoPlayer.play();  };
    const closeModal = () => { videoPlayer.pause(); videoModal.classList.remove('active'); setTimeout(() => { videoPlayer.currentTime = 0; }, 300); };
    
    const openInfoModal = () => { videoInfoModal.classList.add('active'); };
    const closeInfoModal = () => { videoInfoModal.classList.remove('active'); };

    // --- Event Listeners ---
    openModalBtn.addEventListener('click', openModal);
    closeModalBtn.addEventListener('click', closeModal);
    videoModal.addEventListener('click', (e) => { if (e.target === videoModal) closeModal(); });
    document.addEventListener('keydown', (e) => { if (e.key === "Escape" && videoModal.classList.contains('active')) closeModal(); });
    
    // Info Modal Listeners
    infoBtn.addEventListener('click', openInfoModal);
    videoInfoModal.addEventListener('click', (e) => { if (e.target === videoInfoModal) closeInfoModal(); });

    // Player UI Listeners
    videoContainer.addEventListener('mousemove', showControls);
    videoContainer.addEventListener('mouseleave', hideControls);
    videoPlayer.addEventListener('play', () => { updatePlayPauseIcon(); controlsTimeout = setTimeout(hideControls, 3000); });
    videoPlayer.addEventListener('pause', () => { updatePlayPauseIcon(); showControls(); });
    videoPlayer.addEventListener('timeupdate', updateProgress);
    videoPlayer.addEventListener('loadedmetadata', updateProgress);
    playPauseBtn.addEventListener('click', togglePlay);
    progressBarContainer.addEventListener('click', seek);

    volumeBtn.addEventListener('click', () => { videoPlayer.muted = !videoPlayer.muted; });
    videoPlayer.addEventListener('volumechange', () => { const isMuted = videoPlayer.muted || videoPlayer.volume === 0; volumeHighIcon.style.display = isMuted ? 'none' : 'block'; volumeMutedIcon.style.display = isMuted ? 'block' : 'none'; volumeSlider.value = isMuted ? 0 : videoPlayer.volume; });
    volumeSlider.addEventListener('input', (e) => { videoPlayer.muted = false; videoPlayer.volume = e.target.value; });

    speedBtn.addEventListener('click', () => { const s = [1, 1.5, 2, 0.5], c = videoPlayer.playbackRate, n = (s.indexOf(c) + 1) % s.length; videoPlayer.playbackRate = s[n]; speedBtn.textContent = `${s[n]}x`; });
    fullscreenBtn.addEventListener('click', toggleFullscreen);
    
    // Initial UI setup
    updatePlayPauseIcon();
    updateProgress();
}

// ==================================================================
// 9. Developer Console Warning
// ==================================================================
const stopStyle = ['font-size: 50px', 'font-weight: bold', 'color: red', 'padding: 10px 0'].join(';');
const messageStyle = ['font-size: 18px', 'line-height: 1.5'].join(';');

console.log('%cStop!', stopStyle);
console.warn('%cThis is a browser feature intended for developers. If someone told you to copy-paste something here to "hack" into our system, it is a scam and will give them access to your account.', messageStyle);
console.log(
  '%cIf you have any questions or need support, please visit our official facebook: https://www.facebook.com/fntc.kasiglahanvillage2023 or contact our customer service directly. Never share your account details or paste code given to you by an untrusted source.',
  messageStyle
);