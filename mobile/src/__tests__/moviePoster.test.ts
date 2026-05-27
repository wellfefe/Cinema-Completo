import { describe, expect, it } from 'vitest';
import { getMoviePosterUrl } from '../utils/getMoviePosterUrl';

describe('movie poster mapping', () => {
  it('returns a different poster for each seeded movie title', () => {
    const posters = [
      getMoviePosterUrl('Interestelar'),
      getMoviePosterUrl('Divertida Mente 2'),
      getMoviePosterUrl('Duna: Parte Dois'),
    ];

    expect(new Set(posters).size).toBe(3);
  });
});
