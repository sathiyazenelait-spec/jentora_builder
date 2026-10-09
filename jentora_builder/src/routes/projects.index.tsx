import { createFileRoute } from '@tanstack/react-router';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { projects, images, pageHead } from '@/data/company';
import { ProjectItem, InnerHero } from '@/components/site/sections';

export const Route = createFileRoute('/projects/')({
  head: () =>
    pageHead(
      'Selected Projects — Jentora Builder',
      'Explore Jentora’s apartments in Chennai and Thiruvallur and individual villas in Coimbatore.'
    ),
  component: Projects,
});

function Projects() {
  const [filter, setFilter] = useState('All Projects');
  const shown = projects.filter((p) => filter === 'All Projects' || p.status === filter);

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
          <div className="filter-bar" aria-label="Filter projects">
            {['All Projects', 'Completed', 'Under Construction'].map((f) => (
              <Button
                key={f}
                variant="minimal"
                aria-pressed={f === filter}
                onClick={() => setFilter(f)}
              >
                {f.toUpperCase()} · {f === 'All Projects' ? '04' : '02'}
              </Button>
            ))}
          </div>
          <div className="portfolio">
            {shown.map((p) => (
              <ProjectItem key={p.id} project={p} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
