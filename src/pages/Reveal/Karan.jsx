import React, { useRef, useEffect } from "react";
import { motion } from "motion/react";
import { Toaster, toast } from "react-hot-toast";
import Header from "../../components/Header";

const Karan = () => {
  const boxRef = useRef(null);
  useEffect(() => {
    const width = window.innerWidth;
    if (width < 700) {
      toast.success("Tap to Reveal");
    } else {
      toast.success("Hover to Reveal");
    }
  }, []);

  const handleHover = (e) => {
    const rect = boxRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100 + "%";
    const y = ((e.clientY - rect.top) / rect.height) * 100 + "%";

    boxRef.current.style.setProperty("--x", x);
    boxRef.current.style.setProperty("--y", y);
  };

  const handleLeave = () => {
    boxRef.current.style.setProperty("--x", "50%");
    boxRef.current.style.setProperty("--y", "50%");
  };

  return (
    <>
      <Header showInfinity={true} heading="Reveal" name1="Karan's Image" />
      <motion.div
        whileTap={{ scale: 1.1 }}
        ref={boxRef}
        className="w-screen h-[90dvh] mt-[10dvh] overflow-hidden relative reveal cursor-pointer"
        onMouseMove={(e) => handleHover(e)}
        onMouseLeave={(e) => handleLeave(e)}
      >
        <img
          src="/images/reveal/karanOriginal.png"
          alt=""
          className="absolute inset-0 orginal w-full h-full object-cover object-[50%_40%] base scale-110 md:scale-100 "
        />
        <img
          src="/images/reveal/karanReveal.png"
          alt=""
          className="absolute top-0 left-0 md:left-4 right-0 bottom-0 orginal w-full h-full object-cover object-center  md:object-[0%_25%] overlay  md:scale-100"
        />
      </motion.div>
      <Toaster />
    </>
  );
};

export default Karan;
