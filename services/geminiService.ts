import { GoogleGenAI, Chat } from "@google/genai";
import { Message } from '../types';

let chat: Chat | null = null;

const initializeChat = (): Chat => {
  if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable not set");
  }
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  return ai.chats.create({
    model: 'gemini-2.5-flash',
    config: {
      systemInstruction: `You are a friendly and professional customer support agent for a Fintech & Marketing super-app. Your goal is to help users with their questions about the app's features. Features include: marketing dashboard analytics, SMS and Email marketing subscription management, purchasing marketing credits, virtual Visa/MasterCard management, mobile top-ups (Orange, MTN, Camtel, Nextell), bill payments (Eneo, Camwater), and transaction history. Be concise, helpful, and always maintain a positive tone. Do not provide financial advice. If you don't know the answer, say that you will escalate the issue to a human agent.`,
    },
  });
};

export const runChat = async (prompt: string): Promise<string> => {
  try {
    if (!chat) {
        chat = initializeChat();
    }
    const response = await chat.sendMessage({ message: prompt });
    return response.text;
  } catch (error) {
    console.error("Error in Gemini API call:", error);
    if (error instanceof Error && error.message.includes("API_KEY")) {
        return "It seems the API key is not configured correctly. Please contact support.";
    }
    return "I'm having trouble connecting to my brain right now. Please try again in a moment.";
  }
};