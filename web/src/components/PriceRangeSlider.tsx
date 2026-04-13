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
  function handleMinChange(e: React.ChangeEvent<HTMLInputElement>) {
    const value = Number(e.target.value);
    if (value <= maxValue) {
      onMinChange(value);
    }
  }

  function handleMaxChange(e: React.ChangeEvent<HTMLInputElement>) {
    const value = Number(e.target.value);
    if (value >= minValue) {
      onMaxChange(value);
    }
  }

  function handleMinKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "ArrowRight" || e.key === "ArrowUp") {
      const newVal = Math.min(minValue + 1, maxValue);
      onMinChange(newVal);
    } else if (e.key === "ArrowLeft" || e.key === "ArrowDown") {
      const newVal = Math.max(minValue - 1, min);
      onMinChange(newVal);
    }
  }

  function handleMaxKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "ArrowRight" || e.key === "ArrowUp") {
      const newVal = Math.min(maxValue + 1, max);
      onMaxChange(newVal);
    } else if (e.key === "ArrowLeft" || e.key === "ArrowDown") {
      const newVal = Math.max(maxValue - 1, minValue);
      onMaxChange(newVal);
    }
  }

  const range = max - min;
  const minPercent = range === 0 ? 0 : ((minValue - min) / range) * 100;
  const maxPercent = range === 0 ? 100 : ((maxValue - min) / range) * 100;

  return (
    <div className="flex flex-col gap-2 w-full">
      <div className="flex items-center justify-between text-sm font-medium text-gray-700">
        <span className="text-gray-500 text-xs font-normal">Price</span>
        <span>{`$${minValue} \u2013 $${maxValue} / day`}</span>
      </div>

      <div className="relative h-5 flex items-center">
        {/* Track background */}
        <div className="absolute inset-x-0 h-1.5 rounded-full bg-gray-200" />

        {/* Active track fill */}
        <div
          className="absolute h-1.5 rounded-full bg-green-500"
          style={{ left: `${minPercent}%`, right: `${100 - maxPercent}%` }}
        />

        {/* Min range input */}
        <input
          type="range"
          min={min}
          max={max}
          value={minValue}
          onChange={handleMinChange}
          onKeyDown={handleMinKeyDown}
          aria-label="Minimum price"
          className="absolute inset-x-0 w-full appearance-none bg-transparent cursor-pointer"
          style={{ zIndex: minValue > max - (max - min) * 0.1 ? 5 : 3 }}
        />

        {/* Max range input */}
        <input
          type="range"
          min={min}
          max={max}
          value={maxValue}
          onChange={handleMaxChange}
          onKeyDown={handleMaxKeyDown}
          aria-label="Maximum price"
          className="absolute inset-x-0 w-full appearance-none bg-transparent cursor-pointer"
          style={{ zIndex: 4 }}
        />
      </div>

      <div className="flex justify-between text-xs text-gray-400">
        <span>${min}</span>
        <span>${max}</span>
      </div>
    </div>
  );
}
