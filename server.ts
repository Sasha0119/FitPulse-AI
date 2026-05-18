import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize Gemini
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY || "",
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    }
  }
});

// API Routes
app.post("/api/chat", async (req, res) => {
  try {
    const { message, history } = req.body;
    
    const chat = ai.chats.create({
      model: "gemini-3-flash-preview",
      config: {
        systemInstruction: "You are fitPulse AI, a professional fitness and nutrition coach. You are encouraging, scientific, and practical. Keep responses concise and focused on fitness/health goals. If the user asks for a workout plan, structure it with clear headings and bullet points. If they ask about nutrition, provide caloric and macro estimates where possible.",
      },
      history: history || []
    });

    const result = await chat.sendMessage({ message });
    res.json({ text: result.text });
  } catch (error) {
    console.error("Gemini Error:", error);
    res.status(500).json({ error: "Failed to get AI response" });
  }
});

// Vite middleware for development
async function setupServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

setupServer();
