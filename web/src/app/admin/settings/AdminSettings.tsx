"use client";

import { useState, useEffect } from "react";

const DEFAULT_SERVICE_AREA =
  "We currently serve the Greater Bay Area, including San Francisco, Oakland, San Jose, and surrounding cities within 50 miles.";

const DEFAULT_CANCELLATION_POLICY =
  "Cancellations made 48+ hours before the event receive a full refund. Cancellations within 48 hours are non-refundable. Contact us to reschedule.";

type RgSettings = {
  serviceArea: string;
  cancellationPolicy: string;
};

function loadSettings(): RgSettings {
  if (typeof window === "undefined") {
    return { serviceArea: DEFAULT_SERVICE_AREA, cancellationPolicy: DEFAULT_CANCELLATION_POLICY };
  }
  try {
    const stored = localStorage.getItem("rg_settings");
    if (!stored) {
      return { serviceArea: DEFAULT_SERVICE_AREA, cancellationPolicy: DEFAULT_CANCELLATION_POLICY };
    }
    const parsed = JSON.parse(stored) as Partial<RgSettings>;
    return {
      serviceArea: parsed.serviceArea ?? DEFAULT_SERVICE_AREA,
      cancellationPolicy: parsed.cancellationPolicy ?? DEFAULT_CANCELLATION_POLICY,
    };
  } catch {
    return { serviceArea: DEFAULT_SERVICE_AREA, cancellationPolicy: DEFAULT_CANCELLATION_POLICY };
  }
}

export default function AdminSettingsPage() {
  const [serviceArea, setServiceArea] = useState<string>("");
  const [cancellationPolicy, setCancellationPolicy] = useState<string>("");
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const settings = loadSettings();
    setServiceArea(settings.serviceArea);
    setCancellationPolicy(settings.cancellationPolicy);
  }, []);

  function handleSave() {
    const settings: RgSettings = { serviceArea, cancellationPolicy };
    localStorage.setItem("rg_settings", JSON.stringify(settings));
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  }

  return (
    <div className="max-w-2xl">
      <h1 className="text-2xl font-bold text-blue-800 mb-6">Settings</h1>

      <div className="flex flex-col gap-6">
        {/* Service Area */}
        <div className="flex flex-col gap-2">
          <label htmlFor="serviceArea" className="text-sm font-semibold text-gray-700">
            Service Area
          </label>
          <input
            id="serviceArea"
            type="text"
            value={serviceArea}
            onChange={(e) => setServiceArea(e.target.value)}
            className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm text-gray-800 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
          />
        </div>

        {/* Cancellation Policy */}
        <div className="flex flex-col gap-2">
          <label htmlFor="cancellationPolicy" className="text-sm font-semibold text-gray-700">
            Cancellation Policy
          </label>
          <textarea
            id="cancellationPolicy"
            rows={4}
            value={cancellationPolicy}
            onChange={(e) => setCancellationPolicy(e.target.value)}
            className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm text-gray-800 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 resize-vertical"
          />
        </div>

        {/* Save button */}
        <div className="flex items-center gap-4">
          <button
            onClick={handleSave}
            className="rounded-full px-6 py-2.5 text-sm font-semibold text-blue-900 transition-all hover:brightness-95 active:scale-95"
            style={{ backgroundColor: "var(--color-accent)" }}
          >
            Save Settings
          </button>
          {saved && (
            <p className="text-sm font-medium text-green-600">
              Settings saved!
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
