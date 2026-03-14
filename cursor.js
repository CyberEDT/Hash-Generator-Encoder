/**
 * CyberEDT Cursor Effect
 * Lightweight (<5kb) | 60fps via requestAnimationFrame | No dependencies
 */
(function () {
    // Disable on mobile
    if (window.innerWidth < 768) return;

    const dot  = document.querySelector('.cyber-cursor');
    const ring = document.querySelector('.cyber-cursor-ring');
    if (!dot || !ring) return;

    let mouseX = 0, mouseY = 0;
    let ringX  = 0, ringY  = 0;

    // Track raw mouse position
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    // Hide/show on page leave/enter
    document.addEventListener('mouseleave', () => {
        dot.style.opacity  = '0';
        ring.style.opacity = '0';
    });
    document.addEventListener('mouseenter', () => {
        dot.style.opacity  = '1';
        ring.style.opacity = '1';
    });

    // Hover expansion on interactive elements
    const interactiveSelectors = 'a, button, input, textarea, select, .cursor-target, label[for]';
    document.addEventListener('mouseover', (e) => {
        if (e.target.matches(interactiveSelectors) || e.target.closest(interactiveSelectors)) {
            ring.classList.add('cyber-cursor-ring--expand');
        }
    });
    document.addEventListener('mouseout', (e) => {
        if (e.target.matches(interactiveSelectors) || e.target.closest(interactiveSelectors)) {
            ring.classList.remove('cyber-cursor-ring--expand');
        }
    });

    // rAF loop: dot follows instantly, ring lags slightly
    function animate() {
        // Dot: instant
        dot.style.transform = `translate(${mouseX}px, ${mouseY}px)`;

        // Ring: smooth lerp (8% per frame ≈ nice lag)
        ringX += (mouseX - ringX) * 0.08;
        ringY += (mouseY - ringY) * 0.08;
        ring.style.transform = `translate(${ringX}px, ${ringY}px)`;

        requestAnimationFrame(animate);
    }

    animate();
})();
