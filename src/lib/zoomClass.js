import { DONATION_LINKS, SITE_URL, ZOOM_CLASS, ZOOM_JOIN_URL } from "../config/site.js";

const TITLE = "Gentle Thursday Flow (Zoom yoga with Maya)";

function details() {
  return [
    "Gentle Thursday Flow with Maya. 40 minutes on Zoom, all levels.",
    ZOOM_JOIN_URL
      ? `Join on Zoom: ${ZOOM_JOIN_URL}`
      : `Sign up for the Zoom link: ${SITE_URL}/zoom`,
    ...DONATION_LINKS.map((d) => `Donate (${d.label}): ${d.url}`),
  ].join("\n");
}

const day = () => ZOOM_CLASS.firstDate.replaceAll("-", "");
const hms = (hhmm) => hhmm.replace(":", "") + "00";

/** Google Calendar "add event" link for the weekly class. */
export function googleCalendarUrl() {
  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: TITLE,
    dates: `${day()}T${hms(ZOOM_CLASS.start)}/${day()}T${hms(ZOOM_CLASS.end)}`,
    ctz: "America/New_York",
    recur: [
      "RRULE:FREQ=WEEKLY;BYDAY=TH",
      ...ZOOM_CLASS.skipDates.map(
        (d) => `EXDATE;TZID=America/New_York:${d.replaceAll("-", "")}T${hms(ZOOM_CLASS.start)}`
      ),
    ].join("\n"),
    details: details(),
    location: ZOOM_JOIN_URL || "Zoom",
  });
  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}

const esc = (text) =>
  text.replace(/\\/g, "\\\\").replace(/;/g, "\\;").replace(/,/g, "\\,").replace(/\n/g, "\\n");

/** .ics file (Apple Calendar, Outlook) with reminders 1 day and 30 min before. */
export function icsDataUrl() {
  const lines = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Motion by Maya//Gentle Thursday Flow//EN",
    "BEGIN:VTIMEZONE",
    "TZID:America/New_York",
    "BEGIN:DAYLIGHT",
    "TZOFFSETFROM:-0500",
    "TZOFFSETTO:-0400",
    "TZNAME:EDT",
    "DTSTART:19700308T020000",
    "RRULE:FREQ=YEARLY;BYMONTH=3;BYDAY=2SU",
    "END:DAYLIGHT",
    "BEGIN:STANDARD",
    "TZOFFSETFROM:-0400",
    "TZOFFSETTO:-0500",
    "TZNAME:EST",
    "DTSTART:19701101T020000",
    "RRULE:FREQ=YEARLY;BYMONTH=11;BYDAY=1SU",
    "END:STANDARD",
    "END:VTIMEZONE",
    "BEGIN:VEVENT",
    "UID:gentle-thursday-flow@motionbymaya.com",
    "DTSTAMP:20261108T000000Z",
    `DTSTART;TZID=America/New_York:${day()}T${hms(ZOOM_CLASS.start)}`,
    `DTEND;TZID=America/New_York:${day()}T${hms(ZOOM_CLASS.end)}`,
    "RRULE:FREQ=WEEKLY;BYDAY=TH",
    ...ZOOM_CLASS.skipDates.map(
      (d) => `EXDATE;TZID=America/New_York:${d.replaceAll("-", "")}T${hms(ZOOM_CLASS.start)}`
    ),
    `SUMMARY:${esc(TITLE)}`,
    `DESCRIPTION:${esc(details())}`,
    `LOCATION:${esc(ZOOM_JOIN_URL || "Zoom")}`,
    ...(ZOOM_JOIN_URL ? [`URL:${ZOOM_JOIN_URL}`] : []),
    "BEGIN:VALARM",
    "ACTION:DISPLAY",
    "DESCRIPTION:Gentle Thursday Flow is tomorrow at 8pm",
    "TRIGGER:-P1D",
    "END:VALARM",
    "BEGIN:VALARM",
    "ACTION:DISPLAY",
    "DESCRIPTION:Gentle Thursday Flow starts in 30 minutes",
    "TRIGGER:-PT30M",
    "END:VALARM",
    "END:VEVENT",
    "END:VCALENDAR",
  ];
  return `data:text/calendar;charset=utf-8,${encodeURIComponent(lines.join("\r\n"))}`;
}
