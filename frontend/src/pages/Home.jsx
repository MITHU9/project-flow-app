import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Home = () => {
  return (
    <div>
      <Navbar />
      <div className="relative flex justify-center items-center min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-black overflow-hidden px-6">
        {/* Sunrise glow */}
        <div className="absolute bottom-[-150px] w-[600px] h-[600px] rounded-full bg-gradient-to-t from-yellow-400 via-orange-500 to-transparent opacity-30 animate-rise-slow blur-3xl"></div>

        {/* Faint clouds */}
        <div className="absolute bottom-0 w-full h-40 bg-gradient-to-t from-gray-900 via-gray-800 to-transparent opacity-20 blur-xl"></div>

        {/* Stars */}
        <div className="star top-[5%] left-[15%]"></div>
        <div
          className="star top-[25%] left-[50%]"
          style={{ animationDelay: "1s" }}
        ></div>
        <div
          className="star top-[60%] left-[80%]"
          style={{ animationDelay: "2s" }}
        ></div>

        {/* Page content */}
        <div className="relative z-10 text-center text-white">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Organize Your Work with{" "}
            <span className="text-yellow-400">ProjectFlow</span>
          </h1>
          <p className="text-lg mx-auto text-gray-300 mb-8 max-w-2xl">
            A simple yet powerful Kanban board app to manage your projects and
            tasks efficiently. Drag, drop, and collaborate with ease.
          </p>
          <div className="space-x-4">
            <Link
              to="/register"
              className="bg-yellow-400 hover:bg-yellow-500 text-black px-6 py-3 rounded-lg shadow-lg font-semibold transition-all transform hover:scale-105"
            >
              Get Started
            </Link>
            <Link
              to="/login"
              className="bg-gray-800 hover:bg-gray-700 text-white px-6 py-3 rounded-lg shadow-lg font-semibold transition-all transform hover:scale-105"
            >
              Login
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Home;
