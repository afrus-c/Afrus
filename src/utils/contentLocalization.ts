import { Language } from '../i18n/translations';
import { ConciergeService, EventItem, LanguageCourseItem, NewsItem, OpportunityItem, ServiceItem, TestimonialItem, UniversityItem } from '../types';
import { CMS_CONCIERGE_SERVICES, CMS_EVENTS, CMS_HOME_HERO, CMS_LANGUAGE_COURSES, CMS_NEWS, CMS_OPPORTUNITIES, CMS_QUICK_SERVICES, CMS_TESTIMONIALS, CMS_UNIVERSITIES } from '../data/editorialContent';

type Locale = 'en' | 'fr' | 'ru';
const localeOf = (language: Language): Locale => language.toLowerCase() as Locale;

export const getLocalizedHeroSlides = (language: Language) => {
  const locale = localeOf(language);
  return CMS_HOME_HERO.map((item) => ({ ...item, category: item.categoryI18n?.[locale] || item.category, headline: item.headlineI18n?.[locale] || item.headline, description: item.descriptionI18n?.[locale] || item.description, ctaText: item.ctaTextI18n?.[locale] || item.ctaText }));
};

export const getLocalizedQuickServices = (language: Language): ServiceItem[] => {
  const locale = localeOf(language);
  return CMS_QUICK_SERVICES.map((item) => ({ ...item, title: item.titleI18n?.[locale] || item.title, description: item.descriptionI18n?.[locale] || item.description, badge: item.badgeI18n?.[locale] || item.badge, linkText: item.linkTextI18n?.[locale] || item.linkText }));
};

export const getLocalizedOpportunities = (language: Language): OpportunityItem[] => {
  const locale = localeOf(language);
  return CMS_OPPORTUNITIES.map((item) => ({ ...item, title: item.titleI18n?.[locale] || item.title, location: item.locationI18n?.[locale] || item.location, deadline: item.deadlineI18n?.[locale] || item.deadline, description: item.descriptionI18n?.[locale] || item.description, benefits: item.benefitsI18n?.[locale] || item.benefits, requirements: item.requirementsI18n?.[locale] || item.requirements }));
};

export const getLocalizedUniversities = (language: Language): UniversityItem[] => {
  const locale = localeOf(language);
  return CMS_UNIVERSITIES.map((item) => ({ ...item, name: item.nameI18n?.[locale] || item.name, city: item.cityI18n?.[locale] || item.city, ranking: item.rankingI18n?.[locale] || item.ranking, programs: item.programsI18n?.[locale] || item.programs, tuitionRange: item.tuitionRangeI18n?.[locale] || item.tuitionRange, description: item.descriptionI18n?.[locale] || item.description }));
};

export const getLocalizedConciergeServices = (language: Language): ConciergeService[] => {
  const locale = localeOf(language);
  return CMS_CONCIERGE_SERVICES.map((item) => ({ ...item, title: item.titleI18n?.[locale] || item.title, description: item.descriptionI18n?.[locale] || item.description, features: item.featuresI18n?.[locale] || item.features, highlight: item.highlightI18n?.[locale] || item.highlight }));
};

export const getLocalizedLanguageCourses = (language: Language): LanguageCourseItem[] => {
  const locale = localeOf(language);
  return CMS_LANGUAGE_COURSES.map((item) => ({ ...item, title: item.titleI18n?.[locale] || item.title, level: item.levelI18n?.[locale] || item.level, duration: item.durationI18n?.[locale] || item.duration, format: (item.formatI18n?.[locale] || item.format) as LanguageCourseItem['format'], description: item.descriptionI18n?.[locale] || item.description, targetAudience: item.targetAudienceI18n?.[locale] || item.targetAudience, features: item.featuresI18n?.[locale] || item.features }));
};

export const getLocalizedNews = (language: Language): NewsItem[] => {
  const locale = localeOf(language);
  return CMS_NEWS.map((item) => ({ ...item, title: item.titleI18n?.[locale] || item.title, category: item.categoryI18n?.[locale] || item.category, date: item.dateI18n?.[locale] || item.date, readTime: item.readTimeI18n?.[locale] || item.readTime, excerpt: item.excerptI18n?.[locale] || item.excerpt, content: item.contentI18n?.[locale] || item.content, author: item.authorI18n?.[locale] || item.author }));
};

export const getLocalizedEvents = (language: Language): EventItem[] => {
  const locale = localeOf(language);
  return CMS_EVENTS.map((item) => ({ ...item, title: item.titleI18n?.[locale] || item.title, type: (item.typeI18n?.[locale] || item.type) as EventItem['type'], date: item.dateI18n?.[locale] || item.date, location: item.locationI18n?.[locale] || item.location, description: item.descriptionI18n?.[locale] || item.description }));
};

export const getLocalizedTestimonials = (language: Language): TestimonialItem[] => {
  const locale = localeOf(language);
  return CMS_TESTIMONIALS.map((item) => ({ ...item, name: item.nameI18n?.[locale] || item.name, role: item.roleI18n?.[locale] || item.role, organization: item.organizationI18n?.[locale] || item.organization, country: item.countryI18n?.[locale] || item.country, quote: item.quoteI18n?.[locale] || item.quote }));
};
