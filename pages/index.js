import { useState } from "react";

export default function Home() {
  const [content, setContent] = useState("");
  const [ttl, setTtl] = useState("");
  const [views, setViews] = useState("");
  const [url, setUrl] = useState("");
  const [error, setError] = useState("");

  async function createPaste() {
    setError("");
    setUrl("");

    const res = await fetch("/api/pastes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        content,
        ttl_seconds: ttl ? Number(ttl) : undefined,
        max_views: views ? Number(views) : undefined,
      }),
    });

    const data = await res.json();
    if (!res.ok) {
      setError(data.error || "Something went wrong");
      return;
    }

    setUrl(data.url);
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white w-full max-w-xl p-6 rounded-lg shadow">
        <h1 className="text-2xl font-semibold mb-4 text-center">
          Pastebin Lite
        </h1>

        {/* <textarea
          className="w-full border rounded p-3 text-sm"
          placeholder="Enter your paste content..."
          rows={6}
          onChange={(e) => setContent(e.target.value)}
        /> */}

        <textarea
              className="w-full border rounded p-3 text-sm"
              placeholder="Enter your paste content..."
              rows={6}
              list="paste-suggestions"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />

            <datalist id="paste-suggestions">
              <option value="Hello World" />
              <option value="console.log()" />
              <option value="function example() {}" />
              <option value="Sample text for paste" />
        </datalist>

{/* 
        <div className="flex gap-3 mt-4">
          <input
            className="w-1/2 border rounded p-2 text-sm"
            placeholder="TTL (seconds)"
            onChange={(e) => setTtl(e.target.value)}
          />
          <input
            className="w-1/2 border rounded p-2 text-sm"
            placeholder="Max Views"
            onChange={(e) => setViews(e.target.value)}
          />
        </div> */}

        <input
              type="number"
              min={1}
              step={1}
              className="w-1/2 border rounded p-2 text-sm"
              placeholder="TTL (seconds)"
              value={ttl}
              onChange={(e) => setTtl(e.target.value)}
            />

            <input
              type="number"
              min={1}
              step={1}
              className="w-1/2 border rounded p-2 text-sm"
              placeholder="Max Views"
              value={views}
              onChange={(e) => setViews(e.target.value)}
            />

        <button
          onClick={createPaste}
          className="w-full mt-4 bg-black text-white py-2 rounded"
        >
          Create Paste
        </button>

        {error && (
          <p className="text-red-600 text-sm mt-3 text-center">{error}</p>
        )}

        {url && (
          <div className="mt-4 text-center">
            <p className="text-sm text-gray-600">Shareable URL</p>
            <a href={url} className="text-blue-600 underline break-all">
              {url}
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
