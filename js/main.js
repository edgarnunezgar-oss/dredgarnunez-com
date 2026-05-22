/* ============================================
   DR. EDGAR NÚÑEZ GARCÍA — MAIN JS
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
                nav.style.background = 'rgba(15,30,45,0.98)';
            } else {
                nav.style.background = 'rgba(15,30,45,0.95)';
            }
        });
    }
});
