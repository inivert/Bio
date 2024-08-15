document.addEventListener('DOMContentLoaded', () => {
    const links = document.querySelectorAll('.link-item');
    const letters = document.querySelectorAll('.letter');

    // I learned that animating letters individually creates a cool effect
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
    
    // This resets the animation when you hover over a letter
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

    // This adds a fun bouncing effect to the first social media button
    const firstButton = document.querySelector('.link-item:first-child');
    setInterval(() => {
        firstButton.style.animation = 'none';
        firstButton.offsetHeight; // Trigger reflow
        firstButton.style.animation = 'rubberBand 1s';
    }, 5000);

    // This adds a pulse animation when you click a link
    links.forEach(link => {
        link.addEventListener('click', () => {
            link.style.animation = 'pulse 0.3s';
            
            setTimeout(() => {
                link.style.animation = '';
            }, 300);
        });
    });

    // This makes the icons grow and rotate slightly when you hover over them
    links.forEach(link => {
        const icon = link.querySelector('i');
        link.addEventListener('mouseenter', () => {
            icon.style.transform = 'scale(1.2) rotate(5deg)';
        });
        link.addEventListener('mouseleave', () => {
            icon.style.transform = 'scale(1) rotate(0deg)';
        });
    });

    // This creates a cool reveal effect as you scroll down the page
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

    // I might add custom background options in the future
    function setCustomBackground() {
        // Add code here to set a custom background
    }

    // I'm thinking about adding a music player feature
    function initMusicPlayer() {
        // Add code here to initialize a music player
    }
});

// This is the fortune cookie functionality
document.addEventListener('DOMContentLoaded', () => {
    const fortuneCookieBtn = document.getElementById('fortune-cookie-btn');
    const fortuneMessage = document.getElementById('fortune-message');
    const linksContainer = document.querySelector('.links');

    fortuneCookieBtn.addEventListener('click', () => {
        fortuneCookieBtn.disabled = true;
        fortuneMessage.classList.remove('visible');
        fortuneMessage.textContent = 'Cracking open your fortune cookie...';
        fortuneMessage.classList.add('visible');

        // This pushes the links down when you click the fortune cookie button
        linksContainer.classList.add('pushed');

        // We wait for 3 seconds to build anticipation before fetching the fortune
        setTimeout(() => {
            fetch('https://aphorismcookie.herokuapp.com/slack')
        .then(response => response.json())
        .then(data => {
            fortuneMessage.textContent = data.text.replace("your fortune reads: '", "").replace("'", "");
            fortuneMessage.classList.add('visible');
            fortuneCookieBtn.disabled = false;
        })
        .catch(error => {
            console.error('Error:', error);
            fortuneMessage.textContent = 'Oops! Could not crack open the fortune cookie. Try again later.';
            fortuneMessage.classList.add('visible');
            fortuneCookieBtn.disabled = false;
        })
        .finally(() => {
            // This resets the animation after 2 seconds
            setTimeout(() => {
                linksContainer.classList.remove('pushed');
            }, 2000);
            });
        }, 3000); // 3 seconds delay
    });
});
