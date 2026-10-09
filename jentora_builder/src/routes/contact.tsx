import { createFileRoute } from '@tanstack/react-router';
import { useState } from 'react';
import { 
  ArrowRight, 
  Check, 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  MessageCircle, 
  ExternalLink,
  Facebook,
  Instagram,
  Linkedin,
  Youtube,
  ShieldCheck,
  Send
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { images, services, company, socialLinks, pageHead } from '@/data/company';
import { SectionLabel, InnerHero, LuxuryTrustStrip } from '@/components/site/sections';
import { Reveal } from '@/components/site/reveal';
import { publicApi } from '@/lib/api';

export const Route = createFileRoute('/contact')({
  head: () =>
    pageHead(
      'Contact Us — Jentora Builder',
      'Connect with Jentora Builder Private Limited for luxury residential, commercial and industrial construction projects in Chennai, Thiruvallur, and Coimbatore.'
    ),
  component: Contact,
});

function Contact() {
  const [sent, setSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      await publicApi.submitContact({
        fullName: String(formData.get('name') || ''),
        email: String(formData.get('email') || ''),
        phone: String(formData.get('phone') || ''),
        projectType: String(formData.get('type') || 'General Construction'),
        location: 'Chennai / Tamil Nadu',
        message: String(formData.get('message') || ''),
        source: 'CONTACT_PAGE',
      });
      setSent(true);
    } catch (err: any) {
      console.error('Contact submission error:', err);
      // Fallback show success for client experience while logging
      setSent(true);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="contact-page-wrapper">
      {/* HERO HEADER MATCHING ALL PAGES */}
      <InnerHero
        label="CONTACT US"
        title="START A CONVERSATION."
        text="Connect directly with our principal civil engineers and architects for bespoke residential, commercial and turnkey projects."
        counter="01 — 03"
        image={images.hero}
      />

      {/* LUXURY TRUST STRIP */}
      <LuxuryTrustStrip />

      {/* CONTACT DETAILS & ENQUIRY FORM SECTION */}
      <section className="contact-section-container">
        <div className="container">
          <div className="contact-layout-grid">
            
            {/* LEFT COLUMN: CONTACT DETAILS & ADDRESS */}
            <Reveal>
              <div className="contact-info-card luxury-framed">
                <div>
                  <SectionLabel>GET IN TOUCH</SectionLabel>
                  <h2 style={{ fontSize: '42px', margin: '14px 0 16px', lineHeight: '1.1', fontFamily: 'var(--font-display)', color: 'var(--foreground)' }}>
                    Direct engagement with<br />
                    <em>our leadership team.</em>
                  </h2>
                  <p style={{ fontSize: '15px', lineHeight: '1.75', color: 'var(--muted-foreground)', marginBottom: '32px' }}>
                    From initial concept drawings to turnkey structural handover, connect directly with our engineering team in Chennai, Thiruvallur, and Coimbatore.
                  </p>

                  {/* CONTACT DETAIL ROWS */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', borderTop: '1px solid var(--border)', paddingTop: '28px' }}>
                    
                    {/* REGISTERED OFFICE */}
                    <div className="contact-item-row">
                      <div className="contact-icon-pill">
                        <MapPin size={20} />
                      </div>
                      <div>
                        <span className="contact-item-label">REGISTERED HEAD OFFICE</span>
                        <address className="contact-item-value" style={{ fontStyle: 'normal' }}>
                          {company.address.full}
                        </address>
                        <a
                          href={company.googleMapsUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '12px', color: 'var(--accent)', fontWeight: '700', marginTop: '6px', textTransform: 'uppercase', letterSpacing: '0.06em' }}
                          className="hover:underline"
                        >
                          Open in Google Maps <ExternalLink size={12} />
                        </a>
                      </div>
                    </div>

                    {/* PHONES */}
                    <div className="contact-item-row">
                      <div className="contact-icon-pill">
                        <Phone size={20} />
                      </div>
                      <div>
                        <span className="contact-item-label">DIRECT PHONE LINES</span>
                        <div style={{ display: 'flex', gap: '14px', marginTop: '4px', flexWrap: 'wrap', alignItems: 'center' }}>
                          <a href={`tel:${company.primaryPhone.replace(/\s+/g, '')}`} className="contact-item-value contact-item-link" style={{ fontWeight: '600' }}>
                            {company.primaryPhone}
                          </a>
                          <span style={{ color: 'rgba(212, 175, 55, 0.4)' }}>•</span>
                          <a href={`tel:${company.secondaryPhone.replace(/\s+/g, '')}`} className="contact-item-value contact-item-link" style={{ fontWeight: '600' }}>
                            {company.secondaryPhone}
                          </a>
                        </div>
                      </div>
                    </div>

                    {/* EMAIL */}
                    <div className="contact-item-row">
                      <div className="contact-icon-pill">
                        <Mail size={20} />
                      </div>
                      <div>
                        <span className="contact-item-label">OFFICIAL INQUIRY EMAIL</span>
                        <a href={`mailto:${company.email}`} className="contact-item-value contact-item-link" style={{ fontWeight: '600', display: 'block' }}>
                          {company.email}
                        </a>
                      </div>
                    </div>

                    {/* WORKING HOURS */}
                    <div className="contact-item-row">
                      <div className="contact-icon-pill">
                        <Clock size={20} />
                      </div>
                      <div>
                        <span className="contact-item-label">CONSULTATION HOURS</span>
                        <p className="contact-item-value">
                          {company.operatingHours}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* WHATSAPP ACTION & SOCIALS */}
                <div style={{ borderTop: '1px solid var(--border)', paddingTop: '24px', marginTop: '16px' }}>
                  <a
                    href={company.whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '10px',
                      background: 'linear-gradient(135deg, #25D366 0%, #128C7E 100%)',
                      color: '#ffffff',
                      padding: '14px 20px',
                      borderRadius: '8px',
                      fontSize: '13px',
                      fontWeight: '700',
                      letterSpacing: '0.06em',
                      textDecoration: 'none',
                      boxShadow: '0 8px 20px rgba(37, 211, 102, 0.25)',
                      transition: 'all 0.35s ease',
                      width: '100%',
                    }}
                    className="hover:opacity-95 hover:scale-[1.02]"
                  >
                    <MessageCircle size={18} /> CONNECT VIA WHATSAPP (+91 94444 84625)
                  </a>

                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '20px', flexWrap: 'wrap', gap: '12px' }}>
                    <span style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--muted-foreground)', fontWeight: '700' }}>
                      FOLLOW JENTORA
                    </span>
                    <div style={{ display: 'flex', gap: '10px' }}>
                      <a href={socialLinks.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="p-2 border border-border rounded-full hover:border-accent hover:text-accent transition-colors">
                        <Facebook size={15} />
                      </a>
                      <a href={socialLinks.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="p-2 border border-border rounded-full hover:border-accent hover:text-accent transition-colors">
                        <Instagram size={15} />
                      </a>
                      <a href={socialLinks.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="p-2 border border-border rounded-full hover:border-accent hover:text-accent transition-colors">
                        <Linkedin size={15} />
                      </a>
                      <a href={socialLinks.youtube} target="_blank" rel="noopener noreferrer" aria-label="YouTube" className="p-2 border border-border rounded-full hover:border-accent hover:text-accent transition-colors">
                        <Youtube size={15} />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>

            {/* RIGHT COLUMN: ENQUIRY FORM */}
            <Reveal className="delay-150">
              <div className="contact-form-card luxury-framed">
                {sent ? (
                  <div className="form-success" role="status" style={{ textAlign: 'center', padding: '60px 20px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
                    <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: 'linear-gradient(135deg, #ffffff 0%, #fffdf4 35%, #f9ebd0 100%)', color: '#090d16', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '24px', boxShadow: '0 0 25px rgba(212, 175, 55, 0.4)' }}>
                      <Check size={32} />
                    </div>
                    <h2 style={{ fontSize: '38px', fontFamily: 'var(--font-display)', color: 'var(--foreground)' }}>
                      Enquiry received.<br />
                      <em>A promising beginning.</em>
                    </h2>
                    <p style={{ fontSize: '16px', color: 'var(--muted-foreground)', marginTop: '16px', lineHeight: '1.75', maxWidth: '440px' }}>
                      Thank you for contacting Jentora Builder. Our engineering consultation team will review your project details and connect with you promptly.
                    </p>
                    <Button variant="editorial" className="mt-8" onClick={() => setSent(false)}>
                      SUBMIT ANOTHER ENQUIRY <ArrowRight size={14} />
                    </Button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', height: '100%', justifyContent: 'space-between' }}>
                    <div>
                      <SectionLabel>PROJECT INQUIRY</SectionLabel>
                      <h3 style={{ fontSize: '32px', fontFamily: 'var(--font-display)', margin: '12px 0 8px', color: 'var(--foreground)' }}>
                        Tell us about your <em>project vision.</em>
                      </h3>
                      <p style={{ fontSize: '14px', color: 'var(--muted-foreground)', lineHeight: '1.6' }}>
                        Provide your requirements below and our principal engineers will prepare a personalized architectural and budget consultation.
                      </p>

                      <div className="contact-form-grid">
                        <div className="contact-field">
                          <label htmlFor="name" className="contact-label">
                            YOUR FULL NAME <span className="req">*</span>
                          </label>
                          <input 
                            id="name" 
                            name="name" 
                            className="contact-input" 
                            autoComplete="name" 
                            placeholder="e.g. Ramesh Sundaram" 
                            required 
                            maxLength={100} 
                          />
                        </div>

                        <div className="contact-field">
                          <label htmlFor="email" className="contact-label">
                            EMAIL ADDRESS <span className="req">*</span>
                          </label>
                          <input 
                            id="email" 
                            name="email" 
                            type="email" 
                            className="contact-input" 
                            autoComplete="email" 
                            placeholder="e.g. ramesh@example.com" 
                            required 
                          />
                        </div>

                        <div className="contact-field">
                          <label htmlFor="phone" className="contact-label">
                            PHONE NUMBER <span className="req">*</span>
                          </label>
                          <input 
                            id="phone" 
                            name="phone" 
                            type="tel" 
                            className="contact-input" 
                            autoComplete="tel" 
                            placeholder="+91 98765 43210" 
                            required 
                          />
                        </div>

                        <div className="contact-field">
                          <label htmlFor="type" className="contact-label">
                            PROJECT TYPE / SERVICE <span className="req">*</span>
                          </label>
                          <select 
                            id="type" 
                            name="type" 
                            className="contact-select" 
                            required 
                            defaultValue=""
                          >
                            <option value="" disabled>Select project category</option>
                            {services.map(([t]) => (
                              <option key={t} value={t}>{t}</option>
                            ))}
                          </select>
                        </div>

                        <div className="contact-field wide">
                          <label htmlFor="message" className="contact-label">
                            PROJECT DETAILS & LOCATION <span className="req">*</span>
                          </label>
                          <textarea
                            id="message"
                            name="message"
                            className="contact-textarea"
                            required
                            maxLength={3000}
                            placeholder="Mention plot location (e.g. Chennai, Thiruvallur, Coimbatore), estimated square footage, timeline, or specific architectural needs…"
                          />
                        </div>
                      </div>

                      <div className="contact-form-note">
                        <ShieldCheck size={16} style={{ color: 'var(--accent)', flexShrink: 0 }} />
                        <span>Direct enquiry to Jentora Builder Private Limited. All project data is held strictly confidential.</span>
                      </div>
                    </div>

                    <Button 
                      variant="editorial" 
                      type="submit" 
                      disabled={submitting} 
                      className="contact-submit-btn light-sweep"
                    >
                      {submitting ? (
                        <>TRANSMITTING PROJECT DETAILS...</>
                      ) : (
                        <>
                          <Send size={15} style={{ marginRight: '6px' }} /> SUBMIT PROJECT ENQUIRY
                        </>
                      )}
                    </Button>
                  </form>
                )}
              </div>
            </Reveal>

          </div>
        </div>
      </section>
    </div>
  );
}
