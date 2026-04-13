"use client";

import { useState } from "react";

const faqs = [
  {
    question: "What's included with each game rental?",
    answer:
      "Every rental includes all components needed to play — pieces, boards, balls, or nets — along with a printed instruction sheet. We also provide a carrying bag or case where available so everything arrives and returns organised.",
  },
  {
    question: "How does delivery and pick-up work?",
    answer:
      "We deliver directly to your event location and set everything up before guests arrive. At the end of your rental period we return to collect the equipment. Delivery fees vary by distance and are shown at checkout.",
  },
  {
    question: "What is your cancellation policy?",
    answer:
      "Cancellations made more than 7 days before your event receive a full refund. Cancellations within 3–7 days receive a 50% refund. Cancellations within 72 hours are non-refundable, but you may reschedule to a future date at no extra charge.",
  },
  {
    question: "What happens if it rains on my event day?",
    answer:
      "We offer a free one-time rain reschedule if you contact us at least 24 hours before your event. For outdoor games, we also carry weatherproof options — ask us when booking and we'll recommend the best games for unpredictable weather.",
  },
  {
    question: "Am I responsible if equipment is damaged?",
    answer:
      "Normal wear and tear is covered. If equipment is damaged due to misuse or lost, we charge a replacement fee equal to the retail cost of the affected item. We recommend keeping games away from open flame and water unless the game is rated for outdoor/water use.",
  },
  {
    question: "How far in advance should I book?",
    answer:
      "We recommend booking at least 1 week in advance to guarantee availability, especially for popular games and weekend dates. Last-minute bookings (less than 48 hours) are sometimes possible — contact us directly and we'll do our best.",
  },
  {
    question: "Can I rent multiple games for the same event?",
    answer:
      "Absolutely! Add as many games as you need to your cart and complete a single checkout. Renting 3 or more games for the same event qualifies for a bundle discount — the discount is applied automatically at checkout.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  function toggle(index: number) {
    setOpenIndex(openIndex === index ? null : index);
  }

  return (
    <section className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-16">
      <h2 className="text-2xl font-bold text-blue-900 mb-8 text-center">
        Frequently Asked Questions
      </h2>
      <div className="space-y-2">
        {faqs.map((faq, index) => {
          const panelId = `faq-answer-${index}`;
          const isOpen = openIndex === index;
          return (
            <div
              key={index}
              className="rounded-xl border border-blue-100 bg-white overflow-hidden"
            >
              <button
                onClick={() => toggle(index)}
                aria-expanded={isOpen}
                aria-controls={panelId}
                className="w-full flex items-center justify-between px-5 py-4 text-left font-semibold text-blue-900 hover:bg-blue-50 transition-colors"
              >
                <span>{faq.question}</span>
                <span
                  className={`ml-4 shrink-0 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
                  aria-hidden="true"
                >
                  ▾
                </span>
              </button>
              <div
                id={panelId}
                className={`px-5 text-gray-700 text-sm leading-relaxed transition-all duration-200 ${isOpen ? "pb-5 pt-1 max-h-96" : "max-h-0 overflow-hidden"}`}
              >
                {faq.answer}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
