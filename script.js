// DOM Elements
const themeBtn = document.getElementById('theme-btn');
const body = document.body;
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const navLinksItems = document.querySelectorAll('.nav-links a');
const backToTop = document.getElementById('back-to-top');
const contactForm = document.getElementById('contactForm');
const formStatus = document.getElementById('form-status');
const downloadCvBtn = document.getElementById('download-cv-btn');
const filterBtns = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');
const sections = document.querySelectorAll('section');

// Theme Toggle
themeBtn.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
    
    if (body.classList.contains('dark-mode')) {
        themeBtn.innerHTML = '<i class="fas fa-sun"></i>';
        localStorage.setItem('theme', 'dark');
    } else {
        themeBtn.innerHTML = '<i class="fas fa-moon"></i>';
        localStorage.setItem('theme', 'light');
    }
});

// Check for saved theme preference
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark') {
    body.classList.add('dark-mode');
    themeBtn.innerHTML = '<i class="fas fa-sun"></i>';
}

// Mobile Navigation
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
    
    if (hamburger.classList.contains('active')) {
        hamburger.querySelector('span:nth-child(1)').style.transform = 'rotate(45deg) translate(5px, 5px)';
        hamburger.querySelector('span:nth-child(2)').style.opacity = '0';
        hamburger.querySelector('span:nth-child(3)').style.transform = 'rotate(-45deg) translate(5px, -5px)';
    } else {
        hamburger.querySelector('span:nth-child(1)').style.transform = 'none';
        hamburger.querySelector('span:nth-child(2)').style.opacity = '1';
        hamburger.querySelector('span:nth-child(3)').style.transform = 'none';
    }
});

// Close mobile menu when clicking a link
navLinksItems.forEach(item => {
    item.addEventListener('click', () => {
        navLinks.classList.remove('active');
        hamburger.classList.remove('active');
        hamburger.querySelector('span:nth-child(1)').style.transform = 'none';
        hamburger.querySelector('span:nth-child(2)').style.opacity = '1';
        hamburger.querySelector('span:nth-child(3)').style.transform = 'none';
    });
});

// Active Navigation Link on Scroll
window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (pageYOffset >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });
    
    navLinksItems.forEach(item => {
        item.classList.remove('active');
        if (item.getAttribute('href') === `#${current}`) {
            item.classList.add('active');
        }
    });
    
    // Show/Hide Back to Top Button
    if (window.scrollY > 500) {
        backToTop.style.opacity = '1';
    } else {
        backToTop.style.opacity = '0';
    }
});

// Back to Top
backToTop.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

contactForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    // Get input values
    const nameInput = document.getElementById("name").value;
    const emailInput = document.getElementById("email").value;
    const subjectInput = document.getElementById("subject").value;
    const messageInput = document.getElementById("message").value;

    // Validate fields
    if (!nameInput || !emailInput || !subjectInput || !messageInput) {
        formStatus.textContent = "Please fill in all fields";
        formStatus.style.color = "red";
        return;
    }

    // Email validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(emailInput)) {
        formStatus.textContent = "Please enter a valid email address";
        formStatus.style.color = "red";
        return;
    }

    // Google Form URL
    const googleFormURL =
        "https://docs.google.com/forms/u/0/d/e/1FAIpQLSc4A7GB_3xW5keMIjwWbmZyZIm6hJg_PSc7Df7QTz0-2yhfpw/formResponse";

    // Replace with actual entry IDs from Google Form
    const formData = new FormData();
    formData.append("entry.928483256", nameInput);
    formData.append("entry.150071011", emailInput);
    formData.append("entry.706009973", subjectInput);
    formData.append("entry.497615306", messageInput);

    // Display sending message
    formStatus.textContent = "Sending...";
    formStatus.style.color = "blue";

    try {
        // Send data to Google Form (Note: No response handling)
        await fetch(googleFormURL, {
            method: "POST",
            mode: "no-cors",
            body: formData,
        });

        // Show success message immediately
        formStatus.textContent = "Message sent successfully!";
        formStatus.style.color = "green";
        contactForm.reset();

        // Reset status after 5 seconds
        setTimeout(() => {
            formStatus.textContent = "";
        }, 5000);
    } catch (error) {
        // No error handling for Google Forms
        formStatus.textContent = "An error occurred. Please try again.";
        formStatus.style.color = "red";
    }
});



// Download CV - Replace with actual download functionality
downloadCvBtn.addEventListener('click', (e) => {
    e.preventDefault();
    
    // Create download link for CV
    const cvUrl = 'assets/files/Vishnu Karanth Resume March.pdf'; // Update with your actual CV file path
    
    // Create a temporary link element
    const tempLink = document.createElement('a');
    tempLink.href = cvUrl;
    tempLink.target = '_blank';
    tempLink.download = 'resume.pdf'; // The name the file will be downloaded as
    
    // Append to document, click, and remove
    document.body.appendChild(tempLink);
    tempLink.click();
    document.body.removeChild(tempLink);
});

