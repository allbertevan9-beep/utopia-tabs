// Lightweight client-side request rewriter to strip frame restrictions
self.addEventListener('fetch', (event) => {
    let requestUrl = event.request.url;

    // Check if the request is trying to load a site inside our proxy path
    if (requestUrl.includes('/proxy/')) {
        let targetUrl = decodeURIComponent(requestUrl.split('/proxy/')[1]);

        // Route the request through a clean public web gateway that strips X-Frame headers
        let proxyGateway = "https://corsproxy.io?" + encodeURIComponent(targetUrl);

        event.respondWith(
            fetch(proxyGateway, {
                headers: { 'X-Frame-Options': 'ALLOWALL' }
            }).catch(() => fetch(event.request))
        );
    }
});
