import { createFileRoute, Link, notFound } from '@tanstack/react-router';
import { useState } from 'react';
import {
  ArrowRight,
  ArrowUpRight,
  ArrowLeft,
  Check,
  CheckCircle2,
  MessageCircle,
  Phone,
  MapPin,
  Building2,
  Calendar,
  ShieldCheck,
  Layers,
  Sparkles,
  Camera,
  FileText,
  Compass,
  Download
} from 'lucide-react';
import { projects, company, pageHead, type Project } from '@/data/company';
import { SectionLabel, TextLink } from '@/components/site/sections';
import { ProjectGallery } from '@/components/site/gallery';
import { ArchitecturalNotFound } from '@/components/site/layout';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Reveal } from '@/components/site/reveal';
import { Pointer3DCard } from '@/components/site/pointer-3d-card';
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

interface ProjectStoryData {
  summary: string;
  narrative: string[];
  highlights: string[];
}

const projectStories: Record<string, ProjectStoryData> = {
  'jentora-vadapalani': {
    summary:
      'A signature 3-storey residential enclave in Vadapalani, Chennai. Engineered with precision civil foundations, acoustic-dampening glass, and bespoke spatial layouts for discerning urban homeowners.',
    narrative: [
      'Jentora Vadapalani represents our commitment to architectural harmony and urban convenience. Positioned in a bustling prime district, the structure was engineered to provide tranquil interior environments shielded from city noise through advanced acoustic dampening and high-grade glazing.',
      'Every apartment is crafted with seismic-compliant RCC framing, high-yield Fe-550D TMT reinforcement, and premium vitrified surfaces. Handed over on schedule in 2025, this landmark stands as a testament to Jentora\'s gold standard in residential execution.',
    ],
    highlights: [
      'Seismic-Compliant RCC Superstructure with Fe-550D TMT Steel Bars',
      'Ready-Mix Concrete (M25 Grade) with Certified Laboratory Cube Testing',
      'Multi-Layer Polymer Waterproofing Barrier Across All Roof & Wet Slabs',
      'Sound-Dampening Acoustic Glazing & Seasoned Teak Wood Entrance Doors',
      'Optimized Cross-Ventilation Design Maximizing Natural Daylight Inflow',
      '100% Turnkey Handover Completed with Individual Utility Infrastructure',
    ],
  },
  'jentora-thiruvallur': {
    summary:
      'Contemporary 3-storey residential development in Thiruvallur. Features lab-tested civil materials, expansive biophilic ventilation, and enduring exterior finishes delivered with zero compromise.',
    narrative: [
      'Designed for families seeking enduring quality outside the high-density metropolis, Jentora Thiruvallur brings high-caliber construction to this growing residential corridor. The project showcases expansive floor layouts that prioritize natural ventilation and biophilic comfort.',
      'Built with lab-tested river sand substitutes, premium grade Portland Pozzolana Cement, and certified electrical conduit systems, this project was completed and handed over in 2026 with 100% client satisfaction.',
    ],
    highlights: [
      'High-Load Bearing Foundation Tested via Comprehensive Soil Bearing Analysis',
      'Precision Dual-Coat Plastering with Weather-Resistant Exterior Emulsions',
      'Concealed Fire-Resistant Copper Wiring & Modular Circuit Breakers',
      'Comprehensive Rainwater Harvesting System & Deep Groundwater Recharge',
      'Generous Balconies Designed with Anti-Skid Vitrified Tile Surfacing',
      'Zero-Snag Handover with Complete Documentation & Structural Warranties',
    ],
  },
  'jentora-edone': {
    summary:
      'Bespoke luxury residential development in Choolaimedu, Chennai. Modern elevation lines, seismic-compliant engineering, and premium turnkey finishes currently progressing under active construction.',
    narrative: [
      'Currently in its active structural phase, Jentora Edone is an avant-garde boutique residential landmark in Choolaimedu. Designed for discerning homeowners, this 3-storey development harmonizes compact urban footprint with airy, luxurious interiors.',
      'Our engineering team enforces daily milestone verification, ultrasonic concrete inspection, and laser-guided vertical alignment. Scheduled for upcoming completion, it represents the next chapter in Jentora’s architectural legacy.',
    ],
    highlights: [
      'Laser-Leveled Formwork System for Ultra-Smooth Architectural Concrete',
      'Active Concrete Curing Protocols with Continuous Moisture Regulation',
      'Pre-Installed Conduit for High-Speed Fiber Optic & Smart Automation Ready',
      'Earthquake-Resistant Zone-III Compliant Reinforced Concrete Skeleton',
      'Double-Coat Waterproofing on Terraces with Thermal Barrier Insulation Tiles',
      'Milestone-Tracked Construction Updates Provided Directly to Homeowners',
    ],
  },
  'jentora-highland-prive': {
    summary:
      'A master-planned luxury villa enclave spanning 100 bespoke residences in Madukkarai, Coimbatore, blending architectural opulence with tranquil mountain foothill panoramas.',
    narrative: [
      'Spread across scenic grounds in Madukkarai, Coimbatore, Jentora Highland Prive is an ambitious community of 100 individual luxury villas. Each 2-storey villa is tailored with expansive private gardens, contemporary double-height living spaces, and natural stone accents.',
      'Emphasizing sustainable community living, the development incorporates wide tree-lined paved internal avenues, centralized solar street illumination, and comprehensive organic waste management. Active construction is underway with model villas now open for private architectural preview.',
    ],
    highlights: [
      '100 Individual Villa Plots with Independent Boundary Framing & Gates',
      'Double-Height Living Rooms with Panoramic Mountain Foothill Perspectives',
      'Private Landscaped Gardens & Individual Solar Water Heating Provision',
      'Underground Utility Cabling & Centralized Water Filtration Infrastructure',
      'High-Security Gated Community with 24/7 CCTV & Smart Access Control',
      'Vastu-Compliant East & North Facing Architectural Spatial Orientations',
    ],
  },
};

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
  const story = projectStories[project.id] || {
    summary: `${project.category} in ${project.location} featuring high-grade engineering, ${project.units} units across ${project.floors} floors.`,
    narrative: [
      `${project.name} represents our commitment to architectural harmony and superior engineering. Designed to provide lasting value, every space is built with tested materials and uncompromising quality.`,
      `From structural foundation to the final turnkey finishes, our team ensures every detail meets our rigorous building protocols.`,
    ],
    highlights: [
      'Seismic-Compliant RCC Superstructure with Fe-550D TMT Bars',
      'Ready-Mix Concrete with Certified Laboratory Cube Testing',
      'Multi-Layer Waterproofing Barrier Across All Wet Areas',
      'Sound-Dampening Glazing & Solid Wood Main Doors',
      'Optimized Cross-Ventilation Maximizing Natural Daylight',
      'Complete Handover Documentation with Structural Warranty',
    ],
  };

  const isCompleted = project.status.toLowerCase().includes('completed');

  const specRows = [
    { label: 'Project Name', val: project.name },
    { label: 'Location', val: project.location },
    { label: 'Category / Typology', val: project.category },
    { label: 'Total Units / Residences', val: `${project.units} Units` },
    { label: 'Structural Levels', val: `${project.floors} Floors` },
    { label: 'Development Status', val: project.status },
    { label: 'Handover / Year', val: project.year || 'Under Active Construction' },
    { label: 'Civil Code Standard', val: 'IS 456 & IS 1893 Compliant' },
    { label: 'Structural Assurance', val: '10-Year Core Warranty' },
  ];

  const metrics = [
    {
      num: '01',
      label: 'Units & Residences',
      val: `${project.units} ${project.category === 'Individual Villas' ? 'Villas' : 'Units'}`,
      icon: Building2,
      sub: project.category,
    },
    {
      num: '02',
      label: 'Structural Elevation',
      val: `${project.floors} Floors`,
      icon: Layers,
      sub: 'Engineered Height',
    },
    {
      num: '03',
      label: 'Delivery Timeline',
      val: project.year || 'Active Build',
      icon: Calendar,
      sub: project.status,
    },
    {
      num: '04',
      label: 'Civil Assurance',
      val: 'Certified RCC',
      icon: ShieldCheck,
      sub: 'Lab-Tested Materials',
    },
  ];

  const whatsappQuoteUrl = `https://wa.me/919444434196?text=${encodeURIComponent(
    `Hi Jentora Builder, I would like to request a quote and brochure for ${project.name} (${project.location}).`
  )}`;

  return (
    <div className="project-detail-v2">
      {/* GRAND HERO SECTION */}
      <section className="project-hero-v2">
        <div className="container">
          {/* FLOATING TOP BREADCRUMB & STATUS BAR */}
          <div className="project-breadcrumb-bar">
            <div className="project-breadcrumb-left">
              <Link to="/projects" className="project-back-link">
                <ArrowLeft size={14} /> ALL PROJECTS
              </Link>
              <span className="project-breadcrumb-sep">/</span>
              <span className="project-breadcrumb-current">{project.name}</span>
            </div>
            <div className="project-breadcrumb-badges">
              <span className="project-badge-pill">
                ✦ LANDMARK {project.number} / 04
              </span>
              <span
                className={`project-badge-pill ${isCompleted ? 'status-completed' : 'status-construction'
                  }`}
              >
                ✦ {project.status.toUpperCase()}
              </span>
              <span className="project-badge-pill">
                ✦ {project.category.toUpperCase()}
              </span>
            </div>
          </div>

          {/* HERO TWO-COLUMN SHOWCASE GRID */}
          <div className="project-hero-grid">
            {/* LEFT: TITLE, LOCATION, SUMMARY & CTAS */}
            <div className="project-hero-info">
              <div className="project-hero-label-wrap">
                <SectionLabel>ARCHITECTURAL PORTFOLIO</SectionLabel>
              </div>

              <h1 className="project-hero-title">{project.name}</h1>

              <div className="project-hero-location">
                <MapPin size={17} />
                <span>{project.location}</span>
                <span className="opacity-40">·</span>
                <span className="font-semibold text-xs tracking-widest uppercase">
                  {project.category}
                </span>
              </div>

              <p className="project-hero-lead text-justify">{story.summary}</p>

              {/* QUICK HIGHLIGHT PILLS */}
              <div className="project-hero-pills">
                <div className="project-hero-pill-item">
                  <Building2 size={14} className="text-accent" />
                  <span>{project.units} Bespoke Residences</span>
                </div>
                <div className="project-hero-pill-item">
                  <Layers size={14} className="text-accent" />
                  <span>{project.floors} Engineered Levels</span>
                </div>
                <div className="project-hero-pill-item">
                  <ShieldCheck size={14} className="text-accent" />
                  <span>IS-456 Structural Compliant</span>
                </div>
              </div>

              {/* ACTION CTAS */}
              <div className="project-hero-actions">
                <Button
                  variant="editorial"
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
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '0 24px',
                    height: '54px',
                    fontSize: '13px',
                    fontWeight: '600',
                    textDecoration: 'none',
                  }}
                >
                  <MessageCircle size={17} style={{ color: '#25D366' }} /> ENQUIRE VIA WHATSAPP
                </a>
              </div>
            </div>

            {/* RIGHT: FEATURED IMAGE WITH 3D POINTER EFFECT */}
            <Pointer3DCard
              className="project-hero-showcase luxury-framed light-sweep"
              maxTilt={7}
              maxMove={8}
            >
              <img
                src={project.image}
                alt={project.name}
                loading="eager"
                width={1536}
                height={1024}
              />
              <span className="project-hero-showcase-badge">
                ✦ {project.status.toUpperCase()}
              </span>
              <span className="project-hero-showcase-photos">
                <Camera size={13} className="text-accent" />
                {project.gallery?.length || 8} ARCHITECTURAL PERSPECTIVES
              </span>
            </Pointer3DCard>
          </div>

          {/* 4-METRICS ARCHITECTURAL STRIP */}
          <div className="project-metrics-strip">
            {metrics.map((m) => {
              const IconComp = m.icon;
              return (
                <Pointer3DCard
                  key={m.num}
                  className="project-metric-card luxury-framed light-sweep"
                  maxTilt={8}
                  maxMove={6}
                >
                  <div className="project-metric-top">
                    <span className="project-metric-num">{m.num}</span>
                    <div className="project-metric-icon">
                      <IconComp size={15} />
                    </div>
                  </div>
                  <div>
                    <div className="project-metric-val">{m.val}</div>
                    <div className="project-metric-label">{m.label}</div>
                  </div>
                </Pointer3DCard>
              );
            })}
          </div>
        </div>
      </section>

      {/* ARCHITECTURAL PERSPECTIVES GALLERY */}
      <section className="section projects-section" style={{ paddingTop: '80px' }}>
        <div className="container">
          <div className="section-heading">
            <div>
              <SectionLabel>VISUAL CHRONICLE</SectionLabel>
              <h2>
                Form. Light.<br />
                <em>Possibility.</em>
              </h2>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px', flexWrap: 'wrap' }}>
              <span className="project-badge-pill">
                ✦ {project.gallery?.length || 8} HIGH-RESOLUTION PERSPECTIVES
              </span>
              <Button variant="editorial" onClick={() => setQuoteOpen(true)}>
                DOWNLOAD DOSSIER
              </Button>
            </div>
          </div>
          <ProjectGallery
            cover={project.image}
            items={project.gallery}
            rotate={'rotate' in project && typeof project.rotate === 'number' ? project.rotate : 0}
          />
        </div>
      </section>

      {/* DETAILED NARRATIVE & STICKY SPECIFICATION SHEET */}
      <section className="section" style={{ paddingTop: '60px', paddingBottom: '90px' }}>
        <div className="container">
          <div className="project-overview-grid">
            {/* LEFT COLUMN: THE NARRATIVE & ENGINEERING CHECKPOINTS */}
            <div className="project-story-col">
              <div className="project-story-header">
                <SectionLabel>STRUCTURAL INTEGRITY & DESIGN</SectionLabel>
                <h2 style={{ marginTop: '12px', marginBottom: '24px' }}>
                  A landmark with<br />
                  <em>its own architectural story.</em>
                </h2>
              </div>

              {story.narrative.map((paragraph, idx) => (
                <p key={idx} className="project-story-text text-justify" style={{ textAlign: 'justify', textJustify: 'inter-word' }}>
                  {paragraph}
                </p>
              ))}

              {/* 6-POINT ENGINEERING CHECKLIST */}
              <div className="project-checklist-wrap">
                <div className="project-checklist-title">
                  <ShieldCheck size={20} className="text-accent" />
                  <span>Engineering & Material Protocols</span>
                </div>
                <div className="project-checklist-grid">
                  {story.highlights.map((item, i) => (
                    <div key={i} className="project-checklist-item">
                      <CheckCircle2 size={16} className="project-checklist-icon" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* BLUEPRINT / CONSULTATION CALLOUT */}
              <div className="project-plan-callout">
                <div className="project-plan-callout-text">
                  <h4>Looking for detailed AutoCAD drawings or customized floor plans?</h4>
                  <p>Our architectural and structural design desk can provide tailored configurations for your requirement.</p>
                </div>
                <Button
                  variant="editorial"
                  onClick={() => setQuoteOpen(true)}
                  style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', flexShrink: 0 }}
                >
                  REQUEST BLUEPRINT <ArrowUpRight size={14} />
                </Button>
              </div>
            </div>

            {/* RIGHT COLUMN: STICKY SPECIFICATION SHEET (3D CARD) */}
            <div className="project-spec-sticky-col">
              <Pointer3DCard
                className="project-spec-card luxury-framed light-sweep"
                maxTilt={6}
                maxMove={8}
              >
                <div className="project-spec-card-header">
                  <span className="project-spec-card-badge">✦ OFFICIAL DOSSIER</span>
                  <h3 className="project-spec-card-title">Specification Sheet</h3>
                  <p style={{ fontSize: '13px', color: 'var(--muted-foreground)', marginTop: '4px' }}>
                    Certified structural and civil parameters for {project.name}.
                  </p>
                </div>

                <div className="project-spec-rows">
                  {specRows.map((row) => (
                    <div key={row.label} className="project-spec-row-item">
                      <span className="project-spec-row-label">{row.label}</span>
                      <span className="project-spec-row-val">{row.val}</span>
                    </div>
                  ))}
                </div>

                <div className="project-spec-actions">
                  <Button
                    variant="editorial"
                    onClick={() => setQuoteOpen(true)}
                    style={{ width: '100%', justifyContent: 'center', gap: '10px' }}
                  >
                    REQUEST FULL QUOTE <ArrowUpRight size={15} />
                  </Button>
                  <a
                    href={whatsappQuoteUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="line-button"
                    style={{
                      width: '100%',
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '8px',
                      height: '50px',
                      fontSize: '13px',
                      fontWeight: '600',
                      textDecoration: 'none',
                    }}
                  >
                    <MessageCircle size={16} style={{ color: '#25D366' }} /> INSTANT WHATSAPP ENQUIRY
                  </a>
                </div>
              </Pointer3DCard>
            </div>
          </div>
        </div>
      </section>

      {/* NEXT PROJECT TRANSITION STRIP */}
      {next && (
        <section className="section" style={{ paddingTop: '20px', paddingBottom: '90px' }}>
          <div className="container">
            <Link
              to="/projects/$projectId"
              params={{ projectId: next.id }}
              className="next-project-v2-card luxury-framed light-sweep"
              aria-label={`Next project: ${next.name}`}
            >
              <img
                src={next.image}
                alt={next.name}
                className="next-project-v2-bg"
                loading="lazy"
              />
              <div className="next-project-v2-content">
                <div className="next-project-v2-info">
                  <SectionLabel>NEXT LANDMARK / {next.number}</SectionLabel>
                  <h3 className="next-project-v2-title">{next.name}</h3>
                  <div className="next-project-v2-loc">
                    <MapPin size={16} />
                    <span>{next.location}</span>
                    <span className="opacity-50">·</span>
                    <span>{next.units} Units · {next.floors} Floors</span>
                  </div>
                </div>
                <div>
                  <Button
                    variant="editorial"
                    style={{ pointerEvents: 'none', display: 'inline-flex', alignItems: 'center', gap: '10px' }}
                  >
                    EXPLORE NEXT LANDMARK <ArrowRight size={16} />
                  </Button>
                </div>
              </div>
            </Link>
          </div>
        </section>
      )}

      {/* REQUEST A QUOTE MODAL */}
      <Dialog
        open={quoteOpen}
        onOpenChange={(open) => {
          setQuoteOpen(open);
          if (!open) setSubmitted(false);
        }}
      >
        <DialogContent
          className="legal-note"
          style={{
            maxWidth: '580px',
            padding: '36px',
            background: 'var(--secondary)',
            border: '1px solid var(--border)',
            borderRadius: '16px',
          }}
        >
          <DialogTitle
            style={{ fontFamily: 'var(--font-display)', fontSize: '32px', color: 'var(--foreground)' }}
          >
            Request a Quote
          </DialogTitle>
          <DialogDescription
            style={{ fontSize: '15px', color: 'var(--muted-foreground)', marginTop: '6px' }}
          >
            Get detailed pricing, floor plans, and architectural specifications for{' '}
            <strong>{project.name}</strong> ({project.location}).
          </DialogDescription>

          {submitted ? (
            <div style={{ padding: '30px 0', textAlign: 'center' }}>
              <div
                style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '50%',
                  background: '#25D366',
                  color: '#ffffff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 16px',
                }}
              >
                <Check size={24} />
              </div>
              <h3
                style={{
                  fontSize: '24px',
                  fontFamily: 'var(--font-display)',
                  color: 'var(--foreground)',
                }}
              >
                Quote Request Received
              </h3>
              <p
                style={{
                  fontSize: '15px',
                  color: 'var(--muted-foreground)',
                  marginTop: '8px',
                  lineHeight: '1.6',
                }}
              >
                Thank you! Our project team will connect with you with pricing and project details.
                You can also reach our desk directly at{' '}
                <a
                  href="tel:+919444434196"
                  style={{ color: 'var(--foreground)', fontWeight: '600' }}
                >
                  +91 9444434196
                </a>
                .
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
                  <label
                    htmlFor="quote-name"
                    style={{ fontSize: '13px', fontWeight: '600', letterSpacing: '0.04em' }}
                  >
                    YOUR NAME *
                  </label>
                  <input
                    id="quote-name"
                    name="name"
                    required
                    placeholder="Full name"
                    style={{
                      fontSize: '14px',
                      border: '1px solid var(--border)',
                      padding: '10px 12px',
                      background: 'var(--background)',
                      color: 'var(--foreground)',
                      borderRadius: '6px',
                    }}
                  />
                </div>
                <div className="field">
                  <label
                    htmlFor="quote-phone"
                    style={{ fontSize: '13px', fontWeight: '600', letterSpacing: '0.04em' }}
                  >
                    PHONE NUMBER *
                  </label>
                  <input
                    id="quote-phone"
                    name="phone"
                    type="tel"
                    required
                    placeholder="+91 XXXXX XXXXX"
                    style={{
                      fontSize: '14px',
                      border: '1px solid var(--border)',
                      padding: '10px 12px',
                      background: 'var(--background)',
                      color: 'var(--foreground)',
                      borderRadius: '6px',
                    }}
                  />
                </div>
              </div>

              <div className="field">
                <label
                  htmlFor="quote-email"
                  style={{ fontSize: '13px', fontWeight: '600', letterSpacing: '0.04em' }}
                >
                  EMAIL ADDRESS *
                </label>
                <input
                  id="quote-email"
                  name="email"
                  type="email"
                  required
                  placeholder="you@example.com"
                  style={{
                    fontSize: '14px',
                    border: '1px solid var(--border)',
                    padding: '10px 12px',
                    background: 'var(--background)',
                    color: 'var(--foreground)',
                    borderRadius: '6px',
                  }}
                />
              </div>

              <div className="field">
                <label
                  htmlFor="quote-message"
                  style={{ fontSize: '13px', fontWeight: '600', letterSpacing: '0.04em' }}
                >
                  PROJECT REQUIREMENTS / QUESTIONS
                </label>
                <textarea
                  id="quote-message"
                  name="message"
                  rows={3}
                  placeholder={`Tell us about your requirement for ${project.name}…`}
                  style={{
                    fontSize: '14px',
                    border: '1px solid var(--border)',
                    padding: '10px 12px',
                    background: 'var(--background)',
                    color: 'var(--foreground)',
                    borderRadius: '6px',
                    resize: 'vertical',
                  }}
                />
              </div>

              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginTop: '10px',
                  flexWrap: 'wrap',
                  gap: '12px',
                }}
              >
                <Button variant="editorial" type="submit" disabled={submitting}>
                  {submitting ? 'TRANSMITTING REQUEST...' : 'SUBMIT QUOTE REQUEST'}{' '}
                  <ArrowUpRight size={14} />
                </Button>
                <a
                  href={whatsappQuoteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    fontSize: '13px',
                    color: '#128C7E',
                    fontWeight: '600',
                  }}
                >
                  <MessageCircle size={16} /> Instant Quote on WhatsApp
                </a>
              </div>
            </form>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
