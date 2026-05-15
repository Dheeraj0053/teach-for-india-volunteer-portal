/** Hero banner — place custom image at public/volunteers-hero.png or set VITE_HERO_IMAGE */
const FALLBACK_HERO =
  'https://images.unsplash.com/photo-1497486751825-1233686d25d7?auto=format&fit=crop&w=1920&q=80';

export const HERO_IMAGE =
  import.meta.env.VITE_HERO_IMAGE?.trim() || '/volunteers-hero.png';

export { FALLBACK_HERO };
