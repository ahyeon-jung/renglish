type FilteredScene = {
  id: string;
  movieImageUrl?: string;
};

export type FilteredStudy = {
  id: string;
  title: string;
  description: string;
  studiedAt: Date;
  scene: FilteredScene;
  createdAt: Date;
  updatedAt: Date;
};

type StudySceneFilteredMovie = {
  title: string;
  imageUrl?: string;
};

type StudySceneFiltered = {
  id: string;
  title: string;
  movie: StudySceneFilteredMovie;
};

export type ExtendedFilteredStudy = {
  id: string;
  title: string;
  description: string;
  studiedAt: Date;
  participantCount: number;
  applicantCount: number;
  isCompleted: boolean;
  scene: StudySceneFiltered;
};
