import { useState } from "react";
import { NavLink } from "react-router-dom";
import clsx from "clsx";
import Container from "../components/Container.jsx";
import Button from "../components/Button.jsx";
import PageMeta from "../components/PageMeta.jsx";
import {
  getCalendarEmbedUrl,
  getCalendarIcsUrl,
  getCalendarOpenUrl,
  getCalendarSubscribeUrl,
  hasCalendar,
} from "../lib/calendar.js";

const VIEWS = [
  { id: "MONTH", label: "Month" },
  { id: "AGENDA", label: "Upcoming" },
];

export default function Schedule() {
  const [view, setView] = useState("MONTH");
  const calendarReady = hasCalendar();
  const embedUrl = getCalendarEmbedUrl(view);
  const openUrl = getCalendarOpenUrl();
  const subscribeUrl = getCalendarSubscribeUrl();
  const icsUrl = getCalendarIcsUrl();

  return (
    <>
      <PageMeta
        title="Class Schedule"
        description="View upcoming Motion by Maya yoga classes — online and in NYC / North Jersey. Subscribe to stay updated."
        path="/schedule"
      />
      <section className="border-b border-[rgb(var(--mbm-line))]">
      <Container className="py-14 sm:py-20">
        <div className="max-w-3xl">
          <div className="home-eyebrow">
            <span className="home-eyebrow-line" aria-hidden="true" />
            Schedule
          </div>
          <h1 className="mt-6 text-[clamp(2.75rem,6vw,4.5rem)] leading-[0.92] tracking-tight">
            Class calendar.
          </h1>
          <p className="mt-5 text-base leading-relaxed text-[rgb(var(--mbm-muted))] sm:text-lg">
            See what&apos;s coming up, subscribe to stay in the loop, and reach
            out if you&apos;d like to join a class or book a private session.
          </p>
        </div>

        <div className="mt-12 grid gap-8 lg:grid-cols-12 lg:gap-10">
          <aside className="lg:col-span-4">
            <div className="schedule-sidebar lg:sticky lg:top-24">
              <div className="rounded-[1.75rem] border border-[rgb(var(--mbm-line))] bg-white/45 p-6 sm:p-7">
                <h2 className="text-2xl leading-tight">Stay in sync</h2>
                <p className="mt-3 text-sm leading-relaxed text-[rgb(var(--mbm-muted))]">
                  Add the calendar to your phone or Google Calendar and new
                  classes will show up automatically — no need to check back
                  here every week.
                </p>

                {calendarReady ? (
                  <div className="mt-5 grid gap-2">
                    <Button
                      as="a"
                      href={subscribeUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="w-full"
                    >
                      Subscribe in Google Calendar
                    </Button>
                    <Button
                      as="a"
                      href={icsUrl}
                      variant="ghost"
                      className="w-full"
                    >
                      Download .ics feed
                    </Button>
                    <Button
                      as="a"
                      href={openUrl}
                      target="_blank"
                      rel="noreferrer"
                      variant="soft"
                      className="w-full"
                    >
                      Open full calendar
                    </Button>
                  </div>
                ) : (
                  <p className="mt-5 text-sm text-[rgb(var(--mbm-muted))]">
                    The live calendar is being connected. In the meantime, reach
                    out and Maya can share upcoming dates with you directly.
                  </p>
                )}
              </div>

              <div className="mt-4 rounded-[1.75rem] border border-[rgb(var(--mbm-line))] bg-white/25 p-6 sm:p-7">
                <h3 className="text-lg leading-tight">Before you go</h3>
                <ul className="mt-4 grid gap-3 text-sm text-[rgb(var(--mbm-muted))]">
                  <li className="flex gap-3">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-black/35" />
                    Tap any event for location, notes, or class details.
                  </li>
                  <li className="flex gap-3">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-black/35" />
                    Online and in-person classes listed as available.
                  </li>
                  <li className="flex gap-3">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-black/35" />
                    New to class?{" "}
                    <NavLink className="underline hover:text-black" to="/classes">
                      Browse formats
                    </NavLink>{" "}
                    first.
                  </li>
                </ul>

                <div className="mt-5">
                  <Button as={NavLink} to="/contact" variant="ghost" className="w-full">
                    Questions or booking
                  </Button>
                </div>
              </div>
            </div>
          </aside>

          <div className="lg:col-span-8">
            {calendarReady ? (
              <>
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div className="schedule-view-toggle inline-flex rounded-full border border-[rgb(var(--mbm-line))] bg-white/40 p-1">
                    {VIEWS.map((option) => (
                      <button
                        key={option.id}
                        type="button"
                        onClick={() => setView(option.id)}
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
                  <p className="text-xs text-[rgb(var(--mbm-muted))]">
                    Times shown in Eastern Time
                  </p>
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
                    src={embedUrl}
                    loading="lazy"
                  />
                </div>
              </>
            ) : (
              <div className="schedule-calendar-placeholder rounded-[1.75rem] border border-dashed border-[rgb(var(--mbm-line))] bg-white/30 p-10 text-center sm:p-14">
                <p className="font-serif text-3xl leading-tight">
                  Schedule coming soon
                </p>
                <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-[rgb(var(--mbm-muted))]">
                  The class calendar will appear here once it&apos;s connected.
                  Send a note if you&apos;d like to know what&apos;s on the
                  horizon.
                </p>
                <div className="mt-6 flex flex-wrap justify-center gap-3">
                  <Button as={NavLink} to="/contact">
                    Get in touch
                  </Button>
                  <Button as={NavLink} to="/classes" variant="ghost">
                    View class formats
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </Container>
    </section>
    </>
  );
}
