"use client";

type Step = {
  label: string;
};

type Props = {
  currentStep: number;
  steps: Step[];
};

export default function CheckoutProgress({ currentStep, steps }: Props) {
  const total = steps.length;

  return (
    <nav aria-label="Checkout progress">
      <div className="flex items-center justify-between gap-0">
        {steps.map((step, index) => {
          const stepNumber = index + 1;
          const isCompleted = stepNumber < currentStep;
          const isCurrent = stepNumber === currentStep;

          const ariaLabel = isCompleted
            ? `Step ${stepNumber} of ${total} – ${step.label}, completed`
            : `Step ${stepNumber} of ${total} – ${step.label}`;

          return (
            <div key={index} className="flex-1 flex flex-col items-center relative">
              {/* Connector line (left side) */}
              {index > 0 && (
                <div
                  className={`absolute top-4 right-1/2 w-full h-0.5 ${
                    isCompleted ? "bg-blue-700" : "bg-gray-200"
                  }`}
                  aria-hidden="true"
                />
              )}

              {/* Step circle */}
              <div
                aria-label={ariaLabel}
                className={`relative z-10 flex items-center justify-center w-8 h-8 rounded-full text-sm font-bold border-2 transition-colors ${
                  isCompleted
                    ? "bg-blue-700 border-blue-700 text-white"
                    : isCurrent
                    ? "bg-white border-blue-700 text-blue-700"
                    : "bg-white border-gray-300 text-gray-400"
                }`}
              >
                {isCompleted ? (
                  <span className="material-symbols-outlined" style={{ fontSize: "14px" }}>
                    check
                  </span>
                ) : (
                  stepNumber
                )}
              </div>

              {/* Step label */}
              <p
                className={`mt-2 text-xs text-center font-medium ${
                  isCurrent ? "text-blue-700" : isCompleted ? "text-blue-700" : "text-gray-400"
                }`}
              >
                {isCurrent ? (
                  <>
                    <span className="block text-[10px] text-gray-500">
                      Step {stepNumber} of {total}
                    </span>
                    {step.label}
                  </>
                ) : (
                  step.label
                )}
              </p>
            </div>
          );
        })}
      </div>
    </nav>
  );
}
