"use client";

type CartItem = {
  gameName: string;
  pricePerDay: number;
  days: number;
};

type CartDrawerProps = {
  items: CartItem[];
  onRemove: (index: number) => void;
  isOpen: boolean;
};

export default function CartDrawer({ items, onRemove, isOpen }: CartDrawerProps) {
  if (!isOpen) return null;

  const total = items.reduce((sum, item) => sum + item.pricePerDay * item.days, 0);

  return (
    <aside
      className="fixed inset-y-0 right-0 z-50 w-80 bg-white shadow-xl flex flex-col"
      aria-label="Cart"
    >
      <div className="flex items-center justify-between p-4 border-b">
        <h2 className="text-lg font-bold text-gray-900">Your Cart</h2>
      </div>

      <ul className="flex-1 overflow-y-auto p-4 flex flex-col gap-3">
        {items.map((item, index) => (
          <li key={index} className="flex justify-between items-center border rounded-lg p-3">
            <div>
              <p className="font-medium text-gray-900">{item.gameName}</p>
              <p className="text-sm text-gray-500">
                ${item.pricePerDay}/day × {item.days} day{item.days !== 1 ? "s" : ""}
              </p>
            </div>
            <button
              onClick={() => onRemove(index)}
              aria-label="Remove"
              className="text-sm text-red-500 hover:text-red-700 ml-2"
            >
              Remove
            </button>
          </li>
        ))}
      </ul>

      <div className="p-4 border-t">
        <div className="flex justify-between items-center text-lg font-bold text-gray-900">
          <span>Total</span>
          <span>${total}</span>
        </div>
      </div>
    </aside>
  );
}
