const CALENDAR_ID = import.meta.env.VITE_GOOGLE_CALENDAR_ID;
const TIMEZONE =
  import.meta.env.VITE_GOOGLE_CALENDAR_TIMEZONE || "America/New_York";

export function hasCalendar() {
  return Boolean(CALENDAR_ID);
}

export function getCalendarEmbedUrl(mode = "MONTH") {
  if (!CALENDAR_ID) return null;

  const params = new URLSearchParams({
    src: CALENDAR_ID,
    ctz: TIMEZONE,
    mode,
    bgcolor: "%23faf7f3",
    color: "%23141412",
    showTitle: "0",
    showNav: "1",
    showDate: "1",
    showPrint: "0",
    showTabs: "0",
    showCalendars: "0",
    showTz: "0",
  });

  return `https://calendar.google.com/calendar/embed?${params.toString()}`;
}

export function getCalendarOpenUrl() {
  if (!CALENDAR_ID) return null;
  return `https://calendar.google.com/calendar/u/0/r?cid=${encodeURIComponent(CALENDAR_ID)}`;
}

export function getCalendarSubscribeUrl() {
  if (!CALENDAR_ID) return null;
  return `https://calendar.google.com/calendar/u/0/r?cid=${encodeURIComponent(CALENDAR_ID)}`;
}

export function getCalendarIcsUrl() {
  if (!CALENDAR_ID) return null;
  return `https://calendar.google.com/calendar/ical/${encodeURIComponent(CALENDAR_ID)}/public/basic.ics`;
}
