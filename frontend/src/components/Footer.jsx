import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

const Footer = () => {
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 300);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      {/* ===== GRADIENT WAVE ===== */}
      <div className="relative overflow-hidden bg-gradient-to-br from-black via-gray-900 to-indigo-950">
        <svg
          viewBox="0 0 1200 80"
          preserveAspectRatio="none"
          className="w-full h-[60px]"
        >
          <defs>
            <linearGradient id="waveGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#4f46e5">
                <animate
                  attributeName="stop-color"
                  values="#4f46e5;#9333ea;#4f46e5"
                  dur="6s"
                  repeatCount="indefinite"
                />
              </stop>
              <stop offset="100%" stopColor="#9333ea">
                <animate
                  attributeName="stop-color"
                  values="#9333ea;#4f46e5;#9333ea"
                  dur="6s"
                  repeatCount="indefinite"
                />
              </stop>
            </linearGradient>
          </defs>

          <path
            d="M0,40 C150,70 350,10 600,25 850,40 1050,60 1200,30 L1200,0 L0,0 Z"
            fill="url(#waveGradient)"
            opacity="0.25"
          />
        </svg>
      </div>

      {/* ===== FOOTER ===== */}
      <footer className="bg-gradient-to-br from-black via-gray-900 to-indigo-950 text-gray-300">
        <div className="max-w-7xl mx-auto px-6 py-8 grid gap-8 md:grid-cols-4">

          {/* BRAND */}
          <div>
            <h2 className="text-lg font-bold text-white mb-2">
              CodeVerse
            </h2>
            <p className="text-xs text-gray-400 leading-relaxed">
              Learn. Practice. Get assessed.  
              A modern LMS for developers.
            </p>
          </div>

          {/* LINKS */}
          <div>
            <h3 className="text-white text-sm font-semibold mb-2">
              Explore
            </h3>
            <ul className="space-y-1 text-xs">
              <li><Link to="/" className="hover:text-indigo-400">Home</Link></li>
              <li><Link to="/courses" className="hover:text-indigo-400">Courses</Link></li>
              <li><Link to="/tests" className="hover:text-indigo-400">Tests</Link></li>
            </ul>
          </div>

          {/* RESOURCES */}
          <div>
            <h3 className="text-white text-sm font-semibold mb-2">
              Resources
            </h3>
            <ul className="space-y-1 text-xs">
              <li><Link to="/login" className="hover:text-indigo-400">Login</Link></li>
              <li><Link to="/register" className="hover:text-indigo-400">Register</Link></li>
            </ul>
          </div>

          {/* TAGLINE */}
          <div>
            <h3 className="text-white text-sm font-semibold mb-2">
              Build with confidence
            </h3>
            <p className="text-xs text-gray-400">
              Crack interviews with real assessments.
            </p>
          </div>
        </div>

        {/* BOTTOM */}
        <div className="border-t border-white/10 py-3 text-center text-[11px] text-gray-500">
          © {new Date().getFullYear()} CodeVerse
        </div>
      </footer>

      {/* ===== SCROLL TO TOP ===== */}
      {showTop && (
        <motion.button
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          whileHover={{ scale: 1.15 }}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="
            fixed bottom-5 right-5 z-50
            w-10 h-10 rounded-full
            bg-indigo-600 text-white
            shadow-md shadow-indigo-600/40
            flex items-center justify-center
            text-sm
          "
        >
          ↑
        </motion.button>
      )}
    </>
  );
};

export default Footer;


