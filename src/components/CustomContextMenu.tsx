import { motion } from "motion/react";

export const CustomContextMenu = ({
  x,
  y,
  selectedText,
}: {
  x: number;
  y: number;
  selectedText: string;
}) => {
  
  const handleCopySelectedText = (selectedText: string) => {
    if (selectedText) {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(selectedText);
      } else {
        const textarea = document.createElement("textarea");
        textarea.value = selectedText;
        document.body.appendChild(textarea);
        textarea.select();
        try {
          document.execCommand("copy");
        } catch (err) {
          console.error(err);
        } finally {
        document.body.removeChild(textarea);
        }
      }
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.08 }}
      className="fixed h-fit min-w-[8rem] rounded-lg bg-[#0a0a0a]/80 p-2 text-white backdrop-blur-lg"
      style={{ top: y, left: x }}
    >
      <button
        onClick={() => handleCopySelectedText(selectedText)}
        className="flex w-full cursor-pointer items-center gap-2 rounded p-1 text-left font-medium transition-all duration-100 hover:bg-blue-500/50"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
          <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
        </svg>
        Copy
      </button>
    </motion.div>
  );
};
