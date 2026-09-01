(function () {
  if (!('BroadcastChannel' in window)) return;

  var channel = new BroadcastChannel('afrus-oauth');
  channel.addEventListener('message', function (event) {
    if (typeof event.data !== 'string') return;
    if (!event.data.startsWith('authorization:github:')) return;
    window.postMessage(event.data, window.location.origin);
  });

  window.addEventListener('beforeunload', function () {
    channel.close();
  });
})();
