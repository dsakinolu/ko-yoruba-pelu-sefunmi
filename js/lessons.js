// ===========================================================================
// Flashcards — deck with "I know it" / "Practice again" piles
// ===========================================================================
(function () {
  const card = document.getElementById("flashcard");
  if (!card) return;

  const frontWord = document.getElementById("card-front-word");
  const backWord = document.getElementById("card-back-word");
  const progress = document.getElementById("deck-progress");
  const status = document.getElementById("deck-status");
  const zone = document.getElementById("deck-zone");

  let deck = [];
  let knownCount = 0;
  let totalThisRound = 0;
  let flipped = false;

  function startDeck(words) {
    deck = shuffleArr(words);
    totalThisRound = deck.length;
    knownCount = 0;
    showCard();
  }

  function updateProgress() {
    const done = totalThisRound - deck.length;
    progress.style.width = (totalThisRound ? (done / totalThisRound) * 100 : 0) + "%";
    status.textContent = deck.length
      ? `${deck.length} card${deck.length === 1 ? "" : "s"} to go — you've got this! 💪`
      : "";
  }

  function showCard() {
    if (!deck.length) { finishDeck(); return; }
    flipped = false;
    card.classList.remove("flipped");
    const w = deck[0];
    // Swap text after the un-flip settles so answers don't leak
    setTimeout(() => {
      frontWord.textContent = w.yo;
      backWord.textContent = w.en;
    }, flippedBefore ? 260 : 0);
    flippedBefore = true;
    updateProgress();
  }
  let flippedBefore = false;

  function finishDeck() {
    updateProgress();
    progress.style.width = "100%";
    zone.innerHTML = `
      <div class="deck-done anim-pop">
        <span class="big-emoji" style="font-size:4rem">🌟</span>
        <h3 style="font-family:var(--font-display); color:var(--indigo); font-size:1.8rem; margin-top:0.5rem">Ẹ kú oríire! Deck complete!</h3>
        <p class="section-sub">You knew ${knownCount} of ${totalThisRound} words. +1 star ⭐</p>
        <button class="btn btn-coral" id="deck-restart" type="button">Go again 🔁</button>
      </div>`;
    Stars.add(1);
    Confetti.burst(120);
    document.getElementById("deck-restart").addEventListener("click", () => location.reload());
  }

  function flip() {
    flipped = !flipped;
    card.classList.toggle("flipped", flipped);
  }

  card.addEventListener("click", flip);
  card.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") { e.preventDefault(); flip(); }
  });

  document.getElementById("know-btn").addEventListener("click", () => {
    knownCount++;
    deck.shift();
    showCard();
  });

  document.getElementById("learn-btn").addEventListener("click", () => {
    // Move the card a few places back so it comes around again soon
    const w = deck.shift();
    const pos = Math.min(3 + Math.floor(Math.random() * 3), deck.length);
    deck.splice(pos, 0, w);
    showCard();
  });

  document.getElementById("shuffle-btn").addEventListener("click", () => {
    deck = shuffleArr(deck);
    showCard();
  });

  startDeck(WORDS);
})();
