// ===========================
// Navigation Scroll Effects
// ===========================
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// ===========================
// Mobile Menu Toggle
// ===========================
const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
const navLinks = document.querySelector('.nav-links');

const closeMobileMenu = () => {
    if (!mobileMenuToggle || !navLinks) return;
    navLinks.classList.remove('active');
    mobileMenuToggle.classList.remove('active');

    const spans = mobileMenuToggle.querySelectorAll('span');
    spans[0].style.transform = '';
    spans[1].style.opacity = '';
    spans[2].style.transform = '';
};

if (mobileMenuToggle && navLinks) {
    mobileMenuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        mobileMenuToggle.classList.toggle('active');

        // Animate hamburger icon
        const spans = mobileMenuToggle.querySelectorAll('span');
        if (mobileMenuToggle.classList.contains('active')) {
            spans[0].style.transform = 'rotate(45deg) translateY(7px)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'rotate(-45deg) translateY(-7px)';
        } else {
            closeMobileMenu();
        }
    });

    // Close menu when clicking on a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', closeMobileMenu);
    });

    // Close menu with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && navLinks.classList.contains('active')) {
            closeMobileMenu();
        }
    });
}

// ===========================
// Smooth Scrolling
// ===========================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');

        if (href !== '#' && href !== '') {
            const target = document.querySelector(href);

            if (target) {
                e.preventDefault();
                window.scrollTo({
                    top: target.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        }
    });
});

// ===========================
// Waitlist Form
// ===========================
// The form posts to the URL in its action attribute (for example a Formspree
// endpoint). Until that is set, it says signups aren't open rather than
// pretending to save anything.
const waitlistForm = document.getElementById('waitlistForm');
const successMessage = document.getElementById('successMessage');
const formStatus = document.getElementById('formStatus');

if (waitlistForm) {
    const submitButton = waitlistForm.querySelector('button[type="submit"]');
    const originalButtonHtml = submitButton.innerHTML;

    const showStatus = (message) => {
        formStatus.textContent = message;
        formStatus.hidden = false;
    };

    waitlistForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        formStatus.hidden = true;

        const endpoint = waitlistForm.getAttribute('action');
        if (!endpoint) {
            showStatus("Signups aren't open yet. Please check back soon.");
            return;
        }

        submitButton.innerHTML = '<span>Sending...</span>';
        submitButton.disabled = true;

        try {
            const response = await fetch(endpoint, {
                method: 'POST',
                headers: { 'Accept': 'application/json' },
                body: new FormData(waitlistForm),
            });

            if (!response.ok) {
                throw new Error(`Signup failed with HTTP ${response.status}`);
            }

            waitlistForm.hidden = true;
            successMessage.hidden = false;
        } catch (error) {
            showStatus("Something went wrong and your signup wasn't saved. Please try again in a minute.");
            submitButton.innerHTML = originalButtonHtml;
            submitButton.disabled = false;
        }
    });
}

// ===========================
// Scroll Reveal Animations
// ===========================
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
            observer.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
});

document.querySelectorAll('.feature-card, .problem-card, .faq-item').forEach(el => {
    observer.observe(el);
});

// ===========================
// Active Navigation Highlighting
// ===========================
const sections = document.querySelectorAll('section[id]');

const highlightNavOnScroll = () => {
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        const navLink = document.querySelector(`.nav-links a[href="#${sectionId}"]`);

        if (navLink && scrollY > sectionTop && scrollY <= sectionTop + section.offsetHeight) {
            document.querySelectorAll('.nav-links a').forEach(link => {
                link.classList.remove('active');
            });
            navLink.classList.add('active');
        }
    });
};

window.addEventListener('scroll', highlightNavOnScroll);

// ===========================
// Email Mockup Animation
// ===========================
const jobCards = document.querySelectorAll('.job-card:not(.blur)');

if (jobCards.length > 0) {
    let currentCard = 0;

    setInterval(() => {
        const card = jobCards[currentCard];
        card.style.transition = 'transform 0.3s ease';
        card.style.transform = 'translateX(4px)';
        setTimeout(() => {
            card.style.transform = '';
        }, 300);

        currentCard = (currentCard + 1) % jobCards.length;
    }, 3000);
}

// ===========================
// Footer Year
// ===========================
const footerYear = document.querySelector('.footer-bottom p');
if (footerYear) {
    footerYear.textContent = `© ${new Date().getFullYear()} SilentJobs. All rights reserved.`;
}

// ===========================
// Smooth Page Load
// ===========================
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});
