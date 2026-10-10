import { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { INK, MUTED, PURPLE, BORDER, PURPLE_SOFT, SectionEyebrow } from './AkepUI';

interface University {
  name: string;
  country: string;
  blurb: string;
  image: string;
}

const universities: University[] = [
  {
    name: 'University of Sierra Leone',
    country: 'Freetown, Sierra Leone',
    blurb:
      'Exploring AKEP as a unified dissertation and supervisor workflow for its faculties.',
    image:
      'https://images.unsplash.com/photo-1576495199011-eb94736d05d6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1200',
  },
  {
    name: 'University of Nigeria',
    country: 'Nsukka, Nigeria',
    blurb:
      'In discussion on AI duplicate detection across its multi-campus research output.',
    image:
      'https://images.unsplash.com/photo-1591123120675-6f7f1aae0e5b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1200',
  },
  {
    name: 'University of Ghana',
    country: 'Accra, Ghana',
    blurb:
      'Evaluating AKEP for graduate program reporting and accreditation cycles.',
    image:
      'https://images.unsplash.com/photo-1689686610856-3bcf921eb1f0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1200',
  },
];

export function AkepLogoCloud() {
  const [index, setIndex] = useState(0);
  const total = universities.length;

  useEffect(() => {
    const t = setInterval(() => setIndex((i) => (i + 1) % total), 6000);
    return () => clearInterval(t);
  }, [total]);

  const prev = () => setIndex((i) => (i - 1 + total) % total);
  const next = () => setIndex((i) => (i + 1) % total);

  return (
    <section
      className="py-20 px-6"
      style={{ background: 'white', borderTop: 'none', position: 'relative' }}
    >
      {/* Gradient bridge from dark hero above — fades dark navy → white */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: 96,
          background: 'linear-gradient(to bottom, #0B1A38 0%, rgba(255,255,255,0) 100%)',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />
      <div className="relative max-w-6xl mx-auto" style={{ zIndex: 1 }}>
        <div className="text-center mb-10 max-w-2xl mx-auto">
          <SectionEyebrow>Partners</SectionEyebrow>
          <h2 className="mt-4" style={{ color: INK, letterSpacing: '-0.01em' }}>
            In active conversations with universities across the continent
          </h2>
          <p className="mt-3" style={{ color: MUTED }}>
            Research offices and graduate schools exploring AKEP for the 2026 pilot cohort.
          </p>
        </div>

        <div className="relative">
          <div
            className="overflow-hidden rounded-2xl"
            style={{ border: `1px solid ${BORDER}`, background: '#F8F7FB' }}
          >
            <div
              className="flex transition-transform duration-700 ease-out"
              style={{ transform: `translateX(-${index * 100}%)` }}
            >
              {universities.map((u) => (
                <div key={u.name} className="w-full shrink-0">
                  <div className="grid grid-cols-1 md:grid-cols-2">
                    <div className="relative h-64 md:h-80 overflow-hidden">
                      <ImageWithFallback
                        src={u.image}
                        alt={u.name}
                        className="w-full h-full object-cover"
                      />
                      <div
                        className="absolute inset-0"
                        style={{
                          background:
                            'linear-gradient(135deg, rgba(107,33,245,0.35) 0%, rgba(0,0,0,0) 60%)',
                        }}
                      />
                    </div>
                    <div className="p-8 md:p-10 flex flex-col justify-center">
                      <span
                        className="self-start text-xs px-3 py-1 rounded-full"
                        style={{
                          background: PURPLE_SOFT,
                          color: PURPLE,
                          border: `1px solid ${BORDER}`,
                        }}
                      >
                        {u.country}
                      </span>
                      <h3
                        className="mt-4"
                        style={{ color: INK, letterSpacing: '-0.01em' }}
                      >
                        {u.name}
                      </h3>
                      <p className="mt-3" style={{ color: MUTED }}>
                        {u.blurb}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={prev}
            aria-label="Previous"
            className="absolute top-1/2 -translate-y-1/2 -left-3 md:-left-5 w-10 h-10 rounded-full flex items-center justify-center transition-colors hover:opacity-90"
            style={{
              background: 'white',
              border: `1px solid ${BORDER}`,
              color: INK,
              boxShadow: '0 6px 16px rgba(11,4,32,0.08)',
            }}
          >
            <ChevronLeft size={18} />
          </button>
          <button
            onClick={next}
            aria-label="Next"
            className="absolute top-1/2 -translate-y-1/2 -right-3 md:-right-5 w-10 h-10 rounded-full flex items-center justify-center transition-colors hover:opacity-90"
            style={{
              background: 'white',
              border: `1px solid ${BORDER}`,
              color: INK,
              boxShadow: '0 6px 16px rgba(11,4,32,0.08)',
            }}
          >
            <ChevronRight size={18} />
          </button>
        </div>

        <div className="mt-6 flex items-center justify-center gap-2">
          {universities.map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              aria-label={`Go to slide ${i + 1}`}
              className="h-1.5 rounded-full transition-all"
              style={{
                width: i === index ? 28 : 10,
                background: i === index ? PURPLE : BORDER,
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
