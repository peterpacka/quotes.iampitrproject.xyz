import { positiveQuotes } from "../data/quotes";

export default function getQuote() {
  const seenQuotes: string[] = JSON.parse(
    localStorage.getItem("seenQuotes") || "[]",
  );

  let filtered = positiveQuotes.filter((q) => !seenQuotes.includes(q.quote));
  if (filtered.length === 0) {
    localStorage.removeItem("seenQuotes");
    filtered = positiveQuotes;
  }

  const randomQuote = filtered[Math.floor(Math.random() * filtered.length)];
  seenQuotes.push(randomQuote.quote);
  localStorage.setItem("seenQuotes", JSON.stringify(seenQuotes));
  return randomQuote;
}
