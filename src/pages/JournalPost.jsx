import { Link, Navigate, useParams } from "react-router-dom";
import Container from "../components/Container.jsx";
import PageMeta from "../components/PageMeta.jsx";
import Button from "../components/Button.jsx";
import { getPostBySlug } from "../content/journal/posts.js";

function formatDate(dateStr) {
  return new Date(`${dateStr}T12:00:00`).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

function ArticleBody({ blocks }) {
  return (
    <div className="journal-article-body mt-10 max-w-3xl space-y-5 text-base leading-relaxed text-[rgb(var(--mbm-muted))] sm:text-lg">
      {blocks.map((block, index) => {
        if (block.type === "heading") {
          return (
            <h2
              key={`${block.content}-${index}`}
              className="pt-4 font-serif text-2xl leading-tight text-[rgb(var(--mbm-ink))] sm:text-3xl"
            >
              {block.content}
            </h2>
          );
        }

        if (block.type === "list") {
          return (
            <ul
              key={`list-${index}`}
              className="grid gap-2 pl-1 text-base sm:text-lg"
            >
              {block.items.map((item) => (
                <li key={item} className="flex gap-3">
                  <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-black/35" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          );
        }

        return (
          <p key={`${block.content.slice(0, 32)}-${index}`}>{block.content}</p>
        );
      })}
    </div>
  );
}

export default function JournalPost() {
  const { slug } = useParams();
  const post = getPostBySlug(slug);

  if (!post) {
    return <Navigate to="/blog" replace />;
  }

  return (
    <>
      <PageMeta
        title={post.title}
        description={post.seoDescription || post.excerpt}
        path={`/blog/${post.slug}`}
        type="article"
        keywords={post.tags.join(", ")}
      />

      <article className="border-b border-[rgb(var(--mbm-line))]">
        <Container className="py-14 sm:py-20">
          <header className="max-w-3xl">
            <Link
              to="/blog"
              className="inline-flex text-sm text-[rgb(var(--mbm-muted))] transition hover:text-black"
            >
              ← Back to blog
            </Link>

            <div className="mt-6 flex flex-wrap items-center gap-2 text-sm text-[rgb(var(--mbm-muted))]">
              <time dateTime={post.date}>{formatDate(post.date)}</time>
              <span aria-hidden="true">·</span>
              <span>{post.readingTime} min read</span>
            </div>

            <h1 className="mt-4 text-[clamp(2.5rem,5vw,4rem)] leading-[0.95] tracking-tight">
              {post.title}
            </h1>

            <p className="mt-5 text-lg leading-relaxed text-[rgb(var(--mbm-muted))]">
              {post.excerpt}
            </p>

            <div className="mt-5 flex flex-wrap gap-1.5">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-white/60 px-2.5 py-1 text-[11px] text-black/60 ring-1 ring-[rgb(var(--mbm-line))]"
                >
                  {tag}
                </span>
              ))}
            </div>
          </header>

          <div className="journal-article-cover mt-10 overflow-hidden rounded-[1.75rem] border border-[rgb(var(--mbm-line))]">
            {post.coverImage ? (
              <img
                src={post.coverImage}
                alt=""
                className="aspect-[21/9] w-full object-cover"
                loading="lazy"
              />
            ) : (
              <div className="journal-cover-placeholder aspect-[21/9] w-full" />
            )}
          </div>

          <ArticleBody blocks={post.body} />

          <div className="mt-12 flex flex-wrap gap-3 border-t border-[rgb(var(--mbm-line))] pt-8">
            {post.externalLink && (
              <Button as="a" href={post.externalLink.href}>
                {post.externalLink.label}
              </Button>
            )}
            <Button as={Link} to="/classes">
              Explore classes
            </Button>
            <Button as={Link} to="/contact" variant="ghost">
              Get in touch
            </Button>
          </div>
        </Container>
      </article>
    </>
  );
}
