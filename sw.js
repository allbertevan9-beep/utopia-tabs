// Corrosion-based browser proxy interceptor
importScripts('https://jsdelivr.net');

const proxy = new Corrosion({
    prefix: '/proxy/',
    codec: 'base64',
    config: {
        title: 'Utopia Tabs',
        inputs: true,
        keyword: 'https://bing.com'
    }
});

self.addEventListener('fetch', (e) => {
    if (e.request.url.includes(location.origin + '/proxy/')) {
        e.respondWith(proxy.fetch(e));
    }
});
