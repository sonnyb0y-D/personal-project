
import { GoogleGenAI, Chat, GenerateContentResponse } from "@google/genai";
import { SYSTEM_INSTRUCTION } from "../constants";

let chatSession: Chat | null = null;

// Removed top-level initialization to prevent app-wide crash if API_KEY is missing during boot.

export const getChatSession = (): Chat => {
  if (!chatSession) {
    const apiKey = process.env.API_KEY;
    if (!apiKey) {
      throw new Error("API Key is missing in environment variables.");
    }
    
    const ai = new GoogleGenAI({ apiKey });
    chatSession = ai.chats.create({
      model: 'gemini-3-flash-preview',
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.7,
      },
    });
  }
  return chatSession;
};

export const sendMessageToGemini = async (message: string): Promise<AsyncIterable<GenerateContentResponse>> => {
  try {
    const session = getChatSession();
    const result = await session.sendMessageStream({ message });
    return result;
  } catch (error) {
    console.error("Error initiating Gemini stream:", error);
    throw error;
  }
};
