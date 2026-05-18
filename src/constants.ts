import { Exercise, Challenge } from './types';

export const EXERCISE_LIBRARY: Exercise[] = [
  { id: '1', name: 'Pushups', target: 'Chest/Triceps', sets: 3, reps: '15', calories: 50 },
  { id: '2', name: 'Squats', target: 'Quads/Glutes', sets: 3, reps: '20', calories: 60 },
  { id: '3', name: 'Plank', target: 'Core', duration: '60s', calories: 30 },
  { id: '4', name: 'Burpees', target: 'Full Body', sets: 3, reps: '10', calories: 100 },
  { id: '5', name: 'Lunges', target: 'Legs', sets: 3, reps: '12', calories: 45 },
  { id: '6', name: 'Mountain Climbers', target: 'Core/Cardio', duration: '45s', calories: 55 },
];

export const INITIAL_CHALLENGES: Challenge[] = [
  { id: 'c1', title: 'Hydration Hero', description: 'Drink 3 liters of water today', completed: false, xp: 50 },
  { id: 'c2', title: 'Step Master', description: 'Walk 10,000 steps', completed: false, xp: 100 },
  { id: 'c3', title: 'Early Bird', description: 'Complete a workout before 9 AM', completed: false, xp: 75 },
];

export const PROGRESS_CHART_DATA = [
  { day: 'Mon', burned: 2100, consumed: 1800 },
  { day: 'Tue', burned: 2400, consumed: 1900 },
  { day: 'Wed', burned: 1800, consumed: 2100 },
  { day: 'Thu', burned: 2600, consumed: 2000 },
  { day: 'Fri', burned: 2200, consumed: 2200 },
  { day: 'Sat', burned: 3000, consumed: 2500 },
  { day: 'Sun', burned: 1500, consumed: 1800 },
];
