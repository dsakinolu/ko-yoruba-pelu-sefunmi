// ===========================================================================
// Games — Memory Match + Quiz Blast
// ===========================================================================
(function () {
  const zoneMemory = document.getElementById("zone-memory");
  if (!zoneMemory) return;
  const zoneQuiz = document.getElementById("zone-quiz");

  // ---- Tabs ---------------------------------------------------------------
  document.getElementById("tab-memory").addEventListener("click", () => {
    zoneMemory.classList.add("active");
    zoneQuiz.classList.remove("active");
  });
  document.getElementById("tab-quiz").addEventListener("click", () => {
    zoneQuiz.classList.add("active");
    zoneMemory.classList.remove("active");
    if (!quizStarted) startQuiz();
  });

  // =========================================================================
  // MEMORY MATCH — 8 pairs, 16 cards
  // =========================================================================
  const grid = document.getElementById("memory-grid");
  const movesEl = document.getElementById("mem-moves");
  const pairsEl = document.getElementById("mem-pairs");
  const winBanner = document.getElementById("mem-win");
  const winText = document.getElementById("mem-win-text");

  let first = null, lock = false, moves = 0, pairsFound = 0;

  function startMemory() {
    grid.hidden = false;
    winBanner.hidden = true;
    first = null; lock = false; moves = 0; pairsFound = 0;
    movesEl.textContent = "0";
    pairsEl.textContent = "0";
    grid.innerHTML = "";

    const chosen = shuffleArr(WORDS).slice(0, 8);
    const cards = shuffleArr(
      chosen.flatMap((w, i) => [
        { pair: i, text: w.en, side: "en" },
        { pair: i, text: w.yo, side: "yo" },
      ])
    );

    cards.forEach((c, idx) => {
      const btn = document.createElement("button");
      btn.className = "mem-card";
      btn.type = "button";
      btn.dataset.pair = c.pair;
      btn.setAttribute("aria-label", "Hidden card " + (idx + 1));
      btn.innerHTML = `
        <span class="inner">
          <span class="face face-down">🌟</span>
          <span class="face face-up ${c.side === "yo" ? "yo-side" : ""}">${c.text}</span>
        </span>`;
      btn.addEventListener("click", () => flipMem(btn));
      grid.appendChild(btn);
    });
  }

  function flipMem(btn) {
    if (lock || btn.classList.contains("flipped") || btn.classList.contains("matched")) return;
    btn.classList.add("flipped");

    if (!first) { first = btn; return; }

    moves++;
    movesEl.textContent = String(moves);

    if (first.dataset.pair === btn.dataset.pair) {
      first.classList.add("matched");
      btn.classList.add("matched");
      first = null;
      pairsFound++;
      pairsEl.textContent = String(pairsFound);
      Confetti.burst(24);
      if (pairsFound === 8) setTimeout(memWin, 500);
    } else {
      lock = true;
      const a = first;
      first = null;
      setTimeout(() => {
        a.classList.remove("flipped");
        btn.classList.remove("flipped");
        lock = false;
      }, 850);
    }
  }

  function memWin() {
    grid.hidden = true;
    winBanner.hidden = false;
    const stars = moves <= 12 ? 3 : moves <= 18 ? 2 : 1;
    winText.textContent = `You matched all 8 pairs in ${moves} moves — that's ${stars} star${stars > 1 ? "s" : ""} ⭐ for you!`;
    Stars.add(stars);
    Confetti.burst(200);
  }

  document.getElementById("mem-again").addEventListener("click", startMemory);
  startMemory();

  // =========================================================================
  // QUIZ BLAST — 10 questions, 4 options
  // =========================================================================
  const quizWord = document.getElementById("quiz-word");
  const quizOpts = document.getElementById("quiz-opts");
  const quizQnum = document.getElementById("quiz-qnum");
  const quizScore = document.getElementById("quiz-score");
  const quizBox = document.getElementById("quiz-box");
  const quizDone = document.getElementById("quiz-done");

  let quizStarted = false;
  let questions = [], qIndex = 0, score = 0, answered = false;

  function startQuiz() {
    quizStarted = true;
    quizBox.hidden = false;
    quizDone.hidden = true;
    questions = shuffleArr(WORDS).slice(0, 10).map((w) => {
      const askYo = Math.random() < 0.5; // show Yorùbá, pick English — or reverse
      const wrong = shuffleArr(WORDS.filter((x) => x !== w)).slice(0, 3);
      const opts = shuffleArr([w, ...wrong]).map((x) => ({
        label: askYo ? x.en : x.yo,
        correct: x === w,
      }));
      return { prompt: askYo ? w.yo : w.en, hint: askYo ? "What does this mean?" : "How do you say it in Yorùbá?", opts };
    });
    qIndex = 0; score = 0;
    quizScore.textContent = "0";
    showQuestion();
  }

  function showQuestion() {
    answered = false;
    const q = questions[qIndex];
    quizQnum.textContent = String(qIndex + 1);
    quizWord.innerHTML = `${q.prompt}<div style="font-size:1rem; font-family:var(--font-body); font-weight:700; color:#8a8fae; margin-top:0.3rem">${q.hint}</div>`;
    quizOpts.innerHTML = "";
    q.opts.forEach((o) => {
      const b = document.createElement("button");
      b.className = "quiz-opt";
      b.type = "button";
      b.textContent = o.label;
      b.addEventListener("click", () => answer(b, o, q));
      quizOpts.appendChild(b);
    });
  }

  function answer(btn, opt, q) {
    if (answered) return;
    answered = true;
    [...quizOpts.children].forEach((b) => (b.disabled = true));
    if (opt.correct) {
      btn.classList.add("right");
      score++;
      quizScore.textContent = String(score);
      Confetti.burst(20);
    } else {
      btn.classList.add("wrong");
      [...quizOpts.children].find((b) =>
        q.opts[[...quizOpts.children].indexOf(b)].correct
      ).classList.add("right");
    }
    setTimeout(() => {
      qIndex++;
      if (qIndex < questions.length) showQuestion();
      else quizFinish();
    }, 1100);
  }

  function quizFinish() {
    quizBox.hidden = true;
    quizDone.hidden = false;
    const emoji = document.getElementById("quiz-done-emoji");
    const title = document.getElementById("quiz-done-title");
    const text = document.getElementById("quiz-done-text");
    let stars = 0;
    if (score >= 9) { emoji.textContent = "🏆"; title.textContent = "Yorùbá Champion!"; stars = 3; }
    else if (score >= 7) { emoji.textContent = "🎉"; title.textContent = "Ẹ kú oríire! Amazing!"; stars = 2; }
    else if (score >= 5) { emoji.textContent = "😄"; title.textContent = "Nice work!"; stars = 1; }
    else { emoji.textContent = "💪"; title.textContent = "Keep practicing!"; }
    text.textContent = `You scored ${score}/10` + (stars ? ` — +${stars} star${stars > 1 ? "s" : ""} ⭐` : " — flashcards will help, then come back!");
    if (stars) { Stars.add(stars); Confetti.burst(180); }
  }

  document.getElementById("quiz-again").addEventListener("click", startQuiz);
})();
