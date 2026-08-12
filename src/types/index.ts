export interface ServiceItem {
  id: string;
  title: string;
  category: 'trade' | 'education' | 'business' | 'concierge' | 'language' | 'events';
  description: string;
  iconName: string;
  badge?: string;
  linkText?: string;
  featured?: boolean;
  order?: number;
  titleI18n?: { en: string; fr: string; ru: string };
  descriptionI18n?: { en: string; fr: string; ru: string };
  badgeI18n?: { en: string; fr: string; ru: string };
  linkTextI18n?: { en: string; fr: string; ru: string };
}

export interface OpportunityItem {
  id: string;
  title: string;
  category: 'scholarship' | 'business' | 'trade' | 'investment' | 'cultural';
  location: string;
  deadline?: string;
  description: string;
  benefits: string[];
  requirements: string[];
  image: string;
  titleI18n?: { en: string; fr: string; ru: string };
  locationI18n?: { en: string; fr: string; ru: string };
  deadlineI18n?: { en: string; fr: string; ru: string };
  descriptionI18n?: { en: string; fr: string; ru: string };
  benefitsI18n?: { en: string[]; fr: string[]; ru: string[] };
  requirementsI18n?: { en: string[]; fr: string[]; ru: string[] };
}

// Store categories are CMS-defined rather than restricted to a code-owned list.
export type StoreCategory = string;

export interface ProductItem {
  id: string;
  categoryId?: string;
  subcategoryId?: string;
  title: string;
  category: StoreCategory;
  subcategory?: string;
  priceUsd: number; // Base canonical USD price
  priceRub?: number; // Optional custom calculated/override RUB price
  priceDisplay?: string;
  currency?: string;
  origin: string;
  description: string;
  titleI18n?: { en: string; fr: string; ru: string };
  descriptionI18n?: { en: string; fr: string; ru: string };
  image: string;
  galleryImages?: string[];
  inStock: boolean;
  availabilityStatus?: string;
  isFeatured?: boolean;
  isNewArrival?: boolean;
  rating: number;
  badge?: string;
  badgeI18n?: { en: string; fr: string; ru: string };
  brand?: string;
  material?: string;
  availableSizes?: string[];
  sizes?: string[];
  price?: number;
  inventoryCount?: number;
  specifications?: { label: string; value: string }[];
  // Backwards compatibility optional fields
  isCommodity?: boolean;
  moq?: string;
  priceUsdRef?: number;
}

export interface UniversityItem {
  id: string;
  name: string;
  city: string;
  ranking: string;
  programs: string[];
  tuitionRange: string;
  scholarshipsAvailable: boolean;
  image: string;
  description: string;
  nameI18n?: { en: string; fr: string; ru: string };
  cityI18n?: { en: string; fr: string; ru: string };
  rankingI18n?: { en: string; fr: string; ru: string };
  programsI18n?: { en: string[]; fr: string[]; ru: string[] };
  tuitionRangeI18n?: { en: string; fr: string; ru: string };
  descriptionI18n?: { en: string; fr: string; ru: string };
}

export interface EventItem {
  id: string;
  title: string;
  type: 'Business Forum' | 'Festival' | 'Conference' | 'Networking';
  date: string;
  location: string;
  description: string;
  image: string;
  speakers?: string[];
  isUpcoming: boolean;
  titleI18n?: { en: string; fr: string; ru: string };
  typeI18n?: { en: string; fr: string; ru: string };
  dateI18n?: { en: string; fr: string; ru: string };
  locationI18n?: { en: string; fr: string; ru: string };
  descriptionI18n?: { en: string; fr: string; ru: string };
}

export interface NewsItem {
  id: string;
  title: string;
  category: string;
  date: string;
  readTime: string;
  excerpt: string;
  content: string;
  image: string;
  author: string;
  titleI18n?: { en: string; fr: string; ru: string };
  categoryI18n?: { en: string; fr: string; ru: string };
  dateI18n?: { en: string; fr: string; ru: string };
  readTimeI18n?: { en: string; fr: string; ru: string };
  excerptI18n?: { en: string; fr: string; ru: string };
  contentI18n?: { en: string; fr: string; ru: string };
  authorI18n?: { en: string; fr: string; ru: string };
}

export interface TestimonialItem {
  id: string;
  name: string;
  role: string;
  organization: string;
  country: string;
  quote: string;
  avatar: string;
  rating: number;
  nameI18n?: { en: string; fr: string; ru: string };
  roleI18n?: { en: string; fr: string; ru: string };
  organizationI18n?: { en: string; fr: string; ru: string };
  countryI18n?: { en: string; fr: string; ru: string };
  quoteI18n?: { en: string; fr: string; ru: string };
}

export interface LanguageCourseItem {
  id: string;
  title?: string;
  language: 'English' | 'French' | 'Russian';
  level: string;
  duration: string;
  format: 'Online' | 'In-Person' | 'Hybrid';
  description: string;
  targetAudience: string;
  features: string[];
  icon: string;
  titleI18n?: { en: string; fr: string; ru: string };
  levelI18n?: { en: string; fr: string; ru: string };
  durationI18n?: { en: string; fr: string; ru: string };
  formatI18n?: { en: string; fr: string; ru: string };
  descriptionI18n?: { en: string; fr: string; ru: string };
  targetAudienceI18n?: { en: string; fr: string; ru: string };
  featuresI18n?: { en: string[]; fr: string[]; ru: string[] };
}

export interface ConciergeService {
  id: string;
  title: string;
  description: string;
  features: string[];
  icon: string;
  highlight?: string;
  titleI18n?: { en: string; fr: string; ru: string };
  descriptionI18n?: { en: string; fr: string; ru: string };
  featuresI18n?: { en: string[]; fr: string[]; ru: string[] };
  highlightI18n?: { en: string; fr: string; ru: string };
}
