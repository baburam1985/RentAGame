type AvailabilityCalendarProps = {
  month: Date;
  unavailableDates: string[];
};

const MONTH_NAMES = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

function formatDate(year: number, month: number, day: number): string {
  const mm = String(month + 1).padStart(2, "0");
  const dd = String(day).padStart(2, "0");
  return `${year}-${mm}-${dd}`;
}

export default function AvailabilityCalendar({
  month,
  unavailableDates,
}: AvailabilityCalendarProps) {
  const year = month.getFullYear();
  const monthIndex = month.getMonth();
  const monthName = MONTH_NAMES[monthIndex];
  const daysInMonth = new Date(year, monthIndex + 1, 0).getDate();

  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-4">
      <h2 className="text-center font-semibold text-gray-900 mb-4">
        {monthName} {year}
      </h2>
      <div className="grid grid-cols-7 gap-1">
        {days.map((day) => {
          const dateStr = formatDate(year, monthIndex, day);
          const isUnavailable = unavailableDates.includes(dateStr);
          return (
            <div
              key={day}
              className={`day flex items-center justify-center rounded-md p-2 text-sm${isUnavailable ? " unavailable bg-red-100 text-red-600 line-through" : " text-gray-900"}`}
            >
              {day}
            </div>
          );
        })}
      </div>
    </div>
  );
}
