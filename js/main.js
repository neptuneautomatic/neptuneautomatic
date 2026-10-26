/**
 * NEPTUNE AUTOMATIC — Premium Full-Width Industrial Theme
 * Interactive Controllers: Slidable Hero (9 Slides), Modals, Mega Menu, Tabs
 */

document.addEventListener('DOMContentLoaded', () => {
  initThemeSwitch();
  initHeroSlider();
  init3DCardTilt();
  initHeaderScroll();
  initMobileMenu();
  initMenuBoundaryGuard();
  initIndustriesSlider();
  initFaqAccordion();
  initQuoteModal();
  initMarquee();
  initSiteSearch();
  initProductMatrixShowcase();
  initProductPageInteractions();
  initVideoModal();
  initReviewsSlider();
  initVideosSlider();
  initScrollAnimations();
});

/* ==========================================================================
   1. Hero Slider Controller — Continuous Auto-Scroll & Sliding Keys
   ========================================================================== */
function initHeroSlider() {
  const slider = document.querySelector('.hero-slider-section');
  if (!slider) return;

  const track = slider.querySelector('.slider-track');
  const slides = slider.querySelectorAll('.slider-track > .slide');
  const dots = slider.querySelectorAll('.slider-dot');
  const prevBtn = slider.querySelector('.arrow-btn.prev');
  const nextBtn = slider.querySelector('.arrow-btn.next');
  const edgePrevKey = slider.querySelector('.slider-edge-key.prev-key');
  const edgeNextKey = slider.querySelector('.slider-edge-key.next-key');
  const playPauseBtn = slider.querySelector('.play-pause-btn');
  const currentNumEl = slider.querySelector('.current-num');
  const totalNumEl = slider.querySelector('.total-num');
  const progressBar = slider.querySelector('.slider-progress-line');

  if (!slides.length) return;

  const totalSlides = slides.length;
  if (totalNumEl) {
    totalNumEl.textContent = String(totalSlides).padStart(2, '0');
  }

  let currentIndex = 0;
  const slideDuration = 5000; // 5.0 seconds continuous auto-scroll
  let isPlaying = true;
  let startTime = performance.now();
  let animationFrameId = null;

  function showSlide(index) {
    // Normalise index
    if (index >= totalSlides) index = 0;
    if (index < 0) index = totalSlides - 1;
    currentIndex = index;

    // True Horizontal Slide
    if (track) {
      track.style.transform = `translateX(-${currentIndex * 100}%)`;
    }

    // Update active class on slides for text & visual animations
    slides.forEach((slide, i) => {
      if (i === currentIndex) {
        slide.classList.add('active');
        slide.setAttribute('aria-hidden', 'false');
      } else {
        slide.classList.remove('active');
        slide.setAttribute('aria-hidden', 'true');
      }
    });

    // Update pagination dots
    dots.forEach((dot, i) => {
      if (i === currentIndex) {
        dot.classList.add('active');
        dot.setAttribute('aria-selected', 'true');
      } else {
        dot.classList.remove('active');
        dot.setAttribute('aria-selected', 'false');
      }
    });

    // Update slide counter (01 / 09)
    if (currentNumEl) {
      currentNumEl.textContent = String(currentIndex + 1).padStart(2, '0');
    }

    resetProgress();
  }

  function nextSlide() {
    showSlide(currentIndex + 1);
  }

  function prevSlide() {
    showSlide(currentIndex - 1);
  }

  function resetProgress() {
    startTime = performance.now();
    if (progressBar) progressBar.style.width = '0%';
  }

  // Smooth Auto-Scroll Loop (NEVER pauses on hover as requested)
  function progressLoop(timestamp) {
    if (!startTime) startTime = timestamp;

    if (isPlaying) {
      const elapsed = timestamp - startTime;
      const progressPercent = Math.min((elapsed / slideDuration) * 100, 100);

      if (progressBar) {
        progressBar.style.width = `${progressPercent}%`;
      }

      if (elapsed >= slideDuration) {
        nextSlide();
      }
    }

    animationFrameId = requestAnimationFrame(progressLoop);
  }

  // Start continuous auto-scroll
  resetProgress();
  animationFrameId = requestAnimationFrame(progressLoop);

  // Bottom Prev / Next buttons
  if (nextBtn) {
    nextBtn.addEventListener('click', (e) => {
      e.preventDefault();
      nextSlide();
    });
  }
  if (prevBtn) {
    prevBtn.addEventListener('click', (e) => {
      e.preventDefault();
      prevSlide();
    });
  }

  // Dedicated Edge Sliding Keys (Left & Right)
  if (edgePrevKey) {
    edgePrevKey.addEventListener('click', (e) => {
      e.preventDefault();
      prevSlide();
    });
  }
  if (edgeNextKey) {
    edgeNextKey.addEventListener('click', (e) => {
      e.preventDefault();
      nextSlide();
    });
  }

  // Dots click listener
  dots.forEach((dot, idx) => {
    dot.addEventListener('click', () => {
      showSlide(idx);
    });
  });

  // Play / Pause toggle
  if (playPauseBtn) {
    playPauseBtn.addEventListener('click', () => {
      isPlaying = !isPlaying;
      if (isPlaying) {
        resetProgress();
        playPauseBtn.innerHTML = `
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <rect x="6" y="4" width="4" height="16"></rect>
            <rect x="14" y="4" width="4" height="16"></rect>
          </svg>`;
        playPauseBtn.setAttribute('title', 'Pause Slider');
      } else {
        playPauseBtn.innerHTML = `
          <svg viewBox="0 0 24 24" fill="currentColor">
            <polygon points="5 3 19 12 5 21 5 3"></polygon>
          </svg>`;
        playPauseBtn.setAttribute('title', 'Play Slider');
      }
    });
  }

  // Schneider Electric Media Animation Toggle
  const heroMediaToggle = slider.querySelector('#heroMediaToggle');
  const heroBgVideo = slider.querySelector('#heroBgVideo');
  if (heroMediaToggle) {
    heroMediaToggle.addEventListener('click', (e) => {
      e.preventDefault();
      isPlaying = !isPlaying;
      heroMediaToggle.classList.toggle('paused', !isPlaying);
      if (heroBgVideo) {
        if (isPlaying) {
          heroBgVideo.play().catch(() => {});
        } else {
          heroBgVideo.pause();
        }
      }
      if (isPlaying) {
        resetProgress();
        heroMediaToggle.setAttribute('title', 'Pause Video Animation & Autoplay');
        heroMediaToggle.setAttribute('aria-label', 'Pause animation');
      } else {
        heroMediaToggle.setAttribute('title', 'Play Video Animation & Autoplay');
        heroMediaToggle.setAttribute('aria-label', 'Play animation');
      }
    });
  }

  // NOTE: Mouse hover pause has been intentionally removed as requested.
  // The slider auto-scrolls continuously even while mouse is over the slider.

  // Keyboard Sliding Keys: Left & Right Arrow keys (also A / D keys)
  window.addEventListener('keydown', (e) => {
    if (['input', 'textarea', 'select'].includes(document.activeElement?.tagName.toLowerCase())) return;

    if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') {
      nextSlide();
      if (edgeNextKey) {
        edgeNextKey.style.transform = 'translateY(-50%) scale(1.15)';
        setTimeout(() => { edgeNextKey.style.transform = ''; }, 200);
      }
    } else if (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A') {
      prevSlide();
      if (edgePrevKey) {
        edgePrevKey.style.transform = 'translateY(-50%) scale(1.15)';
        setTimeout(() => { edgePrevKey.style.transform = ''; }, 200);
      }
    }
  });

  // Touch Swipe & Mouse Drag Sliding
  let dragStartX = 0;
  let isDragging = false;

  // Touch events
  slider.addEventListener('touchstart', (e) => {
    dragStartX = e.changedTouches[0].screenX;
  }, { passive: true });

  slider.addEventListener('touchend', (e) => {
    const diff = e.changedTouches[0].screenX - dragStartX;
    if (Math.abs(diff) > 40) {
      if (diff < 0) nextSlide();
      else prevSlide();
    }
  }, { passive: true });

  // Mouse drag events
  slider.addEventListener('mousedown', (e) => {
    if (e.target.closest('button, a, select, input, textarea')) return;
    dragStartX = e.clientX;
    isDragging = true;
  });

  window.addEventListener('mouseup', (e) => {
    if (!isDragging) return;
    isDragging = false;
    const diff = e.clientX - dragStartX;
    if (Math.abs(diff) > 50) {
      if (diff < 0) nextSlide();
      else prevSlide();
    }
  });
}

