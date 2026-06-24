export default function Home() {
  return (
    <main className="min-h-screen bg-green-50 flex items-center justify-center">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-xl">
        <h1 className="text-4xl font-bold text-green-700 text-center">
          🌱 FarmSense AI
        </h1>

        <p className="text-center text-gray-600 mt-2">
          AI-Powered Crop Disease Detection
        </p>

        <div className="mt-8">
          <label className="block mb-2 font-medium">
            Upload Crop Image
          </label>

          <input
            type="file"
            className="w-full border p-2 rounded-lg"
          />
        </div>

        <div className="mt-4">
          <label className="block mb-2 font-medium">
            Location
          </label>

          <input
            type="text"
            placeholder="Enter your location"
            className="w-full border p-2 rounded-lg"
          />
        </div>

        <button className="mt-6 w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700">
          Analyze Crop
        </button>
      </div>
    </main>
  );
}