const testimonials = [
  {
    quote:
      "The Giant Jenga was an absolute hit at our wedding reception. Everyone from grandparents to kids was playing. Delivery was on time and setup was effortless.",
    name: "Sarah & Mike T.",
    event: "Wedding Reception",
  },
  {
    quote:
      "We rented the Cornhole and Bocce Ball sets for our company picnic. Super easy process — they dropped everything off in the morning and picked it up that evening.",
    name: "James R.",
    event: "Corporate Picnic",
  },
  {
    quote:
      "My son's birthday party was a blast thanks to RentAGame. The Spikeball and 4-in-a-Row kept the teenagers entertained for hours. Will definitely book again!",
    name: "Lisa M.",
    event: "Birthday Party",
  },
];

function Stars() {
  return (
    <div className="flex gap-0.5 mb-3">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          className="w-4 h-4"
          style={{ color: "var(--color-accent)" }}
        >
          <path
            fillRule="evenodd"
            d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401Z"
            clipRule="evenodd"
          />
        </svg>
      ))}
    </div>
  );
}

export default function Testimonials() {
  return (
    <section className="py-20" style={{ backgroundColor: "#F9FAFB" }}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900">
            What Our Customers Say
          </h2>
          <p className="mt-3 text-gray-500">
            Hundreds of events. Always a good time.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <div
              key={t.name}
              className="bg-white rounded-2xl p-7 border border-gray-100 shadow-sm flex flex-col"
            >
              <Stars />
              <p className="text-gray-600 leading-relaxed text-sm flex-1">
                &ldquo;{t.quote}&rdquo;
              </p>
              <div className="mt-5 pt-4 border-t border-gray-100">
                <p className="font-semibold text-gray-900 text-sm">{t.name}</p>
                <p className="text-xs text-gray-400">{t.event}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
