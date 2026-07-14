/* ==========================================================================
   JavaScript Functionality for Suncrest Stud Legacy Website
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    // ==========================================
    // 1. Print Page (Print Mode)
    // ==========================================
    const printBtn = document.getElementById('print-btn');
    if (printBtn) {
        printBtn.addEventListener('click', () => {
            window.print();
        });
    }

    // Default theme to dark
    document.body.classList.add('dark-theme');

    // 2. Scroll-Triggered Header Class Toggling
    // ==========================================
    const header = document.getElementById('site-header');
    const heroSection = document.getElementById('home');
    
    if (heroSection && header) {
        const handleScroll = () => {
            const triggerHeight = heroSection.offsetHeight - header.offsetHeight;
            if (window.scrollY >= triggerHeight) {
                header.classList.remove('blended');
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
                header.classList.add('blended');
            }
        };
        
        // Initial call
        header.classList.add('blended');
        handleScroll();
        
        // Scroll event listener
        window.addEventListener('scroll', handleScroll);
    } else if (header) {
        // Subpage: header remains solid scrolled state
        header.classList.add('scrolled');
        header.classList.remove('blended');
    }

    // ==========================================
    // 3. Mobile Navigation Menu Toggle
    // ==========================================
    const mobileToggleBtn = document.getElementById('mobile-toggle');
    const navMenu = document.getElementById('nav-menu');
    const mobileIcon = mobileToggleBtn.querySelector('i');
    
    mobileToggleBtn.addEventListener('click', () => {
        const isOpen = navMenu.classList.toggle('open');
        mobileToggleBtn.setAttribute('aria-expanded', isOpen);
        
        if (isOpen) {
            mobileIcon.classList.replace('fa-bars', 'fa-xmark');
        } else {
            mobileIcon.classList.replace('fa-xmark', 'fa-bars');
        }
    });

    // Close menu when a link is clicked
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navMenu.classList.contains('open')) {
                navMenu.classList.remove('open');
                mobileToggleBtn.setAttribute('aria-expanded', 'false');
                mobileIcon.classList.replace('fa-xmark', 'fa-bars');
            }
        });
    });

    // ==========================================
    // 4. Scroll Spy: Active Link Highlighter
    // ==========================================
    const sections = document.querySelectorAll('section[id]');
    
    const scrollSpy = () => {
        const scrollPosition = window.scrollY + 120; // Offset for header height
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                const activeLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
                if (activeLink) {
                    navLinks.forEach(link => link.classList.remove('active'));
                    activeLink.classList.add('active');
                }
            }
        });
    };
    
    window.addEventListener('scroll', scrollSpy);
    
    // ==========================================
    // 5. Contact Form Validation & Submission
    // ==========================================
    const contactForm = document.getElementById('contact-form');
    const formSuccessAlert = document.getElementById('form-success');
    
    if (contactForm) {
        const validateField = (id, errorId, validator) => {
            const element = document.getElementById(id);
            const errorElement = document.getElementById(errorId);
            const parent = element.parentElement;
            
            const isValid = validator(element.value);
            if (!isValid) {
                parent.classList.add('error');
            } else {
                parent.classList.remove('error');
            }
            return isValid;
        };
        
        const validators = {
            name: val => val.trim().length > 0,
            city: val => val.trim().length > 0,
            country: val => val.trim().length > 0,
            email: val => {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                return emailRegex.test(val);
            },
            phone: val => val.trim().length > 0,
            subject: val => val !== '',
            message: val => val.trim().length > 0
        };
        
        // Attach input listeners for real-time validation feedback after typing
        document.getElementById('form-name').addEventListener('input', () => {
            validateField('form-name', 'name-error', validators.name);
        });
        document.getElementById('form-city').addEventListener('input', () => {
            validateField('form-city', 'city-error', validators.city);
        });
        document.getElementById('form-country').addEventListener('input', () => {
            validateField('form-country', 'country-error', validators.country);
        });
        document.getElementById('form-email').addEventListener('input', () => {
            validateField('form-email', 'email-error', validators.email);
        });
        document.getElementById('form-phone').addEventListener('input', () => {
            validateField('form-phone', 'phone-error', validators.phone);
        });
        document.getElementById('form-subject').addEventListener('change', () => {
            validateField('form-subject', 'subject-error', validators.subject);
        });
        document.getElementById('form-message').addEventListener('input', () => {
            validateField('form-message', 'message-error', validators.message);
        });

        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Run all validations
            const isNameValid = validateField('form-name', 'name-error', validators.name);
            const isCityValid = validateField('form-city', 'city-error', validators.city);
            const isCountryValid = validateField('form-country', 'country-error', validators.country);
            const isEmailValid = validateField('form-email', 'email-error', validators.email);
            const isPhoneValid = validateField('form-phone', 'phone-error', validators.phone);
            const isSubjectValid = validateField('form-subject', 'subject-error', validators.subject);
            const isMessageValid = validateField('form-message', 'message-error', validators.message);
            
            const isFormValid = isNameValid && isCityValid && isCountryValid && isEmailValid && 
                                isPhoneValid && isSubjectValid && isMessageValid;
                                
            if (isFormValid) {
                // Get form values for simulating export/submitting (e.g. log output)
                const formData = {
                    name: document.getElementById('form-name').value,
                    city: document.getElementById('form-city').value,
                    country: document.getElementById('form-country').value,
                    email: document.getElementById('form-email').value,
                    phone: document.getElementById('form-phone').value,
                    subject: document.getElementById('form-subject').value,
                    message: document.getElementById('form-message').value
                };
                
                console.log('Contact form submitted successfully:', formData);
                
                // Show loading animation / submit simulation
                const submitBtn = contactForm.querySelector('.btn-submit');
                const originalText = submitBtn.textContent;
                submitBtn.textContent = 'Submitting...';
                submitBtn.disabled = true;
                
                setTimeout(() => {
                    // Hide form and show success card
                    contactForm.classList.add('hidden');
                    if (formSuccessAlert) {
                        formSuccessAlert.classList.remove('hidden');
                    }
                    
                    // Reset form values
                    contactForm.reset();
                    submitBtn.textContent = originalText;
                    submitBtn.disabled = false;
                }, 1000);
            }
        });
    }

    // ==========================================
    // 6. Gallery Filtering Logic
    // ==========================================
    const filterButtons = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-grid .gallery-item');

    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons and add to the clicked one
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            galleryItems.forEach(item => {
                const itemCategory = item.getAttribute('data-category');
                const categories = itemCategory ? itemCategory.split(' ') : [];
                
                if (filterValue === 'all' || categories.includes(filterValue)) {
                    item.classList.remove('hidden');
                } else {
                    item.classList.add('hidden');
                }
            });
        });
    });

    // ==========================================
    // 7. News Toggle Handler (Show More/Less)
    // ==========================================
    const toggleNewsBtn = document.getElementById('btn-toggle-news');
    if (toggleNewsBtn) {
        let newsExpanded = false;
        const allNewsCards = Array.from(document.querySelectorAll('.news-grid .news-card'));
        
        // Ensure all cards from index 6 onwards have the hidden-card class on load
        allNewsCards.forEach((card, index) => {
            if (index >= 6) {
                card.classList.add('hidden-card');
            }
        });
        
        toggleNewsBtn.addEventListener('click', () => {
            newsExpanded = !newsExpanded;
            
            allNewsCards.forEach((card, index) => {
                if (index >= 6) {
                    if (newsExpanded) {
                        card.classList.remove('hidden-card');
                    } else {
                        card.classList.add('hidden-card');
                    }
                }
            });
            
            toggleNewsBtn.textContent = newsExpanded ? 'Less News' : 'More News';
            
            if (!newsExpanded) {
                document.getElementById('news').scrollIntoView({ behavior: 'smooth' });
            }
        });
    }

    // ==========================================
    // 8. Gallery Lightbox & Slideshow
    // ==========================================
    // Create and append Lightbox markup dynamically
    const createLightbox = () => {
        const lightboxHtml = `
            <div id="gallery-lightbox" class="lightbox">
                <div class="lightbox-overlay"></div>
                <div class="lightbox-content-wrapper">
                    <button id="lightbox-close" class="lightbox-btn close-btn" aria-label="Close Lightbox">
                        <i class="fa-solid fa-xmark"></i>
                    </button>
                    
                    <button id="lightbox-prev" class="lightbox-btn nav-btn prev-btn" aria-label="Previous Image">
                        <i class="fa-solid fa-chevron-left"></i>
                    </button>
                    
                    <div class="lightbox-image-container">
                        <img id="lightbox-image" src="" alt="">
                    </div>
                    
                    <button id="lightbox-next" class="lightbox-btn nav-btn next-btn" aria-label="Next Image">
                        <i class="fa-solid fa-chevron-right"></i>
                    </button>
                    
                    <div class="lightbox-bottom-bar">
                        <div class="lightbox-caption">
                            <span id="lightbox-title"></span>
                        </div>
                        <div class="lightbox-controls">
                            <button id="lightbox-play" class="lightbox-btn control-btn" aria-label="Start Slideshow">
                                <i class="fa-solid fa-play"></i> Play Slideshow
                            </button>
                            <a id="lightbox-article-link" href="" class="btn btn-primary lightbox-article-btn hidden">
                                <i class="fa-solid fa-book-open"></i> Read Article
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        `;
        document.body.insertAdjacentHTML('beforeend', lightboxHtml);
    };

    createLightbox();

    const lightbox = document.getElementById('gallery-lightbox');
    const lbImage = document.getElementById('lightbox-image');
    const lbTitle = document.getElementById('lightbox-title');
    const lbArticleBtn = document.getElementById('lightbox-article-link');
    const lbClose = document.getElementById('lightbox-close');
    const lbPrev = document.getElementById('lightbox-prev');
    const lbNext = document.getElementById('lightbox-next');
    const lbPlay = document.getElementById('lightbox-play');
    const lbOverlay = lightbox.querySelector('.lightbox-overlay');

    let activeIndex = 0;
    let visibleItems = [];
    let slideshowInterval = null;
    let isSlideshowPlaying = false;

    // Helper to get currently visible items in the gallery
    const updateVisibleItems = () => {
        visibleItems = Array.from(document.querySelectorAll('.gallery-grid .gallery-item:not(.hidden)'));
    };

    const showSlide = (index) => {
        if (visibleItems.length === 0) return;
        
        // Wrap around bounds
        if (index >= visibleItems.length) {
            activeIndex = 0;
        } else if (index < 0) {
            activeIndex = visibleItems.length - 1;
        } else {
            activeIndex = index;
        }

        const item = visibleItems[activeIndex];
        const img = item.querySelector('img');
        const overlaySpan = item.querySelector('.gallery-overlay span:not(.read-article-badge)');
        const title = overlaySpan ? overlaySpan.textContent : '';
        const articleLink = item.querySelector('.gallery-article-link');

        // Smooth transition
        lbImage.style.opacity = '0';
        lbImage.style.transform = 'scale(0.97)';

        setTimeout(() => {
            lbImage.onload = () => {
                lbImage.style.opacity = '1';
                lbImage.style.transform = 'scale(1)';
            };

            lbImage.src = img.src;
            lbImage.alt = img.alt || title;
            lbTitle.textContent = title;

            if (articleLink) {
                lbArticleBtn.href = articleLink.href;
                lbArticleBtn.classList.remove('hidden');
            } else {
                lbArticleBtn.classList.add('hidden');
            }
        }, 150);
    };

    const openLightbox = (item) => {
        updateVisibleItems();
        const index = visibleItems.indexOf(item);
        if (index === -1) return;

        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden'; // Lock background scrolling
        showSlide(index);
    };

    const closeLightbox = () => {
        stopSlideshow();
        lightbox.classList.remove('active');
        document.body.style.overflow = ''; // Restore scrolling
    };

    const nextSlide = () => {
        showSlide(activeIndex + 1);
    };

    const prevSlide = () => {
        showSlide(activeIndex - 1);
    };

    // Slideshow control functions
    const startSlideshow = () => {
        if (isSlideshowPlaying) return;
        isSlideshowPlaying = true;
        lbPlay.innerHTML = '<i class="fa-solid fa-pause"></i> Pause Slideshow';
        lbPlay.classList.add('playing');
        
        slideshowInterval = setInterval(() => {
            nextSlide();
        }, 4000); // Change image every 4 seconds
    };

    const stopSlideshow = () => {
        if (!isSlideshowPlaying) return;
        isSlideshowPlaying = false;
        lbPlay.innerHTML = '<i class="fa-solid fa-play"></i> Play Slideshow';
        lbPlay.classList.remove('playing');
        
        if (slideshowInterval) {
            clearInterval(slideshowInterval);
            slideshowInterval = null;
        }
    };

    const toggleSlideshow = () => {
        if (isSlideshowPlaying) {
            stopSlideshow();
        } else {
            startSlideshow();
        }
    };

    // Attach click handlers to gallery items
    const setupGalleryClickHandlers = () => {
        const galleryGrid = document.querySelector('.gallery-grid');
        if (galleryGrid) {
            galleryGrid.addEventListener('click', (e) => {
                const item = e.target.closest('.gallery-item');
                if (!item) return;

                // If user clicked the badge inside the link, allow the browser to follow the link to read article
                if (e.target.closest('.read-article-badge')) {
                    return;
                }

                // Prevent default navigation for article links inside the grid item
                e.preventDefault();
                openLightbox(item);
            });
        }
    };

    setupGalleryClickHandlers();

    // Event listeners
    lbClose.addEventListener('click', closeLightbox);
    lbOverlay.addEventListener('click', closeLightbox);
    lbPrev.addEventListener('click', () => {
        stopSlideshow();
        prevSlide();
    });
    lbNext.addEventListener('click', () => {
        stopSlideshow();
        nextSlide();
    });
    lbPlay.addEventListener('click', toggleSlideshow);

    // Keyboard controls
    document.addEventListener('keydown', (e) => {
        if (!lightbox.classList.contains('active')) return;
        
        if (e.key === 'Escape') {
            closeLightbox();
        } else if (e.key === 'ArrowRight') {
            stopSlideshow();
            nextSlide();
        } else if (e.key === 'ArrowLeft') {
            stopSlideshow();
            prevSlide();
        }
    });

    // ==========================================
    // 9. Interactive Diagrams Hotspot Clicks (Touch Support)
    // ==========================================
    const hotspots = document.querySelectorAll('.diagram-hotspot');
    hotspots.forEach(hotspot => {
        hotspot.addEventListener('click', (e) => {
            e.stopPropagation();
            const isActive = hotspot.classList.contains('active');
            
            // Deactivate all other hotspots
            hotspots.forEach(h => h.classList.remove('active'));
            
            if (!isActive) {
                hotspot.classList.add('active');
            }
        });
    });

    document.addEventListener('click', () => {
        hotspots.forEach(hotspot => hotspot.classList.remove('active'));
    });

    // ==========================================
    // 10. History Timeline Toggle Handler (Show More/Less)
    // ==========================================
    const toggleHistoryBtn = document.getElementById('btn-toggle-history');
    if (toggleHistoryBtn) {
        let historyExpanded = false;
        
        toggleHistoryBtn.addEventListener('click', () => {
            historyExpanded = !historyExpanded;
            
            const itemsToToggle = document.querySelectorAll('.timeline-item');
            
            itemsToToggle.forEach((item, index) => {
                if (index >= 6) {
                    if (historyExpanded) {
                        item.classList.remove('hidden-item');
                        item.classList.add('fade-in-item');
                    } else {
                        item.classList.add('hidden-item');
                        item.classList.remove('fade-in-item');
                    }
                }
            });
            
            toggleHistoryBtn.textContent = historyExpanded ? 'Collapse Timeline' : 'Show Full Timeline';
            
            if (!historyExpanded) {
                const historySection = document.getElementById('history');
                if (historySection) {
                    historySection.scrollIntoView({ behavior: 'smooth' });
                }
            }
        });
    }

    // ==========================================
    // 11. Copy Email Address Handler
    // ==========================================
    const copyEmailBtn = document.getElementById('btn-copy-email');
    if (copyEmailBtn) {
        copyEmailBtn.addEventListener('click', () => {
            const emailText = "suncreststudnz@gmail.com";
            navigator.clipboard.writeText(emailText).then(() => {
                const tooltip = document.getElementById('copy-success-msg');
                if (tooltip) {
                    tooltip.classList.remove('hidden');
                    setTimeout(() => {
                        tooltip.classList.add('hidden');
                    }, 2000);
                }
                
                const origHtml = copyEmailBtn.innerHTML;
                copyEmailBtn.innerHTML = '<i class="fa-solid fa-check"></i> Copied!';
                setTimeout(() => {
                    copyEmailBtn.innerHTML = origHtml;
                }, 2000);
            }).catch(err => {
                console.error('Failed to copy email:', err);
            });
        });
    }
});
