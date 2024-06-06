// O recurso Navigation Preload no Service Worker é usado para acelerar o tempo de inicialização do Service Worker, fazendo solicitações em paralelo.

// Quando um usuário navega para uma página da web, o navegador inicia o Service Worker, mas também precisa esperar que ele seja iniciado antes de poder
// enviar a solicitação para a página da web. Isso pode levar a um atraso, especialmente se o Service Worker estiver realizando tarefas pesadas.
addEventListener('activate', event => {
  event.waitUntil(async function() {
    // Feature-detect
    if (self.registration.navigationPreload) {
      // Enable navigation preloads!
      await self.registration.navigationPreload.enable();
    }
  }());
});

// Nome do cache (controle de versão)
const cachePWA = 'cache-v2'
// Arquivos a serem armazenados em cache
// Todos os arquivos devem ser adicionados ao vetor (exceto o manifesto)

// Instalando o Service Worker e armazenando os arquivos no cache
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(cachePWA)
      .then((cache) => {
        return cache.addAll([
          '/index.html',
          '/style.css',
          '/script.js',
          '/sw.js',
          '/unoIcon192.png',
          '/unoIcon512.png',
          '/background.jpg',
          '/card.png',
          '/img/0-red.png',
          '/img/0-blue.png',
          '/img/0-green.png',
          '/img/0-yellow.png',
          '/img/1-red.png',
          '/img/1-blue.png',
          '/img/1-green.png',
          '/img/1-yellow.png',
          '/img/2-red.png',
          '/img/2-blue.png',
          '/img/2-green.png',
          '/img/2-yellow.png',
          '/img/3-red.png',
          '/img/3-blue.png',
          '/img/3-blue.png',
          '/img/3-green.png',
          '/img/3-yellow.png',
          '/img/4-red.png',
          '/img/4-blue.png',
          '/img/4-green.png',
          '/img/4-yellow.png',
          '/img/5-red.png',
          '/img/5-blue.png',
          '/img/5-green.png',
          '/img/5-yellow.png',
          '/img/6-red.png',
          '/img/6-blue.png',
          '/img/6-green.png',
          '/img/6-yellow.png',
          '/img/7-red.png',
          '/img/7-blue.png',
          '/img/7-green.png',
          '/img/7-yellow.png',
          '/img/8-red.png',
          '/img/8-blue.png',
          '/img/8-green.png',
          '/img/8-yellow.png',
          '/img/9-red.png',
          '/img/9-blue.png',
          '/img/9-green.png',
          '/img/9-yellow.png',
          '/img/inverte-red.png',
          '/img/inverte-blue.png',
          '/img/inverte-green.png',
          '/img/inverte-yellow.png',
          '/img/bloqueio-red.png',
          '/img/bloqueio-blue.png',
          '/img/bloqueio-green.png',
          '/img/bloqueio-yellow.png',
          '/img/cor-red.png',
          '/img/cor-blue.png',
          '/img/cor-green.png',
          '/img/cor-yellow.png',
          '/img/mais2-red.png',
          '/img/mais2-blue.png',
          '/img/mais2-green.png',
          '/img/mais2-yellow.png',
          '/img/mais4-red.png',
          '/img/mais4-blue.png',
          '/img/mais4-green.png',
          '/img/mais4-yellow.png'
        ])
      })
  )
})

// Interceptando as solicitações de rede e servindo arquivos do cache quando offline
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // Se o arquivo está no cache, serve o arquivo do cache
        if (response) {
          return response
        }
        // Caso contrário, faz uma solicitação de rede
        return fetch(event.request)
      })
  )
})

// O Periodic Sync permite que as aplicações web alertem seu Service Worker para fazer atualizações em um intervalo de tempo periodico
// Neste caso a atualização ocorre no periodo de 1 dia
async function registerPeriodicNewsCheck() {
  const registration = await navigator.serviceWorker.ready;
  try {
    await registration.periodicSync.register("get-latest-news", {
      minInterval: 24 * 60 * 60 * 1000,
    });
  } catch {
    console.log("Periodic Sync could not be registered!");
  }
}