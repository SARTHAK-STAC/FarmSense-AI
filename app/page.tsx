"use client";

import { useState } from "react";

export default function Home() {
  const [image, setImage] = useState<string | null>(null);
  const [analysis, setAnalysis] = useState<any>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) return;

    const reader = new FileReader();

    reader.onloadend = () => {
      setImage(reader.result as string);
      setAnalysis(null);
      setError("");
    };

    reader.readAsDataURL(file);
  };

  const analyzeImage = async () => {
    if (!image) return;

    setLoading(true);
    setError("");
    setAnalysis(null);

    try {
      const res = await fetch("/api/analyze", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ image }),
      });

      const data = await res.json();

      if (!data.success) {
        setError(data.error || "Analysis failed");
        return;
      }

      const cleaned = data.result
        .replace(/```json/g, "")
        .replace(/```/g, "")
        .trim();

      const parsed = JSON.parse(cleaned);

      setAnalysis(parsed);
    } catch (err) {
      setError("Unable to analyze image.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-100 to-green-200 p-6">
      <div className="max-w-6xl mx-auto">

        <div className="text-center mb-12">
          <h1 className="text-6xl md:text-7xl font-extrabold bg-gradient-to-r from-green-600 to-emerald-800 bg-clip-text text-transparent">
            🌱 FarmSense AI
          </h1>

          <p className="mt-4 text-2xl text-gray-700">
            Smart Crop Disease Detection
          </p>

          <p className="mt-3 text-gray-600 max-w-2xl mx-auto">
            Upload a crop image and get instant disease diagnosis,
            treatment recommendations, and prevention strategies.
          </p>
        </div>

        <div className="bg-white rounded-3xl shadow-[0_20px_60px_rgba(0,0,0,0.15)] p-8 md:p-10">

          <div className="border-2 border-dashed border-green-400 rounded-3xl p-10 bg-green-50 text-center">

            <div className="text-6xl mb-4">📷</div>

            <h2 className="text-2xl font-bold text-green-700">
              Upload Crop Image
            </h2>

            <p className="text-gray-500 mt-2">
              JPG, PNG and JPEG images supported
            </p>

            <input
              type="file"
              accept="image/*"
              onChange={handleImage}
              className="mt-6 mx-auto"
            />
          </div>

          {image && (
            <div className="mt-10">
              <h2 className="text-xl font-bold text-green-700 mb-4">
                🌿 Uploaded Image
              </h2>

              <img
                src={image}
                alt="Crop"
                className="w-full max-h-[500px] object-cover rounded-3xl shadow-lg"
              />
            </div>
          )}

          <button
            onClick={analyzeImage}
            disabled={loading}
            className="w-full mt-8 bg-gradient-to-r from-green-600 to-emerald-700 text-white font-bold py-5 rounded-2xl text-xl shadow-xl hover:scale-[1.02] transition-all"
          >
            {loading ? "🔍 Analyzing Crop..." : "🚀 Analyze Crop"}
          </button>

          {error && (
            <div className="mt-6 bg-red-100 border border-red-300 text-red-700 p-4 rounded-xl">
              {error}
            </div>
          )}

          {analysis && (
            <div className="mt-10 grid md:grid-cols-2 gap-4">

              <div className="bg-white p-6 rounded-2xl shadow-lg border">
                <h3 className="font-bold text-green-700 text-xl">
                  🌱 Crop
                </h3>
                <p className="mt-2">{analysis.crop}</p>
              </div>

              <div className="bg-white p-6 rounded-2xl shadow-lg border">
                <h3 className="font-bold text-red-600 text-xl">
                  🦠 Disease
                </h3>
                <p className="mt-2">{analysis.disease}</p>
              </div>

              <div className="bg-white p-6 rounded-2xl shadow-lg border">
                <h3 className="font-bold text-orange-600 text-xl">
                  ⚠️ Severity
                </h3>
                <p className="mt-2">{analysis.severity}</p>
              </div>

              <div className="bg-white p-6 rounded-2xl shadow-lg border md:col-span-2">
                <h3 className="font-bold text-blue-600 text-xl">
                  💊 Treatment
                </h3>

                <ul className="list-disc ml-6 mt-3">
                  {analysis.treatment?.map((item: string, i: number) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </div>

              <div className="bg-white p-6 rounded-2xl shadow-lg border md:col-span-2">
                <h3 className="font-bold text-green-600 text-xl">
                  🛡️ Prevention
                </h3>

                <ul className="list-disc ml-6 mt-3">
                  {analysis.prevention?.map((item: string, i: number) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </div>

            </div>
          )}
        </div>

        <div className="text-center mt-8 text-gray-500">
          Built with Gemini AI • Kaggle AI Agents Capstone 2026
        </div>

      </div>
    </main>
  );
}