import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import getQuote from "./utils/getQuote";

export default function App() {
  const [quote, setQuote] = useState<{ author: string; quote: string }>(
    getQuote()
  );
  const [key, setKey] = useState(0);

  const handleClick = () => {
    const quote = getQuote();
    setQuote(quote);
    setKey((prev) => prev + 1);
  };

  return (
    <main className="w-full h-screen select-none">
      <section className="p-6 md:p-14 lg:p-24 max-w-[95%] h-full grid grid-rows-[1fr_5rem]">
        <div>
          <AnimatePresence mode="wait">
            <motion.div
              key={key}
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -50, opacity: 0 }}
              layout
            >
              <motion.h1
                initial={{ y: 15, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.3, delay: 0.2 }}
                className="text-4xl md:text-7xl lg:text-8xl font-black tracking-tight"
              >
                {quote.quote}
              </motion.h1>
              <motion.h2
                initial={{ y: 15, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 1.5 }}
                className="text-2xl md:text-4xl text-neutral-500 mt-2"
              >
                - {quote.author}
              </motion.h2>
            </motion.div>
          </AnimatePresence>
        </div>
        <motion.button
          onClick={handleClick}
          className="bg-white w-fit mt-5 h-fit text-black cursor-pointer hover:bg-transparent hover:text-white transition-all duration-200 text-xl md:text-3xl py-2 px-2.5 font-bold"
        >
          Give me another quote
        </motion.button>
      </section>
    </main>
  );
}