/* ==========================================================================
   2. Sticky Header Scroll Effect
   ========================================================================== */
function initHeaderScroll() {
  const header = document.querySelector('.site-header');
  if (!header) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }, { passive: true });
}

/* ==========================================================================
   3. Mobile Navigation Menu Toggle
   ========================================================================== */
function initMobileMenu() {
  const toggleBtn = document.querySelector('.mobile-menu-toggle');
  const navMenu = document.querySelector('.nav-menu');
  const dropdownToggles = document.querySelectorAll('.nav-item.has-dropdown > .nav-link');

  if (toggleBtn && navMenu) {
    toggleBtn.addEventListener('click', () => {
      navMenu.classList.toggle('mobile-open');
      toggleBtn.classList.toggle('active');
      document.body.classList.toggle('menu-locked');
    });
  }

  dropdownToggles.forEach(toggle => {
    toggle.addEventListener('click', (e) => {
      if (window.innerWidth <= 992) {
        e.preventDefault();
        const parent = toggle.closest('.nav-item');
        parent.classList.toggle('open-mobile-sub');
      }
    });
  });
}

/* ==========================================================================
   3b. Menu Viewport Boundary Guard (Guarantees Submenu Stays In-Screen)
   ========================================================================== */
function initMenuBoundaryGuard() {
  const dropdownItems = document.querySelectorAll('.nav-item.has-dropdown');
  if (!dropdownItems.length) return;

  function adjustPosition(item) {
    if (window.innerWidth <= 992) return; // handled by responsive drawer
    const menu = item.querySelector('.mega-menu, .simple-dropdown-menu');
    if (!menu) return;

    // Reset margin before checking
    menu.style.marginLeft = '';
    menu.style.marginRight = '';

    requestAnimationFrame(() => {
      const rect = menu.getBoundingClientRect();
      const viewportWidth = window.innerWidth;
      const marginSafety = 16; // 16px safety padding from viewport edge

      if (rect.right > viewportWidth - marginSafety) {
        const overflow = rect.right - (viewportWidth - marginSafety);
        menu.style.marginLeft = `-${overflow}px`;
      } else if (rect.left < marginSafety) {
        const overflow = marginSafety - rect.left;
        menu.style.marginLeft = `${overflow}px`;
      }
    });
  }

  dropdownItems.forEach(item => {
    item.addEventListener('mouseenter', () => adjustPosition(item));
    item.addEventListener('focusin', () => adjustPosition(item));
    item.addEventListener('mouseleave', () => {
      const menu = item.querySelector('.mega-menu, .simple-dropdown-menu');
      if (menu) {
        menu.style.marginLeft = '';
        menu.style.marginRight = '';
      }
    });
  });

  window.addEventListener('resize', () => {
    dropdownItems.forEach(item => {
      const menu = item.querySelector('.mega-menu, .simple-dropdown-menu');
      if (menu) {
        menu.style.marginLeft = '';
        menu.style.marginRight = '';
      }
    });
  }, { passive: true });
}

/* ==========================================================================
   4. Industries & Verticals Showcase Slider Controller
   ========================================================================== */
function initIndustriesSlider() {
  const track = document.getElementById('industriesShowcaseTrack');
  if (!track) return;

  const prevBtn = document.getElementById('industriesPrevBtn');
  const nextBtn = document.getElementById('industriesNextBtn');

  const cards = track.querySelectorAll('.industry-card');
  if (!cards.length) return;

  function getScrollStep() {
    const card = cards[0];
    const gap = 16;
    return (card ? card.offsetWidth : 300) + gap;
  }

  function slide(direction) {
    const step = getScrollStep();
    track.scrollBy({
      left: direction * step,
      behavior: 'smooth'
    });
  }

  if (prevBtn) prevBtn.addEventListener('click', () => slide(-1));
  if (nextBtn) nextBtn.addEventListener('click', () => slide(1));

  function updateArrowStates() {
    if (prevBtn) prevBtn.style.opacity = track.scrollLeft <= 8 ? '0.4' : '1';
    const maxScroll = track.scrollWidth - track.clientWidth;
    if (nextBtn) nextBtn.style.opacity = track.scrollLeft >= maxScroll - 8 ? '0.4' : '1';
  }

  track.addEventListener('scroll', updateArrowStates, { passive: true });
  window.addEventListener('resize', updateArrowStates);
  updateArrowStates();

  // Mouse Drag functionality
  let isDown = false;
  let startX = 0;
  let scrollLeftStart = 0;
  let hasMoved = false;

  track.addEventListener('mousedown', (e) => {
    if (e.button !== 0) return;
    isDown = true;
    hasMoved = false;
    track.classList.add('is-dragging');
    startX = e.pageX - track.offsetLeft;
    scrollLeftStart = track.scrollLeft;
  });

  track.addEventListener('mouseleave', () => {
    isDown = false;
    track.classList.remove('is-dragging');
  });

  track.addEventListener('mouseup', () => {
    isDown = false;
    track.classList.remove('is-dragging');
  });

  track.addEventListener('mousemove', (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - track.offsetLeft;
    const walk = (x - startX) * 1.5;
    if (Math.abs(walk) > 6) hasMoved = true;
    track.scrollLeft = scrollLeftStart - walk;
  });

  track.addEventListener('click', (e) => {
    if (hasMoved) {
      e.preventDefault();
      e.stopPropagation();
      hasMoved = false;
    }
  }, true);
}


/* ==========================================================================
   5. Interactive Quote & Configurator Modal
   ========================================================================== */
