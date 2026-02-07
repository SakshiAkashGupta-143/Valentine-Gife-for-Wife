const noBtn = document.getElementById("noBtn");
const yesBtn = document.getElementById("yesBtn");
const card = document.getElementById("card");
const celebration = document.getElementById("celebration");
const heartsContainer = document.getElementById("floatingHearts");

/* ── Floating hearts background ── */
const heartEmojis = ["💖", "💕", "💘", "💝", "💗", "💓", "💞", "❤️", "🩷"];

function createHeart() {
  const heart = document.createElement("span");
  heart.classList.add("heart");
  heart.textContent = heartEmojis[Math.floor(Math.random() * heartEmojis.length)];
  heart.style.left = Math.random() * 100 + "%";
  heart.style.fontSize = (Math.random() * 18 + 14) + "px";
  heart.style.animationDuration = (Math.random() * 6 + 6) + "s";
  heart.style.animationDelay = (Math.random() * 4) + "s";
  heartsContainer.appendChild(heart);

  setTimeout(() => heart.remove(), 14000);
}

/* Spawn hearts continuously */
setInterval(createHeart, 800);
/* Initial batch */
for (let i = 0; i < 10; i++) {
  setTimeout(createHeart, i * 200);
}

/* ── No button runs away ── */
noBtn.addEventListener("mouseenter", () => {
  const x = Math.random() * 200 - 100;
  const y = Math.random() * 200 - 100;
  noBtn.style.transition = "transform 0.3s ease";
  noBtn.style.transform = `translate(${x}px, ${y}px)`;
});

/* Also handle touch for mobile */
noBtn.addEventListener("touchstart", (e) => {
  e.preventDefault();
  const x = Math.random() * 200 - 100;
  const y = Math.random() * 200 - 100;
  noBtn.style.transition = "transform 0.3s ease";
  noBtn.style.transform = `translate(${x}px, ${y}px)`;
});

/* ── Yes button: confetti celebration ── */
yesBtn.addEventListener("click", () => {
  /* Hide the question card, show celebration */
  card.classList.add("hidden");
  celebration.classList.remove("hidden");

  /* Multi-burst confetti */
  const duration = 3000;
  const end = Date.now() + duration;

  const colors = ["#ff4d6d", "#ff758f", "#d63384", "#ffc0cb", "#ff85a1", "#ff99ac"];

  (function frame() {
    confetti({
      particleCount: 4,
      angle: 60,
      spread: 55,
      origin: { x: 0 },
      colors: colors,
    });
    confetti({
      particleCount: 4,
      angle: 120,
      spread: 55,
      origin: { x: 1 },
      colors: colors,
    });

    if (Date.now() < end) {
      requestAnimationFrame(frame);
    }
  })();

  /* Extra big burst in the center */
  setTimeout(() => {
    confetti({
      particleCount: 200,
      spread: 100,
      origin: { y: 0.6 },
      colors: colors,
    });
  }, 500);
});
