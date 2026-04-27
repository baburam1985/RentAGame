"use client";

import { useState, useEffect, useCallback } from "react";
import { games as allGames } from "@/data/games";
import type { Game } from "@/data/games";

type InventoryOverride = {
  id: string;
  pricePerDay?: number;
  hidden?: boolean;
};

function loadOverrides(): InventoryOverride[] {
  if (typeof window === "undefined") return [];
  try {
    const stored = localStorage.getItem("rg_inventory");
    if (!stored) return [];
    return JSON.parse(stored) as InventoryOverride[];
  } catch {
    return [];
  }
}

function saveOverrides(overrides: InventoryOverride[]): void {
  localStorage.setItem("rg_inventory", JSON.stringify(overrides));
}

function getEffectiveGame(
  game: Game,
  overrides: InventoryOverride[]
): Game & { hidden: boolean } {
  const override = overrides.find((o) => o.id === game.id);
  return {
    ...game,
    pricePerDay: override?.pricePerDay ?? game.pricePerDay,
    hidden: override?.hidden ?? false,
  };
}

type EditPanelProps = {
  game: Game & { hidden: boolean };
  onClose: () => void;
  onSave: (updated: Partial<Game> & { hidden: boolean }) => void;
};

function EditPanel({ game, onClose, onSave }: EditPanelProps) {
  const [name, setName] = useState(game.name);
  const [category, setCategory] = useState(game.category);
  const [price, setPrice] = useState(String(game.pricePerDay));
  const [players, setPlayers] = useState(game.players);
  const [description, setDescription] = useState(game.description);
  const [hidden, setHidden] = useState(game.hidden);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    onSave({
      name,
      category,
      pricePerDay: Number(price) || game.pricePerDay,
      players,
      description,
      hidden,
    });
    onClose();
  }

  return (
    <div
      role="dialog"
      aria-label={`Edit ${game.name}`}
      aria-modal="true"
      className="fixed inset-0 z-50 flex"
    >
      {/* Backdrop */}
      <div
        className="flex-1 bg-black/40"
        onClick={onClose}
        aria-hidden="true"
      />
      {/* Panel */}
      <div className="w-full max-w-md bg-white shadow-xl flex flex-col">
        <div className="flex items-center justify-between px-6 py-4 border-b">
          <h2 className="text-lg font-bold text-gray-900">Edit Game</h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close edit panel"
            className="rounded-full p-1 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="h-5 w-5"
              aria-hidden="true"
            >
              <path d="M5.28 4.22a.75.75 0 0 0-1.06 1.06L6.94 8l-2.72 2.72a.75.75 0 1 0 1.06 1.06L8 9.06l2.72 2.72a.75.75 0 1 0 1.06-1.06L9.06 8l2.72-2.72a.75.75 0 0 0-1.06-1.06L8 6.94 5.28 4.22Z" />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
          <div>
            <label htmlFor="edit-name" className="block text-sm font-medium text-gray-700 mb-1">
              Name
            </label>
            <input
              id="edit-name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label htmlFor="edit-category" className="block text-sm font-medium text-gray-700 mb-1">
              Category
            </label>
            <input
              id="edit-category"
              type="text"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label htmlFor="edit-price" className="block text-sm font-medium text-gray-700 mb-1">
              Price per day ($)
            </label>
            <input
              id="edit-price"
              type="number"
              min="0"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label htmlFor="edit-players" className="block text-sm font-medium text-gray-700 mb-1">
              Players
            </label>
            <input
              id="edit-players"
              type="text"
              value={players}
              onChange={(e) => setPlayers(e.target.value)}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label htmlFor="edit-description" className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              id="edit-description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex items-center gap-3">
            <label htmlFor="edit-hidden" className="text-sm font-medium text-gray-700">
              Hidden on public page
            </label>
            <input
              id="edit-hidden"
              type="checkbox"
              checked={hidden}
              onChange={(e) => setHidden(e.target.checked)}
              className="h-4 w-4 rounded border-gray-300"
            />
          </div>

          <div className="flex gap-3 pt-2">
            <button
              type="submit"
              className="flex-1 rounded-lg bg-blue-900 py-2 text-sm font-semibold text-white hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Save Changes
            </button>
            <button
              type="button"
              onClick={onClose}
              className="flex-1 rounded-lg border border-gray-300 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-400"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default function InventoryPage() {
  const [overrides, setOverrides] = useState<InventoryOverride[]>([]);
  const [editingGame, setEditingGame] = useState<(Game & { hidden: boolean }) | null>(null);

  useEffect(() => {
    setOverrides(loadOverrides());
  }, []);

  const updateOverride = useCallback(
    (id: string, update: Partial<InventoryOverride>) => {
      setOverrides((prev) => {
        const exists = prev.find((o) => o.id === id);
        let next: InventoryOverride[];
        if (exists) {
          next = prev.map((o) => (o.id === id ? { ...o, ...update } : o));
        } else {
          next = [...prev, { id, ...update }];
        }
        saveOverrides(next);
        return next;
      });
    },
    []
  );

  function handlePriceBlur(game: Game, value: string) {
    const parsed = Number(value);
    if (!isNaN(parsed) && parsed > 0) {
      updateOverride(game.id, { pricePerDay: parsed });
    }
  }

  function handleToggleStatus(game: Game, currentHidden: boolean) {
    updateOverride(game.id, { hidden: !currentHidden });
  }

  function handleEdit(game: Game & { hidden: boolean }) {
    setEditingGame(game);
  }

  function handleSave(updated: Partial<Game> & { hidden: boolean }) {
    if (!editingGame) return;
    updateOverride(editingGame.id, {
      pricePerDay: updated.pricePerDay,
      hidden: updated.hidden,
    });
  }

  const effectiveGames = allGames.map((g) => getEffectiveGame(g, overrides));

  return (
    <div className="min-h-screen bg-[#fffde1] p-6">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Inventory Management</h1>

      <div className="overflow-x-auto rounded-2xl shadow-sm bg-white">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="border-b bg-gray-50">
              <th
                scope="col"
                className="px-4 py-3 text-left font-semibold text-gray-700"
              >
                Name
              </th>
              <th
                scope="col"
                className="px-4 py-3 text-left font-semibold text-gray-700"
              >
                Category
              </th>
              <th
                scope="col"
                className="px-4 py-3 text-left font-semibold text-gray-700"
              >
                Price/day
              </th>
              <th
                scope="col"
                className="px-4 py-3 text-left font-semibold text-gray-700"
              >
                Players
              </th>
              <th
                scope="col"
                className="px-4 py-3 text-left font-semibold text-gray-700"
              >
                Status
              </th>
              <th
                scope="col"
                className="px-4 py-3 text-left font-semibold text-gray-700"
              >
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {effectiveGames.map((game) => (
              <tr
                key={game.id}
                className={`border-b last:border-0 transition-colors ${
                  game.hidden ? "bg-gray-50 opacity-60" : "bg-white"
                }`}
              >
                <td className="px-4 py-3 font-medium text-gray-900">
                  {game.name}
                </td>
                <td className="px-4 py-3 text-gray-600">{game.category}</td>
                <td className="px-4 py-3">
                  <input
                    type="number"
                    min="0"
                    aria-label={`Price per day for ${game.name}`}
                    defaultValue={game.pricePerDay}
                    key={`${game.id}-${game.pricePerDay}`}
                    onBlur={(e) => handlePriceBlur(game, e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        (e.target as HTMLInputElement).blur();
                      }
                    }}
                    className="w-20 rounded border border-gray-300 px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </td>
                <td className="px-4 py-3 text-gray-600">{game.players}</td>
                <td className="px-4 py-3">
                  <button
                    type="button"
                    role="switch"
                    aria-checked={!game.hidden}
                    aria-label={`Toggle availability for ${game.name}`}
                    onClick={() => handleToggleStatus(game, game.hidden)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      !game.hidden ? "bg-green-500" : "bg-gray-300"
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform ${
                        !game.hidden ? "translate-x-6" : "translate-x-1"
                      }`}
                    />
                  </button>
                  <span className="ml-2 text-xs text-gray-500">
                    {game.hidden ? "Hidden" : "Available"}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <button
                    type="button"
                    aria-label={`Edit ${game.name}`}
                    onClick={() => handleEdit(game)}
                    className="rounded-lg bg-blue-900 px-3 py-1.5 text-xs font-semibold text-white hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
                  >
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {editingGame && (
        <EditPanel
          game={editingGame}
          onClose={() => setEditingGame(null)}
          onSave={handleSave}
        />
      )}
    </div>
  );
}
