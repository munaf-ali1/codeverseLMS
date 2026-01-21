import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Typewriter } from "react-simple-typewriter";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 1) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.15,
      duration: 0.8,
      ease: "easeOut",
    },
  }),
};

const Landing = () => {
  const navigate = useNavigate();
  const { isLoggedIn } = useSelector((state) => state.user);
  const handleCardClick = (route) => {
  if (!isLoggedIn) {
    navigate("/login", {
      state: { from: route }, //  remember target page
    });
  } else {
    navigate(route);
  }

}
  

  


  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="
        min-h-screen pt-24 text-white
        bg-gradient-to-br from-black via-gray-900 to-indigo-950
        overflow-hidden
      "
    >
      {/* ================= HERO ================= */}
      <section className="min-h-[90vh] flex flex-col justify-center items-center text-center px-6">

        {/* MAIN HEADING */}
        <motion.h1
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="
            text-4xl md:text-6xl lg:text-7xl font-extrabold leading-tight
            bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-500
            bg-clip-text text-transparent
            drop-shadow-[0_10px_30px_rgba(99,102,241,0.35)]
          "
        >
          <Typewriter
            words={["Learn.", "Practice.", "Get Assessed."]}
            loop={0}
            cursor
            cursorStyle="|"
            typeSpeed={80}
            deleteSpeed={60}
            delaySpeed={1200}
          />
        </motion.h1>

        {/* SUB TEXT */}
        <motion.p
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={2}
          className="
            mt-8 max-w-2xl text-lg md:text-xl
            text-gray-300
          "
        >
          A modern coding LMS for developers — master courses,
          solve DSA problems, and take real-time assessments
          just like top tech companies.
        </motion.p>

        {/* CTA */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={3}
          className="mt-12 flex gap-6"
        >
          <Link
            to="/register"
            className="
              px-8 py-3 rounded-full font-semibold
              bg-indigo-600 hover:bg-indigo-500
              shadow-lg shadow-indigo-600/40
              transition
            "
          >
            Get Started
          </Link>

          <Link
            to="/login"
            className="
              px-8 py-3 rounded-full font-semibold
              border border-white/30
              hover:bg-white/10
              transition
            "
          >
            Login
          </Link>
        </motion.div>
      </section>

      {/* ================= FEATURES ================= */}
      <section className="py-28 max-w-7xl mx-auto px-6 grid md:grid-cols-3 gap-10 cursor-pointer">

        {[
          {
            title: "Structured Courses",
            desc: "Learn via curated courses with YouTube-based lessons.",
            route: "/courses",
          },
          {
            title: "DSA Practice",
            desc: "Solve topic-wise problems with submission tracking.",
            route: "/dsa",
          },
          {
            title: "Real Assessments",
            desc: "Take timed MCQ tests just like company exams.",
            route: "/tests",
          },
        ].map((item, i) => (
          <motion.div
            key={i}
            onClick={ () => handleCardClick(item.route)}
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={i}
            whileHover={{ y: -10 }}
            className="
              bg-white/5 backdrop-blur-lg
        border border-white/10
        rounded-2xl p-6
        shadow-xl shadow-black/40
        hover:shadow-indigo-500/30
        transition
             
            "
          >
            <h3 className="text-xl font-semibold mb-4">
              {item.title}
            </h3>
            <p className="text-gray-400">
              {item.desc}
            </p>
          </motion.div>
        ))}
      </section>

      
      <section className="pb-8 text-center">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="text-gray-400"
        >
          🔒 Login required to access courses, DSA practice, and tests
        </motion.p>
      </section>
    </motion.div>
  
  );


};

export default Landing;


