(function () {
  var relay = function (message) {
    if (typeof message !== 'string') return;
    if (!message.startsWith('authorization:github:')) return;
    window.postMessage(message, window.location.origin);
  };

  var relayPending = function () {
    var pending = localStorage.getItem('afrus-oauth-message');
    if (!pending) return;
    relay(pending);
    window.setTimeout(function () { relay(pending); }, 350);
    window.setTimeout(function () {
      relay(pending);
      localStorage.removeItem('afrus-oauth-message');
    }, 1000);
  };

  window.addEventListener('storage', function (event) {
    if (event.key === 'afrus-oauth-message' && event.newValue) {
      relay(event.newValue);
      window.setTimeout(function () { relay(event.newValue); }, 350);
    }
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

  window.addEventListener('load', relayPending);
  window.setTimeout(relayPending, 750);
})();
