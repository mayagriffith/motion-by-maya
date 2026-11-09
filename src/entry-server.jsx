/**
 * Build-time renderer: turns a route into HTML so each page ships with its
 * real text (used by scripts/prerender.mjs; never runs in the browser).
 */
import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router";
import App from "./App.jsx";

export function render(url) {
  return renderToString(
    <StaticRouter location={url}>
      <App />
    </StaticRouter>
  );
}
