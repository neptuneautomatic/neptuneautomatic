'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import { useModal } from '@/context/ModalContext';

interface ChatLink {
  label: string;
  href?: string;
  action?: 'cart' | 'quote' | 'call';
}

interface ChatMessage {
  id: string;
  sender: 'ai' | 'user';
  text: string;
  time: string;
  links?: ChatLink[];
}

const INITIAL_GREETING: ChatMessage = {
  id: 'welcome-msg',
  sender: 'ai',
  text: "Hello! 👋 Welcome to Neptune Automatic. I am your AI access automation & smart parking specialist. How can I assist you with your facility architecture or security hardware today?",
  time: 'Just now',
  links: [
    { label: '🚧 Boom Barriers', href: '/products/automatic-boom-barrier/' },
    { label: '🛡️ Crash Bollards', href: '/products/automatic-bollards/' },
    { label: '🅿️ FASTag Parking', href: '/products/parking-management-system/' },
    { label: '📋 Request Quote', action: 'cart' },
  ],
};

const SUGGESTED_PROMPTS = [
  'What boom barrier is best for high traffic?',
  'Explain K4 vs K12 crash bollard ratings',
  'How does FASTag parking work?',
  'How do I request a price quotation?',
  'Connect with an engineer',
];

export default function FloatingActions() {
  const { openCart } = useCart();
  const { openQuote } = useModal();

  const [showScrollTop, setShowScrollTop] = useState(false);
  const [isAiOpen, setIsAiOpen] = useState(false);
  const [isCallOpen, setIsCallOpen] = useState(false);

  // Chatbot State
  const [messages, setMessages] = useState<ChatMessage[]>([INITIAL_GREETING]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatWindowRef = useRef<HTMLDivElement>(null);
  const callCardRef = useRef<HTMLDivElement>(null);

  // Track scroll position for Scroll-to-Top visibility
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 280);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close modals on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (isAiOpen) setIsAiOpen(false);
        if (isCallOpen) setIsCallOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isAiOpen, isCallOpen]);

  // Handle outside clicks to close chat or call card
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;

      if (isAiOpen && chatWindowRef.current && !chatWindowRef.current.contains(target)) {
        // Check if the click was not on the AI toggle button itself
        const aiToggleBtn = document.getElementById('floating-ai-toggle-btn');
        if (!aiToggleBtn || !aiToggleBtn.contains(target)) {
          setIsAiOpen(false);
        }
      }

      if (isCallOpen && callCardRef.current && !callCardRef.current.contains(target)) {
        const callToggleBtn = document.getElementById('floating-call-toggle-btn');
        if (!callToggleBtn || !callToggleBtn.contains(target)) {
          setIsCallOpen(false);
        }
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isAiOpen, isCallOpen]);

  // Scroll chat messages to bottom
  useEffect(() => {
    if (isAiOpen && messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isTyping, isAiOpen]);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  // Generate Intelligent AI Response
  const generateAiReply = (userQuery: string): { text: string; links?: ChatLink[] } => {
    const q = userQuery.toLowerCase();

    // 1. Boom Barrier Inquiries
    if (q.includes('barrier') || q.includes('boom') || q.includes('power fusion') || q.includes('powerlite') || q.includes('f-620') || q.includes('b680') || q.includes('toll')) {
      return {
        text: "Neptune manufactures India's most reliable automatic boom barriers featuring 24V brushless DC motors, up to 10 Million MCBF, and rapid opening speeds from 0.9s to 6.0s. Our flagship models include:\n• Power Fusion XD (High-speed brushless, toll/expressways)\n• PowerLite (Heavy-duty commercial & residential)\n• FAAC F-620 & B680 Hybrid (Industrial hydraulic systems)\nAll barriers include auto-reverse collision sensors and optional battery backup.",
        links: [
          { label: 'View Boom Barriers', href: '/products/automatic-boom-barrier/' },
          { label: 'Request Quotation', action: 'quote' },
        ],
      };
    }

    // 2. Bollards & Crash Ratings
    if (q.includes('bollard') || q.includes('crash') || q.includes('k4') || q.includes('k8') || q.includes('k12') || q.includes('m30') || q.includes('m50') || q.includes('pas 68') || q.includes('iwa') || q.includes('hydraulic bollard')) {
      return {
        text: "Neptune provides certified crash-rated bollards engineered to stop hostile vehicles:\n• K12 / M50 / PAS 68: Halts a 7.5-ton truck traveling at 80 km/h with zero dynamic penetration.\n• K4 / M30: Designed for medium security perimeters (7.5 tons at 48 km/h).\n• Configurations: Automatic hydraulic, shallow-mount, semi-automatic, and fixed bollards with built-in LED warning rings and IP68 submersible pumps.",
        links: [
          { label: 'View Automatic Bollards', href: '/products/automatic-bollards/' },
          { label: 'Request Quotation', action: 'quote' },
        ],
      };
    }

    // 3. Smart Parking & FASTag
    if (q.includes('parking') || q.includes('fastag') || q.includes('anpr') || q.includes('guidance') || q.includes('pgs') || q.includes('license') || q.includes('plate') || q.includes('slot')) {
      return {
        text: "Neptune's turnkey Smart Parking Management System (PMS) is deployed at Delhi T3 Airport, DLF CyberCity, and NDMC smart cities:\n• NPCI-Compliant FASTag automatic contactless toll deduction.\n• 99.8% accurate ANPR (Automatic Number Plate Recognition) dual-lens cameras.\n• Ultrasonic Parking Guidance (PGS) with green/red occupancy indicators & digital wayfinding LED displays.\n• PowernPark mobile app integration for cashless parking.",
        links: [
          { label: 'View Parking Systems', href: '/products/parking-management-system/' },
          { label: 'Request Quotation', action: 'quote' },
        ],
      };
    }

    // 4. Pedestrian Access & Turnstiles
    if (q.includes('turnstile') || q.includes('flap') || q.includes('pedestrian') || q.includes('tripod') || q.includes('speed gate') || q.includes('face') || q.includes('rfid')) {
      return {
        text: "For crowd and employee access control, Neptune offers:\n• Flap Barriers: Sleek tempered glass wings, high throughput (35-40 persons/min), single & dual lane.\n• Optical Speed Gates: Executive entrance solutions with facial recognition, contactless RFID, and biometric readers.\n• Tripod & Full-Height Turnstiles: Heavy-duty SUS 304 stainless steel with emergency drop-arm release for high-traffic transit and industrial perimeters.",
        links: [
          { label: 'View Pedestrian Gates', href: '/products/pedestrian-gates/' },
          { label: 'Request Quotation', action: 'quote' },
        ],
      };
    }

    // 5. Road Blockers & Spike Tyre Killers
    if (q.includes('road blocker') || q.includes('blocker') || q.includes('tyre killer') || q.includes('tire') || q.includes('spike')) {
      return {
        text: "For military bases, embassies, and critical infrastructure, Neptune manufactures hydraulic road blockers (up to 1,000mm lift) and electro-hydraulic spike tyre killers capable of puncturing heavy commercial vehicle tyres instantly in anti-terror deployments.",
        links: [
          { label: 'View Road Blockers', href: '/products/road-blockers/' },
          { label: 'Request Quotation', action: 'quote' },
        ],
      };
    }

    // 6. Quotation / Pricing / Buying / RFQ
    if (q.includes('quote') || q.includes('price') || q.includes('cost') || q.includes('rfq') || q.includes('buy') || q.includes('order') || q.includes('how to buy')) {
      return {
        text: "Getting a formal price quotation is easy!\n1. Browse our catalog and click 'Add to Cart' on your desired models.\n2. Open your Quote Cart to adjust quantities or project specifications.\n3. Submit your contact details. Our engineering sales team delivers official GST-compliant pricing and CAD technical drawings within 2 to 4 business hours.",
        links: [
          { label: 'Open Quote Cart', action: 'cart' },
          { label: 'Browse Products', href: '/products/' },
        ],
      };
    }

    // 7. Contact, Phone, Office, Engineer
    if (q.includes('contact') || q.includes('call') || q.includes('phone') || q.includes('office') || q.includes('address') || q.includes('engineer') || q.includes('support') || q.includes('noida')) {
      return {
        text: "You can speak directly with our certified systems engineering team:\n• Hotline: +91 8010 807 000\n• WhatsApp: +91 8010 807 000\n• Email: info@neptuneautomatic.com\n• Head Office: Sector 63, Noida, NCR, India.\n• Working Hours: Monday to Saturday, 9:00 AM – 6:30 PM IST.",
        links: [
          { label: 'Call Engineer Now', action: 'call' },
          { label: 'Contact Us Page', href: '/contact/' },
        ],
      };
    }

    // 8. Greetings / Friendly
    if (q.startsWith('hi') || q.startsWith('hello') || q.startsWith('hey') || q.includes('thank') || q.includes('namaste')) {
      return {
        text: "Hello! Always glad to help. Are you planning a new facility installation or looking to upgrade your existing boom barriers, crash bollards, or FASTag parking lanes?",
        links: [
          { label: 'Explore Boom Barriers', href: '/products/automatic-boom-barrier/' },
          { label: 'Explore Crash Bollards', href: '/products/automatic-bollards/' },
          { label: 'Talk to an Engineer', action: 'call' },
        ],
      };
    }

    // 9. Default Fallback
    return {
      text: "Thank you for your question. Neptune Automatic is India's leading manufacturer of automated boom barriers, crash-rated bollards, FASTag smart parking management, and pedestrian security turnstiles. Would you like to review product specifications or raise a direct quotation request?",
      links: [
        { label: 'Open Quote Cart', action: 'cart' },
        { label: 'Browse All Products', href: '/products/' },
        { label: 'Call Engineering Team', action: 'call' },
      ],
    };
  };

  const handleSendMessage = (textToSend?: string) => {
    const text = (textToSend || inputValue).trim();
    if (!text || isTyping) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputValue('');
    setIsTyping(true);

    // Realistic brief typing delay
    setTimeout(() => {
      const reply = generateAiReply(text);
      const aiMsg: ChatMessage = {
        id: `ai-${Date.now()}`,
        sender: 'ai',
        text: reply.text,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        links: reply.links,
      };

      setMessages((prev) => [...prev, aiMsg]);
      setIsTyping(false);
    }, 450);
  };

  const handleLinkAction = (link: ChatLink) => {
    if (link.action === 'cart') {
      setIsAiOpen(false);
      openCart();
    } else if (link.action === 'quote') {
      setIsAiOpen(false);
      openQuote('Access Automation Products');
    } else if (link.action === 'call') {
      window.location.href = 'tel:+918010807000';
    }
  };

  const handleResetChat = () => {
    setMessages([INITIAL_GREETING]);
    setIsTyping(false);
  };

  return (
    <>
      {/* =========================================================================
          1. AI CHATBOT WINDOW (Bottom-Right Floating Assistant)
         ========================================================================= */}
      {isAiOpen && (
        <div
          ref={chatWindowRef}
          className="ai-chatbot-window"
          role="dialog"
          aria-label="Neptune AI Assistant"
        >
          {/* Header */}
          <div className="ai-chatbot-header">
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div
                style={{
                  position: 'relative',
                  width: '38px',
                  height: '38px',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #56ACDD 0%, #01358B 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
                }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
                </svg>
                {/* Active Online Indicator */}
                <span
                  style={{
                    position: 'absolute',
                    bottom: '0px',
                    right: '0px',
                    width: '10px',
                    height: '10px',
                    background: '#22C55E',
                    border: '2px solid #0A1128',
                    borderRadius: '50%',
                  }}
                />
              </div>

              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <h3 style={{ margin: 0, fontSize: '0.98rem', fontWeight: 800, color: '#FFFFFF', fontFamily: "'Lexend', sans-serif" }}>
                    Neptune AI
                  </h3>
                  <span
                    style={{
                      background: 'rgba(86, 172, 221, 0.25)',
                      color: '#56ACDD',
                      fontSize: '0.65rem',
                      fontWeight: 800,
                      padding: '1px 6px',
                      borderRadius: '4px',
                      letterSpacing: '0.04em',
                    }}
                  >
                    ONLINE
                  </span>
                </div>
                <div style={{ fontSize: '0.72rem', color: '#94A3B8' }}>
                  Smart Access &amp; Parking Automation
                </div>
              </div>
            </div>

            {/* Controls */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <button
                type="button"
                onClick={handleResetChat}
                title="Reset Conversation"
                style={{
                  background: 'rgba(255, 255, 255, 0.1)',
                  border: 'none',
                  color: '#CBD5E1',
                  width: '28px',
                  height: '28px',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M23 4v6h-6" />
                  <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10" />
                </svg>
              </button>

              <button
                type="button"
                onClick={() => setIsAiOpen(false)}
                title="Close Chat"
                style={{
                  background: 'rgba(255, 255, 255, 0.1)',
                  border: 'none',
                  color: '#FFFFFF',
                  width: '28px',
                  height: '28px',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  fontSize: '1.25rem',
                  lineHeight: 1,
                }}
              >
                &times;
              </button>
            </div>
          </div>

          {/* Quick Suggestions Chips Bar */}
          <div
            style={{
              padding: '0.5rem 0.85rem',
              background: '#FFFFFF',
              borderBottom: '1px solid #E2E8F0',
              display: 'flex',
              gap: '6px',
              overflowX: 'auto',
              whiteSpace: 'nowrap',
            }}
          >
            {SUGGESTED_PROMPTS.map((prompt, idx) => (
              <button
                key={idx}
                type="button"
                className="ai-chatbot-chip"
                onClick={() => handleSendMessage(prompt)}
              >
                {prompt}
              </button>
            ))}
          </div>

          {/* Messages Stream */}
          <div className="ai-chatbot-messages">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={msg.sender === 'ai' ? 'ai-chatbot-bubble-ai' : 'ai-chatbot-bubble-user'}
              >
                <div style={{ whiteSpace: 'pre-line' }}>{msg.text}</div>

                {/* Optional interactive links / buttons inside message */}
                {msg.links && msg.links.length > 0 && (
                  <div style={{ marginTop: '8px', display: 'flex', flexWrap: 'wrap' }}>
                    {msg.links.map((link, lIdx) =>
                      link.href ? (
                        <Link
                          key={lIdx}
                          href={link.href}
                          className="ai-chatbot-action-btn"
                          onClick={() => setIsAiOpen(false)}
                        >
                          <span>{link.label}</span>
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                            <polyline points="9 18 15 12 9 6" />
                          </svg>
                        </Link>
                      ) : (
                        <button
                          key={lIdx}
                          type="button"
                          className="ai-chatbot-action-btn"
                          onClick={() => handleLinkAction(link)}
                        >
                          <span>{link.label}</span>
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                            <polyline points="9 18 15 12 9 6" />
                          </svg>
                        </button>
                      )
                    )}
                  </div>
                )}

                <div
                  style={{
                    fontSize: '0.68rem',
                    color: msg.sender === 'ai' ? '#94A3B8' : 'rgba(255, 255, 255, 0.75)',
                    textAlign: 'right',
                    marginTop: '4px',
                  }}
                >
                  {msg.time}
                </div>
              </div>
            ))}

            {/* Typing Indicator */}
            {isTyping && (
              <div className="ai-chatbot-bubble-ai" style={{ display: 'flex', alignItems: 'center', gap: '5px', padding: '0.75rem 1rem' }}>
                <span style={{ fontSize: '0.8rem', color: '#64748B', marginRight: '4px' }}>Neptune AI is thinking</span>
                <span className="ai-typing-dot" />
                <span className="ai-typing-dot" />
                <span className="ai-typing-dot" />
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input Footer */}
          <form
            className="ai-chatbot-input-bar"
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
          >
            <input
              type="text"
              className="ai-chatbot-input"
              placeholder="Ask about boom barriers, bollards, parking..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              disabled={isTyping}
            />

            <button
              type="submit"
              className="ai-chatbot-send-btn"
              disabled={!inputValue.trim() || isTyping}
              title="Send Message"
              aria-label="Send Message"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="22" y1="2" x2="11" y2="13" />
                <polygon points="22 2 15 22 11 13 2 9 22 2" />
              </svg>
            </button>
          </form>
        </div>
      )}

      {/* =========================================================================
          2. CALL POPOVER CARD (Quick Phone / WhatsApp / Email Direct)
         ========================================================================= */}
      {isCallOpen && (
        <div ref={callCardRef} className="call-popover-card" role="dialog" aria-label="Quick Contact">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.85rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div
                style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  background: '#ECFDF5',
                  color: '#059669',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
              </div>
              <div>
                <h4 style={{ margin: 0, fontSize: '0.95rem', fontWeight: 800, color: '#1E293B', fontFamily: "'Lexend', sans-serif" }}>
                  Engineering Hotline
                </h4>
                <span style={{ fontSize: '0.72rem', color: '#10B981', fontWeight: 700 }}>
                  ● Available Mon - Sat
                </span>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setIsCallOpen(false)}
              style={{
                background: 'none',
                border: 'none',
                color: '#94A3B8',
                fontSize: '1.25rem',
                cursor: 'pointer',
                lineHeight: 1,
              }}
              title="Close"
            >
              &times;
            </button>
          </div>

          <p style={{ fontSize: '0.8rem', color: '#64748B', lineHeight: 1.5, margin: '0 0 1rem 0' }}>
            Speak directly with certified access automation &amp; crash barrier consultants.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {/* Direct Call Button */}
            <a
              href="tel:+918010807000"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                background: '#10B981',
                color: '#FFFFFF',
                padding: '0.7rem 1rem',
                borderRadius: '8px',
                fontSize: '0.875rem',
                fontWeight: 700,
                textDecoration: 'none',
                boxShadow: '0 4px 12px rgba(16, 185, 129, 0.25)',
              }}
            >
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
              </svg>
              <span>+91 8010 807 000</span>
            </a>

            {/* WhatsApp Link */}
            <a
              href="https://wa.me/918010807000?text=Hello%20Neptune%20Automatic%2C%20I%20would%20like%20to%20inquire%20about%20your%20security%20and%20parking%20systems."
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                background: '#25D366',
                color: '#FFFFFF',
                padding: '0.65rem 1rem',
                borderRadius: '8px',
                fontSize: '0.84rem',
                fontWeight: 700,
                textDecoration: 'none',
              }}
            >
              <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0 0 12.04 2zm0 17.58c-1.48 0-2.93-.4-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a7.994 7.994 0 0 1-1.22-4.22c0-4.41 3.59-8 8-8 2.14 0 4.15.83 5.66 2.34a7.96 7.96 0 0 1 2.34 5.66c0 4.41-3.59 8-8 8zm4.38-6c-.24-.12-1.42-.7-1.64-.78-.22-.08-.38-.12-.54.12-.16.24-.62.78-.76.94-.14.16-.28.18-.52.06-.24-.12-1.02-.38-1.94-1.2-.72-.64-1.2-1.43-1.34-1.67-.14-.24-.01-.37.11-.49.11-.11.24-.28.36-.42.12-.14.16-.24.24-.4.08-.16.04-.3-.02-.42-.06-.12-.54-1.3-.74-1.78-.2-.47-.4-.41-.54-.42-.14 0-.3 0-.46 0s-.42.06-.64.3c-.22.24-.84.82-.84 2s.86 2.32.98 2.48c.12.16 1.7 2.59 4.12 3.63.58.25 1.02.4 1.38.52.58.18 1.11.16 1.53.1.47-.07 1.42-.58 1.62-1.14.2-.56.2-1.04.14-1.14-.06-.1-.22-.16-.46-.28z"/>
              </svg>
              <span>Chat on WhatsApp</span>
            </a>

            {/* Email Sales Button */}
            <a
              href="mailto:info@neptuneautomatic.com?subject=Technical%20Inquiry%20-%20Neptune%20Automatic"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                background: '#F1F5F9',
                color: '#334155',
                padding: '0.65rem 1rem',
                borderRadius: '8px',
                fontSize: '0.84rem',
                fontWeight: 600,
                textDecoration: 'none',
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                <polyline points="22,6 12,13 2,6" />
              </svg>
              <span>info@neptuneautomatic.com</span>
            </a>
          </div>

          <div
            style={{
              marginTop: '0.85rem',
              paddingTop: '0.75rem',
              borderTop: '1px solid #F1F5F9',
              fontSize: '0.72rem',
              color: '#94A3B8',
              textAlign: 'center',
            }}
          >
            Noida Sector 63 • Pan-India Installation Support
          </div>
        </div>
      )}

      {/* =========================================================================
          3. FLOATING ACTION BUTTONS STACK (Bottom-Right)
         ========================================================================= */}
      <aside className="floating-actions-container" aria-label="Quick Actions">
        {/* Button 1: AI Chatbot Button */}
        <button
          id="floating-ai-toggle-btn"
          type="button"
          className="floating-action-btn floating-ai-btn"
          onClick={() => {
            setIsAiOpen((prev) => !prev);
            if (isCallOpen) setIsCallOpen(false);
          }}
          aria-label={isAiOpen ? 'Close Neptune AI Chat' : 'Open Neptune AI Chat'}
          title="Chat with Neptune AI"
        >
          <span className="floating-tooltip">Ask Neptune AI</span>
          <span className="floating-ai-badge">AI</span>

          {isAiOpen ? (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          ) : (
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              {/* Sparkle Chat / AI Icon */}
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
              <path d="M12 7v4" strokeWidth="2" />
              <path d="M10 9h4" strokeWidth="2" />
            </svg>
          )}
        </button>

        {/* Button 2: Call Button */}
        <button
          id="floating-call-toggle-btn"
          type="button"
          className="floating-action-btn floating-call-btn"
          onClick={() => {
            setIsCallOpen((prev) => !prev);
            if (isAiOpen) setIsAiOpen(false);
          }}
          aria-label="Direct Phone & Consultation"
          title="Call Neptune Engineering: +91 8010 807 000"
        >
          <span className="floating-tooltip">Call +91 8010 807 000</span>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
          </svg>
        </button>

        {/* Button 3: Scroll Up Button (Only visible when user scrolled down > 280px) */}
        <button
          type="button"
          className="floating-action-btn floating-scroll-btn"
          onClick={scrollToTop}
          aria-label="Scroll back to top"
          title="Scroll to Top"
          style={{
            opacity: showScrollTop ? 1 : 0,
            visibility: showScrollTop ? 'visible' : 'hidden',
            transform: showScrollTop ? 'scale(1)' : 'scale(0.8)',
            pointerEvents: showScrollTop ? 'auto' : 'none',
            transition: 'opacity 0.25s ease, transform 0.25s ease, visibility 0.25s',
          }}
        >
          <span className="floating-tooltip">Scroll to Top</span>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="18 15 12 9 6 15" />
          </svg>
        </button>
      </aside>
    </>
  );
}
