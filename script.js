document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('contactForm');
    const formStatus = document.getElementById('formStatus');

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const formData = new FormData(form);
        
        fetch('https://formspree.io/f/mqakobad', {
            method: 'POST',
            body: formData,
            headers: {
                'Accept': 'application/json'
            }
        })
        .then(response => {
            if (response.ok) {
                formStatus.innerHTML = '<p style="color: #4d9eff;">Thanks for your submission! We will reach out soon!</p>';
                form.reset();
            } else {
                formStatus.innerHTML = '<p style="color: #ff46b3;">Oops! There was a problem submitting your form</p>';
            }
        })
        .catch(error => {
            formStatus.innerHTML = '<p style="color: #ff46b3;">Oops! There was a problem submitting your form</p>';
        });
    });
});
