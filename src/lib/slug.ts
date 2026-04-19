// Shared slugifier used across product/brand/category links.
// Strips diacritics so "Lumière Candles" → "lumiere-candles" (matches BrandProfile keys).
export const slugify = (s: string) =>
  s
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
