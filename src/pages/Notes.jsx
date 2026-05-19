import { useState, useEffect } from "react";
import Footer from "../components/Footer";
import { IoCreateOutline } from "react-icons/io5";
import notes from "../assets/animations/notes.json";
import Lottie from "lottie-react";
import api from "../config/api";
import { toast } from "react-hot-toast";
import { IoMdCloseCircleOutline } from "react-icons/io";
import { IoCheckmarkDoneCircle } from "react-icons/io5";
import { FaRegTrashAlt } from "react-icons/fa";
import { IoExitOutline } from "react-icons/io5";
import Loading from "../components/Loading";
import useWindowSize from "../hooks/useWindowSize";
import { useMobileBack } from "../hooks/useMobileBack";
import { motion } from "motion/react";
import { CiDark, CiLight } from "react-icons/ci";
import { useNavigate } from "react-router-dom";

const Notes = () => {
  const [selected, setSelected] = useState("");
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [input, setInput] = useState("");
  const [title, setTitle] = useState("");
  const [theme, setTheme] = useState("light");
  const navigate = useNavigate();

  const size = useWindowSize();

  useMobileBack(() => {
    if (size.width < 645) {
      setSelected("");
    }
  });

  const formatIST = (mongoDate) => {
    return new Date(mongoDate).toLocaleString("en-IN", {
      timeZone: "Asia/Kolkata",
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const update = async () => {
    try {
      if (!selected || selected === "new") return;
      const res = await api.put(`/pages/notes/${selected?._id}`, {
        title,
        note: input,
      });
      console.log(res.data);
    } catch (error) {
      console.log("Error in updaing notes: ", error);
      toast.error(error?.response?.data?.message || "Unknown Error");
    }
  };

  const post = async () => {
    try {
      setLoading(true);
      const res = await api.post(`/pages/notes`, { title, note: input });
      get();
      setSelected(res.data);
      console.log(res.data);
    } catch (error) {
      console.log("Error in posting notes: ", error);
      toast.error(error?.response?.data?.message || "Unknown Error");
    } finally {
      setLoading(false);
    }
  };

  const get = async () => {
    try {
      const res = await api.get(`/pages/notes`);
      console.log(res.data);
      setData(res.data);
    } catch (error) {
      console.log("Error in posting notes: ", error);
      toast.error(error?.response?.data?.message || "Unknown Error");
    }
  };

  const deleteNote = async () => {
    try {
      setLoading(true);
      await api.delete(`/pages/notes/${selected?._id}`);
      toast.success("Note Deleted");
      setSelected("");
      setTitle("");
      setInput("");
    } catch (error) {
      console.log("Error in posting notes: ", error);
      toast.error(error?.response?.data?.message || "Unknown Error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      update();
      get();
    }, 1000);
    return () => {
      clearTimeout(timer);
    };
  }, [title, input]);

  useEffect(() => {
    const fetch = () => {
      get();
    };
    fetch();
  }, []);

  if (loading) return <Loading bg={theme ? "#F8FAFC" : "#1E293B"} />;
  return (
    <div
      className={`h-dvh w-screen ${
        theme ? "bg-slate-50 text-black" : "bg-slate-800 text-white"
      }   overflow-hidden grid grid-cols-1 sm:grid-cols-[30%_70%] md:grid-cols-[25%_75%] lg:grid-cols-[20%_80%]`}
    >
      <div
        className={`flex flex-col overflow-auto hide-scrollbar items-baseline shadow ${
          size.width > 640 ? "flex" : selected ? "hidden" : "flex"
        }`}
      >
        <div
          className={`text-2xl flex font-bold p-4 border-b  w-full sticky top-0 left-0 ${
            theme
              ? "bg-slate-50 border-neutral-300"
              : "bg-slate-800 border-neutral-600"
          } shadow z-99  justify-between items-center h-[10dvh] `}
        >
          <motion.p
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="cursor-pointer"
          >
            NoteDock
          </motion.p>
          <div className="flex gap-2">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => {
                setSelected("new");
                setTitle("");
                setInput("");
              }}
              className="cursor-pointer hover:text-blue-500"
            >
              <IoCreateOutline size={28} />
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setTheme((prev) => !prev)}
              className="cursor-pointer hover:text-blue-500"
            >
              {theme ? <CiDark size={28} /> : <CiLight size={28} />}
            </motion.button>
          </div>
        </div>
        {data.map((item, idx) => (
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 1 }}
            key={idx}
            className={`p-4 ${
              theme ? "hover:bg-slate-300" : "hover:bg-slate-600"
            }  w-full cursor-pointer text-left`}
            onClick={() => {
              setSelected(item);
              setTitle(item.title);
              setInput(item.note);
            }}
          >
            {item.title}
          </motion.button>
        ))}

        <div className="mx-auto">
          <Footer />
        </div>
      </div>
      <div
        className={`${
          size.width > 640 ? "block" : selected ? "block" : "hidden"
        }`}
      >
        {selected === "" ? (
          <div className="flex w-full h-full items-center justify-center">
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
              <Lottie
                animationData={notes}
                loop
                className="w-150 h-auto cursor-pointer"
              />
            </motion.div>
          </div>
        ) : (
          <div>
            <div
              className={`text-2xl p-4 border-b sm:border border-t-0  w-full sticky top-0 left-0 ${
                theme
                  ? "bg-slate-50 border-neutral-300"
                  : "bg-slate-800 border-neutral-600"
              }  z-99 flex justify-between items-center h-[10dvh] `}
            >
              <input
                type="text"
                name="title"
                placeholder="Add Title"
                value={title}
                className="h-[10dvh] outline-none w-[80%] sm:w-[85%] md:w-[88%] lg:w-[90%] px-2"
                onChange={(e) => setTitle(e.target.value)}
              />
              <div className="w-[20%] sm:w-[15%] md:w-[12%] lg:w-[10%] h-full flex justify-around items-center gap-2 sm:gap-3 md:gap-4 lg:gap-5 ">
                {selected === "new" ? (
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className=" text-green-400 hover:text-green-700 cursor-pointer"
                    onClick={() => {
                      post();
                    }}
                  >
                    <IoCheckmarkDoneCircle size={30} />
                  </motion.button>
                ) : (
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={deleteNote}
                    className=" text-red-400 hover:text-red-700 cursor-pointer"
                  >
                    <FaRegTrashAlt />
                  </motion.button>
                )}
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className=" text-blue-400 hover:text-blue-700 cursor-pointer"
                  onClick={() => {
                    setSelected("");
                    setTitle("");
                    setInput("");
                  }}
                >
                  <IoExitOutline size={30} />
                </motion.button>
              </div>
            </div>
            <div className="h-[90dvh]">
              <textarea
                name="note"
                id="note"
                value={input}
                placeholder="Add Note"
                className="outline-none w-full h-[82dvh] sm:h-[85dvh] p-4 resize-none"
                onChange={(e) => setInput(e.target.value)}
              />
              <div
                className={`flex flex-col sm:flex-row gap-1 sm:gap-0 justify-center sm:justify-between sm:items-center px-4 h-[8dvh] sm:h-[5dvh] w-full ${
                  theme ? "bg-slate-300" : "bg-slate-600 "
                } text-[10px] sticky bottom-0`}
              >
                <p>
                  <strong>Created At: </strong>
                  {selected.createdAt ? formatIST(selected.createdAt) : "Now"}
                </p>
                <p>
                  <strong>Updated At: </strong>
                  {selected.updatedAt ? formatIST(selected.updatedAt) : "Now"}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Notes;
