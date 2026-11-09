import { Link } from "react-router-dom";

function formatDate(dateStr) {
  return new Date(`${dateStr}T12:00:00`).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export default function JournalCard({ post, featured = false }) {
  return (
    <article
      className={`home-card group flex flex-col overflow-hidden rounded-[1.75rem] border border-[rgb(var(--mbm-line))] bg-white/45 ${
        featured ? "lg:flex-row" : ""
      }`}
    >
      <Link
        to={`/blog/${post.slug}`}
        className={`journal-cover block shrink-0 ${featured ? "lg:w-1/2" : ""}`}
        style={{ background: post.coverGradient }}
        aria-hidden="true"
        tabIndex={-1}
      >
        {post.coverImage ? (
          <img
            src={post.coverImage}
            alt={post.coverAlt || ""}
            className={`w-full object-cover ${featured ? "h-full min-h-56 lg:min-h-full" : "aspect-[16/10]"}`}
            loading="lazy"
            decoding="async"
            width={800}
            height={500}
          />
        ) : (
          <div
            className={`journal-cover-placeholder ${featured ? "min-h-56 lg:min-h-full" : "aspect-[16/10]"}`}
          />
        )}
      </Link>

      <div className={`flex flex-1 flex-col p-6 sm:p-7 ${featured ? "lg:justify-center" : ""}`}>
        <div className="flex flex-wrap items-center gap-2 text-xs text-[rgb(var(--mbm-muted))]">
          <time dateTime={post.date}>{formatDate(post.date)}</time>
          <span aria-hidden="true">·</span>
          <span>{post.readingTime} min read</span>
        </div>

        <h2 className={`mt-3 leading-tight ${featured ? "text-3xl sm:text-4xl" : "text-2xl"}`}>
          <Link className="transition hover:text-black/70" to={`/blog/${post.slug}`}>
            {post.title}
          </Link>
        </h2>

        <p className="mt-3 flex-1 text-sm leading-relaxed text-[rgb(var(--mbm-muted))] sm:text-[0.95rem]">
          {post.excerpt}
        </p>

        <div className="mt-5 flex flex-wrap gap-1.5">
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-[rgb(var(--mbm-bg))]/70 px-2.5 py-1 text-[11px] text-black/60 ring-1 ring-[rgb(var(--mbm-line))]"
            >
              {tag}
            </span>
          ))}
        </div>

        <Link
          to={`/blog/${post.slug}`}
          className="mt-5 inline-flex w-fit text-sm font-medium text-black/70 transition hover:text-black"
        >
          Read article →
        </Link>
      </div>
    </article>
  );
}
