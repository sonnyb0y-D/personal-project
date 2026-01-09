import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateDreamText = async (prompt: string): Promise<string> => {
  try {
    const fullPrompt = `
      You are "Daydream", a poetic, abstract entity living in a website. 
      Your aesthetic is a mix of Shoegaze music, Math Rock complexity, and Anime subtitles.
      
      User Input: "${prompt}"
      
      Task: Write a single, short, evocative sentence or two (max 30 words) inspired by the user input. 
      Style: Melancholic but hopeful, surreal, cinematic, like a movie subtitle or a dream pop song lyric.
      Do not use emojis. Keep it lowercase or sentence case.
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: fullPrompt,
    });

    return response.text || "signal lost... static only...";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "connection to the dream server failed.";
  }
};