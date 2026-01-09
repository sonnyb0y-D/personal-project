export interface NavItem {
  label: string;
  href: string;
}

export interface GalleryItem {
  id: number;
  title: string;
  category: string;
  imageUrl: string;
  aspect: string; // Tailwind class like aspect-video or aspect-square
}

export interface DreamResponse {
  text: string;
  mood: string;
}
