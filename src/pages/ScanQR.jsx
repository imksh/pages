import React, { useEffect, useRef, useState } from "react";
import jsQR from "jsqr";
import axios from "axios";
import { toast } from "react-hot-toast";

const ScanQR = () => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [result, setResult] = useState("");

  useEffect(() => {
    let stream;

    const startCamera = async () => {
      stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment" },
      });

      videoRef.current.srcObject = stream;
      videoRef.current.setAttribute("playsinline", true);
      await videoRef.current.play();

      requestAnimationFrame(scan);
    };

    const scan = async () => {
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
          toast.success(code.data);
          try {
            const res = await axios.get(code.data);
            setResult(res.data.redirect);
          } catch (error) {
            console.log("Error in scan: ", error);
          }
        }
      }

      requestAnimationFrame(scan);
    };

    const stopCamera = () => {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
    };

    startCamera();

    return () => stopCamera();
  }, []);

  return (
    <div className="w-full min-h-dvh flex justify-center items-center flex-col">
      <video ref={videoRef} className="w-100 border-4 border-blue-500" />
      <canvas ref={canvasRef} hidden />
      <p>Result: {result}</p>
    </div>
  );
};

export default ScanQR;
