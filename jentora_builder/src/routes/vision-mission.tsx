import { createFileRoute } from '@tanstack/react-router';
import { useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { images, visionData, missionData, missionPoints, companyCommitment, pageHead } from '@/data/company';
import { InnerHero, SectionLabel, Philosophy, ContactLink } from '@/components/site/sections';
import { Reveal } from '@/components/site/reveal';

export const Route = createFileRoute('/vision-mission')({
  head: () =>
    pageHead(
      'Vision & Mission — Jentora Builder',
      'Passion in every idea. Precision in every detail. Perfection in every project. Explore the Jentora vision, mission, and core values.'
    ),
  component: Vision,
});

function Vision() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <>
      <InnerHero
        label="VISION & MISSION"
        title={<>Driven by purpose.<br />Defined by <em>possibility.</em></>}
        text={companyCommitment.tagline}
        image={images.hero}
      />

      {/* OUR VISION */}
      <section className="section">
        <div className="container intro-grid">
          <Reveal>
            <SectionLabel>01 / OUR VISION</SectionLabel>
            <h2 className="flip-in">Creating landmarks<br /><em>that stand the test of time.</em></h2>
            <div className="vision-full-text" style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginTop: '24px' }}>
              <p style={{ fontSize: '15px', lineHeight: '1.8', color: 'var(--foreground)' }} className="p-4 rounded-lg bg-background border border-border light-sweep">
                {visionData.statement}
              </p>
              <p style={{ fontSize: '15px', lineHeight: '1.8', color: 'var(--muted-foreground)' }} className="p-4 rounded-lg bg-background border border-border">
                {visionData.secondary}
              </p>
            </div>
          </Reveal>
          <Reveal className="intro-image light-sweep">
            <img src={images.villas} alt="Jentora Architectural Villa" loading="lazy" className="rounded-lg shadow-2xl transition-transform duration-700 hover:scale-105" />
          </Reveal>
        </div>
      </section>

      {/* OUR MISSION */}
      <section className="section projects-section">
        <div className="container mission-grid">
          <div>
            <SectionLabel>02 / OUR MISSION</SectionLabel>
            <h2 className="flip-in">Our mission.<br /><em>In action.</em></h2>
            <p className="subtle" style={{ fontSize: '15px', lineHeight: '1.7', marginTop: '16px', color: 'var(--foreground)' }}>
              {missionData.intro}
            </p>
          </div>
          <div>
            {missionPoints.map((item, i) => (
              <div key={item.title} className="reveal visible">
                <Button
                  variant="minimal"
                  className="service-row"
                  aria-expanded={open === i}
                  onClick={() => setOpen(open === i ? null : i)}
                >
                  <span className="number morph font-bold text-accent">0{i + 1}</span>
                  <h3>{item.title}</h3>
                  <ArrowUpRight className="hover-wobble" />
                </Button>
                {open === i && (
                  <p className="service-detail bounce-in" style={{ fontSize: '13px', lineHeight: '1.7', color: 'var(--muted-foreground)' }}>
                    {item.desc}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* OUR COMMITMENT */}
      <section style={{ background: 'var(--secondary)', color: 'var(--foreground)', padding: '100px 0', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}>
        <div className="container">
          <SectionLabel>03 / OUR COMMITMENT</SectionLabel>
          <Reveal>
            <h2 className="flip-in" style={{ fontSize: '48px', lineHeight: '1.2', marginTop: '36px', color: 'var(--foreground)' }}>
              {companyCommitment.tagline}
            </h2>
            <p className="light-sweep p-6 rounded-lg bg-background border border-border" style={{ marginTop: '24px', fontSize: '16px', color: 'var(--muted-foreground)', maxWidth: '800px', lineHeight: '1.7' }}>
              {companyCommitment.statement}
            </p>
          </Reveal>
        </div>
      </section>

      <Philosophy />

      {/* CTA SECTION BETWEEN PHILOSOPHY & FOOTER */}
      <section className="section" style={{ background: 'var(--secondary)', padding: '100px 0', borderTop: '1px solid var(--border)' }}>
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '32px' }}>
          <Reveal>
            <SectionLabel>START YOUR PROJECT</SectionLabel>
            <h2 style={{ fontSize: '48px', marginTop: '16px', color: 'var(--foreground)' }}>
              Ready to bring your <em>vision to life?</em>
            </h2>
            <p style={{ color: 'var(--muted-foreground)', marginTop: '12px', maxWidth: '520px', fontSize: '14px', lineHeight: '1.7' }}>
              From initial architectural planning to precision construction, partner with Jentora Builder Private Limited for your next landmark project.
            </p>
          </Reveal>
          <Reveal>
            <ContactLink light={false} />
          </Reveal>
        </div>
      </section>
    </>
  );
}

