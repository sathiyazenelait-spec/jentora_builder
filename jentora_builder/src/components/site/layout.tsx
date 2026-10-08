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
  ExternalLink
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import logo from '@/assets/jentora-logo.png';
import zenelaitLogo from '@/assets/zenelait-logo.png';
import { company, navigation, services, socialLinks } from '@/data/company';
import { ContactLink } from './sections';

export function SiteLayout({ children }: { children: ReactNode }) {
  const path = useRouterState({ select: (s) => s.location.pathname });
  const [menu, setMenu] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [legal, setLegal] = useState<string | null>(null);
  const firstLink = useRef<HTMLAnchorElement>(null);
  const menuToggle = useRef<HTMLButtonElement>(null);

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
            <Button asChild variant="editorial" className="nav-cta light-sweep">
              <Link to="/contact">
                START A CONVERSATION
                <ArrowUpRight />
              </Link>
            </Button>
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
            <Link to="/" aria-label="Jentora home" onClick={() => setMenu(false)}>
              <img className="logo" src={logo} alt="Jentora" />
            </Link>
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
          <nav>
            {navigation.map((n, i) => (
              <Link key={n.to} ref={i === 0 ? firstLink : undefined} to={n.to} onClick={() => setMenu(false)}>
                <span>0{i + 1}</span>
                {n.label.toLowerCase().replace(/(^|\s)\S/g, (s) => s.toUpperCase())}
              </Link>
            ))}
          </nav>
          <div className="mt-8 pt-6 border-t border-white/15 text-xs text-secondary/80 flex flex-col gap-2">
            <p className="font-semibold text-accent">JENTORA BUILDER PRIVATE LIMITED</p>
            <p>Chennai · Thiruvallur · Coimbatore</p>
            <a href="tel:+919444484625" className="hover:text-accent">+91 9444484625</a>
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
          <div className="footer-cta-band" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '30px', paddingBottom: '50px', borderBottom: '1px solid var(--light-line)' }}>
            <div>
              <span className="eyebrow" style={{ color: 'var(--accent)', marginBottom: '14px' }}>START YOUR PROJECT</span>
              <h2 style={{ fontSize: '48px', lineHeight: '1.05', margin: '10px 0 0', color: '#ffffff' }}>
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
                style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '0 22px', height: '52px', fontSize: '10px', fontWeight: '500', textDecoration: 'none' }}
              >
                <MessageCircle size={15} style={{ color: '#25D366' }} /> CHAT ON WHATSAPP
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
              <Link to="/" aria-label="Jentora home">
                <img className="logo" src={logo} alt="Jentora" style={{ width: '130px', height: 'auto' }} />
              </Link>
              <p style={{ fontSize: '11px', color: 'var(--accent)', letterSpacing: '0.12em', fontWeight: '600' }}>
                PASSION · PRECISION · PERFECTION
              </p>
              <p style={{ fontSize: '13px', lineHeight: '1.7', color: '#cbd5e1', maxWidth: '300px' }}>
                17 Years of industry experience delivering premium residential, commercial, and industrial landmarks built on trust and superior craftsmanship.
              </p>
              <div style={{ marginTop: '8px' }}>
                <span style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--accent)', display: 'block', marginBottom: '8px' }}>
                  KEY OPERATING HUBS
                </span>
                <p style={{ fontSize: '13px', fontWeight: '500', color: '#ffffff' }}>
                  Chennai · Thiruvallur · Coimbatore
                </p>
              </div>

              {/* SOCIAL MEDIA INTEGRATION */}
              <div style={{ marginTop: '12px' }}>
                <span style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--accent)', display: 'block', marginBottom: '12px' }}>
                  FOLLOW OUR JOURNEY
                </span>
                <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                  <a
                    href={socialLinks.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Jentora Facebook"
                    style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '36px', height: '36px', borderRadius: '50%', border: '1px solid rgba(212, 175, 55, 0.35)', color: '#ffffff', transition: 'all 0.3s' }}
                    className="hover:border-accent hover:text-accent hover:scale-105"
                  >
                    <Facebook size={16} />
                  </a>
                  <a
                    href={socialLinks.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Jentora Instagram"
                    style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '36px', height: '36px', borderRadius: '50%', border: '1px solid rgba(212, 175, 55, 0.35)', color: '#ffffff', transition: 'all 0.3s' }}
                    className="hover:border-accent hover:text-accent hover:scale-105"
                  >
                    <Instagram size={16} />
                  </a>
                  <a
                    href={socialLinks.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Jentora LinkedIn"
                    style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '36px', height: '36px', borderRadius: '50%', border: '1px solid rgba(212, 175, 55, 0.35)', color: '#ffffff', transition: 'all 0.3s' }}
                    className="hover:border-accent hover:text-accent hover:scale-105"
                  >
                    <Linkedin size={16} />
                  </a>
                  <a
                    href={socialLinks.youtube}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Jentora YouTube"
                    style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '36px', height: '36px', borderRadius: '50%', border: '1px solid rgba(212, 175, 55, 0.35)', color: '#ffffff', transition: 'all 0.3s' }}
                    className="hover:border-accent hover:text-accent hover:scale-105"
                  >
                    <Youtube size={16} />
                  </a>
                </div>
              </div>
            </div>

            {/* COL 2: CONSTRUCTION SERVICES */}
            <div className="footer-col">
              <span style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--accent)', fontWeight: '600', display: 'block', marginBottom: '18px' }}>
                OUR SERVICES
              </span>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {services.map(([title], i) => (
                  <li key={title}>
                    <Link
                      to="/services"
                      style={{ fontSize: '13px', color: '#cbd5e1', transition: 'color 0.3s', display: 'flex', alignItems: 'center', gap: '8px' }}
                      className="hover:text-accent"
                    >
                      <span style={{ fontSize: '9px', color: 'var(--accent)' }}>0{i + 1}</span> {title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* COL 3: COMPANY & NAVIGATION */}
            <div className="footer-col">
              <span style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--accent)', fontWeight: '600', display: 'block', marginBottom: '18px' }}>
                EXPLORE JENTORA
              </span>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {navigation.map((n, i) => (
                  <li key={n.to}>
                    <Link
                      to={n.to}
                      style={{ fontSize: '13px', fontWeight: '500', color: '#ffffff', transition: 'color 0.3s', display: 'flex', alignItems: 'center', gap: '10px' }}
                      className="hover:text-accent"
                    >
                      <span style={{ fontSize: '10px', color: 'var(--accent)' }}>0{i + 1}</span>
                      {n.label}
                    </Link>
                  </li>
                ))}
              </ul>
              <div style={{ marginTop: '28px', paddingTop: '20px', borderTop: '1px solid var(--light-line)' }}>
                <p style={{ fontSize: '12px', color: '#cbd5e1', marginBottom: '8px' }}>
                  Have an architectural concept or construction project in mind?
                </p>
                <Link
                  to="/contact"
                  style={{ fontSize: '11px', fontWeight: '600', letterSpacing: '0.08em', color: 'var(--accent)', display: 'inline-flex', alignItems: 'center', gap: '6px' }}
                  className="hover:underline"
                >
                  REQUEST PROJECT CONSULTATION <ArrowUpRight size={13} />
                </Link>
              </div>
            </div>

            {/* COL 4: REGISTERED OFFICE & CONTACT */}
            <div className="footer-col" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <span style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--accent)', fontWeight: '600', display: 'block', marginBottom: '2px' }}>
                REGISTERED OFFICE
              </span>
              
              <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                <MapPin size={18} style={{ color: 'var(--accent)', flexShrink: 0, marginTop: '3px' }} />
                <address style={{ fontStyle: 'normal', fontSize: '13px', lineHeight: '1.6', color: '#cbd5e1' }}>
                  {company.address.full}
                </address>
              </div>

              {/* GOOGLE MAP LINK BUTTON */}
              <a
                href={company.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  fontSize: '10px',
                  letterSpacing: '0.06em',
                  fontWeight: '600',
                  color: 'var(--accent)',
                  padding: '6px 0',
                }}
                className="hover:underline"
              >
                OPEN IN GOOGLE MAPS <ExternalLink size={12} />
              </a>

              {/* PHONE NUMBERS */}
              <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start', marginTop: '6px' }}>
                <Phone size={18} style={{ color: 'var(--accent)', flexShrink: 0, marginTop: '3px' }} />
                <div style={{ fontSize: '13px', color: '#cbd5e1', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  <a href={`tel:${company.primaryPhone.replace(/\s+/g, '')}`} className="hover:text-accent" style={{ color: '#cbd5e1' }}>
                    {company.primaryPhone}
                  </a>
                  <a href={`tel:${company.secondaryPhone.replace(/\s+/g, '')}`} className="hover:text-accent" style={{ color: '#cbd5e1' }}>
                    {company.secondaryPhone}
                  </a>
                </div>
              </div>

              {/* EMAIL ADDRESS */}
              <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                <Mail size={18} style={{ color: 'var(--accent)', flexShrink: 0 }} />
                <a href={`mailto:${company.email}`} style={{ fontSize: '13px', color: '#cbd5e1' }} className="hover:text-accent">
                  {company.email}
                </a>
              </div>

              {/* OPERATING HOURS */}
              <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                <Clock size={18} style={{ color: 'var(--accent)', flexShrink: 0, marginTop: '3px' }} />
                <div style={{ fontSize: '12px', color: '#cbd5e1' }}>
                  <span>{company.operatingHours}</span>
                </div>
              </div>

              {/* POWERED BY */}
              <div className="powered-by" style={{ marginTop: '16px', alignItems: 'flex-start' }}>
                <span style={{ fontSize: '10px', letterSpacing: '0.12em', color: 'var(--accent)' }}>POWERED BY</span>
                <a href="https://zenelaitinfotech.com/" target="_blank" rel="noopener noreferrer">
                  <img style={{ height: '34px', background: '#ffffff', padding: '4px 8px', borderRadius: '4px' }} src={zenelaitLogo} alt="Zenelait Innotech" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* BOTTOM LEGAL STRIP */}
        <div className="footer-bottom" style={{ color: '#94a3b8' }}>
          <span style={{ color: '#cbd5e1' }}>© {new Date().getFullYear()} JENTORA BUILDER PRIVATE LIMITED. ALL RIGHTS RESERVED.</span>
          <span style={{ color: '#94a3b8' }}>17 YEARS OF INDUSTRY EXPERIENCE · PASSION · PRECISION · PERFECTION</span>
          <div className="flex items-center gap-5">
            <Button variant="minimal" className="h-auto text-[8px] text-slate-300 hover:text-white" onClick={() => setLegal('Privacy Policy')}>
              PRIVACY POLICY
            </Button>
            <Button variant="minimal" className="h-auto text-[8px] text-slate-300 hover:text-white" onClick={() => setLegal('Terms of Service')}>
              TERMS OF SERVICE
            </Button>
            <Link
              to="/admin/login"
              style={{
                fontSize: '8px',
                letterSpacing: '0.08em',
                color: 'var(--accent)',
                opacity: 0.9,
                textDecoration: 'none',
                fontWeight: '600',
              }}
              className="hover:opacity-100 hover:underline"
            >
              ADMIN PORTAL
            </Link>
          </div>
        </div>
      </footer>

      {/* FLOATING WHATSAPP BUTTON (GLOBAL) */}
      <a
        href={company.whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with Jentora Builder on WhatsApp"
        style={{
          position: 'fixed',
          bottom: '24px',
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

      <CustomCursor />
      <div className="loader" aria-hidden="true">
        <img src={logo} alt="" />
        <span>PASSION · PRECISION · PERFECTION</span>
      </div>
    </>
  );
}
function CustomCursor(){const ref=useRef<HTMLDivElement>(null);useEffect(()=>{if(!window.matchMedia('(pointer:fine) and (min-width:1024px) and (prefers-reduced-motion:no-preference)').matches)return;const move=(e:MouseEvent)=>{const el=ref.current;if(!el)return;const target=e.target instanceof Element?e.target:null;const over=Boolean(target?.closest('.project-image'));el.classList.toggle('over-project',over);el.textContent=over?'VIEW ↗':'';el.style.opacity='1';el.style.transform=`translate(${e.clientX-(over?32:5)}px,${e.clientY-(over?32:5)}px)`};document.addEventListener('mousemove',move);return()=>document.removeEventListener('mousemove',move)},[]);return <div ref={ref} className="custom-cursor" aria-hidden="true"/>}
export function ArchitecturalNotFound(){return <section className="not-found"><div className="container"><h1>404</h1><div className="eyebrow">PAGE NOT FOUND</div><h2>The space you are looking for<br/><em>does not exist here.</em></h2><Button asChild variant="light"><Link to="/">RETURN HOME<ArrowUpRight/></Link></Button></div></section>}
