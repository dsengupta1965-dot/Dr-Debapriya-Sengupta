export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export interface ModuleSection {
  title: string;
  content: string; // Markdown-like text
  keyPoints?: string[];
}

export interface Module {
  id: string;
  title: string;
  description: string;
  learningOutcomes: string[];
  sections: ModuleSection[];
  quiz: QuizQuestion[];
}

export interface CourseState {
  currentModuleId: string | null;
  completedModules: string[];
  currentView: 'dashboard' | 'module' | 'quiz' | 'simulation';
}
