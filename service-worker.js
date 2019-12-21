var config = {
    apiKey: "AIzaSyCZi3hYSq6X4oe7iyXUwwQFC-TyPnHptJw",
    authDomain: "project-2-super-awesome.firebaseapp.com",
    databaseURL: "https://project-2-super-awesome.firebaseio.com",
    projectId: "project-2-super-awesome",
    storageBucket: "project-2-super-awesome.appspot.com",
    messagingSenderId: "272659106499",
    appId: "1:272659106499:web:2f1567247609fd67b6f076",
    measurementId: "G-VG9DZM1RZL"
};

importScripts("https://www.gstatic.com/firebasejs/5.9.0/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/5.9.0/firebase-auth.js");

if (!firebase.apps.length) {
    firebase.initializeApp(config);
}

const getIdToken = () => {
    return new Promise((resolve, reject) => {
        const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
            unsubscribe();
            if (user) {
                user.getIdToken().then((idToken) => {
                    resolve(idToken);
                }, (error) => {
                    resolve(null);
                });
            } else {
                resolve(null);
            }
        });
    });
};

const getOriginFromUrl = (url) => {
    const pathArray = url.split('/');
    const protocol = pathArray[0];
    const host = pathArray[2];
    return protocol + '//' + host;
};

self.addEventListener('fetch', (event) => {
    const requestProcessor = (idToken) => {
        let req = event.request;
        if (self.location.origin == getOriginFromUrl(event.request.url) &&
            (self.location.protocol == 'https:' ||
                self.location.hostname == 'localhost') &&
            idToken) {
            const headers = new Headers();
            for (let entry of req.headers.entries()) {
                headers.append(entry[0], entry[1]);
            }
            headers.append('Authorization', 'Bearer ' + idToken);
            try {
                req = new Request(req.url, {
                    method: req.method,
                    headers: headers,
                    mode: 'same-origin',
                    credentials: req.credentials,
                    cache: req.cache,
                    redirect: req.redirect,
                    referrer: req.referrer,
                    body: req.body,
                    bodyUsed: req.bodyUsed,
                    context: req.context
                });
            } catch (e) {
            }
        }

        return fetch(req);
    };

    event.respondWith(getIdToken().then(requestProcessor, requestProcessor));
});


self.addEventListener('activate', event => {
    event.waitUntil(clients.claim());
});