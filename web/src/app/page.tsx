"use client";

import { useState } from "react";
import Hero from "@/components/Hero";
import CategoryFilter from "@/components/CategoryFilter";
import SearchBar from "@/components/SearchBar";
import SortDropdown from "@/components/SortDropdown";
import PriceRangeSlider from "@/components/PriceRangeSlider";
import GameGrid from "@/components/GameGrid";
import GameModal from "@/components/GameModal";
import HowItWorks from "@/components/HowItWorks";
import Testimonials from "@/components/Testimonials";
import RentalForm from "@/components/RentalForm";
import type { Game } from "@/data/games";

const PRICE_MIN = 20;
const PRICE_MAX = 55;

export default function Home() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOrder, setSortOrder] = useState("featured");
  const [minPrice, setMinPrice] = useState(PRICE_MIN);
  const [maxPrice, setMaxPrice] = useState(PRICE_MAX);
  const [selectedGame, setSelectedGame] = useState<Game | null>(null);
  const [prefilledGame, setPrefilledGame] = useState("");

  function handleRentNow(game: Game) {
    setSelectedGame(null);
    setPrefilledGame(game.name);
    setTimeout(() => {
      document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  }


  return (
    <main className="min-h-screen" style={{ background: "#fffde1" }}>
      <Hero />

      <section id="catalog">
        <CategoryFilter
          activeCategory={activeCategory}
          onCategoryChange={setActiveCategory}
        />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-4 flex flex-wrap items-center gap-4">
          <SearchBar
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
          />
          <SortDropdown value={sortOrder} onChange={setSortOrder} />
        </div>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-2">
          <PriceRangeSlider
            min={PRICE_MIN}
            max={PRICE_MAX}
            minValue={minPrice}
            maxValue={maxPrice}
            onMinChange={setMinPrice}
            onMaxChange={setMaxPrice}
          />
        </div>
        <GameGrid
          activeCategory={activeCategory}
          searchQuery={searchQuery}
          sortOrder={sortOrder}
          minPrice={minPrice}
          maxPrice={maxPrice}
          onSelect={setSelectedGame}
        />
      </section>

      <HowItWorks />
      <Testimonials />
      <RentalForm defaultGame={prefilledGame} />

      <GameModal
        game={selectedGame}
        onClose={() => setSelectedGame(null)}
        onRentNow={handleRentNow}
      />
    </main>
  );
}
