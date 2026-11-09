import { NavLink } from "react-router-dom";
import Container from "../components/Container.jsx";
import Button from "../components/Button.jsx";
import PageMeta from "../components/PageMeta.jsx";
import { notFoundMeta } from "../content/pageMeta.js";

export default function NotFound() {
  return (
    <>
    <PageMeta {...notFoundMeta} />
    <section className="border-b border-[rgb(var(--mbm-line))]">
      <Container className="py-16">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-medium uppercase tracking-[0.24em] text-black/50">
            404
          </p>
          <h1 className="mt-4 text-5xl leading-[0.95] tracking-tight sm:text-6xl">
            Page not found.
          </h1>
          <p className="mt-5 text-[rgb(var(--mbm-muted))] sm:text-lg">
            This route wandered off the mat.
          </p>
          <div className="mt-8 flex justify-center gap-3">
            <Button as={NavLink} to="/">
              Go home
            </Button>
            <Button as={NavLink} to="/classes" variant="ghost">
              View classes
            </Button>
          </div>
        </div>
      </Container>
    </section>
    </>
  );
}