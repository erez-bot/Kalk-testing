'use client';

import { useState } from 'react';
import { X, Minus, Plus, Star, StarOff, Clock, ChefHat, Play, Edit, Trash2, Utensils, Timer } from 'lucide-react';
import { Recipe } from '@/types';
import { scaleIngredient, formatFraction } from '@/lib/utils';
import { useTimers } from '@/contexts/TimerContext';
import TimerRing from './TimerRing';

interface RecipeModalProps {
  recipe: Recipe;
  onClose: () => void;
  onToggleFavorite?: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
  onUpdateServings: (servings: number) => void;
  onTimerStart?: (label: string) => void;
  onCookNow?: () => void;
}

export default function RecipeModal({ 
  recipe, 
  onClose, 
  onToggleFavorite, 
  onEdit, 
  onDelete,
  onUpdateServings,
  onTimerStart,
  onCookNow
}: RecipeModalProps) {
  const [servings, setServings] = useState(recipe.lastUsedServings || recipe.baseServings);
  const { addTimer, timers } = useTimers();

  const handleServingsChange = (newServings: number) => {
    if (newServings >= 1 && newServings <= 12) {
      setServings(newServings);
      onUpdateServings(newServings);
    }
  };

  const handleStartTimer = (label: string, minutes: number) => {
    addTimer(`${recipe.name} - ${label}`, minutes * 60);
    onTimerStart?.(label);
  };

  const runningTimersForRecipe = timers.filter(t => t.isRunning);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />
      
      <div className="relative w-full max-w-2xl max-h-[90vh] bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col">
        {/* Header Image */}
        <div className="relative h-56 flex-shrink-0">
          <img
            src={recipe.image}
            alt={recipe.name}
            className="w-full h-full object-cover"
            onError={(e) => {
              (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1495521821757-a1efb6729352?w=800&q=80';
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
          
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-white/90 backdrop-blur-sm shadow-lg hover:bg-white transition-colors"
          >
            <X className="w-5 h-5 text-gray-700" />
          </button>
          
          <div className="absolute bottom-4 left-6 right-6">
            <div className="flex items-center gap-2 mb-2">
              <span className="px-3 py-1 rounded-full text-sm font-medium bg-orange-500 text-white">
                {recipe.cuisine}
              </span>
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                recipe.difficulty === 'Easy' ? 'bg-emerald-500 text-white' :
                recipe.difficulty === 'Medium' ? 'bg-amber-500 text-white' :
                'bg-red-500 text-white'
              }`}>
                {recipe.difficulty}
              </span>
            </div>
            <h2 className="text-3xl font-bold text-white">{recipe.name}</h2>
          </div>
        </div>
        
        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {/* Time Info */}
          <div className="flex items-center gap-6 mb-6 text-gray-600">
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-orange-500" />
              <span className="font-medium">Prep: {recipe.prepTime} min</span>
            </div>
            <div className="flex items-center gap-2">
              <Utensils className="w-5 h-5 text-orange-500" />
              <span className="font-medium">Cook: {recipe.cookTime} min</span>
            </div>
          </div>
          
          {/* Running Timers Notification */}
          {runningTimersForRecipe.length > 0 && (
            <div className="mb-6 p-3 bg-emerald-50 rounded-xl border border-emerald-200">
              <div className="flex items-center gap-2 text-emerald-700 text-sm font-medium">
                <TimerRing 
                  remaining={runningTimersForRecipe[0].remainingSeconds} 
                  total={runningTimersForRecipe[0].totalSeconds} 
                  size={24}
                />
                <span>{runningTimersForRecipe.length} timer(s) running</span>
              </div>
            </div>
          )}
          
          {/* Servings Scaler */}
          <div className="bg-gradient-to-r from-orange-50 to-amber-50 rounded-2xl p-4 mb-6 border border-orange-100">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-bold text-gray-800">Servings</h3>
                <p className="text-sm text-gray-500">Scale ingredients instantly</p>
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => handleServingsChange(servings - 1)}
                  disabled={servings <= 1}
                  className="w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center hover:bg-orange-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <Minus className="w-5 h-5 text-orange-600" />
                </button>
                <span className="w-12 text-center text-2xl font-bold text-orange-600">{servings}</span>
                <button
                  onClick={() => handleServingsChange(servings + 1)}
                  disabled={servings >= 12}
                  className="w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center hover:bg-orange-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <Plus className="w-5 h-5 text-orange-600" />
                </button>
              </div>
            </div>
          </div>
          
          {/* Ingredients */}
          <div className="mb-6">
            <h3 className="font-bold text-xl text-gray-800 mb-4 flex items-center gap-2">
              <span className="w-1 h-6 bg-orange-500 rounded-full" />
              Ingredients
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {recipe.ingredients.map((ingredient, index) => {
                const scaledAmount = scaleIngredient(ingredient.amount, recipe.baseServings, servings);
                return (
                  <div 
                    key={index}
                    className="flex items-center justify-between p-3 bg-gray-50 rounded-xl hover:bg-orange-50 transition-colors"
                  >
                    <span className="text-gray-700">{ingredient.name}</span>
                    <span className="font-bold text-orange-600 bg-white px-3 py-1 rounded-full shadow-sm">
                      {formatFraction(scaledAmount)} {ingredient.unit}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
          
          {/* Instructions */}
          <div className="mb-6">
            <h3 className="font-bold text-xl text-gray-800 mb-4 flex items-center gap-2">
              <span className="w-1 h-6 bg-green-500 rounded-full" />
              Instructions
            </h3>
            <ol className="space-y-3">
              {recipe.instructions.map((instruction, index) => (
                <li key={index} className="flex gap-4">
                  <span className="flex-shrink-0 w-8 h-8 rounded-full bg-green-100 text-green-600 font-bold flex items-center justify-center">
                    {index + 1}
                  </span>
                  <p className="text-gray-600 pt-1">{instruction}</p>
                </li>
              ))}
            </ol>
          </div>
          
          {/* Phase-Based Timers */}
          {(recipe.timers && recipe.timers.length > 0) && (
            <div className="mb-6">
              <h3 className="font-bold text-xl text-gray-800 mb-4 flex items-center gap-2">
                <Timer className="w-5 h-5 text-orange-500" />
                Cooking Phases
              </h3>
              <div className="space-y-2">
                {recipe.timers.map((timer, index) => (
                  <div 
                    key={index}
                    className="flex items-center justify-between p-3 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-xl border border-emerald-200"
                  >
                    <div>
                      <span className="font-medium text-gray-800">{timer.label}</span>
                      <span className="text-sm text-gray-500 ml-2">({timer.minutes} min)</span>
                    </div>
                    <button
                      onClick={() => handleStartTimer(timer.label, timer.minutes)}
                      className="flex items-center gap-2 px-3 py-1.5 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors text-sm"
                    >
                      <Play className="w-4 h-4" />
                      Start
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {/* Timer Suggestion */}
          {recipe.cookTime > 0 && (
            <div className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-2xl p-4 border border-emerald-200">
              <h4 className="font-bold text-gray-800 mb-3">Quick Timer</h4>
              <button
                onClick={() => handleStartTimer('Cook', recipe.cookTime)}
                className="flex items-center gap-2 px-4 py-2 bg-emerald-500 text-white rounded-xl hover:bg-emerald-600 transition-colors"
              >
                <Play className="w-4 h-4" />
                Start {recipe.cookTime} minute timer
              </button>
            </div>
          )}
        </div>
        
        {/* Footer Actions */}
        <div className="flex-shrink-0 p-4 border-t bg-gray-50">
          <div className="flex items-center justify-between">
            {onToggleFavorite && (
              <button
                onClick={onToggleFavorite}
                className="flex items-center gap-2 px-4 py-2 rounded-xl hover:bg-orange-50 transition-colors"
              >
                {recipe.isFavorite ? (
                  <Star className="w-5 h-5 fill-amber-400 text-amber-400" />
                ) : (
                  <StarOff className="w-5 h-5 text-gray-400" />
                )}
                <span className="text-gray-600">{recipe.isFavorite ? 'Favorited' : 'Add to favorites'}</span>
              </button>
            )}
            
            {onCookNow && (
              <button
                onClick={onCookNow}
                className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-xl font-bold hover:from-emerald-600 hover:to-teal-600 transition-all shadow-lg hover:shadow-xl"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Cook Now
              </button>
            )}
            
            {recipe.isUserRecipe && (
              <div className="flex gap-2">
                {onEdit && (
                  <button
                    onClick={onEdit}
                    className="p-2 rounded-xl hover:bg-blue-50 text-blue-500 transition-colors"
                  >
                    <Edit className="w-5 h-5" />
                  </button>
                )}
                {onDelete && (
                  <button
                    onClick={onDelete}
                    className="p-2 rounded-xl hover:bg-red-50 text-red-500 transition-colors"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
