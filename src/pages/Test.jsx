import React from "react";
import { useState } from "react";

// generate demo data programmatically (20 items)
const demoData = Array.from({ length: 20 }).map((_, i) => {
  const id = i + 1;
  const tags = ["Doubt", "Backup"];
  const names = [
    "Rahul Sharma",
    "Amit Kumar",
    "Arjun Joshi",
    "Sneha Nair",
    "Arjun Nair",
    "Priya Singh",
    "Karan Verma",
    "Anita Desai",
    "Rohit Patel",
    "Simran Kaur",
    "Vikram Rao",
    "Neha Gupta",
    "Sandeep Roy",
    "Pooja Mehta",
    "Ritu Jain",
    "Vimal Shah",
    "Tanya Arora",
    "Rakesh Kumar",
    "Isha Bose",
    "Mohit Das",
  ];
  const name = names[i % names.length];
  const tag = tags[i % tags.length];
  const codePrefix = tag === "Doubt" ? "D" : "B";
  const code = `LS/${codePrefix}-2627-${String(10000 + id).slice(-5)}`;
  const role = `FSD ${String((i % 3) + 1).padStart(2, "0")}`;
  const date = `${20 + (i % 10)} May, 0${(i % 12) + 1}:18 ${i % 2 ? "PM" : "AM"}`;
  const duration = `${15 + (i % 8)}h ${41 + (i % 18)}m ${20 + (i % 40)}s`;
  return { id, tag, code, name, role, date, duration };
});

const Tag = ({ text }) => (
  <div className="bg-indigo-50 text-indigo-600 px-2 py-1 rounded-lg font-semibold text-sm">
    {text}
  </div>
);

const Avatar = ({ name }) => {
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
  return (
    <div className="w-11 h-11 rounded-full bg-amber-100 flex items-center justify-center mr-3 font-bold text-amber-700">
      {initials}
    </div>
  );
};

const Modal = ({ item, onClose }) => {
  if (!item) return null;
  return (
    <div
      className="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className="w-96 bg-white rounded-xl shadow-xl p-6 relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="absolute top-3 right-3 text-2xl leading-none"
          onClick={onClose}
        >
          ×
        </button>
        <div className="space-y-3">
          <div className="inline-block bg-indigo-50 text-indigo-600 px-3 py-1 rounded-lg font-semibold">
            {item.tag}
          </div>
          <h2 className="text-lg font-bold">{item.code}</h2>
          <div className="flex items-center gap-3">
            <div className="w-14 h-14 rounded-full bg-amber-100 flex items-center justify-center font-bold text-amber-700">
              {item.name
                .split(" ")
                .map((n) => n[0])
                .slice(0, 2)
                .join("")
                .toUpperCase()}
            </div>
            <div>
              <div className="font-semibold">{item.name}</div>
              <div className="text-sm text-gray-400">{item.role}</div>
            </div>
          </div>
          <div className="flex items-center justify-between mt-4">
            <div className="text-sm text-gray-400">{item.date}</div>
            <div className="text-green-500 font-bold">{item.duration}</div>
          </div>
        </div>
      </div>
    </div>
  );
};
const Card = ({ item, onClick, compact = false, style, className = "" }) => {
  const containerClass = compact
    ? `bg-amber-50 rounded-xl p-3 flex items-start shadow-lg cursor-pointer text-sm ${className}`
    : `bg-white rounded-xl p-3 flex items-start shadow-md cursor-pointer ${className}`;

  return (
    <div onClick={onClick} style={style} className={`${containerClass} w-full`}>
      <div className="pr-3">
        <Tag text={item.tag} />
      </div>
      <div className="flex-1">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="w-11 h-11 rounded-full bg-amber-100 flex items-center justify-center mr-3 font-bold text-amber-700">
              {item.name
                .split(" ")
                .map((n) => n[0])
                .slice(0, 2)
                .join("")
                .toUpperCase()}
            </div>
            <div>
              <div
                className={
                  compact
                    ? "font-semibold text-gray-800"
                    : "font-semibold text-gray-800"
                }
              >
                {item.name}
              </div>
              <div className="text-sm text-gray-400">{item.role}</div>
            </div>
          </div>
          <div className="text-green-500 font-bold text-sm">
            {item.duration}
          </div>
        </div>
        {!compact && (
          <div className="flex items-center gap-3 mt-3 text-sm text-gray-500">
            <div>{item.code}</div>
            <div className="text-gray-400">{item.date}</div>
          </div>
        )}
      </div>
    </div>
  );
};

