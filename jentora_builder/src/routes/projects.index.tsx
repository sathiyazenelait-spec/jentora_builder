import { createFileRoute, Link } from '@tanstack/react-router';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { projects, images, pageHead, company, type Project } from '@/data/company';
import { InnerHero, SectionLabel } from '@/components/site/sections';
import { Pointer3DCard } from '@/components/site/pointer-3d-card';
import { Reveal } from '@/components/site/reveal';
import { 
  ArrowRight, 
  MapPin, 
  Building2, 
  Calendar, 
  MessageCircle, 
  ShieldCheck, 
  Camera 
} from 'lucide-react';

export const Route = createFileRoute('/projects/')({
  head: () =>
    pageHead(
      'Selected Projects — Jentora Builder',
      'Explore Jentora’s apartments and commercial landmarks in Chennai and individual villas in Coimbatore.'
    ),
  component: Projects,
});

const projectDescriptions: Record<string, string> = {
  'jentora-vadapalani':
    'A signature 3-floor residential landmark in Vadapalani, Chennai. Features high-grade structural engineering, bespoke apartment layouts, and guaranteed handover excellence tailored for modern urban living.',
  'jentora-thiruvallur':
    'Contemporary 3-floor residential development engineered with lab-tested materials, optimal cross-ventilation, and state-of-the-art finishes in Thiruvallur, delivered with uncompromising structural integrity.',
  'jentora-edone':
    'Bespoke luxury residential development in Choolaimedu, Chennai featuring modern aesthetic facades, seismic-compliant engineering, and premium turnkey finishes currently under active construction.',
  'jentora-highland-prive':
    '100 bespoke luxury individual villas in Madukkarai, Coimbatore, blending architectural opulence, private landscaped grounds, and sustainable community master planning.',
};

