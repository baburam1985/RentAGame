import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { games } from "@/data/games";
import GameDetailClient from "./GameDetailClient";

type Props = {
  params: Promise<{ id: string }>;
};

export async function generateStaticParams() {
  return games.map((g) => ({ id: g.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const game = games.find((g) => g.id === id);
  if (!game) {
    return { title: "Game Not Found — RentAGame" };
  }
  return {
    title: `${game.name} — RentAGame`,
    description: game.description,
  };
}

export default async function GameDetailPage({ params }: Props) {
  const { id } = await params;
  const game = games.find((g) => g.id === id);

  if (!game) {
    notFound();
  }

  return <GameDetailClient game={game} />;
}