function initQuoteModal() {
  const modal = document.getElementById('quoteModal');
  if (!modal) return;

  const openTriggers = document.querySelectorAll('[data-open-quote]');
  const closeBtn = modal.querySelector('.modal-close-btn');
  const productSelect = modal.querySelector('#quoteProduct');
  const form = modal.querySelector('#quoteForm');

  openTriggers.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const preselectedProduct = btn.getAttribute('data-product');
      if (preselectedProduct && productSelect) {
        productSelect.value = preselectedProduct;
      }
      modal.classList.add('open');
      document.body.style.overflow = 'hidden';
    });
  });

  function closeModal() {
    modal.classList.remove('open');
    document.body.style.overflow = '';
  }

  if (closeBtn) closeBtn.addEventListener('click', closeModal);

  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('open')) {
      closeModal();
    }
  });

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const submitBtn = form.querySelector('button[type="submit"]');
      const originalText = submitBtn.innerHTML;

      submitBtn.disabled = true;
      submitBtn.innerHTML = `
        <svg class="animate-spin" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="12" cy="12" r="10" stroke-opacity="0.25"></circle>
          <path d="M12 2a10 10 0 0 1 10 10" stroke-linecap="round"></path>
        </svg> Processing...`;

      setTimeout(() => {
        form.innerHTML = `
          <div style="text-align: center; padding: 2.5rem 1rem;">
            <div style="width: 60px; height: 60px; background: rgba(86, 172, 221, 0.2); border: 2px solid #56ACDD; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 1.5rem auto; color: #56ACDD;">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
            </div>
            <h4 style="font-size: 1.75rem; color: #ffffff; margin-bottom: 0.5rem; font-family: var(--font-heading);">Enquiry Received</h4>
            <p style="color: #94a3b8; font-size: 1rem; max-width: 440px; margin: 0 auto 1.5rem auto;">
              Thank you for reaching out to Neptune Automatic. Our technical automation specialist will review your premises requirements and connect within 2 business hours.
            </p>
            <button type="button" class="btn btn-primary" onclick="location.reload()">Back to Home</button>
          </div>
        `;
      }, 1000);
    });
  }
}

/* ==========================================================================
   6. Client Logo Marquee Cloner
   ========================================================================== */
function initMarquee() {
  const marqueeTrack = document.querySelector('.marquee-track');
  if (!marqueeTrack) return;

  // Duplicate items for continuous seamless loop
  const clone = marqueeTrack.innerHTML;
  marqueeTrack.innerHTML += clone;
}

/* ==========================================================================
   7. Enforce Light Theme (Dark Theme Removed)
   ========================================================================== */
function initThemeSwitch() {
  try {
    localStorage.removeItem('neptune_theme');
    localStorage.setItem('neptune_theme', 'light');
  } catch (e) {}
  document.documentElement.setAttribute('data-theme', 'light');
  const toggleBtn = document.getElementById('themeToggleBtn');
  if (toggleBtn) {
    toggleBtn.style.display = 'none';
  }
}

/* ==========================================================================
   8. Innovative 3D Tilt & Dynamic Glare Effect for Reference Section
   ========================================================================== */
