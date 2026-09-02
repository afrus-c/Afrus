(function () {
  'use strict';

  var storageKey = 'afrus-admin-language-v2';
  var languages = ['en', 'fr', 'ru'];
  var current = localStorage.getItem(storageKey) || 'fr';
  if (languages.indexOf(current) === -1) current = 'fr';

  var dictionary = {
    fr: {
      'Admin': 'Administration',
      'Content Manager': 'Gestionnaire de contenu', 'Collections': 'Collections', 'Workflow': 'Flux de publication',
      'Media': 'Médias', 'Quick Add': 'Ajout rapide', 'Search': 'Rechercher', 'Filter': 'Filtrer',
      'Save': 'Enregistrer', 'Publish': 'Publier', 'Delete': 'Supprimer', 'Cancel': 'Annuler', 'Edit': 'Modifier',
      'Back': 'Retour', 'Login': 'Connexion', 'Logout': 'Déconnexion', 'Log Out': 'Déconnexion',
      'Unpublish': 'Dépublier', 'Duplicate': 'Dupliquer', 'Discard changes': 'Annuler les modifications',
      'All Page Text and Translations': 'Tous les textes et traductions', 'Trade Page Content': 'Contenu de la page Commerce',
      'Business in Russia Content': 'Contenu Entreprendre en Russie', 'Business in Africa Content': 'Contenu Entreprendre en Afrique',
      'Export and Import Content': 'Contenu Exportation et Importation', 'Economic Forum Content': 'Contenu du Forum économique',
      'Events Page Text': 'Textes de la page Événements', 'Events Calendar': 'Calendrier des événements',
      'Store Categories': 'Catégories de la boutique', 'Store Subcategories': 'Sous-catégories de la boutique',
      'Store Products': 'Produits de la boutique', 'News Articles': 'Articles d’actualité', 'Universities': 'Universités',
      'Business Opportunities': 'Opportunités commerciales', 'Concierge Services': 'Services de conciergerie',
      'Language Courses': 'Cours de langues', 'Testimonials': 'Témoignages', 'Homepage Hero Slides': 'Diapositives d’accueil',
      'Homepage Quick Services': 'Services rapides de l’accueil', 'Institutional Partners': 'Partenaires institutionnels',
      'Website Pages': 'Pages du site', 'New Store Product': 'Nouveau produit', 'New Event': 'Nouvel événement',
      'New Language Course': 'Nouveau cours de langue', 'Stable ID': 'Identifiant stable', 'Stable product ID': 'Identifiant stable du produit',
      'Product title': 'Titre du produit', 'Category': 'Catégorie', 'Subcategory': 'Sous-catégorie', 'Price USD': 'Prix en USD',
      'Custom RUB price': 'Prix personnalisé en RUB', 'Origin': 'Origine', 'Product description': 'Description du produit',
      'Main image': 'Image principale', 'Gallery images': 'Images de la galerie', 'In stock': 'En stock',
      'Inventory count': 'Quantité en stock', 'Availability label': 'État de disponibilité', 'Featured product': 'Produit vedette',
      'New arrival': 'Nouveauté', 'Rating': 'Évaluation', 'Badge': 'Badge', 'Brand': 'Marque', 'Material': 'Matière',
      'Available sizes': 'Tailles disponibles', 'Specifications': 'Caractéristiques', 'English': 'Anglais', 'French': 'Français',
      'Russian': 'Russe', 'Title': 'Titre', 'Description': 'Description', 'Date': 'Date', 'Location': 'Lieu',
      'Image': 'Image', 'Display order': 'Ordre d’affichage', 'Required': 'Obligatoire', 'Optional': 'Facultatif',
      'Language': 'Langue', 'Category name': 'Nom de la catégorie', 'Category description': 'Description de la catégorie',
      'Icon or emoji': 'Icône ou emoji', 'Item count': 'Nombre d’articles', 'Parent category': 'Catégorie parente',
      'Subcategory name': 'Nom de la sous-catégorie', 'Translated badge': 'Badge promotionnel traduit',
      'Gallery image': 'Image de galerie', 'Size': 'Taille', 'Speaker': 'Intervenant', 'Label': 'Libellé',
      'Value': 'Valeur', 'Create': 'Créer', 'Add': 'Ajouter', 'Add new': 'Ajouter', 'Loading': 'Chargement',
      'Choose an image': 'Choisir une image', 'Choose different image': 'Choisir une autre image'
    },
    ru: {
      'Admin': 'Администратор',
      'Content Manager': 'Управление контентом', 'Collections': 'Коллекции', 'Workflow': 'Процесс публикации',
      'Media': 'Медиа', 'Quick Add': 'Быстрое добавление', 'Search': 'Поиск', 'Filter': 'Фильтр',
      'Save': 'Сохранить', 'Publish': 'Опубликовать', 'Delete': 'Удалить', 'Cancel': 'Отмена', 'Edit': 'Редактировать',
      'Back': 'Назад', 'Login': 'Войти', 'Logout': 'Выйти', 'Log Out': 'Выйти', 'Unpublish': 'Снять с публикации',
      'Duplicate': 'Дублировать', 'Discard changes': 'Отменить изменения',
      'All Page Text and Translations': 'Все тексты и переводы', 'Trade Page Content': 'Содержание страницы торговли',
      'Business in Russia Content': 'Бизнес в России', 'Business in Africa Content': 'Бизнес в Африке',
      'Export and Import Content': 'Экспорт и импорт', 'Economic Forum Content': 'Экономический форум',
      'Events Page Text': 'Тексты страницы мероприятий', 'Events Calendar': 'Календарь мероприятий',
      'Store Categories': 'Категории магазина', 'Store Subcategories': 'Подкатегории магазина',
      'Store Products': 'Товары магазина', 'News Articles': 'Новости', 'Universities': 'Университеты',
      'Business Opportunities': 'Деловые возможности', 'Concierge Services': 'Консьерж-услуги',
      'Language Courses': 'Языковые курсы', 'Testimonials': 'Отзывы', 'Homepage Hero Slides': 'Слайды главной страницы',
      'Homepage Quick Services': 'Быстрые услуги', 'Institutional Partners': 'Институциональные партнеры',
      'Website Pages': 'Страницы сайта', 'New Store Product': 'Новый товар', 'New Event': 'Новое мероприятие',
      'New Language Course': 'Новый языковой курс', 'Stable ID': 'Постоянный идентификатор',
      'Stable product ID': 'Постоянный идентификатор товара', 'Product title': 'Название товара',
      'Category': 'Категория', 'Subcategory': 'Подкатегория', 'Price USD': 'Цена в USD', 'Custom RUB price': 'Цена в RUB',
      'Origin': 'Происхождение', 'Product description': 'Описание товара', 'Main image': 'Главное изображение',
      'Gallery images': 'Изображения галереи', 'In stock': 'В наличии', 'Inventory count': 'Количество на складе',
      'Availability label': 'Статус наличия', 'Featured product': 'Рекомендуемый товар', 'New arrival': 'Новинка',
      'Rating': 'Рейтинг', 'Badge': 'Метка', 'Brand': 'Бренд', 'Material': 'Материал', 'Available sizes': 'Доступные размеры',
      'Specifications': 'Характеристики', 'English': 'Английский', 'French': 'Французский', 'Russian': 'Русский',
      'Title': 'Заголовок', 'Description': 'Описание', 'Date': 'Дата', 'Location': 'Место', 'Image': 'Изображение',
      'Display order': 'Порядок отображения', 'Required': 'Обязательно', 'Optional': 'Необязательно'
    }
  };

  var originals = new WeakMap();
  var translating = false;

  var terminology = {
    fr: [
      ['Frequently asked questions','Questions fréquentes'],['All Page Text and Translations','Tous les textes et traductions'],
      ['Commerce and SEO Settings','Paramètres commerciaux et SEO'],['Global Site Settings','Paramètres généraux du site'],
      ['Page Hero Images','Images principales des pages'],['Shared Inline Text','Textes partagés'],['About Page Core Content','Contenu principal de la page À propos'],
      ['Money Transfer Page','Page Transfert d’argent'],['Festivals Page','Page Festivals'],['AFRUS Store Page','Page Boutique AFRUS'],
      ['Business in Russia','Entreprendre en Russie'],['Business in Africa','Entreprendre en Afrique'],['Economic Forum','Forum économique'],
      ['Export and Import','Exportation et importation'],['Study in Russia','Étudier en Russie'],['Learn English','Apprendre l’anglais'],['Learn French','Apprendre le français'],
      ['Default meta description','Méta-description par défaut'],['Default page title','Titre de page par défaut'],['Social sharing image','Image de partage social'],
      ['Allow search indexing','Autoriser l’indexation'],['Free shipping threshold USD','Seuil de livraison gratuite en USD'],['USD to RUB exchange rate','Taux de change USD vers RUB'],
      ['Default available inventory','Stock disponible par défaut'],['Low-stock threshold','Seuil de stock faible'],['Payment instructions','Instructions de paiement'],
      ['Order message prefix','Préfixe du message de commande'],['Shipping methods','Modes de livraison'],['Promo codes','Codes promotionnels'],
      ['Target audience','Public cible'],['Course features','Caractéristiques du cours'],['Included services','Services inclus'],['Impact statistics','Statistiques d’impact'],
      ['Financial glossary','Glossaire financier'],['Festival lineup','Programme du festival'],['Navigation chips','Liens de navigation'],['Contact channels','Canaux de contact'],
      ['Translated category name','Nom traduit de la catégorie'],['Translated subcategory name','Nom traduit de la sous-catégorie'],['Translated description','Description traduite'],
      ['Translated badge','Badge promotionnel traduit'],['Category name','Nom de la catégorie'],['Category description','Description de la catégorie'],
      ['Icon or emoji','Icône ou emoji'],['Item count','Nombre d’articles'],['Stable category ID','Identifiant stable de la catégorie'],
      ['Stable subcategory ID','Identifiant stable de la sous-catégorie'],['Stable product ID','Identifiant stable du produit'],
      ['Parent category','Catégorie parente'],['Cover image','Image de couverture'],['Featured image','Image à la une'],['University image','Image de l’université'],
      ['Scholarships available','Bourses disponibles'],['Tuition range','Frais de scolarité'],['Publication date','Date de publication'],['Reading time','Temps de lecture'],
      ['Article body','Corps de l’article'],['Upcoming event','Événement à venir'],['Event type','Type d’événement'],['Supporting text','Texte complémentaire'],
      ['Primary button','Bouton principal'],['Secondary button','Bouton secondaire'],['Registration button','Bouton d’inscription'],['Button text','Texte du bouton'],
      ['Inquiry subject','Objet de la demande'],['Inquiry prefix','Préfixe de la demande'],['Page namespace','Espace de noms de la page'],['Translation key','Clé de traduction'],
      ['Editable page content','Contenu de page modifiable'],['Editable text','Texte modifiable'],['Display order','Ordre d’affichage'],['Destination path','Chemin de destination'],
      ['Office name','Nom du bureau'],['Partner name','Nom du partenaire'],['Logo abbreviation','Abréviation du logo'],['Display number','Numéro affiché'],
      ['Number (digits only)','Numéro (chiffres uniquement)'],['Display handle','Identifiant affiché'],['Profile URL','URL du profil'],['Support email','E-mail d’assistance'],
      ['Meta description','Méta-description'],['Page title','Titre de la page'],['Route path','Chemin de la page'],['Social image','Image sociale'],
      ['Legacy ','Ancien champ : '],[' slides',' — diapositives'],[' settings',' — paramètres'],[' requirements',' — conditions'],[' benefits',' — avantages'],
      ['Requirements','Conditions'],['Requirement','Condition'],['Benefits','Avantages'],['Benefit','Avantage'],['Deadline','Date limite'],['Enabled','Activé'],
      ['Question','Question'],['Answer','Réponse'],['Definition','Définition'],['Term','Terme'],['Caption','Légende'],['Headline','Titre principal'],
      ['Highlighted title','Titre mis en valeur'],['Title first line','Première ligne du titre'],['Title highlighted line','Ligne de titre mise en valeur'],
      ['Program','Programme'],['Programs','Programmes'],['Speakers','Intervenants'],['Speaker','Intervenant'],['Country','Pays'],['City','Ville'],
      ['Organization','Organisation'],['Role','Fonction'],['Address','Adresse'],['Coordinates','Coordonnées'],['Value','Valeur'],['Prefix','Préfixe'],['Suffix','Suffixe'],
      ['About slides','Diapositives de la page À propos'],['Allow indexing','Autoriser l’indexation'],['Author','Auteur'],['Brand name','Nom de la marque'],
      ['Business in Africa slides','Diapositives Entreprendre en Afrique'],['Business in Russia slides','Diapositives Entreprendre en Russie'],
      ['Category label','Libellé de catégorie'],['Code','Code'],['Concierge slides','Diapositives Conciergerie'],['Contact slides','Diapositives Contact'],
      ['Content key','Clé de contenu'],['Discount percent','Pourcentage de remise'],['Duration','Durée'],['Economic Forum slides','Diapositives Forum économique'],
      ['Events slides','Diapositives Événements'],['Excerpt','Extrait'],['Export and Import slides','Diapositives Exportation et Importation'],
      ['Eyebrow','Surtitre'],['Facebook URL','URL Facebook'],['Feature','Fonctionnalité'],['Featured service','Service mis en avant'],
      ['Fonctionnalité','Fonctionnalité'],['Format','Format'],['Highlight','Élément mis en valeur'],['Icon','Icône'],['Instagram URL','URL Instagram'],
      ['Learn English slides','Diapositives Apprendre l’anglais'],['Learn French slides','Diapositives Apprendre le français'],
      ['Legacy audience','Ancien public cible'],['Legacy author','Ancien auteur'],['Legacy badge','Ancien badge'],['Legacy benefits','Anciens avantages'],
      ['Legacy body','Ancien contenu'],['Legacy button','Ancien bouton'],['Legacy category fallback','Ancienne catégorie de secours'],
      ['Legacy category','Ancienne catégorie'],['Legacy city','Ancienne ville'],['Legacy country','Ancien pays'],['Legacy date','Ancienne date'],
      ['Legacy deadline','Ancienne date limite'],['Legacy description fallback','Ancienne description de secours'],['Legacy description','Ancienne description'],
      ['Legacy duration','Ancienne durée'],['Legacy excerpt','Ancien extrait'],['Legacy features','Anciennes fonctionnalités'],['Legacy format','Ancien format'],
      ['Legacy headline','Ancien titre principal'],['Legacy level','Ancien niveau'],['Legacy location','Ancien lieu'],['Legacy logo','Ancien logo'],
      ['Legacy name','Ancien nom'],['Legacy organization','Ancienne organisation'],['Legacy programs','Anciens programmes'],['Legacy quote','Ancien témoignage'],
      ['Legacy ranking','Ancien classement'],['Legacy read time','Ancien temps de lecture'],['Legacy requirements','Anciennes conditions'],
      ['Legacy role','Ancienne fonction'],['Legacy subcategory fallback','Ancienne sous-catégorie de secours'],['Legacy title fallback','Ancien titre de secours'],
      ['Legacy title','Ancien titre'],['Legacy tuition','Anciens frais de scolarité'],['Legacy type','Ancien type'],['Level','Niveau'],
      ['Link text','Texte du lien'],['Mission','Mission'],['Name','Nom'],['Navbar and footer logo','Logo de la barre de navigation et du pied de page'],
      ['News slides','Diapositives Actualités'],['Page or section namespace','Espace de noms de la page ou section'],['Pause label','Libellé de pause'],
      ['Play label','Libellé de lecture'],['Portrait','Portrait'],['Ranking','Classement'],['Section ID','Identifiant de section'],['Service','Service'],
      ['Service group','Groupe de services'],['Site name','Nom du site'],['Stable key','Clé stable'],['Study in Russia slides','Diapositives Étudier en Russie'],
      ['Tag','Étiquette'],['Testimonial','Témoignage'],['Trade slides','Diapositives Commerce'],['Translated name','Nom traduit'],
      ['Translated order message prefix','Préfixe traduit du message de commande'],['Translated payment instructions','Instructions de paiement traduites'],
      ['University name','Nom de l’université'],['Username','Nom d’utilisateur'],['Vision','Vision'],
      ['Keep existing keys unchanged. New keys may be added for new content.','Conservez les clés existantes sans les modifier. De nouvelles clés peuvent être ajoutées pour du nouveau contenu.'],
      ['Keep existing keys unchanged.','Conservez les clés existantes sans les modifier.'],
      ['Use lowercase letters and hyphens. Do not change after products use it.','Utilisez des lettres minuscules et des traits d’union. Ne modifiez plus cet identifiant lorsqu’il est utilisé par des produits.'],
      ['Use category-id--subcategory-name.','Utilisez la forme identifiant-categorie--nom-sous-categorie.'],
      ['Enter an existing group or create a new group name.','Saisissez un groupe existant ou créez un nouveau nom de groupe.'],
      ['Enter any status the administrator wants customers to see.','Saisissez le statut que l’administrateur souhaite afficher aux clients.'],
      ['Any image shape is supported. For the best storefront presentation, use a clear square product photo with the product centered and some space around its edges.','Tous les formats d’image sont acceptés. Pour un meilleur rendu dans la boutique, utilisez une photo carrée nette, avec le produit centré et un peu d’espace autour.']
      ,['Enter a supported icon name; unknown names use the website fallback icon.','Saisissez un nom d’icône pris en charge ; les noms inconnus utiliseront l’icône de secours du site.'],
      ['Enter any course language.','Saisissez la langue du cours.'],['Enter or create any opportunity category.','Saisissez ou créez une catégorie d’opportunité.'],
      ['Retained for compatibility.','Conservé pour assurer la compatibilité.'],['This same logo is displayed in both the navbar and footer.','Ce même logo est affiché dans la barre de navigation et le pied de page.'],
      ['Use lowercase letters and hyphens.','Utilisez des lettres minuscules et des traits d’union.']
    ],
    ru: [
      ['Frequently asked questions','Часто задаваемые вопросы'],['All Page Text and Translations','Все тексты и переводы'],['Commerce and SEO Settings','Настройки торговли и SEO'],
      ['Global Site Settings','Общие настройки сайта'],['Page Hero Images','Главные изображения страниц'],['Shared Inline Text','Общие тексты'],
      ['About Page Core Content','Основное содержание страницы «О нас»'],['Money Transfer Page','Страница денежных переводов'],['Festivals Page','Страница фестивалей'],
      ['AFRUS Store Page','Страница магазина AFRUS'],['Business in Russia','Бизнес в России'],['Business in Africa','Бизнес в Африке'],['Economic Forum','Экономический форум'],
      ['Export and Import','Экспорт и импорт'],['Study in Russia','Учёба в России'],['Learn English','Изучение английского'],['Learn French','Изучение французского'],
      ['Default meta description','Метаописание по умолчанию'],['Default page title','Заголовок по умолчанию'],['Social sharing image','Изображение для соцсетей'],
      ['Allow search indexing','Разрешить индексацию'],['Free shipping threshold USD','Порог бесплатной доставки в USD'],['USD to RUB exchange rate','Курс USD к RUB'],
      ['Default available inventory','Запас по умолчанию'],['Low-stock threshold','Порог малого запаса'],['Payment instructions','Инструкции по оплате'],
      ['Order message prefix','Префикс сообщения заказа'],['Shipping methods','Способы доставки'],['Promo codes','Промокоды'],['Target audience','Целевая аудитория'],
      ['Course features','Особенности курса'],['Included services','Включённые услуги'],['Impact statistics','Показатели деятельности'],['Financial glossary','Финансовый глоссарий'],
      ['Festival lineup','Программа фестиваля'],['Navigation chips','Навигационные ссылки'],['Contact channels','Каналы связи'],['Translated category name','Перевод названия категории'],
      ['Translated subcategory name','Перевод названия подкатегории'],['Translated description','Перевод описания'],['Parent category','Родительская категория'],
      ['Cover image','Обложка'],['Featured image','Главное изображение'],['University image','Изображение университета'],['Scholarships available','Доступны стипендии'],
      ['Tuition range','Стоимость обучения'],['Publication date','Дата публикации'],['Reading time','Время чтения'],['Article body','Текст статьи'],
      ['Upcoming event','Предстоящее мероприятие'],['Event type','Тип мероприятия'],['Supporting text','Дополнительный текст'],['Primary button','Основная кнопка'],
      ['Secondary button','Дополнительная кнопка'],['Registration button','Кнопка регистрации'],['Button text','Текст кнопки'],['Inquiry subject','Тема запроса'],
      ['Inquiry prefix','Префикс запроса'],['Page namespace','Пространство имён страницы'],['Translation key','Ключ перевода'],['Editable page content','Редактируемое содержимое страницы'],
      ['Editable text','Редактируемый текст'],['Display order','Порядок отображения'],['Destination path','Путь назначения'],['Office name','Название офиса'],
      ['Partner name','Название партнёра'],['Logo abbreviation','Сокращение логотипа'],['Display number','Отображаемый номер'],['Number (digits only)','Номер (только цифры)'],
      ['Display handle','Отображаемое имя'],['Profile URL','URL профиля'],['Support email','Электронная почта поддержки'],['Meta description','Метаописание'],
      ['Page title','Заголовок страницы'],['Route path','Путь страницы'],['Social image','Изображение для соцсетей'],['Legacy ','Старое поле: '],
      [' slides',' — слайды'],[' settings',' — настройки'],['Requirements','Требования'],['Requirement','Требование'],['Benefits','Преимущества'],
      ['Benefit','Преимущество'],['Deadline','Срок подачи'],['Enabled','Включено'],['Question','Вопрос'],['Answer','Ответ'],['Definition','Определение'],
      ['Term','Термин'],['Caption','Подпись'],['Headline','Главный заголовок'],['Highlighted title','Выделенный заголовок'],['Title first line','Первая строка заголовка'],
      ['Title highlighted line','Выделенная строка заголовка'],['Program','Программа'],['Programs','Программы'],['Speakers','Докладчики'],['Speaker','Докладчик'],
      ['Country','Страна'],['City','Город'],['Organization','Организация'],['Role','Должность'],['Address','Адрес'],['Coordinates','Координаты'],
      ['Value','Значение'],['Prefix','Префикс'],['Suffix','Суффикс']
    ]
  };

  function translateText(source) {
    if (current === 'en') return source;
    var trimmed = source.trim();
    var translated = dictionary[current][trimmed];
    if (!translated) {
      var match = trimmed.match(/^New (.+)$/);
      if (match && dictionary[current]['New ' + match[1]]) translated = dictionary[current]['New ' + match[1]];
    }
    if (translated) return source.replace(trimmed, translated);
    var result = trimmed;
    (terminology[current] || []).forEach(function (pair) { result = result.split(pair[0]).join(pair[1]); });
    return result !== trimmed ? source.replace(trimmed, result) : source;
  }

  function excluded(node) {
    var parent = node.parentElement;
    return !parent || parent.closest('input, textarea, [contenteditable="true"], .afrus-admin-language, iframe, script, style');
  }

  function translate(root) {
    if (translating) return;
    translating = true;
    var walker = document.createTreeWalker(root || document.body, NodeFilter.SHOW_TEXT);
    var node;
    while ((node = walker.nextNode())) {
      if (excluded(node) || !node.nodeValue.trim()) continue;
      if (!originals.has(node)) originals.set(node, node.nodeValue);
      node.nodeValue = translateText(originals.get(node));
    }
    document.documentElement.lang = current;
    translating = false;
  }

  function updateControl() {
    var select = document.querySelector('.afrus-admin-language select');
    if (select) select.value = current;
  }

  function setLanguage(language) {
    if (language === current) return;
    current = language;
    localStorage.setItem(storageKey, language);
    window.location.reload();
  }

  function placeInNavbar(switcher) {
    var navbar = document.querySelector('[class*="AppHeader"]');
    if (!navbar) {
      var authenticationPage = document.querySelector('[class*="StyledAuthenticationPage"]');
      var loginButton = authenticationPage && authenticationPage.querySelector('button');
      if (loginButton && switcher.previousElementSibling !== loginButton) {
        loginButton.insertAdjacentElement('afterend', switcher);
      }
      return;
    }

    var quickAddLabels = ['quick add', 'ajout rapide', 'быстрое добавление'];
    var walker = document.createTreeWalker(navbar, NodeFilter.SHOW_TEXT);
    var node;
    var quickAdd = null;
    while ((node = walker.nextNode())) {
      if (quickAddLabels.indexOf(node.nodeValue.trim().toLowerCase()) !== -1) {
        quickAdd = node.parentElement.closest('a, button, [role="button"]') || node.parentElement;
        break;
      }
    }

    if (quickAdd && quickAdd.parentElement) {
      if (switcher.nextElementSibling !== quickAdd) quickAdd.insertAdjacentElement('beforebegin', switcher);
      return;
    }

    if (switcher.parentElement !== navbar) navbar.appendChild(switcher);
  }

  function enhanceLogin() {
    var page = document.querySelector('[class*="StyledAuthenticationPage"]');
    if (!page || page.querySelector('.afrus-login-heading')) return;
    var heading = document.createElement('h1');
    heading.className = 'afrus-login-heading';
    heading.textContent = 'Admin';
    var loginButton = page.querySelector('button');
    if (loginButton) page.insertBefore(heading, loginButton);
    else page.appendChild(heading);
  }

  function mount() {
    if (document.querySelector('.afrus-admin-language')) return;
    var switcher = document.createElement('div');
    switcher.className = 'afrus-admin-language';
    switcher.innerHTML = '<span>' + (current === 'fr' ? 'Langue' : current === 'ru' ? 'Язык' : 'Language') + '</span>' +
      '<select aria-label="' + (current === 'fr' ? 'Langue de l’interface d’administration' : current === 'ru' ? 'Язык интерфейса администратора' : 'Admin interface language') + '">' +
      '<option value="en">' + (current === 'fr' ? 'Anglais' : current === 'ru' ? 'Английский' : 'English') + '</option>' +
      '<option value="fr">Français</option>' +
      '<option value="ru">' + (current === 'fr' ? 'Russe' : 'Русский') + '</option></select>';
    switcher.querySelector('select').addEventListener('change', function (event) {
      setLanguage(event.target.value);
    });
    document.body.appendChild(switcher);
    placeInNavbar(switcher);
    updateControl();
    translate(document.body);
  }

  var observer = new MutationObserver(function (records) {
    if (translating) return;
    var switcher = document.querySelector('.afrus-admin-language');
    if (switcher) placeInNavbar(switcher);
    enhanceLogin();
    records.forEach(function (record) {
      record.addedNodes.forEach(function (node) {
        if (node.nodeType === Node.ELEMENT_NODE) translate(node);
      });
    });
  });

  window.addEventListener('DOMContentLoaded', function () {
    mount();
    enhanceLogin();
    observer.observe(document.body, { childList: true, subtree: true });
  });
}());
