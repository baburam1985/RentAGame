"use client";

import { useState } from "react";
import Hero from "@/components/Hero";
import CategoryFilter from "@/components/CategoryFilter";
import SearchBar from "@/components/SearchBar";
import SortDropdown from "@/components/SortDropdown";
import PlayerCountFilter from "@/components/PlayerCountFilter";
import GameGrid from "@/components/GameGrid";
import HowItWorks from "@/components/HowItWorks";
import Testimonials from "@/components/Testimonials";
import RentalForm from "@/components/RentalForm";

export default function Home() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOrder, setSortOrder] = useState("featured");
  const [selectedPlayerCounts, setSelectedPlayerCounts] = useState<string[]>(
    []
  );

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
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-2 pb-2">
          <PlayerCountFilter
            selectedCounts={selectedPlayerCounts}
            onCountsChange={setSelectedPlayerCounts}
          />
        </div>
        <GameGrid
          activeCategory={activeCategory}
          searchQuery={searchQuery}
          sortOrder={sortOrder}
          selectedPlayerCounts={selectedPlayerCounts}
        />
      </section>

      <HowItWorks />
      <Testimonials />
      <RentalForm defaultGame="" />
    </main>
  );
}
