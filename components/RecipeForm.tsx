'use client';

import { useState, useRef, useCallback } from 'react';
import { X, Plus, Trash2, ChefHat, Clock, Utensils, Image, Upload, Timer } from 'lucide-react';
import { Recipe, Ingredient, RecipeTimer } from '@/types';

interface RecipeFormProps {
  recipe?: Recipe;
  onClose: () => void;
  onSubmit: (recipe: Omit<Recipe, 'id' | 'isUserRecipe'>) => void;
}

export default function RecipeForm({ recipe, onClose, onSubmit }: RecipeFormProps) {
  const [name, setName] = useState(recipe?.name || '');
  const [image, setImage] = useState(recipe?.image || '');
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [ingredients, setIngredients] = useState<Ingredient[]>(
    recipe?.ingredients || [{ name: '', amount: 1, unit: 'g' }]
  );
  const [instructions, setInstructions] = useState<string[]>(
    recipe?.instructions || ['']
  );
  const [prepTime, setPrepTime] = useState(recipe?.prepTime || 15);
  const [cookTime, setCookTime] = useState(recipe?.cookTime || 30);
  const [difficulty, setDifficulty] = useState<'Easy' | 'Medium' | 'Hard'>(
    recipe?.difficulty || 'Easy'
  );
  const [cuisine, setCuisine] = useState(recipe?.cuisine || '');
  const [baseServings, setBaseServings] = useState(recipe?.baseServings || 4);
  const [timers, setTimers] = useState<RecipeTimer[]>(
    recipe?.timers || []
  );

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleFile(files[0]);
    }
  }, []);

  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      handleFile(files[0]);
    }
  }, []);

  const handleFile = (file: File) => {
    if (file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {
          setImage(e.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddIngredient = () => {
    setIngredients([...ingredients, { name: '', amount: 1, unit: 'g' }]);
  };

  const handleRemoveIngredient = (index: number) => {
    setIngredients(ingredients.filter((_, i) => i !== index));
  };

  const handleIngredientChange = (index: number, field: keyof Ingredient, value: string | number) => {
    const newIngredients = [...ingredients];
    newIngredients[index] = { ...newIngredients[index], [field]: value };
    setIngredients(newIngredients);
  };

  const handleAddInstruction = () => {
    setInstructions([...instructions, '']);
  };

  const handleRemoveInstruction = (index: number) => {
    setInstructions(instructions.filter((_, i) => i !== index));
  };

  const handleInstructionChange = (index: number, value: string) => {
    const newInstructions = [...instructions];
    newInstructions[index] = value;
    setInstructions(newInstructions);
  };

  const handleAddTimer = () => {
    setTimers([...timers, { label: '', minutes: 5 }]);
  };

  const handleRemoveTimer = (index: number) => {
    setTimers(timers.filter((_, i) => i !== index));
  };

  const handleTimerChange = (index: number, field: keyof RecipeTimer, value: string | number) => {
    const newTimers = [...timers];
    newTimers[index] = { ...newTimers[index], [field]: value };
    setTimers(newTimers);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Filter out empty ingredients and instructions
    const validIngredients = ingredients.filter(i => i.name.trim());
    const validInstructions = instructions.filter(i => i.trim());
    const validTimers = timers.filter(t => t.label.trim());
    
    if (!name.trim() || validIngredients.length === 0 || validInstructions.length === 0) {
      return;
    }

    onSubmit({
      name: name.trim(),
      image: image.trim() || 'https://images.unsplash.com/photo-1495521821757-a1efb6729352?w=800&q=80',
      ingredients: validIngredients,
      instructions: validInstructions,
      prepTime,
      cookTime,
      difficulty,
      cuisine: cuisine.trim() || 'International',
      baseServings,
      isFavorite: recipe?.isFavorite || false,
      lastUsedServings: recipe?.lastUsedServings || baseServings,
      timers: validTimers.length > 0 ? validTimers : undefined,
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />
      
      <div className="relative w-full max-w-2xl max-h-[90vh] bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col">
        {/* Header */}
        <div className="bg-gradient-to-r from-orange-500 to-amber-500 p-6 flex-shrink-0">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-white/20 rounded-xl">
                <ChefHat className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-xl font-bold text-white">
                {recipe ? 'Edit Recipe' : 'Add New Recipe'}
              </h2>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-full bg-white/20 hover:bg-white/30 transition-colors"
            >
              <X className="w-5 h-5 text-white" />
            </button>
          </div>
        </div>
        
        {/* Form Content */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6">
          {/* Image Upload */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Recipe Image
            </label>
            <div
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className={`relative border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition-all ${
                isDragging 
                  ? 'border-orange-400 bg-orange-50' 
                  : 'border-gray-300 hover:border-orange-400 hover:bg-orange-50/50'
              } ${image ? 'border-emerald-400 bg-emerald-50' : ''}`}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileSelect}
                className="hidden"
              />
              {image ? (
                <div className="relative">
                  <img
                    src={image}
                    alt="Recipe preview"
                    className="max-h-48 mx-auto rounded-lg object-cover"
                  />
                  <p className="mt-2 text-sm text-emerald-600 font-medium">
                    ✓ Image uploaded - Click or drag to replace
                  </p>
                </div>
              ) : (
                <div className="flex flex-col items-center">
                  <Upload className="w-10 h-10 text-gray-400 mb-2" />
                  <p className="text-gray-600 font-medium">
                    Drag and drop an image here
                  </p>
                  <p className="text-gray-400 text-sm mt-1">
                    or click to browse
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Basic Info */}
          <div className="grid grid-cols-1 gap-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Recipe Name *
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                placeholder="e.g., Grandma's Apple Pie"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-orange-400 focus:ring-2 focus:ring-orange-100 outline-none transition-all"
              />
            </div>
          </div>

          {/* Time & Difficulty */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Prep Time (min)
              </label>
              <input
                type="number"
                min="0"
                value={prepTime}
                onChange={(e) => setPrepTime(parseInt(e.target.value) || 0)}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-orange-400 focus:ring-2 focus:ring-orange-100 outline-none transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Cook Time (min)
              </label>
              <input
                type="number"
                min="0"
                value={cookTime}
                onChange={(e) => setCookTime(parseInt(e.target.value) || 0)}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-orange-400 focus:ring-2 focus:ring-orange-100 outline-none transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Difficulty
              </label>
              <select
                value={difficulty}
                onChange={(e) => setDifficulty(e.target.value as 'Easy' | 'Medium' | 'Hard')}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-orange-400 focus:ring-2 focus:ring-orange-100 outline-none transition-all"
              >
                <option value="Easy">Easy</option>
                <option value="Medium">Medium</option>
                <option value="Hard">Hard</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Servings
              </label>
              <input
                type="number"
                min="1"
                max="12"
                value={baseServings}
                onChange={(e) => setBaseServings(parseInt(e.target.value) || 1)}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-orange-400 focus:ring-2 focus:ring-orange-100 outline-none transition-all"
              />
            </div>
          </div>

          {/* Cuisine */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Cuisine Type
            </label>
            <input
              type="text"
              value={cuisine}
              onChange={(e) => setCuisine(e.target.value)}
              placeholder="e.g., Italian, Mexican, Asian..."
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-orange-400 focus:ring-2 focus:ring-orange-100 outline-none transition-all"
            />
          </div>

          {/* Ingredients */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-3">
              <label className="text-sm font-medium text-gray-700">
                Ingredients *
              </label>
              <button
                type="button"
                onClick={handleAddIngredient}
                className="flex items-center gap-1 text-sm text-orange-600 hover:text-orange-700"
              >
                <Plus className="w-4 h-4" /> Add Ingredient
              </button>
            </div>
            <div className="space-y-2">
              {ingredients.map((ingredient, index) => (
                <div key={index} className="flex gap-2">
                  <input
                    type="number"
                    step="0.01"
                    min="0"
                    value={ingredient.amount}
                    onChange={(e) => handleIngredientChange(index, 'amount', parseFloat(e.target.value) || 0)}
                    className="w-24 px-3 py-2 rounded-xl border border-gray-200 focus:border-orange-400 focus:ring-2 focus:ring-orange-100 outline-none transition-all"
                    placeholder="Amount"
                  />
                  <input
                    type="text"
                    value={ingredient.unit}
                    onChange={(e) => handleIngredientChange(index, 'unit', e.target.value)}
                    className="w-24 px-3 py-2 rounded-xl border border-gray-200 focus:border-orange-400 focus:ring-2 focus:ring-orange-100 outline-none transition-all"
                    placeholder="Unit"
                  />
                  <input
                    type="text"
                    value={ingredient.name}
                    onChange={(e) => handleIngredientChange(index, 'name', e.target.value)}
                    className="flex-1 px-3 py-2 rounded-xl border border-gray-200 focus:border-orange-400 focus:ring-2 focus:ring-orange-100 outline-none transition-all"
                    placeholder="Ingredient name"
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveIngredient(index)}
                    className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Instructions */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-3">
              <label className="text-sm font-medium text-gray-700">
                Instructions *
              </label>
              <button
                type="button"
                onClick={handleAddInstruction}
                className="flex items-center gap-1 text-sm text-orange-600 hover:text-orange-700"
              >
                <Plus className="w-4 h-4" /> Add Step
              </button>
            </div>
            <div className="space-y-2">
              {instructions.map((instruction, index) => (
                <div key={index} className="flex gap-2">
                  <span className="flex-shrink-0 w-8 h-8 rounded-full bg-orange-100 text-orange-600 font-bold flex items-center justify-center text-sm">
                    {index + 1}
                  </span>
                  <textarea
                    value={instruction}
                    onChange={(e) => handleInstructionChange(index, e.target.value)}
                    rows={2}
                    className="flex-1 px-3 py-2 rounded-xl border border-gray-200 focus:border-orange-400 focus:ring-2 focus:ring-orange-100 outline-none transition-all resize-none"
                    placeholder={`Step ${index + 1}...`}
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveInstruction(index)}
                    className="p-2 text-gray-400 hover:text-red-500 transition-colors self-center"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Timers */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-3">
              <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                <Timer className="w-4 h-4" />
                Recipe Timers (optional)
              </label>
              <button
                type="button"
                onClick={handleAddTimer}
                className="flex items-center gap-1 text-sm text-orange-600 hover:text-orange-700"
              >
                <Plus className="w-4 h-4" /> Add Timer
              </button>
            </div>
            <div className="space-y-2">
              {timers.map((timer, index) => (
                <div key={index} className="flex gap-2 items-center">
                  <input
                    type="text"
                    value={timer.label}
                    onChange={(e) => handleTimerChange(index, 'label', e.target.value)}
                    className="flex-1 px-3 py-2 rounded-xl border border-gray-200 focus:border-orange-400 focus:ring-2 focus:ring-orange-100 outline-none transition-all"
                    placeholder="Timer label (e.g., Boil Water)"
                  />
                  <input
                    type="number"
                    min="1"
                    value={timer.minutes}
                    onChange={(e) => handleTimerChange(index, 'minutes', parseInt(e.target.value) || 1)}
                    className="w-24 px-3 py-2 rounded-xl border border-gray-200 focus:border-orange-400 focus:ring-2 focus:ring-orange-100 outline-none transition-all"
                    placeholder="Minutes"
                  />
                  <span className="text-gray-500 text-sm">min</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveTimer(index)}
                    className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              ))}
              {timers.length === 0 && (
                <p className="text-gray-400 text-sm italic">
                  Add timers to help users track different cooking phases
                </p>
              )}
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-4 bg-gradient-to-r from-orange-500 to-amber-500 text-white rounded-xl font-bold text-lg hover:from-orange-600 hover:to-amber-600 transition-all shadow-lg hover:shadow-xl"
          >
            {recipe ? 'Save Changes' : 'Create Recipe'}
          </button>
        </form>
      </div>
    </div>
  );
}
