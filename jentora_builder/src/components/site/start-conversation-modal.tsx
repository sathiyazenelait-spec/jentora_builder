import React, { useState, useEffect } from 'react';
import { 
  X, 
  Send, 
  MessageSquare, 
  CheckCircle2, 
  Sparkles, 
  Building2, 
  User, 
  Mail, 
  FileText,
  PhoneCall
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { publicApi } from '@/lib/api';

const WHATSAPP_PHONE = '919444434196'; // Indian country code 91 + 9444434196

export interface ConversationModalEventDetail {
  projectType?: string;
}

export function openStartConversation(projectType?: string) {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(
      new CustomEvent<ConversationModalEventDetail>('open-start-conversation', {
        detail: { projectType },
      })
    );
  }
}

const PROJECT_TYPES = [
  'Luxury Villa',
  'Residential Construction',
  'Commercial Building',
  'Interior Architecture & Fitout',
  'Turnkey Industrial Landmark',
  'Structural Renovation & Expansion',
  'Architectural 3D & Civil Planning',
  'Other Construction Enquiry',
];

export function StartConversationModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [projectType, setProjectType] = useState(PROJECT_TYPES[0]);
  const [customProjectType, setCustomProjectType] = useState('');
  const [query, setQuery] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    const handleOpen = (e: Event) => {
      const customEvent = e as CustomEvent<ConversationModalEventDetail>;
      if (customEvent.detail?.projectType) {
        setProjectType(customEvent.detail.projectType);
      }
      setIsOpen(true);
      setSubmitted(false);
      setErrorMsg('');
    };

    window.addEventListener('open-start-conversation', handleOpen);
    return () => {
      window.removeEventListener('open-start-conversation', handleOpen);
    };
  }, []);

  // Close on Escape key
  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false);
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [isOpen]);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!fullName.trim()) {
      setErrorMsg('Please enter your full name.');
      return;
    }
    if (!email.trim() || !email.includes('@')) {
      setErrorMsg('Please enter a valid email address.');
      return;
    }
    if (!query.trim()) {
      setErrorMsg('Please enter your project query or requirements.');
      return;
    }

    const selectedType = projectType === 'Other Construction Enquiry' && customProjectType.trim() 
      ? customProjectType.trim() 
      : projectType;

    // Exact label formatting requested by user:
    // username:karthi,
    // email:karthi@gmail.com
    // project type:luxary villa,
    // query: i need the construction with full details and customize optimal module.
    const formattedMessage = [
      `username:${fullName.trim()},`,
      `email:${email.trim()},`,
      `project type:${selectedType},`,
      `query:${query.trim()}`
    ].join('\n');

    setIsSubmitting(true);

    // Also persist in the backend database if available
    try {
      await publicApi.submitContact({
        fullName: fullName.trim(),
        email: email.trim(),
        phone: '9444434196',
        projectType: selectedType,
        location: 'Tamil Nadu (Chennai / Coimbatore)',
        message: query.trim(),
        source: 'START_CONVERSATION_POPUP',
      });
    } catch (err) {
      // Non-blocking log to ensure user can still WhatsApp seamlessly
      console.warn('Backend logging notice:', err);
    }

    // Direct WhatsApp link to 9444434196
    const whatsappUrl = `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(formattedMessage)}`;
    
    // Open WhatsApp
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');

    setIsSubmitting(false);
    setSubmitted(true);
  };

  const handleResetAndClose = () => {
    setIsOpen(false);
    setSubmitted(false);
    setFullName('');
    setEmail('');
    setQuery('');
    setCustomProjectType('');
    setErrorMsg('');
  };

  if (!isOpen) return null;

  return (
    <div 
      className="conversation-modal-overlay"
      role="dialog"
      aria-modal="true"
      aria-labelledby="conversation-modal-title"
      onClick={(e) => {
        if (e.target === e.currentTarget) handleResetAndClose();
      }}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '16px',
        background: 'rgba(5, 8, 15, 0.78)',
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)',
        animation: 'fadeIn 0.25s cubic-bezier(0.16, 1, 0.3, 1) both',
      }}
    >
      <div 
        className="conversation-modal-container"
        style={{
          position: 'relative',
          width: '100%',
          maxWidth: '560px',
          maxHeight: '92vh',
          overflowY: 'auto',
          background: 'var(--primary)',
          color: 'var(--foreground)',
          border: '1.5px solid rgba(212, 175, 55, 0.45)',
          borderRadius: '20px',
          boxShadow: '0 25px 60px rgba(0, 0, 0, 0.45), 0 0 30px rgba(212, 175, 55, 0.15)',
          padding: 'clamp(24px, 5vw, 40px)',
          animation: 'scaleUp 0.3s cubic-bezier(0.16, 1, 0.3, 1) both',
        }}
      >
        {/* CLOSE BUTTON */}
        <button
          type="button"
          onClick={handleResetAndClose}
          aria-label="Close conversation modal"
          style={{
            position: 'absolute',
            top: '20px',
            right: '20px',
            width: '38px',
            height: '38px',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: '1px solid var(--border)',
            background: 'var(--secondary)',
            color: 'var(--foreground)',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
          }}
          className="hover:rotate-90 hover:border-accent"
        >
          <X size={18} />
        </button>

        {!submitted ? (
          <>
            {/* MODAL HEADER */}
            <div style={{ marginBottom: '24px', paddingRight: '36px' }}>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: 'var(--accent)', fontSize: '12px', fontWeight: '700', letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: '8px' }}>
                <Sparkles size={14} /> JENTORA VIP CONSULTATION
              </div>
              <h2 id="conversation-modal-title" style={{ fontSize: 'clamp(24px, 4vw, 32px)', lineHeight: '1.2', margin: '4px 0 10px', fontFamily: 'var(--font-sans)', fontWeight: '700' }}>
                Start a Conversation
              </h2>
              <p style={{ fontSize: '14px', color: 'var(--muted-foreground)', lineHeight: '1.6' }}>
                Connect directly with our engineering & architectural leadership. Your inquiry will be formatted and routed straight to our principal line at <strong>+91 9444434196</strong>.
              </p>
            </div>

            {/* ERROR MESSAGE IF ANY */}
            {errorMsg && (
              <div style={{ padding: '12px 16px', background: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.3)', borderRadius: '10px', color: '#ef4444', fontSize: '13px', marginBottom: '20px' }}>
                {errorMsg}
              </div>
            )}

            {/* FORM */}
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
              {/* YOUR FULL NAME */}
              <div>
                <label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', fontWeight: '700', letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--foreground)', marginBottom: '8px' }}>
                  <User size={13} style={{ color: 'var(--accent)' }} /> YOUR FULL NAME *
                </label>
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="e.g. Karthi"
                  style={{
                    width: '100%',
                    padding: '13px 16px',
                    borderRadius: '10px',
                    border: '1px solid var(--border)',
                    background: 'var(--secondary)',
                    color: 'var(--foreground)',
                    fontSize: '15px',
                    outline: 'none',
                    transition: 'border-color 0.2s',
                  }}
                  className="focus:border-accent"
                />
              </div>

              {/* EMAIL ADDRESS */}
              <div>
                <label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', fontWeight: '700', letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--foreground)', marginBottom: '8px' }}>
                  <Mail size={13} style={{ color: 'var(--accent)' }} /> EMAIL ADDRESS *
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="e.g. karthi@gmail.com"
                  style={{
                    width: '100%',
                    padding: '13px 16px',
                    borderRadius: '10px',
                    border: '1px solid var(--border)',
                    background: 'var(--secondary)',
                    color: 'var(--foreground)',
                    fontSize: '15px',
                    outline: 'none',
                    transition: 'border-color 0.2s',
                  }}
                  className="focus:border-accent"
                />
              </div>

              {/* PROJECT TYPE / SERVICE */}
              <div>
                <label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', fontWeight: '700', letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--foreground)', marginBottom: '8px' }}>
                  <Building2 size={13} style={{ color: 'var(--accent)' }} /> PROJECT TYPE / SERVICE *
                </label>
                <select
                  value={projectType}
                  onChange={(e) => setProjectType(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '13px 16px',
                    borderRadius: '10px',
                    border: '1px solid var(--border)',
                    background: 'var(--secondary)',
                    color: 'var(--foreground)',
                    fontSize: '15px',
                    outline: 'none',
                    cursor: 'pointer',
                  }}
                  className="focus:border-accent"
                >
                  {PROJECT_TYPES.map((t) => (
                    <option key={t} value={t} style={{ background: 'var(--primary)', color: 'var(--foreground)' }}>
                      {t}
                    </option>
                  ))}
                </select>

                {projectType === 'Other Construction Enquiry' && (
                  <input
                    type="text"
                    value={customProjectType}
                    onChange={(e) => setCustomProjectType(e.target.value)}
                    placeholder="Specify project type (e.g. Luxury Penthouse)"
                    style={{
                      width: '100%',
                      marginTop: '8px',
                      padding: '11px 16px',
                      borderRadius: '8px',
                      border: '1px solid var(--border)',
                      background: 'var(--secondary)',
                      color: 'var(--foreground)',
                      fontSize: '14px',
                    }}
                  />
                )}
              </div>

              {/* QUERY */}
              <div>
                <label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', fontWeight: '700', letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--foreground)', marginBottom: '8px' }}>
                  <FileText size={13} style={{ color: 'var(--accent)' }} /> QUERY / REQUIREMENTS *
                </label>
                <textarea
                  required
                  rows={4}
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="e.g. i need the construction with full details and customize optimal module."
                  style={{
                    width: '100%',
                    padding: '13px 16px',
                    borderRadius: '10px',
                    border: '1px solid var(--border)',
                    background: 'var(--secondary)',
                    color: 'var(--foreground)',
                    fontSize: '15px',
                    lineHeight: '1.6',
                    outline: 'none',
                    resize: 'vertical',
                    minHeight: '100px',
                  }}
                  className="focus:border-accent"
                />
              </div>

              {/* LIVE MESSAGE PREVIEW */}
              <div style={{ padding: '12px 16px', background: 'var(--secondary)', border: '1px dashed var(--border)', borderRadius: '10px', fontSize: '12px' }}>
                <span style={{ color: 'var(--accent)', fontWeight: '700', display: 'block', marginBottom: '6px' }}>
                  ✦ DIRECT MESSAGE PREVIEW (TO 9444434196):
                </span>
                <pre style={{ margin: 0, fontFamily: 'monospace', fontSize: '12px', whiteSpace: 'pre-wrap', color: 'var(--foreground)', opacity: 0.85 }}>
                  username:{fullName || 'your_name'},{'\n'}
                  email:{email || 'your_email@domain.com'},{'\n'}
                  project type:{projectType === 'Other Construction Enquiry' && customProjectType ? customProjectType : projectType},{'\n'}
                  query:{query || 'your query details...'}
                </pre>
              </div>

              {/* SUBMIT BUTTON */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="light-sweep hover-wobble"
                style={{
                  width: '100%',
                  marginTop: '10px',
                  height: '54px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '10px',
                  borderRadius: '12px',
                  background: 'linear-gradient(135deg, #d4af37 0%, #b8860b 100%)',
                  color: '#070a12',
                  fontWeight: '700',
                  fontSize: '15px',
                  letterSpacing: '0.04em',
                  border: 'none',
                  cursor: isSubmitting ? 'not-allowed' : 'pointer',
                  boxShadow: '0 8px 24px rgba(212, 175, 55, 0.35)',
                  transition: 'transform 0.2s, box-shadow 0.2s',
                }}
              >
                <Send size={18} />
                {isSubmitting ? 'DISPATCHING INQUIRY...' : 'SEND DIRECTLY TO +91 9444434196'}
              </button>

              <div style={{ textAlign: 'center', fontSize: '12px', color: 'var(--muted-foreground)', marginTop: '4px' }}>
                Instant delivery to Jentora Leadership via WhatsApp (+91 9444434196)
              </div>
            </form>
          </>
        ) : (
          /* SUCCESS STATE */
          <div style={{ textAlign: 'center', padding: '30px 10px' }}>
            <div style={{ width: '70px', height: '70px', borderRadius: '50%', background: 'rgba(37, 211, 102, 0.15)', border: '2px solid #25D366', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px', color: '#25D366' }}>
              <CheckCircle2 size={38} />
            </div>
            <h3 style={{ fontSize: '26px', fontWeight: '700', margin: '0 0 10px' }}>
              Inquiry Dispatched!
            </h3>
            <p style={{ fontSize: '15px', color: 'var(--muted-foreground)', maxWidth: '400px', margin: '0 auto 24px', lineHeight: '1.6' }}>
              Your inquiry has been compiled and routed directly to <strong>+91 9444434196</strong>. A representative will review your project requirements promptly.
            </p>

            <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Button
                variant="editorial"
                onClick={() => {
                  const selectedType = projectType === 'Other Construction Enquiry' && customProjectType.trim() 
                    ? customProjectType.trim() 
                    : projectType;
                  const text = `username:${fullName.trim()},\nemail:${email.trim()},\nproject type:${selectedType},\nquery:${query.trim()}`;
                  window.open(`https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(text)}`, '_blank');
                }}
                className="light-sweep"
              >
                <PhoneCall size={16} /> RE-OPEN WHATSAPP
              </Button>
              <Button variant="line" onClick={handleResetAndClose}>
                DONE
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
