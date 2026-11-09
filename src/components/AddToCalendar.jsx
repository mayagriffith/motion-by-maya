import Button from "./Button.jsx";
import { googleCalendarUrl, icsDataUrl } from "../lib/zoomClass.js";
import { trackEvent } from "../lib/analytics.js";

/**
 * "Add to calendar" for Gentle Thursday Flow: Google Calendar, or an .ics
 * file for Apple Calendar / Outlook (with reminders built in).
 * tone="dark" for use on the dark or terracotta cards.
 */
export default function AddToCalendar({ tone = "light", className = "" }) {
  const variant = tone === "dark" ? "inverse-ghost" : "ghost";
  return (
    <div className={`flex flex-wrap gap-2 ${className}`}>
      <Button
        as="a"
        href={googleCalendarUrl()}
        target="_blank"
        rel="noreferrer"
        variant={variant}
        onClick={() => trackEvent("add_to_calendar", { calendar: "google" })}
      >
        + Google Calendar
      </Button>
      <Button
        as="a"
        href={icsDataUrl()}
        download="gentle-thursday-flow.ics"
        variant={variant}
        onClick={() => trackEvent("add_to_calendar", { calendar: "ics" })}
      >
        + Apple / Outlook
      </Button>
    </div>
  );
}
