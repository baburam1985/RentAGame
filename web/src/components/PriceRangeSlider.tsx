"use client";

type Props = {
  min: number;
  max: number;
  minValue: number;
  maxValue: number;
  onMinChange: (value: number) => void;
  onMaxChange: (value: number) => void;
};

export default function PriceRangeSlider({
  min,
  max,
  minValue,
  maxValue,
  onMinChange,
  onMaxChange,
}: Props) {
  return (
    <div className="flex flex-col gap-2">
      <p className="text-sm font-medium text-gray-700">
        ${minValue}&nbsp;–&nbsp;${maxValue}&nbsp;/&nbsp;day
      </p>
      <div className="flex items-center gap-4">
        <input
          type="range"
          aria-label="Minimum price"
          min={min}
          max={max}
          value={minValue}
          onChange={(e) => {
            const v = Number(e.target.value);
            if (v <= maxValue) onMinChange(v);
          }}
          onKeyDown={(e) => {
            if (e.key === "ArrowRight" || e.key === "ArrowUp") {
              const v = Math.min(minValue + 1, maxValue);
              onMinChange(v);
            } else if (e.key === "ArrowLeft" || e.key === "ArrowDown") {
              const v = Math.max(minValue - 1, min);
              onMinChange(v);
            }
          }}
          className="w-full accent-blue-700"
        />
        <input
          type="range"
          aria-label="Maximum price"
          min={min}
          max={max}
          value={maxValue}
          onChange={(e) => {
            const v = Number(e.target.value);
            if (v >= minValue) onMaxChange(v);
          }}
          onKeyDown={(e) => {
            if (e.key === "ArrowRight" || e.key === "ArrowUp") {
              const v = Math.min(maxValue + 1, max);
              onMaxChange(v);
            } else if (e.key === "ArrowLeft" || e.key === "ArrowDown") {
              const v = Math.max(maxValue - 1, minValue);
              onMaxChange(v);
            }
          }}
          className="w-full accent-blue-700"
        />
      </div>
    </div>
  );
}
