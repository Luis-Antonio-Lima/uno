// O recurso Navigation Preload no Service Worker é usado para acelerar o tempo de inicialização do Service Worker, fazendo solicitações em paralelo.

// Quando um usuário navega para uma página da web, o navegador inicia o Service Worker, mas também precisa esperar que ele seja iniciado antes de poder
// enviar a solicitação para a página da web. Isso pode levar a um atraso, especialmente se o Service Worker estiver realizando tarefas pesadas.
/*
addEventListener('activate', event => {
  event.waitUntil(async function() {
    // Feature-detect
    if (self.registration.navigationPreload) {
      // Enable navigation preloads!
      await self.registration.navigationPreload.enable();
    }
  }());
});
*/

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
          '/0-red.png',
          '/0-blue.png',
          '/0-green.png',
          '/0-yellow.png',
          /*
          '/1-red.png',
          '/1-blue.png',
          '/1-green.png',
          '/1-yellow.png',
          '/2-red.png',
          '/2-blue.png',
          '/2-green.png',
          '/2-yellow.png',
          '/3-red.png',
          '/3-blue.png',
          '/3-green.png',
          '/3-yellow.png',
          '/4-red.png',
          '/4-blue.png',
          '/4-green.png',
          '/4-yellow.png',
          '/5-red.png',
          '/5-blue.png',
          '/5-green.png',
          '/5-yellow.png',
          '/6-red.png',
          '/6-blue.png',
          '/6-green.png',
          '/6-yellow.png',
          '/7-red.png',
          '/7-blue.png',
          '/7-green.png',
          '/7-yellow.png',
          '/8-red.png',
          '/8-blue.png',
          '/8-green.png',
          '/8-yellow.png',
          '/9-red.png',
          '/9-blue.png',
          '/9-green.png',
          '/9-yellow.png',
          '/inverte-red.png',
          '/inverte-blue.png',
          '/inverte-green.png',
          '/inverte-yellow.png',
          '/bloqueio-red.png',
          '/bloqueio-blue.png',
          '/bloqueio-green.png',
          '/bloqueio-yellow.png',
          '/cor-red.png',
          '/cor-blue.png',
          '/cor-green.png',
          '/cor-yellow.png',
          '/mais2-red.png',
          '/mais2-blue.png',
          '/mais2-green.png',
          '/mais2-yellow.png',
          '/mais4-red.png',
          '/mais4-blue.png',
          '/mais4-green.png',
          '/mais4-yellow.png'
          */
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