(function () {
  'use strict';

  var h = (window.React && window.React.createElement) || window.h;
  if (!window.CMS || !h) return;

  var locale = localStorage.getItem('afrus-admin-language-v2') || 'fr';
  var previewText = {
    fr: {
      'Content preview': 'Aperçu du contenu', 'AFRUS CONTENT PREVIEW': 'APERÇU DU CONTENU AFRUS',
      'AFRUS STORE PRODUCT': 'PRODUIT DE LA BOUTIQUE AFRUS', 'New product': 'Nouveau produit',
      'Add a product image': 'Ajouter une image du produit', 'Origin': 'Origine',
      'In stock': 'En stock', 'Out of stock': 'Rupture de stock', 'Yes': 'Oui', 'No': 'Non',
      'English': 'Anglais', 'French': 'Français', 'Russian': 'Russe'
    },
    ru: {
      'Content preview': 'Предпросмотр содержимого', 'AFRUS CONTENT PREVIEW': 'ПРЕДПРОСМОТР СОДЕРЖИМОГО AFRUS',
      'AFRUS STORE PRODUCT': 'ТОВАР МАГАЗИНА AFRUS', 'New product': 'Новый товар',
      'Add a product image': 'Добавить изображение товара', 'Origin': 'Происхождение',
      'In stock': 'В наличии', 'Out of stock': 'Нет в наличии', 'Yes': 'Да', 'No': 'Нет',
      'English': 'Английский', 'French': 'Французский', 'Russian': 'Русский'
    }
  };
  function tr(text) { return (previewText[locale] && previewText[locale][text]) || text; }

  var collections = [
    'multilingual_content', 'store_categories', 'store_subcategories',
    'trade_page_content', 'business_russia_content', 'business_africa_content',
    'export_import_content', 'economic_forum_content', 'events_page_content',
    'events', 'news', 'universities', 'opportunities', 'concierge_services',
    'language_courses', 'testimonials', 'home_hero', 'quick_services',
    'partners', 'pages'
  ];

  function readableLabel(key) {
    return String(key)
      .replace(/I18n$/, ' translations')
      .replace(/([a-z0-9])([A-Z])/g, '$1 $2')
      .replace(/[_-]+/g, ' ')
      .replace(/^./, function (letter) { return letter.toUpperCase(); });
  }

  function present(value) {
    return value !== undefined && value !== null && value !== '' &&
      (!Array.isArray(value) || value.length > 0);
  }

  function renderValue(value, key) {
    if (!present(value)) return null;

    if (Array.isArray(value)) {
      return h('div', { className: 'afrus-preview-list' }, value.map(function (item, index) {
        return h('div', { className: 'afrus-preview-list-item', key: index },
          typeof item === 'object' ? renderObject(item) : String(item));
      }));
    }

    if (typeof value === 'object') return renderObject(value);
    if (typeof value === 'boolean') {
      return h('span', { className: value ? 'afrus-status yes' : 'afrus-status no' }, tr(value ? 'Yes' : 'No'));
    }

    if (/image/i.test(key) && typeof value === 'string') {
      return h('img', { className: 'afrus-preview-image', src: value, alt: '' });
    }

    return h('div', { className: 'afrus-preview-text' }, String(value));
  }

  function renderObject(data) {
    return h('div', { className: 'afrus-preview-grid' }, Object.keys(data || {}).filter(function (key) {
      return present(data[key]) && !/^legacy/i.test(key);
    }).map(function (key) {
      return h('section', { className: 'afrus-preview-field', key: key },
        h('div', { className: 'afrus-preview-label' }, readableLabel(key)),
        renderValue(data[key], key)
      );
    }));
  }

  function GenericPreview(props) {
    var data = props.entry.getIn(['data']).toJS();
    var title = (data.titleI18n && (data.titleI18n.fr || data.titleI18n.en)) ||
      (data.nameI18n && (data.nameI18n.fr || data.nameI18n.en)) || data.title || data.name || data.id || tr('Content preview');
    return h('main', { className: 'afrus-preview-page' },
      h('header', { className: 'afrus-preview-header' },
        h('span', null, tr('AFRUS CONTENT PREVIEW')), h('h1', null, title)),
      renderObject(data)
    );
  }

  function ProductPreview(props) {
    var data = props.entry.getIn(['data']).toJS();
    var title = data.titleI18n || {};
    var description = data.descriptionI18n || {};
    return h('main', { className: 'afrus-preview-page product-preview' },
      h('header', { className: 'afrus-preview-header' },
        h('span', null, tr('AFRUS STORE PRODUCT')),
        h('h1', null, title.fr || title.en || data.title || data.id || tr('New product'))),
      h('div', { className: 'afrus-product-layout' },
        h('div', { className: 'afrus-product-media' },
          data.image ? h('img', { src: data.image, alt: title.fr || title.en || '' }) : h('div', { className: 'afrus-image-placeholder' }, tr('Add a product image'))),
        h('div', { className: 'afrus-product-info' },
          h('div', { className: 'afrus-price' }, '₽' + Number(data.priceRub || 0).toLocaleString('ru-RU') + ' RUB'),
          data.origin && h('div', { className: 'afrus-origin' }, tr('Origin') + ': ' + data.origin),
          h('div', { className: 'afrus-tags' },
            data.categoryId && h('span', null, data.categoryId),
            data.subcategoryId && h('span', null, data.subcategoryId),
            h('span', { className: data.inStock === false ? 'out' : '' }, tr(data.inStock === false ? 'Out of stock' : 'In stock'))),
          ['en', 'fr', 'ru'].map(function (language) {
            if (!title[language] && !description[language]) return null;
            return h('section', { className: 'afrus-language-card', key: language },
              h('strong', null, tr(({ en: 'English', fr: 'French', ru: 'Russian' })[language])),
              title[language] && h('h2', null, title[language]),
              description[language] && h('p', null, description[language]));
          })
        )
      )
    );
  }

  window.CMS.registerPreviewStyle('/admin/preview.css?v=6');
  window.CMS.registerPreviewTemplate('store_products', ProductPreview);
  collections.forEach(function (collection) {
    window.CMS.registerPreviewTemplate(collection, GenericPreview);
  });
}());
