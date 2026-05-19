import React, { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import data from "../assets/data/pagesData.json";
import Header from "../components/Header";
import { motion, AnimatePresence } from "motion/react";
import Footer from "../components/Footer";
import { IoSearchOutline, IoClose } from "react-icons/io5";
import { MdArrowForward, MdFilterList } from "react-icons/md";
import HomeCard from "../components/HomeCard";
import useAuthStore from "../store/useAuthStore";

const Home = () => {
  const { user } = useAuthStore();
  const navigate = useNavigate();
  const [index, setIndex] = useState(0);
  const [searchInput, setSearchInput] = useState("");
  const [selectedTechs, setSelectedTechs] = useState([]);
  const [showFilters, setShowFilters] = useState(false);

  // Extract unique technologies
  const allTechs = useMemo(() => {
    const techs = new Set();
    data.forEach((item) => {
      if (item.tech) {
        item.tech.split(",").forEach((t) => techs.add(t.trim()));
      }
    });
    return Array.from(techs).sort();
  }, []);

  // Filter data based on search and selected technologies
  const filteredData = useMemo(() => {
    return data.filter((item) => {
      const matchesSearch = item.title
        .toLowerCase()
        .includes(searchInput.toLowerCase());
      const matchesTech =
        selectedTechs.length === 0 ||
        selectedTechs.some((tech) => item.tech?.includes(tech));
      return matchesSearch && matchesTech;
    });
  }, [searchInput, selectedTechs]);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1 >= data.length ? 0 : prev + 1));
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const handlePrev = () => {
    setIndex((prev) => (prev === 0 ? data.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setIndex((prev) => (prev + 1 >= data.length ? 0 : prev + 1));
  };

  const toggleTech = (tech) => {
    setSelectedTechs((prev) =>
      prev.includes(tech) ? prev.filter((t) => t !== tech) : [...prev, tech],
    );
  };

  const clearFilters = () => {
    setSearchInput("");
    setSelectedTechs([]);
  };

  return (
    <>
      <Header
        showInfinity={true}
        heading="Pages"
        showUser={true}
        name1={user ? "" : "Home"}
        name2={user ? "" : "Login"}
        name3={user ? "" : "Register"}
        fun1={() => navigate("/")}
        fun2={() => navigate("/login")}
        fun3={() => navigate("/register")}
      />

      <div className="min-h-dvh">
        {/* Hero Section with Featured Project */}
        <div className="pt-8 px-4 md:px-8 max-w-7xl mx-auto">
          {/* <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent mb-4">
              Explore Amazing Projects
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl">
              Discover interactive applications built with modern technologies.
              Each project is crafted to showcase creativity and innovation.
            </p>
          </motion.div> */}

         
          {/* <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mb-16"
          >
            <div className="relative group">
              <div className="relative h-64 md:h-96 lg:h-[450px] rounded-3xl overflow-hidden shadow-2xl">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={data[index].img}
                    initial={{ opacity: 0, scale: 1.1 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.6 }}
                    className="absolute inset-0"
                  >
                    <img
                      src={data[index].img}
                      alt={data[index].title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  </motion.div>
                </AnimatePresence>
                
                <AnimatePresence mode="wait">
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.4 }}
                    className="absolute bottom-0 left-0 right-0 p-6 md:p-8 text-white"
                  >
                    <h2 className="text-3xl md:text-4xl font-bold mb-2">
                      {data[index].title}
                    </h2>
                    <p className="text-blue-100 text-sm md:text-base mb-4">
                      {data[index].desc}
                    </p>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => navigate(data[index].link)}
                      className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 px-6 py-3 rounded-full font-semibold transition-all shadow-lg"
                    >
                      Explore Now <MdArrowForward className="text-lg" />
                    </motion.button>
                  </motion.div>
                </AnimatePresence>
              </div>

              <div className="flex items-center justify-between mt-6">
                <div className="flex gap-2">
                  {data.map((_, idx) => (
                    <motion.button
                      key={idx}
                      onClick={() => setIndex(idx)}
                      className={`h-2 rounded-full transition-all ${
                        idx === index ? "bg-blue-500 w-8" : "bg-gray-300 w-2"
                      }`}
                      whileHover={{ scale: 1.2 }}
                    />
                  ))}
                </div>

                <div className="flex gap-3">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={handlePrev}
                    className="p-3 bg-white rounded-full shadow-lg hover:shadow-xl hover:bg-gray-50 transition-all"
                  >
                    ←
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={handleNext}
                    className="p-3 bg-blue-500 text-white rounded-full shadow-lg hover:shadow-xl hover:bg-blue-600 transition-all"
                  >
                    →
                  </motion.button>
                </div>
              </div>
            </div>
          </motion.div> */}

        
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-12"
          >
            {/* Search Bar */}
            <div className="relative mb-6">
              <div className="relative max-w-2xl mx-auto">
                <IoSearchOutline className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl" />
                <input
                  type="text"
                  placeholder="Search projects by name..."
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  className="w-full pl-12 pr-12 py-4 rounded-2xl border-2 border-transparent bg-white shadow-lg hover:shadow-xl focus:shadow-xl focus:border-blue-500 outline-none transition-all"
                />
                {searchInput && (
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setSearchInput("")}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    <IoClose className="text-xl" />
                  </motion.button>
                )}
              </div>
            </div>

            {/* Filter Section */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.25 }}
            >
              <div className="flex items-center justify-between mb-4 px-2">
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="flex items-center gap-2 px-4 py-2 rounded-full bg-white shadow-md hover:shadow-lg transition-all hover:bg-gray-50"
                >
                  <MdFilterList className="text-lg text-blue-500" />
                  <span className="font-semibold text-gray-700">Filters</span>
                  {(selectedTechs.length > 0 || searchInput) && (
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="ml-2 px-2 py-1 bg-blue-500 text-white text-xs font-bold rounded-full"
                    >
                      {selectedTechs.length + (searchInput ? 1 : 0)}
                    </motion.span>
                  )}
                </button>

                {(selectedTechs.length > 0 || searchInput) && (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={clearFilters}
                    className="px-4 py-2 text-sm font-semibold text-blue-500 hover:bg-blue-50 rounded-full transition-colors"
                  >
                    Clear All
                  </motion.button>
                )}
              </div>

              {/* Filter Tags */}
              <AnimatePresence>
                {showFilters && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
                      <h3 className="text-sm font-bold text-gray-900 mb-4 uppercase tracking-wide">
                        Technology Stack
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        <AnimatePresence>
                          {allTechs.map((tech) => (
                            <motion.button
                              key={tech}
                              initial={{ opacity: 0, scale: 0.8 }}
                              animate={{ opacity: 1, scale: 1 }}
                              exit={{ opacity: 0, scale: 0.8 }}
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() => toggleTech(tech)}
                              className={`px-4 py-2 rounded-full font-medium transition-all text-sm ${
                                selectedTechs.includes(tech)
                                  ? "bg-gradient-to-r from-blue-500 to-indigo-500 text-white shadow-lg"
                                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                              }`}
                            >
                              {tech}
                            </motion.button>
                          ))}
                        </AnimatePresence>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </motion.div>

          {/* Projects Grid Section */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mb-16"
          >
            {/* Section Header with Stats */}
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                  {searchInput || selectedTechs.length > 0
                    ? "Filtered Projects"
                    : "All Projects"}
                </h2>
                <p className="text-gray-600">
                  {filteredData.length} of {data.length} projects
                </p>
              </div>
              {(searchInput || selectedTechs.length > 0) && (
                <motion.div
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="text-right"
                >
                  <p className="text-sm text-gray-600 mb-2">Active Filters:</p>
                  <div className="flex flex-wrap gap-2 justify-end">
                    {searchInput && (
                      <span className="px-3 py-1 bg-blue-100 text-blue-700 text-xs font-semibold rounded-full">
                        "{searchInput}"
                      </span>
                    )}
                    {selectedTechs.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 bg-indigo-100 text-indigo-700 text-xs font-semibold rounded-full"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </motion.div>
              )}
            </div>

            {/* Projects Grid */}
            {filteredData.length > 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12"
              >
                <AnimatePresence mode="popLayout">
                  {filteredData.map((item, key) => (
                    <HomeCard key={item.title} item={item} index={key} />
                  ))}
                </AnimatePresence>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="text-center py-16"
              >
                <div className="mb-6">
                  <MdFilterList className="mx-auto text-6xl text-gray-300 mb-4" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  No projects found
                </h3>
                <p className="text-gray-600 mb-6 max-w-md mx-auto">
                  {searchInput && selectedTechs.length > 0
                    ? "Try adjusting your search or filters to find what you're looking for."
                    : searchInput
                      ? `No projects match "${searchInput}". Try a different search term.`
                      : "No projects match the selected technologies. Try different filters."}
                </p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={clearFilters}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-full font-semibold hover:shadow-lg transition-all"
                >
                  <IoClose className="text-lg" />
                  Clear Filters
                </motion.button>
              </motion.div>
            )}
          </motion.div>
        </div>

        <Footer />
      </div>
    </>
  );
};

export default Home;
