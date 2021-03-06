const cacheName = 'v5';
const cacheAssets = [	
'../dist/index.js',	
'../dist/ed1d54b3fea059591e128baee192bf71.svg',	
'../dist/d711fc4db457f60dd039c9c2d00d2aeb.svg',	
'../dist/d19786695efe996f6afa00088bce8ab7.svg',	
'../dist/d1001da21c53e984fa85f946af1a0374.svg',	
'../dist/c9c5f13659fd2e044d850985d25667d2.svg',	
'../dist/bf1850c0e7b9464f45c2f3e89bf3be41.svg',	
'../dist/ba1a00a75bcfac5ed22b3faf180c7645.svg',	
'../dist/a7966d5285aacdf37b6d9853ecf73812.svg',	
'../dist/9f21f2736d2d80369770b461bf57ab98.svg',	
'../dist/9e30811989ac04b447425f6e15bd69af.svg',	
'../dist/9dcbc0b6e9e45911c1efd725d6a35c12.svg',	
'../dist/9c691112ed6f41133bc86dbfd35bf7f5.svg',	
'../dist/9c5304a3f3c0079d7d4132a40a554f67.svg',	
'../dist/9b096ef1d5a93a624d9ff84f383bfec9.svg',	
'../dist/99aeb48ee0d38225c421fa5bc5f9da2c.svg',	
'../dist/9352c4336d3cb7d3898dc3e272143caf.svg',	
'../dist/861c5630edd324cbe3a54080266a501d.svg',	
'../dist/7bbbcb9a6c678a8ad051fd6ad35278e6.svg',	
'../dist/77c3c4d3c51fdf13c15055e28afd9bad.svg',	
'../dist/6723a5d4e25c92a4664b3b5c465f8a8a.svg',	
'../dist/66e7d0e03b712dae7d5ca369072a9a77.svg',	
'../dist/624c280eb8099adf3789ab4bb9482982.svg',	
'../dist/61b16eae207f992db904ddb3301110af.svg',	
'../dist/609cdf72ac025ade992d24a30c221001.svg',	
'../dist/59a00f6d57af1213ea7f8eb690d6abe4.svg',	
'../dist/4d92a69e3c94861cf62665e083a058fe.svg',	
'../dist/457ca02408f9922b22afc522290a4047.svg',	
'../dist/31c37f9b2a99eab59c70d49ed1349afc.svg',	
'../dist/30bdb205cbec84bf901c2428a5c5a27a.svg',	
'../dist/2863d95561b5065c7361a5bc4eaaea8b.svg',	
'../dist/1616d863befcf1c62d2009cda16e9373.svg',	
'../dist/15e9908b7c64edc3f70b9c916b248cf8.svg',	
'../dist/1259d3325af3d0f488508125fee8c7be.svg',	
'../dist/114f25a880fd0a875069232a93f3dc04.svg',	
'../dist/03d33d9df061d554066d8b21e2ea4ec0.svg',
];



self.addEventListener('install', (e) => {
    e.waitUntil(
        caches
            .open(cacheName)
            .then(cache => {
                console.log(cache);
                cache.addAll(cacheAssets).then((data) => {
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
            console.log(caches);
            return caches.match('index.html');
        })
    );
});