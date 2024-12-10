// Typing effect configuration
const phrases = [
    "Stoic AI",
    "Stoic Agents",
    "Stoic Workers",
    "Stoic Consultants",
    "Stoic"
];

class TypingEffect {
    /**
     * Initialize the typing effect
     * @param {string} elementId - ID of the element to apply the effect to
     * @param {string[]} phrases - Array of phrases to cycle through
     * @param {number} typingSpeed - Speed of typing in milliseconds
     * @param {number} deletingSpeed - Speed of deleting in milliseconds
     */
    constructor(elementId, phrases, typingSpeed = 100, deletingSpeed = 50) {
        this.element = document.getElementById(elementId);
        this.phrases = phrases;
        this.currentPhrase = 0;
        this.isDeleting = false;
        this.typingSpeed = typingSpeed;
        this.deletingSpeed = deletingSpeed;
    }

    /**
     * Find common prefix between two strings
     * @param {string} str1 - First string
     * @param {string} str2 - Second string
     * @returns {number} Length of common prefix
     */
    findCommonPrefixLength(str1, str2) {
        let i = 0;
        while (i < str1.length && i < str2.length && str1[i] === str2[i]) {
            i++;
        }
        return i;
    }

    /**
     * Type or delete characters and schedule the next update
     */
    async type() {
        const currentText = this.element.textContent;
        const targetText = this.phrases[this.currentPhrase];
        const commonPrefixLength = this.findCommonPrefixLength(currentText, targetText);
        
        if (this.isDeleting) {
            if (currentText.length > commonPrefixLength) {
                this.element.textContent = currentText.slice(0, -1);
                setTimeout(() => this.type(), this.deletingSpeed);
            } else {
                this.isDeleting = false;
                setTimeout(() => this.type(), this.typingSpeed);
            }
        } else {
            if (currentText.length < targetText.length) {
                this.element.textContent = targetText.slice(0, currentText.length + 1);
                setTimeout(() => this.type(), this.typingSpeed);
            } else {
                if (this.currentPhrase === this.phrases.length - 1) {
                    return; // Stop at the last phrase
                }
                setTimeout(() => {
                    this.isDeleting = true;
                    this.currentPhrase = (this.currentPhrase + 1) % this.phrases.length;
                    this.type();
                }, 2000);
            }
        }
    }
}

// Initialize effects when the page loads
document.addEventListener('DOMContentLoaded', () => {
    const typingEffect = new TypingEffect('typing-text', phrases);
    typingEffect.type();

    // Form handling
    const form = document.getElementById('contact-form');
    const submitButton = document.getElementById('submit-button');
    const formStatus = document.getElementById('form-status');

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        // Show loading state
        submitButton.classList.add('loading');
        submitButton.disabled = true;
        
        try {
            console.log('Sending form data...');  // Debug log
            const formData = new FormData(form);
            
            const response = await fetch(form.action, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            });
            
            console.log('Response received:', response.status);  // Debug log
            
            if (response.ok) {
                const responseData = await response.json();
                console.log('Success:', responseData);  // Debug log
                
                formStatus.textContent = 'Thank you for your message! We will get back to you soon.';
                formStatus.className = 'success';
                form.reset();
            } else {
                const errorData = await response.text();
                console.error('Form submission error:', errorData);  // Debug log
                throw new Error(`Form submission failed: ${response.status}`);
            }
        } catch (error) {
            console.error('Error details:', error);  // Debug log
            
            // Friendly error message
            formStatus.textContent = 'Oops! Something went wrong. Please try again.';
            formStatus.className = 'error';
        } finally {
            submitButton.classList.remove('loading');
            submitButton.disabled = false;
        }
    });
});
