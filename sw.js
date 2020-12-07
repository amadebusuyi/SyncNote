const staticSyncNote = "sync-note-365-dev-v4"
const assets = [
  "/",
  "/index.html",
  "/app.html",
  "style.css",
  "script.js",
  "empty.png",
  "icon.png",
  "icon.png128",
  "icon.png144",
  "icon.png152",
  "icon.png196"
]

self.addEventListener("install", installEvent => {
  installEvent.waitUntil(
    caches.open(staticSyncNote).then(cache => {
      cache.addAll(assets)
    })
  )
})

self.addEventListener("fetch", fetchEvent => {
  fetchEvent.respondWith(
    caches.match(fetchEvent.request).then(res => {
      return res || fetch(fetchEvent.request)
    })
  )
})
