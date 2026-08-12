import siteSettings from '../content/site-settings.json';
import {
  WHATSAPP_CONFIG,
  getWhatsAppConsultationUrl,
  openWhatsAppConsultation,
  getWhatsAppMessageForSubject,
  getWhatsAppQuoteMessageForProduct,
  getWhatsAppProductQuoteUrl
} from '../utils/whatsapp';

export {
  WHATSAPP_CONFIG,
  getWhatsAppConsultationUrl,
  openWhatsAppConsultation,
  getWhatsAppMessageForSubject,
  getWhatsAppQuoteMessageForProduct,
  getWhatsAppProductQuoteUrl
};

/** Shared contact data is maintained through Decap CMS global settings. */
export const CONTACT_INFO = {
  email: siteSettings.contact.email,
  phones: [
    { label: 'Russia Office (WhatsApp / Call)', number: WHATSAPP_CONFIG.formatted, raw: WHATSAPP_CONFIG.raw },
    { label: 'Africa Hub (Calls Only)', number: siteSettings.contact.africaPhone.formatted, raw: siteSettings.contact.africaPhone.raw }
  ],
  telegram: siteSettings.contact.telegram.handle,
  telegramUrl: siteSettings.contact.telegram.url,
  facebookUrl: siteSettings.contact.facebookUrl,
  instagramUrl: siteSettings.contact.instagramUrl,
  offices: siteSettings.offices
};
