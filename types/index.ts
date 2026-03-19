export interface RecipeTimer {
  label: string;
  minutes: number;
}

export interface Ingredient {
  name: string;
  amount: number;
  unit: string;
}

export interface Recipe {
  id: string;
  name: string;
  image: string;
  ingredients: Ingredient[];
  instructions: string[];
  prepTime: number;
  cookTime: number;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  cuisine: string;
  baseServings: number;
  isFavorite?: boolean;
  isUserRecipe?: boolean;
  lastUsedServings?: number;
  timers?: RecipeTimer[];
}

export interface Timer {
  id: string;
  label: string;
  totalSeconds: number;
  remainingSeconds: number;
  isRunning: boolean;
  createdAt: number;
}

export type TimerStatus = 'green' | 'yellow' | 'red';

export interface RecipeContextType {
  recipes: Recipe[];
  addRecipe: (recipe: Omit<Recipe, 'id' | 'isUserRecipe'>) => void;
  updateRecipe: (id: string, recipe: Partial<Recipe>) => void;
  deleteRecipe: (id: string) => void;
  toggleFavorite: (id: string) => void;
  updateServings: (id: string, servings: number) => void;
  searchRecipes: (query: string) => Recipe[];
}

export interface TimerContextType {
  timers: Timer[];
  addTimer: (label: string, seconds: number) => void;
  removeTimer: (id: string) => void;
  startTimer: (id: string) => void;
  pauseTimer: (id: string) => void;
  resetTimer: (id: string) => void;
  addOneMinute: (id: string) => void;
}
