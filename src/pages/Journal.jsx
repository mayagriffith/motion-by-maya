import { Link } from "react-router-dom";
import Container from "../components/Container.jsx";
import PageMeta from "../components/PageMeta.jsx";
import JournalCard from "../components/JournalCard.jsx";
import Button from "../components/Button.jsx";
import { getRecentPosts } from "../content/journal/posts.js";

export default function Journal() {
  const posts = getRecentPosts();

  return (
    <>
      <PageMeta
        title="Blog"
        description="Notes on yoga, strength training, mobility, recovery, and building a sustainable movement practice."
        path="/blog"
        keywords="yoga for strength training, mobility, recovery and movement, beginner yoga"
      />

      <section className="border-b border-[rgb(var(--mbm-line))]">
        <Container className="py-14 sm:py-20">
          <header className="max-w-3xl">
            <div className="home-eyebrow">
              <span className="home-eyebrow-line" aria-hidden="true" />
              Blog
            </div>
            <h1 className="mt-6 text-[clamp(2.75rem,6vw,4.5rem)] leading-[0.92] tracking-tight">
              Notes on movement, recovery, and real life.
            </h1>
            <p className="mt-5 text-base leading-relaxed text-[rgb(var(--mbm-muted))] sm:text-lg">
              Thoughtful writing on yoga, strength training, mobility, and
              building a practice that supports the way you actually live.
            </p>
          </header>

          <div className="mt-12">
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
