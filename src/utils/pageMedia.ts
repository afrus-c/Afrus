import pageMedia from '../content/page-media.json';

export type PageMediaKey = keyof typeof pageMedia;

export const getPageHeroImage = (page: PageMediaKey, index: number, fallback: string): string =>
  pageMedia[page]?.[index]?.trim() || fallback;
