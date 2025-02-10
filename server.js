import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { OpenAI } from "openai";

dotenv.config(); // Load API Key from .env file

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// Initialize OpenAI API client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // Use OpenAI API Key from .env file
});

// OpenAI API Call Function
const fetchSarcasticReply = async (userMessage) => {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",  // Use the new model
      messages: [
        { role: "system", content: "You are a sarcastic and dark-humored AI." },
        { role: "user", content: userMessage },
      ],
    });

    const botReply = response.choices[0].message.content.trim(); // Get bot's reply
    return botReply;  // Return cleaned reply
  } catch (error) {
    console.error("Error fetching AI response:", error);
    return "Bhai, AI beizzati kar raha hai, khud soch le 😂.";  // Fallback in case of error
  }
};

// Chatbot API Route
app.post("/chat", async (req, res) => {
  const userMessage = req.body.message;  // Extract user message
  console.log("User:", userMessage);

  const aiReply = await fetchSarcasticReply(userMessage);  // Fetch AI response
  console.log("Bot:", aiReply);

  res.json({ message: aiReply });  // Send response back to frontend
});

app.listen(PORT, () => {
  console.log(`🔥 Server is running on http://localhost:${PORT}`);
});
