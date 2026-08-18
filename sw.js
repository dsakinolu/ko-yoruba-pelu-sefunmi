// Kọ́ Yorùbá pẹ̀lú Ṣèfúnmí — offline-first service worker
const CACHE = "ko-yoruba-v1";
const ASSETS = [
  "./", "./index.html", "./lessons.html", "./games.html",
  "./songs.html", "./stories.html", "./about.html",
  "./css/styles.css",
  "./js/data.js", "./js/app.js", "./js/lessons.js",
  "./js/games.js", "./js/songs.js", "./js/stories.js",
  "./images/icon-192.png", "./images/icon-512.png",
  "./images/sefunmi_avatar.PNG", "./images/sefunmi_friend.jpeg",
  "./images/sefunmi_school.jpeg", "./images/turtle_goat.jpeg",
  "./manifest.json",
];

self.addEventListener("install", (e) => {
  e.waitUntil(
    caches.open(CACHE)
      .then((c) => Promise.all(ASSETS.map((a) => c.add(a).catch(() => {}))))
      .then(() => self.skipWaiting())
  );
});
self.addEventListener("activate", (e) => {
  e.waitUntil(caches.keys().then((keys) =>
    Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k)))
  ).then(() => self.clients.claim()));
});
self.addEventListener("fetch", (e) => {
  if (e.request.method !== "GET") return;
  // Never cache YouTube; songs need the live network
  if (e.request.url.includes("youtube")) return;
  e.respondWith(
    caches.match(e.request, { ignoreSearch: true }).then((hit) =>
      hit || fetch(e.request).then((res) => {
        const copy = res.clone();
        if (new URL(e.request.url).origin === location.origin) {
          caches.open(CACHE).then((c) => c.put(e.request, copy)).catch(() => {});
        }
        return res;
      }).catch(() => caches.match("./index.html"))
    )
  );
});
