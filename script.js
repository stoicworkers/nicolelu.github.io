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

    // Ensure only one instance of the subtitle effect
const subtitle = document.getElementById('subtitle');

// Remove any existing modifications
if (subtitle.getAttribute('data-modified') === 'true') {
    // Remove existing spans and reset
    while (subtitle.firstChild) {
        subtitle.removeChild(subtitle.firstChild);
    }
    subtitle.textContent = subtitle.getAttribute('data-original-text');
    subtitle.removeAttribute('data-modified');
}

// Store original text
const subtitleText = subtitle.textContent;
subtitle.setAttribute('data-original-text', subtitleText);
subtitle.setAttribute('data-modified', 'true');
subtitle.textContent = ''; 

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

const subtitleSpans = Array.from(subtitle.querySelectorAll('span:not(.subtitle-space)'));

// Continuous scrolling effect
window.addEventListener('scroll', () => {
    let scrollPos = window.pageYOffset || document.documentElement.scrollTop;
    
    subtitleSpans.forEach((span, i) => {
        // Create a more dynamic, continuous wave effect
        const wave = Math.sin((scrollPos / 50) + i / 5) * 20;
        
        // Reset transform if it gets too extreme
        span.style.transform = `rotate(${wave}deg)`;
    });
});

// Optional: Infinite scroll reset
window.addEventListener('scroll', () => {
    let scrollPos = window.pageYOffset || document.documentElement.scrollTop;
    
    // Reset scroll effect when it reaches a certain threshold
    if (scrollPos > window.innerHeight * 2) {
        window.scrollTo(0, 0);
    }
}); 
    
});
