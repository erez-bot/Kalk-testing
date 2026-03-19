'use client';

import { ChefHat, Timer, BookOpen, ChefHat as CookIcon } from 'lucide-react';

interface NavigationProps {
  activeTab: 'recipes' | 'timers' | 'myRecipes' | 'cookingFlow';
  onTabChange: (tab: 'recipes' | 'timers' | 'myRecipes' | 'cookingFlow') => void;
  runningTimersCount: number;
  hasActiveCookingSession: boolean;
}

export default function Navigation({ activeTab, onTabChange, runningTimersCount, hasActiveCookingSession }: NavigationProps) {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-orange-500 to-amber-500 shadow-lg">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-2">
            <ChefHat className="w-8 h-8 text-white" />
            <span className="text-xl font-bold text-white tracking-tight">CookMate</span>
          </div>
          
          <div className="flex gap-1 bg-white/20 rounded-full p-1">
            <button
              onClick={() => onTabChange('recipes')}
              className={`flex items-center gap-2 px-3 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                activeTab === 'recipes'
                  ? 'bg-white text-orange-600 shadow-md'
                  : 'text-white hover:bg-white/10'
              }`}
            >
              <ChefHat className="w-4 h-4" />
              Recipes
            </button>
            <button
              onClick={() => onTabChange('myRecipes')}
              className={`flex items-center gap-2 px-3 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                activeTab === 'myRecipes'
                  ? 'bg-white text-orange-600 shadow-md'
                  : 'text-white hover:bg-white/10'
              }`}
            >
              <BookOpen className="w-4 h-4" />
              My Recipes
            </button>
            <button
              onClick={() => onTabChange('cookingFlow')}
              className={`flex items-center gap-2 px-3 py-2 rounded-full text-sm font-medium transition-all duration-200 relative ${
                activeTab === 'cookingFlow'
                  ? 'bg-white text-orange-600 shadow-md'
                  : 'text-white hover:bg-white/10'
              }`}
            >
              <CookIcon className="w-4 h-4" />
              Cooking Flow
              {hasActiveCookingSession && (
                <span className="absolute -top-1 -right-1 bg-emerald-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center animate-pulse">
                  ✓
                </span>
              )}
            </button>
            <button
              onClick={() => onTabChange('timers')}
              className={`flex items-center gap-2 px-3 py-2 rounded-full text-sm font-medium transition-all duration-200 relative ${
                activeTab === 'timers'
                  ? 'bg-white text-orange-600 shadow-md'
                  : 'text-white hover:bg-white/10'
              }`}
            >
              <Timer className="w-4 h-4" />
              Timers
              {runningTimersCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center animate-pulse">
                  {runningTimersCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
