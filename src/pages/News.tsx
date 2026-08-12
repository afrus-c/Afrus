import React, { useState } from 'react';
import { LatestNews } from '../components/LatestNews';
import { NewsHero } from '../components/NewsHero';
import { NewsItem } from '../types';

interface NewsProps {
  onSelectNews: (news: NewsItem) => void;
}

export const News: React.FC<NewsProps> = ({ onSelectNews }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  return (
    <div className="pb-16 space-y-12 bg-slate-950 text-slate-100">
      <NewsHero onCategorySelect={(cat) => setSelectedCategory(cat)} />
      <LatestNews onSelectNews={onSelectNews} selectedCategory={selectedCategory} />
    </div>
  );
};
