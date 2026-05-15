import React from 'react'
import { motion } from 'framer-motion';

const Background = () => {
  return (
    <div className='bg-[#12071f]'>
        <div className="absolute left-[-120px] top-[-120px] h-[300px] w-[300px] rounded-full bg-pink-500/30 blur-3xl" />

      <div className="absolute bottom-[-120px] right-[-120px] h-[300px] w-[300px] rounded-full bg-violet-500/30 blur-3xl" />

      {/* Floating Sparkles */}
      {[...Array(15)].map((_, i) => (
        <motion.div
          key={i}
          animate={{
            y: [0, -20, 0],
            opacity: [0.3, 1, 0.3],
          }}
          transition={{
            duration: 3 + i * 0.2,
            repeat: Infinity,
          }}
          className="pointer-events-none absolute text-pink-300"
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
          }}
        >
          ✨
        </motion.div>
      ))}
    </div>
  )
}

export default Background