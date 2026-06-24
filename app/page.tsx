"use client";

import { useState } from "react";

export default function Home() {
  const [image, setImage] = useState<string | null>(null);
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) return;

    const reader = new FileReader();

    reader.onloadend = () => {
      setImage(reader.result as string);
    };

    reader.readAsDataURL(file);
  };

  const analyzeImage = async () => {
    if (!image) return;

    setLoading(true);

    try {
      const res = await fetch("/api/analyze", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ image }),
      });

      const data = await res.json();

      if (data.success) {
        setResult(data.result);
      } else {
        setResult(data.error);
      }
    } catch (error) {
      setResult("Something went wrong.");
    }

    setLoading(false);
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-100 to-green-200 p-6">
      <div className="max-w-6xl mx-auto">

        {/* Hero */}
        <div className="text-center mb-12">
          <h1 className="text-6xl md:text-7xl font-extrabold bg-gradient-to-r from-green-600 to-emerald-800 bg-clip-text text-transparent">
            🌱 FarmSense AI
          </h1>

          <p className="mt-4 text-2xl text-gray-700">
            Smart Crop Disease Detection
          </p>

          <p className="mt-3 text-gray-600 max-w-2xl mx-auto">
            Upload a crop image and get instant AI-powered disease diagnosis,
            treatment recommendations, and prevention strategies.
          </p>
        </div>

        {/* Main Card */}
        <div className="bg-white rounded-3xl shadow-[0_20px_60px_rgba(0,0,0,0.15)] p-8 md:p-10">

          {/* Upload Section */}
          <div className="border-2 border-dashed border-green-400 rounded-3xl p-10 bg-green-50 text-center">

            <div className="text-6xl mb-4">
              📷
            </div>

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

          {/* Image Preview */}
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

          {/* Analyze Button */}
          <button
            onClick={analyzeImage}
            disabled={loading}
            className="w-full mt-8 bg-gradient-to-r from-green-600 to-emerald-700 text-white font-bold py-5 rounded-2xl text-xl shadow-xl hover:scale-[1.02] transition-all duration-300"
          >
            {loading ? "🔍 Analyzing Crop..." : "🚀 Analyze Crop"}
          </button>

          {/* Results */}
          {result && (
            <div className="mt-10 bg-gradient-to-r from-green-50 to-emerald-50 border border-green-300 rounded-3xl p-8 shadow-lg">

              <h2 className="text-3xl font-bold text-green-800 mb-6">
                🌾 Analysis Report
              </h2>

              <div className="whitespace-pre-wrap text-gray-800 leading-8 text-lg">
                {result}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="text-center mt-8 text-gray-500">
          Built with Gemini AI • Kaggle AI Agents Capstone 2026
        </div>

      </div>
    </main>
  );
}