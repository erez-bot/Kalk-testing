import { Recipe } from '@/types';

export const defaultRecipes: Recipe[] = [
  {
    id: '1',
    name: 'Spaghetti Carbonara',
    image: 'https://images.unsplash.com/photo-1612874742237-6526221588e3?w=800&q=80',
    ingredients: [
      { name: 'spaghetti', amount: 400, unit: 'g' },
      { name: 'guanciale or pancetta', amount: 200, unit: 'g' },
      { name: 'egg yolks', amount: 6, unit: '' },
      { name: 'Pecorino Romano', amount: 100, unit: 'g' },
      { name: 'black pepper', amount: 2, unit: 'tsp' },
      { name: 'salt', amount: 1, unit: 'tbsp' }
    ],
    instructions: [
      'Bring a large pot of salted water to boil and cook spaghetti according to package directions.',
      'While pasta cooks, cut guanciale into small strips and cook in a large pan over medium heat until crispy.',
      'In a bowl, whisk egg yolks with grated Pecorino and plenty of black pepper.',
      'When pasta is al dente, reserve 1 cup pasta water and drain.',
      'Remove pan from heat, add hot pasta to the guanciale.',
      'Quickly stir in egg mixture, adding pasta water as needed for creamy consistency.',
      'Serve immediately with extra Pecorino and black pepper.'
    ],
    prepTime: 15,
    cookTime: 20,
    difficulty: 'Medium',
    cuisine: 'Italian',
    baseServings: 4,
    timers: [
      { label: 'Boil Water', minutes: 10 },
      { label: 'Cook Pasta', minutes: 12 },
      { label: 'Make Sauce', minutes: 5 }
    ]
  },
  {
    id: '2',
    name: 'Chocolate Chip Cookies',
    image: 'https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=800&q=80',
    ingredients: [
      { name: 'all-purpose flour', amount: 280, unit: 'g' },
      { name: 'butter (softened)', amount: 230, unit: 'g' },
      { name: 'brown sugar', amount: 200, unit: 'g' },
      { name: 'granulated sugar', amount: 100, unit: 'g' },
      { name: 'eggs', amount: 2, unit: '' },
      { name: 'vanilla extract', amount: 1, unit: 'tsp' },
      { name: 'baking soda', amount: 1, unit: 'tsp' },
      { name: 'salt', amount: 1, unit: 'tsp' },
      { name: 'chocolate chips', amount: 340, unit: 'g' }
    ],
    instructions: [
      'Preheat oven to 375°F (190°C).',
      'Cream butter and sugars until light and fluffy.',
      'Beat in eggs one at a time, then add vanilla.',
      'Mix flour, baking soda, and salt in separate bowl.',
      'Gradually add dry ingredients to wet mixture.',
      'Fold in chocolate chips.',
      'Drop rounded tablespoons onto ungreased baking sheets.',
      'Bake 9-11 minutes until golden brown. Cool on baking sheet 2 minutes.'
    ],
    prepTime: 15,
    cookTime: 11,
    difficulty: 'Easy',
    cuisine: 'American',
    baseServings: 24
  },
  {
    id: '3',
    name: 'Classic Marinara Sauce',
    image: 'https://images.unsplash.com/photo-1572449043416-55f4685c9bb7?w=800&q=80',
    ingredients: [
      { name: 'canned whole tomatoes', amount: 800, unit: 'g' },
      { name: 'olive oil', amount: 3, unit: 'tbsp' },
      { name: 'garlic cloves', amount: 4, unit: '' },
      { name: 'fresh basil leaves', amount: 15, unit: '' },
      { name: 'dried oregano', amount: 1, unit: 'tsp' },
      { name: 'salt', amount: 1, unit: 'tsp' },
      { name: 'sugar', amount: 1, unit: 'tsp' },
      { name: 'red pepper flakes', amount: 0.5, unit: 'tsp' }
    ],
    instructions: [
      'Heat olive oil in a large saucepan over medium heat.',
      'Add minced garlic and cook until fragrant, about 1 minute.',
      'Add crushed tomatoes, breaking them up with a wooden spoon.',
      'Stir in oregano, salt, sugar, and red pepper flakes.',
      'Reduce heat to low and simmer for 30-45 minutes, stirring occasionally.',
      'Add fresh basil leaves in the last 5 minutes of cooking.',
      'Season to taste and serve over pasta.'
    ],
    prepTime: 5,
    cookTime: 45,
    difficulty: 'Easy',
    cuisine: 'Italian',
    baseServings: 6
  },
  {
    id: '4',
    name: 'Chicken Stir Fry',
    image: 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=800&q=80',
    ingredients: [
      { name: 'chicken breast', amount: 500, unit: 'g' },
      { name: 'broccoli florets', amount: 200, unit: 'g' },
      { name: 'bell peppers', amount: 2, unit: '' },
      { name: 'soy sauce', amount: 3, unit: 'tbsp' },
      { name: 'sesame oil', amount: 2, unit: 'tbsp' },
      { name: 'garlic', amount: 3, unit: 'cloves' },
      { name: 'ginger (fresh)', amount: 1, unit: 'tbsp' },
      { name: 'cornstarch', amount: 1, unit: 'tbsp' },
      { name: 'vegetable oil', amount: 2, unit: 'tbsp' }
    ],
    instructions: [
      'Slice chicken into thin strips and toss with 1 tbsp soy sauce and cornstarch.',
      'Heat vegetable oil in a wok over high heat.',
      'Stir-fry chicken until golden, about 4 minutes. Remove and set aside.',
      'Add more oil, then stir-fry garlic and ginger for 30 seconds.',
      'Add broccoli and bell peppers, stir-fry for 3-4 minutes.',
      'Return chicken to wok, add remaining soy sauce and sesame oil.',
      'Toss everything together and serve over rice.'
    ],
    prepTime: 15,
    cookTime: 15,
    difficulty: 'Easy',
    cuisine: 'Asian',
    baseServings: 4
  },
  {
    id: '5',
    name: 'Banana Bread',
    image: 'https://images.unsplash.com/photo-1605286978633-2dec93ff88a2?w=800&q=80',
    ingredients: [
      { name: 'ripe bananas', amount: 3, unit: '' },
      { name: 'all-purpose flour', amount: 190, unit: 'g' },
      { name: 'sugar', amount: 150, unit: 'g' },
      { name: 'butter (melted)', amount: 85, unit: 'g' },
      { name: 'egg', amount: 1, unit: '' },
      { name: 'baking soda', amount: 1, unit: 'tsp' },
      { name: 'salt', amount: 0.25, unit: 'tsp' },
      { name: 'vanilla extract', amount: 1, unit: 'tsp' },
      { name: 'walnuts (optional)', amount: 60, unit: 'g' }
    ],
    instructions: [
      'Preheat oven to 350°F (175°C). Grease a 9x5 inch loaf pan.',
      'Mash bananas in a large bowl.',
      'Stir in melted butter, sugar, egg, and vanilla.',
      'Mix in baking soda and salt, then add flour.',
      'Fold in walnuts if using.',
      'Pour batter into prepared pan.',
      'Bake for 60-65 minutes until a toothpick inserted in center comes out clean.',
      'Cool in pan 10 minutes, then remove to wire rack.'
    ],
    prepTime: 10,
    cookTime: 65,
    difficulty: 'Easy',
    cuisine: 'American',
    baseServings: 10
  },
  {
    id: '6',
    name: 'Caesar Salad Dressing',
    image: 'https://images.unsplash.com/photo-1550304943-4f24f54ddde9?w=800&q=80',
    ingredients: [
      { name: 'egg yolks', amount: 2, unit: '' },
      { name: 'garlic cloves', amount: 2, unit: '' },
      { name: 'anchovy fillets', amount: 4, unit: '' },
      { name: 'Dijon mustard', amount: 1, unit: 'tsp' },
      { name: 'lemon juice', amount: 2, unit: 'tbsp' },
      { name: 'Worcestershire sauce', amount: 1, unit: 'tsp' },
      { name: 'olive oil', amount: 120, unit: 'ml' },
      { name: 'Parmesan cheese', amount: 50, unit: 'g' },
      { name: 'black pepper', amount: 0.5, unit: 'tsp' }
    ],
    instructions: [
      'Combine egg yolks, garlic, anchovies, mustard, lemon juice, and Worcestershire in a food processor.',
      'Blend until smooth.',
      'With processor running, slowly drizzle in olive oil until emulsified.',
      'Add grated Parmesan and black pepper.',
      'Taste and adjust seasoning.',
      'Store in refrigerator for up to 1 week.',
      'Toss with romaine lettuce and croutons before serving.'
    ],
    prepTime: 15,
    cookTime: 0,
    difficulty: 'Medium',
    cuisine: 'American',
    baseServings: 8
  },
  {
    id: '7',
    name: 'Beef Tacos',
    image: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=800&q=80',
    ingredients: [
      { name: 'ground beef', amount: 500, unit: 'g' },
      { name: 'taco shells', amount: 8, unit: '' },
      { name: 'onion', amount: 1, unit: '' },
      { name: 'tomatoes', amount: 2, unit: '' },
      { name: 'lettuce', amount: 100, unit: 'g' },
      { name: 'Cheddar cheese', amount: 100, unit: 'g' },
      { name: 'sour cream', amount: 100, unit: 'g' },
      { name: 'taco seasoning', amount: 2, unit: 'tbsp' },
      { name: 'salsa', amount: 100, unit: 'ml' }
    ],
    instructions: [
      'Brown ground beef in a skillet over medium-high heat.',
      'Add diced onion and cook until softened.',
      'Stir in taco seasoning and 1/2 cup water. Simmer 5 minutes.',
      'Warm taco shells according to package directions.',
      'Shred lettuce, dice tomatoes, and grate cheese.',
      'Fill shells with seasoned beef.',
      'Top with lettuce, tomatoes, cheese, sour cream, and salsa.'
    ],
    prepTime: 15,
    cookTime: 15,
    difficulty: 'Easy',
    cuisine: 'Mexican',
    baseServings: 4
  },
  {
    id: '8',
    name: 'Pancakes',
    image: 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=800&q=80',
    ingredients: [
      { name: 'all-purpose flour', amount: 190, unit: 'g' },
      { name: 'milk', amount: 240, unit: 'ml' },
      { name: 'egg', amount: 1, unit: '' },
      { name: 'butter (melted)', amount: 30, unit: 'g' },
      { name: 'sugar', amount: 2, unit: 'tbsp' },
      { name: 'baking powder', amount: 2, unit: 'tsp' },
      { name: 'salt', amount: 0.5, unit: 'tsp' },
      { name: 'vanilla extract', amount: 1, unit: 'tsp' }
    ],
    instructions: [
      'Whisk flour, sugar, baking powder, and salt in a large bowl.',
      'In another bowl, mix milk, egg, melted butter, and vanilla.',
      'Pour wet ingredients into dry and stir until just combined (lumps are okay).',
      'Heat a griddle or pan over medium heat and lightly grease.',
      'Pour 1/4 cup batter for each pancake.',
      'Cook until bubbles form on surface, then flip and cook 1-2 minutes more.',
      'Serve warm with maple syrup, butter, and fresh berries.'
    ],
    prepTime: 5,
    cookTime: 15,
    difficulty: 'Easy',
    cuisine: 'American',
    baseServings: 8
  },
  {
    id: '9',
    name: 'Tomato Soup',
    image: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=800&q=80',
    ingredients: [
      { name: 'canned crushed tomatoes', amount: 800, unit: 'g' },
      { name: 'onion', amount: 1, unit: '' },
      { name: 'garlic cloves', amount: 3, unit: '' },
      { name: 'vegetable broth', amount: 500, unit: 'ml' },
      { name: 'heavy cream', amount: 120, unit: 'ml' },
      { name: 'olive oil', amount: 2, unit: 'tbsp' },
      { name: 'dried basil', amount: 1, unit: 'tsp' },
      { name: 'sugar', amount: 1, unit: 'tsp' },
      { name: 'salt and pepper', amount: 1, unit: 'to taste' }
    ],
    instructions: [
      'Heat olive oil in a large pot over medium heat.',
      'Sauté diced onion until soft, about 5 minutes.',
      'Add minced garlic and cook 1 minute more.',
      'Add crushed tomatoes, vegetable broth, basil, and sugar.',
      'Bring to a boil, then reduce heat and simmer 20 minutes.',
      'Use an immersion blender to puree until smooth.',
      'Stir in heavy cream and season with salt and pepper.',
      'Serve with crusty bread or a grilled cheese sandwich.'
    ],
    prepTime: 10,
    cookTime: 30,
    difficulty: 'Easy',
    cuisine: 'American',
    baseServings: 6
  },
  {
    id: '10',
    name: 'Guacamole',
    image: 'https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?w=800&q=80',
    ingredients: [
      { name: 'ripe avocados', amount: 3, unit: '' },
      { name: 'lime juice', amount: 2, unit: 'tbsp' },
      { name: 'red onion', amount: 0.25, unit: 'cup' },
      { name: 'cilantro (fresh)', amount: 2, unit: 'tbsp' },
      { name: 'jalapeño', amount: 1, unit: '' },
      { name: 'tomato', amount: 1, unit: '' },
      { name: 'garlic', amount: 1, unit: 'clove' },
      { name: 'salt', amount: 0.5, unit: 'tsp' }
    ],
    instructions: [
      'Cut avocados in half, remove pit, and scoop into a bowl.',
      'Mash avocados with a fork to desired consistency.',
      'Add lime juice and salt immediately to prevent browning.',
      'Finely dice onion, tomato, and jalapeño (remove seeds for less heat).',
      'Mince garlic and chop cilantro.',
      'Add all ingredients to avocado and mix gently.',
      'Taste and adjust seasoning.',
      'Serve immediately with tortilla chips.'
    ],
    prepTime: 15,
    cookTime: 0,
    difficulty: 'Easy',
    cuisine: 'Mexican',
    baseServings: 6
  },
  {
    id: '11',
    name: 'Chicken Alfredo Pasta',
    image: 'https://images.unsplash.com/photo-1645112411341-6c4fd023714a?w=800&q=80',
    ingredients: [
      { name: 'fettuccine pasta', amount: 400, unit: 'g' },
      { name: 'chicken breast', amount: 500, unit: 'g' },
      { name: 'heavy cream', amount: 240, unit: 'ml' },
      { name: 'Parmesan cheese', amount: 100, unit: 'g' },
      { name: 'butter', amount: 60, unit: 'g' },
      { name: 'garlic cloves', amount: 4, unit: '' },
      { name: 'Italian seasoning', amount: 1, unit: 'tsp' },
      { name: 'salt', amount: 1, unit: 'tsp' },
      { name: 'black pepper', amount: 0.5, unit: 'tsp' },
      { name: 'parsley (fresh)', amount: 2, unit: 'tbsp' }
    ],
    instructions: [
      'Cook fettuccine according to package directions until al dente.',
      'Season chicken breasts with Italian seasoning, salt, and pepper.',
      'Heat butter in a large skillet over medium-high heat.',
      'Cook chicken 6-7 minutes per side until golden and cooked through. Set aside.',
      'In the same pan, add minced garlic and cook for 1 minute.',
      'Pour in heavy cream and bring to a simmer.',
      'Add grated Parmesan and stir until melted and sauce is smooth.',
      'Slice cooked chicken and add to the sauce.',
      'Toss in cooked pasta and mix until well coated.',
      'Garnish with fresh parsley and extra Parmesan.'
    ],
    prepTime: 10,
    cookTime: 25,
    difficulty: 'Medium',
    cuisine: 'Italian',
    baseServings: 4
  },
  {
    id: '12',
    name: 'Greek Salad',
    image: 'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=800&q=80',
    ingredients: [
      { name: 'cucumber', amount: 1, unit: 'large' },
      { name: 'tomatoes', amount: 3, unit: 'medium' },
      { name: 'red onion', amount: 0.5, unit: '' },
      { name: 'Kalamata olives', amount: 100, unit: 'g' },
      { name: 'feta cheese', amount: 150, unit: 'g' },
      { name: 'extra virgin olive oil', amount: 4, unit: 'tbsp' },
      { name: 'red wine vinegar', amount: 2, unit: 'tbsp' },
      { name: 'dried oregano', amount: 1, unit: 'tsp' },
      { name: 'salt', amount: 0.5, unit: 'tsp' },
      { name: 'pepper', amount: 0.25, unit: 'tsp' }
    ],
    instructions: [
      'Cut cucumber into half-moons and tomatoes into wedges.',
      'Thinly slice red onion into rings.',
      'Combine vegetables in a large bowl with olives.',
      'Crumble feta cheese over the top.',
      'Whisk olive oil, red wine vinegar, oregano, salt, and pepper.',
      'Drizzle dressing over salad and toss gently.',
      'Serve immediately or refrigerate for 30 minutes to let flavors meld.'
    ],
    prepTime: 15,
    cookTime: 0,
    difficulty: 'Easy',
    cuisine: 'Greek',
    baseServings: 4
  },
  {
    id: '13',
    name: 'Omelette',
    image: 'https://images.unsplash.com/photo-1510693206972-df098062cb71?w=800&q=80',
    ingredients: [
      { name: 'eggs', amount: 3, unit: '' },
      { name: 'butter', amount: 1, unit: 'tbsp' },
      { name: 'cheddar cheese', amount: 30, unit: 'g' },
      { name: 'ham', amount: 30, unit: 'g' },
      { name: 'bell pepper', amount: 0.25, unit: '' },
      { name: 'onion', amount: 2, unit: 'tbsp' },
      { name: 'milk', amount: 1, unit: 'tbsp' },
      { name: 'salt', amount: 0.25, unit: 'tsp' },
      { name: 'pepper', amount: 0.125, unit: 'tsp' }
    ],
    instructions: [
      'Beat eggs with milk, salt, and pepper in a bowl.',
      'Dice ham, bell pepper, and onion into small pieces.',
      'Melt butter in a non-stick pan over medium-low heat.',
      'Pour in egg mixture and let it set for 30 seconds.',
      'Add fillings to one half of the omelette.',
      'Cook until edges are set but center is still slightly wet.',
      'Fold omelette in half and slide onto plate.',
      'Top with grated cheese and serve immediately.'
    ],
    prepTime: 5,
    cookTime: 5,
    difficulty: 'Easy',
    cuisine: 'French',
    baseServings: 1
  },
  {
    id: '14',
    name: 'Garlic Butter Shrimp',
    image: 'https://images.unsplash.com/photo-1625943553852-781c6dd46faa?w=800&q=80',
    ingredients: [
      { name: 'large shrimp', amount: 450, unit: 'g' },
      { name: 'butter', amount: 60, unit: 'g' },
      { name: 'garlic cloves', amount: 6, unit: '' },
      { name: 'white wine', amount: 60, unit: 'ml' },
      { name: 'lemon juice', amount: 2, unit: 'tbsp' },
      { name: 'parsley (fresh)', amount: 3, unit: 'tbsp' },
      { name: 'red pepper flakes', amount: 0.25, unit: 'tsp' },
      { name: 'salt', amount: 0.5, unit: 'tsp' },
      { name: 'black pepper', amount: 0.25, unit: 'tsp' }
    ],
    instructions: [
      'Peel and devein shrimp, pat dry with paper towels.',
      'Season shrimp with salt and pepper.',
      'Melt butter in a large skillet over medium-high heat.',
      'Add minced garlic and red pepper flakes, cook for 30 seconds.',
      'Add shrimp in a single layer, cook 2 minutes per side.',
      'Pour in white wine and lemon juice, simmer for 1 minute.',
      'Sprinkle with fresh parsley and toss to coat.',
      'Serve immediately over rice or with crusty bread.'
    ],
    prepTime: 10,
    cookTime: 8,
    difficulty: 'Easy',
    cuisine: 'American',
    baseServings: 4
  },
  {
    id: '15',
    name: 'Fried Rice',
    image: 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=800&q=80',
    ingredients: [
      { name: 'day-old rice', amount: 4, unit: 'cups' },
      { name: 'eggs', amount: 2, unit: '' },
      { name: 'carrots', amount: 1, unit: '' },
      { name: 'peas', amount: 0.5, unit: 'cup' },
      { name: 'green onions', amount: 4, unit: '' },
      { name: 'soy sauce', amount: 3, unit: 'tbsp' },
      { name: 'sesame oil', amount: 1, unit: 'tbsp' },
      { name: 'vegetable oil', amount: 3, unit: 'tbsp' },
      { name: 'garlic', amount: 2, unit: 'cloves' },
      { name: 'salt', amount: 0.5, unit: 'tsp' }
    ],
    instructions: [
      'Dice carrots and slice green onions, separate whites and greens.',
      'Heat vegetable oil in a wok over high heat.',
      'Add beaten eggs and scramble, set aside.',
      'Add more oil, sauté carrot pieces for 2 minutes.',
      'Add garlic and green onion whites, cook 30 seconds.',
      'Add cold rice and break up any clumps.',
      'Drizzle soy sauce and sesame oil, toss to combine.',
      'Add peas and scrambled eggs, stir well.',
      'Finish with green onions and serve hot.'
    ],
    prepTime: 15,
    cookTime: 15,
    difficulty: 'Easy',
    cuisine: 'Asian',
    baseServings: 4
  }
];