// Project Filtering
filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Remove active class from all buttons and add to clicked button
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        const filter = btn.getAttribute('data-filter');
        
        // Filter projects based on category
        projectCards.forEach(card => {
            const category = card.getAttribute('data-category');
            
            if (filter === 'all') {
                card.style.display = 'block';
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'scale(1)';
                }, 100);
            } else if (category === filter) {
                card.style.display = 'block';
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'scale(1)';
                }, 100);
            } else {
                card.style.opacity = '0';
                card.style.transform = 'scale(0.8)';
                setTimeout(() => {
                    card.style.display = 'none';
                }, 300);
            }
        });
    });
});

// Animation for skill progress bars
const skillProgressBars = document.querySelectorAll('.skill-progress');

const animateSkillBars = () => {
    skillProgressBars.forEach(progressBar => {
        const progressRect = progressBar.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        
        if (progressRect.top < windowHeight - 50) {
            // The width is already set inline in the HTML
            progressBar.style.transition = 'width 1.5s ease-in-out';
        }
    });
};

// Hero section animation using GSAP
document.addEventListener('DOMContentLoaded', () => {
    // Only run if GSAP is available
    if (typeof gsap !== 'undefined') {
        // Hero section animations
        gsap.from('.hero-content h1', { 
            opacity: 0, 
            y: 50, 
            duration: 1 
        });
        
        gsap.from('.hero-content p', { 
            opacity: 0, 
            y: 30, 
            duration: 1,
            delay: 0.3
        });
        
        gsap.from('.hero-cta', { 
            opacity: 0, 
            y: 30, 
            duration: 1,
            delay: 0.6
        });
        
        // ScrollTrigger animations for sections
        if (typeof ScrollTrigger !== 'undefined') {
            gsap.registerPlugin(ScrollTrigger);
            
            // About section animation
            gsap.from('.about-image', {
                scrollTrigger: {
                    trigger: '.about-image',
                    start: 'top 80%',
                },
                x: -100,
                opacity: 0,
                duration: 1
            });
            
            gsap.from('.about-text', {
                scrollTrigger: {
                    trigger: '.about-text',
                    start: 'top 80%',
                },
                x: 100,
                opacity: 0,
                duration: 1
            });
            
            // Skills section animation
            gsap.from('.skill-category', {
                scrollTrigger: {
                    trigger: '#skills',
                    start: 'top 70%',
                },
                y: 50,
                opacity: 0,
                stagger: 0.3,
                duration: 0.8
            });
            
            // Project section animation
            gsap.from('.project-card', {
                scrollTrigger: {
                    trigger: '#projects',
                    start: 'top 60%',
                },
                y: 50,
                opacity: 0,
                stagger: 0.2,
                duration: 0.8
            });
            
            // Contact section animation
            gsap.from('.contact-info, .contact-form', {
                scrollTrigger: {
                    trigger: '#contact',
                    start: 'top 70%',
                },
                y: 50,
                opacity: 0,
                stagger: 0.3,
                duration: 0.8
            });
        }
    }
});

// Initial animation check on page load and scroll
window.addEventListener('load', animateSkillBars);
window.addEventListener('scroll', animateSkillBars);

// Project card click behavior
const projectLinks = document.querySelectorAll('.project-links a');

projectCards.forEach(card => {
    card.addEventListener('click', (e) => {
        // Don't trigger card click if clicking on the links
        if (e.target.closest('.project-links')) {
            return;
        }
        
        // Get first link (demo link) or create a modal if no link
        const firstLink = card.querySelector('.project-links a');
        if (firstLink && firstLink.getAttribute('href') !== '#') {
            window.open(firstLink.getAttribute('href'), '_blank');
        } else {
            // Create a simple modal to show project details
            const imgSrc = card.querySelector('img').src;
            const title = card.querySelector('h3').textContent;
            const description = card.querySelector('p').textContent;
            const tech = card.querySelector('.project-tech').innerHTML;
            
            // Create modal container
            const modal = document.createElement('div');
            modal.classList.add('project-modal');
            modal.innerHTML = `
                <div class="modal-content">
                    <span class="close-modal">&times;</span>
                    <img src="${imgSrc}" alt="${title}">
                    <h3>${title}</h3>
                    <p>${description}</p>
                    <div class="project-tech">${tech}</div>
                </div>
            `;
            
            // Add to body
            document.body.appendChild(modal);
            document.body.style.overflow = 'hidden';
            
            // Add close button functionality
            const closeBtn = modal.querySelector('.close-modal');
            closeBtn.addEventListener('click', () => {
                document.body.removeChild(modal);
                document.body.style.overflow = 'auto';
            });
            
            // Close when clicking outside modal content
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    document.body.removeChild(modal);
                    document.body.style.overflow = 'auto';
                }
            });
        }
    });
});

// Handle anchor links with smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        // Check if href is just # (to avoid issues with empty links)
        if (this.getAttribute('href') !== '#') {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                // Offset for fixed header (adjust the 80 value based on your header height)
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        }
    });
});

// Glitch effect for the hero title (if using the glitch class)
const glitchElement = document.querySelector('.glitch');
if (glitchElement) {
    // Set up glitch animation timing
    setInterval(() => {
        glitchElement.classList.add('active');
        setTimeout(() => {
            glitchElement.classList.remove('active');
        }, 200);
    }, 3000);
}