import { createFileRoute, Link, notFound } from '@tanstack/react-router';
import { useState } from 'react';
import { ArrowRight, ArrowUpRight, Check, MessageCircle, Phone, X } from 'lucide-react';
import { projects, company, pageHead } from '@/data/company';
import { SectionLabel, TextLink } from '@/components/site/sections';
import { ProjectGallery } from '@/components/site/gallery';
import { ArchitecturalNotFound } from '@/components/site/layout';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Reveal } from '@/components/site/reveal';
import { publicApi } from '@/lib/api';

export const Route = createFileRoute('/projects/$projectId')({
  loader: ({ params }) => {
    const project = projects.find((p) => p.id === params.projectId);
    if (!project) throw notFound();
    return project;
  },
  head: ({ loaderData }) =>
    pageHead(
      loaderData ? `${loaderData.name} · ${loaderData.location}` : 'Project unavailable',
      loaderData
        ? `${loaderData.category} in ${loaderData.location}. ${loaderData.units} units, ${loaderData.floors} floors. ${loaderData.status}.`
        : 'The requested Jentora project is unavailable.'
    ),
  component: ProjectDetail,
  notFoundComponent: ArchitecturalNotFound,
});

function ProjectDetail() {
  const project = Route.useLoaderData();
  const [quoteOpen, setQuoteOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleQuoteSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      await publicApi.submitQuote({
        fullName: String(formData.get('name') || ''),
        email: String(formData.get('email') || ''),
        phone: String(formData.get('phone') || ''),
        projectType: project.name,
        location: project.location,
        message: String(formData.get('message') || `Inquiry for ${project.name}`),
      });
      setSubmitted(true);
    } catch (err: any) {
      console.error('Quote submission error:', err);
      setSubmitted(true);
    } finally {
      setSubmitting(false);
    }
  };

  const next = projects[(projects.findIndex((p) => p.id === project.id) + 1) % projects.length];
  const specs = [
    ['LOCATION', project.location],
    ['CATEGORY', project.category],
    ['UNITS', `${project.units} Units`],
    ['FLOORS', `${project.floors} Floors`],
    ['STATUS', project.status],
    ...(project.year ? [['COMPLETION', project.year]] : []),
  ];

  const whatsappQuoteUrl = `https://wa.me/919444484625?text=${encodeURIComponent(
    `Hi Jentora Builder, I would like to request a quote and brochure for ${project.name} (${project.location}).`
  )}`;

  return (
    <>
      {/* HERO SECTION */}
      <section className="inner-hero project-detail-hero">
        <img className="hero-image" src={project.image} alt={project.name} />
        <div className="hero-shade" />
        <div className="container inner-hero-content">
          <SectionLabel>PROJECT {project.number} / 04</SectionLabel>
          <h1>{project.name}</h1>
          <p>
            {project.location.toUpperCase()}
            <br />
            {project.category.toUpperCase()}
          </p>
          <div style={{ marginTop: '28px', display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
            <Button
              variant="light"
              onClick={() => setQuoteOpen(true)}
              style={{ display: 'inline-flex', alignItems: 'center', gap: '10px' }}
            >
              REQUEST A QUOTE <ArrowUpRight size={16} />
            </Button>
            <a
              href={whatsappQuoteUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="line-button"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '0 24px', height: '54px', fontSize: '13px', fontWeight: '600', textDecoration: 'none' }}
            >
              <MessageCircle size={17} style={{ color: '#25D366' }} /> ENQUIRE VIA WHATSAPP
            </a>
          </div>
        </div>
        <div className="hero-bottom">
          <span>ILLUSTRATIVE ARCHITECTURAL CONCEPT</span>
          <span>{project.status.toUpperCase()}</span>
        </div>
      </section>

      {/* PROJECT OVERVIEW & SPECS */}
      <section className="section">
        <div className="container">
          <div className="section-heading">
            <div>
              <SectionLabel>PROJECT OVERVIEW</SectionLabel>
              <h2>
                A landmark with<br />
                <em>its own story.</em>
              </h2>
            </div>
            <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
              <Button variant="editorial" onClick={() => setQuoteOpen(true)}>
                REQUEST A QUOTE
              </Button>
              <TextLink to="/projects">ALL PROJECTS</TextLink>
            </div>
          </div>
          <dl className="project-specs">
            {specs.map(([label, value]) => (
              <div key={label}>
                <dt>{label}</dt>
                <dd>{value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* ARCHITECTURAL GALLERY */}
      <section className="section projects-section">
        <div className="container">
          <div className="section-heading">
            <div>
              <SectionLabel>ARCHITECTURAL PERSPECTIVES</SectionLabel>
              <h2>
                Form. Light.<br />
                <em>Possibility.</em>
              </h2>
            </div>
          </div>
          <ProjectGallery cover={project.image} items={project.gallery} />
        </div>
      </section>

      {/* NEXT PROJECT STRIP */}
      {next && (
        <section className="section">
          <div className="container next-project">
            <div>
              <SectionLabel>NEXT PROJECT / {next.number}</SectionLabel>
              <h2>{next.name}</h2>
              <p className="subtle mb-7">{next.location}</p>
              <Button asChild variant="editorial">
                <Link to="/projects/$projectId" params={{ projectId: next.id }}>
                  NEXT PROJECT
                  <ArrowRight />
                </Link>
              </Button>
            </div>
            <Link to="/projects/$projectId" params={{ projectId: next.id }} aria-label={`Next project: ${next.name}`}>
              <img src={next.image} alt="Illustrative architectural concept" loading="lazy" />
            </Link>
          </div>
        </section>
      )}

      {/* REQUEST A QUOTE MODAL */}
      <Dialog open={quoteOpen} onOpenChange={(open) => { setQuoteOpen(open); if (!open) setSubmitted(false); }}>
        <DialogContent className="legal-note" style={{ maxWidth: '580px', padding: '36px', background: 'var(--secondary)', border: '1px solid var(--border)', borderRadius: '12px' }}>
          <DialogTitle style={{ fontFamily: 'var(--font-display)', fontSize: '32px', color: 'var(--foreground)' }}>
            Request a Quote
          </DialogTitle>
          <DialogDescription style={{ fontSize: '15px', color: 'var(--muted-foreground)', marginTop: '6px' }}>
            Get detailed pricing, floor plans, and architectural specifications for <strong>{project.name}</strong> ({project.location}).
          </DialogDescription>

          {submitted ? (
            <div style={{ padding: '30px 0', textAlign: 'center' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: '#25D366', color: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
                <Check size={24} />
              </div>
              <h3 style={{ fontSize: '24px', fontFamily: 'var(--font-display)', color: 'var(--foreground)' }}>Quote Request Received</h3>
              <p style={{ fontSize: '15px', color: 'var(--muted-foreground)', marginTop: '8px', lineHeight: '1.6' }}>
                Thank you! Our project team will connect with you with pricing and project details. You can also reach our desk directly at <a href="tel:+919444484625" style={{ color: 'var(--foreground)', fontWeight: '600' }}>+91 9444484625</a>.
              </p>
              <Button variant="editorial" className="mt-6" onClick={() => setQuoteOpen(false)}>
                CLOSE
              </Button>
            </div>
          ) : (
            <form
              onSubmit={handleQuoteSubmit}
              style={{ marginTop: '20px', display: 'flex', flexDirection: 'column', gap: '16px' }}
            >
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div className="field">
                  <label htmlFor="quote-name" style={{ fontSize: '13px', fontWeight: '600', letterSpacing: '0.04em' }}>YOUR NAME *</label>
                  <input id="quote-name" name="name" required placeholder="Full name" style={{ fontSize: '14px', border: '1px solid var(--border)', padding: '10px 12px', background: 'var(--background)', color: 'var(--foreground)', borderRadius: '6px' }} />
                </div>
                <div className="field">
                  <label htmlFor="quote-phone" style={{ fontSize: '13px', fontWeight: '600', letterSpacing: '0.04em' }}>PHONE NUMBER *</label>
                  <input id="quote-phone" name="phone" type="tel" required placeholder="+91 XXXXX XXXXX" style={{ fontSize: '14px', border: '1px solid var(--border)', padding: '10px 12px', background: 'var(--background)', color: 'var(--foreground)', borderRadius: '6px' }} />
                </div>
              </div>

              <div className="field">
                <label htmlFor="quote-email" style={{ fontSize: '13px', fontWeight: '600', letterSpacing: '0.04em' }}>EMAIL ADDRESS *</label>
                <input id="quote-email" name="email" type="email" required placeholder="you@example.com" style={{ fontSize: '14px', border: '1px solid var(--border)', padding: '10px 12px', background: 'var(--background)', color: 'var(--foreground)', borderRadius: '6px' }} />
              </div>

              <div className="field">
                <label htmlFor="quote-message" style={{ fontSize: '13px', fontWeight: '600', letterSpacing: '0.04em' }}>PROJECT REQUIREMENTS / QUESTIONS</label>
                <textarea
                  id="quote-message"
                  name="message"
                  rows={3}
                  placeholder={`Tell us about your requirement for ${project.name}…`}
                  style={{ fontSize: '14px', border: '1px solid var(--border)', padding: '10px 12px', background: 'var(--background)', color: 'var(--foreground)', borderRadius: '6px', resize: 'vertical' }}
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '10px', flexWrap: 'wrap', gap: '12px' }}>
                <Button variant="editorial" type="submit" disabled={submitting}>
                  {submitting ? 'TRANSMITTING REQUEST...' : 'SUBMIT QUOTE REQUEST'} <ArrowUpRight size={14} />
                </Button>
                <a
                  href={whatsappQuoteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '13px', color: '#128C7E', fontWeight: '600' }}
                >
                  <MessageCircle size={16} /> Instant Quote on WhatsApp
                </a>
              </div>
            </form>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
