
import { GoogleGenAI, Type } from "@google/genai";
import { SchoolReport } from "../types";

const API_KEY = process.env.API_KEY || '';

export const getAIInsights = async (reports: SchoolReport[]) => {
  if (!API_KEY) return "AI Insights unavailable: Missing API Key.";

  const ai = new GoogleGenAI({ apiKey: API_KEY });
  const prompt = `
    As a UNICEF Pakistan Education Specialist, analyze these school issue reports:
    ${JSON.stringify(reports)}
    
    Please provide:
    1. A executive summary of the most critical trends across provinces.
    2. Specific recommendations for UNICEF field teams.
    3. Suggested priorities for government engagement.
    Keep the tone professional and action-oriented.
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        thinkingConfig: { thinkingBudget: 0 }
      }
    });

    return response.text || "No insights could be generated.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Error generating AI insights. Please check connection.";
  }
};
