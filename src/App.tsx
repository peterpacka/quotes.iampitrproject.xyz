import { motion } from "motion/react";
import { useEffect, useState } from "react";
import getQuote from "./utils/getQuote";
import { CustomContextMenu } from "./components/CustomContextMenu";

export default function App() {
  const [quote, setQuote] = useState<{ author: string; quote: string }>(() =>
    getQuote(),
  );
  const [menu, setMenu] = useState<{
    x: number;
    y: number;
    selectedText: string;
  } | null>(null);

  const handleClick = () => {
    const quote = getQuote();
    setQuote(quote);
  };

  useEffect(() => {
    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault();

      const selection = window.getSelection();
      if (selection && selection.toString().length > 0) {
        setMenu({
          x: e.clientX,
          y: e.clientY,
          selectedText: selection.toString(),
        });
      } else {
        setMenu(null);
      }
    };

    const handleGlobalClick = () => setMenu(null);

    window.addEventListener("click", handleGlobalClick);
    window.addEventListener("contextmenu", handleContextMenu);
    return () => {
      window.removeEventListener("click", handleGlobalClick);
      window.removeEventListener("contextmenu", handleContextMenu);
    };
  }, []);

  return (
    <main className="mx-auto flex h-screen max-w-[1600px] flex-col px-4 py-8 selection:bg-white selection:text-blue-500 md:px-8">
      {menu && (
        <CustomContextMenu
          x={menu.x}
          y={menu.y}
          selectedText={menu.selectedText}
        />
      )}
      <section key={quote.quote} className="mt-10 flex flex-1 flex-col gap-2">
        <motion.h1
          initial={{ opacity: 0, scale: 0.9, y: -15, color: "#2b7fff" }}
          animate={{ opacity: 1, scale: 1, y: 0, color: "#fff" }}
          transition={{ duration: 0.5, ease: "easeIn" }}
          className="max-w-4xl text-5xl font-black text-balance md:text-6xl lg:text-7xl"
        >
          {quote.quote}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, scale: 0.9, y: -15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeIn", delay: 0.9 }}
          className="text-2xl font-light text-gray-500 italic md:text-4xl"
        >
          - {quote.author}
        </motion.p>
      </section>
      <section className="flex flex-col gap-y-2 max-md:justify-center">
        <button
          className="w-full cursor-pointer rounded-lg bg-white px-2 py-1 text-2xl leading-tight font-bold text-black shadow ring-2 ring-transparent outline-0 transition-all duration-200 hover:bg-transparent hover:px-4 hover:text-white hover:ring-blue-500 focus-visible:bg-transparent focus-visible:px-4 focus-visible:text-white focus-visible:ring-blue-500 active:scale-[0.95] active:bg-blue-500 active:text-white md:w-fit md:text-3xl"
          onClick={handleClick}
        >
          Give me another quote
        </button>
        <p className="text-sm text-neutral-500 max-md:text-center">
          Made by:{" "}
          <a
            className="text-neutral-400 hover:underline"
            href="https://iampitrproject.xyz"
            target="_blank"
          >
            Pitr
          </a>
        </p>
      </section>
    </main>
  );
}
