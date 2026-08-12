import operationalSettings from '../content/operational-settings.json';
import { Language } from '../i18n/translations';

type LocalizedText = Record<'en' | 'fr' | 'ru', string>;

export type ShippingMethod = {
  id: string;
  label: string;
  description: string;
  labelI18n?: LocalizedText;
  descriptionI18n?: LocalizedText;
  priceRub: number;
  priceUsd: number;
  enabled: boolean;
};

export const checkoutSettings = {
  shippingMethods: operationalSettings.checkout.shippingMethods.filter((method) => method.enabled) as ShippingMethod[],
  paymentInstructions: operationalSettings.checkout.paymentInstructions,
  orderMessagePrefix: operationalSettings.checkout.orderMessagePrefix
};

const localeFor = (language: Language): keyof LocalizedText => language.toLowerCase() as keyof LocalizedText;

export const getLocalizedCheckoutSettings = (language: Language) => {
  const locale = localeFor(language);
  return {
    shippingMethods: checkoutSettings.shippingMethods.map((method) => ({
      ...method,
      label: method.labelI18n?.[locale] || method.label,
      description: method.descriptionI18n?.[locale] || method.description
    })),
    paymentInstructions: operationalSettings.checkout.paymentInstructionsI18n?.[locale] || checkoutSettings.paymentInstructions,
    orderMessagePrefix: operationalSettings.checkout.orderMessagePrefixI18n?.[locale] || checkoutSettings.orderMessagePrefix
  };
};

export const commerceSettings = {
  ...operationalSettings.commerce,
  promoCodes: operationalSettings.commerce.promoCodes.filter((promo) => promo.enabled)
};

export const getDefaultShippingMethod = (): ShippingMethod | undefined =>
  checkoutSettings.shippingMethods[0];
