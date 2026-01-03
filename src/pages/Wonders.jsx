import React, { useRef, useState, useEffect } from "react";
import { motion } from "motion/react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

const data = [
  {
    key: "1",
    img1: "/images/wonders/taj1.webp",
    img2: "/images/wonders/tajsm.png",
    title: "Taj Mahal",
    country: "India",
    desc: "Built by Emperor Shah Jahan in memory of his wife Mumtaz. Made of white marble that changes color with the light. Known worldwide as a symbol of love and architectural perfection.",
  },
  {
    key: "2",
    img1: "/images/wonders/eiffel.webp",
    img2: "/images/wonders/eiffelsm.png",
    title: "Eiffel Tower",
    country: "France",
    desc: "Built in 1889 for the Paris World’s Fair, the Eiffel Tower was once criticized — now it’s one of the most famous structures in the world. Made of iron and standing about 324 meters tall, it was the tallest man-made structure for decades.",
  },
  {
    key: "3",
    img1: "/images/wonders/wall.jpg",
    img2: "/images/wonders/wallsm.png",
    title: "Great Wall of China",
    country: "China",
    desc: "Stretches thousands of kilometers across deserts, hills, and mountains. Built over many dynasties to defend against invasions. Parts are ruined, but huge sections still stand strong.",
  },
  {
    key: "4",
    img1: "/images/wonders/pyramid.png",
    img2: "/images/wonders/pyramidsm.png",
    title: "Pyramids of Giza",
    country: "Giza",
    desc: "The Pyramids of Giza were built in ancient Egypt as tombs for pharaohs. The largest, the Great Pyramid of Khufu, was once the tallest structure on Earth.",
  },
  {
    key: "4",
    img1: "/images/wonders/machu.jpg",
    img2: "/images/wonders/machusm.png",
    title: "Machu Picchu",
    country: "Peru",
    desc: "Incan city built high in the Andes, overlooking deep valleys. Features terraces, temples, and precise stonework without mortar. Abandoned long ago and rediscovered in 1911.",
  },
  
  {
    key: "5",
    img1: "/images/wonders/petra1.jpg",
    img2: "/images/wonders/petrasm.png",
    title: "Petra",
    country: "Jordan",
    desc: "Hidden in a desert canyon and reached through a narrow rock passage (the Siq). Temples and tombs are carved directly into rose-colored cliffs. Once a rich trading center linking Arabia, Egypt, and the Mediterranean.",
  },
  {
    key: "6",
    img1: "/images/wonders/colosseum1.jpg",
    img2: "/images/wonders/colosseum.jpg",
    title: "Colosseum",
    country: "Italy",
    desc: "Massive Roman arena that could hold tens of thousands of people. Hosted gladiator fights, wild-animal hunts, and public events. Still stands as one of Rome’s greatest engineering achievements.",
  },
  {
    key: "7",
    img1: "/images/wonders/christ.jpg",
    img2: "/images/wonders/christsm.png",
    title: "Christ the Redeemer",
    country: "Brazil",
    desc: "38-meter-tall statue atop Mount Corcovado in Rio. Built from reinforced concrete and soapstone. Seen as a symbol of peace, hope, and the welcoming spirit of Brazil.",
  },
  {
    key: "8",
    img1: "/images/wonders/chichenItza.jpg",
    img2: "/images/wonders/chichenItzasm.png",
    title: "Chichén Itzá ",
    country: "Mexico",
    desc: "Major Mayan city known for the pyramid El Castillo. During equinoxes, shadows create the illusion of a serpent sliding down the steps. Shows the Mayans’ advanced math, astronomy, and architecture.",
  },
];

