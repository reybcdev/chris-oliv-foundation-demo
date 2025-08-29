// Mobile Navigation Toggle for Tailwind CSS
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuButton = document.querySelector('.md\\:hidden button');
    const desktopMenu = document.querySelector('.hidden.md\\:block');
    let mobileMenu = null;

    if (mobileMenuButton) {
        // Create mobile menu if it doesn't exist
        if (!mobileMenu) {
            createMobileMenu();
        }

        mobileMenuButton.addEventListener('click', function() {
            toggleMobileMenu();
        });

        // Close mobile menu when clicking outside
        document.addEventListener('click', function(event) {
            if (mobileMenu && !mobileMenu.contains(event.target) && !mobileMenuButton.contains(event.target)) {
                closeMobileMenu();
            }
        });

        // Close mobile menu on escape key
        document.addEventListener('keydown', function(event) {
            if (event.key === 'Escape' && mobileMenu && mobileMenu.classList.contains('block')) {
                closeMobileMenu();
            }
        });
    }

    function createMobileMenu() {
        const nav = document.querySelector('nav');
        const navContainer = nav.querySelector('.max-w-7xl');
        
        mobileMenu = document.createElement('div');
        mobileMenu.className = 'hidden md:hidden bg-white border-t border-gray-200 shadow-lg';
        
        // Create mobile menu with clean structure
        const mobileLinks = [
            { href: 'index.html', text: 'Home' },
            { href: 'about.html', text: 'About' },
            { href: 'programs.html', text: 'Programs' },
            { href: 'impact.html', text: 'Impact' },
            { href: 'donate.html', text: 'Donate' },
            { href: 'volunteer.html', text: 'Volunteer' },
            { href: 'partner.html', text: 'Partner' },
            { href: 'stories.html', text: 'Stories' },
            { href: 'contact.html', text: 'Contact' }
        ];
        
        mobileMenu.innerHTML = `
            <div class="px-4 py-6 space-y-3">
                ${mobileLinks.map(link => 
                    `<a href="${link.href}" class="block text-gray-600 hover:text-primary transition-colors font-medium py-2 border-b border-gray-100 last:border-b-0">${link.text}</a>`
                ).join('')}
                <div class="pt-4 mt-4 border-t border-gray-200">
                    <a href="donate.html" class="block bg-primary hover:bg-primary-dark text-white px-4 py-3 rounded-lg font-medium text-center transition-colors">Donate Now</a>
                </div>
            </div>
        `;
        
        navContainer.appendChild(mobileMenu);
        
        // Add click handlers to mobile menu links
        mobileMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', function() {
                closeMobileMenu();
            });
        });
    }

    function toggleMobileMenu() {
        if (mobileMenu) {
            const isOpen = mobileMenu.classList.contains('block');
            if (isOpen) {
                closeMobileMenu();
            } else {
                openMobileMenu();
            }
        }
    }

    function openMobileMenu() {
        if (mobileMenu) {
            mobileMenu.classList.remove('hidden');
            mobileMenu.classList.add('block');
            mobileMenuButton.setAttribute('aria-expanded', 'true');
            
            // Update hamburger icon to X
            const svg = mobileMenuButton.querySelector('svg');
            if (svg) {
                svg.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />';
            }
        }
    }

    function closeMobileMenu() {
        if (mobileMenu) {
            mobileMenu.classList.remove('block');
            mobileMenu.classList.add('hidden');
            mobileMenuButton.setAttribute('aria-expanded', 'false');
            
            // Update X icon back to hamburger
            const svg = mobileMenuButton.querySelector('svg');
            if (svg) {
                svg.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />';
            }
        }
    }
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Add scroll effect to navbar (Tailwind version)
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('nav');
    if (navbar) {
        if (window.scrollY > 100) {
            navbar.classList.add('shadow-xl');
            navbar.classList.remove('shadow-lg');
        } else {
            navbar.classList.add('shadow-lg');
            navbar.classList.remove('shadow-xl');
        }
    }
});

// FAQ Accordion functionality (if on FAQ page)
document.addEventListener('DOMContentLoaded', function() {
    const faqButtons = document.querySelectorAll('.bg-gray-50 button');
    
    faqButtons.forEach(button => {
        const answer = button.nextElementSibling;
        const icon = button.querySelector('svg');
        
        // Initially hide all answers
        if (answer && answer.classList.contains('px-6')) {
            answer.style.display = 'none';
        }
        
        button.addEventListener('click', function() {
            const isOpen = answer.style.display === 'block';
            
            // Close all other FAQ items
            faqButtons.forEach(otherButton => {
                const otherAnswer = otherButton.nextElementSibling;
                const otherIcon = otherButton.querySelector('svg');
                if (otherAnswer && otherAnswer !== answer) {
                    otherAnswer.style.display = 'none';
                    if (otherIcon) {
                        otherIcon.style.transform = 'rotate(0deg)';
                    }
                }
            });
            
            // Toggle current FAQ item
            if (isOpen) {
                answer.style.display = 'none';
                if (icon) {
                    icon.style.transform = 'rotate(0deg)';
                }
            } else {
                answer.style.display = 'block';
                if (icon) {
                    icon.style.transform = 'rotate(45deg)';
                }
            }
        });
    });
});

// Stats animation on scroll (if stats exist on page)
document.addEventListener('DOMContentLoaded', function() {
    const statNumbers = document.querySelectorAll('[data-count]');
    
    if (statNumbers.length > 0) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const element = entry.target;
                    const targetValue = parseInt(element.getAttribute('data-count'));
                    
                    if (targetValue && !element.classList.contains('animated')) {
                        element.classList.add('animated');
                        animateNumber(element, 0, targetValue, 2000);
                    }
                }
            });
        }, { threshold: 0.5 });
        
        statNumbers.forEach(stat => observer.observe(stat));
    }
});

function animateNumber(element, start, end, duration) {
    const startTime = performance.now();
    const originalText = element.textContent;
    const hasPlus = originalText.includes('+');
    const hasComma = originalText.includes(',');

    function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Easing function for smooth animation
        const easeOutQuart = 1 - Math.pow(1 - progress, 4);
        const current = Math.floor(start + (end - start) * easeOutQuart);
        
        let displayNumber = current.toString();
        if (hasComma && current >= 1000) {
            displayNumber = current.toLocaleString();
        }
        if (hasPlus) {
            displayNumber += '+';
        }
        
        element.textContent = displayNumber;

        if (progress < 1) {
            requestAnimationFrame(update);
        }
    }

    requestAnimationFrame(update);
}
