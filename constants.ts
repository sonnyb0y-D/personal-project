
import { Project, Experience, SocialLink } from './types';

export const PERSONAL_INFO = {
  name: "Daydream",
  title: "Multidisciplinary Designer",
  tagline: "Visual narratives for the digital age.",
  about: "Bridging the gap between functional design and emotional storytelling.",
  email: "hello@daydream.design",
  location: "Tokyo, Japan"
};

export const PROJECTS: Project[] = [
  {
    id: '1',
    title: 'Vogue Italia',
    description: 'Digital editorial redesign focusing on typography and fluid motion.',
    tags: ['Art Direction', 'Web Design'],
    imageUrl: 'https://images.unsplash.com/photo-1500917293891-ef795e70e1f6?q=80&w=2070&auto=format&fit=crop', 
    link: '#'
  },
  {
    id: '2',
    title: 'Aesop Skincare',
    description: 'E-commerce experience with a focus on sensory visualization.',
    tags: ['UX/UI', 'Development'],
    imageUrl: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?q=80&w=2532&auto=format&fit=crop',
    link: '#'
  },
  {
    id: '3',
    title: 'MOMA Archive',
    description: 'Interactive exhibition archive for the Museum of Modern Art.',
    tags: ['Creative Tech', 'WebGL'],
    imageUrl: 'https://images.unsplash.com/photo-1545989253-02cc26577f88?q=80&w=2070&auto=format&fit=crop',
    link: '#'
  }
];

export const EXPERIENCE: Experience[] = [
  {
    id: '1',
    role: 'Senior Art Director',
    company: 'Studio Dumbar',
    period: '2022 — Present',
    description: 'Leading brand identity projects for global clients.'
  },
  {
    id: '2',
    role: 'Creative Developer',
    company: 'Active Theory',
    period: '2019 — 2022',
    description: 'Developing immersive web experiences and awards-winning sites.'
  }
];

export const SYSTEM_INSTRUCTION = `
You are the AI Digital Twin of "Daydream", a high-end multidisciplinary designer.
Tone: Professional, elegant, concise, slightly poetic, sophisticated.
Avoid: Slang, emojis (use sparingly), overly enthusiastic exclamation marks.
Context:
- This is a portfolio website for high-ticket clients (luxury fashion, tech, art).
- You are here to answer questions about Daydream's design philosophy, availability, and technical skills.

Key Philosophies:
- "Less is more."
- "Design is intelligence made visible."
- Focus on typography and negative space.
`;
