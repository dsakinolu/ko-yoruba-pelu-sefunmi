// ===========================================================================
// Stories — reveal translation buttons
// ===========================================================================
document.querySelectorAll(".reveal-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    const target = document.getElementById(btn.dataset.target);
    const showing = target.classList.toggle("show");
    btn.textContent = showing ? "🙈 Hide translation" : "✨ Show translation";
    if (showing) Confetti.burst(16);
  });
});
