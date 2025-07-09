export type ExperienceData = {
  id: number;
  company: string;
  active: boolean;
  position: string;
  period: string;
  schedule: string;
  projects: {
    name: string;
    details: string[];
  }[];
  technologies_used: string[];
};
