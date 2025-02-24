import axios from "axios";

const API_BASE_URL = "http://localhost:3000/api";

export const fetchRecipes = async (query) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/recipes?search=${query}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching recipes:", error);
        return [];
    }
};

export const fetchRecipeById = async (id) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/recipes/${id}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching recipe details:", error);
        return null;
    }
};
