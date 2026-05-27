import { useId, useState } from "react";
import clsx from "clsx";

export default function Accordion({ items }) {
  const [openIndex, setOpenIndex] = useState(-1);
  const baseId = useId();

  return (
    <div className="divide-y divide-[rgb(var(--mbm-line))] rounded-[1.75rem] border border-[rgb(var(--mbm-line))] bg-white/45">
      {items.map((item, index) => {
        const isOpen = openIndex === index;
        const panelId = `${baseId}-panel-${index}`;
        const buttonId = `${baseId}-button-${index}`;

        return (
          <div key={item.question} className="accordion-item">
            <button
              id={buttonId}
              type="button"
              className="flex w-full items-start gap-4 px-6 py-5 text-left transition hover:bg-white/40 sm:px-7"
              aria-expanded={isOpen}
              aria-controls={panelId}
              onClick={() => setOpenIndex(isOpen ? -1 : index)}
            >
              {item.icon && (
                <span className="accordion-icon mt-0.5 shrink-0" aria-hidden="true">
                  {item.icon}
                </span>
              )}
              <span className="flex-1">
                <span className="block text-lg leading-tight">{item.question}</span>
              </span>
              <span
                className={clsx(
                  "mt-1 shrink-0 text-black/40 transition-transform duration-300",
                  isOpen && "rotate-180"
                )}
                aria-hidden="true"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M6 9l6 6 6-6"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            </button>

            <div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              hidden={!isOpen}
              className={clsx("accordion-panel", isOpen && "accordion-panel--open")}
            >
              <div className="accordion-panel-inner">
                <p className="accordion-panel-content text-sm leading-relaxed text-[rgb(var(--mbm-muted))] sm:text-base">
                  {item.answer}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
