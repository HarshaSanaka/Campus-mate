
import { GoogleGenerativeAI } from "@google/generative-ai";

// Initialize with your API Key
// In a real app, use environment variables (e.g., set in app.json or .env)
const API_KEY = "YOUR_GEMINI_API_KEY"; 

const genAI = new GoogleGenerativeAI(API_KEY);

export const getGeminiResponse = async (prompt) => {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    return text;
  } catch (error) {
    console.error("Error fetching Gemini response:", error);
    return "Sorry, I couldn't process that request right now. Please check your API key and connection.";
  }
};
