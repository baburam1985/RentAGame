"use client";

import { useState } from "react";
import Image from "next/image";
import { notFound, useParams } from "next/navigation";
import Link from "next/link";
import { games } from "@/data/games";
import GameDetailClient from "./GameDetailClient";

export default function GameDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [activeImage, setActiveImage] = useState(0);

  const game = games.find((g) => g.id === id);
  if (!game) notFound();

  return (
    <main className="min-h-screen" style={{ background: "#fffde1" }}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 pb-28 lg:pb-10">
        {/* Back */}
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-sm font-bold text-blue-800 hover:text-blue-900 mb-8 transition-colors"
        >
          <span className="material-symbols-outlined" style={{ fontSize: "18px" }}>arrow_back</span>
          Back to Games
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* ── LEFT: Image gallery ── */}
          <div className="flex flex-col gap-3">
            {/* Main image */}
            <div className="relative w-full aspect-[4/3] rounded-3xl overflow-hidden bg-gray-100 shadow-md">
              <Image
                src={game.images[activeImage]}
                alt={`${game.name} — view ${activeImage + 1}`}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover transition-opacity duration-300"
                priority={activeImage === 0}
              />
              {/* Category badge */}
              <span className="absolute top-4 left-4 bg-yellow-400 text-blue-900 text-xs font-black px-3 py-1 rounded-full uppercase tracking-wide">
                {game.category}
              </span>
            </div>

            {/* Thumbnails */}
            <div className="grid grid-cols-4 gap-2">
              {game.images.map((src, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImage(i)}
                  className={`relative aspect-square rounded-xl overflow-hidden border-2 transition-all ${
                    activeImage === i
                      ? "border-blue-800 shadow-md scale-105"
                      : "border-transparent hover:border-blue-300 opacity-70 hover:opacity-100"
                  }`}
                  aria-label={`View image ${i + 1}`}
                >
                  <Image
                    src={src}
                    alt={`${game.name} thumbnail ${i + 1}`}
                    fill
                    sizes="25vw"
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* ── RIGHT: Details ── */}
          <div className="flex flex-col gap-6">
            {/* Title + Price */}
            <div>
              <h1 className="text-4xl font-black text-gray-900 leading-tight mb-1">
                {game.name}
              </h1>
              <p className="text-3xl font-black text-blue-800">
                ${game.pricePerDay}
                <span className="text-base font-normal text-gray-400 ml-1">/day</span>
              </p>
            </div>

            {/* Description */}
            <p className="text-gray-600 leading-relaxed">{game.description}</p>

            {/* Specs */}
            <div className="grid grid-cols-2 gap-3">
              <div className="flex items-center gap-3 bg-white rounded-2xl px-4 py-3 shadow-sm border border-gray-100">
                <span className="material-symbols-outlined text-blue-700">group</span>
                <div>
                  <p className="text-[10px] text-gray-400 font-semibold uppercase tracking-wide">Players</p>
                  <p className="text-sm font-bold text-gray-800">{game.players}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 bg-white rounded-2xl px-4 py-3 shadow-sm border border-gray-100">
                <span className="material-symbols-outlined text-blue-700">straighten</span>
                <div>
                  <p className="text-[10px] text-gray-400 font-semibold uppercase tracking-wide">Size</p>
                  <p className="text-sm font-bold text-gray-800">{game.dimensions}</p>
                </div>
              </div>
            </div>

            {/* How to Play */}
            <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
              <h2 className="text-sm font-black text-gray-900 uppercase tracking-widest mb-4 flex items-center gap-2">
                <span className="material-symbols-outlined text-orange-500">menu_book</span>
                How to Play
              </h2>
              <ol className="flex flex-col gap-3">
                {game.howToPlay.map((step, i) => (
                  <li key={i} className="flex gap-3 text-sm text-gray-700 leading-relaxed">
                    <span className="shrink-0 flex h-6 w-6 items-center justify-center rounded-full bg-yellow-400 text-blue-900 text-xs font-black mt-0.5">
                      {i + 1}
                    </span>
                    {step}
                  </li>
                ))}
              </ol>
            </div>

            {/* Cart interaction (client) */}
            <GameDetailClient game={game} />
          </div>
        </div>
      </div>
    </main>
  );
}
