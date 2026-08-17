# 🌟 Yorùbá Learning with Ṣèfúnmí

**Live site:** https://dsakinolu.github.io/yoruba-learning-with-sefunmi/

An interactive language-learning website that helps children and families explore the Yorùbá language through games, music, and stories. Originally built as my INFO-I 360 & AFRI-Y 202 final project at Indiana University, now fully transformed into an animated learning app.

---

## ✨ What's new in Version 2

### 🃏 Smart Flashcards *(new feature)*
The old static word grid is now an interactive deck:
- Tap-to-flip cards with a 3D flip animation (Yorùbá on the front, English on the back)
- **"I know it" / "Practice again"** sorting — missed words automatically cycle back into the deck until you learn them
- Progress bar, shuffle button, and a celebration screen when you finish the deck

### 🎮 Real Games *(new feature)*
The flip-card page became two full games built from the site's vocabulary:
- **Memory Match** — 16 face-down cards hiding 8 English–Yorùbá pairs. Move counter, match animations, and a 1–3 star rating based on how few moves you need. Every round pulls a fresh random set of words.
- **Quiz Blast** — 10 multiple-choice questions that test both directions (Yorùbá → English *and* English → Yorùbá), with live scoring and a results screen.

### ⭐ Star Rewards *(new feature)*
- Kids earn stars for completing the flashcard deck, winning Memory Match, and scoring high on Quiz Blast
- Stars are saved in the browser and displayed in the header on every page, so progress carries across visits

### 🎵 Streaming Song Videos *(rebuilt)*
- Songs now embed **SoKidzTV's official YouTube videos** — including a bonus fifth song (Counting / Kíka)
- Fast-loading design: only the thumbnail loads at first; the video streams when you press play
- Smart fallback: if the site is opened as local files, the play button opens the video directly on YouTube instead of showing an error

### 📖 Animated Stories *(upgraded)*
- All three original Yorùbá stories, now in illustrated story cards
- "✨ Show translation" reveal button with a bounce-in animation for the English version

### 🎨 Complete visual redesign *(new)*
- Bright, kid-first design: animated sky hero, spinning sun, drifting clouds, bouncing mascot, floating emoji, and wiggling cards
- Confetti bursts on every win, matched pair, and completed deck
- Chunky "pushable" buttons and playful typography (Fredoka + Nunito)
- Fully responsive for phones and tablets
- Respects the visitor's **reduced-motion** setting — all animations switch off automatically

### 🤖 Ṣèfúnmí AI *(rebuilt)*
- The site's friendly keyword chatbot, redesigned to match the new look, with new answers about flashcards, games, songs, stories, and stars

### ⚡ Under the hood
- Images optimized from ~4.8 MB to ~1.7 MB for faster loading
- No frameworks — pure HTML, CSS, and vanilla JavaScript
- 100% static: no backend, no build step, deploys anywhere

---

## 🛠️ Tech stack

HTML5 · CSS3 (custom animations, 3D transforms) · Vanilla JavaScript · localStorage · YouTube embeds

## 📁 Project structure

```
index.html        Home — animated hero and activity cards
lessons.html      Flashcard deck
games.html        Memory Match + Quiz Blast
songs.html        SoKidzTV video embeds
stories.html      Yorùbá stories with translations
about.html        Mission and credits
css/styles.css    Full design system
js/data.js        Vocabulary and song data (add new words here!)
js/app.js         Stars, confetti engine, chatbot, navigation
```

To add vocabulary, edit `js/data.js` — flashcards, Memory Match, and Quiz Blast all pick up new words automatically.

## 💛 Credits

- Songs and videos by [SoKidzTV on YouTube](https://www.youtube.com/playlist?list=PLvyWSc3Rf-4h21iMtvp2aFP9dDpeBqy0P) — ẹ ṣé púpọ̀!
- Story illustrations generated with Google Gemini
- Created by **Sefunmi Akin-Olukunle**
