const slides = document.querySelectorAll('.slide');
const progressBar = document.getElementById('progressBar');
const totalSlides = slides.length;
let currentSlide = 0;

function showSlide(index) {
    if (index < 0) {
        currentSlide = 0;
    } else if (index >= totalSlides) {
        currentSlide = totalSlides - 1;
    } else {
        currentSlide = index;
    }

    slides.forEach((slide, i) => {
        if (i === currentSlide) {
            slide.classList.add('active');
        } else {
            slide.classList.remove('active');
        }
    });

    // Update Progress Bar
    const progress = ((currentSlide + 1) / totalSlides) * 100;
    progressBar.style.width = `${progress}%`;

    // Trigger Fireworks on Last Slide
    if (currentSlide === totalSlides - 1) {
        startFireworks();
    } else {
        stopFireworks();
    }
}

function nextSlide() {
    showSlide(currentSlide + 1);
}

function prevSlide() {
    showSlide(currentSlide - 1);
}

document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight' || e.key === 'Space') {
        nextSlide();
    } else if (e.key === 'ArrowLeft') {
        prevSlide();
    }
});

// Touch Navigation Support
let touchStartX = 0;
let touchEndX = 0;

document.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
}, false);

document.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
}, false);

function handleSwipe() {
    const swipeThreshold = 50; // Minimum distance for a swipe
    if (touchEndX < touchStartX - swipeThreshold) {
        nextSlide(); // Swiped Left -> Next
    }
    if (touchEndX > touchStartX + swipeThreshold) {
        prevSlide(); // Swiped Right -> Prev
    }
}

// Initialize
showSlide(0);
