export interface Exercise {
  id: string;
  name: string;
  target: string;
  sets?: number;
  reps?: string;
  duration?: string;
  calories: number;
}

export interface Workout {
  id: string;
  name: string;
  exercises: Exercise[];
  completed: boolean;
  date: string;
}

export interface DailyStats {
  caloriesBurned: number;
  caloriesGoal: number;
  proteinConsumed: number;
  proteinGoal: number;
  waterDrank: number;
  waterGoal: number;
  steps: number;
  stepsGoal: number;
}

export interface Challenge {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  xp: number;
}
