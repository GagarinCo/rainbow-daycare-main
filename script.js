// Mobile menu functionality
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const nav = document.getElementById('nav');
    let isMenuOpen = false;

    // Toggle mobile menu
    mobileMenuBtn.addEventListener('click', function() {
        isMenuOpen = !isMenuOpen;
        if (isMenuOpen) {
            nav.classList.add('nav-open');
            // Change icon to X
            mobileMenuBtn.innerHTML = `
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
            `;
        } else {
            nav.classList.remove('nav-open');
            // Change icon back to hamburger
            mobileMenuBtn.innerHTML = `
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <line x1="3" y1="6" x2="21" y2="6"></line>
                    <line x1="3" y1="12" x2="21" y2="12"></line>
                    <line x1="3" y1="18" x2="21" y2="18"></line>
                </svg>
            `;
        }
    });

    // Close mobile menu when clicking on nav links
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (isMenuOpen) {
                nav.classList.remove('nav-open');
                isMenuOpen = false;
                // Change icon back to hamburger
                mobileMenuBtn.innerHTML = `
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <line x1="3" y1="6" x2="21" y2="6"></line>
                        <line x1="3" y1="12" x2="21" y2="12"></line>
                        <line x1="3" y1="18" x2="21" y2="18"></line>
                    </svg>
                `;
            }
        });
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
        if (isMenuOpen && !nav.contains(event.target) && !mobileMenuBtn.contains(event.target)) {
            nav.classList.remove('nav-open');
            isMenuOpen = false;
            // Change icon back to hamburger
            mobileMenuBtn.innerHTML = `
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <line x1="3" y1="6" x2="21" y2="6"></line>
                    <line x1="3" y1="12" x2="21" y2="12"></line>
                    <line x1="3" y1="18" x2="21" y2="18"></line>
                </svg>
            `;
        }
    });
});

// Gallery modal functionality
let currentImageIndex = 0;
const galleryImages = [
    {
        src: 'images/rainbow_preschool.jpg',
        alt: 'Rainbow Preschool classroom environment'
    },
    {
        src: 'images/playarea.jpg',
        alt: 'Indoor play and reading area'
    },
    {
        src: 'images/playarea2.jpg',
        alt: 'Imaginative play space with toys'
    },
    {
        src: 'images/cubbies.jpg',
        alt: 'Personal cubbies for each child'
    }
];

function openModal(index) {
    currentImageIndex = index;
    const modal = document.getElementById('modal');
    const modalImg = document.getElementById('modal-img');
    const modalCounter = document.getElementById('modal-counter');
    
    modal.style.display = 'flex';
    modalImg.src = galleryImages[index].src;
    modalImg.alt = galleryImages[index].alt;
    modalCounter.textContent = `${index + 1}/${galleryImages.length}`;
    
    // Prevent body scroll when modal is open
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    const modal = document.getElementById('modal');
    modal.style.display = 'none';
    
    // Restore body scroll
    document.body.style.overflow = 'auto';
}

function nextImage() {
    currentImageIndex = (currentImageIndex + 1) % galleryImages.length;
    const modalImg = document.getElementById('modal-img');
    const modalCounter = document.getElementById('modal-counter');
    
    modalImg.src = galleryImages[currentImageIndex].src;
    modalImg.alt = galleryImages[currentImageIndex].alt;
    modalCounter.textContent = `${currentImageIndex + 1}/${galleryImages.length}`;
}

function prevImage() {
    currentImageIndex = currentImageIndex === 0 ? galleryImages.length - 1 : currentImageIndex - 1;
    const modalImg = document.getElementById('modal-img');
    const modalCounter = document.getElementById('modal-counter');
    
    modalImg.src = galleryImages[currentImageIndex].src;
    modalImg.alt = galleryImages[currentImageIndex].alt;
    modalCounter.textContent = `${currentImageIndex + 1}/${galleryImages.length}`;
}

// Keyboard navigation for gallery modal
document.addEventListener('keydown', function(event) {
    const modal = document.getElementById('modal');
    if (modal.style.display === 'flex') {
        if (event.key === 'Escape') {
            closeModal();
        } else if (event.key === 'ArrowRight') {
            nextImage();
        } else if (event.key === 'ArrowLeft') {
            prevImage();
        }
    }
});

// Success message function
function showSuccessMessage() {
    const submitButton = document.querySelector('#contact-form button[type="submit"]');
    const existingMessage = document.querySelector('.success-message');
    
    // Remove existing message if any
    if (existingMessage) {
        existingMessage.remove();
    }
    
    // Create success message
    const successMessage = document.createElement('span');
    successMessage.className = 'success-message';
    successMessage.textContent = 'Sent!';
    
    // Insert after the submit button
    submitButton.parentNode.insertBefore(successMessage, submitButton.nextSibling);
    
    // Remove message after 3 seconds
    setTimeout(() => {
        if (successMessage.parentNode) {
            successMessage.remove();
        }
    }, 3000);
}

// Contact form functionality
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(contactForm);
            const name = formData.get('name');
            const email = formData.get('email');
            const phone = formData.get('phone');
            const programInterest = formData.get('programInterest');
            const message = formData.get('message');
            
            // Create email content
            const subject = `New message from ${name}`;
            const body = [
                `Name: ${name}`,
                `Email: ${email}`,
                `Phone: ${phone}`,
                `Program Interest: ${programInterest}`,
                `Message: ${message}`
            ].join('\n');
            
            // Create mailto link
            const mailtoLink = `mailto:rosiebabad@yahoo.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
            
            // Open email client in new tab
            window.open(mailtoLink, '_blank');
            
            // Show confirmation message
            showSuccessMessage();
            
            // Reset form
            contactForm.reset();
        });
    }
});

// Smooth scrolling for anchor links
document.addEventListener('DOMContentLoaded', function() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
});

// Header scroll effect
window.addEventListener('scroll', function() {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.style.background = 'rgba(255, 255, 255, 0.95)';
        header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.15)';
    } else {
        header.style.background = 'rgba(255, 255, 255, 0.98)';
        header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.08)';
    }
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', function() {
    const animatedElements = document.querySelectorAll('.program-card, .review-card, .value-item, .gallery-item');
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});
