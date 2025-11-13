import React, { useState, useEffect } from "react";

export default function App() {
  const [memes, setMemes] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch memes from API
  useEffect(() => {
    const fetchMemes = async () => {
      try {
        const res = await fetch("https://api.imgflip.com/get_memes");
        const data = await res.json();
        if (data.success) {
          setMemes(data.data.memes);
        } else {
          throw new Error("Failed to fetch memes");
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMemes();
  }, []);

  // Filter memes by search text
  const filteredMemes = memes.filter((meme) =>
    meme.name.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen text-2xl font-semibold text-gray-600">
        Loading memes...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen text-xl text-red-500">
        Error: {error}
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6 bg-white">
      <h1 className="text-4xl font-bold text-center mb-8">
        Meme Template Viewer
      </h1>

      <div className="flex justify-center mb-8">
        <input
          type="text"
          placeholder="Search memes..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-3/4 sm:w-1/2 p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      {filteredMemes.length === 0 ? (
        <p className="text-center text-gray-500">No memes found 😅</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredMemes.map((meme) => (
            <div
              key={meme.id}
              className="bg-gray-50 rounded-xl shadow hover:shadow-lg transition p-3 flex flex-col items-center"
            >
              <img
                src={meme.url}
                alt={meme.name}
                className="rounded-md mb-3 w-full h-64 object-cover"
              />
              <p className="font-semibold text-gray-800 text-center">
                {meme.name}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
