import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import Background from "./Background";

const BirthdayFireworks = ({ onContinue, name }) => {
  const fireworksRef = useRef(null);

  // Typing Animation
  const fullText = `Happy Birthday ${name} 🎉`;
  const [displayText, setDisplayText] = useState("");

  useEffect(() => {
    let index = 0;

    const interval = setInterval(() => {
      setDisplayText(fullText.slice(0, index + 1));

      index++;

      if (index === fullText.length) {
        clearInterval(interval);
      }
    }, 120);

    return () => clearInterval(interval);
  }, []);

  // Fireworks
  useEffect(() => {
    const container = fireworksRef.current;

    if (!container) return;

    const createFirework = () => {
      const rocket = document.createElement("div");

      rocket.style.position = "absolute";
      rocket.style.width = "3px";
      rocket.style.height = "120px";
      rocket.style.background = "linear-gradient(to top, transparent, white)";
      rocket.style.left = `${Math.random() * window.innerWidth}px`;
      rocket.style.bottom = "-120px";
      rocket.style.opacity = "1";

      container.appendChild(rocket);

      const burstX = (Math.random() - 0.5) * 300;
      const burstY = -(Math.random() * 500 + 300);

      rocket.animate(
        [
          {
            transform: "translateY(0)",
            opacity: 1,
          },
          {
            transform: `translate(${burstX}px, ${burstY}px)`,
            opacity: 1,
          },
        ],
        {
          duration: 1200,
          easing: "ease-out",
        },
      );

      setTimeout(() => {
        createExplosion(
          rocket.offsetLeft + burstX,
          window.innerHeight + burstY,
        );

        rocket.remove();
      }, 1100);
    };

    const createExplosion = (x, y) => {
      const colors = [
        "#ff2d55",
        "#ffd60a",
        "#ffffff",
        "#7c3aed",
        "#00e5ff",
        "#ff6b00",
      ];

      for (let i = 0; i < 80; i++) {
        const particle = document.createElement("div");

        const size = Math.random() * 5 + 2;

        particle.style.position = "absolute";
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.borderRadius = "999px";

        const color = colors[Math.floor(Math.random() * colors.length)];

        particle.style.background = color;
        particle.style.boxShadow = `0 0 12px ${color}`;

        particle.style.left = `${x}px`;
        particle.style.top = `${y}px`;

        container.appendChild(particle);

        const angle = Math.random() * Math.PI * 2;
        const distance = Math.random() * 250 + 80;

        const dx = Math.cos(angle) * distance;
        const dy = Math.sin(angle) * distance;

        particle.animate(
          [
            {
              transform: "translate(0,0) scale(1)",
              opacity: 1,
            },
            {
              transform: `translate(${dx}px, ${dy}px) scale(0)`,
              opacity: 0,
            },
          ],
          {
            duration: 2000,
            easing: "cubic-bezier(0,0,0.2,1)",
          },
        );

        setTimeout(() => {
          particle.remove();
        }, 2000);
      }
    };

    const interval = setInterval(() => {
      createFirework();
    }, 500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative h-screen w-full overflow-hidden bg-[#12071f]">
      <Background />
      {/* Fireworks Layer */}
      <div
        ref={fireworksRef}
        className="pointer-events-none absolute inset-0 overflow-hidden"
      />

      {/* Main Content */}
      <div className="relative z-20 flex h-full flex-col items-center justify-center px-6 text-center">
        {/* Typing Heading */}
        <motion.h1
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{
            opacity: 1,
            scale: 1,
          }}
          transition={{
            duration: 1,
          }}
          className="text-5xl font-black leading-tight md:text-8xl"
        >
          <motion.span
            animate={{
              textShadow: [
                "0 0 10px #fff",
                "0 0 30px #ff2d55",
                "0 0 60px #7c3aed",
                "0 0 10px #fff",
              ],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
            }}
            className="bg-gradient-to-r from-pink-400 via-yellow-300 to-violet-400 bg-clip-text text-transparent"
          >
            {displayText}

            {/* Blinking Cursor */}
            <motion.span
              animate={{
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: 0.8,
                repeat: Infinity,
              }}
              className="ml-1 inline-block text-white"
            >
              |
            </motion.span>
          </motion.span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          className="mt-6 max-w-2xl text-lg text-white/70 md:text-2xl"
        >
          Wishing you joy, happiness, magic and unforgettable memories ✨
        </motion.p>

        {/* Floating Emojis */}
        <div className="mt-10 flex gap-5 text-5xl">
          {["🎆", "🎇", "✨", "🎉", "💖"].map((emoji, i) => (
            <motion.div
              key={i}
              animate={{
                y: [-12, 12, -12],
                rotate: [-8, 8, -8],
              }}
              transition={{
                duration: 2 + i * 0.2,
                repeat: Infinity,
              }}
            >
              {emoji}
            </motion.div>
          ))}
        </div>

        {/* Continue Button */}
        <motion.button
          whileHover={{
            scale: 1.05,
          }}
          whileTap={{
            scale: 0.95,
          }}
          onClick={onContinue}
          className="mt-14 rounded-2xl bg-white px-8 py-4 text-lg font-bold text-black shadow-2xl"
        >
          Continue Celebration
        </motion.button>
      </div>
    </div>
  );
};

export default BirthdayFireworks;
