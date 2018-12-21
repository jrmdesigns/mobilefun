const cacheName = 'v1';

const cacheAssets = [
    'index.html',
    'choice.html',
    'hangman.html',
    'rps.html',
    'css/style.css',
    'css/keyboard.css',
    'css/robo.ttf',
    'js/hangman.js',
    'js/rps.js',
    'js/sw_register.js',
    'js/listofwords.txt',
    'images/app_icon.png',
    'images/home.svg',
    'images/back.svg',
    'images/play.svg',
    'images/repeat.svg',
    'images/hangman.svg',
    'images/rps.svg',
    'images/stone.svg',
    'images/contract.svg',
    'images/scissors.svg',
    'images/gallow_00.png',
    'images/gallow_01.png',
    'images/gallow_02.png',
    'images/gallow_03.png',
    'images/gallow_04.png',
    'images/gallow_05.png',
    'images/gallow_06.png',
    'sounds/chocking.wav',
    'sounds/yeah.wav'
];



self.addEventListener('install', event => {
    console.log('Service Worker: Installed');

    event.waitUntil(
        caches
        .open(cacheName)
        .then(cache => {
            console.log('Service Worker: Caching Files');
            cache.addAll(cacheAssets);
        })
        .then(() => self.skipWaiting())
    )
})

self.addEventListener('activate', event => {
    console.log('Service Worker: Activated');
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cache => {
                    if (cache !== cacheName) {
                        console.log('Service Worker: Clearing Old Cache');
                        return caches.deleted(cache);
                    }
                })
            );
        })
    );
});

self.addEventListener('fetch', event => {
        console.log('Service Worker: Fetching');
        event.respondWith(
            fetch(event.request).catch(() => caches.match(event.request))
        );
    });