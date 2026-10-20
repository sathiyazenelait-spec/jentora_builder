import { Link, useRouterState } from '@tanstack/react-router';
import { useEffect, useRef, useState, type ReactNode } from 'react';
import {
  ArrowUpRight,
  Menu,
  X,
  MapPin,
  Phone,
  Mail,
  Clock,
  MessageCircle,
  Facebook,
  Instagram,
  Linkedin,
  Youtube,
  ExternalLink,
  Sun,
  Moon,
  Award,
  ShieldCheck
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import logo from '@/assets/jentora-logo.png';
import zenelaitLogo from '@/assets/zenelait-logo.png';
import { company, navigation, services, socialLinks } from '@/data/company';
import { ContactLink } from './sections';
import { StartConversationModal, openStartConversation } from './start-conversation-modal';

export function SiteLayout({ children }: { children: ReactNode }) {
  const path = useRouterState({ select: (s) => s.location.pathname });
  const [menu, setMenu] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [legal, setLegal] = useState<string | null>(null);
  const firstLink = useRef<HTMLAnchorElement>(null);
  const menuToggle = useRef<HTMLButtonElement>(null);
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('jentora-theme') as 'light' | 'dark' | null;
      if (saved) return saved;
    }
    return 'light';
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    if (theme === 'light') {
      document.documentElement.classList.add('light');
      document.documentElement.classList.remove('dark');
      document.body.classList.add('light-theme');
      document.body.classList.remove('dark-theme');
    } else {
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
      document.body.classList.add('dark-theme');
      document.body.classList.remove('light-theme');
    }
    localStorage.setItem('jentora-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMenu(false);
    window.scrollTo(0, 0);
  }, [path]);

  useEffect(() => {
    if (!menu) return;
    document.body.style.overflow = 'hidden';
    firstLink.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMenu(false);
        menuToggle.current?.focus();
      }
      if (e.key === 'Tab') {
        const links = Array.from(document.querySelectorAll<HTMLElement>('.mobile-menu a, .mobile-menu button'));
        const first = links[0],
          last = links[links.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last?.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first?.focus();
        }
      }
    };
    document.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      document.removeEventListener('keydown', onKey);
    };
  }, [menu]);

  return (
    <>
      <a href="#main-content" className="sr-only focus:not-sr-only">
        Skip to content
      </a>

      {/* FIXED SITE NAVIGATION HEADER */}
      <header className={`site-nav ${scrolled || path !== '/' ? 'solid' : ''}`}>
        <div className="container">
          <div className="nav-inner">
            <Link to="/" aria-label="Jentora home" className="logo-wrap">
              <img className="logo" src={logo} alt="Jentora" width={110} height={73} />
            </Link>
            <nav className="desktop-nav" aria-label="Main navigation">
              {navigation.map((n) => (
                <Link key={n.to} to={n.to} activeOptions={{ exact: true }}>
                  {n.label}
                </Link>
              ))}
            </nav>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <button
                type="button"
                onClick={toggleTheme}
                className="theme-toggle-btn light-sweep"
                aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`}
                title={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`}
              >
                <span className="theme-toggle-emoji" role="img" aria-label={theme === 'light' ? 'Light theme' : 'Dark theme'}>
                  {theme === 'light' ? '☀️' : '🌙'}
                </span>
              </button>
              <Button 
                type="button"
                variant="editorial" 
                className="nav-cta light-sweep hover-wobble cursor-pointer"
                onClick={() => openStartConversation()}
              >
                START A CONVERSATION
                <ArrowUpRight className="ml-1.5" />
              </Button>
            </div>
            <Button
              ref={menuToggle}
              className="menu-button"
              variant="line"
              size="icon"
              aria-label="Open navigation"
              aria-expanded={menu}
              onClick={() => setMenu(true)}
            >
              <Menu />
            </Button>
          </div>
        </div>
      </header>

      {/* MOBILE MENU */}
      {menu && (
        <div className="mobile-menu" role="dialog" aria-modal="true" aria-label="Navigation">
          <div className="mobile-menu-header">
            <Link to="/" aria-label="Jentora home" className="logo-wrap" onClick={() => setMenu(false)}>
              <img className="logo" src={logo} alt="Jentora" width={110} height={73} />
            </Link>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <button
                type="button"
                onClick={toggleTheme}
                className="theme-toggle-btn"
                aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`}
                title={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`}
              >
                <span className="theme-toggle-emoji" role="img" aria-label={theme === 'light' ? 'Light theme' : 'Dark theme'}>
                  {theme === 'light' ? '☀️' : '🌙'}
                </span>
              </button>
              <Button
                variant="line"
                size="icon"
                aria-label="Close navigation"
                onClick={() => {
                  setMenu(false);
                  menuToggle.current?.focus();
                }}
              >
                <X />
              </Button>
            </div>
          </div>
          <nav>
            {navigation.map((n, i) => (
              <Link key={n.to} ref={i === 0 ? firstLink : undefined} to={n.to} onClick={() => setMenu(false)}>
                <span>0{i + 1}</span>
                {n.label.toLowerCase().replace(/(^|\s)\S/g, (s) => s.toUpperCase())}
              </Link>
            ))}
          </nav>
          <div className="mt-6 flex flex-col gap-3">
            <Button
              type="button"
              variant="editorial"
              className="w-full light-sweep hover-wobble cursor-pointer"
              onClick={() => {
                setMenu(false);
                openStartConversation();
              }}
            >
              START A CONVERSATION
              <ArrowUpRight className="ml-2" />
            </Button>
          </div>
          <div className="mt-6 pt-6 border-t border-white/15 text-xs text-secondary/80 flex flex-col gap-2">
            <p className="font-semibold text-accent">JENTORA BUILDER PRIVATE LIMITED</p>
            <p>Chennai · Coimbatore</p>
            <a href="tel:+919444434196" className="hover:text-accent">+91 9444434196</a>
          </div>
          <p className="eyebrow mt-8">PASSION · PRECISION · PERFECTION</p>
        </div>
      )}

      {/* MAIN CONTENT */}
      <main id="main-content" className="page-transition" key={path}>
        {children}
      </main>

      {/* COMPREHENSIVE ARCHITECTURAL FOOTER */}
      <footer className="site-footer">
        <div className="container">
          {/* TOP CTA BAND */}
          <div className="footer-cta-band" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '30px', paddingBottom: '50px' }}>
            <div>
              <span className="eyebrow" style={{ marginBottom: '14px', display: 'inline-block' }}>START YOUR PROJECT</span>
              <h2 style={{ fontSize: '48px', lineHeight: '1.05', margin: '10px 0 0' }}>
                Let’s build something<br /><em>exceptional together.</em>
              </h2>
            </div>
            <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', alignItems: 'center' }}>
              <ContactLink light />
              <a
                href={company.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="line-button"
                style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '0 24px', height: '54px', fontSize: '13px', fontWeight: '600', textDecoration: 'none' }}
              >
                <MessageCircle size={17} style={{ color: '#25D366' }} /> CHAT ON WHATSAPP
              </a>
            </div>
          </div>

          {/* MAIN 4-COLUMN FOOTER GRID */}
          <div
            className="footer-grid-wrapper"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
              gap: '40px',
              padding: '50px 0 40px',
            }}
          >
            {/* COL 1: BRAND & EXPERTISE */}
            <div className="footer-col" style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
              <Link to="/" aria-label="Jentora home" style={{ display: 'inline-flex', width: 'fit-content' }}>
                <div
                  className="footer-logo-badge"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: '#070a12',
                    padding: '10px 32px',
                    borderRadius: '9999px',
                    border: '1.5px solid rgba(212, 175, 55, 0.55)',
                    boxShadow: '0 6px 20px rgba(0, 0, 0, 0.25)',
                    transition: 'all 0.3s ease',
                  }}
                >
                  <img className="logo" src={logo} alt="Jentora" style={{ width: '135px', height: '54px', objectFit: 'contain', display: 'block' }} />
                </div>
              </Link>
              <p style={{ fontSize: '13px', color: '#92400e', letterSpacing: '0.12em', fontWeight: '700' }}>
                PASSION · PRECISION · PERFECTION
              </p>
              <p style={{ fontSize: '15px', lineHeight: '1.7', maxWidth: '300px' }}>
                20 Years of industry experience delivering premium residential, commercial, and industrial landmarks built on trust and superior craftsmanship.
              </p>
              <div style={{ marginTop: '8px' }}>
                <span className="footer-section-title" style={{ marginBottom: '6px' }}>
                  OPERATING REGIONS
                </span>
                <p style={{ fontSize: '15px', fontWeight: '700', color: '#090d16' }}>
                  Chennai · Coimbatore
                </p>
              </div>

              {/* SOCIAL MEDIA INTEGRATION */}
              <div style={{ marginTop: '12px' }}>
                <span className="footer-section-title" style={{ marginBottom: '10px' }}>
                  FOLLOW OUR JOURNEY
                </span>
                <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                  <a
                    href={socialLinks.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Jentora Facebook"
                    className="footer-social-btn"
                  >
                    <Facebook size={16} />
                  </a>
                  <a
                    href={socialLinks.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Jentora Instagram"
                    className="footer-social-btn"
                  >
                    <Instagram size={16} />
                  </a>
                  <a
                    href={socialLinks.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Jentora LinkedIn"
                    className="footer-social-btn"
                  >
                    <Linkedin size={16} />
                  </a>
                  <a
                    href={socialLinks.youtube}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Jentora YouTube"
                    className="footer-social-btn"
                  >
                    <Youtube size={16} />
                  </a>
                </div>
              </div>
            </div>

            {/* COL 2: CONSTRUCTION SERVICES */}
            <div className="footer-col">
              <span className="footer-section-title">
                OUR SERVICES
              </span>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {services.map(([title], i) => (
                  <li key={title}>
                    <Link
                      to="/services"
                      style={{ fontSize: '15px', display: 'flex', alignItems: 'center', gap: '8px' }}
                    >
                      <span className="footer-num-badge">0{i + 1}</span> {title}
                    </Link>
                  </li>
                ))}
              </ul>
              <div style={{ marginTop: '24px', paddingTop: '16px', borderTop: '1px solid rgba(212, 175, 55, 0.25)' }}>
                <span className="footer-section-title" style={{ fontSize: '11px', marginBottom: '8px' }}>TURNKEY ASSURANCE</span>
                <p style={{ fontSize: '13px', lineHeight: '1.6', color: '#475569' }}>
                  End-to-end structural engineering, architectural blueprints, and handover guarantee across Tamil Nadu.
                </p>
              </div>
            </div>

            {/* COL 3: COMPANY & NAVIGATION */}
            <div className="footer-col">
              <span className="footer-section-title">
                EXPLORE JENTORA
              </span>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '14px' }}>
                {navigation.map((n, i) => (
                  <li key={n.to}>
                    <Link
                      to={n.to}
                      style={{ fontSize: '15px', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '10px' }}
                    >
                      <span className="footer-num-badge">0{i + 1}</span>
                      {n.label}
                    </Link>
                  </li>
                ))}
              </ul>
              <div className="footer-divider" style={{ marginTop: '28px', paddingTop: '20px', borderTop: '1px solid' }}>
                <p style={{ fontSize: '14px', marginBottom: '10px', lineHeight: '1.6' }}>
                  Have an architectural concept or construction project in mind?
                </p>
                <Link
                  to="/contact"
                  style={{ fontSize: '13px', fontWeight: '700', letterSpacing: '0.08em', color: '#b45309', display: 'inline-flex', alignItems: 'center', gap: '6px' }}
                  className="hover:underline"
                >
                  REQUEST PROJECT CONSULTATION <ArrowUpRight size={14} />
                </Link>
              </div>
              <div style={{ marginTop: '16px', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px', color: '#92400e', fontWeight: '600' }}>
                <ShieldCheck size={15} /> 100% Client Confidentiality & Safety
              </div>
            </div>

            {/* COL 4: REGISTERED OFFICE & CONTACT */}
            <div className="footer-col" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <span className="footer-section-title" style={{ marginBottom: '2px' }}>
                REGISTERED OFFICE
              </span>

              <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                <MapPin size={18} style={{ color: '#b45309', flexShrink: 0, marginTop: '3px' }} />
                <address style={{ fontStyle: 'normal', fontSize: '15px', lineHeight: '1.6' }}>
                  {company.address.full}
                </address>
              </div>

              {/* GOOGLE MAP IFRAME */}
              <div style={{ borderRadius: '8px', overflow: 'hidden', border: '1px solid rgba(212, 175, 55, 0.35)', marginTop: '6px', width: '100%', maxWidth: '320px' }}>
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d31090.06255432537!2d80.205851!3d13.08284!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a5265400136cad7%3A0x33538c1a7c98db7f!2sJentora%20Builder%20Private%20Limited!5e0!3m2!1sen!2sin!4v1792478711473!5m2!1sen!2sin"
                  width="100%"
                  height="160"
                  style={{ border: 0, display: 'block' }}
                  allowFullScreen={false}
                  loading="lazy"
                  referrerPolicy="strict-origin-when-cross-origin"
                  title="Jentora Builder Location Map"
                />
              </div>

              {/* PHONE NUMBERS */}
              <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start', marginTop: '6px' }}>
                <Phone size={18} style={{ color: '#b45309', flexShrink: 0, marginTop: '3px' }} />
                <div style={{ fontSize: '15px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  <a href={`tel:${company.primaryPhone.replace(/\s+/g, '')}`}>
                    {company.primaryPhone}
                  </a>
                </div>
              </div>

              {/* EMAIL ADDRESS */}
              <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                <Mail size={18} style={{ color: '#b45309', flexShrink: 0 }} />
                <a href={`mailto:${company.email}`} style={{ fontSize: '15px', fontWeight: '500' }}>
                  {company.email}
                </a>
              </div>

              {/* OPERATING HOURS */}
              <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                <Clock size={18} style={{ color: '#b45309', flexShrink: 0, marginTop: '3px' }} />
                <div style={{ fontSize: '14px' }}>
                  <span>{company.operatingHours}</span>
                </div>
              </div>

              {/* POWERED BY */}
              <div className="powered-by" style={{ marginTop: '16px', alignItems: 'flex-start' }}>
                <span style={{ fontSize: '12px', letterSpacing: '0.12em', color: '#92400e', fontWeight: '700' }}>POWERED BY</span>
                <a href="https://zenelaitinfotech.com/" target="_blank" rel="noopener noreferrer">
                  <img
                    style={{
                      height: '63px',
                      background: '#ffffff',
                      padding: '6px 14px',
                      borderRadius: '8px',
                      border: '1px solid rgba(180, 83, 9, 0.25)',
                      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
                      display: 'block',
                      objectFit: 'contain'
                    }}
                    src={zenelaitLogo}
                    alt="Zenelait Innotech"
                  />
                </a>
              </div>
            </div>
          </div>

          {/* HORIZONTAL ASSURANCE & HIGHLIGHTS RIBBON */}
          <div
            className="footer-assurance-ribbon"
            style={{
              marginTop: '45px',
              padding: '20px 32px',
              background: 'rgba(255, 255, 255, 0.88)',
              border: '1.5px solid rgba(212, 175, 55, 0.45)',
              borderRadius: '14px',
              boxShadow: '0 8px 30px rgba(212, 175, 55, 0.14)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-around',
              flexWrap: 'wrap',
              gap: '24px',
              fontSize: '13px',
              fontWeight: '600',
              color: '#090d16',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <ShieldCheck size={18} style={{ color: '#b45309' }} />
              <span>100% Quality & Structural Verification</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Clock size={18} style={{ color: '#b45309' }} />
              <span>Zero-Delay Milestone Execution</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <MapPin size={18} style={{ color: '#b45309' }} />
              <span>Prime Locations in Chennai & Coimbatore</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Award size={18} style={{ color: '#b45309' }} />
              <span>20 Years Architectural Pedigree</span>
            </div>
          </div>
        </div>

        {/* BOTTOM LEGAL STRIP */}
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} JENTORA BUILDER PVT LTD. ALL RIGHTS RESERVED.</span>
          <span>20 YEARS OF INDUSTRY EXPERIENCE</span>
          <div className="flex items-center gap-4 flex-wrap justify-center">
            <Button variant="minimal" className="h-auto text-[10px] font-semibold text-slate-700 hover:text-pink-600" onClick={() => setLegal('Privacy Policy')}>
              PRIVACY POLICY
            </Button>
            <Button variant="minimal" className="h-auto text-[10px] font-semibold text-slate-700 hover:text-pink-600" onClick={() => setLegal('Terms of Service')}>
              TERMS OF SERVICE
            </Button>
            <Link
              to="/admin/login"
              style={{
                fontSize: '10px',
                letterSpacing: '0.08em',
                color: '#92400e',
                textDecoration: 'none',
                fontWeight: '700',
              }}
              className="hover:text-pink-600 hover:underline"
            >
              ADMIN PORTAL
            </Link>
          </div>
        </div>
      </footer>

      {/* SVG GRADIENT DEFINITIONS */}
      <svg width="0" height="0" style={{ position: 'absolute', pointerEvents: 'none', opacity: 0 }} aria-hidden="true">
        <defs>
          <linearGradient id="pink-arrow-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ec4899" />
            <stop offset="100%" stopColor="#f43f5e" />
          </linearGradient>
        </defs>
      </svg>

      {/* FLOATING WHATSAPP BUTTON (GLOBAL) */}
      <a
        href={company.whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with Jentora Builder on WhatsApp"
        style={{
          position: 'fixed',
          bottom: '124px',
          right: '24px',
          zIndex: 90,
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          background: '#25D366',
          color: '#ffffff',
          padding: '12px 18px',
          borderRadius: '50px',
          boxShadow: '0 8px 24px rgba(37, 211, 102, 0.4)',
          textDecoration: 'none',
          fontSize: '12px',
          fontWeight: '600',
          letterSpacing: '0.04em',
          transition: 'transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.3s',
        }}
        className="whatsapp-float hover:scale-105 hover:shadow-2xl"
      >
        <MessageCircle size={20} fill="#ffffff" stroke="none" />
        <span className="hidden sm:inline">Chat on WhatsApp</span>
      </a>

      {/* LEGAL DIALOG */}
      <Dialog open={legal !== null} onOpenChange={(open) => { if (!open) setLegal(null); }}>
        <DialogContent className="legal-note">
          <DialogTitle>{legal}</DialogTitle>
          <DialogDescription>
            Jentora Builder Private Limited is committed to utmost transparency, regulatory compliance, and client data protection across our residential, commercial, and industrial construction projects. For specific legal inquiries, contact our registered office at {company.address.full} or email {company.email}.
          </DialogDescription>
        </DialogContent>
      </Dialog>

      {/* GLOBAL START CONVERSATION MODAL (POPUP TO 9444434196) */}
      <StartConversationModal />

      <CustomCursor />
      <div className="loader" aria-hidden="true">
        <img src={logo} alt="" />
        <span>PASSION · PRECISION · PERFECTION</span>
      </div>
    </>
  );
}
function CustomCursor() { const ref = useRef<HTMLDivElement>(null); useEffect(() => { if (!window.matchMedia('(pointer:fine) and (min-width:1024px) and (prefers-reduced-motion:no-preference)').matches) return; const move = (e: MouseEvent) => { const el = ref.current; if (!el) return; const target = e.target instanceof Element ? e.target : null; const over = Boolean(target?.closest('.project-image')); el.classList.toggle('over-project', over); el.textContent = over ? 'VIEW ↗' : ''; el.style.opacity = '1'; el.style.transform = `translate(${e.clientX - (over ? 32 : 5)}px,${e.clientY - (over ? 32 : 5)}px)` }; document.addEventListener('mousemove', move); return () => document.removeEventListener('mousemove', move) }, []); return <div ref={ref} className="custom-cursor" aria-hidden="true" /> }
export function ArchitecturalNotFound() { return <section className="not-found"><div className="container"><h1>404</h1><div className="eyebrow">PAGE NOT FOUND</div><h2>The space you are looking for<br /><em>does not exist here.</em></h2><Button asChild variant="light"><Link to="/">RETURN HOME<ArrowUpRight /></Link></Button></div></section> }
