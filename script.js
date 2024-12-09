document.addEventListener("DOMContentLoaded", function() {
    // Typing effect configuration
    const mainTitle = document.getElementById("main-title");
    const baseWord = "Stoic";
    const variations = ["AI", "Agents", "Workers", "Consultants"];
    let variationIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let currentVariation = "";

    // First, type out "Stoic"
    function typeBase() {
        if (charIndex < baseWord.length) {
            mainTitle.textContent = baseWord.slice(0, charIndex + 1);
            charIndex++;
            setTimeout(typeBase, 100);
        } else {
            // Once "Stoic" is typed, proceed to variations
            cycleVariations();
        }
    }

    function cycleVariations() {
        if (variationIndex < variations.length) {
            currentVariation = variations[variationIndex];
            typeVariation();
        } else {
            // End with just "Stoic"
            // Already displayed, do nothing.
        }
    }

    function typeVariation() {
        const currentLength = mainTitle.textContent.length - baseWord.length - 1; // subtract "Stoic " length
        if (!isDeleting && currentLength < currentVariation.length) {
            // Type forward the variation
            mainTitle.textContent = baseWord + " " + currentVariation.slice(0, currentLength + 1);
            setTimeout(typeVariation, 100);
        } else if (!isDeleting && currentLength === currentVariation.length) {
            // Full variation typed, wait, then start deleting
            setTimeout(() => {
                isDeleting = true;
                typeVariation();
            }, 1000);
        } else if (isDeleting && currentLength > 0) {
            // Deleting characters
            mainTitle.textContent = baseWord + " " + currentVariation.slice(0, currentLength - 1);
            setTimeout(typeVariation, 50);
        } else if (isDeleting && currentLength === 0) {
            // Variation fully deleted
            isDeleting = false;
            variationIndex++;
            cycleVariations();
        }
    }

    typeBase();

    // Subtitle waving and scrolling effect
    const subtitle = document.getElementById('subtitle');
    const originalText = subtitle.textContent;
    // Duplicate the text for a seamless scroll
    subtitle.textContent = originalText + "    " + originalText;

    const subtitleSpans = [];
    // Wrap each character in a span
    const text = subtitle.textContent;
    subtitle.textContent = '';
    for (let i = 0; i < text.length; i++) {
        const span = document.createElement('span');
        span.textContent = text[i];
        subtitle.appendChild(span);
        subtitleSpans.push(span);
    }

    let offset = window.innerWidth; // Start from the right side of the screen
    let speed = 2; // Speed of horizontal scrolling
    let waveAmplitude = 10; // Vertical amplitude of wave
    let waveFrequency = 0.3; // Horizontal frequency of wave
    let rotationAmplitude = 20; // Max rotation in degrees
    let waveCounter = 0;

    function animateSubtitle() {
        // Move subtitle from right to left
        offset -= speed;
        // If we've scrolled far enough that the text is fully off to the left by half,
        // reset offset to create a looping marquee
        const fullWidth = subtitle.scrollWidth / 2;
        if (offset < -fullWidth) {
            offset = 0;
        }

        // Apply horizontal scroll transform
        subtitle.style.transform = `translateX(${offset}px)`;

        // Increment waveCounter to animate wave over time
        waveCounter += 0.02;

        // Wave effect: rotate and move letters up/down
        for (let i = 0; i < subtitleSpans.length; i++) {
            const letterSpan = subtitleSpans[i];
            // Use offset and index to create a wave pattern
            // Add waveCounter to animate continuous wave motion
            const wave = Math.sin(waveCounter + i * waveFrequency);
            const y = wave * waveAmplitude;
            const rotate = wave * rotationAmplitude;

            letterSpan.style.transform = `translateY(${y}px) rotate(${rotate}deg)`;
        }

        requestAnimationFrame(animateSubtitle);
    }

    requestAnimationFrame(animateSubtitle);
});
