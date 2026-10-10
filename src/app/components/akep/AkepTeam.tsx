import { ImageWithFallback } from '../figma/ImageWithFallback';
import { SectionEyebrow } from './AkepUI';
import { Linkedin, Twitter, Github } from 'lucide-react';

interface Member {
  name: string;
  role: string;
  bio: string;
  photo: string;
  linkedin?: string;
  twitter?: string;
  github?: string;
}

const team: Member[] = [
  {
    name: 'Abdulai Tamba Lebbie',
    role: 'CEO & Founder',
    bio: 'Visionary leader at the intersection of AI and African higher education. Building AKEP to transform how research institutions manage knowledge, compliance, and academic workflows across the continent.',
    photo: '/team/abdulai-tamba-lebbie.jpg',
    linkedin: 'https://www.linkedin.com/in/abdulai-tamba-lebbie',
    twitter: 'https://x.com/abdulaitamba',
    github: 'https://github.com/abdulaitamba',
  },
  {
    name: 'Lanre Olusegun Akinola',
    role: 'AI Engineer',
    bio: "Designs and deploys the machine learning models that power AKEP's semantic analysis — from entity extraction to intelligent document classification. Focused on AI that understands the nuance of academic language and institutional context.",
    photo: '/team/akinola-lanre-olusegun.jpeg',
    linkedin: 'https://www.linkedin.com/in/lanre-akinola',
    github: 'https://github.com/lanre-akinola',
  },
  {
    name: 'Foday Mansaray',
    role: 'Front-End Engineer',
    bio: 'Crafts the interfaces that make complex research workflows feel intuitive. Bridges design and engineering to ensure every researcher, administrator, and compliance officer gets a clear, responsive experience.',
    photo: '/team/foday-mansaray.jpeg',
    linkedin: 'https://www.linkedin.com/in/foday-mansaray',
    github: 'https://github.com/foday-mansaray',
  },
  {
    name: 'Richard Ekow Sackey',
    role: 'Backend Engineer',
    bio: 'Architects the APIs, data pipelines, and infrastructure that keep AKEP reliable at scale. Ensures that every record stored and every workflow triggered performs exactly as expected — under any load.',
    photo: '/team/richard-ekow-sackey.jpeg',
    linkedin: 'https://www.linkedin.com/in/richard-ekow-sackey',
    github: 'https://github.com/richard-ekow-sackey',
  },
];

function TeamCard({ member }: { member: Member }) {
  return (
    <div
      className="rounded-2xl p-5 sm:p-6 lg:p-7 text-center flex flex-col items-center"
      style={{
        background: '#16122B',
        border: '1px solid rgba(255,255,255,0.06)',
        boxShadow: '0 20px 50px -25px rgba(0,0,0,0.5)',
      }}
    >
      {/* Avatar — scales from 88px on mobile up to 112px on desktop */}
      <div
        className="rounded-full p-[3px] w-22 h-22 sm:w-24 sm:h-24 lg:w-28 lg:h-28 shrink-0"
        style={{
          background:
            'linear-gradient(135deg, #6B21F5 0%, #C084FC 50%, #A78BFA 100%)',
        }}
      >
        <div
          className="w-full h-full rounded-full overflow-hidden"
          style={{ background: '#0D0B1F' }}
        >
          <ImageWithFallback
            src={member.photo}
            alt={member.name}
            className="w-full h-full object-cover object-top"
          />
        </div>
      </div>

      <div className="mt-4 text-white font-medium text-base sm:text-lg leading-snug">
        {member.name}
      </div>
      <div className="mt-1 text-sm" style={{ color: '#A78BFA' }}>
        {member.role}
      </div>
      <p
        className="mt-3 text-xs sm:text-sm leading-relaxed"
        style={{ color: 'rgba(255,255,255,0.65)' }}
      >
        {member.bio}
      </p>

      {/* Social links */}
      {(member.linkedin || member.twitter || member.github) && (
        <div className="mt-5 pt-4 w-full flex items-center justify-center gap-1" style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }}>
          {member.linkedin && (
            <a
              href={member.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${member.name} on LinkedIn`}
              className="flex items-center justify-center w-9 h-9 rounded-xl transition-all hover:scale-110"
              style={{ color: 'rgba(255,255,255,0.75)', background: 'rgba(255,255,255,0.06)' }}
              onMouseEnter={e => (e.currentTarget.style.color = '#FFFFFF')}
              onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.75)')}
            >
              <Linkedin size={15} />
            </a>
          )}
          {member.github && (
            <a
              href={member.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${member.name} on GitHub`}
              className="flex items-center justify-center w-9 h-9 rounded-xl transition-all hover:scale-110"
              style={{ color: 'rgba(255,255,255,0.75)', background: 'rgba(255,255,255,0.06)' }}
              onMouseEnter={e => (e.currentTarget.style.color = '#FFFFFF')}
              onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.75)')}
            >
              <Github size={15} />
            </a>
          )}
          {member.twitter && (
            <a
              href={member.twitter}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${member.name} on X (Twitter)`}
              className="flex items-center justify-center w-9 h-9 rounded-xl transition-all hover:scale-110"
              style={{ color: 'rgba(255,255,255,0.75)', background: 'rgba(255,255,255,0.06)' }}
              onMouseEnter={e => (e.currentTarget.style.color = '#FFFFFF')}
              onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.75)')}
            >
              <Twitter size={15} />
            </a>
          )}
        </div>
      )}
    </div>
  );
}

export function AkepTeam() {
  return (
    <section
      id="team"
      className="relative py-16 sm:py-20 lg:py-24 px-4 sm:px-6 overflow-hidden"
      style={{ background: '#0B0420' }}
    >
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse at top, rgba(107,33,245,0.25) 0%, rgba(11,4,32,0) 60%)',
        }}
      />
      <div className="relative max-w-6xl mx-auto">
        <div className="text-center mb-10 sm:mb-14 max-w-2xl mx-auto px-2">
          <SectionEyebrow>Team</SectionEyebrow>
          <h2 className="mt-4 text-white text-2xl sm:text-3xl lg:text-4xl" style={{ letterSpacing: '-0.01em' }}>
            Builders, researchers, and operators behind AKEP
          </h2>
          <p className="mt-4 text-sm sm:text-base" style={{ color: 'rgba(255,255,255,0.65)' }}>
            A small, focused team with deep roots in African higher education, applied AI, and
            software for research operations.
          </p>
        </div>

        {/* Mobile: 1 col · Tablet: 2 col · Desktop: 4 col */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 lg:gap-6">
          {team.map((m) => (
            <TeamCard key={m.name} member={m} />
          ))}
        </div>
      </div>
    </section>
  );
}
