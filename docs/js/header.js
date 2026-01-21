
document.addEventListener('DOMContentLoaded', function () {
    const themeToggle = document.querySelector('.theme-toggle');
    const html = document.documentElement;

    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        html.setAttribute('data-theme', savedTheme);
        updateImages(savedTheme);
    }

    if (themeToggle) {
        themeToggle.addEventListener('click', function () {
            const currentTheme = html.getAttribute('data-theme');
            const newTheme = currentTheme === 'light' ? 'dark' : 'light';

            html.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            updateImages(newTheme);
        });
    }

    function updateImages(theme) {
        const images = document.querySelectorAll('img[data-dark][data-light]');
        images.forEach(img => {
            img.src = theme === 'light' ? img.getAttribute('data-light') : img.getAttribute('data-dark');
        });
    }
});

document.addEventListener('DOMContentLoaded', function () {
    const burgerMenu = document.querySelector('.burger-menu');
    const headerNav = document.querySelector('.header-nav');

    if (burgerMenu && headerNav) {
        burgerMenu.addEventListener('click', function () {
            headerNav.classList.toggle('active');
            burgerMenu.classList.toggle('active');
        });

        const navItems = headerNav.querySelectorAll('.header-nav__item');
        navItems.forEach(item => {
            item.addEventListener('click', () => {
                headerNav.classList.remove('active');
                burgerMenu.classList.remove('active');
            });
        });

        document.addEventListener('click', function (event) {
            if (!event.target.closest('.header-nav') && !event.target.closest('.burger-menu')) {
                headerNav.classList.remove('active');
                burgerMenu.classList.remove('active');
            }
        });
    }
});

document.querySelector('.brand').addEventListener('click', function () {
    window.location.href = 'index.html';
});