function init3DCardTilt() {
  const cards = document.querySelectorAll('.reference-3d-card');
  if (!cards.length) return;

  // Check if touch device or prefers reduced motion
  if (window.matchMedia('(pointer: coarse)').matches || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return;
  }

  cards.forEach((card) => {
    const glare = card.querySelector('.card-3d-glare');
    let bounds = null;

    function onMouseEnter() {
      bounds = card.getBoundingClientRect();
      card.style.transition = 'transform 100ms ease-out, box-shadow 250ms ease';
    }

    function onMouseMove(e) {
      if (!bounds) bounds = card.getBoundingClientRect();

      const mouseX = e.clientX - bounds.left;
      const mouseY = e.clientY - bounds.top;

      const xPct = (mouseX / bounds.width) * 100;
      const yPct = (mouseY / bounds.height) * 100;

      // Calculate tilt angles (subtle +/- 8 degrees for clean enterprise feel)
      const rotateX = ((bounds.height / 2 - mouseY) / (bounds.height / 2)) * 8;
      const rotateY = ((mouseX - bounds.width / 2) / (bounds.width / 2)) * 8;

      card.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateZ(10px)`;

      // Dynamic glare tracking
      if (glare) {
        glare.style.background = `radial-gradient(circle at ${xPct.toFixed(1)}% ${yPct.toFixed(1)}%, rgba(255, 255, 255, 0.45), transparent 60%)`;
      }
    }

    function onMouseLeave() {
      card.style.transition = 'transform 500ms cubic-bezier(0.25, 1, 0.5, 1), box-shadow 500ms ease';
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px)';
      bounds = null;
    }

    card.addEventListener('mouseenter', onMouseEnter);
    card.addEventListener('mousemove', onMouseMove);
    card.addEventListener('mouseleave', onMouseLeave);
  });
}

/* ==========================================================================
   9. Frequently Asked Questions (FAQ) Accordion Controller
   ========================================================================== */
function initFaqAccordion() {
  const faqItems = document.querySelectorAll('.faq-item');
  if (!faqItems.length) return;

  faqItems.forEach((item) => {
    const trigger = item.querySelector('.faq-trigger');
    if (!trigger) return;

    trigger.addEventListener('click', () => {
      const isActive = item.classList.contains('active');

      // Close all other FAQs for clean single-accordion focus
      faqItems.forEach((other) => {
        if (other !== item) {
          other.classList.remove('active');
          const otherTrigger = other.querySelector('.faq-trigger');
          if (otherTrigger) {
            otherTrigger.setAttribute('aria-expanded', 'false');
          }
        }
      });

      // Toggle current item
      if (isActive) {
        item.classList.remove('active');
        trigger.setAttribute('aria-expanded', 'false');
      } else {
        item.classList.add('active');
        trigger.setAttribute('aria-expanded', 'true');
      }
    });
  });

  // 2-Row Toggle: Expand / Collapse to 2-row layout
  const faqToggleBtn = document.getElementById('faqToggleMoreBtn');
  const faqsList = document.querySelector('.faqs-accordion-list');
  if (faqToggleBtn && faqsList) {
    faqToggleBtn.addEventListener('click', () => {
      const isExpanded = faqsList.classList.toggle('expanded');
      faqToggleBtn.setAttribute('aria-expanded', isExpanded ? 'true' : 'false');
      const textSpan = faqToggleBtn.querySelector('.toggle-text');
      if (textSpan) {
        textSpan.textContent = isExpanded ? 'Show Fewer FAQs' : 'View All Technical FAQs (7 Total)';
      }
      const icon = faqToggleBtn.querySelector('.toggle-icon');
      if (icon) {
        icon.style.transform = isExpanded ? 'rotate(180deg)' : 'none';
      }
    });
  }
}

/* ==========================================================================
   10. Global Site Search Controller — 25 Category & Subcategory Catalog
   ========================================================================== */
function initSiteSearch() {
  const searchModal = document.getElementById('searchModal');
  const searchInput = document.getElementById('siteSearchInput');
  const clearBtn = document.getElementById('searchClearBtn');
  const closeBtn = document.getElementById('searchCloseBtn');
  const resultsContainer = document.getElementById('searchResultsList');
  const emptyState = document.getElementById('searchEmptyState');
  const queryEcho = document.getElementById('searchQueryEcho');
  const searchBtns = document.querySelectorAll('[data-open-search], #headerSearchBtn');
  const chips = document.querySelectorAll('.search-chip');

  if (!searchModal) return;

  // Complete catalog of 4 Categories + 21 Subcategories + Home
  const catalog = [
    // Categories
    {
      title: 'Access Automation Systems',
      category: 'Access Automation',
      url: 'access-automation.html',
      desc: 'Heavy-duty perimeter security, automatic boom barriers, rising bollards, crash drop arms, and industrial gate automation.',
      keywords: 'barrier bollard swing gate sliding gate rolling shutter crash rated automation'
    },
    {
      title: 'Access Control Systems',
      category: 'Access Control',
      url: 'access-control.html',
      desc: 'High-security RFID UHF readers, multi-credential smart card readers, speed gates, and vehicular access controllers.',
      keywords: 'rfid uhf reader smart card pedestrian turnstile flap barrier vehicular access credential'
    },
    {
      title: 'Access & Gate Accessories',
      category: 'Accessories',
      url: 'accessories.html',
      desc: 'Infrared safety photocells, loop detectors, digital pulse generators, heavy magnetic gate locks, and LED traffic lights.',
      keywords: 'safety sensor photocell pulse generator gate lock traffic light loop detector accessories'
    },
    {
      title: 'Intelligent Parking Solutions',
      category: 'Parking',
      url: 'parking.html',
      desc: 'End-to-end parking management systems (PMS), ultrasonic parking guidance (PGS), space counting, and ANPR payment gates.',
      keywords: 'parking pms pgs ultrasonic guidance counting revenue ticketless fastag anpr'
    },

    // Subcategories — Access Automation
    {
      title: 'Automatic Boom Barrier',
      category: 'Access Automation',
      url: 'automatic-boom-barrier.html',
      desc: 'High-speed electromechanical barriers engineered for toll booths, commercial tech parks, and residential entrances.',
      keywords: 'boom barrier automatic gate vehicular arm toll entrance highway security'
    },
    {
      title: 'High Security Automatic Bollards',
      category: 'Access Automation',
      url: 'high-security-automatic-bollards.html',
      desc: 'Crash-resistant hydraulic & electromechanical rising bollards for anti-ram protection and sensitive perimeter security.',
      keywords: 'bollard hydraulic rising bollard anti-ram anti-crash security post perimeter'
    },
    {
      title: 'Crash Rated Drop Arm Barrier',
      category: 'Access Automation',
      url: 'crash-rated-drop-arm-barrier.html',
      desc: 'Certified high-impact vehicular drop arm barriers engineered for military, embassy, and high-threat perimeter gates.',
      keywords: 'drop arm crash rated impact military barrier heavy security hostile vehicle mitigation'
    },
    {
      title: 'Strong Arm Automatic Barrier',
      category: 'Access Automation',
      url: 'strong-arm-automatic-barrier.html',
      desc: 'Heavy-duty reinforced barrier arms designed for extra-wide commercial corridors and industrial freight checkpoints up to 8m.',
      keywords: 'strong arm reinforced barrier industrial wide roadway freight gate 8m'
    },
    {
      title: 'Swing Gate Automation',
      category: 'Access Automation',
      url: 'swing-gate-automation.html',
      desc: 'Architectural and industrial electro-mechanical swing gate operators with silent continuous-duty motors.',
      keywords: 'swing gate underground operator articulated arm residential industrial motor'
    },
    {
      title: 'Sliding Gate Automation',
      category: 'Access Automation',
      url: 'sliding-gate-automation.html',
      desc: 'High-torque motorized gearboxes for cantilever and track sliding gates up to 4000kg with 24/7 continuous duty.',
      keywords: 'sliding gate cantilever rack pinion motor heavy industrial track gate'
    },
    {
      title: 'Automatic Rolling Shutters',
      category: 'Access Automation',
      url: 'automatic-rolling-shutters.html',
      desc: 'Motorized industrial roll-up doors, high-speed shutters, and insulated sectional doors for warehouses and hangars.',
      keywords: 'rolling shutter motorized shutter industrial roll-up door sectional hangar warehouse'
    },

    // Subcategories — Access Control
    {
      title: 'UHF Reader - RFID Long Range',
      category: 'Access Control',
      url: 'uhf-reader-rfid-long-range.html',
      desc: 'Hands-free ultra-high frequency RFID vehicle identification reader with up to 12-meter detection distance.',
      keywords: 'uhf reader rfid long range handsfree windshield tag fastag electronic toll'
    },
    {
      title: 'Smart Card Readers',
      category: 'Access Control',
      url: 'smart-card-readers.html',
      desc: 'Multi-technology contactless Mifare, DESFire, and HID card readers with Wiegand and OSDP protocols.',
      keywords: 'smart card reader mifare rfid credential wiegand osdp contactless'
    },
    {
      title: 'Pedestrian Access Gates',
      category: 'Access Control',
      url: 'pedestrian-access-gates.html',
      desc: 'Optical speed gates, motorized swing flap barriers, and tripod turnstiles designed for high-throughput architectural lobbies.',
      keywords: 'pedestrian turnstile speed gate flap barrier lobby optical turnstile transit'
    },
    {
      title: 'Vehicular Access Control',
      category: 'Access Control',
      url: 'vehicular-access-control.html',
      desc: 'Automated vehicle access systems integrating ANPR cameras, loop logic, and multi-channel access controller boards.',
      keywords: 'vehicular access control anpr license plate camera barrier controller logic'
    },

    // Subcategories — Accessories
    {
      title: 'Safety Devices',
      category: 'Accessories',
      url: 'safety-devices.html',
      desc: 'Infrared anti-crush safety photocell beams, inductive ground vehicle loops, and responsive pneumatic rubber safety edges.',
      keywords: 'safety photocell infrared sensor loop detector anti crush edge safety beam'
    },
    {
      title: 'Simple Pulse Generator',
      category: 'Accessories',
      url: 'simple-pulse-generator.html',
      desc: 'Commercial momentary push buttons, stainless steel desk switches, and key-operated manual override selectors.',
      keywords: 'push button manual switch pulse generator key switch barrier button'
    },
    {
      title: 'Electronic Pulse Generator',
      category: 'Accessories',
      url: 'electronic-pulse-generator.html',
      desc: 'Programmable electronic timer relays, pulse sequencers, and synchronization logic units for gate operations.',
      keywords: 'electronic pulse generator timer relay sequencer gate synchronization logic'
    },
    {
      title: 'Gate Locks',
      category: 'Accessories',
      url: 'gate-locks.html',
      desc: 'High-holding-force weatherproof electromagnetic sheer locks and fail-safe/fail-secure electric strikes for automatic gates.',
      keywords: 'gate lock electro magnetic lock maglock electric strike holding force'
    },
    {
      title: 'Traffic Lights',
      category: 'Accessories',
      url: 'traffic-lights.html',
      desc: '100mm and 200mm red/green dual LED directional signaling lamps with sun hoods and IP65 weatherproof housings.',
      keywords: 'traffic light red green led signal indicator barrier lamp lane control'
    },
    {
      title: 'Miscellaneous Accessories',
      category: 'Accessories',
      url: 'miscellaneous.html',
      desc: 'Industrial DIN-rail power supplies, foundation anchors, articulated boom arm joints, and flashing LED beacons.',
      keywords: 'miscellaneous accessories beacon bracket power supply din rail boom joint'
    },

    // Subcategories — Parking
    {
      title: 'Parking Management Solutions',
      category: 'Parking',
      url: 'parking-management-solutions.html',
      desc: 'Integrated parking hardware and software supporting automated barcode ticketing, FASTag RFID, and cashless payment kiosks.',
      keywords: 'parking management pms ticketing fastag automated revenue cashier kiosk'
    },
    {
      title: 'Parking Guidance Solutions',
      category: 'Parking',
      url: 'parking-guidance-solutions.html',
      desc: 'Intelligent ultrasonic and camera-based space detection with LED slot vacancy lights and digital wayfinding signs.',
      keywords: 'parking guidance pgs ultrasonic sensor slot indicator wayfinding vms display'
    },
    {
      title: 'Parking Counting Solutions',
      category: 'Parking',
      url: 'parking-counting-solutions.html',
      desc: 'Real-time multi-deck vehicle occupancy counting using bidirectional inductive loops and laser counting radar.',
      keywords: 'parking counting vehicle counter occupancy display deck capacity loop counter'
    },
    {
      title: 'Vehicular Access Control Solutions',
      category: 'Parking',
      url: 'vehicular-access-control-solutions.html',
      desc: 'Smart community and corporate tech park vehicle access with automated whitelist ANPR and mobile visitor gate pass.',
      keywords: 'vehicular parking access corporate tech park visitor management anpr whitelist'
    },

    // Home
    {
      title: 'Neptune Automatic — Home & Overview',
      category: 'Home',
      url: 'index.html',
      desc: 'Leader in Access Automation, High Security Bollards, Parking Systems & Perimeter Defense in India.',
      keywords: 'neptune automatic home company about contact solutions products'
    }
  ];

  let currentCategory = 'all';
  let highlightedIndex = -1;

  function openSearchModal() {
    searchModal.classList.add('active');
    searchModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    if (searchInput) {
      searchInput.value = '';
      if (clearBtn) clearBtn.classList.remove('visible');
      renderResults('', currentCategory);
      setTimeout(() => searchInput.focus(), 80);
    }
  }

  function closeSearchModal() {
    searchModal.classList.remove('active');
    searchModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  // Open modal handlers
  searchBtns.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      openSearchModal();
    });
  });

  if (closeBtn) {
    closeBtn.addEventListener('click', closeSearchModal);
  }

  // Close on backdrop click (click outside dialog)
  searchModal.addEventListener('click', (e) => {
    if (e.target === searchModal) {
      closeSearchModal();
    }
  });

  // Category chip filters
  chips.forEach((chip) => {
    chip.addEventListener('click', () => {
      chips.forEach((c) => c.classList.remove('active'));
      chip.classList.add('active');
      currentCategory = chip.getAttribute('data-filter') || 'all';
      renderResults(searchInput ? searchInput.value : '', currentCategory);
    });
  });

  // Live input handler
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      const q = e.target.value.trim();
      if (clearBtn) {
        if (q.length > 0) {
          clearBtn.classList.add('visible');
        } else {
          clearBtn.classList.remove('visible');
        }
      }
      renderResults(q, currentCategory);
    });

    if (clearBtn) {
      clearBtn.addEventListener('click', () => {
        searchInput.value = '';
        clearBtn.classList.remove('visible');
        renderResults('', currentCategory);
        searchInput.focus();
      });
    }
  }

  // Render results
  function renderResults(query, category) {
    if (!resultsContainer) return;
    highlightedIndex = -1;

    const lowerQ = query.toLowerCase().trim();

    const filtered = catalog.filter((item) => {
      const matchesCategory = category === 'all' || item.category.toLowerCase() === category.toLowerCase();
      if (!matchesCategory) return false;

      if (!lowerQ) return true;

      const titleMatch = item.title.toLowerCase().includes(lowerQ);
      const descMatch = item.desc.toLowerCase().includes(lowerQ);
      const keywordMatch = item.keywords.toLowerCase().includes(lowerQ);
      const catMatch = item.category.toLowerCase().includes(lowerQ);

      return titleMatch || descMatch || keywordMatch || catMatch;
    });

    resultsContainer.innerHTML = '';

    if (filtered.length === 0) {
      if (emptyState) {
        emptyState.style.display = 'block';
        if (queryEcho) queryEcho.textContent = query;
      }
      return;
    }

    if (emptyState) emptyState.style.display = 'none';

    filtered.forEach((item, index) => {
      const el = document.createElement('a');
      el.href = item.url;
      el.className = 'search-result-item';
      el.setAttribute('data-index', index);

      el.innerHTML = `
        <div class="search-result-meta">
          <span class="search-result-category">${item.category}</span>
          <div class="search-result-title">${highlightText(item.title, lowerQ)}</div>
          <div class="search-result-desc">${highlightText(item.desc, lowerQ)}</div>
        </div>
        <svg class="search-result-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
          <polyline points="9 18 15 12 9 6"></polyline>
        </svg>
      `;

      el.addEventListener('click', () => {
        closeSearchModal();
      });

      resultsContainer.appendChild(el);
    });
  }

  function highlightText(text, query) {
    if (!query) return text;
    const escaped = query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regex = new RegExp(`(${escaped})`, 'gi');
    return text.replace(regex, '<strong style="color: var(--color-logo-blue); font-weight: 700;">$1</strong>');
  }

  // Keyboard navigation
  window.addEventListener('keydown', (e) => {
    // Open on Ctrl+K or Cmd+K or '/' (when not focused in an input)
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
      e.preventDefault();
      if (searchModal.classList.contains('active')) {
        closeSearchModal();
      } else {
        openSearchModal();
      }
      return;
    }

    if (e.key === '/' && !['INPUT', 'TEXTAREA'].includes(document.activeElement.tagName)) {
      e.preventDefault();
      openSearchModal();
      return;
    }

    // Modal is active handlers
    if (!searchModal.classList.contains('active')) return;

    if (e.key === 'Escape') {
      e.preventDefault();
      closeSearchModal();
      return;
    }

    const items = resultsContainer.querySelectorAll('.search-result-item');
    if (!items.length) return;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      highlightedIndex = (highlightedIndex + 1) % items.length;
      updateHighlight(items);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      highlightedIndex = (highlightedIndex - 1 + items.length) % items.length;
      updateHighlight(items);
    } else if (e.key === 'Enter') {
      if (highlightedIndex >= 0 && items[highlightedIndex]) {
        e.preventDefault();
        items[highlightedIndex].click();
      } else if (items.length > 0) {
        e.preventDefault();
        items[0].click();
      }
    }
  });

  function updateHighlight(items) {
    items.forEach((item, idx) => {
      if (idx === highlightedIndex) {
        item.classList.add('highlighted');
        item.scrollIntoView({ block: 'nearest' });
      } else {
        item.classList.remove('highlighted');
      }
    });
  }
}

/* ==========================================================================
   11. Product Matrix Showcase — 3D Animated Tabs & Subcategory Sliding View
   ========================================================================== */
function initProductMatrixShowcase() {
  const showcase = document.querySelector('.product-matrix-showcase');
  if (!showcase) return;

  const tabBtns = showcase.querySelectorAll('.matrix-tab-btn');
  const panels = showcase.querySelectorAll('.matrix-category-panel');

  // Category Tab Switching
  tabBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      const targetId = btn.getAttribute('data-matrix-tab');
      if (!targetId) return;

      tabBtns.forEach((b) => {
        b.classList.remove('active');
        b.setAttribute('aria-selected', 'false');
      });
      btn.classList.add('active');
      btn.setAttribute('aria-selected', 'true');

      panels.forEach((p) => {
        if (p.id === `panel-${targetId}`) {
          p.classList.add('active');
          initPanelSlider(p);
        } else {
          p.classList.remove('active');
        }
      });
    });
  });

  // External tab triggers (Navigation / Mega menu / Cards)
  document.querySelectorAll('[data-switch-tab]').forEach((el) => {
    el.addEventListener('click', () => {
      const tabTarget = el.getAttribute('data-switch-tab');
      if (!tabTarget) return;
      const targetBtn = showcase.querySelector(`.matrix-tab-btn[data-matrix-tab="${tabTarget}"]`);
      if (targetBtn) {
        targetBtn.click();
      }
    });
  });

  // Slider controller for a panel
  function initPanelSlider(panel) {
    if (!panel) return;
    if (panel.dataset.sliderInitialized === 'true') {
      // Re-trigger layout calculation
      const track = panel.querySelector('.matrix-carousel-track');
      const slides = panel.querySelectorAll('.matrix-slide-item');
      if (track && slides.length && !panel.classList.contains('matrix-grid-mode')) {
        track.style.transform = 'translateX(0px)';
      }
      return;
    }
    panel.dataset.sliderInitialized = 'true';

    const container = panel.querySelector('.matrix-carousel-container');
    const track = panel.querySelector('.matrix-carousel-track');
    const slides = panel.querySelectorAll('.matrix-slide-item');
    const prevBtn = panel.querySelector('.matrix-carousel-arrow.prev, .matrix-arrow-btn.prev');
    const nextBtn = panel.querySelector('.matrix-carousel-arrow.next, .matrix-arrow-btn.next');
    const counterEl = panel.querySelector('.matrix-slider-counter');
    const dotsContainer = panel.querySelector('.matrix-slider-dots');
    const toggleBtns = panel.querySelectorAll('.view-toggle-btn');

    if (!track || !slides.length) return;

    let currentIndex = 0;
    const totalSlides = slides.length;

    // Build pagination dots
    if (dotsContainer) {
      dotsContainer.innerHTML = '';
      slides.forEach((_, i) => {
        const dot = document.createElement('button');
        dot.className = `matrix-dot ${i === 0 ? 'active' : ''}`;
        dot.setAttribute('aria-label', `Go to slide ${i + 1}`);
        dot.addEventListener('click', () => goToSlide(i));
        dotsContainer.appendChild(dot);
      });
    }

    function getVisibleCount() {
      if (window.innerWidth <= 680) return 1;
      if (window.innerWidth <= 1024) return 2;
      return 3;
    }

    function getMaxIndex() {
      const visible = getVisibleCount();
      return Math.max(0, totalSlides - visible);
    }

    function updateSlider() {
      if (panel.classList.contains('matrix-grid-mode')) return;

      const maxIdx = getMaxIndex();
      if (currentIndex > maxIdx) currentIndex = maxIdx;
      if (currentIndex < 0) currentIndex = 0;

      // Calculate translation based on actual rendered card width + gap
      const slide = slides[0];
      const gap = 32; // 2rem
      const slideWidth = slide ? slide.getBoundingClientRect().width : 340;
      const offset = currentIndex * (slideWidth + gap);

      track.style.transform = `translateX(-${offset}px)`;

      // Update counter
      if (counterEl) {
        counterEl.textContent = `${String(currentIndex + 1).padStart(2, '0')} / ${String(totalSlides).padStart(2, '0')}`;
      }

      // Arrows remain enabled to slide more products and seamlessly switch categories
      if (prevBtn) prevBtn.disabled = false;
      if (nextBtn) nextBtn.disabled = false;

      // Update dots
      if (dotsContainer) {
        const dots = dotsContainer.querySelectorAll('.matrix-dot');
        dots.forEach((dot, idx) => {
          dot.classList.toggle('active', idx === currentIndex);
        });
      }
    }

    function switchCategory(direction) {
      const tabOrder = ['automation', 'control', 'accessories', 'parking'];
      const currentTab = panel.id.replace('panel-', '');
      let tabIdx = tabOrder.indexOf(currentTab);
      if (tabIdx === -1) tabIdx = 0;
      if (direction === 'next') {
        tabIdx = (tabIdx + 1) % tabOrder.length;
      } else {
        tabIdx = (tabIdx - 1 + tabOrder.length) % tabOrder.length;
      }
      const targetBtn = showcase.querySelector(`.matrix-tab-btn[data-matrix-tab="${tabOrder[tabIdx]}"]`);
      if (targetBtn) {
        targetBtn.click();
      }
    }

    function nextSlide() {
      const maxIdx = getMaxIndex();
      if (currentIndex < maxIdx) {
        currentIndex++;
        updateSlider();
      } else {
        // Slide into next product category
        switchCategory('next');
      }
    }

    function prevSlide() {
      if (currentIndex > 0) {
        currentIndex--;
        updateSlider();
      } else {
        // Slide into previous product category
        switchCategory('prev');
      }
    }

    function goToSlide(idx) {
      currentIndex = idx;
      updateSlider();
    }

    if (nextBtn) nextBtn.addEventListener('click', nextSlide);
    if (prevBtn) prevBtn.addEventListener('click', prevSlide);

    // View Mode Toggle (Sliding Carousel vs 3D Grid)
    toggleBtns.forEach((btn) => {
      btn.addEventListener('click', () => {
        const mode = btn.getAttribute('data-mode');
        toggleBtns.forEach((b) => b.classList.remove('active'));
        btn.classList.add('active');

        if (mode === 'grid') {
          panel.classList.add('matrix-grid-mode');
          track.style.transform = 'none';
        } else {
          panel.classList.remove('matrix-grid-mode');
          updateSlider();
        }
      });
    });

    // Touch & Swipe Support on Track
    if (container) {
      let touchStartX = 0;
      let touchEndX = 0;

      container.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
      }, { passive: true });

      container.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        const diff = touchStartX - touchEndX;
        if (Math.abs(diff) > 40) {
          if (diff > 0) nextSlide();
          else prevSlide();
        }
      }, { passive: true });
    }

    window.addEventListener('resize', () => {
      updateSlider();
    });

    // Initial position
    setTimeout(updateSlider, 60);
  }

  // 3D Card Tilt Animation
  function init3DMatrixCards() {
    if (window.matchMedia('(pointer: coarse)').matches || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    const cards = showcase.querySelectorAll('.matrix-card-3d');
    cards.forEach((card) => {
      const glare = card.querySelector('.matrix-card-glare');
      let bounds = null;

      card.addEventListener('mouseenter', () => {
        bounds = card.getBoundingClientRect();
        card.style.transition = 'transform 100ms ease-out, box-shadow 250ms ease';
      });

      card.addEventListener('mousemove', (e) => {
        if (!bounds) bounds = card.getBoundingClientRect();
        const mouseX = e.clientX - bounds.left;
        const mouseY = e.clientY - bounds.top;

        const xPct = (mouseX / bounds.width) * 100;
        const yPct = (mouseY / bounds.height) * 100;

        // Realistic subtle 3D tilt angles (+/- 7 degrees)
        const rotateX = ((bounds.height / 2 - mouseY) / (bounds.height / 2)) * 7;
        const rotateY = ((mouseX - bounds.width / 2) / (bounds.width / 2)) * 7;

        card.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateZ(8px)`;

        if (glare) {
          glare.style.background = `radial-gradient(circle at ${xPct.toFixed(1)}% ${yPct.toFixed(1)}%, rgba(255, 255, 255, 0.45), transparent 60%)`;
        }
      });

      card.addEventListener('mouseleave', () => {
        card.style.transition = 'transform 500ms cubic-bezier(0.25, 1, 0.5, 1), box-shadow 500ms ease';
        card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px)';
        bounds = null;
      });
    });
  }

  // Initialize first active panel
  const activePanel = showcase.querySelector('.matrix-category-panel.active') || panels[0];
  if (activePanel) {
    initPanelSlider(activePanel);
  }

  // Enable 3D tilt
  init3DMatrixCards();
}




