// Target: Dec 31, 2025 at 11:29 PM
const targetDate = new Date("December 31, 2025 23:29:00").getTime();

const affirmations = [
    "Abundance & Prosperity 💰",
    "Good Health & Vitality 🏃‍♂️",
    "Endless Joy & Laughter 😂",
    "Success in Every Step 🚀",
    "Peace & Harmony 🕊️",
    "New Adventures Await 🌍",
    "Infinite Love & Kindness ❤️",
    "Dreams Coming True ✨",
    "Strength & Resilience 💪",
    "Creativity & Magic 🎨"
];

function showRandomAffirmation() {
    const textElement = document.getElementById("affirmation");
    if (!textElement) return;

    const randomIndex = Math.floor(Math.random() * affirmations.length);
    
    // Reset animation
    textElement.classList.remove("fade-in");
    void textElement.offsetWidth; // Trigger reflow
    
    textElement.innerText = affirmations[randomIndex];
    textElement.classList.add("fade-in");
}

function updateCountdown() {
    const now = new Date().getTime();
    const distance = targetDate - now;

    // Time calculations
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    // Display the result
    document.getElementById("hours").innerText = hours.toString().padStart(2, '0');
    document.getElementById("minutes").innerText = minutes.toString().padStart(2, '0');
    document.getElementById("seconds").innerText = seconds.toString().padStart(2, '0');

    // If the countdown is finished
    if (distance < 0) {
        clearInterval(timerInterval);
        document.getElementById("countdown-box").classList.add("hidden");
        document.getElementById("headline").classList.add("hidden");
        document.getElementById("wish-message").classList.remove("hidden");
        
        launchFireworks();
    }
}

function launchFireworks() {
    showRandomAffirmation();
    
    var duration = 15 * 1000; // 15 seconds
    var animationEnd = Date.now() + duration;
    // High zIndex ensures fireworks are ABOVE the white box
    var defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 999 };

    function randomInRange(min, max) {
        return Math.random() * (max - min) + min;
    }

    var interval = setInterval(function() {
        var timeLeft = animationEnd - Date.now();

        if (timeLeft <= 0) {
            return clearInterval(interval);
        }

        // Change affirmation text every 3 seconds
        if (Math.floor(timeLeft / 1000) % 3 === 0 && timeLeft > 500) {
            showRandomAffirmation();
        }

        var particleCount = 50 * (timeLeft / duration);
        confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } }));
        confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } }));
    }, 250);
}

function manualFirework() {
    showRandomAffirmation();
    confetti({
        particleCount: 150,
        spread: 70,
        origin: { y: 0.6 },
        zIndex: 1000
    });
}

const timerInterval = setInterval(updateCountdown, 1000);
updateCountdown();