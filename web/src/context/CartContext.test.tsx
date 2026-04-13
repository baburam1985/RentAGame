import { describe, it, expect, beforeEach } from "vitest";
import { render, screen, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { CartProvider, useCart } from "./CartContext";

// Helper component that exposes CartContext actions and state via the DOM
function CartTestHarness() {
  const { items, addItem, removeItem, updateDays, clearCart, totalItems } =
    useCart();

  return (
    <div>
      <p data-testid="total-items">{totalItems}</p>
      <ul>
        {items.map((item) => (
          <li key={item.gameId} data-testid={`item-${item.gameId}`}>
            {item.gameName} — {item.days} day(s) — ${item.pricePerDay}/day
          </li>
        ))}
      </ul>
      <button
        onClick={() =>
          addItem({
            gameId: "game-1",
            gameName: "Cornhole",
            pricePerDay: 25,
            days: 2,
            image: "/cornhole.jpg",
          })
        }
      >
        Add game-1
      </button>
      <button
        onClick={() =>
          addItem({
            gameId: "game-2",
            gameName: "Jenga",
            pricePerDay: 15,
            days: 1,
            image: "/jenga.jpg",
          })
        }
      >
        Add game-2
      </button>
      <button onClick={() => removeItem("game-1")}>Remove game-1</button>
      <button onClick={() => updateDays("game-1", 5)}>Update game-1 days to 5</button>
      <button onClick={() => updateDays("game-1", 0)}>Update game-1 days to 0</button>
      <button onClick={() => updateDays("game-1", 99)}>Update game-1 days to 99</button>
      <button onClick={clearCart}>Clear cart</button>
    </div>
  );
}

function renderWithProvider() {
  return render(
    <CartProvider>
      <CartTestHarness />
    </CartProvider>
  );
}

beforeEach(() => {
  localStorage.clear();
});

describe("CartContext", () => {
  describe("addItem", () => {
    it("adds a new item to the cart", async () => {
      renderWithProvider();
      await userEvent.click(screen.getByText("Add game-1"));
      expect(screen.getByTestId("item-game-1")).toBeInTheDocument();
      expect(screen.getByTestId("total-items")).toHaveTextContent("1");
    });

    it("adds multiple distinct items", async () => {
      renderWithProvider();
      await userEvent.click(screen.getByText("Add game-1"));
      await userEvent.click(screen.getByText("Add game-2"));
      expect(screen.getByTestId("item-game-1")).toBeInTheDocument();
      expect(screen.getByTestId("item-game-2")).toBeInTheDocument();
      expect(screen.getByTestId("total-items")).toHaveTextContent("2");
    });

    it("updates days of an existing item instead of adding a duplicate", async () => {
      renderWithProvider();
      await userEvent.click(screen.getByText("Add game-1")); // adds with days=2
      await userEvent.click(screen.getByText("Update game-1 days to 5"));
      // Adding game-1 again (days=2) should overwrite, not duplicate
      await userEvent.click(screen.getByText("Add game-1"));
      expect(screen.getByTestId("total-items")).toHaveTextContent("1");
      expect(screen.getByTestId("item-game-1")).toHaveTextContent("2 day(s)");
    });
  });

  describe("removeItem", () => {
    it("removes an item from the cart", async () => {
      renderWithProvider();
      await userEvent.click(screen.getByText("Add game-1"));
      await userEvent.click(screen.getByText("Remove game-1"));
      expect(screen.queryByTestId("item-game-1")).not.toBeInTheDocument();
      expect(screen.getByTestId("total-items")).toHaveTextContent("0");
    });

    it("only removes the specified item", async () => {
      renderWithProvider();
      await userEvent.click(screen.getByText("Add game-1"));
      await userEvent.click(screen.getByText("Add game-2"));
      await userEvent.click(screen.getByText("Remove game-1"));
      expect(screen.queryByTestId("item-game-1")).not.toBeInTheDocument();
      expect(screen.getByTestId("item-game-2")).toBeInTheDocument();
    });
  });

  describe("updateDays", () => {
    it("updates the number of days for an item", async () => {
      renderWithProvider();
      await userEvent.click(screen.getByText("Add game-1"));
      await userEvent.click(screen.getByText("Update game-1 days to 5"));
      expect(screen.getByTestId("item-game-1")).toHaveTextContent("5 day(s)");
    });

    it("clamps days to minimum 1", async () => {
      renderWithProvider();
      await userEvent.click(screen.getByText("Add game-1"));
      await userEvent.click(screen.getByText("Update game-1 days to 0"));
      expect(screen.getByTestId("item-game-1")).toHaveTextContent("1 day(s)");
    });

    it("clamps days to maximum 14", async () => {
      renderWithProvider();
      await userEvent.click(screen.getByText("Add game-1"));
      await userEvent.click(screen.getByText("Update game-1 days to 99"));
      expect(screen.getByTestId("item-game-1")).toHaveTextContent("14 day(s)");
    });
  });

  describe("clearCart", () => {
    it("removes all items from the cart", async () => {
      renderWithProvider();
      await userEvent.click(screen.getByText("Add game-1"));
      await userEvent.click(screen.getByText("Add game-2"));
      await userEvent.click(screen.getByText("Clear cart"));
      expect(screen.queryByTestId("item-game-1")).not.toBeInTheDocument();
      expect(screen.queryByTestId("item-game-2")).not.toBeInTheDocument();
      expect(screen.getByTestId("total-items")).toHaveTextContent("0");
    });
  });

  describe("localStorage persistence", () => {
    it("persists cart to localStorage after adding items", async () => {
      renderWithProvider();
      await userEvent.click(screen.getByText("Add game-1"));
      const stored = JSON.parse(localStorage.getItem("rg_cart") ?? "[]");
      expect(stored).toHaveLength(1);
      expect(stored[0].gameId).toBe("game-1");
    });

    it("rehydrates cart from localStorage on mount", async () => {
      localStorage.setItem(
        "rg_cart",
        JSON.stringify([
          {
            gameId: "game-2",
            gameName: "Jenga",
            pricePerDay: 15,
            days: 3,
            image: "/jenga.jpg",
          },
        ])
      );
      renderWithProvider();
      // Wait for hydration effect
      await act(async () => {});
      expect(screen.getByTestId("item-game-2")).toBeInTheDocument();
      expect(screen.getByTestId("total-items")).toHaveTextContent("1");
    });
  });
});
