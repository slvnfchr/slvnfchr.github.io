'use strict';

var cacheName = 'slvnfchr';
var root = './';
var filesToCache = ['' + root, root + 'components/application.htm', root + 'styles/index.css', root + 'styles/font/opensans-light-webfont.woff2', root + 'styles/font/fontello.woff2?62471961', root + 'scripts/webcomponents-lite.min.js'];

self.addEventListener('install', function (e) {
	e.waitUntil(caches.open(cacheName).then(function (cache) {
		return cache.addAll(filesToCache);
	}));
});

self.addEventListener('activate', function (e) {
	e.waitUntil(caches.keys().then(function (keyList) {
		return Promise.all(keyList.map(function (key) {
			if (key !== cacheName) {
				return caches.delete(key);
			}
			return key;
		}));
	}));
	return self.clients.claim();
});

self.addEventListener('fetch', function (e) {
	e.respondWith(caches.match(e.request).then(function (response) {
		var alternate = e.request.url.match(/amp\//i) ? e.request.url.replace(/amp\//i, '') : e.request;
		return response || fetch(alternate);
	}));
});