export interface HighlightMetric {
  value: string;
  label: string;
  caption: string;
}

export interface SkillGroup {
  title: string;
  skills: string[];
}

export interface Project {
  id: string;
  title: string;
  role: string;
  period: string;
  background: string;
  outcome?: string;
  detailedIntro: string[];
  techStack: string[];
  architecturePoints: string[];
  metrics?: string[];
}

export interface EducationItem {
  school: string;
  major: string;
  degree: string;
  period: string;
}

export interface ResumeData {
  name: string;
  direction: string;
  city: string;
  status: string;
  phone: string;
  email: string;
  metrics: HighlightMetric[];
  skillGroups: SkillGroup[];
  projects: Project[];
  education: EducationItem[];
  honors: string[];
}
