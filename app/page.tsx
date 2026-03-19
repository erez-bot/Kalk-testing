'use client';

import { useState, useMemo, useEffect } from 'react';
import { Search, Plus, Timer, ChefHat, Clock, BookOpen, Play } from 'lucide-react';
import Navigation from '@/components/Navigation';
import RecipeCard from '@/components/RecipeCard';
import RecipeModal from '@/components/RecipeModal';
import RecipeForm from '@/components/RecipeForm';
import TimerCard from '@/components/TimerCard';
import AddTimerModal from '@/components/AddTimerModal';
import CookingMode from '@/components/CookingMode';
import { useRecipes } from '@/contexts/RecipeContext';
import { useTimers } from '@/contexts/TimerContext';
import { Recipe } from '@/types';

const ACTIVE_RECIPE_KEY = 'cooking-active-recipe';

export default function Home() {
  const [activeTab, setActiveTab] = useState<'recipes' | 'timers' | 'myRecipes' | 'cookingFlow'>('recipes');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const [showAddRecipe, setShowAddRecipe] = useState(false);
  const [editingRecipe, setEditingRecipe] = useState<Recipe | null>(null);
  const [showAddTimer, setShowAddTimer] = useState(false);
  const [timerNotification, setTimerNotification] = useState<string | null>(null);
  const [cookingRecipe, setCookingRecipe] = useState<Recipe | null>(null);
  const [cookingServings, setCookingServings] = useState(4);
  
  const { recipes, addRecipe, updateRecipe, deleteRecipe, toggleFavorite, updateServings } = useRecipes();
  const { timers, addTimer, removeTimer, startTimer, pauseTimer, resetTimer, addOneMinute } = useTimers();

  // Load active cooking session from localStorage
  useEffect(() => {
    const saved = localStorage.getItem(ACTIVE_RECIPE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        // Find the recipe in current recipes
        const found = recipes.find(r => r.id === parsed.id);
        if (found) {
          setCookingRecipe(found);
          setCookingServings(parsed.servings || found.baseServings);
        }
      } catch {
        // ignore
      }
    }
  }, [recipes]);

  // Save active cooking session
  useEffect(() => {
    if (cookingRecipe) {
      localStorage.setItem(ACTIVE_RECIPE_KEY, JSON.stringify({
        id: cookingRecipe.id,
        servings: cookingServings
      }));
    } else {
      localStorage.removeItem(ACTIVE_RECIPE_KEY);
    }
  }, [cookingRecipe, cookingServings]);

  // Filter default recipes
  const defaultRecipes = useMemo(() => {
    return recipes.filter(r => !r.isUserRecipe);
  }, [recipes]);

  // Filter user recipes
  const userRecipes = useMemo(() => {
    return recipes.filter(r => r.isUserRecipe);
  }, [recipes]);

  // Filter and sort recipes for main tab
  const filteredRecipes = useMemo(() => {
    let result = defaultRecipes;
    
    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = result.filter(r => 
        r.name.toLowerCase().includes(query) ||
        r.ingredients.some(i => i.name.toLowerCase().includes(query)) ||
        r.cuisine.toLowerCase().includes(query)
      );
    }
    
    // Sort: favorites first, then recently used
    return result.sort((a, b) => {
      if (a.isFavorite && !b.isFavorite) return -1;
      if (!a.isFavorite && b.isFavorite) return 1;
      if (a.lastUsedServings && !b.lastUsedServings) return -1;
      if (!a.lastUsedServings && b.lastUsedServings) return 1;
      return 0;
    });
  }, [defaultRecipes, searchQuery]);

  // Filter and sort my recipes
  const filteredMyRecipes = useMemo(() => {
    let result = userRecipes;
    
    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = result.filter(r => 
        r.name.toLowerCase().includes(query) ||
        r.ingredients.some(i => i.name.toLowerCase().includes(query)) ||
        r.cuisine.toLowerCase().includes(query)
      );
    }
    
    // Sort: favorites first, then recently used
    return result.sort((a, b) => {
      if (a.isFavorite && !b.isFavorite) return -1;
      if (!a.isFavorite && b.isFavorite) return 1;
      if (a.lastUsedServings && !b.lastUsedServings) return -1;
      if (!a.lastUsedServings && b.lastUsedServings) return 1;
      return 0;
    });
  }, [userRecipes, searchQuery]);

  const runningTimersCount = timers.filter(t => t.isRunning).length;

  const handleAddRecipe = (recipeData: Omit<Recipe, 'id' | 'isUserRecipe'>) => {
    addRecipe(recipeData);
    setShowAddRecipe(false);
  };

  const handleUpdateRecipe = (recipeData: Omit<Recipe, 'id' | 'isUserRecipe'>) => {
    if (editingRecipe) {
      updateRecipe(editingRecipe.id, recipeData);
      setEditingRecipe(null);
    }
  };

  const handleDeleteRecipe = (id: string) => {
    if (confirm('Are you sure you want to delete this recipe?')) {
      deleteRecipe(id);
      setSelectedRecipe(null);
    }
  };

  const handleStartTimer = (label: string) => {
    setTimerNotification(`⏱ ${label} timer started`);
    setTimeout(() => setTimerNotification(null), 3000);
  };

  return (
    <div className="min-h-screen bg-[#fffaf5]">
      <Navigation 
        activeTab={activeTab} 
        onTabChange={setActiveTab}
        runningTimersCount={runningTimersCount}
        hasActiveCookingSession={!!cookingRecipe}
      />

      {/* Timer Notification */}
      {timerNotification && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 animate-bounce">
          <div className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-6 py-3 rounded-full shadow-lg font-medium">
            {timerNotification}
          </div>
        </div>
      )}

      {/* Cooking Mode Overlay */}
      {cookingRecipe && (
        <CookingMode
          recipe={cookingRecipe}
          servings={cookingServings}
          onExit={() => {
            setCookingRecipe(null);
            setActiveTab('recipes');
          }}
          onUpdateServings={(servings) => setCookingServings(servings)}
        />
      )}
      
      <main className="pt-20 pb-8">
        {activeTab === 'recipes' && (
          <div className="max-w-6xl mx-auto px-4">
            {/* Header */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
              <div>
                <h1 className="text-3xl font-bold text-gray-800">Recipes</h1>
                <p className="text-gray-500 mt-1">{defaultRecipes.length} recipes available</p>
              </div>
              <button
                onClick={() => setShowAddRecipe(true)}
                className="flex items-center gap-2 px-5 py-3 bg-gradient-to-r from-orange-500 to-amber-500 text-white rounded-xl font-semibold hover:from-orange-600 hover:to-amber-600 transition-all shadow-lg hover:shadow-xl"
              >
                <Plus className="w-5 h-5" />
                Add Recipe
              </button>
            </div>
            
            {/* Search Bar */}
            <div className="relative mb-8">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search recipes by name, ingredient, or cuisine..."
                className="w-full pl-12 pr-4 py-4 bg-white rounded-2xl border border-orange-100 focus:border-orange-400 focus:ring-4 focus:ring-orange-100 outline-none transition-all text-gray-700 placeholder-gray-400"
              />
            </div>
            
            {/* Recipe Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredRecipes.map(recipe => (
                <RecipeCard
                  key={recipe.id}
                  recipe={recipe}
                  onClick={() => setSelectedRecipe(recipe)}
                  onToggleFavorite={(e) => {
                    e.stopPropagation();
                    toggleFavorite(recipe.id);
                  }}
                />
              ))}
            </div>
            
            {filteredRecipes.length === 0 && (
              <div className="text-center py-16">
                <div className="w-20 h-20 mx-auto mb-4 bg-orange-100 rounded-full flex items-center justify-center">
                  <ChefHat className="w-10 h-10 text-orange-400" />
                </div>
                <h3 className="text-xl font-bold text-gray-700 mb-2">No recipes found</h3>
                <p className="text-gray-500">Try adjusting your search or add a new recipe</p>
              </div>
            )}
          </div>
        )}

        {activeTab === 'myRecipes' && (
          <div className="max-w-6xl mx-auto px-4">
            {/* Header */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
              <div>
                <h1 className="text-3xl font-bold text-gray-800">My Recipes</h1>
                <p className="text-gray-500 mt-1">{userRecipes.length} your recipes</p>
              </div>
              <button
                onClick={() => setShowAddRecipe(true)}
                className="flex items-center gap-2 px-5 py-3 bg-gradient-to-r from-orange-500 to-amber-500 text-white rounded-xl font-semibold hover:from-orange-600 hover:to-amber-600 transition-all shadow-lg hover:shadow-xl"
              >
                <Plus className="w-5 h-5" />
                Add Recipe
              </button>
            </div>
            
            {/* Search Bar */}
            <div className="relative mb-8">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search your recipes..."
                className="w-full pl-12 pr-4 py-4 bg-white rounded-2xl border border-orange-100 focus:border-orange-400 focus:ring-4 focus:ring-orange-100 outline-none transition-all text-gray-700 placeholder-gray-400"
              />
            </div>
            
            {/* My Recipes Grid */}
            {userRecipes.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredMyRecipes.map(recipe => (
                  <RecipeCard
                    key={recipe.id}
                    recipe={recipe}
                    onClick={() => setSelectedRecipe(recipe)}
                    onToggleFavorite={(e) => {
                      e.stopPropagation();
                      toggleFavorite(recipe.id);
                    }}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <div className="w-20 h-20 mx-auto mb-4 bg-amber-100 rounded-full flex items-center justify-center">
                  <BookOpen className="w-10 h-10 text-amber-400" />
                </div>
                <h3 className="text-xl font-bold text-gray-700 mb-2">No personal recipes yet</h3>
                <p className="text-gray-500 mb-6">Create your first recipe!</p>
                <button
                  onClick={() => setShowAddRecipe(true)}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-orange-500 to-amber-500 text-white rounded-xl font-semibold hover:from-orange-600 hover:to-amber-600 transition-all shadow-lg"
                >
                  <Plus className="w-5 h-5" />
                  Create Recipe
                </button>
              </div>
            )}
          </div>
        )}

        {/* Cooking Flow Tab */}
        {activeTab === 'cookingFlow' && (
          <div className="max-w-4xl mx-auto px-4">
            <div className="text-center py-16">
              {cookingRecipe ? (
                <div>
                  <div className="w-24 h-24 mx-auto mb-6 rounded-2xl overflow-hidden shadow-xl">
                    <img
                      src={cookingRecipe.image}
                      alt={cookingRecipe.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1495521821757-a1efb6729352?w=800&q=80';
                      }}
                    />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-800 mb-2">{cookingRecipe.name}</h2>
                  <p className="text-gray-500 mb-6">{cookingServings} servings</p>
                  <button
                    onClick={() => setActiveTab('recipes')}
                    className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-xl font-bold hover:from-emerald-600 hover:to-teal-600 transition-all shadow-lg"
                  >
                    <Play className="w-5 h-5" />
                    Continue Cooking
                  </button>
                  <button
                    onClick={() => {
                      setCookingRecipe(null);
                      localStorage.removeItem(ACTIVE_RECIPE_KEY);
                    }}
                    className="block mx-auto mt-4 text-gray-500 hover:text-red-500 text-sm"
                  >
                    End Cooking Session
                  </button>
                </div>
              ) : (
                <div>
                  <div className="w-20 h-20 mx-auto mb-4 bg-orange-100 rounded-full flex items-center justify-center">
                    <ChefHat className="w-10 h-10 text-orange-400" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-700 mb-2">Pick a recipe to start cooking</h3>
                  <p className="text-gray-500">Select a recipe and press Cook Now to begin your cooking session</p>
                </div>
              )}
            </div>
          </div>
        )}
        
        {activeTab === 'timers' && (
          <div className="max-w-4xl mx-auto px-4">
            {/* Header */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
              <div>
                <h1 className="text-3xl font-bold text-gray-800">Kitchen Timers</h1>
                <p className="text-gray-500 mt-1">
                  {timers.length} timer{timers.length !== 1 ? 's' : ''} • {runningTimersCount} running
                </p>
              </div>
              <button
                onClick={() => setShowAddTimer(true)}
                className="flex items-center gap-2 px-5 py-3 bg-gradient-to-r from-orange-500 to-amber-500 text-white rounded-xl font-semibold hover:from-orange-600 hover:to-amber-600 transition-all shadow-lg hover:shadow-xl"
              >
                <Plus className="w-5 h-5" />
                Add Timer
              </button>
            </div>
            
            {/* Timers Grid */}
            {timers.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {timers.map(timer => (
                  <TimerCard
                    key={timer.id}
                    timer={timer}
                    onStart={() => {
                      startTimer(timer.id);
                      handleStartTimer(timer.label);
                    }}
                    onPause={() => pauseTimer(timer.id)}
                    onReset={() => resetTimer(timer.id)}
                    onAddMinute={() => addOneMinute(timer.id)}
                    onRemove={() => removeTimer(timer.id)}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <div className="w-20 h-20 mx-auto mb-4 bg-emerald-100 rounded-full flex items-center justify-center">
                  <Timer className="w-10 h-10 text-emerald-400" />
                </div>
                <h3 className="text-xl font-bold text-gray-700 mb-2">No active timers</h3>
                <p className="text-gray-500 mb-6">Create a timer to help you keep track of cooking</p>
                <button
                  onClick={() => setShowAddTimer(true)}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-orange-500 to-amber-500 text-white rounded-xl font-semibold hover:from-orange-600 hover:to-amber-600 transition-all shadow-lg"
                >
                  <Plus className="w-5 h-5" />
                  Create Your First Timer
                </button>
              </div>
            )}
          </div>
        )}
      </main>
      
      {/* Modals */}
      {selectedRecipe && (
        <RecipeModal
          recipe={selectedRecipe}
          onClose={() => setSelectedRecipe(null)}
          onToggleFavorite={() => toggleFavorite(selectedRecipe.id)}
          onEdit={() => {
            setEditingRecipe(selectedRecipe);
            setSelectedRecipe(null);
          }}
          onDelete={selectedRecipe.isUserRecipe ? () => handleDeleteRecipe(selectedRecipe.id) : undefined}
          onUpdateServings={(servings) => updateServings(selectedRecipe.id, servings)}
          onTimerStart={(label) => handleStartTimer(label)}
          onCookNow={() => {
            setCookingRecipe(selectedRecipe);
            setCookingServings(selectedRecipe.lastUsedServings || selectedRecipe.baseServings);
            setSelectedRecipe(null);
            setActiveTab('cookingFlow');
          }}
        />
      )}
      
      {showAddRecipe && (
        <RecipeForm
          onClose={() => setShowAddRecipe(false)}
          onSubmit={handleAddRecipe}
        />
      )}
      
      {editingRecipe && (
        <RecipeForm
          recipe={editingRecipe}
          onClose={() => setEditingRecipe(null)}
          onSubmit={handleUpdateRecipe}
        />
      )}
      
      {showAddTimer && (
        <AddTimerModal
          onClose={() => setShowAddTimer(false)}
          onAdd={addTimer}
        />
      )}
    </div>
  );
}
