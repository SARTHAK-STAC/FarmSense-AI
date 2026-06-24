import { GoogleGenAI } from "@google/genai";

export async function GET() {
  try {
    const ai = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
    });

    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: "Reply with exactly: FarmSense AI Connected",
    });

    return Response.json({
      success: true,
      text: response.text,
    });
  } catch (error: any) {
    return Response.json({
  success: false,
  error:
    "Gemini is currently busy. Please try again in a few seconds.",
});
  }
}