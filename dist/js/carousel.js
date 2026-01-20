document.addEventListener('DOMContentLoaded', function () {
    function initCarousel(gridSelector, leftButtonSelector, rightButtonSelector) {
        const grid = document.querySelector(gridSelector);
        const leftButton = document.querySelector(leftButtonSelector);
        const rightButton = document.querySelector(rightButtonSelector);

        if (!grid || !leftButton || !rightButton) return;

        const card = grid.querySelector('.game-card, .subscription, .game-entry');
        if (!card) return;

        const cardWidth = card.offsetWidth;
        const gap = parseInt(window.getComputedStyle(grid).gap) || 20;
        const scrollAmount = cardWidth + gap;

        leftButton.addEventListener('click', () => {
            grid.scrollBy({
                left: -scrollAmount,
            });
        });

        rightButton.addEventListener('click', () => {
            grid.scrollBy({
                left: scrollAmount,
            });
        });
    }

    initCarousel('.currency__grid', '.main-currency__container .left__button', '.main-currency__container .right__button');
    initCarousel('.games__grid', '.main-games__container .left__button', '.main-games__container .right__button');
    initCarousel('.subscriptions__grid', '.main-subscriptions__container .left__button', '.main-subscriptions__container .right__button');
});