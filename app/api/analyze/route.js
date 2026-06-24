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

Analyze this crop image and respond ONLY with valid JSON.

{
  "crop": "Crop name",
  "disease": "Disease name",
  "severity": "Low/Medium/High",
  "treatment": [
    "Treatment 1",
    "Treatment 2",
    "Treatment 3"
  ],
  "prevention": [
    "Prevention 1",
    "Prevention 2",
    "Prevention 3"
  ]
}

Do not include markdown.
Do not include explanations.
Return only JSON.
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