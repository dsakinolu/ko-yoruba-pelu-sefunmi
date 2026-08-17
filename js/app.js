// ===========================================================================
// Shared app logic: nav, stars, confetti, Ṣèfúnmí AI
// ===========================================================================

// ---- Mobile nav -----------------------------------------------------------
const navToggle = document.getElementById("nav-toggle");
const siteNav = document.getElementById("site-nav");
if (navToggle && siteNav) {
  navToggle.addEventListener("click", () => {
    const open = siteNav.classList.toggle("open");
    navToggle.setAttribute("aria-expanded", String(open));
  });
}

// ---- Star system ----------------------------------------------------------
const Stars = {
  key: "yl_stars",
  get() { return parseInt(localStorage.getItem(this.key) || "0", 10); },
  add(n) {
    const total = this.get() + n;
    localStorage.setItem(this.key, String(total));
    this.render(true);
    return total;
  },
  render(pop) {
    const el = document.getElementById("star-count");
    const chip = document.getElementById("star-chip");
    if (!el) return;
    el.textContent = this.get();
    if (pop && chip) {
      chip.classList.remove("earn");
      void chip.offsetWidth; // restart animation
      chip.classList.add("earn");
    }
  },
};
Stars.render(false);

// ---- Confetti engine (tiny, dependency-free) ------------------------------
const Confetti = (() => {
  const canvas = document.getElementById("confetti-canvas");
  if (!canvas) return { burst() {} };
  const ctx = canvas.getContext("2d");
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  let pieces = [];
  let running = false;

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener("resize", resize);

  const COLORS = ["#ffc93c", "#ff7b54", "#3fae74", "#9b6fde", "#4fa8e8", "#2d3e8b"];

  function tick() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    pieces.forEach((p) => {
      p.vy += 0.12;
      p.x += p.vx;
      p.y += p.vy;
      p.rot += p.vr;
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rot);
      ctx.fillStyle = p.color;
      ctx.fillRect(-p.s / 2, -p.s / 2, p.s, p.s * 0.6);
      ctx.restore();
    });
    pieces = pieces.filter((p) => p.y < canvas.height + 30);
    if (pieces.length) {
      requestAnimationFrame(tick);
    } else {
      running = false;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
  }

  function burst(count) {
    if (reduce) return;
    const n = count || 140;
    for (let i = 0; i < n; i++) {
      pieces.push({
        x: canvas.width / 2 + (Math.random() - 0.5) * canvas.width * 0.5,
        y: -20 - Math.random() * 80,
        vx: (Math.random() - 0.5) * 3.4,
        vy: 1 + Math.random() * 2.5,
        vr: (Math.random() - 0.5) * 0.25,
        rot: Math.random() * Math.PI,
        s: 7 + Math.random() * 8,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
      });
    }
    if (!running) { running = true; requestAnimationFrame(tick); }
  }

  return { burst };
})();

// ---- Ṣèfúnmí AI -----------------------------------------------------------
const RESPONSES = [
  { keywords: ["hello", "hi", "hey", "ekaaro", "ẹkáàrọ̀", "kaabo"],
    reply: "Ẹ káàbọ̀! 👋 Hello! Ask me about flashcards, games, songs, or stories!" },
  { keywords: ["song", "songs", "sing", "music", "video"],
    reply: "🎵 Check out the Songs page — real SoKidzTV music videos you can sing and dance to!" },
  { keywords: ["game", "games", "play", "match", "quiz", "memory"],
    reply: "🎮 The Games page has Memory Match and Quiz Blast. Win to earn stars ⭐!" },
  { keywords: ["card", "cards", "flashcard", "words", "lesson", "learn"],
    reply: "🃏 Try the Flashcards page — tap to flip and learn Yorùbá words one at a time!" },
  { keywords: ["story", "stories", "read", "itan", "ìtàn"],
    reply: "📖 Let's read together! Visit the Stories page for fun tales in Yorùbá — with hidden translations." },
  { keywords: ["star", "stars", "score", "points"],
    reply: "⭐ You earn stars by finishing the flashcard deck, winning Memory Match, and scoring big on Quiz Blast!" },
  { keywords: ["yoruba", "yorùbá", "language", "nigeria"],
    reply: "Yorùbá is spoken by millions of people in Nigeria and around the world! 🌍 Every page here helps you learn it." },
  { keywords: ["thank", "thanks", "ese", "ẹ ṣé", "bye"],
    reply: "Ẹ ṣé! 💛 Thanks for learning with me — come back soon!" },
];

function botReply(text) {
  const q = text.toLowerCase();
  for (const r of RESPONSES) {
    if (r.keywords.some((k) => q.includes(k))) return r.reply;
  }
  return "Ooh, good question! Try asking me about flashcards, games, songs, stories, or stars ⭐";
}

const launcher = document.getElementById("chat-launcher");
const chatbot = document.getElementById("chatbot");
const chatClose = document.getElementById("chat-close");
const chatBody = document.getElementById("chat-body");
const chatForm = document.getElementById("chat-form");
const chatInput = document.getElementById("chat-input");

function addMsg(text, who) {
  const div = document.createElement("div");
  div.className = "chat-msg " + who;
  div.textContent = text;
  chatBody.appendChild(div);
  chatBody.scrollTop = chatBody.scrollHeight;
}

if (launcher && chatbot) {
  let greeted = false;
  launcher.addEventListener("click", () => {
    chatbot.classList.toggle("open");
    if (chatbot.classList.contains("open") && !greeted) {
      addMsg("👋 Hi! I'm Ṣèfúnmí AI. Ask me about flashcards, games, songs, or stories!", "bot");
      greeted = true;
      chatInput.focus();
    }
  });
  chatClose.addEventListener("click", () => chatbot.classList.remove("open"));
  chatForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const text = chatInput.value.trim();
    if (!text) return;
    addMsg(text, "user");
    chatInput.value = "";
    setTimeout(() => addMsg(botReply(text), "bot"), 380);
  });
}

// ---- Shared helper --------------------------------------------------------
function shuffleArr(arr) {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}
