import React, { useState, useMemo } from 'react';
import { 
  Shield, 
  Search, 
  ArrowRight, 
  FileText, 
  Filter, 
  Layers, 
  CheckCircle2, 
  ExternalLink,
  ChevronDown,
  ChevronUp,
  Users,
  Car,
  AlertOctagon,
  Zap,
  SlidersHorizontal,
  Cpu,
  Sparkles,
  Lock
} from 'lucide-react';
import { Product, ProductCategory } from '../types';
import { PRODUCTS } from '../data/companyData';

interface ProductCatalogProps {
  initialCategory?: ProductCategory | 'All';
  onSelectProduct: (product: Product) => void;
  onOpenQuoteModal: (productName: string) => void;
  onNavigateToProductPage?: (productId: string) => void;
}

interface CategoryMeta {
  name: ProductCategory | 'All';
  label: string;
  icon: React.ElementType;
}

export const ProductCatalog: React.FC<ProductCatalogProps> = ({
  initialCategory = 'All',
  onSelectProduct,
  onOpenQuoteModal,
  onNavigateToProductPage
}) => {
  const [activeCategory, setActiveCategory] = useState<ProductCategory | 'All'>(initialCategory);
  const [searchQuery, setSearchQuery] = useState('');
  const [showAllProducts, setShowAllProducts] = useState(false);

  const categoryMetaList: CategoryMeta[] = [
    { name: 'All', label: 'All Products', icon: Sparkles },
    { name: 'Boom Barriers', label: 'Boom Barriers', icon: Shield },
    { name: 'Automatic Bollards', label: 'Bollards', icon: Lock },
    { name: 'Road Blockers', label: 'Road Blockers', icon: AlertOctagon },
    { name: 'Tyre Killers', label: 'Tyre Killers', icon: Zap },
    { name: 'Pedestrian Access', label: 'Pedestrian Access', icon: Users },
    { name: 'Parking Systems', label: 'Parking Systems', icon: Car },
    { name: 'Gate Automation', label: 'Gate Automation', icon: SlidersHorizontal },
    { name: 'Access Control & RFID', label: 'RFID & Access', icon: Cpu },
    { name: 'Safety & Security Accessories', label: 'Safety Accessories', icon: CheckCircle2 }
  ];

  // Calculate counts per category
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { All: PRODUCTS.length };
    PRODUCTS.forEach((p) => {
      counts[p.category] = (counts[p.category] || 0) + 1;
    });
    return counts;
  }, []);

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((product) => {
      const matchesCategory = activeCategory === 'All' || product.category === activeCategory;
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch = 
        !q ||
        product.name.toLowerCase().includes(q) ||
        product.modelCode.toLowerCase().includes(q) ||
        product.description.toLowerCase().includes(q) ||
        product.features.some(f => f.toLowerCase().includes(q));

      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  // Make section shorter by displaying first 6 products unless expanded or actively searched
  const isSearchActive = searchQuery.trim().length > 0;
  const displayedProducts = (showAllProducts || isSearchActive || filteredProducts.length <= 6)
    ? filteredProducts
    : filteredProducts.slice(0, 6);

  const handleCategorySelect = (cat: ProductCategory | 'All') => {
    setActiveCategory(cat);
    setShowAllProducts(false);
  };

  return (
    <section id="product-catalog-section" className="py-10 sm:py-12 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Compact Streamlined Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-8 space-y-2.5">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-xs font-bold text-[#1D438A]">
            <span className="w-2 h-2 rounded-full bg-[#D7282F]" />
            <span className="tracking-wider uppercase">INDUSTRIAL HARDWARE CATALOG</span>
          </div>

          <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#0a1d37] tracking-tight">
            Security Automation & Access Control Systems
          </h2>

          <p className="text-slate-600 text-xs sm:text-sm max-w-xl mx-auto">
            Engineered at Neptune House, Sector 59 Noida. Select a product category below for instant specifications, crash ratings, and factory quotes.
          </p>

          {/* Dual-color accent divider */}
          <div className="flex justify-center pt-1">
            <div className="flex h-[2px] w-16 rounded-full overflow-hidden">
              <div className="w-[64%] bg-[#1D438A]" />
              <div className="w-[36%] bg-[#D7282F]" />
            </div>
          </div>
        </div>

        {/* Category Quick-Access Hub & Inline Search */}
        <div className="mb-8 space-y-4">
          
          {/* Top Control Strip: Search Input & Dynamic Status */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-slate-50 p-3 sm:p-3.5 rounded-sm border border-slate-200">
            {/* Search Input */}
            <div className="relative flex-1 max-w-md">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search models, codes, specs (e.g. TurboPass, K12, ASTM, FASTag)..."
                className="w-full pl-9 pr-14 py-2 bg-white border border-slate-300 rounded-xs text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#1D438A] shadow-2xs transition-colors"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[11px] font-bold text-slate-500 hover:text-slate-800 px-1.5 py-0.5 rounded-xs hover:bg-slate-100"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Quick Stats & Active Filter Reset */}
            <div className="flex items-center gap-3 text-xs text-slate-500 justify-between sm:justify-end">
              <span className="font-medium text-slate-600">
                Showing <strong className="text-[#1D438A] font-bold">{displayedProducts.length}</strong> of <strong className="text-slate-800 font-bold">{filteredProducts.length}</strong> models
              </span>
              <span className="text-slate-300">|</span>
              <span className="font-medium text-slate-600">
                Category: <strong className="text-[#D7282F] font-bold">{activeCategory}</strong>
              </span>
              {(activeCategory !== 'All' || searchQuery) && (
                <button
                  onClick={() => { setActiveCategory('All'); setSearchQuery(''); }}
                  className="text-[11px] font-bold text-[#1D438A] hover:text-[#D7282F] hover:underline cursor-pointer ml-1"
                >
                  Reset
                </button>
              )}
            </div>
          </div>

          {/* Accessible Category Hub Pills (Wrap Gracefully, Never Clipped, No Ugly Scrollbar) */}
          <div className="flex flex-wrap items-center gap-2 sm:gap-2.5">
            {categoryMetaList.map((cat) => {
              const Icon = cat.icon;
              const isActive = activeCategory === cat.name;
              const count = categoryCounts[cat.name] || 0;

              return (
                <button
                  key={cat.name}
                  onClick={() => handleCategorySelect(cat.name)}
                  className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-sm text-xs font-bold transition-all cursor-pointer ${
                    isActive
                      ? 'bg-[#1D438A] text-white shadow-sm border border-[#1D438A]'
                      : 'bg-slate-100 hover:bg-slate-200/90 text-slate-700 hover:text-[#0a1d37] border border-slate-200/90'
                  }`}
                  aria-pressed={isActive}
                >
                  <Icon className={`w-3.5 h-3.5 shrink-0 ${isActive ? 'text-[#3DA4ED]' : 'text-slate-500'}`} />
                  <span>{cat.label}</span>
                  <span 
                    className={`text-[10px] px-1.5 py-0.2 rounded-xs font-mono font-bold ${
                      isActive 
                        ? 'bg-white/20 text-white' 
                        : 'bg-white text-slate-600 border border-slate-200'
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

        </div>

        {/* Products Grid */}
        {filteredProducts.length === 0 ? (
          <div className="py-12 text-center text-slate-500 bg-slate-50 rounded-xs border border-slate-200">
            <p className="text-sm font-bold text-slate-800">No hardware found matching your criteria.</p>
            <p className="text-xs mt-1 text-slate-500">Try selecting a different category or clearing your search term.</p>
            <button
              onClick={() => { setActiveCategory('All'); setSearchQuery(''); }}
              className="mt-3 px-4 py-2 rounded-xs bg-[#1D438A] hover:bg-[#15346D] text-white text-xs font-bold transition-colors cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {displayedProducts.map((product) => {
              const isHighSecurity = product.category === 'Road Blockers' || product.category === 'Automatic Bollards' || product.category === 'Tyre Killers';

              return (
                <div
                  key={product.id}
                  className="rounded-xs bg-white border border-slate-200 hover:border-[#1D438A] transition-all duration-300 overflow-hidden flex flex-col group shadow-xs hover:shadow-md"
                >
                  {/* Product Image Frame */}
                  <div 
                    onClick={() => {
                      if (product.accessCategory && onNavigateToProductPage) {
                        onNavigateToProductPage(product.id);
                      } else {
                        onSelectProduct(product);
                      }
                    }}
                    className="relative h-48 bg-slate-50 overflow-hidden border-b border-slate-200 flex items-center justify-center p-3 cursor-pointer"
                  >
                    <img
                      src={product.image}
                      alt={product.name}
                      loading="lazy"
                      className="max-w-full max-h-full object-contain group-hover:scale-105 transition-transform duration-500 drop-shadow-xs"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = 'https://neptuneautomatic.com/wp-content/uploads/Boom-barrier-1.jpg';
                      }}
                    />
                    <div 
                      className={`absolute top-2.5 left-2.5 px-2 py-0.5 rounded-xs text-[10px] font-bold uppercase tracking-wider shadow-xs ${
                        isHighSecurity 
                          ? 'bg-[#D7282F] text-white' 
                          : 'bg-[#1D438A] text-white'
                      }`}
                    >
                      {product.category}
                    </div>
                    <div className="absolute top-2.5 right-2.5 px-2 py-0.5 rounded-xs bg-white/95 border border-slate-200 text-[10px] font-mono text-[#0a1d37] font-bold shadow-xs">
                      {product.modelCode}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                    <div>
                      <h3 
                        onClick={() => {
                          if (product.accessCategory && onNavigateToProductPage) {
                            onNavigateToProductPage(product.id);
                          } else {
                            onSelectProduct(product);
                          }
                        }}
                        className="font-display text-base font-bold text-[#0a1d37] group-hover:text-[#1D438A] transition-colors line-clamp-1 cursor-pointer"
                      >
                        {product.name}
                      </h3>
                      <p className="text-[11px] text-[#258BD7] font-semibold mt-0.5 line-clamp-1">
                        {product.tagline}
                      </p>
                      <p className="text-xs text-slate-600 mt-1.5 line-clamp-2 leading-relaxed">
                        {product.description}
                      </p>
                    </div>

                    {/* Spec Quick Badges */}
                    <div className="grid grid-cols-2 gap-2 pt-1 border-t border-slate-100 text-[11px]">
                      {product.specs.slice(0, 2).map((spec, idx) => (
                        <div key={idx} className="bg-slate-50 p-1.5 rounded-xs border border-slate-200">
                          <span className="text-slate-500 block text-[9px] uppercase">{spec.label}</span>
                          <span className="font-bold text-slate-800 truncate block text-[11px]">{spec.value}</span>
                        </div>
                      ))}
                    </div>

                    {/* Card Action Buttons */}
                    <div className="pt-1 flex items-center gap-2">
                      <button
                        onClick={() => {
                          if (product.accessCategory && onNavigateToProductPage) {
                            onNavigateToProductPage(product.id);
                          } else {
                            onSelectProduct(product);
                          }
                        }}
                        className="flex-1 py-2 px-2.5 rounded-xs border border-[#1D438A] text-[#1D438A] hover:bg-[#1D438A] hover:text-white text-xs font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                      >
                        <span>{product.accessCategory ? 'Full Specifications' : 'Specifications'}</span>
                        <ArrowRight className="w-3.5 h-3.5 text-[#258BD7] group-hover:text-white" />
                      </button>

                      <button
                        onClick={() => onOpenQuoteModal(product.name)}
                        className="py-2 px-3 rounded-xs bg-[#D7282F] hover:bg-[#B81D23] text-white text-xs font-bold transition-all shadow-xs shrink-0 cursor-pointer"
                      >
                        Enquire
                      </button>
                    </div>

                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Compact Show All / Show Less Toggle Button */}
        {!isSearchActive && filteredProducts.length > 6 && (
          <div className="mt-8 text-center">
            <button
              onClick={() => setShowAllProducts(!showAllProducts)}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xs bg-[#1D438A] hover:bg-[#15346D] text-white text-xs font-bold transition-all shadow-xs hover:shadow-md cursor-pointer"
            >
              <span>
                {showAllProducts 
                  ? 'Show Less Products' 
                  : `View All ${filteredProducts.length} ${activeCategory === 'All' ? 'Hardware Models' : activeCategory}`
                }
              </span>
              {showAllProducts ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>
          </div>
        )}

      </div>
    </section>
  );
};

