import { NavLink } from "react-router-dom";
import Container from "../components/Container.jsx";
import Button from "../components/Button.jsx";
import PageMeta from "../components/PageMeta.jsx";

const classes = [
  {
    title: "Modern Vinyasa",
    desc: "Move between poses with your breath. This class combines standing sequences, balance work, and time to stretch and rest.",
    length: "45–90 min",
    tags: ["Vinyasa", "Strength", "Mobility"],
  },
  {
    title: "Power Flow",
    desc: "A more demanding flow with longer sequences and core work. Take a slower variation or a break whenever you need one.",
    length: "45–60 min",
    tags: ["Power Yoga", "Strength", "Sweat"],
  },
  {
    title: "Hatha Yoga",
    desc: "Spend more time in each pose, with a focus on alignment and breathing. A slower pace gives you time to learn and make adjustments.",
    length: "45–60 min",
    tags: ["Hatha", "Mobility", "Balance"],
  },
  {
    title: "Yoga for Athletes",
    desc: "Work on hip and shoulder mobility, balance, and core stability alongside your running, lifting, or other training.",
    length: "45–60 min",
    tags: ["Running", "Recovery", "Mobility"],
  },

  {
    title: "Breathe + Restore",
    desc: "Gentle movement, breathing exercises, and longer rests. Choose this class when you want a quieter practice.",
    length: "30–45 min",
    tags: ["Breathwork", "Restore", "Relaxation"],
  },
  {
    title: "Private 1:1 Sessions",
    desc: "A session planned around your goals and experience. Learn the basics, work on specific poses, or practice at your own pace.",
    length: "60 min",
    tags: ["Private", "Personalized", "Supportive"],
  },
];

export default function Classes() {
  return (
    <>
      <PageMeta
        title="Classes"
        description="Explore vinyasa, power flow, hatha, yoga for athletes, gentle classes, and private yoga sessions with Maya."
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
              Active flows, slower classes, and private sessions.
            </p>
            <p className="mt-4 text-base leading-relaxed text-[rgb(var(--mbm-muted))] sm:text-lg">
              Compare the formats below, then check the schedule for available classes. If you&apos;re unsure where to start, ask me.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button as={NavLink} to="/schedule">
              View schedule
            </Button>
            <Button as={NavLink} to="/contact" variant="ghost">
              Ask about a session
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
                <NavLink className="inline-block text-sm underline underline-offset-4" to={`/contact?class=${encodeURIComponent(c.title)}`}>Ask about {c.title}</NavLink>
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
