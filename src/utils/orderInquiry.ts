import { CartItem } from '../context/CartContext';
import { getDualPrice, formatUsd, formatRub } from './currency';
import { WHATSAPP_CONFIG } from './whatsapp';
import siteSettings from '../content/site-settings.json';
import { checkoutSettings, ShippingMethod } from './operationalSettings';

export { WHATSAPP_CONFIG };

export const TELEGRAM_CONFIG = {
  username: siteSettings.contact.telegram.username,
  formatted: siteSettings.contact.telegram.handle,
  url: siteSettings.contact.telegram.url
};

type CustomerNotes = { fullName?: string; location?: string; notes?: string };
type InquiryOptions = {
  shippingMethod?: ShippingMethod;
  paymentInstructions?: string;
  messagePrefix?: string;
};

const copy = {
  EN: {
    intro: 'I would like to place an order/inquiry for the following products:', size: 'Size', quantity: 'Quantity', price: 'Price', total: 'Estimated Cart Total', customer: 'Customer Details', name: 'Name', location: 'Location', note: 'Note', shipping: 'Shipping method', payment: 'Payment information', free: 'Free', confirm: 'Please confirm product availability, final pricing, delivery cost and estimated delivery time.', thanks: 'Thank you.'
  },
  FR: {
    intro: 'Je souhaite passer une commande pour les produits suivants :', size: 'Taille', quantity: 'Quantité', price: 'Prix', total: 'Total estimé du panier', customer: 'Coordonnées du client', name: 'Nom', location: 'Lieu', note: 'Note', shipping: 'Mode de livraison', payment: 'Informations de paiement', free: 'Gratuit', confirm: 'Veuillez confirmer la disponibilité, le prix final, les frais et le délai de livraison.', thanks: 'Merci.'
  },
  RU: {
    intro: 'Я хочу оформить заказ на следующие товары:', size: 'Размер', quantity: 'Количество', price: 'Цена', total: 'Предварительная сумма заказа', customer: 'Данные покупателя', name: 'Имя', location: 'Адрес', note: 'Примечание', shipping: 'Способ доставки', payment: 'Информация об оплате', free: 'Бесплатно', confirm: 'Пожалуйста, подтвердите наличие, окончательную цену, стоимость и срок доставки.', thanks: 'Спасибо!'
  }
};

export function generateOrderInquiryText(
  items: CartItem[],
  totalUsdPrice: number,
  totalRubPrice: number,
  exchangeRate: number,
  customerNotes?: CustomerNotes,
  lang: string = 'EN',
  options?: InquiryOptions
): string {
  const language = (lang || 'EN').toUpperCase() as keyof typeof copy;
  const labels = copy[language] ?? copy.EN;
  const prefix = options?.messagePrefix ?? checkoutSettings.orderMessagePrefix;
  const paymentInstructions = options?.paymentInstructions ?? checkoutSettings.paymentInstructions;
  const lines: string[] = [prefix, '', labels.intro, ''];

  items.forEach((item, index) => {
    const subtotal = getDualPrice(item.product.priceUsd * item.quantity, exchangeRate, item.product.priceRub != null ? item.product.priceRub * item.quantity : undefined);
    lines.push(`${index + 1}. ${item.product.title}${item.selectedSize ? ` (${labels.size}: ${item.selectedSize})` : ''}`);
    lines.push(`   ${labels.quantity}: ${item.quantity}`);
    lines.push(`   ${labels.price}: ${subtotal.rub} / ${subtotal.usd}`, '');
  });

  lines.push(`${labels.total}:`, formatRub(totalRubPrice), formatUsd(totalUsdPrice), '');

  if (customerNotes?.fullName || customerNotes?.location || customerNotes?.notes) {
    lines.push(`${labels.customer}:`);
    if (customerNotes.fullName) lines.push(`${labels.name}: ${customerNotes.fullName}`);
    if (customerNotes.location) lines.push(`${labels.location}: ${customerNotes.location}`);
    if (customerNotes.notes) lines.push(`${labels.note}: ${customerNotes.notes}`);
    lines.push('');
  }

  if (options?.shippingMethod) {
    const shippingPrice = options.shippingMethod.priceRub > 0
      ? `${formatRub(options.shippingMethod.priceRub)} (${formatUsd(options.shippingMethod.priceUsd)})`
      : labels.free;
    lines.push(`${labels.shipping}: ${options.shippingMethod.label} (${shippingPrice})`);
  }
  if (paymentInstructions) lines.push(`${labels.payment}: ${paymentInstructions}`);
  lines.push('', labels.confirm, '', labels.thanks);
  return lines.join('\n');
}

export function getWhatsAppOrderUrl(messageText: string): string {
  return `https://wa.me/${WHATSAPP_CONFIG.number}?text=${encodeURIComponent(messageText)}`;
}

export function getTelegramOrderUrl(messageText: string): string {
  return `https://t.me/${TELEGRAM_CONFIG.username}?text=${encodeURIComponent(messageText)}`;
}
