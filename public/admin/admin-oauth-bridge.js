(function () {
  var fallbackScheduled = false;

  var persistSessionFallback = function (message) {
    if (fallbackScheduled || !message.startsWith('authorization:github:success:')) return;
    var marker = 'authorization:github:success:';
    try {
      var credentials = JSON.parse(message.slice(marker.length));
      if (!credentials.token) return;
      fallbackScheduled = true;
      window.setTimeout(function () {
        localStorage.setItem('decap-cms-user', JSON.stringify({
          token: credentials.token,
          provider: 'github',
          backendName: 'github'
        }));
        localStorage.removeItem('afrus-oauth-message');
        window.location.replace('/admin/');
      }, 1200);
    } catch (_error) {
      // Let Decap's standard OAuth handler display malformed-response errors.
    }
  };

  var relay = function (message) {
    if (typeof message !== 'string') return;
    if (!message.startsWith('authorization:github:')) return;
    window.postMessage(message, window.location.origin);
    persistSessionFallback(message);
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
