document.addEventListener('DOMContentLoaded', function() {
    const navbar = document.querySelector('.navbar');
    const toggleBtn = document.querySelector('.navbar__toggle');
    const navMenu = document.querySelector('.navbar__menu');
    const links = document.querySelectorAll('.navbar__links a');

    // Mobile Menu Toggle
    toggleBtn.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        toggleBtn.classList.toggle('active');
    });

    // Sticky Navbar on Scroll
    window.addEventListener('scroll', () => {
        navbar.classList.toggle('sticky', window.scrollY > 0);
    });

    // Active Link Highlighting
    links.forEach(link => {
        link.addEventListener('click', (e) => {
            links.forEach(item => item.classList.remove('active'));
            e.target.classList.add('active');
            
            // Close mobile menu if open
            if (navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                toggleBtn.classList.remove('active');
            }
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!navbar.contains(e.target) && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            toggleBtn.classList.remove('active');
        }
    });
});