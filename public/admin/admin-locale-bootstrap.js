(function () {
  'use strict';
  var language = localStorage.getItem('afrus-admin-language-v2') || 'fr';
  if (['en', 'fr', 'ru'].indexOf(language) === -1) language = 'fr';
  document.documentElement.lang = language;

  /* Decap reads config.yml with fetch. Inject the saved locale before Decap
     initializes so all native dialogs, workflow states and media tools use
     Decap's complete official translation. */
  var originalFetch = window.fetch.bind(window);
  window.fetch = function (input, init) {
    var url = typeof input === 'string' ? input : (input && input.url) || '';
    return originalFetch(input, init).then(function (response) {
      if (!/(^|\/)config\.yml(?:[?#]|$)/.test(url)) return response;
      return response.text().then(function (text) {
        var localized = text.replace(/^locale:\s*[^\r\n]+/m, 'locale: ' + language);
        return new Response(localized, {
          status: response.status,
          statusText: response.statusText,
          headers: response.headers
        });
      });
    });
  };
}());
