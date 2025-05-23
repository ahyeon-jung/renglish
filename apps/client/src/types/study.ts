import { Movie } from "./script";
import { Scene } from "./scene";

type StudySceneType = Scene & { movie: Movie };

export type StudyType = {
  id: string;
  studiedAt: Date;
  title: string;
  description: string;
  isCompleted: boolean;
  scene: StudySceneType;
  participantCount: number;
  applicantCount: number;
};

export type StudyUserType = { id: string; email: string };

export type AdminStudyType = {
  applicants: StudyUserType[];
  participants: StudyUserType[];
} & StudyType;
