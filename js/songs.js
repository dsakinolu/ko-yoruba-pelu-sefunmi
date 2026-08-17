// ===========================================================================
// Songs — lite YouTube embeds 
// ===========================================================================
(function () {
  const gridEl = document.getElementById("song-grid");
  if (!gridEl) return;

  const isLocalFile = location.protocol === "file:";

  SONGS.forEach((s, i) => {
    const watchUrl = "https://www.youtube.com/watch?v=" + s.id;
    const card = document.createElement("article");
    card.className = "song-card anim-bounce";
    card.style.animationDelay = (i * 120) + "ms";
    card.innerHTML = `
      <button class="yt-lite" type="button"
        style="background-image:url('https://i.ytimg.com/vi/${s.id}/hqdefault.jpg')"
        aria-label="Play ${s.title} video">
        <span class="play-bubble">▶</span>
      </button>
      <div class="body">
        <h3>${s.title} <span class="yo-title">· ${s.yo}</span></h3>
        <p>${s.desc}</p>
        <p style="margin-top:0.5rem"><a href="${watchUrl}" target="_blank" rel="noopener" style="font-family:var(--font-display); font-weight:600">▶ Watch on YouTube ↗</a></p>
      </div>`;
    const btn = card.querySelector(".yt-lite");
    if (isLocalFile) {
      btn.addEventListener("click", () => window.open(watchUrl, "_blank", "noopener"));
    } else {
      btn.addEventListener("click", () => {
        btn.innerHTML = `<iframe src="https://www.youtube-nocookie.com/embed/${s.id}?autoplay=1"
          title="${s.title}" referrerpolicy="strict-origin-when-cross-origin"
          allow="accelerometer; autoplay; encrypted-media; picture-in-picture"
          allowfullscreen></iframe>`;
        btn.style.cursor = "default";
      }, { once: true });
    }
    gridEl.appendChild(card);
  });
})();
