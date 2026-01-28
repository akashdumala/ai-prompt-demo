"use client";

import { useState } from "react";

export default function Home() {
  const [prompt, setPrompt] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit() {
    if (!prompt) return;

    setLoading(true);
    setResult("");

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Server error:", errorText);
        alert("Something went wrong. Check console.");
        setLoading(false);
        return;
      }

      const data = await response.json();
      setResult(data.result);
    } catch (err) {
      console.error(err);
      alert("Request failed.");
    }

    setLoading(false);
  }

  return (
    <div style={{ padding: 40, maxWidth: 600 }}>
      <h1>AI Text Generator</h1>

      <textarea
        rows={5}
        style={{ width: "100%", marginBottom: 12 }}
        placeholder="Type your prompt..."
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
      />

      <button onClick={handleSubmit} disabled={loading}>
        {loading ? "Generating..." : "Generate"}
      </button>

      {result && (
        <div style={{ marginTop: 20 }}>
          <h3>Result</h3>
          <p>{result}</p>
        </div>
      )}
    </div>
  );
}
