import { useState } from 'react';
import { ArrowLeft, ArrowRight, Expand, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTitle, DialogDescription } from '@/components/ui/dialog';

export function ProjectGallery({ cover, items }: { cover: string; items?: string[] }) {
  const slides = items && items.length > 0 ? items : [cover];
  const [index, setIndex] = useState(0);
  const [open, setOpen] = useState(false);

  const change = (step: number) =>
    setIndex((i) => (i + step + slides.length) % slides.length);

  const controls = (
    <div className="gallery-controls" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '16px' }}>
      <span style={{ fontSize: '13px', letterSpacing: '0.08em', color: 'var(--muted-foreground)', fontWeight: '500' }}>
        0{index + 1} / 0{slides.length} · SITE PROGRESS & ARCHITECTURAL PERSPECTIVES
      </span>
      <div className="gallery-buttons" style={{ display: 'flex', gap: '8px' }}>
        <Button variant="minimal" size="icon" aria-label="Previous image" onClick={() => change(-1)}>
          <ArrowLeft size={16} />
        </Button>
        <Button variant="minimal" size="icon" aria-label="Next image" onClick={() => change(1)}>
          <ArrowRight size={16} />
        </Button>
        <Button variant="minimal" size="icon" aria-label="View fullscreen" onClick={() => setOpen(true)}>
          <Expand size={16} />
        </Button>
      </div>
    </div>
  );

  return (
    <div
      onKeyDown={(e) => {
        if (e.key === 'ArrowRight') change(1);
        if (e.key === 'ArrowLeft') change(-1);
      }}
      tabIndex={0}
      aria-label="Project site photo gallery"
      style={{ outline: 'none' }}
    >
      <div style={{ position: 'relative', overflow: 'hidden', borderRadius: '4px', background: 'var(--primary)' }}>
        <img
          className="gallery-image"
          src={slides[index]}
          alt={`Site photo and perspective ${index + 1}`}
          loading="lazy"
          style={{ width: '100%', height: '580px', objectFit: 'cover', cursor: 'pointer', transition: 'opacity 0.3s' }}
          onClick={() => setOpen(true)}
        />
        <div style={{ position: 'absolute', bottom: '16px', right: '16px', background: 'rgba(30, 39, 54, 0.85)', color: '#ffffff', padding: '8px 14px', fontSize: '12px', letterSpacing: '0.06em', borderRadius: '4px', backdropFilter: 'blur(4px)', fontWeight: '600' }}>
          CLICK TO EXPAND
        </div>
      </div>

      {controls}

      {/* THUMBNAIL STRIP */}
      {slides.length > 1 && (
        <div
          style={{
            display: 'flex',
            gap: '12px',
            marginTop: '16px',
            overflowX: 'auto',
            paddingBottom: '8px',
          }}
        >
          {slides.map((thumb, i) => (
            <button
              key={thumb}
              type="button"
              onClick={() => setIndex(i)}
              style={{
                border: i === index ? '2px solid var(--accent)' : '1px solid var(--border)',
                padding: '2px',
                background: 'transparent',
                cursor: 'pointer',
                borderRadius: '4px',
                flexShrink: 0,
                opacity: i === index ? 1 : 0.6,
                transition: 'opacity 0.2s, border-color 0.2s',
              }}
              aria-label={`Select site photo ${i + 1}`}
            >
              <img
                src={thumb}
                alt={`Thumbnail ${i + 1}`}
                style={{ width: '80px', height: '60px', objectFit: 'cover', borderRadius: '2px', display: 'block' }}
                loading="lazy"
              />
            </button>
          ))}
        </div>
      )}

      {/* FULLSCREEN DIALOG */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent
          variant="fullscreen"
          onKeyDown={(e) => {
            if (e.key === 'ArrowRight') change(1);
            if (e.key === 'ArrowLeft') change(-1);
          }}
          style={{ background: 'var(--ink)', color: 'var(--primary-foreground)', padding: '24px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}
        >
          <DialogTitle className="sr-only">Site photo gallery</DialogTitle>
          <DialogDescription className="sr-only">
            Actual site photographs and architectural perspectives. Use arrow keys to navigate.
          </DialogDescription>
          <div style={{ position: 'relative', width: '100%', height: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <img
              src={slides[index]}
              alt={`Full size site photo ${index + 1}`}
              style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }}
            />
          </div>
          {controls}
        </DialogContent>
      </Dialog>
    </div>
  );
}

