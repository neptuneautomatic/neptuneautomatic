import React, { useState, useMemo } from 'react';
import { Search, X, Shield, ArrowRight, FileText, Layers, Building2, HelpCircle, BookOpen } from 'lucide-react';
import { Product, Solution, NavPage, ProductCategory } from '../types';
import { PRODUCTS, SOLUTIONS, RESOURCES_LIST, FAQS_LIST, BLOG_POSTS } from '../data/companyData';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectProduct: (product: Product) => void;
  onNavigate: (page: NavPage, extra?: { category?: ProductCategory; accessCategory?: any; solutionId?: string; productId?: string; blogSlug?: string; resourceTab?: string; }) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  onSelectProduct,
  onNavigate
}) => {
  const [query, setQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'products' | 'solutions' | 'blog' | 'resources' | 'faqs'>('all');

  const searchResults = useMemo(() => {
    if (!query.trim()) return { products: [], solutions: [], blogs: [], resources: [], faqs: [] };
    const q = query.toLowerCase();

    const matchedProducts = PRODUCTS.filter(p => 
      p.name.toLowerCase().includes(q) ||
      p.modelCode.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q) ||
      p.features.some(f => f.toLowerCase().includes(q))
    );

    const matchedSolutions = SOLUTIONS.filter(s =>
      s.title.toLowerCase().includes(q) ||
      s.shortDesc.toLowerCase().includes(q) ||
      s.detailedDesc.toLowerCase().includes(q) ||
      s.subComponents.some(sc => sc.toLowerCase().includes(q))
    );

    const matchedBlogs = BLOG_POSTS.filter(b =>
      b.title.toLowerCase().includes(q) ||
      b.excerpt.toLowerCase().includes(q) ||
      b.category.toLowerCase().includes(q) ||
      (b.tags && b.tags.some(t => t.toLowerCase().includes(q)))
    );

    const matchedResources = RESOURCES_LIST.filter(r =>
      r.title.toLowerCase().includes(q) ||
      r.category.toLowerCase().includes(q) ||
      r.description.toLowerCase().includes(q)
    );

    const matchedFaqs = FAQS_LIST.filter(f =>
      f.question.toLowerCase().includes(q) ||
      f.answer.toLowerCase().includes(q) ||
      f.category.toLowerCase().includes(q)
    );

    return {
      products: matchedProducts,
      solutions: matchedSolutions,
      blogs: matchedBlogs,
      resources: matchedResources,
      faqs: matchedFaqs
    };
  }, [query]);

  if (!isOpen) return null;

  const totalResults = 
    searchResults.products.length + 
    searchResults.solutions.length + 
    searchResults.blogs.length + 
    searchResults.resources.length + 
    searchResults.faqs.length;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-150">
      
      {/* Background Click to Dismiss */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* Modal Container */}
      <div className="relative w-full max-w-3xl bg-white border border-slate-200 rounded-sm shadow-2xl overflow-hidden z-10">
        
        {/* Search Input Bar */}
        <div className="relative flex items-center px-4 py-3.5 border-b border-slate-200 bg-white">
          <Search className="w-5 h-5 text-[#00a8e8] mr-3 shrink-0" />
          <input
            id="site-search-input"
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search boom barriers, bollards, FASTag parking, specs..."
            className="w-full bg-transparent text-[#0a1d37] font-medium placeholder-slate-400 text-sm sm:text-base focus:outline-none"
            autoFocus
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="text-xs text-slate-600 hover:text-[#0a1d37] mr-2 px-1.5 py-0.5 rounded-sm bg-slate-100 hover:bg-slate-200"
            >
              Clear
            </button>
          )}
          <button
            onClick={onClose}
            className="p-1 rounded-sm text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center gap-1.5 px-4 py-2 border-b border-slate-200 bg-slate-50 text-xs overflow-x-auto">
          <span className="text-slate-500 font-bold mr-1">Filter:</span>
          {(['all', 'products', 'solutions', 'blog', 'resources', 'faqs'] as const).map((filter) => (
            <button
              key={filter}
              onClick={() => setSelectedFilter(filter)}
              className={`px-2.5 py-1 rounded-sm capitalize font-bold transition-colors ${
                selectedFilter === filter
                  ? 'bg-[#0a1d37] text-white'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200'
              }`}
            >
              {filter === 'blog' ? 'Blog' : filter}
            </button>
          ))}
        </div>

        {/* Results Body */}
        <div className="max-h-[60vh] overflow-y-auto p-4 space-y-4">
          
          {!query.trim() && (
            <div className="py-8 text-center text-slate-500 text-xs sm:text-sm">
              <p className="font-bold text-[#0a1d37]">Popular Search Queries:</p>
              <div className="mt-3 flex flex-wrap justify-center gap-2">
                {[
                  'TurboPass High-Speed Barrier',
                  'K12 Crash Bollard',
                  'FASTag Parking System',
                  'Hydraulic Road Blocker',
                  'Heavy Industrial Sliding Gate',
                  'Ultrasonic Guidance Sensor'
                ].map((term) => (
                  <button
                    key={term}
                    onClick={() => setQuery(term)}
                    className="px-2.5 py-1 rounded-sm bg-slate-100 hover:bg-slate-200 text-[#0a1d37] text-xs font-semibold border border-slate-200 transition-colors"
                  >
                    {term}
                  </button>
                ))}
              </div>
            </div>
          )}

          {query.trim() && totalResults === 0 && (
            <div className="py-12 text-center text-slate-500">
              <p className="text-sm font-bold text-[#0a1d37]">No matching results found for "{query}"</p>
              <p className="text-xs mt-1 text-slate-500">Try searching for keywords like "barrier", "bollard", "parking", or "datasheet".</p>
            </div>
          )}

          {/* Products Results */}
          {(selectedFilter === 'all' || selectedFilter === 'products') && searchResults.products.length > 0 && (
            <div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#00a8e8] mb-2 flex items-center gap-1.5">
                <Shield className="w-3.5 h-3.5" />
                <span>Products ({searchResults.products.length})</span>
              </div>
              <div className="space-y-2">
                {searchResults.products.map((product) => (
                  <div
                    key={product.id}
                    onClick={() => {
                      if (product.accessCategory) {
                        onNavigate('product-page', { productId: product.id });
                      } else {
                        onSelectProduct(product);
                      }
                      onClose();
                    }}
                    className="p-3 rounded-sm bg-slate-50 hover:bg-white border border-slate-200 hover:border-[#00a8e8] cursor-pointer transition-all flex items-center justify-between group shadow-2xs"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-sm bg-white overflow-hidden border border-slate-200 shrink-0">
                        <img 
                          src={product.image} 
                          alt={product.name} 
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform" 
                        />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="text-sm font-bold text-[#0a1d37] group-hover:text-[#00a8e8] transition-colors">
                            {product.name}
                          </h4>
                          <span className="text-[10px] font-mono px-1.5 py-0.5 rounded-sm bg-white text-[#00a8e8] font-bold border border-slate-200">
                            {product.modelCode}
                          </span>
                        </div>
                        <p className="text-xs text-slate-500 line-clamp-1 mt-0.5">
                          {product.tagline}
                        </p>
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-[#00a8e8] group-hover:translate-x-0.5 transition-all" />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Solutions Results */}
          {(selectedFilter === 'all' || selectedFilter === 'solutions') && searchResults.solutions.length > 0 && (
            <div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#00a8e8] mb-2 flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5" />
                <span>Solutions ({searchResults.solutions.length})</span>
              </div>
              <div className="space-y-2">
                {searchResults.solutions.map((sol) => (
                  <div
                    key={sol.id}
                    onClick={() => {
                      onNavigate('solutions', { solutionId: sol.id });
                      onClose();
                    }}
                    className="p-3 rounded-sm bg-slate-50 hover:bg-white border border-slate-200 hover:border-[#00a8e8] cursor-pointer transition-all flex items-center justify-between group shadow-2xs"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-mono font-bold text-[#00a8e8]">{sol.number}</span>
                        <h4 className="text-sm font-bold text-[#0a1d37] group-hover:text-[#00a8e8] transition-colors">
                          {sol.title}
                        </h4>
                      </div>
                      <p className="text-xs text-slate-500 line-clamp-1 mt-0.5">
                        {sol.shortDesc}
                      </p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-[#00a8e8] group-hover:translate-x-0.5 transition-all" />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Blog Results */}
          {(selectedFilter === 'all' || selectedFilter === 'blog') && searchResults.blogs.length > 0 && (
            <div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#00a8e8] mb-2 flex items-center gap-1.5">
                <BookOpen className="w-3.5 h-3.5" />
                <span>Engineering Blog & Articles ({searchResults.blogs.length})</span>
              </div>
              <div className="space-y-2">
                {searchResults.blogs.map((blog) => (
                  <div
                    key={blog.id}
                    onClick={() => {
                      onNavigate('blog-post', { blogSlug: blog.slug });
                      onClose();
                    }}
                    className="p-3 rounded-sm bg-slate-50 hover:bg-white border border-slate-200 hover:border-[#00a8e8] cursor-pointer transition-all flex items-center justify-between group shadow-2xs"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-mono px-1.5 py-0.5 rounded-xs bg-blue-50 text-[#1D438A] font-bold border border-blue-200">
                          {blog.category}
                        </span>
                        <h4 className="text-sm font-bold text-[#0a1d37] group-hover:text-[#00a8e8] transition-colors line-clamp-1">
                          {blog.title}
                        </h4>
                      </div>
                      <p className="text-xs text-slate-500 line-clamp-1 mt-1">
                        {blog.excerpt}
                      </p>
                      <div className="flex items-center gap-2 mt-1 text-[10px] text-slate-400 font-mono">
                        <span>{blog.date}</span>
                        <span>•</span>
                        <span>{blog.readTime}</span>
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-[#00a8e8] group-hover:translate-x-0.5 transition-all shrink-0 ml-2" />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Resources Results */}
          {(selectedFilter === 'all' || selectedFilter === 'resources') && searchResults.resources.length > 0 && (
            <div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#00a8e8] mb-2 flex items-center gap-1.5">
                <FileText className="w-3.5 h-3.5" />
                <span>Datasheets & Downloads ({searchResults.resources.length})</span>
              </div>
              <div className="space-y-2">
                {searchResults.resources.map((res) => (
                  <div
                    key={res.id}
                    onClick={() => {
                      onNavigate('resources');
                      onClose();
                    }}
                    className="p-3 rounded-sm bg-slate-50 hover:bg-white border border-slate-200 hover:border-[#00a8e8] cursor-pointer transition-all flex items-center justify-between group shadow-2xs"
                  >
                    <div>
                      <h4 className="text-sm font-bold text-[#0a1d37] group-hover:text-[#00a8e8] transition-colors">
                        {res.title}
                      </h4>
                      <div className="flex items-center gap-2 mt-1 text-[11px] text-slate-500">
                        <span className="text-[#00a8e8] font-bold">{res.category}</span>
                        <span>•</span>
                        <span>{res.fileSize}</span>
                        <span>•</span>
                        <span>{res.fileType}</span>
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-[#00a8e8] group-hover:translate-x-0.5 transition-all" />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* FAQs Results */}
          {(selectedFilter === 'all' || selectedFilter === 'faqs') && searchResults.faqs.length > 0 && (
            <div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#00a8e8] mb-2 flex items-center gap-1.5">
                <HelpCircle className="w-3.5 h-3.5" />
                <span>Technical FAQs ({searchResults.faqs.length})</span>
              </div>
              <div className="space-y-2">
                {searchResults.faqs.map((faq) => (
                  <div
                    key={faq.id}
                    onClick={() => {
                      onNavigate('resources');
                      onClose();
                    }}
                    className="p-3 rounded-sm bg-slate-50 hover:bg-white border border-slate-200 hover:border-[#00a8e8] cursor-pointer transition-all group shadow-2xs"
                  >
                    <h4 className="text-sm font-bold text-[#0a1d37] group-hover:text-[#00a8e8] transition-colors">
                      {faq.question}
                    </h4>
                    <p className="text-xs text-slate-500 line-clamp-2 mt-1">
                      {faq.answer}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

        {/* Modal Footer */}
        <div className="px-4 py-2.5 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-[11px] text-slate-500 font-semibold">
          <span>Tip: Press ESC to close</span>
          <span>Neptune Automatic Security Intelligence</span>
        </div>

      </div>
    </div>
  );
};
