import { NavLink } from "react-router-dom";
import Container from "../components/Container.jsx";
import Button from "../components/Button.jsx";
import PageMeta from "../components/PageMeta.jsx";
import ClassCalendar from "../components/ClassCalendar.jsx";
import { ZOOM_CLASS } from "../config/site.js";

const classes = [
  {
    title: "Modern Vinyasa",
    desc: "Move between poses with your breath. Standing sequences, balance work, and time to stretch and rest.",
    length: "45–90 min",
  },
  {
    title: "Power Flow",
    desc: "A more demanding flow with longer sequences and core work. Slower options always available.",
    length: "45–60 min",
  },
  {
    title: "Hatha Yoga",
    desc: "More time in each pose, with a focus on alignment and breathing.",
    length: "45–60 min",
  },
  {
    title: "Yoga for Athletes",
    desc: "Hip and shoulder mobility, balance, and core stability alongside your running or lifting.",
    length: "45–60 min",
  },
  {
    title: "Breathe + Restore",
    desc: "Gentle movement, breathing exercises, and longer rests for a quieter practice.",
    length: "30–45 min",
  },
  {
    title: "Private 1:1 Sessions",
    desc: "A session planned around your goals, in your home or online.",
    length: "60 min",
    link: { to: "/private", label: "See packages & book" },
  },
];

export default function Classes() {
  return (
    <>
      <PageMeta
        title="Classes & Schedule"
        description="Gentle Thursday Flow on Zoom every week, plus vinyasa, power, hatha, and private yoga sessions with Maya. See the class calendar."
        path="/classes"
        keywords="online yoga class, zoom yoga, power yoga, vinyasa, yoga for runners, beginner yoga, yoga schedule, private yoga NYC"
      />

      <section className="border-b border-[rgb(var(--mbm-line))]">
        <Container className="py-14 sm:py-20">
          <div className="max-w-2xl">
            <div className="home-eyebrow">
              <span className="home-eyebrow-line" aria-hidden="true" />
              Classes &amp; Schedule
            </div>
            <h1 className="mt-6 text-[clamp(2.75rem,6vw,4.5rem)] leading-[0.92] tracking-tight">
              Choose your <span className="italic text-[rgb(var(--mbm-accent))]">practice.</span>
            </h1>
            <p className="mt-5 text-lg leading-relaxed text-[rgb(var(--mbm-muted))] sm:text-xl">
              A weekly Zoom class, group classes, and private 1:1 sessions.
            </p>
          </div>

          {/* Featured: the weekly Zoom class */}
          <div className="home-cta relative mt-10 overflow-hidden rounded-[1.75rem] p-7 text-white sm:p-9">
            <div className="grid items-center gap-6 md:grid-cols-12">
              <div className="md:col-span-8">
                <span className="text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-white/60">
                  Every Thursday on Zoom
                </span>
                <h2 className="mt-3 text-3xl leading-tight text-white sm:text-4xl">
                  Gentle Thursday Flow
                </h2>
                <p className="mt-3 max-w-xl text-sm leading-relaxed text-white/75 sm:text-base">
                  {ZOOM_CLASS.time}. 40 minutes, all levels, donation-based.
                  First class {ZOOM_CLASS.firstClass}.
                </p>
              </div>
              <div className="md:col-span-4 md:text-right">
                <Button as={NavLink} to="/zoom" variant="inverse">
                  Save my spot
                </Button>
              </div>
            </div>
          </div>

          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {classes.map((c) => (
              <article
                key={c.title}
                className="home-card flex flex-col rounded-[1.75rem] border border-[rgb(var(--mbm-line))] bg-white/45 p-6 sm:p-7"
              >
                <h2 className="text-2xl leading-tight">{c.title}</h2>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-[rgb(var(--mbm-muted))]">
                  {c.desc}
                </p>
                <div className="mt-5 flex items-center justify-between gap-3 border-t border-[rgb(var(--mbm-line))] pt-4">
                  <span className="text-xs font-medium text-black/55">{c.length}</span>
                  {c.link ? (
                    <NavLink className="text-sm font-medium underline underline-offset-4" to={c.link.to}>
                      {c.link.label}
                    </NavLink>
                  ) : (
                    <NavLink
                      className="text-sm underline underline-offset-4"
                      to={`/contact?class=${encodeURIComponent(c.title)}`}
                    >
                      Ask about it
                    </NavLink>
                  )}
                </div>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <section id="schedule" className="scroll-mt-20 bg-white/20">
        <Container className="py-14 sm:py-20">
          <div className="home-eyebrow">
            <span className="home-eyebrow-line" aria-hidden="true" />
            Schedule
          </div>
          <h2 className="mt-5 mb-8 text-[clamp(2rem,4vw,3rem)] leading-[1.02]">
            Class calendar.
          </h2>
          <ClassCalendar />
        </Container>
      </section>
    </>
  );
}
