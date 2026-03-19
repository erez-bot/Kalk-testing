'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Recipe, RecipeContextType } from '@/types';
import { defaultRecipes } from '@/lib/recipes';
import { generateId } from '@/lib/utils';

const RECIPES_STORAGE_KEY = 'cooking-companion-recipes';

const RecipeContext = createContext<RecipeContextType | undefined>(undefined);

export function RecipeProvider({ children }: { children: ReactNode }) {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load recipes from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem(RECIPES_STORAGE_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        // Merge with default recipes (default recipes take precedence if not in user recipes)
        const userRecipes = parsed.filter((r: Recipe) => r.isUserRecipe);
        const allRecipes = [...defaultRecipes, ...userRecipes];
        setRecipes(allRecipes);
      } catch {
        setRecipes(defaultRecipes);
      }
    } else {
      setRecipes(defaultRecipes);
    }
    setIsLoaded(true);
  }, []);

  // Save to localStorage whenever recipes change
  useEffect(() => {
    if (isLoaded) {
      const userRecipes = recipes.filter(r => r.isUserRecipe);
      localStorage.setItem(RECIPES_STORAGE_KEY, JSON.stringify(userRecipes));
    }
  }, [recipes, isLoaded]);

  const addRecipe = (recipe: Omit<Recipe, 'id' | 'isUserRecipe'>) => {
    const newRecipe: Recipe = {
      ...recipe,
      id: generateId(),
      isUserRecipe: true,
    };
    setRecipes(prev => [...prev, newRecipe]);
  };

  const updateRecipe = (id: string, updates: Partial<Recipe>) => {
    setRecipes(prev => prev.map(r => 
      r.id === id ? { ...r, ...updates } : r
    ));
  };

  const deleteRecipe = (id: string) => {
    setRecipes(prev => prev.filter(r => r.id !== id));
  };

  const toggleFavorite = (id: string) => {
    setRecipes(prev => prev.map(r => 
      r.id === id ? { ...r, isFavorite: !r.isFavorite } : r
    ));
  };

  const updateServings = (id: string, servings: number) => {
    setRecipes(prev => prev.map(r => 
      r.id === id ? { ...r, lastUsedServings: servings } : r
    ));
  };

  const searchRecipes = (query: string): Recipe[] => {
    if (!query.trim()) return recipes;
    const lowerQuery = query.toLowerCase();
    return recipes.filter(r => 
      r.name.toLowerCase().includes(lowerQuery) ||
      r.ingredients.some(i => i.name.toLowerCase().includes(lowerQuery)) ||
      r.cuisine.toLowerCase().includes(lowerQuery)
    );
  };

  return (
    <RecipeContext.Provider value={{
      recipes,
      addRecipe,
      updateRecipe,
      deleteRecipe,
      toggleFavorite,
      updateServings,
      searchRecipes
    }}>
      {children}
    </RecipeContext.Provider>
  );
}

export function useRecipes() {
  const context = useContext(RecipeContext);
  if (context === undefined) {
    throw new Error('useRecipes must be used within a RecipeProvider');
  }
  return context;
}
