export const MOVIE_CATEGORY = {
  ROMANCE: 'romance',
  DRAMA: 'drama',
  ACTION: 'action',
  COMEDY: 'comedy',
  ADVENTURE: 'adventure',
  THRILLER: 'thriller',
  SF: 'sf',
};

export type MovieCategoryType = (typeof MOVIE_CATEGORY)[keyof typeof MOVIE_CATEGORY];

export const MOVIE_CATEGORY_OPTIONS = [
  { label: 'romance', value: MOVIE_CATEGORY.ROMANCE },
  { label: 'drama', value: MOVIE_CATEGORY.DRAMA },
  { label: 'action', value: MOVIE_CATEGORY.ACTION },
  { label: 'comedy', value: MOVIE_CATEGORY.COMEDY },
  { label: 'adventure', value: MOVIE_CATEGORY.ADVENTURE },
  { label: 'thriller', value: MOVIE_CATEGORY.THRILLER },
  { label: 'sf', value: MOVIE_CATEGORY.SF },
];
