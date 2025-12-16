import { useState, useRef, useEffect } from "react";
import { FaRegSquare } from "react-icons/fa6";
import { TbLine } from "react-icons/tb";
import { VscCircleLarge } from "react-icons/vsc";
import { IoTriangleOutline } from "react-icons/io5";
import { FaCheckSquare, FaPaintBrush } from "react-icons/fa";
import { LuEraser } from "react-icons/lu";
import { LuRedo2, LuUndo2 } from "react-icons/lu";
import { MdOutlineDeleteForever, MdOutlineSaveAlt } from "react-icons/md";
import { toast } from "react-hot-toast";
import Alert from "../components/Alert";
import { IoMdMenu } from "react-icons/io";

const Paint = () => {
  const [tool, setTool] = useState("brush");
  const [fill, setFill] = useState(false);
  const [size, setSize] = useState(1);
  const [color, setColor] = useState("black");
  const [selectedColor, setSelectedColor] = useState("");
  const isDrawing = useRef(false);
  const canvasRef = useRef(null);
  const ctxRef = useRef(null);
  const prevMousePoint = useRef({ x: 0, y: 0 });
  const canvasSnapshot = useRef(null);
  const [show, setShow] = useState(false);

  const [drawingStack, setDrawingStack] = useState([]);
  const [redoStack, setRedoStack] = useState([]);
  const [showAlert, setShowAlert] = useState(false);
  const [alert, setAlert] = useState({
    name: "",
    message: "",
    fun: null,
    setShow: setShowAlert,
  });

  const getPos = (e) => {
    const rect = canvasRef.current.getBoundingClientRect();

    if (e.touches) {
      return {
        x: e.touches[0].clientX - rect.left,
        y: e.touches[0].clientY - rect.top,
      };
    }

    return {
      x: e.nativeEvent.offsetX,
      y: e.nativeEvent.offsetY,
    };
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const resizeCanvas = () => {
      document.documentElement.style.setProperty(
        "--doc-height",
        `${window.innerHeight}px`
      );

      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();

      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;

      const ctx = canvas.getContext("2d");

      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);

      ctx.lineCap = "round";
      ctx.strokeStyle = "black";
      ctx.lineWidth = 1;

      ctxRef.current = ctx;
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    return () => window.removeEventListener("resize", resizeCanvas);
  }, []);

  useEffect(() => {
    ctxRef.current.strokeStyle = color;
  }, [color]);

  const start = (e) => {
    const { x, y } = getPos(e);
    ctxRef.current.beginPath();
    ctxRef.current.moveTo(x, y);
    prevMousePoint.current.x = x;
    prevMousePoint.current.y = y;
    ctxRef.current.lineWidth = size;
    ctxRef.current.strokeStyle = selectedColor;
    ctxRef.current.fillStyle = selectedColor;
    isDrawing.current = true;

    canvasSnapshot.current = ctxRef.current.getImageData(
      0,
      0,
      canvasRef.current.width,
      canvasRef.current.height
    );
  };

  const draw = (e) => {
    if (!isDrawing.current) return;
    ctxRef.current.strokeStyle = color;
    ctxRef.current.fillStyle = color;
    const { x, y } = getPos(e);

    ctxRef.current.clearRect(
      0,
      0,
      canvasRef.current.width,
      canvasRef.current.height
    );
    ctxRef.current.putImageData(canvasSnapshot.current, 0, 0);

    if (tool === "brush") {
      ctxRef.current.lineTo(x, y);
      ctxRef.current.stroke();
    } else if (tool == "eraser") {
      ctxRef.current.strokeStyle = "#fff";
      ctxRef.current.lineTo(x, y);
      ctxRef.current.stroke();
    } else if (tool === "rect") {
      drawRect(x, y);
    } else if (tool === "line") {
      drawLine(x, y);
    } else if (tool === "circle") {
      drawCircle(x, y);
    } else if (tool === "triangle") {
      drawTriangle(x, y);
    }
  };

  const drawRect = (x, y) => {
    const ctx = ctxRef.current;
    ctx.beginPath();
    const width = x - prevMousePoint.current.x;
    const height = y - prevMousePoint.current.y;

    ctx.rect(prevMousePoint.current.x, prevMousePoint.current.y, width, height);

    fill ? ctx.fill() : ctx.stroke();
    ctx.closePath();
  };

  const drawLine = (x, y) => {
    const ctx = ctxRef.current;
    ctx.beginPath();
    ctx.moveTo(prevMousePoint.current.x, prevMousePoint.current.y);
    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const drawCircle = (x, y) => {
    const ctx = ctxRef.current;
    ctx.beginPath();
    let radius = Math.sqrt(
      Math.pow(prevMousePoint.current.x - x, 2) +
        Math.pow(prevMousePoint.current.y - y, 2)
    );
    ctx.arc(
      prevMousePoint.current.x,
      prevMousePoint.current.y,
      radius,
      0,
      2 * Math.PI
    );
    fill ? ctx.fill() : ctx.stroke();
  };

  const drawTriangle = (x, y) => {
    const ctx = ctxRef.current;
    ctx.beginPath();
    ctx.moveTo(prevMousePoint.current.x, prevMousePoint.current.y);
    ctx.lineTo(x, y);
    ctx.lineTo(prevMousePoint.current.x * 2 - x, y);
    ctx.closePath();

    fill ? ctx.fill() : ctx.stroke();
  };

  const end = () => {
    ctxRef.current.closePath();
    isDrawing.current = false;
    const snapshot = ctxRef.current.getImageData(
      0,
      0,
      canvasRef.current.width,
      canvasRef.current.height
    );

    setDrawingStack((prev) => [...prev, snapshot]);
    setRedoStack([]);
  };

  const undo = () => {
    if (drawingStack.length <= 1) {
      toast.error("Nothing to Undo");
      return;
    }
    const current = drawingStack.at(-1);
    const newStack = drawingStack.slice(0, -1);
    const prevState = newStack.at(-1);
    ctxRef.current.putImageData(prevState, 0, 0);
    setDrawingStack(newStack);
    const updated = [...redoStack, current];
    setRedoStack(updated);
  };

  const redo = () => {
    if (redoStack.length <= 0) {
      toast.error("Nothing to Redo");
      return;
    }
    const restore = redoStack.at(-1);
    const newStack = redoStack.slice(0, -1);
    const updated = [...drawingStack, restore];
    ctxRef.current.putImageData(restore, 0, 0);
    setRedoStack(newStack);
    setDrawingStack(updated);
  };

  const clear = () => {
    ctxRef.current.clearRect(
      0,
      0,
      canvasRef.current.width,
      canvasRef.current.height
    );
    setRedoStack([]);
    setDrawingStack([]);
  };

  const save = () => {
    const canvas = canvasRef.current;
    const ctx = ctxRef.current;

    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

    ctx.save();
    ctx.globalCompositeOperation = "destination-over";
    ctx.fillStyle = "#fff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.restore();

    const dataURL = canvas.toDataURL("image/jpeg");
    const a = document.createElement("a");
    a.href = dataURL;
    a.download = `paint_${new Date()
      .toISOString()
      .split("T")[0]
      .split("-")
      .reverse()
      .join("-")}.jpg`;
    a.click();

    ctx.putImageData(imageData, 0, 0);
  };

  return (
    <>
      <div className="overflow-hidden">
        <div className="bg-blue-600 text-white h-[10dvh] w-full fixed top-0 left-0 flex items-center px-4 lg:px-10 lg:justify-center">
          <div className="flex gap-3 items-center">
            <button onClick={() => setShow(!show)}>
              <IoMdMenu size={24} className="flex lg:hidden" />
            </button>
            <h1 className="text-2xl lg:text-4xl font-bold">Paint</h1>
          </div>
        </div>
        <div className="w-full h-[90dvh] flex mt-[10dvh]">
          <div className="hidden lg:flex flex-col section1 w-[15%] h-full gradient1  text-white p-2 ">
            <div>
              <p className="font-bold mb-2 mt-4 text-[20px]">Shapes</p>
              <div className="grid grid-cols-2 content-center place-items-center gap-2">
                <button
                  className={`p-3 border-2 rounded-full w-fit cursor-pointer ${
                    tool === "line" ? "bg-green-500" : ""
                  } `}
                  onClick={() => setTool("line")}
                >
                  <TbLine size="18" />
                </button>
                <button
                  className={`p-3 border-2 rounded-full w-fit cursor-pointer ${
                    tool === "rect" ? "bg-green-500" : ""
                  } `}
                  onClick={() => setTool("rect")}
                >
                  <FaRegSquare size="18" />
                </button>
                <button
                  className={`p-3 border-2 rounded-full w-fit cursor-pointer ${
                    tool === "circle" ? "bg-green-500" : ""
                  } `}
                  onClick={() => setTool("circle")}
                >
                  <VscCircleLarge size="18" />
                </button>
                <button
                  className={`p-3 border-2 rounded-full w-fit cursor-pointer ${
                    tool === "triangle" ? "bg-green-500" : ""
                  } `}
                  onClick={() => setTool("triangle")}
                >
                  <IoTriangleOutline size="18" />
                </button>
              </div>
              <div className="flex  py-3 px-4 border  my-4 rounded-2xl cursor-pointer mx-auto justify-center items-center">
                <button
                  onClick={() => {
                    setFill((prev) => !prev);
                  }}
                  className="cursor-pointer flex items-center justify-center gap-2"
                >
                  {fill ? (
                    <FaCheckSquare size="20" className="" />
                  ) : (
                    <FaRegSquare size="20" />
                  )}
                  Fill Color
                </button>
              </div>
            </div>

            <div>
              <p className="font-bold mb-2 mt-4 text-[20px]">Tools</p>
              <div className="grid grid-cols-2 content-center place-items-center gap-2">
                <button
                  className={`p-3 border-2 rounded-full w-fit cursor-pointer ${
                    tool === "brush" ? "bg-green-500" : ""
                  } `}
                  onClick={() => setTool("brush")}
                >
                  <FaPaintBrush size="18" />
                </button>
                <button
                  className={`p-3 border-2 rounded-full w-fit cursor-pointer ${
                    tool === "eraser" ? "bg-green-500" : ""
                  } `}
                  onClick={() => setTool("eraser")}
                >
                  <LuEraser size="18" />
                </button>
              </div>

              <div className="flex justify-center items-center my-6">
                <input
                  type="range"
                  min={0}
                  max={10}
                  step={1}
                  value={size}
                  onChange={(e) => setSize(e.target.value)}
                />
              </div>
            </div>

            <div>
              <p className="font-bold mb-2 mt-4 text-[20px]">Colors</p>
              <div className="grid grid-cols-4 content-center place-items-center gap-3">
                <button
                  className={`p-3 border-2   bg-black rounded-full cursor-pointer ${
                    color === "black" ? " border-white" : "border-black"
                  } `}
                  onClick={() => setColor("black")}
                ></button>
                <button
                  className={`p-3 border-2  bg-white rounded-full cursor-pointer ${
                    color === "white" ? " border-black" : "border-white"
                  } `}
                  onClick={() => setColor("white")}
                ></button>
                <button
                  className={`p-3 border-2  bg-red-700 rounded-full cursor-pointer ${
                    color === "red" ? " border-white" : "border-red-700"
                  } `}
                  onClick={() => setColor("red")}
                ></button>
                <button
                  className={`p-3 border-2  bg-green-700 rounded-full cursor-pointer ${
                    color === "green" ? " border-white" : "border-green-700"
                  } `}
                  onClick={() => setColor("green")}
                ></button>
                <button
                  className={`p-3 border-2 bg-blue-700 rounded-full cursor-pointer ${
                    color === "blue" ? " border-white" : " border-blue-700"
                  }`}
                  onClick={() => setColor("blue")}
                ></button>

                <button
                  className={`p-3 border-2 bg-yellow-400  rounded-full cursor-pointer ${
                    color === "yellow" ? " border-white" : " border-yellow-400"
                  } `}
                  onClick={() => setColor("yellow")}
                ></button>
                <button
                  className={`p-3 border-2  bg-pink-400 rounded-full cursor-pointer ${
                    color === "pink" ? " border-white" : "border-pink-400"
                  } `}
                  onClick={() => setColor("pink")}
                ></button>
                <label
                  htmlFor="selectColor"
                  className={`p-3 rounded-full cursor-pointer ${
                    color === selectedColor
                      ? "border-2 border-white"
                      : "colorGradient"
                  } `}
                  style={
                    selectedColor === color
                      ? { backgroundColor: selectedColor }
                      : {}
                  }
                ></label>
              </div>
              <input
                type="color"
                id="selectColor"
                onChange={(e) => {
                  setColor(e.target.value);
                  setSelectedColor(e.target.value);
                  console.log(e.target.value);
                }}
                className="hidden"
              />
            </div>

            <div>
              <p className="font-bold mb-2 mt-4 text-[20px]">Actions</p>

              <div className="flex justify-between items-center flex-wrap gap-4">
                <button
                  className={` py-1 border w-[40%] flex justify-center items-center rounded cursor-pointer `}
                  onClick={undo}
                >
                  <LuUndo2 size={24} />
                </button>
                <button
                  className={` py-1 border w-[40%] flex justify-center items-center rounded cursor-pointer `}
                  onClick={redo}
                >
                  <LuRedo2 size={24} />
                </button>
                <button
                  className={` py-1 border w-[40%] flex justify-center items-center rounded cursor-pointer `}
                  onClick={() => {
                    setAlert({
                      name: "Clear Canvas",
                      message: "Are you sure, you want to clear Canvas?",
                      fun: clear,
                      setShow: setShowAlert,
                    });
                    setShowAlert(true);
                  }}
                >
                  <MdOutlineDeleteForever size={24} />
                </button>
                <button
                  className={` py-1 border w-[40%] flex justify-center items-center rounded cursor-pointer `}
                  onClick={() => {
                    setAlert({
                      name: "Download Image",
                      message: "Are you sure, you want to Download Image?",
                      fun: save,
                      setShow: setShowAlert,
                    });
                    setShowAlert(true);
                  }}
                >
                  <MdOutlineSaveAlt size={24} />
                </button>
              </div>
            </div>
          </div>
          <canvas
            id="canvas"
            className="w-[100%]lg:w-[85%] cursor-pointer"
            ref={canvasRef}
            onMouseDown={(e) => start(e)}
            onMouseUp={() => end()}
            onMouseMove={(e) => draw(e)}
            onTouchStart={(e) => start(e)}
            onTouchEnd={() => end()}
            onTouchMove={(e) => draw(e)}
            style={{ touchAction: "none" }}
          ></canvas>
        </div>

        {show && (
          <div className="absolute top-[10dvh] left-0 z-50 flex flex-col section1 w-full  gradient1  text-white p-2 h-[90dvh] ">
            <div>
              <p className="font-bold mb-2 mt-4 text-[20px]">Shapes</p>
              <div className="grid grid-cols-4 content-center place-items-center gap-2">
                <button
                  className={`w-10 h-10 border rounded-full cursor-pointer ${
                    tool === "line" ? "bg-green-500" : ""
                  } `}
                  onClick={() => setTool("line")}
                >
                  <button onClick={() => setShow(!show)}>
                    <TbLine size="16" />
                  </button>
                </button>
                <button
                  className={`w-10 h-10 border flex justify-center items-center rounded-full text-center cursor-pointer ${
                    tool === "rect" ? "bg-green-500" : ""
                  } `}
                  onClick={() => setTool("rect")}
                >
                  <FaRegSquare size="16" />
                </button>
                <button
                  className={`w-10 h-10 border flex justify-center items-center rounded-full  cursor-pointer ${
                    tool === "circle" ? "bg-green-500" : ""
                  } `}
                  onClick={() => setTool("circle")}
                >
                  <VscCircleLarge size="16" />
                </button>
                <button
                  className={`w-10 h-10 border flex justify-center items-center rounded-full  cursor-pointer ${
                    tool === "triangle" ? "bg-green-500" : ""
                  } `}
                  onClick={() => setTool("triangle")}
                >
                  <IoTriangleOutline size="16" />
                </button>
              </div>
              <div className="flex  py-2 px-4 border  my-4 rounded-2xl cursor-pointer mx-auto justify-center items-center">
                <button
                  onClick={() => {
                    setFill((prev) => !prev);
                  }}
                  className="cursor-pointer flex items-center justify-center gap-2"
                >
                  {fill ? (
                    <FaCheckSquare size="20" className="" />
                  ) : (
                    <FaRegSquare size="20" />
                  )}
                  Fill Color
                </button>
              </div>
            </div>

            <div>
              <p className="font-bold mb-2  text-[20px]">Tools</p>
              <div className="grid grid-cols-2 content-center place-items-center gap-2">
                <button
                  className={`p-3 border-2 rounded-full w-fit cursor-pointer ${
                    tool === "brush" ? "bg-green-500" : ""
                  } `}
                  onClick={() => setTool("brush")}
                >
                  <FaPaintBrush size="18" />
                </button>
                <button
                  className={`p-3 border-2 rounded-full w-fit cursor-pointer ${
                    tool === "eraser" ? "bg-green-500" : ""
                  } `}
                  onClick={() => setTool("eraser")}
                >
                  <LuEraser size="18" />
                </button>
              </div>

              <div className="flex justify-center items-center my-6">
                <input
                  type="range"
                  min={0}
                  max={10}
                  step={1}
                  value={size}
                  onChange={(e) => setSize(e.target.value)}
                  className="w-[80%]"
                />
              </div>
            </div>

            <div>
              <p className="font-bold mb-2  text-[20px]">Colors</p>
              <div className="grid grid-cols-4 content-center place-items-center gap-3">
                <button
                  className={`p-3 border-2   bg-black rounded-full cursor-pointer ${
                    color === "black" ? " border-white" : "border-black"
                  } `}
                  onClick={() => setColor("black")}
                ></button>
                <button
                  className={`p-3 border-2  bg-white rounded-full cursor-pointer ${
                    color === "white" ? " border-black" : "border-white"
                  } `}
                  onClick={() => setColor("white")}
                ></button>
                <button
                  className={`p-3 border-2  bg-red-700 rounded-full cursor-pointer ${
                    color === "red" ? " border-white" : "border-red-700"
                  } `}
                  onClick={() => setColor("red")}
                ></button>
                <button
                  className={`p-3 border-2  bg-green-700 rounded-full cursor-pointer ${
                    color === "green" ? " border-white" : "border-green-700"
                  } `}
                  onClick={() => setColor("green")}
                ></button>
                <button
                  className={`p-3 border-2 bg-blue-700 rounded-full cursor-pointer ${
                    color === "blue" ? " border-white" : " border-blue-700"
                  }`}
                  onClick={() => setColor("blue")}
                ></button>

                <button
                  className={`p-3 border-2 bg-yellow-400  rounded-full cursor-pointer ${
                    color === "yellow" ? " border-white" : " border-yellow-400"
                  } `}
                  onClick={() => setColor("yellow")}
                ></button>
                <button
                  className={`p-3 border-2  bg-pink-400 rounded-full cursor-pointer ${
                    color === "pink" ? " border-white" : "border-pink-400"
                  } `}
                  onClick={() => setColor("pink")}
                ></button>
                <label
                  htmlFor="selectColor"
                  className={`p-3 rounded-full cursor-pointer ${
                    color === selectedColor
                      ? "border-2 border-white"
                      : "colorGradient"
                  } `}
                  style={
                    selectedColor === color
                      ? { backgroundColor: selectedColor }
                      : {}
                  }
                ></label>
              </div>
              <input
                type="color"
                id="selectColor"
                onChange={(e) => {
                  setColor(e.target.value);
                  setSelectedColor(e.target.value);
                  console.log(e.target.value);
                }}
                className="hidden"
              />
            </div>

            <div>
              <p className="font-bold mb-2 mt-4 text-[20px]">Actions</p>

              <div className="flex justify-between items-center flex-wrap gap-4">
                <button
                  className={` py-1 border w-[40%] flex justify-center items-center rounded cursor-pointer `}
                  onClick={undo}
                >
                  <LuUndo2 size={24} />
                </button>
                <button
                  className={` py-1 border w-[40%] flex justify-center items-center rounded cursor-pointer `}
                  onClick={redo}
                >
                  <LuRedo2 size={24} />
                </button>
                <button
                  className={` py-1 border w-[40%] flex justify-center items-center rounded cursor-pointer `}
                  onClick={() => {
                    setAlert({
                      name: "Clear Canvas",
                      message: "Are you sure, you want to clear Canvas?",
                      fun: clear,
                      setShow: setShowAlert,
                    });
                    setShowAlert(true);
                  }}
                >
                  <MdOutlineDeleteForever size={24} />
                </button>
                <button
                  className={` py-1 border w-[40%] flex justify-center items-center rounded cursor-pointer `}
                  onClick={() => {
                    setAlert({
                      name: "Download Image",
                      message: "Are you sure, you want to Download Image?",
                      fun: save,
                      setShow: setShowAlert,
                    });
                    setShowAlert(true);
                  }}
                >
                  <MdOutlineSaveAlt size={24} />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
      {showAlert && (
        <Alert
          name={alert.name}
          message={alert.message}
          fun={alert.fun}
          setShow={setShowAlert}
        />
      )}
    </>
  );
};

export default Paint;
