document.addEventListener('DOMContentLoaded', function() {
    // Add floating animation to form container
    const formContainer = document.querySelector('.signup-container');
    formContainer.style.transform = 'translateY(30px)';
    formContainer.style.opacity = '0';
    
    setTimeout(() => {
        formContainer.style.transition = 'transform 1s ease, opacity 1s ease';
        formContainer.style.transform = 'translateY(0)';
        formContainer.style.opacity = '1';
    }, 300);

    // Add input focus effects
    const inputs = document.querySelectorAll('.form-group input');
    
    inputs.forEach(input => {
        // Set initial state for labels
        if (input.value !== '') {
            input.nextElementSibling.style.transform = 'translateY(-25px)';
            input.nextElementSibling.style.fontSize = '0.9rem';
            input.nextElementSibling.style.color = '#d81b60';
        }
        
        input.addEventListener('focus', function() {
            this.parentElement.classList.add('active');
        });
        
        input.addEventListener('blur', function() {
            if (this.value === '') {
                this.parentElement.classList.remove('active');
            }
        });
    });

    // Add button ripple effect
    const signupBtn = document.querySelector('.signup-btn');
    
    signupBtn.addEventListener('click', function(e) {
        // Create ripple element
        const ripple = document.createElement('span');
        ripple.classList.add('ripple');
        
        // Position ripple
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size/2;
        const y = e.clientY - rect.top - size/2;
        
        ripple.style.width = ripple.style.height = `${size}px`;
        ripple.style.left = `${x}px`;
        ripple.style.top = `${y}px`;
        ripple.style.background = 'radial-gradient(circle, rgba(216,27,96,0.6) 0%, transparent 70%)';
        
        this.appendChild(ripple);
        
        // Remove ripple after animation
        setTimeout(() => {
            ripple.remove();
        }, 600);
    });

    // Add star twinkling effect
    setInterval(() => {
        const stars = document.querySelectorAll('.star-layer');
        stars.forEach(star => {
            const randomOpacity = 0.3 + Math.random() * 0.7;
            star.style.opacity = randomOpacity;
        });
    }, 1000);
});