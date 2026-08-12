import operationalSettings from '../content/operational-settings.json';

export const DEFAULT_USD_TO_RUB_RATE = operationalSettings.commerce.usdToRubRate;

export interface DualPrice {
  usdFormatted: string; // e.g. "$45 USD"
  rubFormatted: string; // e.g. "₽4,140 RUB"
  usd: string; // e.g. "$45 USD"
  rub: string; // e.g. "₽4,140 RUB"
  usdValue: number;
  rubValue: number;
  combined: string; // e.g. "₽4,140 RUB / $45 USD"
  fullDisplay: string; // e.g. "₽4,140 RUB ($45 USD)"
}

/**
 * Format USD amount with standard symbol and currency code
 */
export function formatUsd(usdAmount: number): string {
  const formatted = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: usdAmount % 1 === 0 ? 0 : 2
  }).format(usdAmount);
  
  return `${formatted} USD`;
}

/**
 * Format RUB amount calculated from USD or direct value
 */
export function formatRub(rubAmount: number): string {
  const formatted = new Intl.NumberFormat('ru-RU', {
    maximumFractionDigits: 0
  }).format(Math.round(rubAmount));

  return `₽${formatted} RUB`;
}

/**
 * Calculate RUB from USD and return formatted strings for both currencies
 */
export function getDualPrice(
  usdPrice: number,
  rate: number = DEFAULT_USD_TO_RUB_RATE,
  rubOverride?: number
): DualPrice {
  const rubValue = rubOverride != null ? Math.round(rubOverride) : Math.round(usdPrice * rate);
  const usdFormatted = formatUsd(usdPrice);
  const rubFormatted = formatRub(rubValue);

  return {
    usdFormatted,
    rubFormatted,
    usd: usdFormatted,
    rub: rubFormatted,
    usdValue: usdPrice,
    rubValue,
    combined: `${rubFormatted} / ${usdFormatted}`,
    fullDisplay: `${rubFormatted} (${usdFormatted})`
  };
}

/**
 * Format dual currency strings inline
 */
export function formatDualPriceInline(usdPrice: number, rate: number = DEFAULT_USD_TO_RUB_RATE): string {
  return getDualPrice(usdPrice, rate).combined;
}
