/**
 * Testimonials for /private. Replace a placeholder with a real quote and set
 * placeholder: false. The section stays hidden while every entry is a placeholder.
 */
export const testimonials = [
  { quote: "", name: "", neighborhood: "", context: "Private client, 5-pack", placeholder: true },
  { quote: "", name: "", neighborhood: "", context: "Corporate class student", placeholder: true },
  { quote: "", name: "", neighborhood: "", context: "Runner, in-home sessions", placeholder: true },
];

export function getRealTestimonials() {
  return testimonials.filter((t) => !t.placeholder && t.quote.trim());
}
