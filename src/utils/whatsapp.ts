import siteSettings from '../content/site-settings.json';

// Centralized WhatsApp configuration, editable through Decap CMS.
export const WHATSAPP_CONFIG = {
  raw: siteSettings.contact.whatsapp.raw,
  number: siteSettings.contact.whatsapp.raw,
  formatted: siteSettings.contact.whatsapp.formatted,
};

/**
 * Returns a wa.me URL with a pre-filled encoded text parameter.
 */
export const getWhatsAppConsultationUrl = (messageText: string): string => {
  return `https://wa.me/${WHATSAPP_CONFIG.number}?text=${encodeURIComponent(messageText)}`;
};

/**
 * Opens WhatsApp directly in a new tab with standard security attributes.
 */
export const openWhatsAppConsultation = (messageText: string): void => {
  const url = getWhatsAppConsultationUrl(messageText);
  window.open(url, '_blank', 'noopener,noreferrer');
};

/**
 * Maps consultation subjects or intents to appropriate pre-filled messages.
 */
export const getWhatsAppMessageForSubject = (subject?: string): string => {
  if (!subject) {
    return "Hello AFRUS, I would like to schedule a consultation regarding your services and bilateral opportunities.";
  }

  const lower = subject.toLowerCase();

  if (lower.includes('commodity') || lower.includes('sourcing')) {
    return "Hello AFRUS, I would like to inquire about commodity sourcing and bilateral trade opportunities between Russia and Africa.";
  }
  if (lower.includes('trade') || lower.includes('import') || lower.includes('export')) {
    return "Hello AFRUS, I would like to schedule a consultation regarding Russia–Africa trade opportunities.";
  }
  if (lower.includes('education') || lower.includes('university') || lower.includes('study') || lower.includes('admission') || lower.includes('scholarship')) {
    return "Hello AFRUS, I would like guidance regarding studying in Russia and available scholarship opportunities.";
  }
  if (lower.includes('investment') || lower.includes('business') || lower.includes('expansion') || lower.includes('market entry') || lower.includes('corporate setup')) {
    return "Hello AFRUS, I am interested in investment opportunities between Russia and Africa and would like to speak with an advisor.";
  }
  if (lower.includes('partnership') || lower.includes('partner') || lower.includes('b2b')) {
    return "Hello AFRUS, I am interested in discussing a potential partnership with AFRUS.";
  }
  if (lower.includes('english') || lower.includes('french') || lower.includes('language') || lower.includes('course')) {
    return `Hello AFRUS, I would like to inquire about language courses and program enrollment (${subject}).`;
  }
  if (lower.includes('payment') || lower.includes('money') || lower.includes('finance') || lower.includes('cross-border')) {
    return "Hello AFRUS, I would like to schedule a consultation regarding cross-border payment corridors and financial services.";
  }
  if (lower.includes('concierge') || lower.includes('vip')) {
    return "Hello AFRUS, I would like to request VIP executive concierge services and delegation assistance.";
  }
  if (lower.includes('event') || lower.includes('festival') || lower.includes('forum')) {
    return `Hello AFRUS, I would like to inquire about event participation and delegation registration (${subject}).`;
  }

  return `Hello AFRUS, I would like to schedule a consultation regarding: ${subject}.`;
};

/**
 * Generates a dynamic B2B quotation request message for WhatsApp.
 */
export const getWhatsAppQuoteMessageForProduct = (product: {
  title: string;
  category?: string;
  origin?: string;
  moq?: string;
  id?: string;
}): string => {
  return `Hello AFRUS,

I am interested in receiving an official B2B quotation for the following product:

Product: ${product.title}
Category: ${product.category || 'International Trade'}
Origin: ${product.origin || 'Russian Federation / Africa'}

Please provide:
• Current Pricing
• Technical Specifications & Quality Certificates
• Minimum Order Quantity${product.moq ? ` (${product.moq})` : ''}
• Packaging Options
• Delivery Terms & Incoterms (FOB / CIF / EXW)
• Estimated Lead Time

Thank you.`;
};

/**
 * Returns a wa.me URL pre-filled with the official B2B quotation request for a specific product.
 */
export const getWhatsAppProductQuoteUrl = (product: {
  title: string;
  category?: string;
  origin?: string;
  moq?: string;
  id?: string;
}): string => {
  const text = getWhatsAppQuoteMessageForProduct(product);
  return getWhatsAppConsultationUrl(text);
};
