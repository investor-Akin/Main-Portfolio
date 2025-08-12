document.addEventListener('DOMContentLoaded', function() {
    const toggleBtn = document.querySelector('.navbar__toggle');
    const navMenu = document.querySelector('.navbar__menu');
    const links = document.querySelectorAll('.navbar__links a');

    toggleBtn.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        toggleBtn.classList.toggle('active');
    });

    links.forEach(link => {
        link.addEventListener('click', function(e) {
            links.forEach(item => item.classList.remove('active'));
            this.classList.add('active');
            if (navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                toggleBtn.classList.remove('active');
            }
        });
    });

    document.addEventListener('click', function(e) {
        if (!e.target.closest('.navbar') && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            toggleBtn.classList.remove('active');
        }
    });
});