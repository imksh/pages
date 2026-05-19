import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import Background from "./Background";
import { CalendarDays, Heart, Sparkles } from "lucide-react";
import { useIsMobile } from "../../hooks/useIsMobile";

const BirthdayFireworks = ({ onContinue, data }) => {
  const recipientName = data?.name || "Friend";
  const fireworksRef = useRef(null);
  const isMobile = useIsMobile();

  // Typing Animation
  const fullText = `Happy Birthday ${recipientName} 🎉`;
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
    <>
      <div className="relative h-dvh w-full overflow-hidden bg-[#12071f]">
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
          <div className="mt-10 flex gap-5 text-3xl md:text-5xl">
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

      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {data?.images?.map((item, indx) => {
          const positions = [
            "bottom-[10%] left-[12%]",
            "bottom-[25%] right-[10%]",
            "bottom-[24%] right-[8%]",

            "top-[4%] left-[4%]",
            "top-[10%] left-[28%]",
            "top-[6%] right-[6%]",

            "top-[30%] left-[8%]",
            "top-[38%] left-[36%]",
            "top-[28%] right-[10%]",

            "bottom-[6%] left-[22%]",
            "bottom-[8%] right-[26%]",

            "top-[52%] right-[34%]",
          ];

          const rotations = [
            "rotate-[-4deg]",
            "rotate-[10deg]",
            "rotate-[-12deg]",
            "rotate-[-8deg]",
            "rotate-[5deg]",
            "rotate-[6deg]",
          ];

          const mobilePositions = [
            "bottom-[4%] left-[3%]",
            "top-[2%] left-[2%]",
            "top-[42%] right-[1%]",
            "bottom-[6%] right-[3%]",
            "top-[4%] right-[2%]",
            "top-[18%] left-[-2%]",
            "top-[20%] right-[-2%]",
            "bottom-[24%] left-[-1%]",
            "top-[38%] left-[1%]",
            "bottom-[22%] right-[-1%]",
          ];

          const mobileRotations = [
            "rotate-[14deg]",
            "rotate-[-9deg]",
            "rotate-[16deg]",
            "rotate-[-12deg]",
            "rotate-[-15deg]",
            "rotate-[-18deg]",
            "rotate-[13deg]",
            "rotate-[10deg]",
            "rotate-[-20deg]",
            "rotate-[18deg]",
          ];

          const randomPosition = isMobile
            ? mobilePositions[indx % mobilePositions.length]
            : positions[indx % positions.length];

          const randomRotation = isMobile
            ? mobileRotations[indx % mobileRotations.length]
            : rotations[indx % rotations.length];

          return (
            <div
              key={indx}
              className={`absolute ${randomPosition} ${randomRotation} h-56 w-56 transition duration-700 hover:scale-105`}
            >
              {/* glow */}
              <div className="absolute inset-0 rounded-[2.5rem] bg-gradient-to-br from-pink-500/30 via-fuchsia-500/20 to-amber-300/30 blur-2xl" />

              {/* frame */}
              <div className="relative h-full w-full overflow-hidden rounded-[2.5rem] border border-white/10 bg-gradient-to-br from-pink-500 via-fuchsia-500 to-amber-300 p-[5px] shadow-[0_20px_80px_rgba(236,72,153,0.25)]">
                <div className="relative h-full w-full overflow-hidden rounded-[2rem] bg-slate-950">
                  {/* overlay */}
                  <div className="absolute inset-0 z-10 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.22),transparent_40%)]" />

                  {/* image */}
                  <img
                    src={item.url}
                    alt={data.name}
                    className="h-full w-full object-cover"
                  />

                  {/* badge */}
                  <div className="absolute bottom-3 left-3 z-20 rounded-full border border-white/10 bg-black/40 px-3 py-1.5 backdrop-blur-xl">
                    <p className="text-[10px] uppercase tracking-[0.25em] text-pink-200">
                      Memory
                    </p>
                  </div>
                </div>
              </div>

              {/* floating icons */}
              <div className="absolute -right-3 top-3 rounded-2xl bg-pink-400 p-2 shadow-xl shadow-pink-500/30">
                <Heart className="h-4 w-4 text-white" />
              </div>

              <div className="absolute -left-3 bottom-4 rounded-2xl bg-amber-300 p-2 shadow-xl shadow-amber-400/30">
                <Sparkles className="h-4 w-4 text-slate-950" />
              </div>
            </div>
          );
        })}
      </div>



       {data?.date && (
        <motion.div
          drag
          dragElastic={0.12}
          dragMomentum={false}
          dragConstraints={{
            top: -120,
            left: -120,
            right: 120,
            bottom: 120,
          }}
          initial={{
            x: 0,
            y: 0,
            rotate: 12,
          }}
          animate={{
            rotate: [-12, -8, -15, -10, -14, -12],
          }}
          transition={{
            duration: 14,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-6 left-6 z-30 cursor-grab active:cursor-grabbing"
        >
          <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-gradient-to-br from-pink-500 via-fuchsia-500 to-amber-300 p-[2px] shadow-[0_20px_60px_rgba(236,72,153,0.35)]">
            <div className="relative rounded-[calc(2rem-2px)] bg-slate-950/90 px-6 py-5 backdrop-blur-xl">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.18),transparent_45%)]" />

              <div className="absolute -right-2 -top-2 rounded-2xl bg-amber-300 p-2 shadow-lg shadow-amber-300/30">
                <Sparkles className="h-4 w-4 text-slate-950" />
              </div>

              <p className="text-[10px] uppercase tracking-[0.35em] text-pink-200">
                Birthday Date
              </p>

              <div className="mt-3 flex items-center gap-3">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-pink-400 to-fuchsia-500 shadow-lg shadow-pink-500/30">
                  <CalendarDays className="h-7 w-7 text-white" />
                </div>

                <div>
                  <h3 className="text-2xl font-bold text-white">
                    {new Date(data.date).toLocaleDateString("en-US", {
                      day: "numeric",
                      month: "short",
                    })}
                  </h3>

                  <p className="text-sm text-slate-300">
                    Celebrate the special day 🎉
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </>
  );
};

export default BirthdayFireworks;
