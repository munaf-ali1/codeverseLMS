import { motion } from "framer-motion";


const AuthLayout = ({ children, title, subtitle }) => {
  return (
    <div
      className="
        min-h-screen flex items-center justify-center
        bg-gradient-to-br from-black via-gray-900 to-indigo-950
        px-4
      "
    >
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="
          w-full max-w-md
          bg-white/5 backdrop-blur-xl
          border border-white/10
          rounded-2xl p-8
          shadow-2xl shadow-black/50
        "
      >
        <h2
          className="
            text-3xl font-bold text-center
            bg-gradient-to-r from-indigo-400 to-purple-500
            bg-clip-text text-transparent
          "
        >
          {title}
        </h2>

        <p className="text-center text-gray-400 mt-2 mb-8">
          {subtitle}
        </p>

        {children}
      </motion.div>
    </div>
  );
};

export default AuthLayout;
