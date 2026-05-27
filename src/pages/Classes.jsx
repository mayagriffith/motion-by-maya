import { NavLink } from "react-router-dom";
import Container from "../components/Container.jsx";
import Button from "../components/Button.jsx";
import PageMeta from "../components/PageMeta.jsx";

const classes = [
  {
    title: "Modern Vinyasa",
    desc: "A strong, breath-led flow combining mobility, balance, strength, and mindful movement. Expect creative sequencing, clear guidance, and a grounded but energizing pace.",
    length: "45–90 min",
    tags: ["Vinyasa", "Strength", "Mobility"],
  },
  {
    title: "Power Flow",
    desc: "An athletic, heat-building class focused on endurance, core strength, and full-body movement. Designed to leave you feeling challenged, focused, and reset.",
    length: "45–60 min",
    tags: ["Power Yoga", "Strength", "Sweat"],
  },
  {
    title: "Hatha Yoga",
    desc: "A slower-paced practice with longer holds, alignment-focused movement, and intentional breathwork. Perfect for building stability, awareness, and flexibility.",
    length: "45–60 min",
    tags: ["Hatha", "Mobility", "Balance"],
  },
  {
    title: "Yoga for Athletes",
    desc: "Mobility and recovery for runners, lifters, and all athletes in between. Designed to support performance, reduce tightness, and help your body recover from training.",
    length: "45–60 min",
    tags: ["Running", "Recovery", "Mobility"],
  },

  {
    title: "Breathe + Restore",
    desc: "Gentle movement, breathwork, and grounding practices designed to help regulate the nervous system and create space to slow down.",
    length: "30–45 min",
    tags: ["Breathwork", "Restore", "Relaxation"],
  },
  {
    title: "Private 1:1 Sessions",
    desc: "Personalized sessions tailored to your goals, experience level, and lifestyle. Great for beginners, athletes, injury recovery support, or building confidence in your practice.",
    length: "60 min",
    tags: ["Private", "Personalized", "Supportive"],
  },
];

export default function Classes() {
  return (
    <>
      <PageMeta
        title="Classes"
        description="Modern vinyasa, power flow, hatha, yoga for runners, mobility reset, and private sessions — intentional movement for real life."
        path="/classes"
        keywords="power yoga, vinyasa, yoga for runners, mobility, beginner yoga, private yoga NYC"
      />
      <section className="border-b border-[rgb(var(--mbm-line))]">
      <Container className="py-14 sm:py-20">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-2xl">
            <div className="home-eyebrow">
              <span className="home-eyebrow-line" aria-hidden="true" />
              Classes
            </div>
            <h1 className="mt-6 text-[clamp(2.75rem,6vw,4.5rem)] leading-[0.92] tracking-tight">
              Choose your practice.
            </h1>
            <p className="mt-5 text-xl leading-relaxed text-black/80 sm:text-2xl">
              Intentional movement for real life.
            </p>
            <p className="mt-4 text-base leading-relaxed text-[rgb(var(--mbm-muted))] sm:text-lg">
              Classes designed to support strength, mobility, recovery, and
              nervous system balance — whether you&apos;re lifting, running,
              working long hours, or simply trying to feel better in your body.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button as={NavLink} to="/schedule">
              View schedule
            </Button>
            <Button as={NavLink} to="/contact" variant="ghost">
              Book a session
            </Button>
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
              <div className="mt-5 space-y-3 border-t border-[rgb(var(--mbm-line))] pt-4">
                <div className="text-xs font-medium text-black/55">{c.length}</div>
                <div className="flex flex-wrap gap-1.5">
                  {c.tags.map((t) => (
                    <span
                      key={t}
                      className="rounded-full bg-[rgb(var(--mbm-bg))]/70 px-2.5 py-1 text-[11px] text-black/60 ring-1 ring-[rgb(var(--mbm-line))]"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </Container>
    </section>
    </>
  );
}
