document.addEventListener('DOMContentLoaded', function() {

    const formContainer = document.querySelector('.signup-container');
    if (formContainer) {
        formContainer.style.transform = 'translateY(30px)';
        formContainer.style.opacity = '0';
        
        setTimeout(() => {
            formContainer.style.transition = 'transform 1s ease, opacity 1s ease';
            formContainer.style.transform = 'translateY(0)';
            formContainer.style.opacity = '1';
        }, 300);
    }


    const buttons = document.querySelectorAll('.signup-btn, .update-btn, .logout-btn');
    
    buttons.forEach(btn => {
        btn.addEventListener('click', function(e) {

            const ripple = document.createElement('span');
            ripple.classList.add('ripple');
            

            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size/2;
            const y = e.clientY - rect.top - size/2;
            
            ripple.style.width = ripple.style.height = `${size}px`;
            ripple.style.left = `${x}px`;
            ripple.style.top = `${y}px`;
            ripple.style.background = 'radial-gradient(circle, rgba(108,118,192,0.6) 0%, transparent 70%)';
            
            this.appendChild(ripple);
            

            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
});