/* ==========================================================================
   13. Product Detail Page & Catalog Interactions
   ========================================================================== */
function initProductPageInteractions() {
  // 1. Gallery Thumbnail Switcher
  const thumbBtns = document.querySelectorAll('.prod-thumb-btn');
  const mainImg = document.getElementById('prodMainImg');
  if (thumbBtns.length && mainImg) {
    thumbBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        thumbBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const newSrc = btn.getAttribute('data-img-src') || btn.querySelector('img')?.src;
        if (newSrc) {
          mainImg.src = newSrc;
        }
      });
    });
  }

  // 2. Product FAQs Accordion
  const prodFaqItems = document.querySelectorAll('.prod-faq-item');
  if (prodFaqItems.length) {
    prodFaqItems.forEach(item => {
      const trigger = item.querySelector('.prod-faq-trigger');
      if (trigger) {
        trigger.addEventListener('click', () => {
          const wasActive = item.classList.contains('active');
          prodFaqItems.forEach(other => other.classList.remove('active'));
          if (!wasActive) {
            item.classList.add('active');
          }
        });
      }
    });
  }

  // 3. Datasheet Download Trigger
  const downloadBtns = document.querySelectorAll('[data-download-datasheet]');
  downloadBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const model = btn.getAttribute('data-download-datasheet') || 'Neptune Product';
      const quoteModal = document.getElementById('quoteModal');
      const quoteProduct = document.getElementById('quoteProduct');
      if (quoteModal) {
        if (quoteProduct) {
          quoteProduct.value = 'Automatic Boom Barriers';
        }
        quoteModal.classList.add('open');
        const quoteMessage = document.getElementById('quoteMessage');
        if (quoteMessage) {
          quoteMessage.value = `Requesting official Technical Datasheet & CAD Schematics for: ${model}`;
        }
      } else {
        alert(`Direct download request for ${model} verified. Connecting to Neptune technical repository...`);
      }
    });
  });
}

