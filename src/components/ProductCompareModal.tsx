import React, { useState, useEffect, useMemo } from 'react';
import { 
  X, 
  Check, 
  Minus, 
  ArrowRight, 
  SlidersHorizontal, 
  FileText, 
  CheckCircle2, 
  Zap,
  Shield,
  HelpCircle,
  FolderOpen
} from 'lucide-react';
import { ALL_NEPTUNE_PRODUCTS } from '../data/products/allProducts';
import { PARKING_SOLUTIONS_PRODUCTS } from '../data/parkingSolutionsProducts';
import { Product } from '../types';
import { getProductUrl } from '../utils/urlRouter';

interface ProductCompareModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenQuoteModal: (subject?: string) => void;
  initialProductId?: string;
  onNavigateToProductPage?: (productId: string) => void;
}

interface CompareCategoryGroup {
  id: string;
  name: string;
  filter: (p: Product) => boolean;
}

export const ProductCompareModal: React.FC<ProductCompareModalProps> = ({
  isOpen,
  onClose,
  onOpenQuoteModal,
  initialProductId,
  onNavigateToProductPage
}) => {
  // Combine all available products
  const allCatalogProducts = useMemo(() => {
    const combined = [...ALL_NEPTUNE_PRODUCTS];
    PARKING_SOLUTIONS_PRODUCTS.forEach(pp => {
      if (!combined.some(c => c.id === pp.id)) {
        combined.push(pp);
      }
    });
    return combined;
  }, []);

  const CATEGORY_GROUPS: CompareCategoryGroup[] = [
    {
      id: 'boom-barriers',
      name: 'Automatic Boom Barriers',
      filter: (p) => p.accessCategory === 'automatic-boom-barriers' || p.category === 'Boom Barriers'
    },
    {
      id: 'bollards',
      name: 'Automatic Bollards',
      filter: (p) => p.accessCategory === 'high-security-automatic-bollards' || p.category === 'Automatic Bollards'
    },
    {
      id: 'drop-arm-and-blockers',
      name: 'Road Blockers & Wedge Barriers',
      filter: (p) => p.accessCategory === 'crash-rated-drop-arm-barriers' || p.category === 'Road Blockers' || p.category === 'Tyre Killers' || p.subCategory === 'vehicle-access'
    },
    {
      id: 'pedestrian-gates',
      name: 'Speed Gates & Turnstiles',
      filter: (p) => p.subCategory === 'pedestrian-gates' || p.category === 'Pedestrian Access'
    },
    {
      id: 'sliding-swing-gates',
      name: 'Sliding & Swing Gate Automation',
      filter: (p) => p.accessCategory === 'sliding-gate-automation' || p.accessCategory === 'swing-gate-automation' || p.category === 'Gate Automation'
    },
    {
      id: 'parking-systems',
      name: 'Smart Parking Systems',
      filter: (p) => p.category === 'Parking Systems' || ['management', 'guidance', 'counting', 'vehicular-access'].includes(p.subCategory || '')
    },
    {
      id: 'rfid-readers',
      name: 'RFID & Access Control',
      filter: (p) => p.category === 'Access Control & RFID' || ['uhf-rfid', 'smart-card'].includes(p.subCategory || '')
    },
    {
      id: 'accessories',
      name: 'Certified Accessories',
      filter: (p) => p.category === 'Safety & Security Accessories' || ['safety-devices', 'pulse-generators', 'radio-transmitters', 'gate-locks', 'traffic-signals'].includes(p.subCategory || '')
    }
  ];

  // Determine active category group based on initialProductId
  const initialCategoryGroup = useMemo(() => {
    if (!initialProductId) return CATEGORY_GROUPS[0].id;
    const prod = allCatalogProducts.find(p => p.id.toLowerCase() === initialProductId.toLowerCase());
    if (!prod) return CATEGORY_GROUPS[0].id;
    const foundGroup = CATEGORY_GROUPS.find(g => g.filter(prod));
    return foundGroup ? foundGroup.id : CATEGORY_GROUPS[0].id;
  }, [initialProductId, allCatalogProducts]);

  const [activeCategory, setActiveCategory] = useState<string>(initialCategoryGroup);

  // Products available in currently selected category
  const currentCategoryProducts = useMemo(() => {
    const group = CATEGORY_GROUPS.find(g => g.id === activeCategory) || CATEGORY_GROUPS[0];
    return allCatalogProducts.filter(group.filter);
  }, [activeCategory, allCatalogProducts]);

  // Selected product IDs in the current category
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  // Update selection whenever category changes or modal opens
  useEffect(() => {
    if (initialProductId) {
      const prod = allCatalogProducts.find(p => p.id.toLowerCase() === initialProductId.toLowerCase());
      if (prod) {
        const foundGroup = CATEGORY_GROUPS.find(g => g.filter(prod));
        if (foundGroup) {
          setActiveCategory(foundGroup.id);
          const othersInGroup = allCatalogProducts.filter(foundGroup.filter).filter(p => p.id !== prod.id);
          const candidates = [prod.id, ...othersInGroup.slice(0, 2).map(p => p.id)];
          setSelectedIds(candidates);
          return;
        }
      }
    }
    // Default to first 2-3 products in active category
    const defaultProds = currentCategoryProducts.slice(0, 3).map(p => p.id);
    setSelectedIds(defaultProds);
  }, [activeCategory, initialProductId]);

  if (!isOpen) return null;

  const compareProducts = currentCategoryProducts.filter(p => selectedIds.includes(p.id));
  const displayProducts = compareProducts.length > 0 ? compareProducts : currentCategoryProducts.slice(0, 3);

  const toggleProduct = (id: string) => {
    if (selectedIds.includes(id)) {
      if (selectedIds.length > 1) {
        setSelectedIds(selectedIds.filter(i => i !== id));
      }
    } else {
      if (selectedIds.length < 3) {
        setSelectedIds([...selectedIds, id]);
      } else {
        // Replace the last selected
        setSelectedIds([selectedIds[0], selectedIds[1], id]);
      }
    }
  };

  const currentGroupName = CATEGORY_GROUPS.find(g => g.id === activeCategory)?.name || 'Hardware';

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      <div 
        className="bg-white w-full max-w-6xl rounded-2xl border border-slate-200 shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Header - Clean White Theme */}
        <div className="flex items-center justify-between p-5 bg-white border-b border-slate-200 shrink-0">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-blue-50 border border-blue-200 text-[#1D438A]">
              <SlidersHorizontal className="w-5 h-5 text-[#00a8e8]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#1D438A] px-2 py-0.5 rounded-full bg-blue-50 border border-blue-200">
                  Same-Category Comparison
                </span>
                <span className="text-xs text-slate-500 font-medium hidden sm:inline">•</span>
                <span className="text-xs text-slate-600 font-bold hidden sm:inline">{currentGroupName}</span>
              </div>
              <h3 className="text-lg sm:text-xl font-extrabold font-display text-[#0a1d37] mt-0.5">
                Technical Hardware Comparison Matrix
              </h3>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
            aria-label="Close Comparison"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Step 1: Category Filter Bar */}
        <div className="px-5 py-3 bg-slate-50 border-b border-slate-200 overflow-x-auto shrink-0 flex items-center gap-2">
          <span className="text-xs font-bold text-slate-700 whitespace-nowrap flex items-center gap-1.5 mr-1">
            <FolderOpen className="w-4 h-4 text-[#00a8e8]" />
            <span>Category:</span>
          </span>
          <div className="flex items-center gap-1.5 flex-nowrap">
            {CATEGORY_GROUPS.map((group) => {
              const isSelected = activeCategory === group.id;
              const count = allCatalogProducts.filter(group.filter).length;
              if (count === 0) return null;
              return (
                <button
                  key={group.id}
                  onClick={() => {
                    setActiveCategory(group.id);
                  }}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-all cursor-pointer flex items-center gap-1.5 ${
                    isSelected
                      ? 'bg-[#1D438A] text-white shadow-xs'
                      : 'bg-white text-slate-700 hover:bg-slate-200/70 border border-slate-200'
                  }`}
                >
                  <span>{group.name}</span>
                  <span className={`text-[10px] font-mono px-1.5 py-0.2 rounded-full ${isSelected ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-600'}`}>
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Step 2: Product Selector Bar (Within Selected Category) */}
        <div className="p-3.5 bg-white border-b border-slate-200 flex flex-wrap items-center gap-2 text-xs shrink-0">
          <span className="font-bold text-[#0a1d37] mr-1">
            Select Up to 3 Models ({selectedIds.length}/3):
          </span>
          <div className="flex flex-wrap gap-1.5 max-h-24 overflow-y-auto pr-1">
            {currentCategoryProducts.map((p) => {
              const isChecked = selectedIds.includes(p.id);
              return (
                <button
                  key={p.id}
                  onClick={() => toggleProduct(p.id)}
                  className={`px-3 py-1.5 rounded-lg border text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
                    isChecked
                      ? 'bg-[#00a8e8] text-white border-[#00a8e8] shadow-xs'
                      : 'bg-slate-50 text-slate-700 border-slate-200 hover:border-slate-300'
                  }`}
                >
                  {isChecked ? <Check className="w-3.5 h-3.5 stroke-3" /> : <span className="w-2 h-2 rounded-full bg-slate-300" />}
                  <span className="truncate max-w-[180px] font-medium">{p.name}</span>
                  <span className="text-[10px] font-mono opacity-80">({p.modelCode})</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Step 3: Detailed Side-by-Side Comparison Matrix */}
        <div className="p-6 overflow-y-auto grow space-y-6 bg-slate-50/50">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {displayProducts.map((product) => (
              <div 
                key={product.id}
                className="bg-white rounded-xl border border-slate-200 p-5 flex flex-col justify-between space-y-5 shadow-xs"
              >
                <div className="space-y-4">
                  {/* Product Image Thumbnail */}
                  <div className="h-36 bg-slate-50 rounded-lg border border-slate-200 flex items-center justify-center p-3 overflow-hidden group">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = 'https://neptuneautomatic.com/wp-content/uploads/Boom-barrier-1.jpg';
                      }}
                    />
                  </div>

                  {/* Identification */}
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded-sm bg-blue-50 text-[#1D438A] border border-blue-200">
                        {product.modelCode}
                      </span>
                      <span className="text-[10px] font-mono text-emerald-600 font-bold">
                        Made in India
                      </span>
                    </div>
                    <h4 className="font-display text-base font-extrabold text-[#0a1d37] leading-snug">
                      {product.name}
                    </h4>
                    <p className="text-xs text-slate-500 mt-1 line-clamp-2 leading-relaxed">
                      {product.tagline}
                    </p>
                  </div>

                  {/* Key Specifications Grid */}
                  <div className="divide-y divide-slate-100 border-y border-slate-100 text-xs">
                    {product.specs.slice(0, 6).map((spec) => (
                      <div key={spec.label} className="py-2 flex items-center justify-between gap-2">
                        <span className="text-slate-500 font-medium truncate">{spec.label}</span>
                        <span className="font-bold text-[#0a1d37] text-right">{spec.value}</span>
                      </div>
                    ))}
                  </div>

                  {/* Highlights & Features */}
                  <div className="space-y-1.5">
                    <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500">Key Features:</div>
                    <ul className="space-y-1 text-xs text-slate-600">
                      {product.features.slice(0, 3).map((feat, i) => (
                        <li key={i} className="flex items-start gap-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#00a8e8] shrink-0 mt-0.5" />
                          <span className="line-clamp-1">{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Certifications */}
                  <div className="flex flex-wrap gap-1 pt-1">
                    {product.certifications.slice(0, 3).map((cert) => (
                      <span key={cert} className="text-[10px] font-mono px-2 py-0.5 rounded-sm bg-slate-100 border border-slate-200 text-slate-700">
                        {cert}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Card Action Buttons */}
                <div className="pt-3 border-t border-slate-100 flex flex-col gap-2">
                  <button
                    onClick={() => {
                      onClose();
                      if (onNavigateToProductPage) {
                        onNavigateToProductPage(product.id);
                      }
                    }}
                    className="w-full py-2 px-3 rounded-lg border border-[#1D438A] text-[#1D438A] hover:bg-[#1D438A] hover:text-white text-xs font-bold transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <span>View Product Page</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>

                  <button
                    onClick={() => {
                      onClose();
                      onOpenQuoteModal(`Quote Comparison: ${product.name} (${product.modelCode})`);
                    }}
                    className="w-full py-2 px-3 rounded-lg bg-[#D7282F] hover:bg-[#b01e24] text-white text-xs font-bold transition-colors shadow-2xs flex items-center justify-center gap-1 cursor-pointer"
                  >
                    Request Engineering Quote
                  </button>
                </div>

              </div>
            ))}
          </div>
        </div>

        {/* Footer info strip */}
        <div className="p-4 bg-white border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500 shrink-0">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            <span>Hardware specifications tested at Neptune Sector-59 Noida Plant under ISO 9001:2015 governance.</span>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold transition-colors cursor-pointer"
          >
            Close Matrix
          </button>
        </div>

      </div>
    </div>
  );
};
