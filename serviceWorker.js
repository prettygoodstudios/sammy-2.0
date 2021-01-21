const cacheName = 'v4';
const cacheAssets = ['./index.html', './dist/index.js'];

const imageAssets = [
    "1259d3325af3d0f488508125fee8c7be.svg",
    "15e9908b7c64edc3f70b9c916b248cf8.svg",
    "1616d863befcf1c62d2009cda16e9373.svg",
    "30bdb205cbec84bf901c2428a5c5a27a.svg",
    "31c37f9b2a99eab59c70d49ed1349afc.svg",
    "457ca02408f9922b22afc522290a4047.svg",
    "4d92a69e3c94861cf62665e083a058fe.svg",
    "609cdf72ac025ade992d24a30c221001.svg",
    "61b16eae207f992db904ddb3301110af.svg",
    "66e7d0e03b712dae7d5ca369072a9a77.svg",
    "6723a5d4e25c92a4664b3b5c465f8a8a.svg",
    "77c3c4d3c51fdf13c15055e28afd9bad.svg",
    "7bbbcb9a6c678a8ad051fd6ad35278e6.svg",
    "861c5630edd324cbe3a54080266a501d.svg",
    "9352c4336d3cb7d3898dc3e272143caf.svg",
    "99aeb48ee0d38225c421fa5bc5f9da2c.svg",
    "9b096ef1d5a93a624d9ff84f383bfec9.svg",
    "9c5304a3f3c0079d7d4132a40a554f67.svg",
    "9dcbc0b6e9e45911c1efd725d6a35c12.svg",
    "9e30811989ac04b447425f6e15bd69af.svg",
    "9f21f2736d2d80369770b461bf57ab98.svg",
    "a7966d5285aacdf37b6d9853ecf73812.svg",
    "ba1a00a75bcfac5ed22b3faf180c7645.svg",
    "bf1850c0e7b9464f45c2f3e89bf3be41.svg",
    "c9c5f13659fd2e044d850985d25667d2.svg",
    "d1001da21c53e984fa85f946af1a0374.svg",
    "d19786695efe996f6afa00088bce8ab7.svg",       
    "d711fc4db457f60dd039c9c2d00d2aeb.svg",
    "ed1d54b3fea059591e128baee192bf71.svg"
];

self.addEventListener('install', (e) => {
    e.waitUntil(
        caches
            .open(cacheName)
            .then(cache => {
                console.log(cache);
                cache.addAll([cacheAssets, ...imageAssets]).then((data) => {
                    console.log(data);
                }).catch((e) => {
                    console.log(e);
                })
            })
            .catch(error => {
                console.log(error);
            })
    );
});


self.addEventListener('activate', (e) => {
    e.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cache => {
                    if(cache !== cacheName){
                        return caches.delete(cache);
                    }
                })
            );
        })
    );
});

self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request).then((response) => response || fetch(event.request))
        .catch(() => {
            return caches.match('index.html');
        })
    );
});