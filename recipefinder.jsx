import React, { useState } from 'react';

// Main App component
const App = () => {
    // State variables for managing the application's data and UI
    const [ingredient, setIngredient] = useState('');
    const [recipes, setRecipes] = useState([]);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');

    // Async function to fetch recipes from the API
    const fetchRecipes = async () => {
        // Clear previous state and set loading to true
        setRecipes([]);
        setMessage('');
        setLoading(true);

        // Check if an ingredient was provided
        if (!ingredient.trim()) {
            setMessage('Please enter an ingredient to search.');
            setLoading(false);
            return;
        }
        
        const url = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`;

        try {
            const response = await fetch(url);
            const data = await response.json();

            if (data.meals) {
                setRecipes(data.meals);
            } else {
                setMessage('No recipes found for that ingredient. Try another one!');
            }
        } catch (error) {
            console.error('Failed to fetch recipes:', error);
            setMessage('An error occurred. Please try again later.');
        } finally {
            // Always set loading to false after the fetch operation
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-8 bg-gray-100">
            <div className="w-full max-w-2xl px-4">
                <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-200">
                    <h1 className="text-3xl font-bold text-gray-800 text-center mb-6">Recipe Rescuer</h1>
                    <p className="text-gray-600 text-center mb-6">
                        Enter an ingredient you have, and let's find some recipes for you!
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 mb-6">
                        <input
                            type="text"
                            placeholder="e.g., chicken, pasta, beef"
                            value={ingredient}
                            onChange={(e) => setIngredient(e.target.value)}
                            className="flex-grow p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200"
                        />
                        <button
                            onClick={fetchRecipes}
                            className="p-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-all duration-200"
                        >
                            Find Recipes
                        </button>
                    </div>

                    {/* Display status messages or loader */}
                    <div className="text-center font-medium text-gray-500 mb-6">
                        {loading && (
                            <div className="flex justify-center items-center">
                                <div className="border-4 border-gray-300 border-t-blue-500 rounded-full w-10 h-10 animate-spin"></div>
                            </div>
                        )}
                        {message && <span>{message}</span>}
                    </div>

                    {/* Recipe container */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {recipes.map(meal => (
                            <div
                                key={meal.idMeal}
                                className="bg-gray-100 rounded-xl overflow-hidden shadow-md transform hover:scale-105 transition-transform duration-200 cursor-pointer"
                            >
                                <img
                                    src={meal.strMealThumb}
                                    alt={meal.strMeal}
                                    className="w-full h-40 object-cover"
                                />
                                <div className="p-4">
                                    <h3 className="text-lg font-semibold text-gray-800 truncate">{meal.strMeal}</h3>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default App;
