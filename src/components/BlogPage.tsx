import React, { useState, useMemo, useRef, useEffect } from 'react';
import { 
  Search, 
  BookOpen, 
  Clock, 
  Calendar, 
  ArrowRight, 
  Tag, 
  X, 
  Filter, 
  ChevronRight, 
  ShieldCheck, 
  Car, 
  Layers, 
  Users, 
  Cpu, 
  Zap, 
  Award, 
  CheckCircle2, 
  Sparkles,
  HelpCircle,
  Share2,
  ExternalLink
} from 'lucide-react';
import { BlogPost } from '../types';
import { BLOG_POSTS } from '../data/blogData';
import { SubpageHeader } from './SubpageHeader';

interface BlogPageProps {
  onNavigateHome: () => void;
  onNavigateToBlogPost: (slug: string) => void;
  onOpenQuoteModal: (subject?: string) => void;
}

export const BlogPage: React.FC<BlogPageProps> = ({
  onNavigateHome,
  onNavigateToBlogPost,
  onOpenQuoteModal,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isSearchFocused, setIsSearchFocused] = useState<boolean>(false);
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const searchContainerRef = useRef<HTMLDivElement>(null);

  // Extract all unique categories and counts
  const categoriesWithCounts = useMemo(() => {
    const counts: Record<string, number> = { All: BLOG_POSTS.length };
    BLOG_POSTS.forEach((post) => {
      counts[post.category] = (counts[post.category] || 0) + 1;
    });
    return counts;
  }, []);

  const categories = useMemo(() => {
    return Object.keys(categoriesWithCounts);
  }, [categoriesWithCounts]);

  // Extract all unique tags
  const allTags = useMemo(() => {
    const tagSet = new Set<string>();
    BLOG_POSTS.forEach((post) => {
      post.tags?.forEach((tag) => tagSet.add(tag));
    });
    return Array.from(tagSet);
  }, []);

  // Category Icon Mapper
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Perimeter Security':
        return ShieldCheck;
      case 'Parking Technology':
        return Car;
      case 'Perimeter Automation':
        return Layers;
      case 'Pedestrian Access':
        return Users;
      case 'Security Standards':
        return Award;
      case 'Safety & Hardware':
        return Zap;
      case 'Industrial IoT':
        return Cpu;
      default:
        return BookOpen;
    }
  };

  // Filtered Blog Posts
  const filteredPosts = useMemo(() => {
    return BLOG_POSTS.filter((post) => {
      const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;
      const matchesTag = !selectedTag || (post.tags && post.tags.includes(selectedTag));
      const query = searchQuery.trim().toLowerCase();
      const matchesSearch = !query || 
        post.title.toLowerCase().includes(query) ||
        post.excerpt.toLowerCase().includes(query) ||
        post.category.toLowerCase().includes(query) ||
        (post.tags && post.tags.some(t => t.toLowerCase().includes(query))) ||
        (post.faqs && post.faqs.some(f => f.question.toLowerCase().includes(query) || f.answer.toLowerCase().includes(query)));

      return matchesCategory && matchesTag && matchesSearch;
    });
  }, [selectedCategory, selectedTag, searchQuery]);

  // Auto-suggest matches for live search dropdown
  const suggestions = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    if (!query) return [];
    return BLOG_POSTS.filter((post) => 
      post.title.toLowerCase().includes(query) ||
      post.category.toLowerCase().includes(query) ||
      (post.tags && post.tags.some(t => t.toLowerCase().includes(query)))
    ).slice(0, 5);
  }, [searchQuery]);

  // Close auto-suggest dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(e.target as Node)) {
        setIsSearchFocused(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelectSuggestion = (post: BlogPost) => {
    setIsSearchFocused(false);
    onNavigateToBlogPost(post.slug);
  };

  const clearFilters = () => {
    setSelectedCategory('All');
    setSelectedTag(null);
    setSearchQuery('');
  };

  // Featured post is the first one matching, or first overall
  const featuredPost = filteredPosts.length > 0 ? filteredPosts[0] : null;
  const standardPosts = filteredPosts.length > 1 ? filteredPosts.slice(1) : [];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 pb-20">
      
      {/* Subpage Header */}
      <SubpageHeader
        page="blog"
        title="Engineering & Technical Blogs"
        subtitle="In-depth technical papers, crash test standards, FASTag IoT guides, and perimeter architecture insights from Neptune factory engineers."
        badge="ENGINEERING KNOWLEDGE HUB"
        onNavigateHome={onNavigateHome}
        onOpenQuoteModal={() => onOpenQuoteModal ? onOpenQuoteModal('Blog Inquiry') : undefined}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6">
        
        {/* Search Bar with Live Auto-Suggest */}
        <div 
          ref={searchContainerRef}
          className="relative max-w-3xl mx-auto bg-white rounded-2xl p-2 sm:p-2.5 shadow-xl border border-slate-200/90 z-30"
        >
          <div className="relative flex items-center">
            <div className="pl-3 sm:pl-4 text-[#1D438A]">
              <Search className="w-5 h-5 text-slate-400" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => setIsSearchFocused(true)}
              placeholder="Search engineering articles by topic, e.g. 'Bollards', 'FASTag', 'BLDC', 'Drainage', 'ASTM'..."
              className="w-full px-3 sm:px-4 py-2.5 text-xs sm:text-sm text-slate-900 placeholder-slate-400 bg-transparent focus:outline-none"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="p-1 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100 mr-2"
                aria-label="Clear Search"
              >
                <X className="w-4 h-4" />
              </button>
            )}
            <button
              type="button"
              className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-[#1D438A] to-[#00A8E8] text-white font-bold text-xs shadow-xs"
            >
              <span>Search</span>
            </button>
          </div>

          {/* Auto-suggest Dropdown */}
          {isSearchFocused && suggestions.length > 0 && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl border border-slate-200 shadow-2xl overflow-hidden z-50 animate-in fade-in-50 duration-150">
              <div className="px-4 py-2 bg-slate-50 border-b border-slate-100 text-[11px] font-bold uppercase tracking-wider text-slate-500 flex items-center justify-between">
                <span>Suggested Technical Articles</span>
                <span className="text-[#00A8E8] font-mono text-[10px]">{suggestions.length} matches</span>
              </div>
              <div className="divide-y divide-slate-100 max-h-80 overflow-y-auto">
                {suggestions.map((post) => (
                  <button
                    key={post.id}
                    onClick={() => handleSelectSuggestion(post)}
                    className="w-full text-left px-4 py-3 hover:bg-blue-50/60 transition-colors flex items-center justify-between gap-3 group cursor-pointer"
                  >
                    <div className="min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-50 text-[#1D438A] border border-blue-100">
                          {post.category}
                        </span>
                        <span className="text-[10px] text-slate-400 font-mono">
                          {post.readTime}
                        </span>
                      </div>
                      <div className="text-xs sm:text-sm font-bold text-slate-800 group-hover:text-[#1D438A] truncate">
                        {post.title}
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-[#1D438A] group-hover:translate-x-1 transition-all shrink-0" />
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Main 2-Column Layout: Left Vertical Category Sidebar + Right Articles Content */}
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT COLUMN: Vertical Category Filter Sidebar */}
          <aside className="lg:col-span-4 lg:sticky lg:top-28 space-y-6">
            
            {/* Category Filter Rail Card */}
            <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm p-5 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-blue-50 border border-blue-200 flex items-center justify-center text-[#1D438A]">
                    <Filter className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="font-display text-sm font-extrabold text-[#0a1d37] uppercase tracking-wider">
                      Categories
                    </h3>
                    <p className="text-[10px] text-slate-400">Filter by engineering field</p>
                  </div>
                </div>
                {(selectedCategory !== 'All' || selectedTag || searchQuery) && (
                  <button
                    onClick={clearFilters}
                    className="text-[11px] font-bold text-[#D7282F] hover:underline cursor-pointer flex items-center gap-1"
                  >
                    <span>Reset</span>
                    <X className="w-3 h-3" />
                  </button>
                )}
              </div>

              {/* Vertical Category Button List */}
              <div className="space-y-1.5">
                {categories.map((cat) => {
                  const isActive = selectedCategory === cat;
                  const Icon = getCategoryIcon(cat);
                  const count = categoriesWithCounts[cat] || 0;
                  return (
                    <button
                      key={cat}
                      onClick={() => {
                        setSelectedCategory(cat);
                        setSelectedTag(null);
                      }}
                      className={`w-full text-left px-3.5 py-2.5 rounded-xl border transition-all duration-150 flex items-center justify-between group cursor-pointer ${
                        isActive
                          ? 'bg-[#071526] text-white border-[#1D438A] shadow-md scale-[1.01]'
                          : 'bg-white hover:bg-slate-50 text-slate-700 border-transparent hover:border-slate-200'
                      }`}
                    >
                      <div className="flex items-center gap-2.5 min-w-0 pr-2">
                        <Icon className={`w-4 h-4 shrink-0 transition-colors ${
                          isActive ? 'text-[#00A8E8]' : 'text-slate-400 group-hover:text-[#1D438A]'
                        }`} />
                        <span className={`text-xs font-bold truncate ${
                          isActive ? 'text-white' : 'text-slate-700 group-hover:text-slate-900'
                        }`}>
                          {cat === 'All' ? 'All Engineering Blogs' : cat}
                        </span>
                      </div>
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-mono font-bold shrink-0 ${
                        isActive
                          ? 'bg-blue-900/60 text-cyan-200 border border-blue-700/50'
                          : 'bg-slate-100 text-slate-500 group-hover:bg-blue-50 group-hover:text-[#1D438A]'
                      }`}>
                        {count}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Popular Engineering Tags Card */}
            <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm p-5 space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#1D438A]">
                <Tag className="w-3.5 h-3.5 text-[#00A8E8]" />
                <span>Featured Topic Tags</span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {allTags.map((tag) => {
                  const isTagActive = selectedTag === tag;
                  return (
                    <button
                      key={tag}
                      onClick={() => setSelectedTag(isTagActive ? null : tag)}
                      className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all cursor-pointer ${
                        isTagActive
                          ? 'bg-[#1D438A] text-white shadow-xs'
                          : 'bg-slate-100 hover:bg-blue-50 text-slate-600 hover:text-[#1D438A] border border-slate-200/80'
                      }`}
                    >
                      #{tag}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Factory Consultant Callout Box */}
            <div className="rounded-2xl bg-gradient-to-br from-[#071526] to-[#0d2340] text-white p-5 space-y-3 shadow-md border border-slate-800">
              <div className="w-9 h-9 rounded-xl bg-blue-500/15 border border-blue-400/30 flex items-center justify-center text-[#00A8E8]">
                <Sparkles className="w-4 h-4" />
              </div>
              <div className="space-y-1">
                <h4 className="text-xs font-extrabold uppercase tracking-wider text-cyan-300">
                  Tender & Spec Consulting
                </h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Need custom ASTM crash calculations, civil foundation drawings, or tender specifications?
                </p>
              </div>
              <button
                onClick={() => onOpenQuoteModal('Blog Technical Consultation')}
                className="w-full py-2 px-3 rounded-xl bg-[#00A8E8] hover:bg-[#0092ca] text-slate-950 font-extrabold text-xs transition-colors cursor-pointer flex items-center justify-center gap-1.5 shadow-xs"
              >
                <span>Request Chief Engineer Review</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>

          </aside>

          {/* RIGHT COLUMN: Blog Cards Grid */}
          <main className="lg:col-span-8 space-y-8">
            
            {/* Filter Status Bar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-200">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                  Showing:
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-blue-50 text-[#1D438A] border border-blue-200 text-xs font-bold">
                  {selectedCategory === 'All' ? 'All Articles' : selectedCategory}
                </span>
                {selectedTag && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-cyan-50 text-[#0083B0] border border-cyan-200 text-xs font-bold">
                    #{selectedTag}
                    <X className="w-3 h-3 cursor-pointer" onClick={() => setSelectedTag(null)} />
                  </span>
                )}
                {searchQuery && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-800 border border-amber-200 text-xs font-bold">
                    "{searchQuery}"
                    <X className="w-3 h-3 cursor-pointer" onClick={() => setSearchQuery('')} />
                  </span>
                )}
              </div>
              <div className="text-xs font-mono font-bold text-slate-500">
                {filteredPosts.length} {filteredPosts.length === 1 ? 'Article' : 'Articles'} Available
              </div>
            </div>

            {/* Empty State */}
            {filteredPosts.length === 0 && (
              <div className="text-center py-16 bg-white rounded-2xl border border-slate-200 p-8 space-y-4">
                <div className="w-12 h-12 rounded-full bg-blue-50 text-[#1D438A] flex items-center justify-center mx-auto">
                  <BookOpen className="w-6 h-6" />
                </div>
                <h3 className="font-display text-lg font-bold text-slate-900">
                  No engineering articles matched your search
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 max-w-md mx-auto">
                  Try searching with generic terms such as "Bollard", "FASTag", "Crash", "Gate", or reset your category filter.
                </p>
                <button
                  onClick={clearFilters}
                  className="px-4 py-2 rounded-xl bg-[#1D438A] text-white font-bold text-xs hover:bg-[#15346D] transition-colors cursor-pointer"
                >
                  Reset All Filters
                </button>
              </div>
            )}

            {/* Featured Post Card (Hero Spotlight) */}
            {featuredPost && (
              <article 
                onClick={() => onNavigateToBlogPost(featuredPost.slug)}
                className="bg-white rounded-3xl border border-slate-200/90 shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group cursor-pointer flex flex-col md:flex-row items-stretch"
              >
                <div className="md:w-5/12 relative min-h-[240px] md:min-h-[340px] bg-slate-900 overflow-hidden shrink-0">
                  <img 
                    src={featuredPost.image} 
                    alt={featuredPost.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-95"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent md:hidden" />
                  <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-[#1D438A]/90 backdrop-blur-md text-white font-bold text-[10px] tracking-wider uppercase border border-blue-400/40">
                    FEATURED ARTICLE
                  </span>
                </div>

                <div className="p-6 sm:p-8 md:w-7/12 flex flex-col justify-between space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 text-xs text-slate-500">
                      <span className="px-2.5 py-0.5 rounded-md bg-blue-50 text-[#1D438A] font-bold text-[10px] border border-blue-100">
                        {featuredPost.category}
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1 font-mono text-[11px]">
                        <Clock className="w-3 h-3 text-slate-400" />
                        {featuredPost.readTime}
                      </span>
                    </div>

                    <h2 className="font-display text-xl sm:text-2xl font-extrabold text-[#0a1d37] group-hover:text-[#1D438A] transition-colors leading-tight">
                      {featuredPost.title}
                    </h2>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed line-clamp-3">
                      {featuredPost.excerpt}
                    </p>

                    {/* Topic-specific FAQs teaser badge */}
                    {featuredPost.faqs && featuredPost.faqs.length > 0 && (
                      <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-[11px] font-bold">
                        <HelpCircle className="w-3.5 h-3.5 text-emerald-600" />
                        <span>Includes {featuredPost.faqs.length} Topic FAQs</span>
                      </div>
                    )}
                  </div>

                  <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                    {featuredPost.author && (
                      <div className="flex items-center gap-2.5">
                        {featuredPost.author.avatar && (
                          <img 
                            src={featuredPost.author.avatar} 
                            alt={featuredPost.author.name}
                            className="w-8 h-8 rounded-full object-cover border border-slate-200"
                          />
                        )}
                        <div>
                          <div className="text-xs font-bold text-slate-800">
                            {featuredPost.author.name}
                          </div>
                          <div className="text-[10px] text-slate-400 truncate max-w-[160px] sm:max-w-[220px]">
                            {featuredPost.author.role}
                          </div>
                        </div>
                      </div>
                    )}

                    <div className="flex items-center gap-1 text-xs font-extrabold text-[#1D438A] group-hover:text-[#00A8E8] transition-colors shrink-0">
                      <span>Read Full Article</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>
              </article>
            )}

            {/* Standard Posts Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {standardPosts.map((post) => (
                <article
                  key={post.id}
                  onClick={() => onNavigateToBlogPost(post.slug)}
                  className="bg-white rounded-2xl border border-slate-200/90 shadow-xs hover:shadow-xl hover:border-blue-300 transition-all duration-300 flex flex-col justify-between overflow-hidden group cursor-pointer"
                >
                  <div className="relative h-48 bg-slate-900 overflow-hidden">
                    <img 
                      src={post.image} 
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90"
                    />
                    <div className="absolute top-3 left-3 flex items-center gap-2">
                      <span className="px-2.5 py-1 rounded-md bg-black/75 backdrop-blur-sm text-white text-[10px] font-bold">
                        {post.category}
                      </span>
                    </div>
                    {post.faqs && post.faqs.length > 0 && (
                      <span className="absolute bottom-3 right-3 px-2 py-0.5 rounded-full bg-white/90 backdrop-blur-sm text-slate-900 text-[10px] font-bold shadow-xs flex items-center gap-1">
                        <HelpCircle className="w-3 h-3 text-[#1D438A]" />
                        <span>{post.faqs.length} FAQs</span>
                      </span>
                    )}
                  </div>

                  <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between space-y-4">
                    <div className="space-y-2">
                      <div className="flex items-center gap-3 text-xs text-slate-400">
                        <span className="flex items-center gap-1 font-mono text-[11px]">
                          <Calendar className="w-3 h-3" />
                          {post.date}
                        </span>
                        <span>•</span>
                        <span className="flex items-center gap-1 font-mono text-[11px]">
                          <Clock className="w-3 h-3" />
                          {post.readTime}
                        </span>
                      </div>

                      <h3 className="font-display text-base font-extrabold text-[#0a1d37] group-hover:text-[#1D438A] transition-colors line-clamp-2 leading-snug">
                        {post.title}
                      </h3>

                      <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                        {post.excerpt}
                      </p>

                      {/* Tag Chips */}
                      {post.tags && post.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1 pt-1">
                          {post.tags.slice(0, 3).map((tag, tIdx) => (
                            <span key={tIdx} className="text-[10px] text-slate-500 bg-slate-100 px-2 py-0.5 rounded-md">
                              #{tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>

                    <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                      <span className="font-bold text-slate-700 text-[11px]">
                        By {post.author?.name || 'Neptune Engineering'}
                      </span>
                      <div className="flex items-center gap-1 font-bold text-[#1D438A] group-hover:text-[#00A8E8] transition-colors">
                        <span>Read Article</span>
                        <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>

          </main>

        </div>

      </div>

    </div>
  );
};
