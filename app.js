// =================================================================
// INITIALIZATION
// =================================================================

document.addEventListener('DOMContentLoaded', function() {
    initNavigation();
    initTypingEffect();
    initScrollAnimations();
    initContactForm();
    initBackToTop();
});

// =================================================================
// NAVIGATION FUNCTIONALITY
// =================================================================

function initNavigation() {
    const navbar = document.getElementById('navbar');
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Sticky navigation on scroll
    let lastScroll = 0;
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        // Show navbar after scrolling down 100px
        if (currentScroll > 100) {
            navbar.classList.add('visible');
        } else {
            navbar.classList.remove('visible');
        }
        
        lastScroll = currentScroll;
    });
    
    // Mobile menu toggle
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
    
    // Close mobile menu when clicking a link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
    
    // Smooth scroll for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// =================================================================
// TYPING EFFECT FOR HERO SECTION
// =================================================================

function initTypingEffect() {
    const typedTextElement = document.getElementById('typedText');
    const textToType = 'Building beautiful, responsive, and user-friendly web experiences';
    let charIndex = 0;
    
    function typeCharacter() {
        if (charIndex < textToType.length) {
            typedTextElement.textContent += textToType.charAt(charIndex);
            charIndex++;
            setTimeout(typeCharacter, 50); // Typing speed
        }
    }
    
    // Start typing after a short delay
    setTimeout(typeCharacter, 500);
}

// =================================================================
// SCROLL ANIMATIONS (INTERSECTION OBSERVER)
// =================================================================

function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Optional: Stop observing after animation
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe all elements with fade-in class
    const fadeElements = document.querySelectorAll('.fade-in');
    fadeElements.forEach(element => {
        observer.observe(element);
    });
    
    // Also observe project cards individually
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach((card, index) => {
        card.style.transitionDelay = `${index * 0.1}s`;
        observer.observe(card);
    });
}

// =================================================================
// CONTACT FORM HANDLING
// =================================================================

function initContactForm() {
    const form = document.getElementById('contactForm');
    const submitBtn = document.getElementById('submitBtn');
    const formMessage = document.getElementById('formMessage');
    const btnText = submitBtn.querySelector('.btn-text');
    const btnLoader = submitBtn.querySelector('.btn-loader');
    
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        // Validate form
        if (!validateForm()) {
            return;
        }
        
        // Show loading state
        submitBtn.disabled = true;
        btnText.style.display = 'none';
        btnLoader.style.display = 'inline';
        formMessage.style.display = 'none';
        
        try {
            // Get form data
            const formData = new FormData(form);
            
            // Submit to Formspree
            const response = await fetch(form.action, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            });
            
            if (response.ok) {
                showMessage('success', 'Thank you! Your message has been sent successfully.');
                form.reset();
            } else {
                showMessage('error', 'Oops! Something went wrong. Please try again.');
            }
        } catch (error) {
            showMessage('error', 'Network error. Please check your connection and try again.');
        } finally {
            // Reset button state
            submitBtn.disabled = false;
            btnText.style.display = 'inline';
            btnLoader.style.display = 'none';
        }
    });
    
    function validateForm() {
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const message = document.getElementById('message').value.trim();
        
        if (!name || !email || !message) {
            showMessage('error', 'Please fill in all required fields.');
            return false;
        }
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            showMessage('error', 'Please enter a valid email address.');
            return false;
        }
        
        return true;
    }
    
    function showMessage(type, message) {
        formMessage.textContent = message;
        formMessage.className = `form-message ${type}`;
        formMessage.style.display = 'block';
        
        // Hide message after 5 seconds
        setTimeout(() => {
            formMessage.style.display = 'none';
        }, 5000);
    }
}

// =================================================================
// BACK TO TOP BUTTON
// =================================================================

function initBackToTop() {
    const backToTopBtn = document.getElementById('backToTop');
    
    // Show/hide button based on scroll position
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    });
    
    // Scroll to top when clicked
    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// =================================================================
// SMOOTH SCROLL FOR ALL ANCHOR LINKS
// =================================================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        
        // Don't prevent default for empty hash or just '#'
        if (href === '#' || href === '') {
            return;
        }
        
        const target = document.querySelector(href);
        if (target) {
            e.preventDefault();
            const offsetTop = target.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// =================================================================
// CUSTOMIZATION GUIDE (COMMENTS)
// =================================================================

/*

HOW TO CUSTOMIZE THIS PORTFOLIO:

1. PERSONAL INFORMATION:
   - Update name, title, and tagline in index.html (Hero section)
   - Update contact information in Contact section
   - Update social media links (LinkedIn, GitHub, Twitter, Email)

2. ABOUT SECTION:
   - Replace the text in .about-text paragraphs
   - Update the highlight cards with your own stats
   - Change "YN" initials in the image placeholder

3. PROJECTS:
   - Each project is in a .project-card div
   - Update project titles, descriptions, and technologies
   - Change gradient backgrounds with new colors or add images
   - Update GitHub and live demo links

4. SKILLS:
   - Add or remove skills in each .skill-category
   - Skills are organized in Frontend, Backend, and Tools sections

5. CONTACT FORM:
   - Replace "YOUR_FORM_ID" in form action with your Formspree ID
   - Get free form ID at https://formspree.io

6. COLORS:
   - All colors are defined in CSS variables at the top of style.css
   - Change --primary-color, --secondary-color, --accent-color

7. ADDING NEW PROJECTS:
   - Copy any .project-card div
   - Paste it in the .projects-grid
   - Update all content and links

8. CV/RESUME DOWNLOAD:
   - Upload your CV file to your hosting
   - Update all "Download CV" button hrefs to point to your file
   - Example: href="/path/to/your-cv.pdf" download

9. FOOTER:
   - Update copyright year and name
   - Verify all footer links are correct

10. DEPLOYMENT:
    - Upload all files to your hosting service
    - Or use GitHub Pages, Netlify, or Vercel for free hosting

*/