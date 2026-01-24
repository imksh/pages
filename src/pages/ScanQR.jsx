import React, { useEffect, useRef, useState } from "react";
import jsQR from "jsqr";
import axios from "axios";
import { toast } from "react-hot-toast";

const ScanQR = () => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const scanningRef = useRef(true);
  const streamRef = useRef(null);
  const [result, setResult] = useState("");

  useEffect(() => {
    const handleVisibility = () => {
      if (document.visibilityState === "visible") {
        startCamera();
      } else {
        stopCamera();
      }
    };

    document.addEventListener("visibilitychange", handleVisibility);

    // start initially
    startCamera();

    return () => {
      document.removeEventListener("visibilitychange", handleVisibility);
      stopCamera();
    };
  }, []);

  const startCamera = async () => {
    scanningRef.current = true;

    const stream = await navigator.mediaDevices.getUserMedia({
      video: { facingMode: "environment" },
    });

    streamRef.current = stream;
    videoRef.current.srcObject = stream;
    await videoRef.current.play();

    requestAnimationFrame(scan);
  };

  const stopCamera = () => {
    scanningRef.current = false;

    if (streamRef.current) {
      streamRef.current.getTracks().forEach((t) => t.stop());
      streamRef.current = null;
    }
  };

  const scan = async () => {
    if (!scanningRef.current) return;

    const video = videoRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    if (video.readyState === video.HAVE_ENOUGH_DATA) {
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;

      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const code = jsQR(imageData.data, canvas.width, canvas.height);

      if (code) {
        scanningRef.current = false;
        stopCamera();

        toast.success(code.data);

        try {
          const res = await axios.get(code.data);
          window.open(res.data.redirect, "_blank");
          setResult(res.data.redirect);
        } catch (error) {
          console.log("Error in scan: ", error);
        }

        return;
      }
    }

    requestAnimationFrame(scan);
  };

  return (
    <div className="w-full min-h-dvh flex justify-center items-center flex-col bg-blue-200">
      <h2 className="text-xl font-extrabold">Scan the QR</h2>
      <video
        ref={videoRef}
        className="w-[80%] aspect-square max-w-100 object-cover object-center border-4 border-blue-500 rounded-lg my-8"
      />
      <canvas ref={canvasRef} hidden />
      <p>Result: {result}</p>
    </div>
  );
};

export default ScanQR;
