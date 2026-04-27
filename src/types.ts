export interface Achievement {
  title: string;
  issuer: string;
  image: string;
}

export interface ProjectMedia {
  type: 'image' | 'video';
  src: string;
  alt?: string;
}

export interface Project {
  id: string;
  title: string;
  role: string;
  period: string;
  description: string;
  color: string;
  location: {
    name: string;
    lat: number;
    lng: number;
  };
  details: string[]
  skills: string[];
  image: string;
  thumbnail?: string; // thumbnail for "other projects" card
  githubUrl?: string;
  demoUrl?: string;
  articleUrl?: string;
  // Extended fields for detail page
  device?: string;
  associatedWith?: string;
  industry?: string;
  year?: string;
  overview?: string;
  goal?: string;
  approach?: { title: string; body: string }[];
  collage?: ProjectMedia[]; // up to 3 media items
  detailSkills?: string[]; // more detailed skills for right column
  category?: string; // for filtering in all-projects page
}

export interface Experience {
  title: string;
  company: string;
  period: string;
  description: string;
  image: string;
  skills: string[];
}

export interface Testimonial {
  quote: string;
  author: string;
  role: string;
}
