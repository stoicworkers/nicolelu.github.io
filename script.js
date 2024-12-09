document.addEventListener("DOMContentLoaded", function() {
    // Typing effect configuration
    const mainTitle = document.getElementById("main-title");
    const baseWord = "Stoic";
    const variations = ["AI", "Agents", "Workers", "Consultants"];
    let variationIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let currentVariation = "";

    // We'll first type out "Stoic" and then proceed to type the variations.
    function typeTitle() {
        // If we haven't typed baseWord fully yet
        if (charIndex < baseWord.length) {
            mainTitle.textContent = baseWord.slice(0, charIndex + 1);
            charIndex++;
            setTimeout(typeTitle, 100);
        } else {
            // Once "Stoic" is fully typed, move on to variations.
            cycleVariations();
        }
    }

    function cycleVariations() {
        if (variationIndex < variations.length) {
            // Type out a space and then the variation
            currentVariation = variations[variationIndex];
            typeVariation();
        } else {
            // No more variations: end with "Stoic"
            // "Stoic" is already displayed, do nothing
        }
    }

    function typeVariation() {
        // Count how many letters of the variation have been typed
        const currentLength = mainTitle.textContent.length - baseWord.length - 1; // minus "Stoic " length

        if (!isDeleting && currentLength < currentVariation.length) {
            // Type forward
            mainTitle.textContent = baseWord + " " + currentVariation.slice(0, currentLength + 1);
            setTimeout(typeVariation, 100);
        } else if (!isDeleting && currentLength === currentVariation.length) {
            // Full variation typed, wait, then start deleting
            setTimeout(() => {
                isDeleting = true;
                typeVariation();
            }, 1000);
        } else if (isDeleting && currentLength > 0) {
            // Delete letters of the variation
            mainTitle.textContent = baseWord + " " + currentVariation.slice(0, currentLength - 1);
            setTimeout(typeVariation, 50);
        } else if (isDeleting && currentLength === 0) {
            // Finished deleting the variation and the space
            // Move to the next variation
            isDeleting = false;
            variationIndex++;
            cycleVariations();
        }
    }

    typeTitle();

    // Wave effect for subtitle
    const subtitle = document.getElementById('subtitle');
    const subtitleText = subtitle.textContent;
    subtitle.textContent = '';

    // Split subtitle into spans for each letter
    for (let i = 0; i < subtitleText.length; i++) {
        const span = document.createElement('span');
        span.textContent = subtitleText[i];
        subtitle.appendChild(span);
    }

    const subtitleSpans = subtitle.querySelectorAll('span');

    window.addEventListener('scroll', () => {
        let scrollPos = window.pageYOffset || document.documentElement.scrollTop;
        subtitleSpans.forEach((span, i) => {
            const wave = Math.sin((scrollPos / 100) + i / 5) * 15; 
            span.style.transform = `rotate(${wave}deg)`;
        });
    });
});
