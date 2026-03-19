'use client';

import { useState, useEffect } from 'react';
import { X, Check, RotateCcw, ChefHat, Clock, Minus, Plus, Play } from 'lucide-react';
import { Recipe } from '@/types';
import { scaleIngredient, formatFraction } from '@/lib/utils';
import { useTimers } from '@/contexts/TimerContext';

interface CookingModeProps {
  recipe: Recipe;
  servings: number;
  onExit: () => void;
  onUpdateServings: (servings: number) => void;
}

const COOKING_STEPS_KEY = 'cooking-steps-';

export default function CookingMode({ recipe, servings, onExit, onUpdateServings }: CookingModeProps) {
  const [completedSteps, setCompletedSteps] = useState<Set<number>>(new Set());
  const [localServings, setLocalServings] = useState(servings);
  const { addTimer, startTimer, timers, removeTimer } = useTimers();

  // Load saved step progress on mount
  useEffect(() => {
    const saved = localStorage.getItem(COOKING_STEPS_KEY + recipe.id);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setCompletedSteps(new Set(parsed));
      } catch {
        // ignore
      }
    }
  }, [recipe.id]);

  // Save step progress when it changes
  useEffect(() => {
    localStorage.setItem(COOKING_STEPS_KEY + recipe.id, JSON.stringify([...completedSteps]));
  }, [completedSteps, recipe.id]);

  const handleToggleStep = (index: number) => {
    const newCompleted = new Set(completedSteps);
    if (newCompleted.has(index)) {
      newCompleted.delete(index);
    } else {
      newCompleted.add(index);
    }
    setCompletedSteps(newCompleted);
  };

  const handleResetSteps = () => {
    setCompletedSteps(new Set());
    localStorage.removeItem(COOKING_STEPS_KEY + recipe.id);
  };

  const handleServingsChange = (newServings: number) => {
    if (newServings >= 1 && newServings <= 12) {
      setLocalServings(newServings);
      onUpdateServings(newServings);
    }
  };

  const handleStartTimer = (label: string, minutes: number) => {
    // Add timer first
    addTimer(`${recipe.name} - ${label}`, minutes * 60);
    // Find and start the newly created timer
    setTimeout(() => {
      const matchingTimer = timers.find(t => t.label === `${recipe.name} - ${label}` && t.remainingSeconds === minutes * 60);
      if (matchingTimer) {
        startTimer(matchingTimer.id);
      }
    }, 50);
  };

  const progress = (completedSteps.size / recipe.instructions.length) * 100;

  return (
    <div className="fixed inset-0 z-50 bg-gray-900 flex flex-col">
      {/* Header */}
      <div className="relative h-48 flex-shrink-0">
        <img
          src={recipe.image}
          alt={recipe.name}
          className="w-full h-full object-cover"
          onError={(e) => {
            (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1495521821757-a1efb6729352?w=800&q=80';
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/50 to-transparent" />
        
        <button
          onClick={onExit}
          className="absolute top-4 right-4 p-3 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-colors"
        >
          <X className="w-6 h-6 text-white" />
        </button>
        
        <div className="absolute bottom-4 left-6 right-6">
          <h1 className="text-3xl font-bold text-white mb-2">{recipe.name}</h1>
          <div className="flex items-center gap-4 text-white/80">
            <div className="flex items-center gap-1">
              <Clock className="w-5 h-5" />
              <span>{recipe.prepTime + recipe.cookTime} min</span>
            </div>
            <span className="px-3 py-1 rounded-full bg-white/20 text-sm">
              {recipe.difficulty}
            </span>
          </div>
        </div>
        
        {/* Progress Bar */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-700">
          <div 
            className="h-full bg-gradient-to-r from-emerald-400 to-teal-400 transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto p-6">
        {/* Servings Adjuster */}
        <div className="bg-gray-800 rounded-2xl p-4 mb-6">
          <div className="flex items-center justify-between">
            <span className="text-white font-medium">Servings</span>
            <div className="flex items-center gap-3">
              <button
                onClick={() => handleServingsChange(localServings - 1)}
                disabled={localServings <= 1}
                className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <Minus className="w-5 h-5 text-white" />
              </button>
              <span className="w-12 text-center text-2xl font-bold text-white">{localServings}</span>
              <button
                onClick={() => handleServingsChange(localServings + 1)}
                disabled={localServings >= 12}
                className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <Plus className="w-5 h-5 text-white" />
              </button>
            </div>
          </div>
        </div>

        {/* Phase Timers */}
        {recipe.timers && recipe.timers.length > 0 && (
          <div className="bg-gray-800 rounded-2xl p-4 mb-6">
            <h3 className="text-white font-bold mb-3 flex items-center gap-2">
              <Clock className="w-5 h-5 text-emerald-400" />
              Cooking Phases
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {recipe.timers.map((timer, index) => (
                <button
                  key={index}
                  onClick={() => handleStartTimer(timer.label, timer.minutes)}
                  className="flex items-center justify-between p-3 bg-gray-700 rounded-xl hover:bg-gray-600 transition-colors"
                >
                  <span className="text-white">{timer.label}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-gray-400">{timer.minutes} min</span>
                    <Play className="w-4 h-4 text-emerald-400" />
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Active Timers Display */}
        {timers.length > 0 && (
          <div className="bg-gray-800 rounded-2xl p-4 mb-6">
            <h3 className="text-white font-bold mb-3 flex items-center gap-2">
              <Clock className="w-5 h-5 text-orange-400" />
              Active Timers
            </h3>
            <div className="space-y-2">
              {timers.map((timer) => {
                const minutes = Math.floor(timer.remainingSeconds / 60);
                const seconds = timer.remainingSeconds % 60;
                const progress = ((timer.totalSeconds - timer.remainingSeconds) / timer.totalSeconds) * 100;
                
                return (
                  <div key={timer.id} className="flex items-center justify-between p-3 bg-gray-700 rounded-xl">
                    <div className="flex-1 mr-4">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-white font-medium">{timer.label}</span>
                        <span className={`font-mono text-lg ${timer.isRunning ? 'text-emerald-400' : 'text-gray-400'}`}>
                          {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
                        </span>
                      </div>
                      <div className="h-2 bg-gray-600 rounded-full overflow-hidden">
                        <div 
                          className={`h-full transition-all duration-1000 ${
                            progress > 80 ? 'bg-red-500' : progress > 50 ? 'bg-yellow-500' : 'bg-emerald-500'
                          }`}
                          style={{ width: `${progress}%` }}
                        />
                      </div>
                    </div>
                    <button
                      onClick={() => removeTimer(timer.id)}
                      className="p-2 rounded-lg bg-red-500/20 hover:bg-red-500/40 text-red-400 transition-colors"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Ingredients */}
        <div className="bg-gray-800 rounded-2xl p-4 mb-6">
          <h3 className="text-white font-bold mb-3 flex items-center gap-2">
            <ChefHat className="w-5 h-5 text-orange-400" />
            Ingredients
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {recipe.ingredients.map((ingredient, index) => {
              const scaledAmount = scaleIngredient(ingredient.amount, recipe.baseServings, localServings);
              return (
                <div 
                  key={index}
                  className="flex items-center justify-between p-3 bg-gray-700 rounded-xl"
                >
                  <span className="text-gray-300">{ingredient.name}</span>
                  <span className="font-bold text-orange-400">
                    {formatFraction(scaledAmount)} {ingredient.unit}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Instructions */}
        <div className="bg-gray-800 rounded-2xl p-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-white font-bold flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-emerald-500 flex items-center justify-center text-sm">
                {completedSteps.size}
              </span>
              Instructions
            </h3>
            <button
              onClick={handleResetSteps}
              className="flex items-center gap-1 px-3 py-1.5 text-sm text-gray-400 hover:text-white hover:bg-gray-700 rounded-lg transition-colors"
            >
              <RotateCcw className="w-4 h-4" />
              Reset
            </button>
          </div>
          <div className="space-y-3">
            {recipe.instructions.map((instruction, index) => {
              const isCompleted = completedSteps.has(index);
              return (
                <button
                  key={index}
                  onClick={() => handleToggleStep(index)}
                  className={`w-full text-left p-4 rounded-xl transition-all ${
                    isCompleted 
                      ? 'bg-emerald-900/50 border-2 border-emerald-500' 
                      : 'bg-gray-700 border-2 border-transparent hover:border-gray-500'
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                      isCompleted ? 'bg-emerald-500' : 'bg-gray-600'
                    }`}>
                      {isCompleted ? (
                        <Check className="w-5 h-5 text-white" />
                      ) : (
                        <span className="text-white font-bold">{index + 1}</span>
                      )}
                    </div>
                    <p className={`flex-1 pt-1 ${isCompleted ? 'text-gray-400 line-through' : 'text-white'}`}>
                      {instruction}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
