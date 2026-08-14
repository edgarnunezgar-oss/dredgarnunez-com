/* ============================================
   DR. EDGAR NÚÑEZ GARCÍA - MAIN JS
   ============================================ */

document.addEventListener('DOMContentLoaded', function() {

    // === Mobile Nav Toggle ===
    const mobileBtn = document.querySelector('.nav-mobile');
    const mobilePanel = document.querySelector('.nav-mobile-panel');

    if (mobileBtn && mobilePanel) {
        mobileBtn.addEventListener('click', function() {
            mobilePanel.classList.toggle('active');
            // Animate hamburger
            const spans = mobileBtn.querySelectorAll('span');
            if (mobilePanel.classList.contains('active')) {
                spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
            } else {
                spans[0].style.transform = '';
                spans[1].style.opacity = '';
                spans[2].style.transform = '';
            }
        });

        // Close on link click
        mobilePanel.querySelectorAll('a').forEach(function(link) {
            link.addEventListener('click', function() {
                mobilePanel.classList.remove('active');
                const spans = mobileBtn.querySelectorAll('span');
                spans[0].style.transform = '';
                spans[1].style.opacity = '';
                spans[2].style.transform = '';
            });
        });
    }

    // === Smooth Scroll for anchor links ===
    document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            const target = document.querySelector(targetId);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

    // === FAQ Accordion ===
    document.querySelectorAll('.faq-question').forEach(function(question) {
        question.addEventListener('click', function() {
            const item = this.closest('.faq-item');
            const wasActive = item.classList.contains('active');

            // Close all
            document.querySelectorAll('.faq-item').forEach(function(i) {
                i.classList.remove('active');
            });

            // Toggle current
            if (!wasActive) {
                item.classList.add('active');
            }
        });
    });

    // === Open first FAQ by default ===
    const firstFaq = document.querySelector('.faq-item');
    if (firstFaq) {
        firstFaq.classList.add('active');
    }

    // === Nav background on scroll ===
    const nav = document.querySelector('.nav');
    if (nav) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 50) {
                nav.style.background = 'rgba(255,255,255,0.98)';
                nav.style.boxShadow = '0 2px 14px rgba(0,0,0,0.06)';
            } else {
                nav.style.background = 'rgba(255,255,255,0.98)';
                nav.style.boxShadow = '0 1px 8px rgba(0,0,0,0.05)';
            }
        });
    }
});

/* === CARRUSEL DE HOSPITALES ===
   Muestra 3 logos, el del centro mas grande. Avanza solo hacia la derecha:
   el logo que estaba a la izquierda pasa al centro. Loop infinito. */
(function () {
    var track = document.getElementById('hcTrack');
    var carousel = document.getElementById('hospitalsCarousel');
    if (!track || !carousel) return;

    var LOGOS = [
        { cls: 'logo-angeles',   name: 'Hospital Ángeles' },
        { cls: 'logo-sanangel',  name: 'San Ángel Inn' },
        { cls: 'logo-punta',     name: 'Punta Médica' },
        { cls: 'logo-servicura', name: 'Servicura' },
        { cls: 'logo-star',      name: 'Star Médica' },
        { cls: 'logo-mac',       name: 'Grupo MAC' }
    ];
    var SET = LOGOS.length;
    var COPIES = 3;

    // Construye 3 copias identicas para que el loop no se note
    var html = '';
    for (var c = 0; c < COPIES; c++) {
        for (var i = 0; i < SET; i++) {
            html += '<div class="hc-item"><span class="hc-logo ' + LOGOS[i].cls + '"></span>' +
                    '<span class="sr-only">' + LOGOS[i].name + '</span></div>';
        }
    }
    track.innerHTML = html;

    // Ya hay carrusel: el respaldo de texto sobra
    var fallback = document.querySelector('.hospitals-logos-fallback');
    if (fallback) fallback.style.display = 'none';

    var items = track.querySelectorAll('.hc-item');
    var index = SET; // arrancamos en la copia de en medio

    function layout(animate) {
        if (!animate) track.style.transition = 'none';
        var slot = items[0].offsetWidth;
        var offset = (carousel.offsetWidth / 2) - (slot / 2);
        track.style.transform = 'translateX(' + (offset - index * slot) + 'px)';
        for (var i = 0; i < items.length; i++) {
            items[i].classList.toggle('is-active', i === index);
        }
        if (!animate) {
            void track.offsetWidth; // fuerza reflow
            track.style.transition = '';
        }
    }

    // Al terminar la animacion, si salimos de la copia central saltamos
    // una copia completa: el logo es identico, el brinco no se ve.
    track.addEventListener('transitionend', function (e) {
        if (e.propertyName !== 'transform') return;
        if (index < SET) { index += SET; layout(false); }
    });

    layout(false);

    var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    var timer = null;

    // Si la pestana esta en segundo plano el navegador no anima ni dispara
    // transitionend, asi que aqui volvemos a la copia central antes de avanzar.
    // Sin esto el indice se iria a negativo y el carrusel quedaria en blanco.
    function avanzar() {
        if (index <= 0) { index += SET; layout(false); }
        index--;
        layout(true);
    }
    function start() {
        if (reduce || timer) return;
        timer = setInterval(avanzar, 2800);
    }
    function stop() { clearInterval(timer); timer = null; }

    carousel.addEventListener('mouseenter', stop);
    carousel.addEventListener('mouseleave', start);
    window.addEventListener('resize', function () { layout(false); });
    document.addEventListener('visibilitychange', function () {
        if (document.hidden) { stop(); } else { start(); }
    });

    start();
})();
