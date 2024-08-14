document.addEventListener('DOMContentLoaded', () => {
    const links = document.querySelectorAll('.link-item');
    const letters = document.querySelectorAll('.letter');

    // Prevent default touch behavior on non-scrollable elements
    document.addEventListener('touchmove', function(e) {
        if(!e.target.closest('.links')) {
            e.preventDefault();
        }
    }, { passive: false });

    // Animate letters on page load
    letters.forEach((letter, index) => {
        letter.style.opacity = '1';
        if (letter.tagName.toLowerCase() === 'svg') {
            const paths = letter.querySelectorAll('path');
            paths.forEach(path => {
                path.style.animation = `lines 4s infinite ${index * 0.2}s`;
            });
        } else {
            letter.style.animation = `fadeIn 0.5s forwards ${index * 0.2}s`;
        }
    });
    
    // Reset animation on hover
    letters.forEach(letter => {
        letter.addEventListener('mouseenter', () => {
            if (letter.tagName.toLowerCase() === 'svg') {
                const paths = letter.querySelectorAll('path');
                paths.forEach(path => {
                    path.style.animation = 'none';
                    path.offsetHeight; // Trigger reflow
                    path.style.animation = 'lines 4s infinite';
                });
            } else {
                letter.style.animation = 'none';
                letter.offsetHeight; // Trigger reflow
                letter.style.animation = 'fadeIn 0.5s forwards';
            }
        });
    });

    // Add rubberBand effect to Instagram button
    const instagramButton = document.querySelector('.link-item:first-child');
    setInterval(() => {
        instagramButton.style.animation = 'none';
        instagramButton.offsetHeight; // Trigger reflow
        instagramButton.style.animation = 'rubberBand 1s';
    }, 5000);

    links.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Add a pulse animation on click
            link.style.animation = 'pulse 0.3s';
            
            // Remove the animation after it completes and open the link after a delay
            setTimeout(() => {
                link.style.animation = '';
                setTimeout(() => {
                    window.location.href = link.href;
                }, 300); // Additional 300ms delay before opening the link
            }, 300);
        });
    });

    // Add hover effect for icons
    links.forEach(link => {
        const icon = link.querySelector('i');
        link.addEventListener('mouseenter', () => {
            icon.style.transform = 'scale(1.2) rotate(5deg)';
        });
        link.addEventListener('mouseleave', () => {
            icon.style.transform = 'scale(1) rotate(0deg)';
        });
    });

    // Add scroll reveal effect
    const revealElements = document.querySelectorAll('.link-item, h1, .profile-picture');
    const revealElementsOnScroll = () => {
        revealElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementBottom = element.getBoundingClientRect().bottom;
            
            if (elementTop < window.innerHeight && elementBottom > 0) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };

    window.addEventListener('scroll', revealElementsOnScroll);
    revealElementsOnScroll(); // Call once on load

    // Placeholder for future background customization
    function setCustomBackground() {
        // Add code here to set a custom background
    }

    // Placeholder for future music player integration
    function initMusicPlayer() {
        // Add code here to initialize a music player
    }
});
