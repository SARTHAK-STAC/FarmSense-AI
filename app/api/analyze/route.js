import { GoogleGenAI } from "@google/genai";

export async function POST(req) {
  try {
    const { image } = await req.json();

    const ai = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
    });

    const base64Data = image.split(",")[1];

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: [
        {
          inlineData: {
            mimeType: "image/jpeg",
            data: base64Data,
          },
        },
        {
          text: `
Analyze this crop image.

Return:
1. Crop Name
2. Disease Name (if any)
3. Severity (Low/Medium/High)
4. Treatment Recommendation
5. Prevention Tips

Keep the response farmer-friendly.
          `,
        },
      ],
    });

    return Response.json({
      success: true,
      result: response.text,
    });
  } catch (error) {
    console.error(error);

    return Response.json({
      success: false,
      error: error.message,
    });
  }
}