function Projects() {
  const [filter, setFilter] = useState('All Projects');
  const shown = projects.filter((p) => filter === 'All Projects' || p.status === filter);

  const getWhatsappUrl = (p: Project) =>
    `https://wa.me/919444434196?text=${encodeURIComponent(
      `Hi Jentora Builder, I would like to enquire about ${p.name} (${p.location}).`
    )}`;

  return (
    <>
      <InnerHero
        label="OUR PORTFOLIO"
        title="WHAT WE HAVE BUILT."
        text="A curated collection of bespoke residential spaces, individual villas, and commercial landmarks delivered with precision."
        counter="01 — 04"
        image={images.villas}
      />

      <section className="section projects-section">
        <div className="container">
          {/* TOP CONTROLS & FILTER BAR */}
          <div className="project-controls-bar">
            <div className="project-filter-group" role="tablist" aria-label="Filter projects">
              {[
                { label: 'All Projects', count: '04' },
                { label: 'Completed', count: '02' },
                { label: 'Under Construction', count: '02' },
              ].map(({ label, count }) => {
                const isActive = filter === label;
                return (
                  <button
                    key={label}
                    type="button"
                    className={`project-filter-btn ${isActive ? 'is-active' : ''}`}
                    onClick={() => setFilter(label)}
                    aria-pressed={isActive}
                  >
                    <span>{label.toUpperCase()}</span>
                    <span className="opacity-70 text-[10px]">· {count}</span>
                  </button>
                );
              })}
            </div>

            <div className="text-xs font-semibold tracking-widest text-accent uppercase hidden sm:block">
              ✦ ALTERNATING ARCHITECTURAL SHOWCASE
            </div>
          </div>

          {/* ALTERNATING ZIGZAG ARCHITECTURAL LIST */}
          <div className="projects-zigzag-list">
            {shown.map((p, index) => {
              const isEven = index % 2 === 1;
              return (
                <Reveal key={p.id}>
                  <div className={`project-zigzag-row ${isEven ? 'is-reverse' : ''}`}>
                    {/* IMAGE WRAPPER WITH LUXURY FRAMING */}
                    <Link
                      to="/projects/$projectId"
                      params={{ projectId: p.id }}
                      className="project-zigzag-image-wrap luxury-framed light-sweep"
                      aria-label={`View details of ${p.name}`}
                    >
                      <img
                        src={p.image}
                        alt={p.name}
                        loading="lazy"
                        width={1536}
                        height={1024}
                      />
                      <span className="project-zigzag-badge">
                        ✦ {p.status.toUpperCase()}
                      </span>
                      <span className="project-zigzag-photo-pill">
                        <Camera size={13} className="text-accent" />
                        {p.gallery?.length || 8} ARCHITECTURAL PHOTOS
                      </span>
                    </Link>

                    {/* 3D POINTER CARD CONTENT SIDE */}
                    <Pointer3DCard
                      className="project-zigzag-content luxury-framed light-sweep"
                      maxTilt={8}
                      maxMove={10}
                    >
                      {/* Top Row: Landmark Number & Category */}
                      <div className="project-zigzag-top">
                        <span className="project-zigzag-num">{p.number}</span>
                        <span className="project-zigzag-category">
                          ✦ {p.category.toUpperCase()}
                        </span>
                      </div>

                      {/* Title */}
                      <Link to="/projects/$projectId" params={{ projectId: p.id }}>
                        <h3 className="project-zigzag-title hover:text-accent transition-colors">
                          {p.name}
                        </h3>
                      </Link>

                      {/* Location */}
                      <div className="project-zigzag-loc">
                        <MapPin size={15} className="text-accent" />
                        <span>{p.location}</span>
                        <span className="text-accent/60">·</span>
                        <span className="text-accent font-semibold">Landmark {p.number} / 04</span>
                      </div>

                      {/* Description */}
                      <p className="project-zigzag-desc text-justify">
                        {projectDescriptions[p.id] ||
                          'Bespoke architectural development engineered with lab-tested materials, optimal cross-ventilation, and state-of-the-art finishes.'}
                      </p>

                      {/* 4-Item Specifications Mini Grid */}
                      <div className="project-zigzag-specs">
                        <div className="project-zigzag-spec-box">
                          <span className="project-zigzag-spec-label">UNITS</span>
                          <span className="project-zigzag-spec-val">{p.units} Units</span>
                        </div>
                        <div className="project-zigzag-spec-box">
                          <span className="project-zigzag-spec-label">FLOORS</span>
                          <span className="project-zigzag-spec-val">{p.floors} Floors</span>
                        </div>
                        <div className="project-zigzag-spec-box">
                          <span className="project-zigzag-spec-label">COMPLETION</span>
                          <span className="project-zigzag-spec-val">{p.year || 'Ongoing'}</span>
                        </div>
                        <div className="project-zigzag-spec-box">
                          <span className="project-zigzag-spec-label">QUALITY GATE</span>
                          <span className="project-zigzag-spec-val text-accent" style={{ fontSize: '11px' }}>
                            Lab Audited
                          </span>
                        </div>
                      </div>

                      {/* Dual Action Buttons */}
                      <div className="project-zigzag-actions">
                        <Link
                          to="/projects/$projectId"
                          params={{ projectId: p.id }}
                          className="project-btn-primary hover-wobble"
                        >
                          EXPLORE SPECIFICATIONS <ArrowRight size={14} />
                        </Link>
                        <a
                          href={getWhatsappUrl(p)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="project-btn-secondary"
                        >
                          <MessageCircle size={14} className="text-[#25D366]" /> INQUIRE ON WHATSAPP
                        </a>
                      </div>
                    </Pointer3DCard>
                  </div>
                </Reveal>
              );
            })}
          </div>

          {/* EMPTY STATE */}
          {shown.length === 0 && (
            <div className="text-center py-20">
              <p className="text-muted-foreground text-sm">No landmarks found for the selected status.</p>
              <Button
                variant="minimal"
                onClick={() => setFilter('All Projects')}
                className="mt-4"
              >
                SHOW ALL PROJECTS
              </Button>
            </div>
          )}

          {/* BESPOKE CONSULTATION STRIP */}
          <div className="mt-28 p-8 md:p-10 rounded-2xl border border-accent/30 bg-background/60 backdrop-blur-md flex flex-wrap items-center justify-between gap-6 luxury-framed light-sweep">
            <div>
              <span className="text-[10px] font-bold tracking-widest text-accent uppercase block mb-1">
                ✦ BESPOKE ARCHITECTURAL CONSULTATION
              </span>
              <h3 className="text-2xl md:text-3xl font-display text-foreground m-0">
                Planning a custom residential or commercial project?
              </h3>
              <p className="text-xs md:text-sm text-muted-foreground mt-2 mb-0 max-w-xl leading-relaxed">
                Consult with Jentora’s principal engineers for turnkey construction, feasibility analysis, and municipal approvals in Chennai and Coimbatore.
              </p>
            </div>
            <div className="flex items-center gap-4 flex-wrap">
              <Link to="/contact" className="project-btn-primary hover-wobble">
                SCHEDULE CONSULTATION <ArrowRight size={14} />
              </Link>
              <a
                href={company.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="project-btn-secondary"
              >
                <MessageCircle size={14} className="text-[#25D366]" /> WHATSAPP DIRECT
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
