(function () {
    let handlers = [
        { className: 'header__loupe', handler: focusSearch },
        { className: 'header__menu', handler: showMenu },
        { className: 'navigation__close', handler: closeMenu }
    ];

    const swipeLimit = 40;

    const input = document.querySelector('.header__input');
    const nav = document.querySelector('.navigation');

    document.addEventListener('DOMContentLoaded', function () {

        document.addEventListener('click', function (event) {
            let classes = event.target.classList;

            /* eslint-disable-next-line max-nested-callbacks */
            handlers.forEach(handler => {
                if (classes.contains(handler.className)) {
                    handler.handler();
                }
            });
        });

        document.addEventListener('touchstart', handleTouchStart, false);
        document.addEventListener('touchend', handleTouchEnd, false);
        input.addEventListener('blur', () => {
            input.classList.remove('header__input_visible');
        });
    });

    function focusSearch() {
        input.classList.add('header__input_visible');
        input.focus();
    }

    function showMenu() {
        nav.classList.add('navigation_visible');
        document.body.classList.add('stop-scrolling');
    }

    function closeMenu() {
        nav.classList.remove('navigation_visible');
        document.body.classList.remove('stop-scrolling');
    }

    let xDown = null;
    let yDown = null;

    function handleTouchStart(evt) {
        xDown = evt.touches[0].clientX;
        yDown = evt.touches[0].clientY;

        const clientWidth = document.documentElement.clientWidth;
        const swipeWidthArea = Math.floor(clientWidth / 4);

        let rightLimit = clientWidth - swipeWidthArea;
        if (xDown < rightLimit) {
            xDown = null;
            yDown = null;
        }
    }

    function handleTouchEnd(evt) {
        if (!xDown || !yDown) {
            return;
        }

        if (evt.changedTouches.length < 0) {
            return;
        }

        let touch = evt.changedTouches[0];
        let xUp = touch.clientX;
        let yUp = touch.clientY;

        let xDiff = xDown - xUp;
        let yDiff = yDown - yUp;

        if (Math.abs(xDiff) > Math.abs(yDiff)) {
            if (xDiff > swipeLimit) {
                showMenu();
            } else {
                closeMenu();
            }
        }
        xDown = null;
        yDown = null;
    }

}());
