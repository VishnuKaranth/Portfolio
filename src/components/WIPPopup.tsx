"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function WIPPopup() {
  const LAST_UPDATED = "Updated on: 10 Dec 2025"; // <-- change this anytime

  const [show, setShow] = useState(false);

  useEffect(() => {
    // Show only once per session
    const hasSeen = sessionStorage.getItem("seen_wip_popup");
    if (!hasSeen) {
      setShow(true);
      sessionStorage.setItem("seen_wip_popup", "true");
    }
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[9999] flex justify-center items-center"
          onClick={() => setShow(false)}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-white/90 text-black w-[90%] md:w-[400px] p-6 rounded-xl shadow-xl"
          >
            <h2 className="text-xl font-bold mb-2">🚧 Work in Progress 🚧</h2>
            <p className="mb-4 text-sm text-black/80">
              This portfolio is currently being updated.  
              Some features may not be fully functional yet.
            </p>

            <p className="text-xs text-black/60">{LAST_UPDATED}</p>

            <button
              onClick={() => setShow(false)}
              className="mt-4 px-4 py-2 rounded-lg bg-black text-white w-full"
            >
              Continue
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
