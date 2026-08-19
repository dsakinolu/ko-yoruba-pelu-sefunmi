# 🌟 Kọ́ Yorùbá pẹ̀lú Ṣèfúnmí

*Learn Yorùbá with Ṣèfúnmí — games, songs, and stories for kids.*

**Live site:** https://dsakinolu.github.io/ko-yoruba-pelu-sefunmi/
📲 **Installable:** open the site on your phone and choose "Add to Home Screen."

An interactive language-learning website that helps children and families
explore the Yorùbá language through flashcards, games, music, and stories.

Originally built as *Yorùbá Learning with Ṣèfúnmí*, a final project for
INFO-I 360 & AFRI-Y 202 at Indiana University, and since rebuilt into a full
animated learning app.

---

## ✨ Features

### 🃏 Smart Flashcards
Tap-to-flip cards with 3D animation, an "I know it / Practice again" system
that recycles missed words, a progress bar, and a celebration on completion.

### 🎮 Games
- **Memory Match** — 16 cards, 8 English–Yorùbá pairs, move counter, 1–3 stars
- **Quiz Blast** — 10 questions testing both directions, with live scoring

### ⭐ Star Rewards
Earn stars across every activity; totals are saved and shown in the header.

### 🎵 Songs
Official SoKidzTV music videos embedded from YouTube, loading thumbnail-first
for speed, with direct links as a fallback.

### 📖 Stories
Three illustrated Yorùbá stories with tap-to-reveal English translations.

### 📲 Installable app (PWA)
Home-screen icon from the Kọ́ Yorùbá emblem, fullscreen launch, and offline
support via a service worker — everything except the song videos works with
no internet.

### 🤖 Ṣèfúnmí AI
A friendly keyword chat guide to the site's activities.

## 🛠️ Stack

HTML5 · CSS3 (custom animations, 3D transforms) · Vanilla JavaScript ·
localStorage · Service worker + Web App Manifest. No frameworks, no build step.

```
index.html        Home
lessons.html      Flashcard deck
games.html        Memory Match + Quiz Blast
songs.html        SoKidzTV videos
stories.html      Stories with translations
about.html        Mission and credits
js/data.js        Vocabulary and song data — add new words here
manifest.json     PWA metadata
sw.js             Offline caching
```

To add vocabulary, edit `js/data.js` — flashcards, Memory Match, and Quiz
Blast all pick up new words automatically.

## 💛 Credits

- Songs by [SoKidzTV on YouTube](https://www.youtube.com/playlist?list=PLvyWSc3Rf-4h21iMtvp2aFP9dDpeBqy0P) — ẹ ṣé púpọ̀!
- Story illustrations generated with Google Gemini
- Created by **Sefunmi Akin-Olukunle** · [Portfolio](https://dsakinolu.github.io/portfolio/)
