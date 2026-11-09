import { Link } from "react-router-dom";
import Container from "../components/Container.jsx";
import PageMeta from "../components/PageMeta.jsx";
import { pages } from "../content/pageMeta.js";
import JournalCard from "../components/JournalCard.jsx";
import Button from "../components/Button.jsx";
import { getRecentPosts } from "../content/journal/posts.js";

export default function Journal() {
  const posts = getRecentPosts();

  return (
    <>
      <PageMeta {...pages["/blog"]} />

      <section className="border-b border-[rgb(var(--mbm-line))]">
        <Container className="py-14 sm:py-20">
          <header className="max-w-3xl">
            <div className="home-eyebrow">
              <span className="home-eyebrow-line" aria-hidden="true" />
              Blog
            </div>
            <h1 className="mt-6 text-[clamp(2.75rem,6vw,4.5rem)] leading-[0.92] tracking-tight">
              Yoga, teaching, and what I’m working on.
            </h1>
            <p className="mt-5 text-base leading-relaxed text-[rgb(var(--mbm-muted))] sm:text-lg">
              Class notes, practical ideas, and updates from Maya.
            </p>
          </header>

          <div className="mt-12">
            {posts.length === 0 && <p className="text-[rgb(var(--mbm-muted))]">New posts are on the way. In the meantime, you can explore classes or get in touch.</p>}
            {posts.map((post) => (
              <JournalCard key={post.slug} post={post} featured />
            ))}
          </div>

          <div className="mt-10 flex flex-wrap gap-3">
            <Button as={Link} to="/what-to-expect" variant="ghost">
              New to yoga?
            </Button>
            <Button as={Link} to="/classes">
              Explore classes
            </Button>
          </div>
        </Container>
      </section>
    </>
  );
}
