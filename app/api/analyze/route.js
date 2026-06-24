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
You are an agricultural expert.

Analyze this crop image and return the result in exactly this format:

🌱 Crop Name:
[Crop Name]

🦠 Disease:
[Disease Name]

⚠️ Severity:
[Low / Medium / High]

💊 Treatment:
- Point 1
- Point 2
- Point 3

🛡️ Prevention:
- Point 1
- Point 2
- Point 3

Keep the response concise, practical, and farmer-friendly.
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