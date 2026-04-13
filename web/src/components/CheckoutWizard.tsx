"use client";

import { useState } from "react";

type DateStep = {
  eventDate: string;
  returnDate: string;
  games: string;
};

type ContactStep = {
  name: string;
  email: string;
  phone: string;
  address: string;
  notes: string;
};

type Props = {
  pricePerDay?: number;
};

const STEP_LABELS = ["Date Selection", "Contact Info", "Review & Confirm"] as const;

export default function CheckoutWizard({ pricePerDay = 35 }: Props) {
  const [step, setStep] = useState(1);
  const [dateStep, setDateStep] = useState<DateStep>({
    eventDate: "",
    returnDate: "",
    games: "",
  });
  const [contactStep, setContactStep] = useState<ContactStep>({
    name: "",
    email: "",
    phone: "",
    address: "",
    notes: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const rentalDays =
    dateStep.eventDate && dateStep.returnDate
      ? Math.max(
          0,
          Math.ceil(
            (new Date(dateStep.returnDate).getTime() -
              new Date(dateStep.eventDate).getTime()) /
              (1000 * 60 * 60 * 24)
          )
        )
      : 0;
  const totalPrice = rentalDays * pricePerDay;

  if (submitted) {
    return (
      <section id="contact" className="py-20 bg-white">
        <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8 text-center">
          <div className="rounded-2xl bg-green-50 border border-green-200 p-8">
            <h3 className="text-xl font-bold text-green-800 mb-2">Order Confirmed!</h3>
            <p className="text-green-700">
              Thanks! We will contact you within 24 hours to confirm your rental.
            </p>
            <button
              onClick={() => {
                setSubmitted(false);
                setStep(1);
                setDateStep({ eventDate: "", returnDate: "", games: "" });
                setContactStep({ name: "", email: "", phone: "", address: "", notes: "" });
              }}
              className="mt-5 text-sm font-medium text-green-700 underline"
            >
              Book another rental
            </button>
          </div>
        </div>
      </section>
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

        {/* Progress indicator */}
        <div className="mb-4 flex items-center justify-center gap-2 text-sm text-gray-500">
          <span className="font-medium text-gray-900">Step {step} of 3</span>
          <span>—</span>
          <span>{STEP_LABELS[step - 1]}</span>
        </div>

        {/* Step dots */}
        <div className="mb-8 flex justify-center gap-3">
          {[1, 2, 3].map((s) => (
            <div
              key={s}
              className={`h-2 w-8 rounded-full ${
                s === step
                  ? "bg-yellow-400"
                  : s < step
                  ? "bg-yellow-200"
                  : "bg-gray-200"
              }`}
            />
          ))}
        </div>

        <div className="bg-gray-50 rounded-2xl p-8 border border-gray-100 shadow-sm">
          {/* Step 1: Date Selection */}
          {step === 1 && (
            <div className="flex flex-col gap-5">
              <h3 className="text-lg font-semibold text-gray-900">Date Selection</h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="flex flex-col gap-1">
                  <label htmlFor="eventDate" className="text-sm font-medium text-gray-700">
                    Event Date<span className="text-red-500 ml-0.5">*</span>
                  </label>
                  <input
                    id="eventDate"
                    type="date"
                    value={dateStep.eventDate}
                    onChange={(e) =>
                      setDateStep((prev) => ({ ...prev, eventDate: e.target.value }))
                    }
                    className="rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm text-gray-900 outline-none focus:ring-2 focus:ring-yellow-400"
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <label htmlFor="returnDate" className="text-sm font-medium text-gray-700">
                    Return Date<span className="text-red-500 ml-0.5">*</span>
                  </label>
                  <input
                    id="returnDate"
                    type="date"
                    value={dateStep.returnDate}
                    onChange={(e) =>
                      setDateStep((prev) => ({ ...prev, returnDate: e.target.value }))
                    }
                    className="rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm text-gray-900 outline-none focus:ring-2 focus:ring-yellow-400"
                  />
                </div>
              </div>

              {rentalDays > 0 && (
                <div className="rounded-xl bg-yellow-50 border border-yellow-200 p-4">
                  <p className="text-sm text-gray-700">
                    <span className="font-medium">{rentalDays} days</span> rental &bull;{" "}
                    Estimated total:{" "}
                    <span className="font-medium">${totalPrice}</span>
                  </p>
                </div>
              )}

              <div className="flex flex-col gap-1">
                <label htmlFor="games" className="text-sm font-medium text-gray-700">
                  Game(s) Wanted<span className="text-red-500 ml-0.5">*</span>
                </label>
                <textarea
                  id="games"
                  rows={2}
                  value={dateStep.games}
                  onChange={(e) =>
                    setDateStep((prev) => ({ ...prev, games: e.target.value }))
                  }
                  className="rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm text-gray-900 outline-none focus:ring-2 focus:ring-yellow-400 resize-none"
                />
              </div>

              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="rounded-full px-6 py-2.5 text-sm font-semibold text-gray-900 hover:brightness-95 transition-all shadow-sm"
                  style={{ backgroundColor: "var(--color-accent)" }}
                >
                  Next
                </button>
              </div>
            </div>
          )}

          {/* Step 2: Contact Info */}
          {step === 2 && (
            <div className="flex flex-col gap-5">
              <h3 className="text-lg font-semibold text-gray-900">Contact Info</h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="flex flex-col gap-1">
                  <label htmlFor="name" className="text-sm font-medium text-gray-700">
                    Your Name<span className="text-red-500 ml-0.5">*</span>
                  </label>
                  <input
                    id="name"
                    type="text"
                    value={contactStep.name}
                    onChange={(e) =>
                      setContactStep((prev) => ({ ...prev, name: e.target.value }))
                    }
                    className="rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm text-gray-900 outline-none focus:ring-2 focus:ring-yellow-400"
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <label htmlFor="email" className="text-sm font-medium text-gray-700">
                    Email<span className="text-red-500 ml-0.5">*</span>
                  </label>
                  <input
                    id="email"
                    type="email"
                    value={contactStep.email}
                    onChange={(e) =>
                      setContactStep((prev) => ({ ...prev, email: e.target.value }))
                    }
                    className="rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm text-gray-900 outline-none focus:ring-2 focus:ring-yellow-400"
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <label htmlFor="phone" className="text-sm font-medium text-gray-700">
                    Phone<span className="text-red-500 ml-0.5">*</span>
                  </label>
                  <input
                    id="phone"
                    type="tel"
                    value={contactStep.phone}
                    onChange={(e) =>
                      setContactStep((prev) => ({ ...prev, phone: e.target.value }))
                    }
                    className="rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm text-gray-900 outline-none focus:ring-2 focus:ring-yellow-400"
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <label htmlFor="address" className="text-sm font-medium text-gray-700">
                    Event Address<span className="text-red-500 ml-0.5">*</span>
                  </label>
                  <input
                    id="address"
                    type="text"
                    value={contactStep.address}
                    onChange={(e) =>
                      setContactStep((prev) => ({ ...prev, address: e.target.value }))
                    }
                    className="rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm text-gray-900 outline-none focus:ring-2 focus:ring-yellow-400"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1">
                <label htmlFor="notes" className="text-sm font-medium text-gray-700">
                  Additional Notes
                </label>
                <textarea
                  id="notes"
                  rows={3}
                  value={contactStep.notes}
                  onChange={(e) =>
                    setContactStep((prev) => ({ ...prev, notes: e.target.value }))
                  }
                  className="rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm text-gray-900 outline-none focus:ring-2 focus:ring-yellow-400 resize-none"
                />
              </div>

              <div className="flex justify-between">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="rounded-full px-6 py-2.5 text-sm font-medium text-gray-600 border border-gray-200 hover:bg-gray-100 transition-all"
                >
                  Back
                </button>
                <button
                  type="button"
                  onClick={() => setStep(3)}
                  className="rounded-full px-6 py-2.5 text-sm font-semibold text-gray-900 hover:brightness-95 transition-all shadow-sm"
                  style={{ backgroundColor: "var(--color-accent)" }}
                >
                  Next
                </button>
              </div>
            </div>
          )}

          {/* Step 3: Review & Confirm */}
          {step === 3 && (
            <div className="flex flex-col gap-5">
              <h3 className="text-lg font-semibold text-gray-900">Review & Confirm</h3>

              <div className="rounded-xl bg-white border border-gray-200 p-5 flex flex-col gap-4 text-sm">
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Order Summary</h4>
                  <dl className="grid grid-cols-2 gap-x-4 gap-y-1 text-gray-600">
                    <dt>Event Date:</dt>
                    <dd>{dateStep.eventDate || "—"}</dd>
                    <dt>Return Date:</dt>
                    <dd>{dateStep.returnDate || "—"}</dd>
                    <dt>Rental Days:</dt>
                    <dd>{rentalDays > 0 ? `${rentalDays} days` : "—"}</dd>
                    <dt>Games:</dt>
                    <dd>{dateStep.games || "—"}</dd>
                    <dt>Estimated Total:</dt>
                    <dd>{rentalDays > 0 ? `$${totalPrice}` : "—"}</dd>
                  </dl>
                </div>

                <hr className="border-gray-100" />

                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Contact</h4>
                  <dl className="grid grid-cols-2 gap-x-4 gap-y-1 text-gray-600">
                    <dt>Name:</dt>
                    <dd>{contactStep.name || "—"}</dd>
                    <dt>Email:</dt>
                    <dd>{contactStep.email || "—"}</dd>
                    <dt>Phone:</dt>
                    <dd>{contactStep.phone || "—"}</dd>
                    <dt>Address:</dt>
                    <dd>{contactStep.address || "—"}</dd>
                    {contactStep.notes && (
                      <>
                        <dt>Notes:</dt>
                        <dd>{contactStep.notes}</dd>
                      </>
                    )}
                  </dl>
                </div>
              </div>

              <div className="flex justify-between">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="rounded-full px-6 py-2.5 text-sm font-medium text-gray-600 border border-gray-200 hover:bg-gray-100 transition-all"
                >
                  Back
                </button>
                <button
                  type="button"
                  onClick={() => setSubmitted(true)}
                  className="rounded-full px-6 py-2.5 text-sm font-semibold text-gray-900 hover:brightness-95 transition-all shadow-sm"
                  style={{ backgroundColor: "var(--color-accent)" }}
                >
                  Place Order
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
