const fallbackPosterUrl =
  'https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg';

const posterByNormalizedTitle: Record<string, string> = {
  interestelar: 'https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg',
  'divertida mente 2': 'https://image.tmdb.org/t/p/w500/xGvz7nlGQeePcVOpAzOcHsC7kRt.jpg',
  'duna parte dois': 'https://image.tmdb.org/t/p/w500/8b8R8l88Qje9dn9OE8PY05Nxl1X.jpg',
};

function normalizeTitle(title: string) {
  return title
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-zA-Z0-9 ]/g, '')
    .trim()
    .toLowerCase();
}

export function getMoviePosterUrl(title: string) {
  return posterByNormalizedTitle[normalizeTitle(title)] ?? fallbackPosterUrl;
}
