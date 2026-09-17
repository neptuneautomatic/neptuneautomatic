import React, { useState } from 'react';
import { 
  Calendar, 
  Clock, 
  ArrowLeft, 
  ArrowRight, 
  Share2, 
  BookOpen, 
  CheckCircle2, 
  ShieldCheck, 
  Phone, 
  Download, 
  Tag, 
  ExternalLink,
  ChevronRight,
  ChevronDown,
  HelpCircle,
  Layers,
  Sparkles,
  Building2
} from 'lucide-react';
import { BlogPost, Product } from '../types';
import { BLOG_POSTS, COMPANY_INFO } from '../data/companyData';
import { ALL_NEPTUNE_PRODUCTS } from '../data/products/allProducts';
import { PARKING_SOLUTIONS_PRODUCTS } from '../data/parkingSolutionsProducts';

interface BlogPostPageProps {
  post: BlogPost;
  onNavigateHome: () => void;
  onNavigateToBlogList: () => void;
  onSelectPost: (post: BlogPost) => void;
  onSelectProduct: (productId: string) => void;
  onOpenQuoteModal: (subject?: string) => void;
  onNavigateToCategory?: (categorySlug: string) => void;
}

export const BlogPostPage: React.FC<BlogPostPageProps> = ({
  post,
  onNavigateHome,
  onNavigateToBlogList,
  onSelectPost,
  onSelectProduct,
  onOpenQuoteModal,
  onNavigateToCategory
}) => {
  const [copiedShare, setCopiedShare] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  // Compute related blogs: same category or matching tags, excluding current, max 3
  const relatedPosts = BLOG_POSTS.filter(p => p.id !== post.id && (
    p.category === post.category || 
    (p.tags && post.tags && p.tags.some(t => post.tags?.includes(t)))
  )).slice(0, 3);

  // Fallback to any other 3 if fewer than 3
  const fallbackPosts = relatedPosts.length < 3 
    ? [...relatedPosts, ...BLOG_POSTS.filter(p => p.id !== post.id && !relatedPosts.some(rp => rp.id === p.id))].slice(0, 3)
    : relatedPosts;

  const pageUrl = typeof window !== 'undefined' ? window.location.href : `https://neptuneautomatic.com/blog/${post.slug}/`;
  const shareTitle = encodeURIComponent(post.title);
  const encodedUrl = encodeURIComponent(pageUrl);

  const shareLinks = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    twitter: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${shareTitle}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
    instagram: `https://www.instagram.com/neptuneautomatic/` // Direct official profile link as Instagram does not support direct URL sharing
  };

  const handleCopyLink = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(pageUrl);
      setCopiedShare(true);
      setTimeout(() => setCopiedShare(false), 2500);
    }
  };

  return (
    <article className="min-h-screen bg-slate-50 text-slate-900 pt-28 sm:pt-32 pb-24">
      {/* JSON-LD Schema for BlogPosting */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BlogPosting',
            headline: post.title,
            description: post.excerpt,
            image: post.image,
            datePublished: post.date,
            author: {
              '@type': 'Person',
              name: post.author?.name || 'Neptune Technical Editorial Team',
              jobTitle: post.author?.role || 'Access Automation Engineer'
            },
            publisher: {
              '@type': 'Organization',
              name: 'Neptune Automatic Pvt. Ltd.',
              logo: {
                '@type': 'ImageObject',
                url: 'https://neptuneautomatic.com/wp-content/uploads/neptune-logo.png'
              }
            },
            mainEntityOfPage: {
              '@type': 'WebPage',
              '@id': pageUrl
            }
          })
        }}
      />

      {/* JSON-LD Schema for FAQs if present */}
      {post.faqs && post.faqs.length > 0 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'FAQPage',
              mainEntity: post.faqs.map(faq => ({
                '@type': 'Question',
                name: faq.question,
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: faq.answer
                }
              }))
            })
          }}
        />
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">

        {/* 1. Breadcrumb Bar */}
        <nav className="flex items-center gap-2 text-xs font-medium text-slate-500 overflow-x-auto py-1">
          <button 
            onClick={onNavigateHome}
            className="hover:text-[#1D438A] transition-colors shrink-0"
          >
            Home
          </button>
          <span>/</span>
          <button 
            onClick={onNavigateToBlogList}
            className="hover:text-[#1D438A] transition-colors shrink-0"
          >
            Blog
          </button>
          <span>/</span>
          <span className="text-slate-400 shrink-0">{post.category}</span>
          <span>/</span>
          <span className="text-[#1D438A] font-bold truncate max-w-xs sm:max-w-md">
            {post.title}
          </span>
        </nav>

        {/* 2. Article Header & Meta */}
        <header className="bg-white rounded-2xl p-6 sm:p-10 border border-slate-200 shadow-sm space-y-6">
          <div className="flex flex-wrap items-center gap-3">
            <span className="px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-[#1D438A] text-xs font-bold uppercase tracking-wider">
              {post.category}
            </span>
            <span className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
              <Calendar className="w-3.5 h-3.5 text-slate-400" />
              {post.date}
            </span>
            <span className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
              <Clock className="w-3.5 h-3.5 text-slate-400" />
              {post.readTime}
            </span>
          </div>

          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-gradient-logo tracking-tight leading-tight">
            {post.title}
          </h1>

          <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-4xl">
            {post.excerpt}
          </p>

          {/* Author Card & Social Share Bar */}
          <div className="pt-6 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
            {/* Author Profile */}
            <div className="flex items-center gap-4">
              <img 
                src={post.author?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'} 
                alt={post.author?.name || 'Author'}
                className="w-13 h-13 rounded-full object-cover border-2 border-[#00a8e8]/30 shadow-xs"
              />
              <div>
                <div className="text-sm font-bold text-[#0a1d37]">
                  {post.author?.name || 'Neptune Engineering Team'}
                </div>
                <div className="text-xs text-slate-500">
                  {post.author?.role || 'Access Automation & Security Specialist'}
                </div>
                <div className="text-[11px] text-slate-400 mt-0.5">
                  Neptune House, Sector-59, Noida
                </div>
              </div>
            </div>

            {/* Social Share Buttons (Facebook, Twitter/X, Instagram, LinkedIn) */}
            <div className="flex flex-col sm:items-end gap-2">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
                <Share2 className="w-3.5 h-3.5 text-[#00a8e8]" />
                Share This Article:
              </span>
              <div className="flex items-center gap-2">
                {/* Facebook */}
                <a
                  href={shareLinks.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Share on Facebook"
                  className="w-9 h-9 rounded-lg bg-[#1877F2]/10 hover:bg-[#1877F2] text-[#1877F2] hover:text-white flex items-center justify-center transition-all border border-[#1877F2]/20"
                  title="Share on Facebook"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </a>

                {/* Twitter / X */}
                <a
                  href={shareLinks.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Share on Twitter / X"
                  className="w-9 h-9 rounded-lg bg-black/10 hover:bg-black text-black hover:text-white flex items-center justify-center transition-all border border-black/20"
                  title="Share on X (Twitter)"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                  </svg>
                </a>

                {/* LinkedIn */}
                <a
                  href={shareLinks.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Share on LinkedIn"
                  className="w-9 h-9 rounded-lg bg-[#0077b5]/10 hover:bg-[#0077b5] text-[#0077b5] hover:text-white flex items-center justify-center transition-all border border-[#0077b5]/20"
                  title="Share on LinkedIn"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                  </svg>
                </a>

                {/* Instagram Profile */}
                <a
                  href={shareLinks.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Visit Instagram Profile"
                  className="w-9 h-9 rounded-lg bg-[#E4405F]/10 hover:bg-[#E4405F] text-[#E4405F] hover:text-white flex items-center justify-center transition-all border border-[#E4405F]/20"
                  title="Visit Neptune on Instagram"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </a>

                {/* Copy Link */}
                <button
                  onClick={handleCopyLink}
                  className="px-2.5 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold border border-slate-200 transition-colors"
                  title="Copy direct link"
                >
                  {copiedShare ? 'Copied!' : 'Copy'}
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* 3. Featured Image */}
        <div className="relative rounded-2xl overflow-hidden shadow-md max-h-[460px] bg-slate-950 border border-slate-200">
          <img 
            src={post.image} 
            alt={post.title}
            className="w-full h-full object-cover object-center max-h-[460px]"
          />
          <div className="absolute bottom-3 left-4 bg-black/70 backdrop-blur-sm text-white text-[11px] font-mono px-2.5 py-1 rounded-sm border border-white/20">
            Manufactured & Tested at Neptune House, Sector-59 Noida
          </div>
        </div>

        {/* 4. Main Body: Content & Sidebar Widget Area */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

          {/* Left Column: Article Sections & Content (Col 1-8) */}
          <main className="lg:col-span-8 space-y-8 bg-white rounded-2xl p-6 sm:p-10 border border-slate-200 shadow-sm">
            
            {/* Interactive Table of Contents */}
            {post.tableOfContents && post.tableOfContents.length > 0 && (
              <div className="p-5 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
                <div className="flex items-center gap-2 text-sm font-bold text-[#0a1d37]">
                  <BookOpen className="w-4 h-4 text-[#00a8e8]" />
                  <span>Table of Contents</span>
                </div>
                <ul className="space-y-1.5 text-xs sm:text-sm">
                  {post.tableOfContents.map((item, idx) => (
                    <li key={idx}>
                      <a 
                        href={`#${item.id}`}
                        className="text-slate-600 hover:text-[#00a8e8] font-medium transition-colors flex items-center gap-2"
                      >
                        <span className="text-[#00a8e8] font-mono font-bold">›</span>
                        <span>{item.title}</span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Introductory Paragraphs */}
            <div className="prose prose-slate max-w-none text-slate-700 text-sm sm:text-base leading-relaxed space-y-4">
              {post.contentParagraphs.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>

            {/* Multi-Section Article Content */}
            {post.sections && post.sections.map((section, sIdx) => (
              <section key={sIdx} id={section.id} className="pt-4 border-t border-slate-100 space-y-4">
                <h2 className="text-xl sm:text-2xl font-extrabold text-gradient-logo">
                  {section.heading}
                </h2>
                <div className="text-slate-700 text-sm sm:text-base leading-relaxed space-y-3">
                  {section.content.map((p, pIdx) => (
                    <p key={pIdx} className="whitespace-pre-line">{p}</p>
                  ))}
                </div>
                {section.callout && (
                  <div className="p-4 rounded-xl bg-blue-50/70 border-l-4 border-[#1D438A] text-xs sm:text-sm text-[#0a1d37] font-medium leading-relaxed">
                    <strong>Engineering Takeaway:</strong> {section.callout}
                  </div>
                )}
              </section>
            ))}

            {/* Article Tags */}
            {post.tags && post.tags.length > 0 && (
              <div className="pt-6 border-t border-slate-100 flex flex-wrap items-center gap-2">
                <Tag className="w-3.5 h-3.5 text-slate-400" />
                <span className="text-xs font-bold text-slate-500 uppercase">Tags:</span>
                {post.tags.map((tag, tIdx) => (
                  <span 
                    key={tIdx}
                    className="px-2.5 py-1 rounded-md bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-medium transition-colors cursor-pointer"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}

            {/* Topic-Specific FAQs for this Blog Post */}
            {post.faqs && post.faqs.length > 0 && (
              <section className="pt-8 border-t border-slate-200 space-y-5">
                <div className="space-y-1">
                  <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-blue-50 text-[#1D438A] text-xs font-bold uppercase tracking-wider">
                    <HelpCircle className="w-3.5 h-3.5 text-[#00a8e8]" />
                    <span>Topic Frequently Asked Questions</span>
                  </div>
                  <h2 className="text-xl sm:text-2xl font-extrabold text-[#0a1d37]">
                    Expert Q&A: {post.title}
                  </h2>
                  <p className="text-xs text-slate-500">
                    Direct technical answers compiled by Neptune Automatic R&D engineers in Sector-59 Noida.
                  </p>
                </div>

                <div className="space-y-3 pt-2">
                  {post.faqs.map((faq, fIdx) => {
                    const isOpen = openFaqIndex === fIdx;
                    return (
                      <div 
                        key={fIdx}
                        className={`rounded-xl border transition-all duration-200 overflow-hidden ${
                          isOpen 
                            ? 'border-[#1D438A]/40 bg-white shadow-xs' 
                            : 'border-slate-200 bg-slate-50/70 hover:bg-white hover:border-slate-300'
                        }`}
                      >
                        <button
                          onClick={() => setOpenFaqIndex(isOpen ? null : fIdx)}
                          className="w-full py-3.5 px-4 text-left flex items-center justify-between gap-4 font-bold text-sm text-[#0a1d37] hover:text-[#1D438A] transition-colors cursor-pointer"
                          aria-expanded={isOpen}
                        >
                          <span className="flex items-start gap-3">
                            <span className="w-6 h-6 rounded-md bg-blue-100/80 text-[#1D438A] text-xs flex items-center justify-center font-mono font-bold shrink-0 mt-0.5">
                              Q{fIdx + 1}
                            </span>
                            <span className="leading-snug">{faq.question}</span>
                          </span>
                          <ChevronDown className={`w-4 h-4 text-slate-400 shrink-0 transition-transform duration-200 ${isOpen ? 'rotate-180 text-[#00a8e8]' : ''}`} />
                        </button>
                        {isOpen && (
                          <div className="px-4 pb-4 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 bg-slate-50/50">
                            <div className="flex items-start gap-3 pt-2">
                              <span className="w-6 h-6 rounded-md bg-emerald-100 text-emerald-800 text-xs flex items-center justify-center font-mono font-bold shrink-0 mt-0.5">
                                A
                              </span>
                              <p className="pt-0.5 text-slate-700">{faq.answer}</p>
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </section>
            )}

            {/* Direct Engineering Quote Banner inside Post */}
            <div className="p-6 rounded-xl bg-gradient-to-r from-[#0a1d37] to-[#1D438A] text-white space-y-4">
              <div className="flex items-center gap-2 text-xs font-bold text-[#00a8e8] uppercase tracking-wider">
                <ShieldCheck className="w-4 h-4" />
                <span>Need Specification Assistance for your Facility?</span>
              </div>
              <h3 className="text-lg sm:text-xl font-bold">
                Consult directly with Neptune R&D engineers in Noida
              </h3>
              <p className="text-xs sm:text-sm text-slate-200">
                Get custom CAD foundation drawings, loop sensor wiring schematics, and factory-direct pricing for your project.
              </p>
              <div className="flex flex-wrap gap-3 pt-2">
                <button
                  onClick={() => onOpenQuoteModal(`Technical Inquiry: ${post.title}`)}
                  className="px-4 py-2.5 rounded-lg bg-[#D7282F] hover:bg-[#b01e24] text-white text-xs font-bold shadow-md transition-colors"
                >
                  Request Technical Proposal
                </button>
                <a
                  href="tel:08010807000"
                  className="px-4 py-2.5 rounded-lg bg-white/15 hover:bg-white/25 text-white text-xs font-bold transition-colors flex items-center gap-1.5"
                >
                  <Phone className="w-3.5 h-3.5 text-[#00a8e8]" />
                  <span>Call 080108 07000</span>
                </a>
              </div>
            </div>

          </main>

          {/* Right Column: Sidebar Widget Area (Col 9-12) */}
          <aside className="lg:col-span-4 space-y-6">

            {/* Widget 1: Author Bio & Factory Assurance */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
              <div className="flex items-center gap-2 text-xs font-bold text-[#1D438A] uppercase tracking-wider">
                <Building2 className="w-4 h-4 text-[#00a8e8]" />
                <span>About The Manufacturer</span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                <strong>Neptune Automatic Pvt. Ltd.</strong> is India’s premier manufacturer of high-cycle boom barriers, crash-rated hostile vehicle mitigation (HVM) bollards, and FASTag parking systems.
              </p>
              <div className="p-3 rounded-lg bg-slate-50 border border-slate-200 text-xs text-slate-700 space-y-1.5">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                  <span>50,000+ sq. ft. Plant at Sector 59 Noida</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                  <span>ISO 9001:2015 & CE Certified</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                  <span>Pan-India 24/7 Service Coverage</span>
                </div>
              </div>
              <a
                href="tel:08010807000"
                className="w-full py-2.5 px-4 rounded-lg bg-[#00a8e8] hover:bg-[#0090c7] text-white text-xs font-bold flex items-center justify-center gap-2 transition-colors shadow-xs"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>Direct Plant: 080108 07000</span>
              </a>
            </div>

            {/* Widget 2: Download Technical Datasheets */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
              <div className="flex items-center gap-2 text-xs font-bold text-[#1D438A] uppercase tracking-wider">
                <Download className="w-4 h-4 text-[#00a8e8]" />
                <span>Engineering Downloads</span>
              </div>
              <p className="text-xs text-slate-600">
                Download verified tender specification documents and structural CAD schematics.
              </p>
              <div className="space-y-2">
                <button
                  onClick={() => onOpenQuoteModal('Datasheet Request: Neptune Catalogue 2025-2026')}
                  className="w-full p-2.5 rounded-lg bg-slate-50 hover:bg-slate-100 border border-slate-200 text-left transition-colors flex items-center justify-between text-xs"
                >
                  <span className="font-semibold text-slate-800">Corporate Product Catalog 2025</span>
                  <span className="text-[10px] font-mono text-[#00a8e8]">PDF 8.4MB</span>
                </button>
                <button
                  onClick={() => onOpenQuoteModal('Datasheet Request: Crash-Rated Bollards ASTM M50')}
                  className="w-full p-2.5 rounded-lg bg-slate-50 hover:bg-slate-100 border border-slate-200 text-left transition-colors flex items-center justify-between text-xs"
                >
                  <span className="font-semibold text-slate-800">ASTM M50 Crash Bollard Spec</span>
                  <span className="text-[10px] font-mono text-[#00a8e8]">PDF 3.2MB</span>
                </button>
              </div>
            </div>

            {/* Widget 3: Popular Blog Categories */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
              <div className="flex items-center gap-2 text-xs font-bold text-[#1D438A] uppercase tracking-wider">
                <Layers className="w-4 h-4 text-[#00a8e8]" />
                <span>Blog Categories</span>
              </div>
              <div className="space-y-1 text-xs">
                {['Perimeter Security', 'Parking Systems', 'Security Standards', 'Pedestrian Access'].map((cat, i) => (
                  <button
                    key={i}
                    onClick={onNavigateToBlogList}
                    className="w-full py-2 px-3 rounded-lg hover:bg-slate-100 text-slate-700 flex items-center justify-between transition-colors cursor-pointer"
                  >
                    <span>{cat}</span>
                    <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                  </button>
                ))}
              </div>
            </div>

            {/* Widget 4: Two Offices Contact Badge */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-3">
              <div className="text-xs font-bold text-[#0a1d37] uppercase tracking-wider">
                Our NCR Facilities
              </div>
              <div className="text-xs text-slate-600 space-y-2 divide-y divide-slate-100">
                <div className="pt-1">
                  <div className="font-bold text-[#1D438A]">Office: Neptune India Limited</div>
                  <div>A-11, A Block, Sector 59, Noida, UP 201309</div>
                  <div className="font-mono text-[11px] text-slate-500">Phone: 080108 07000</div>
                </div>
                <div className="pt-2">
                  <div className="font-bold text-[#1D438A]">Neptune Corporate HQ & Plant</div>
                  <div>Neptune System Pvt Ltd, Sector 156, Noida, UP 201304</div>
                  <div className="font-mono text-[11px] text-slate-500">Phone: 080108 07000</div>
                </div>
              </div>
            </div>

          </aside>

        </div>

        {/* 5. Related Blogs Under Same Category & Tags (List 3 Blogs Max) */}
        <section className="bg-white rounded-2xl p-6 sm:p-10 border border-slate-200 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-[#1D438A] text-xs font-bold uppercase tracking-wider mb-2">
                <Sparkles className="w-3.5 h-3.5 text-[#00a8e8]" />
                <span>Hand-Picked For You</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0a1d37]">
                Related Engineering Articles & Case Studies
              </h2>
            </div>
            <button
              onClick={onNavigateToBlogList}
              className="text-xs font-bold text-[#00a8e8] hover:text-[#1D438A] flex items-center gap-1 transition-colors cursor-pointer"
            >
              <span>View All Articles</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {fallbackPosts.map((related) => (
              <div 
                key={related.id}
                onClick={() => onSelectPost(related)}
                className="group rounded-xl bg-slate-50 hover:bg-white border border-slate-200 hover:border-[#00a8e8] hover:shadow-md transition-all duration-300 overflow-hidden cursor-pointer flex flex-col"
              >
                <div className="h-44 overflow-hidden bg-slate-900 relative">
                  <img 
                    src={related.image} 
                    alt={related.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <span className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-black/75 backdrop-blur-xs text-white text-[11px] font-bold">
                    {related.category}
                  </span>
                </div>
                <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                  <div className="space-y-2">
                    <div className="flex items-center gap-3 text-xs text-slate-400">
                      <span>{related.date}</span>
                      <span>•</span>
                      <span>{related.readTime}</span>
                    </div>
                    <h3 className="font-bold text-slate-900 group-hover:text-[#00a8e8] transition-colors line-clamp-2 text-sm leading-snug">
                      {related.title}
                    </h3>
                    <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                      {related.excerpt}
                    </p>
                  </div>
                  <div className="pt-2 flex items-center text-xs font-bold text-[#1D438A] group-hover:text-[#00a8e8] transition-colors">
                    <span>Read Article</span>
                    <ChevronRight className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 6. Explore Our Products and Services Navigation Option */}
        <section className="rounded-2xl bg-gradient-to-b from-white to-slate-100 p-6 sm:p-10 border border-slate-200 shadow-sm space-y-6">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-bold text-[#1D438A] uppercase tracking-wider">
              Explore Our Hardware & Solutions
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0a1d37]">
              Explore Neptune Products & Services
            </h2>
            <p className="text-xs sm:text-sm text-slate-600">
              Discover industrial entrance automation, intelligent parking management systems, and certified safety accessories manufactured in Noida.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            
            {/* Card 1: Access Automation */}
            <div 
              onClick={() => onNavigateToCategory ? onNavigateToCategory('access-automation') : onNavigateHome()}
              className="p-5 rounded-xl bg-white hover:bg-blue-50/50 border border-slate-200 hover:border-[#1D438A] shadow-xs hover:shadow-md transition-all cursor-pointer space-y-3 group"
            >
              <div className="w-10 h-10 rounded-lg bg-blue-50 text-[#1D438A] group-hover:bg-[#1D438A] group-hover:text-white flex items-center justify-center transition-colors">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-slate-900 group-hover:text-[#1D438A] text-sm transition-colors">
                Access Automation
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                34 models of high-speed boom barriers, crash-rated bollards, and heavy gate drives.
              </p>
              <div className="text-xs font-bold text-[#1D438A] flex items-center gap-1">
                <span>View Products</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </div>
            </div>

            {/* Card 2: Smart Parking Solutions */}
            <div 
              onClick={() => onNavigateToCategory ? onNavigateToCategory('solutions') : onNavigateHome()}
              className="p-5 rounded-xl bg-white hover:bg-blue-50/50 border border-slate-200 hover:border-[#1D438A] shadow-xs hover:shadow-md transition-all cursor-pointer space-y-3 group"
            >
              <div className="w-10 h-10 rounded-lg bg-blue-50 text-[#00a8e8] group-hover:bg-[#00a8e8] group-hover:text-white flex items-center justify-center transition-colors">
                <Layers className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-slate-900 group-hover:text-[#1D438A] text-sm transition-colors">
                Smart Parking Solutions
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Turnkey FASTag PMS, ultrasonic slot guidance (PGS), loop counting, and ANPR gates.
              </p>
              <div className="text-xs font-bold text-[#00a8e8] flex items-center gap-1">
                <span>View Solutions</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </div>
            </div>

            {/* Card 3: Access Control & RFID */}
            <div 
              onClick={() => onNavigateToCategory ? onNavigateToCategory('access-control') : onNavigateHome()}
              className="p-5 rounded-xl bg-white hover:bg-blue-50/50 border border-slate-200 hover:border-[#1D438A] shadow-xs hover:shadow-md transition-all cursor-pointer space-y-3 group"
            >
              <div className="w-10 h-10 rounded-lg bg-blue-50 text-[#1D438A] group-hover:bg-[#1D438A] group-hover:text-white flex items-center justify-center transition-colors">
                <BookOpen className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-slate-900 group-hover:text-[#1D438A] text-sm transition-colors">
                Access Control & Turnstiles
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                18 models of optical speed gates, flap barriers, and long-range UHF RFID antennas.
              </p>
              <div className="text-xs font-bold text-[#1D438A] flex items-center gap-1">
                <span>View Hardware</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </div>
            </div>

            {/* Card 4: Certified Accessories */}
            <div 
              onClick={() => onNavigateToCategory ? onNavigateToCategory('accessories') : onNavigateHome()}
              className="p-5 rounded-xl bg-white hover:bg-blue-50/50 border border-slate-200 hover:border-[#1D438A] shadow-xs hover:shadow-md transition-all cursor-pointer space-y-3 group"
            >
              <div className="w-10 h-10 rounded-lg bg-blue-50 text-[#00a8e8] group-hover:bg-[#00a8e8] group-hover:text-white flex items-center justify-center transition-colors">
                <Download className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-slate-900 group-hover:text-[#1D438A] text-sm transition-colors">
                Certified Accessories
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Safety edge sensors, optical photocells, flashing safety beacons, and loop detectors.
              </p>
              <div className="text-xs font-bold text-[#00a8e8] flex items-center gap-1">
                <span>View Accessories</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </div>
            </div>

          </div>
        </section>

      </div>
    </article>
  );
};
