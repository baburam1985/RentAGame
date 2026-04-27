"use client";

import { useState } from "react";

type Props = {
  defaultGame?: string;
};

type FormState = {
  name: string;
  email: string;
  phone: string;
  eventDate: string;
  returnDate: string;
  games: string;
  address: string;
  notes: string;
};

type Errors = Partial<Record<keyof FormState, string>>;

const empty: FormState = {
  name: "",
  email: "",
  phone: "",
  eventDate: "",
  returnDate: "",
  games: "",
  address: "",
  notes: "",
};

function getTodayString(): string {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export default function RentalForm({ defaultGame = "" }: Props) {
  const [form, setForm] = useState<FormState>({ ...empty, games: defaultGame });
  const [errors, setErrors] = useState<Errors>({});
  const [submitted, setSubmitted] = useState(false);

  function validateEventDate(value: string): string | undefined {
    if (!value) return "Event date is required.";
    const today = getTodayString();
    if (value < today) return "Start date must be today or later";
    return undefined;
  }

  function validateReturnDate(value: string, eventDate: string): string | undefined {
    if (!value) return "Return date is required.";
    if (eventDate && value <= eventDate) return "End date must be after start date";
    return undefined;
  }

  function validate(): Errors {
    const e: Errors = {};
    if (!form.name.trim()) e.name = "Name is required.";
    if (!form.email.trim()) {
      e.email = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      e.email = "Please enter a valid email address.";
    }
    if (!form.phone.trim()) e.phone = "Phone is required.";

    const eventDateError = validateEventDate(form.eventDate);
    if (eventDateError) e.eventDate = eventDateError;

    const returnDateError = validateReturnDate(form.returnDate, form.eventDate);
    if (returnDateError) e.returnDate = returnDateError;

    if (!form.games.trim()) e.games = "Please tell us which game(s) you want.";
    if (!form.address.trim()) e.address = "Event address is required.";
    return e;
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;
    setSubmitted(true);
    setForm({ ...empty, games: defaultGame });
  }

  function handleEventDateBlur() {
    const err = validateEventDate(form.eventDate);
    setErrors((prev) => ({ ...prev, eventDate: err }));
  }

  function handleReturnDateBlur() {
    const err = validateReturnDate(form.returnDate, form.eventDate);
    setErrors((prev) => ({ ...prev, returnDate: err }));
  }

  function field(
    id: keyof FormState,
    label: string,
    type: string = "text",
    required = true
  ) {
    return (
      <div className="flex flex-col gap-1">
        <label htmlFor={id} className="text-sm font-medium text-gray-700">
          {label}
          {required && <span className="text-red-500 ml-0.5">*</span>}
        </label>
        <input
          id={id}
          type={type}
          value={form[id]}
          onChange={(e) => {
            setForm((prev) => ({ ...prev, [id]: e.target.value }));
            if (errors[id]) setErrors((prev) => ({ ...prev, [id]: undefined }));
          }}
          className={`rounded-xl border px-4 py-2.5 text-sm text-gray-900 outline-none transition-colors focus:ring-2 focus:ring-yellow-400 ${
            errors[id] ? "border-red-400 bg-red-50" : "border-gray-200 bg-white"
          }`}
        />
        {errors[id] && (
          <p className="text-xs text-red-500">{errors[id]}</p>
        )}
      </div>
    );
  }

  function dateField(
    id: "eventDate" | "returnDate",
    label: string,
    onBlur: () => void
  ) {
    const errorId = `${id}-error`;
    return (
      <div className="flex flex-col gap-1">
        <label htmlFor={id} className="text-sm font-medium text-gray-700">
          {label}
          <span className="text-red-500 ml-0.5">*</span>
        </label>
        <input
          id={id}
          type="date"
          value={form[id]}
          onChange={(e) => {
            setForm((prev) => ({ ...prev, [id]: e.target.value }));
            if (errors[id]) setErrors((prev) => ({ ...prev, [id]: undefined }));
          }}
          onBlur={onBlur}
          aria-describedby={errors[id] ? errorId : undefined}
          className={`rounded-xl border px-4 py-2.5 text-sm text-gray-900 outline-none transition-colors focus:ring-2 focus:ring-yellow-400 ${
            errors[id] ? "border-red-400 bg-red-50" : "border-gray-200 bg-white"
          }`}
        />
        {errors[id] && (
          <p id={errorId} className="text-xs text-red-500">{errors[id]}</p>
        )}
      </div>
    );
  }

  return (
    <section id="contact" className="py-20 bg-white">
      <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 text-center">
          <h2 className="text-3xl font-bold text-gray-900">Request a Rental</h2>
          <p className="mt-3 text-gray-500">
            No account needed. We&apos;ll get back to you within 24 hours.
          </p>
        </div>

        {submitted ? (
          <div className="rounded-2xl bg-green-50 border border-green-200 p-8 text-center">
            <h3 className="text-xl font-bold text-green-800 mb-2">
              Request Received!
            </h3>
            <p className="text-green-700">
              Thanks! We will contact you within 24 hours to confirm your rental.
            </p>
            <button
              onClick={() => setSubmitted(false)}
              className="mt-5 text-sm font-medium text-green-700 underline"
            >
              Submit another request
            </button>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            noValidate
            className="bg-gray-50 rounded-2xl p-8 flex flex-col gap-5 border border-gray-100 shadow-sm"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {field("name", "Your Name")}
              {field("email", "Email", "email")}
              {field("phone", "Phone", "tel")}
              {dateField("eventDate", "Event Date", handleEventDateBlur)}
              {dateField("returnDate", "Return Date", handleReturnDateBlur)}
              {field("address", "Event Address")}
            </div>

            <div className="flex flex-col gap-1">
              <label htmlFor="games" className="text-sm font-medium text-gray-700">
                Game(s) Wanted<span className="text-red-500 ml-0.5">*</span>
              </label>
              <textarea
                id="games"
                rows={2}
                value={form.games}
                onChange={(e) => {
                  setForm((prev) => ({ ...prev, games: e.target.value }));
                  if (errors.games)
                    setErrors((prev) => ({ ...prev, games: undefined }));
                }}
                className={`rounded-xl border px-4 py-2.5 text-sm text-gray-900 outline-none transition-colors focus:ring-2 focus:ring-yellow-400 resize-none ${
                  errors.games ? "border-red-400 bg-red-50" : "border-gray-200 bg-white"
                }`}
              />
              {errors.games && (
                <p className="text-xs text-red-500">{errors.games}</p>
              )}
            </div>

            <div className="flex flex-col gap-1">
              <label htmlFor="notes" className="text-sm font-medium text-gray-700">
                Additional Notes
              </label>
              <textarea
                id="notes"
                rows={3}
                value={form.notes}
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, notes: e.target.value }))
                }
                className="rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm text-gray-900 outline-none focus:ring-2 focus:ring-yellow-400 resize-none"
              />
            </div>

            <button
              type="submit"
              className="w-full rounded-full py-3.5 text-sm font-semibold text-gray-900 hover:brightness-95 transition-all shadow-sm mt-2"
              style={{ backgroundColor: "var(--color-accent)" }}
            >
              Send Rental Request
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
