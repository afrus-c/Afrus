(function () {
  var relay = function (message) {
    if (typeof message !== 'string') return;
    if (!message.startsWith('authorization:github:')) return;
    window.postMessage(message, window.location.origin);
  };

  window.addEventListener('storage', function (event) {
    if (event.key === 'afrus-oauth-message' && event.newValue) relay(event.newValue);
  });

  if ('BroadcastChannel' in window) {
    var channel = new BroadcastChannel('afrus-oauth');
    channel.addEventListener('message', function (event) {
      relay(event.data);
    });

    window.addEventListener('beforeunload', function () {
      channel.close();
    });
  }
})();
