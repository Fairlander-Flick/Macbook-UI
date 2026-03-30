import React, { useRef, useEffect, useState } from 'react';

export default function CameraApp() {
  const videoRef = useRef(null);
  const [stream, setStream] = useState(null);
  const [photo, setPhoto] = useState(null);

  useEffect(() => {
    async function setupCamera() {
      try {
        const mediaStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false });
        if (videoRef.current) {
          videoRef.current.srcObject = mediaStream;
        }
        setStream(mediaStream);
      } catch (err) {
        console.error("Camera error:", err);
      }
    }
    setupCamera();

    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, []); 

  const takePhoto = () => {
    if (videoRef.current) {
      const canvas = document.createElement('canvas');
      canvas.width = videoRef.current.videoWidth || 640;
      canvas.height = videoRef.current.videoHeight || 480;
      const ctx = canvas.getContext('2d');
      // Flip the context horizontally to match the mirrored video
      ctx.translate(canvas.width, 0);
      ctx.scale(-1, 1);
      ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
      setPhoto(canvas.toDataURL('image/png'));
    }
  };

  const savePhoto = () => {
    if (photo) {
      const a = document.createElement('a');
      a.href = photo;
      a.download = `Photo on Macbook ${new Date().getTime()}.png`;
      a.click();
    }
  };

  return (
    <div className="w-[640px] h-[480px] bg-black flex flex-col relative rounded-b-xl overflow-hidden shadow-inner">
      {!photo && (
        <video 
          ref={videoRef} 
          autoPlay 
          playsInline 
          className="w-full h-full object-cover scale-x-[-1]" 
        />
      )}
      {photo && (
        <div className="relative w-full h-full bg-[#f0f0f0] flex items-center justify-center p-8">
          <div className="bg-white p-4 shadow-[0_10px_30px_rgba(0,0,0,0.2)] pb-12 rotate-2 transition-transform hover:rotate-0">
            <img src={photo} alt="Captured" className="w-[480px] h-auto border border-gray-200" />
          </div>
          <button 
            onClick={() => setPhoto(null)} 
            className="absolute top-4 left-4 bg-white/80 hover:bg-white text-gray-800 px-3 py-1.5 rounded-md text-xs font-semibold shadow transition"
          >
            Geri Dön
          </button>
          <button 
            onClick={savePhoto}
            className="absolute top-4 right-4 bg-blue-500 hover:bg-blue-600 text-white px-4 py-1.5 rounded-md text-sm font-semibold shadow transition"
          >
            Masaüstüne Kaydet
          </button>
        </div>
      )}

      {!photo && (
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 p-2 bg-black/20 rounded-full backdrop-blur-sm">
          <button 
            onClick={takePhoto}
            className="w-14 h-14 rounded-full border-[3px] border-white flex items-center justify-center active:scale-95 transition-all outline-none"
          >
            <div className="w-[46px] h-[46px] bg-[#ff5f56] rounded-full"></div>
          </button>
        </div>
      )}
    </div>
  );
}