/* ==========================================================================
   14. YouTube Video Showcase Modal Controller
   ========================================================================== */
function initVideoModal() {
  const videoModal = document.getElementById('videoModal');
  const iframe = document.getElementById('videoModalIframe');
  const titleElem = document.getElementById('videoModalTitle');
  const ytLink = document.getElementById('videoModalYtLink');
  const closeBtn = document.getElementById('videoModalCloseBtn');

  if (!videoModal || !iframe) return;

  function openVideo(videoId, title) {
    if (!videoId) return;
    iframe.src = `https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1`;
    if (titleElem) titleElem.textContent = title || 'Neptune Automatic Demonstration';
    if (ytLink) ytLink.href = `https://www.youtube.com/watch?v=${videoId}`;
    videoModal.classList.add('open');
    videoModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeVideo() {
    videoModal.classList.remove('open');
    videoModal.setAttribute('aria-hidden', 'true');
    iframe.src = '';
    document.body.style.overflow = '';
  }

  // Bind all video cards and play buttons
  const videoCards = document.querySelectorAll('.video-card[data-video-id]');
  videoCards.forEach(card => {
    const videoId = card.getAttribute('data-video-id');
    const title = card.getAttribute('data-video-title');

    // Click on thumb or play overlay
    const thumbWrap = card.querySelector('.video-card-thumb-wrap');
    if (thumbWrap) {
      thumbWrap.addEventListener('click', (e) => {
        e.preventDefault();
        openVideo(videoId, title);
      });
    }

    // Click on trigger button
    const triggerBtn = card.querySelector('.video-trigger-btn');
    if (triggerBtn) {
      triggerBtn.addEventListener('click', (e) => {
        e.preventDefault();
        openVideo(videoId, title);
      });
    }
  });

  // Close handlers
  if (closeBtn) {
    closeBtn.addEventListener('click', closeVideo);
  }

  videoModal.addEventListener('click', (e) => {
    if (e.target === videoModal) {
      closeVideo();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && videoModal.classList.contains('open')) {
      closeVideo();
    }
  });
}

/* ==========================================================================
   15. Google Reviews Horizontal Slider Controller
   ========================================================================== */
function initReviewsSlider() {
  const track = document.getElementById('reviewsTrack');
  if (!track) return;

  const prevBtn = document.getElementById('reviewsPrevBtn');
  const nextBtn = document.getElementById('reviewsNextBtn');
  const cards = track.querySelectorAll('.google-review-card');
  if (!cards.length) return;

  function getScrollStep() {
    const card = cards[0];
    const gap = 24;
    return (card ? card.offsetWidth : 340) + gap;
  }

  function slide(direction) {
    const step = getScrollStep();
    track.scrollBy({
      left: direction * step,
      behavior: 'smooth'
    });
  }

  if (prevBtn) prevBtn.addEventListener('click', () => slide(-1));
  if (nextBtn) nextBtn.addEventListener('click', () => slide(1));

  function updateArrowStates() {
    const maxScroll = track.scrollWidth - track.clientWidth;
    if (maxScroll <= 8) {
      if (prevBtn) prevBtn.style.display = 'none';
      if (nextBtn) nextBtn.style.display = 'none';
    } else {
      if (prevBtn) {
        prevBtn.style.display = 'flex';
        prevBtn.style.opacity = track.scrollLeft <= 8 ? '0.35' : '1';
      }
      if (nextBtn) {
        nextBtn.style.display = 'flex';
        nextBtn.style.opacity = track.scrollLeft >= maxScroll - 8 ? '0.35' : '1';
      }
    }
  }

  track.addEventListener('scroll', updateArrowStates, { passive: true });
  window.addEventListener('resize', updateArrowStates);
  updateArrowStates();

  // Mouse & Touch Drag Support
  let isDown = false;
  let startX = 0;
  let scrollLeftStart = 0;
  let hasMoved = false;

  track.addEventListener('mousedown', (e) => {
    if (e.button !== 0) return;
    isDown = true;
    hasMoved = false;
    track.classList.add('is-dragging');
    startX = e.pageX - track.offsetLeft;
    scrollLeftStart = track.scrollLeft;
  });

  track.addEventListener('mouseleave', () => {
    isDown = false;
    track.classList.remove('is-dragging');
  });

  track.addEventListener('mouseup', () => {
    isDown = false;
    track.classList.remove('is-dragging');
  });

  track.addEventListener('mousemove', (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - track.offsetLeft;
    const walk = (x - startX) * 1.5;
    if (Math.abs(walk) > 6) hasMoved = true;
    track.scrollLeft = scrollLeftStart - walk;
  });

  track.addEventListener('click', (e) => {
    if (hasMoved) {
      e.preventDefault();
      e.stopPropagation();
      hasMoved = false;
    }
  }, true);
}

/* ==========================================================================
   16. Compact Video Showcase Slider Controller
   ========================================================================== */
function initVideosSlider() {
  const track = document.getElementById('videoShowcaseTrack');
  if (!track) return;

  const prevBtn = document.getElementById('videoPrevBtn');
  const nextBtn = document.getElementById('videoNextBtn');
  const cards = track.querySelectorAll('.video-card');
  if (!cards.length) return;

  function getScrollStep() {
    const card = cards[0];
    const gap = 20;
    return (card ? card.offsetWidth : 350) + gap;
  }

  function slide(direction) {
    const step = getScrollStep();
    track.scrollBy({
      left: direction * step,
      behavior: 'smooth'
    });
  }

  if (prevBtn) prevBtn.addEventListener('click', () => slide(-1));
  if (nextBtn) nextBtn.addEventListener('click', () => slide(1));

  function updateArrowStates() {
    const maxScroll = track.scrollWidth - track.clientWidth;
    if (maxScroll <= 8) {
      if (prevBtn) prevBtn.style.display = 'none';
      if (nextBtn) nextBtn.style.display = 'none';
    } else {
      if (prevBtn) {
        prevBtn.style.display = 'flex';
        prevBtn.style.opacity = track.scrollLeft <= 8 ? '0.35' : '1';
      }
      if (nextBtn) {
        nextBtn.style.display = 'flex';
        nextBtn.style.opacity = track.scrollLeft >= maxScroll - 8 ? '0.35' : '1';
      }
    }
  }

  track.addEventListener('scroll', updateArrowStates, { passive: true });
  window.addEventListener('resize', updateArrowStates);
  updateArrowStates();

  // Mouse & Touch Drag Support
  let isDown = false;
  let startX = 0;
  let scrollLeftStart = 0;
  let hasMoved = false;

  track.addEventListener('mousedown', (e) => {
    if (e.button !== 0) return;
    isDown = true;
    hasMoved = false;
    track.classList.add('is-dragging');
    startX = e.pageX - track.offsetLeft;
    scrollLeftStart = track.scrollLeft;
  });

  track.addEventListener('mouseleave', () => {
    isDown = false;
    track.classList.remove('is-dragging');
  });

  track.addEventListener('mouseup', () => {
    isDown = false;
    track.classList.remove('is-dragging');
  });

  track.addEventListener('mousemove', (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - track.offsetLeft;
    const walk = (x - startX) * 1.5;
    if (Math.abs(walk) > 6) hasMoved = true;
    track.scrollLeft = scrollLeftStart - walk;
  });

  track.addEventListener('click', (e) => {
    if (hasMoved) {
      e.preventDefault();
      e.stopPropagation();
      hasMoved = false;
    }
  }, true);
}

/* ==========================================================================
   16. Scroll-Triggered Reveal Animations (Enterprise IntersectionObserver)
   ========================================================================== */
function initScrollAnimations() {
  // If user prefers reduced motion, exit early
  if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return;
  }

  // Mark HTML root for scroll animations
  document.documentElement.classList.add('has-scroll-reveal');

  // Selectors to automatically stagger children
  const autoStaggerSelectors = [
    '.reference-3d-grid',
    '.why-neptune-grid',
    '.powernpark-features-grid',
    '.faqs-accordion-list'
  ];

  // Selectors to automatically reveal as a single block
  const autoRevealSelectors = [
    '.section-header',
    '.matrix-tabs-wrapper',
    '.matrix-carousel-container',
    '.powernpark-device-col',
    '.industries-slider-container',
    '.google-scorecard-card',
    '.google-reviews-slider-container',
    '.google-reviews-slider-wrap',
    '.video-slider-container',
    '.video-showcase-slider-wrap',
    '.cta-banner-box',
    '.cta-banner-content',
    '.cta-banner-card',
    '.clients-marquee-section',
    '.product-specs-table-card',
    '.subcat-feature-grid',
    '.product-downloads-card'
  ];

  autoStaggerSelectors.forEach((sel) => {
    document.querySelectorAll(sel).forEach((el) => {
      if (!el.classList.contains('reveal-stagger') && !el.classList.contains('scroll-reveal')) {
        el.classList.add('reveal-stagger');
      }
    });
  });

  autoRevealSelectors.forEach((sel) => {
    document.querySelectorAll(sel).forEach((el) => {
      if (!el.classList.contains('reveal-stagger') && !el.classList.contains('scroll-reveal')) {
        el.classList.add('scroll-reveal');
      }
    });
  });

  const targets = document.querySelectorAll('.scroll-reveal, .reveal-stagger');
  if (!targets.length) return;

  // Immediate check for elements in or near viewport on initial page load
  const windowHeight = window.innerHeight || document.documentElement.clientHeight;
  const isNearViewport = (el) => {
    const rect = el.getBoundingClientRect();
    return rect.top <= windowHeight - 40 && rect.bottom >= 0;
  };

  targets.forEach((el) => {
    if (isNearViewport(el)) {
      el.classList.add('is-revealed');
    }
  });

  // Setup IntersectionObserver for smooth entrance on scroll
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-revealed');
          obs.unobserve(entry.target);
        }
      });
    }, {
      root: null,
      rootMargin: '0px 0px -40px 0px',
      threshold: 0.08
    });

    targets.forEach((el) => {
      if (!el.classList.contains('is-revealed')) {
        observer.observe(el);
      }
    });
  } else {
    // Immediate fallback for legacy browsers
    targets.forEach((el) => el.classList.add('is-revealed'));
  }
}