const Wonders = () => {
  const [index, setIndex] = useState(0);
  const [key, setKey] = useState(0);
  const [show, setShow] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setShow(false);
    }, 1200);
  }, []);

  useEffect(() => {
    const handle = (e) => {
      if (e.key === "ArrowLeft") {
        setIndex((prev) => (prev - 1 < 0 ? data.length - 1 : prev - 1));
        setKey(k => k + 1);
      }
      if (e.key === "ArrowRight") {
        setIndex((prev) => (prev + 1 >= data.length ? 0 : prev + 1));
        setKey(k => k + 1);
      }
    };

    window.addEventListener("keydown", handle);
    return () => window.removeEventListener("keydown", handle);
  }, []);

  return (
    <>
      {show ? (
        <div className="relative w-screen h-dvh overflow-hidden flex">
          <motion.p
            initial={{ y: -200, scale: 0.8 }}
            animate={{ y: 0, scale: 1.1 }}
            transition={{ duration: 0.8 }}
            className="z-20  md:text-4xl text-blue-600 md:text-white font-extrabold mx-auto mt-16"
          >
            Explore the Wonders of the World
          </motion.p>
          <img
            src="/images/wonders/hero.jpg"
            alt=""
            className="absolute hidden md:flex top-0 left-0 w-full h-full object-cover object-center md:object-[0%_20%]"
          />

          <motion.img
            initial={{ scale: 0.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1 }}
            src="/images/wonders/img.png"
            alt=""
            className="block md:hidden animate-rotate-slow w-72 h-72 absolute top-[50%] left-[50%] -translate-[50%]"
          />
        </div>
      ) : (
        <div className="relative w-screen h-dvh overflow-hidden">
          <img
            src={data[index].img1}
            alt=""
            className="absolute top-0 left-0 w-full h-full object-cover object-center opacity-70"
          />
          <div
            key={key}
            className="container flex gap-4 md:gap-6 absolute top-[32%] md:top-[50%] md:-translate-y-[50%]  md:left-[4%] w-full justify-center md:w-fit"
          >
            <motion.div
            //   key={data[index].key}
              whileTap={{ scale: 0.1 }}
              initial={{scale:1.1}}
              animate={{scale:1}}
              transition={{ duration: 1 }}
              style={{ backgroundImage: `url(${data[index].img2})` }}
              className={`slice bg-[url()] bg-cover bg-position-[5%,0%] h-80 w-12 md:h-100 md:w-16 rounded-2xl shadow-2xl`}
            />
            <motion.div
            //   key={data[index].key}
              whileTap={{ scale: 0.1 }}
              animate={{ scaleY: 1.2 }}
              transition={{ duration: 1 }}
              style={{ backgroundImage: `url(${data[index].img2})` }}
              className={`slice bg-[url()] bg-cover bg-position-[20%_0%] h-80 w-12 md:h-100 md:w-16 rounded-2xl shadow-2xl`}
            />
            <motion.div
            //   key={data[index].key}
              whileTap={{ scale: 0.1 }}
              animate={{ scaleY: 1.3 }}
              transition={{ duration: 1 }}
              style={{ backgroundImage: `url(${data[index].img2})` }}
              className={`slice bg-[url()] bg-cover bg-position-[30%_0%] h-80 w-12 md:h-100 md:w-16 rounded-2xl shadow-2xl`}
            />
            <motion.div
            //   key={data[index].key}
              whileTap={{ scale: 0.1 }}
              initial={{scale:1.1}}
              animate={{scale:1}}
              transition={{ duration: 1 }}
              style={{ backgroundImage: `url(${data[index].img2})` }}
              className={`slice bg-[url()] bg-cover bg-position-[50%_0%] h-80 w-12 md:h-100 md:w-16 rounded-2xl shadow-2xl`}
            />
            <motion.div
            //   key={data[index].key}
              whileTap={{ scale: 0.1 }}
              animate={{ scaleY: 1.15 }}
              transition={{ duration: 1 }}
              style={{ backgroundImage: `url(${data[index].img2})` }}
              className={`slice bg-[url()] bg-cover bg-position-[60%_0%] h-80 w-12 md:h-100 md:w-16 rounded-2xl shadow-2xl`}
            />
            <motion.div
            //   key={data[index].key}
              whileTap={{ scale: 0.1 }}
              animate={{ scaleY: 1.25 }}
              transition={{ duration: 1 }}
              style={{ backgroundImage: `url(${data[index].img2})` }}
              className={`slice bg-[url()] bg-cover bg-position-[80%_0%] h-80 w-12 md:h-100 md:w-16 rounded-2xl shadow-2xl`}
            />
          </div>

          <motion.div
            key={key + "500"}
            initial={{ x: 550 }}
            animate={{ x: 0 }}
            transition={{ duration: 0.3 }}
            whileTap={{ scale: 1.2 }}
            className="absolute right-[50%] translate-x-[50%] md:translate-x-[0%] md:right-[5%] top-5 md:top-[50%] w-[90%] md:w-[480px] md:-translate-y-[50%] z-20  text-white bg-black/40 p-3 md:p-4 rounded-2xl font-extrabold shadow-2xl overflow-hidden"
          >
            <motion.p
              initial={{ y: -70 }}
              animate={{ y: 0 }}
              transition={{ duration: 0.2, delay: 0.4 }}
              className="md:text-2xl my-2 flex items-center gap-2"
            >
              <span className="text-xl md:text-4xl">{data[index].title}</span>{" "}
              <span className="hidden md:block">({data[index].country})</span>
            </motion.p>
            <motion.p
              initial={{ y: 170 }}
              animate={{ y: 0 }}
              transition={{ duration: 0.2, delay: 0.7 }}
              className="text-[13px]"
            >
              {data[index].desc}
            </motion.p>
          </motion.div>

          <div className="absolute bottom-10 left-[50%] -translate-x-[50%] flex gap-5">
            <motion.button
              whileTap={{ scale: 0.5 }}
              whileHover={{ scale: 1.1 }}
              className="p-2 rounded-full shadow-2xl bg-white cursor-pointer"
              onClick={() => {
                setIndex((prev) => (prev - 1 < 0 ? data.length - 1 : prev - 1));
                setKey(k => k + 1);
              }}
            >
              <IoIosArrowBack size={30} />
            </motion.button>
            <motion.button
              whileTap={{ scale: 0.5 }}
              whileHover={{ scale: 1.1 }}
              className="p-2 rounded-full shadow-2xl bg-white cursor-pointer"
              onClick={() => {
                setIndex((prev) => (prev + 1 >= data.length ? 0 : prev + 1));
                setKey(k => k + 1);
              }}
            >
              <IoIosArrowForward size={30} />
            </motion.button>
          </div>
        </div>
      )}
    </>
  );
};

export default Wonders;
