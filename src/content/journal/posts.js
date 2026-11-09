/**
 * Blog posts
 *
 * To add a new article, copy the existing entry and update its fields.
 * Body blocks support: paragraph (optional bold `lead`), heading, list,
 * image, imageRow, cta ({ content, href, label })
 * Set featured: true on the one post the homepage should feature.
 */
export const posts = [
  {
    slug: "introducing-thursday-night-flow",
    title: "Introducing Thursday Night Flow",
    excerpt:
      "A weekly, donation-based yoga class on Zoom. Thursdays, 8:00 to 8:40pm Eastern, starting November 12.",
    date: "2026-11-08",
    tags: ["Zoom", "Weekly class", "All levels"],
    readingTime: 1,
    featured: false,
    seoDescription:
      "Thursday Night Flow is a weekly, donation-based yoga class on Zoom with Maya Griffith, RYT-200. Thursdays 8:00 to 8:40pm Eastern, all levels, starting November 12.",
    body: [
      {
        type: "paragraph",
        content:
          "Starting Thursday, November 12, I'm teaching a weekly class on Zoom. It's called Thursday Night Flow, and it runs every Thursday from 8:00 to 8:40pm Eastern.",
      },
      { type: "heading", content: "What it is" },
      {
        type: "list",
        items: [
          "A gentle, all-levels 40-minute flow: easy movement, stretching, some breathwork, and a real rest at the end.",
          "No experience needed. Every pose has an easier option.",
          "Donation-based. Pay what feels right (suggested $10), or come for free.",
        ],
      },
      { type: "heading", content: "What you need" },
      {
        type: "paragraph",
        content:
          "A mat or a towel, enough floor to lie down, and comfy clothes. Camera on or off, your choice.",
      },
      { type: "heading", content: "How to join" },
      {
        type: "paragraph",
        content: "Sign up once with your name and email, and I'll send you the Zoom link.",
      },
      {
        type: "cta",
        content: "See you Thursday.",
        href: "/zoom",
        label: "Sign up for Thursday Night Flow",
      },
    ],
  },
  {
    slug: "what-a-first-private-session-looks-like",
    title: "What to expect in a first private session",
    excerpt:
      "How a first private yoga session with me works, from the intro call to what you take home.",
    date: "2026-11-08",
    tags: ["Private sessions", "Beginners"],
    readingTime: 2,
    featured: false,
    seoDescription:
      "How a first private yoga session with Maya Griffith works in Brooklyn, Manhattan, or online: a free intro call, a 60-minute session, and a short plan to practice on your own.",
    body: [
      {
        type: "paragraph",
        content:
          "Before anything else, we have a free 15-minute call. You tell me what you want to work on, any injuries, and whether you want to meet at your place or online. You don't need to prepare anything. I bring mats, blocks and straps. You just need floor space for two mats.",
      },
      { type: "heading", content: "The session (60 minutes)" },
      {
        type: "list",
        items: [
          "First 10 minutes: I watch how you move and breathe so I know where to start.",
          "Next 40 minutes: we practice. A few poses, done well, adjusted to your body.",
          "Last 10 minutes: rest, then we talk about what you noticed.",
        ],
      },
      { type: "heading", content: "After" },
      {
        type: "paragraph",
        content:
          "I send you two or three short things to practice on your own, and we plan the next session.",
      },
      { type: "heading", content: "Who it's for" },
      {
        type: "paragraph",
        content:
          "Beginners, runners and lifters, people with busy schedules, and anyone working around an injury.",
      },
      {
        type: "cta",
        content: "Packages and booking are on the private sessions page.",
        href: "/private",
        label: "See packages",
      },
    ],
  },
  {
    slug: "meet-cue",
    title: "Meet Cue: the class planning app I built for yoga teachers",
    excerpt:
      "Every teacher I know plans classes across notes apps, screenshots, and memory — then teaches off a phone that keeps going dark. Cue is my answer: plan, teach, and reflect on every class from one calm screen.",
    coverImage: "/images/blog/cue/cue-cover.jpg",
    date: "2026-09-09",
    tags: ["Cue", "Teaching", "Class planning"],
    readingTime: 4,
    featured: true,
    seoDescription:
      "Cue is a yoga class planning app built by a teacher, for teachers — a visual sequence builder, a calm teaching mode with cues and timing, post-class reflections, and optional AI assistance. Free to try on web, iPhone, and Android.",
    body: [
      {
        type: "paragraph",
        content:
          "If you teach yoga, you probably know the feeling. Your best sequence lives half in a notes app, half in a screenshot from three months ago, and half in your memory. You rebuild the same class from scratch every week. And when you finally get to the front of the room, you're squinting at a phone that keeps going dark mid-flow.",
      },
      {
        type: "paragraph",
        content:
          "I kept running into all of it, so I built the tool I wanted to exist. It's called Cue, and it puts the whole life of a class — planning it, teaching it, and remembering what worked — in one place.",
      },
      { type: "heading", content: "Plan a class in minutes, not an evening" },
      {
        type: "paragraph",
        content:
          "Cue's sequence builder is visual. You drag poses into place, reorder and duplicate them, and flip a pose to the other side in a tap. Every pose can carry your own cues, breath counts, and timing, and you can view the whole class as a grid of poses or a detailed list.",
      },
      {
        type: "paragraph",
        content:
          "Behind the builder is a library of 150+ illustrated poses with clean icons, alignment cues, and breath counts — plus room to add your own poses and notes. Once a class is saved, it's yours to reuse: duplicate last month's flow, adjust it for a new group, and you're done planning before your tea goes cold.",
      },
      {
        type: "imageRow",
        images: [
          {
            src: "/images/blog/cue/cue-builder-grid.png",
            alt: "Cue's sequence builder in grid view, showing an 11-pose Sun Salutation A",
            caption: "The builder in grid view — the whole flow at a glance.",
          },
          {
            src: "/images/blog/cue/cue-builder-list.png",
            alt: "Cue's sequence builder in list view, with cues, breath counts, and per-side tracking",
            caption: "List view, with cues and breath counts on every pose.",
          },
          {
            src: "/images/blog/cue/cue-teaching-mode.png",
            alt: "Cue's teaching mode: a calm full-screen view with the pose, a countdown timer, and the cue",
            caption: "Teaching mode — pose, timer, cue, and what's up next.",
          },
        ],
      },
      { type: "heading", content: "Teach from one calm screen" },
      {
        type: "paragraph",
        content:
          "Teaching mode is the part I'm proudest of. It's a quiet, glanceable screen that shows the current pose, your cue, the breath count, and a timer — with what's coming up next right below. The screen stays awake for the whole class, so there's no tapping your phone back to life between poses.",
      },
      {
        type: "paragraph",
        content:
          "You can even connect your Spotify playlist, so the music is ready before the first breath and you're not fumbling at the front of the room.",
      },
      { type: "heading", content: "Remember what actually worked" },
      {
        type: "paragraph",
        content:
          "The classes we teach are full of small discoveries — a transition that landed, a pose that needed more setup — and most of them evaporate by the next morning. After each class, Cue prompts a 30-second reflection. Over time your library becomes a record of what works, so every class starts a step ahead of the last one.",
      },
      { type: "heading", content: "AI, when you want a starting point" },
      {
        type: "paragraph",
        content:
          "Cue also has built-in AI that can draft a full, editable class from a few details — or take a class you already have and shorten it to 45 minutes, swap out wrist-heavy poses, or adapt it for runners. Everything it drafts is a starting point you review and shape. You stay the teacher; it just gets you there faster.",
      },
      { type: "heading", content: "Try it before your next class" },
      {
        type: "paragraph",
        content:
          "Cue runs in any browser and on iPhone and Android, and your library syncs across all of them — so you can plan on a laptop and teach from your phone. Any class exports to a clean PDF if you like a printed plan on the mat.",
      },
      {
        type: "paragraph",
        content:
          "It's free to start: no card, two saved classes, and three AI generations a month for as long as you like. If you teach — yoga, or movement of any kind — I'd love for you to try it. And if something confuses you, tell me. That's how it gets better.",
      },
    ],
    externalLink: { href: "https://cueyoga.com", label: "Explore Cue" },
  },
  {
    slug: "yoga-complements-strength-training",
    title: "How Yoga Complements Strength Training",
    excerpt:
      "Strength training builds power. Yoga builds awareness, mobility, and recovery. Together, they create a more complete approach to movement — one that supports both performance and longevity.",
    coverImage: "/images/blog/yoga-strength-training.svg",
    date: "2025-01-30",
    tags: ["Strength", "Yoga", "Training"],
    readingTime: 7,
    featured: true,
    archived: true,
    seoDescription:
      "How yoga complements strength training — mobility, recovery, breathwork, and sustainable movement for lifters and active lifestyles.",
    body: [
      {
        type: "paragraph",
        content:
          "Yoga will not replace your lifts. And lifting will not magically improve mobility, balance, or nervous system recovery on its own. But when combined intentionally, the two practices support each other in ways that go far beyond stretching after leg day.",
      },
      {
        type: "paragraph",
        content:
          "For a long time, yoga and strength training were treated like opposites. One was seen as mindful and restorative, the other intense and performance-focused. In reality, they solve different problems — and your body benefits from both.",
      },
      {
        type: "heading",
        content: "Strength Builds Capacity. Yoga Builds Sustainability.",
      },
      {
        type: "paragraph",
        content:
          "Strength training helps you build muscle, bone density, power, and resilience. It teaches the body how to produce force and adapt to progressively heavier loads.",
      },
      {
        type: "paragraph",
        content: "Yoga develops a different set of qualities:",
      },
      {
        type: "list",
        items: [
          "mobility",
          "balance",
          "coordination",
          "breath control",
          "body awareness",
          "recovery capacity",
        ],
      },
      {
        type: "paragraph",
        content:
          "One practice teaches you how to generate tension. The other teaches you how to release it.",
      },
      {
        type: "paragraph",
        content: "That balance matters more than most people realize.",
      },
      {
        type: "paragraph",
        content:
          "A body that is strong but constantly stiff, fatigued, or disconnected eventually starts compensating. Tight hips change squat mechanics. Limited ankle mobility affects running form. Chronic tension in the shoulders changes pressing patterns. Over time, small restrictions can turn into pain, instability, or burnout.",
      },
      {
        type: "paragraph",
        content:
          "Yoga helps create space within the body so strength can continue developing sustainably.",
      },
      {
        type: "heading",
        content: "Mobility Is Not Just Flexibility",
      },
      {
        type: "paragraph",
        content:
          "One of the biggest misconceptions about yoga is that it is only about becoming more flexible.",
      },
      {
        type: "paragraph",
        content: "Mobility is different.",
      },
      {
        type: "paragraph",
        content:
          "Flexibility is passive range of motion. Mobility is your ability to actively control movement within that range.",
      },
      {
        type: "paragraph",
        content: "That distinction matters in strength training.",
      },
      {
        type: "paragraph",
        content:
          "You do not just want flexible hips. You want hips that remain stable during lunges, deadlifts, running, and single-leg work. You do not just want shoulder mobility. You want shoulders that can move overhead without compensation while remaining strong and controlled.",
      },
      {
        type: "paragraph",
        content:
          "Breath-led yoga develops both mobility and awareness. It teaches you to move with control instead of forcing range for the sake of aesthetics.",
      },
      {
        type: "paragraph",
        content: "In practice, this can translate to:",
      },
      {
        type: "list",
        items: [
          "deeper and more stable squats",
          "better overhead positioning",
          "improved posture",
          "reduced stiffness after lifting",
          "greater core awareness",
          "smoother movement patterns overall",
        ],
      },
      {
        type: "heading",
        content: "Breath Matters More Than People Think",
      },
      {
        type: "paragraph",
        content:
          "One of the most overlooked connections between yoga and lifting is breathwork.",
      },
      {
        type: "paragraph",
        content:
          "Many people train hard while breathing shallowly and carrying constant tension through the jaw, neck, shoulders, and ribs. Over time, that “always on” state makes recovery harder.",
      },
      {
        type: "paragraph",
        content: "Yoga teaches controlled breathing under effort.",
      },
      {
        type: "paragraph",
        content: "Learning how to slow the breath, regulate intensity, and stay grounded while uncomfortable can improve:",
      },
      {
        type: "list",
        items: [
          "workout recovery",
          "core engagement",
          "endurance",
          "mental focus",
          "stress management",
        ],
      },
      {
        type: "paragraph",
        content:
          "It also helps shift the nervous system out of constant fight-or-flight mode.",
      },
      {
        type: "paragraph",
        content:
          "That does not mean every yoga class needs to be slow or restorative. Strong vinyasa and power flow classes can absolutely be physically challenging. The difference is that the challenge is paired with breath awareness rather than disconnected from it.",
      },
      {
        type: "heading",
        content: "Recovery Is Part of Training",
      },
      {
        type: "paragraph",
        content:
          "A lot of active people unknowingly treat recovery as something optional. They focus on doing more:",
      },
      {
        type: "list",
        items: [
          "more mileage",
          "more lifting",
          "more intensity",
          "more classes",
          "more volume",
        ],
      },
      {
        type: "paragraph",
        content:
          "But progress happens when the body has enough recovery to adapt.",
      },
      {
        type: "paragraph",
        content:
          "Yoga can support recovery without feeling completely sedentary. On days when your body feels fatigued but still wants movement, slower flows, mobility work, and restorative practices can help improve circulation, reduce stiffness, and reset mentally without adding excessive stress.",
      },
      {
        type: "paragraph",
        content: "This is especially valuable for people balancing:",
      },
      {
        type: "list",
        items: [
          "lifting",
          "running",
          "desk jobs",
          "long commutes",
          "high stress",
          "inconsistent sleep",
        ],
      },
      {
        type: "paragraph",
        content:
          "Movement does not always need to be maximal effort to be productive.",
      },
      {
        type: "heading",
        content: "Choosing the Right Type of Yoga",
      },
      {
        type: "paragraph",
        content:
          "Not all yoga supports strength training equally.",
      },
      {
        type: "paragraph",
        content:
          "If you are lifting intensely four to five days per week, adding multiple extremely heated or physically exhausting yoga classes may leave you feeling depleted rather than recovered.",
      },
      {
        type: "paragraph",
        content:
          "Instead, think about choosing yoga intentionally based on what your body needs.",
      },
      {
        type: "paragraph",
        content: "Great complements to strength training:",
      },
      {
        type: "list",
        items: [
          "mobility-focused vinyasa",
          "slower hatha flows",
          "recovery-based yoga",
          "breathwork classes",
          "shorter mobility sessions",
          "yoga on rest days or after upper-body sessions",
        ],
      },
      {
        type: "paragraph",
        content: "Potentially fatiguing combinations:",
      },
      {
        type: "list",
        items: [
          "intense lifting + intense heated power yoga every day",
          "adding yoga purely as extra calorie burn",
          "pushing flexibility aggressively while already fatigued",
        ],
      },
      {
        type: "paragraph",
        content:
          "The goal is not to constantly “do more.” The goal is to support longevity and consistency.",
      },
      {
        type: "heading",
        content: "Building a Sustainable Movement Practice",
      },
      {
        type: "paragraph",
        content:
          "One of the most valuable things yoga offers strength-focused people is awareness.",
      },
      {
        type: "paragraph",
        content: "Awareness of:",
      },
      {
        type: "list",
        items: [
          "posture",
          "compensation patterns",
          "breathing",
          "recovery needs",
          "mental fatigue",
          "how the body actually feels day to day",
        ],
      },
      {
        type: "paragraph",
        content: "That awareness makes training smarter.",
      },
      {
        type: "paragraph",
        content:
          "The strongest movement routines are usually not the most extreme. They are the most sustainable.",
      },
      {
        type: "paragraph",
        content:
          "Strength training builds the engine. Yoga helps maintain the system around it.",
      },
      {
        type: "paragraph",
        content:
          "Together, they create a way of moving that feels powerful, grounded, and sustainable enough to continue for years — not just for a single season of training.",
      },
    ],
  },
];

export function getPostBySlug(slug) {
  return posts.find((post) => !post.archived && post.slug === slug);
}

export function getFeaturedPost() {
  return getRecentPosts().find((post) => post.featured) || getRecentPosts()[0];
}

export function getRecentPosts(limit = posts.length) {
  return posts.filter((post) => !post.archived)
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, limit);
}

export function getRelatedPosts(currentSlug, limit = 2) {
  return getRecentPosts().filter((post) => post.slug !== currentSlug).slice(0, limit);
}
