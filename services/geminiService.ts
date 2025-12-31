
import { GoogleGenAI, Type } from "@google/genai";
import { SimplifiedResult } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const simplifyText = async (text: string): Promise<SimplifiedResult> => {
  const model = "gemini-3-flash-preview";
  
  const systemInstruction = `
    You are an AI Accessibility Specialist. Your goal is to take complex, jargon-heavy text (legal, medical, or bureaucratic) and rewrite it so a 10-year-old or someone with low digital literacy can understand it perfectly.
    
    CRITICAL RULES:
    1. Use simple language. Avoid big words unless they are 'unavoidable'.
    2. Define any 'unavoidable' big words in parentheses immediately after the word.
    3. Maintain a helpful, kind, and non-condescending tone.
    4. Provide the response in a structured JSON format.
    
    JSON Structure:
    {
      "summary": "A very brief 1-2 sentence overview of the main message.",
      "keyPoints": ["List of main facts in simple bullet points"],
      "whatItMeans": "A clear explanation of how this affects the person directly.",
      "whatToDo": ["Clear, numbered steps of what the person should do next"],
      "definitions": [{"word": "the word", "meaning": "the simple meaning"}]
    }
  `;

  try {
    const response = await ai.models.generateContent({
      model: model,
      contents: [{ parts: [{ text: `Simplify the following text:\n\n${text}` }] }],
      config: {
        systemInstruction: systemInstruction,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            summary: { type: Type.STRING },
            keyPoints: {
              type: Type.ARRAY,
              items: { type: Type.STRING }
            },
            whatItMeans: { type: Type.STRING },
            whatToDo: {
              type: Type.ARRAY,
              items: { type: Type.STRING }
            },
            definitions: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  word: { type: Type.STRING },
                  meaning: { type: Type.STRING }
                }
              }
            }
          },
          required: ["summary", "keyPoints", "whatItMeans", "whatToDo", "definitions"]
        }
      },
    });

    const result = JSON.parse(response.text || '{}');
    return result as SimplifiedResult;
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw new Error("Failed to simplify text. Please try again.");
  }
};