const Test = () => {
  const [selected, setSelected] = useState(null);

  // show first 3 items in the main list; rest go to the bottom stack
  const visibleCount = 4;
  const peekCount = 3; // how many stacked cards to visually show

  const [visibleItems, setVisibleItems] = useState(() =>
    demoData.slice(0, visibleCount),
  );
  const [topStack, setTopStack] = useState([]);
  const [bottomStack, setBottomStack] = useState(() =>
    demoData.slice(visibleCount),
  );

  const [animating, setAnimating] = useState(null);
  // wheel/throttle handling with slip animations
  const lastWheelRef = React.useRef(0);
  const touchStartRef = React.useRef(null);

  const handleSlip = (direction) => {
    if (animating) return;
    const now = Date.now();
    if (now - lastWheelRef.current < 300) return; // throttle
    lastWheelRef.current = now;

    if (direction === "down") {
      if (bottomStack.length === 0) return;
      const removed = visibleItems[0];
      const added = bottomStack[0];
      if (!removed || !added) return;
      if (visibleItems.some((it) => it.id === added.id)) return;
      setVisibleItems((prev) => [...prev, added]);
      setAnimating({ type: "down", removedId: removed.id, addedId: added.id });
      setTimeout(() => {
        setVisibleItems((prev) => {
          const idx = prev.findIndex((it) => it.id === removed.id);
          if (idx === -1) return prev;
          const copy = [...prev];
          copy.splice(idx, 1);
          return copy;
        });
        setTopStack((t) => [removed, ...t]);
        setBottomStack((b) => b.slice(1));
        setAnimating(null);
      }, 350);
    } else if (direction === "up") {
      if (topStack.length === 0) return;
      const removed = visibleItems[visibleItems.length - 1];
      const added = topStack[0];
      if (!removed || !added) return;
      if (visibleItems.some((it) => it.id === added.id)) return;
      setVisibleItems((prev) => [added, ...prev]);
      setAnimating({ type: "up", removedId: removed.id, addedId: added.id });
      setTimeout(() => {
        setVisibleItems((prev) => {
          const idx = prev.findIndex((it) => it.id === removed.id);
          if (idx === -1) return prev;
          const copy = [...prev];
          copy.splice(idx, 1);
          return copy;
        });
        setBottomStack((b) => [removed, ...b]);
        setTopStack((t) => t.slice(1));
        setAnimating(null);
      }, 350);
    }
  };

  const handleWheel = (e) => {
    e.preventDefault();
    handleSlip(e.deltaY > 0 ? "down" : "up");
  };

  const onTouchStart = (e) => {
    touchStartRef.current = e.touches?.[0]?.clientY ?? null;
  };

  const onTouchMove = (e) => {
    if (touchStartRef.current == null) return;
    const currentY = e.touches?.[0]?.clientY ?? 0;
    const dy = touchStartRef.current - currentY; // positive => finger moved up
    const threshold = 30; // px
    if (Math.abs(dy) > threshold) {
      handleSlip(dy > 0 ? "down" : "up");
      touchStartRef.current = null; // reset to avoid multiple triggers
    }
  };

  const onTouchEnd = () => {
    touchStartRef.current = null;
  };

  const visibleStack = bottomStack.slice(0, peekCount);
  const visibleTopStack = topStack.slice(0, peekCount);

  return (
    <div className="min-h-dvh bg-slate-50 flex justify-center px-6 py-1">
      <style>{`
        .incoming-down { animation: incoming-down 320ms cubic-bezier(.2,.9,.2,1) forwards }
        @keyframes incoming-down { from { transform: translateY(18px) scale(.98); opacity: 0 } to { transform: translateY(0) scale(1); opacity: 1 } }
        .outgoing-down { animation: outgoing-down 320ms cubic-bezier(.2,.9,.2,1) forwards }
        @keyframes outgoing-down { from { transform: translateY(0) scale(1); opacity: 1 } to { transform: translateY(-18px) scale(.98); opacity: 0 } }

        .incoming-up { animation: incoming-up 320ms cubic-bezier(.2,.9,.2,1) forwards }
        @keyframes incoming-up { from { transform: translateY(-18px) scale(.98); opacity: 0 } to { transform: translateY(0) scale(1); opacity: 1 } }
        .outgoing-up { animation: outgoing-up 320ms cubic-bezier(.2,.9,.2,1) forwards }
        @keyframes outgoing-up { from { transform: translateY(0) scale(1); opacity: 1 } to { transform: translateY(18px) scale(.98); opacity: 0 } }
      `}</style>
      <aside
        className="w-[360px] relative"
        onWheel={handleWheel}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        {/* top stack (cards that scrolled out of view at the top) */}
        <div className="absolute left-0 -top-[140px] w-full pointer-events-auto flex justify-center">
          <div className="relative w-full h-[140px] top-50">
            {visibleTopStack.map((item, idx) => {
              const topOffset = (visibleTopStack.length - 1 - idx) * 12; // idx 0 = closest to list -> largest offset
              const scale = 1 - idx * 0.02;
              const z = 300 + (visibleTopStack.length - idx);
              const isTop = idx === 0; // closest to list
              return (
                <div 
                  key={item.id}
                  style={{
                    position: "absolute",
                    left: 0,
                    top: `${topOffset}px`,
                    transform: `scale(${scale})`,
                    zIndex: z,
                    width: "100%",
                  }}
                //   className="top-50"
                >
                  <Card
                    item={item}
                    onClick={() => setSelected(item)}
                    // make card full width like bottom stack
                    style={{ position: "absolute" }}
                  />
                </div>
              );
            })}
          </div>
        </div>
        <header className="flex items-center justify-between p-3 rounded-xl bg-white shadow-sm mb-3 font-semibold">
          <div className="text-amber-500 tracking-wide">PENDING</div>
          <div className="bg-amber-100 text-amber-700 px-3 py-1 rounded-full font-bold">
            {demoData.length}
          </div>
        </header>
        <div className="flex flex-col gap-3">
          {visibleItems.map((item) => {
            let className = "";
            if (animating) {
              if (animating.type === "down") {
                if (animating.addedId === item.id) className = "incoming-down";
                if (animating.removedId === item.id)
                  className = "outgoing-down";
              } else if (animating.type === "up") {
                if (animating.addedId === item.id) className = "incoming-up";
                if (animating.removedId === item.id) className = "outgoing-up";
              }
            }
            return (
              <Card
                key={item.id}
                item={item}
                onClick={() => setSelected(item)}
                className={className}
              />
            );
          })}
        </div>
        <div className="absolute left-0 bottom-3 w-full pointer-events-auto flex justify-center">
          <div className="relative w-full h-[140px]">
            {visibleStack.map((item, idx) => {
              // idx: 0 = bottom, increasing upwards
              const bottomOffset = idx * 14;
              const scale = 1 - idx * 0.02;
              const z = 50 + idx;
              const isTop = idx === visibleStack.length - 1;
              return (
                <div
                  key={item.id}
                  style={{
                    position: "absolute",
                    left: 0,
                    bottom: `${bottomOffset}px`,
                    transform: `scale(${scale})`,
                    zIndex: z,
                    width: "100%",
                  }}
                >
                  <Card
                    item={item}
                    onClick={() => setSelected(item)}
                    // style={{ width: "320px" }}
                  />

                 
                </div>
              );
            })}
          </div>
        </div>
      </aside>

      <Modal item={selected} onClose={() => setSelected(null)} />
    </div>
  );
};

export default Test;
