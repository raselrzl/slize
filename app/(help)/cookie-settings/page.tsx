"use client";

import { useState } from "react";

export default function CookieSettingsPage() {
  const [analytics, setAnalytics] = useState(true);

  return (
    <div className="max-w-4xl mx-auto py-12 px-4">
      <h1 className="text-3xl font-semibold mb-4">Cookie Settings</h1>
      <p className="text-gray-700 mb-6">
        We use cookies to improve your experience. Manage your preferences
        below.
      </p>

      <div className="flex items-center gap-3 mb-4">
        <input
          type="checkbox"
          checked={analytics}
          onChange={() => setAnalytics(!analytics)}
          className="h-4 w-4 accent-black"
        />
        <span className="text-gray-700">Allow analytics cookies</span>
      </div>

      <button className="bg-black text-white px-4 py-2 rounded-md hover:bg-gray-900 transition">
        Save preferences
      </button>
    </div>
  );
}
