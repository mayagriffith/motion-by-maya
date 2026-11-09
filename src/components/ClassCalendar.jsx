import { useState } from "react";
import clsx from "clsx";
import Button from "./Button.jsx";
import {
  getCalendarEmbedUrl,
  getCalendarIcsUrl,
  getCalendarSubscribeUrl,
  hasCalendar,
} from "../lib/calendar.js";

const VIEWS = [
  { id: "MONTH", label: "Month" },
  { id: "AGENDA", label: "Upcoming" },
];

/** The public Google Calendar embed, with a view toggle and subscribe links. */
export default function ClassCalendar() {
  const [view, setView] = useState("MONTH");

  if (!hasCalendar()) {
    return (
      <p className="text-sm text-[rgb(var(--mbm-muted))]">
        Contact me for upcoming class dates.
      </p>
    );
  }

  return (
    <>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="schedule-view-toggle inline-flex rounded-full border border-[rgb(var(--mbm-line))] bg-white/40 p-1">
          {VIEWS.map((option) => (
            <button
              key={option.id}
              type="button"
              onClick={() => setView(option.id)}
              aria-pressed={view === option.id}
              className={clsx(
                "rounded-full px-4 py-2 text-sm font-medium transition",
                view === option.id
                  ? "bg-black text-[rgb(var(--mbm-bg))] shadow-sm"
                  : "text-[rgb(var(--mbm-muted))] hover:text-black"
              )}
            >
              {option.label}
            </button>
          ))}
        </div>
        <p className="text-xs text-[rgb(var(--mbm-muted))]">Times shown in Eastern Time</p>
      </div>

      <div
        className={clsx(
          "schedule-calendar-frame mt-4",
          view === "AGENDA" && "schedule-calendar-frame--agenda"
        )}
      >
        <iframe
          key={view}
          title="Motion by Maya class schedule"
          src={getCalendarEmbedUrl(view)}
          loading="lazy"
        />
      </div>

      <div className="mt-5 flex flex-wrap gap-3">
        <Button as="a" href={getCalendarSubscribeUrl()} target="_blank" rel="noreferrer" variant="ghost">
          Add to Google Calendar
        </Button>
        <Button as="a" href={getCalendarIcsUrl()} variant="ghost">
          Download (.ics)
        </Button>
      </div>
    </>
  );
}
