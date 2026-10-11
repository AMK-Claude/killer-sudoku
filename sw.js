// Killer Sudoku offline: app shell cached, updates fetched in the background
const V='ks-0b85279568',CORE=['./','./index.html','./manifest.webmanifest','./icon-180.png','./icon-192.png','./icon-512.png','./icon-maskable.png'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(V).then(c=>c.addAll(CORE)).then(()=>self.skipWaiting()))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==V&&k!=='ks-fonts').map(k=>caches.delete(k)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',e=>{const r=e.request;if(r.method!=='GET')return;const u=new URL(r.url);
  if(/fonts\.(googleapis|gstatic)\.com$/.test(u.hostname)){e.respondWith(caches.open('ks-fonts').then(c=>c.match(r).then(m=>m||fetch(r).then(x=>{c.put(r,x.clone());return x}))));return}
  if(u.origin!==location.origin)return;
  const key=r.mode==='navigate'?'./index.html':r;
  e.respondWith(caches.open(V).then(c=>c.match(key,{ignoreSearch:true}).then(m=>{const net=fetch(r).then(x=>{if(x.ok)c.put(key,x.clone());return x}).catch(()=>m);return m||net})))});
