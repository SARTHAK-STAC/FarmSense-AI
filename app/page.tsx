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

    const res = await fetch("/api/analyze", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ image }),
    });

    const data = await res.json();

    setResult(data.result || data.error);

    setLoading(false);
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-green-50 to-green-200 flex items-center justify-center p-6">
      <div className="bg-white shadow-2xl rounded-3xl p-8 w-full max-w-3xl">
        <h1 className="text-4xl font-bold text-green-700 text-center">
          🌱 FarmSense AI
        </h1>

        <p className="text-center text-gray-500 mt-2">
          AI Crop Disease Detection Agent
        </p>

        <input
          type="file"
          accept="image/*"
          onChange={handleImage}
          className="mt-6 w-full"
        />

        {image && (
          <img
            src={image}
            alt="Crop"
            className="mt-6 rounded-lg w-full max-h-96 object-cover"
          />
        )}

        <button
          onClick={analyzeImage}
          disabled={loading}
          className="mt-6 w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700"
        >
          {loading ? "Analyzing..." : "Analyze Crop"}
        </button>

        {result && (
  <div className="mt-8 bg-white border border-green-300 shadow-lg rounded-2xl p-6">
    <h2 className="text-2xl font-bold text-green-700 mb-4">
      🌾 Analysis Result
    </h2>

    <div className="whitespace-pre-wrap text-gray-900 leading-7 text-lg">
      {result}
    </div>
  </div>
)}
      </div>
    </main>
  );
}