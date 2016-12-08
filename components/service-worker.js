'use strict';

var cacheName = 'slvnfchr';
var root = '../';
var filesToCache = ['' + root, root + 'components/application.htm', root + 'styles/index.css'];

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
		return response || fetch(e.request);
	}));
});