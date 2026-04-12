"use client";

import { useState } from "react";
import Hero from "@/components/Hero";
import CategoryFilter from "@/components/CategoryFilter";
import SearchBar from "@/components/SearchBar";
import GameGrid from "@/components/GameGrid";
import GameModal from "@/components/GameModal";
import HowItWorks from "@/components/HowItWorks";
import Testimonials from "@/components/Testimonials";
import RentalForm from "@/components/RentalForm";
import type { Game } from "@/data/games";

export default function Home() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
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
    <main>
      <Hero />

      <section id="catalog" className="bg-white">
        <CategoryFilter
          activeCategory={activeCategory}
          onCategoryChange={setActiveCategory}
        />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-4">
          <SearchBar
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
          />
        </div>
        <GameGrid
          activeCategory={activeCategory}
          searchQuery={searchQuery}
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
