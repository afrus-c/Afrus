import { ConciergeService, EventItem, LanguageCourseItem, NewsItem, OpportunityItem, TestimonialItem, UniversityItem } from '../types';

const records = <T,>(modules: Record<string, unknown>): T[] =>
  Object.values(modules).map((module) => module as T);

export interface CmsHeroSlide {
  id: string; image: string; path: string; order?: number;
  category: string; headline: string; description: string; ctaText: string;
  categoryI18n?: Record<'en' | 'fr' | 'ru', string>;
  headlineI18n?: Record<'en' | 'fr' | 'ru', string>;
  descriptionI18n?: Record<'en' | 'fr' | 'ru', string>;
  ctaTextI18n?: Record<'en' | 'fr' | 'ru', string>;
}
export interface CmsPartner { id: string; name: string; logoText: string; order?: number; nameI18n?: Record<'en' | 'fr' | 'ru', string> }
const orderedRecords = <T extends { order?: number }>(modules: Record<string, unknown>): T[] =>
  records<T>(modules).sort((a, b) => (a.order || 0) - (b.order || 0));

export const CMS_EVENTS = records<EventItem>(
  import.meta.glob('../content/events/*.json', { eager: true, import: 'default' })
);

export const CMS_NEWS = records<NewsItem>(
  import.meta.glob('../content/news/*.json', { eager: true, import: 'default' })
);

export const CMS_UNIVERSITIES = records<UniversityItem>(
  import.meta.glob('../content/universities/*.json', { eager: true, import: 'default' })
);

export const CMS_OPPORTUNITIES = records<OpportunityItem>(
  import.meta.glob('../content/opportunities/*.json', { eager: true, import: 'default' })
);

export const CMS_CONCIERGE_SERVICES = records<ConciergeService>(
  import.meta.glob('../content/concierge-services/*.json', { eager: true, import: 'default' })
);

export const CMS_LANGUAGE_COURSES = records<LanguageCourseItem>(
  import.meta.glob('../content/language-courses/*.json', { eager: true, import: 'default' })
);

export const CMS_TESTIMONIALS = records<TestimonialItem>(
  import.meta.glob('../content/testimonials/*.json', { eager: true, import: 'default' })
);

export const CMS_HOME_HERO = orderedRecords<CmsHeroSlide>(
  import.meta.glob('../content/home-hero/*.json', { eager: true, import: 'default' })
);

export const CMS_QUICK_SERVICES = orderedRecords<import('../types').ServiceItem>(
  import.meta.glob('../content/quick-services/*.json', { eager: true, import: 'default' })
);

export const CMS_PARTNERS = orderedRecords<CmsPartner>(
  import.meta.glob('../content/partners/*.json', { eager: true, import: 'default' })
);
