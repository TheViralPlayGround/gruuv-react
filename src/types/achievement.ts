// Achievement model - matches your Android Achievement.kt
export interface Achievement {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  effort: number; // 0-10 scale
  date: number; // timestamp
  effortHistory: Record<string, number>; // date -> effort mapping
}

// For creating new achievements
export interface CreateAchievement {
  title: string;
  description: string;
  effort: number;
}

// For updating achievements
export interface UpdateAchievement {
  id: string;
  title?: string;
  description?: string;
  effort?: number;
  completed?: boolean;
}
