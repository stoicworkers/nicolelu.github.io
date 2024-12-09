document.addEventListener("DOMContentLoaded", function() {
    // Typing effect for main title
    const mainTitle = document.getElementById("main-title");
    const titlePhrases = ["Stoic AI", "Stoic Agents", "Stoic Workers", "Stoic Consultants", "Stoic"];
    let phraseIndex = 0;
    let charIndex = 0;
    let deleting = false;
    let currentPhrase = titlePhrases[phraseIndex];

    function typeTitle() {
        if (!deleting && charIndex <= currentPhrase.length) {
            mainTitle.textContent = currentPhrase.slice(0, charIndex++);
            setTimeout(typeTitle, 100);
        } else if (deleting && charIndex >= 0) {
            mainTitle.textContent = currentPhrase.slice(0, charIndex--);
            setTimeout(typeTitle, 50);
        } else {
            if (!deleting) {
                // Finished typing, pause before deleting
                if (phraseIndex < titlePhrases.length - 1) {
                    setTimeout(() => { deleting = true; typeTitle(); }, 1000);
                } else {
                    // Last phrase "Stoic" stay
                }
            } else {
                // Finished deleting, move to next phrase
                deleting = false;
                phraseIndex++;
                if (phraseIndex < titlePhrases.length) {
                    currentPhrase = titlePhrases[phraseIndex];
                    setTimeout(typeTitle, 200);
                }
            }
        }
    }
    typeTitle();

    // Wave effect for subtitle
    const subtitle = document.getElementById('subtitle');
    const subtitleText = subtitle.textContent;
    subtitle.textContent = ''; // Clear original text
    
    // Split subtitle into spans for each character or space
    for (let i = 0; i < subtitleText.length; i++) {
        const span = document.createElement('span');
        span.textContent = subtitleText[i];
        
        // Add a non-breaking space class for space characters to maintain layout
        if (subtitleText[i] === ' ') {
            span.classList.add('subtitle-space');
            span.innerHTML = '&nbsp;'; // Use non-breaking space to preserve spacing
        }
        
        subtitle.appendChild(span);
    }
    
    const subtitleSpans = subtitle.querySelectorAll('span:not(.subtitle-space)');
    
    window.addEventListener('scroll', () => {
        let scrollPos = window.pageYOffset || document.documentElement.scrollTop;
        subtitleSpans.forEach((span, i) => {
            const wave = Math.sin((scrollPos / 100) + i / 5) * 15;
            span.style.transform = `rotate(${wave}deg)`;
        });
    });    
    
});
