import React, { useState, useRef, useCallback } from 'react';
import { useGeckAvy } from '../hooks/useGeckAvy';
import Icon from './Icon';
import { ICONS } from '../constants';

const Profile: React.FC = () => {
  const { user, updateAvatar } = useGeckAvy();
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const openCamera = async () => {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      try {
        const mediaStream = await navigator.mediaDevices.getUserMedia({ video: true });
        setStream(mediaStream);
        if (videoRef.current) {
          videoRef.current.srcObject = mediaStream;
        }
        setIsCameraOpen(true);
      } catch (err) {
        console.error("Error accessing camera: ", err);
        alert("Could not access the camera. Please check permissions.");
      }
    } else {
        alert("Your browser does not support camera access.");
    }
  };
  
  const closeCamera = useCallback(() => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
    }
    setStream(null);
    setIsCameraOpen(false);
  }, [stream]);

  const takePicture = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      const context = canvas.getContext('2d');
      
      if(context){
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        context.drawImage(video, 0, 0, video.videoWidth, video.videoHeight);
        
        const dataUrl = canvas.toDataURL('image/png');
        updateAvatar(dataUrl);
        closeCamera();
      }
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-brand-text-primary">My Profile</h1>
      <div className="bg-brand-surface p-6 md:p-8 rounded-2xl border border-brand-border shadow-sm flex flex-col md:flex-row items-center gap-8">
        <div className="relative group">
          <img src={user.avatarUrl} alt={user.name} className="w-32 h-32 rounded-full object-cover border-4 border-gray-200 group-hover:opacity-50 transition-opacity" />
          <button 
            onClick={openCamera}
            className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
            aria-label="Change avatar"
          >
            <Icon path={ICONS.camera} className="w-10 h-10 text-white" />
          </button>
        </div>
        <div>
          <h2 className="text-3xl font-bold text-brand-text-primary">{user.name}</h2>
          <p className="text-brand-text-secondary">Personal Account</p>
        </div>
      </div>

      {isCameraOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-80 z-50 flex justify-center items-center" onClick={closeCamera}>
          <div className="bg-brand-surface rounded-2xl p-6 border border-brand-border w-full max-w-lg" onClick={e => e.stopPropagation()}>
            <h3 className="text-xl font-bold mb-4 text-brand-text-primary">Update Avatar</h3>
            <video ref={videoRef} autoPlay playsInline className="w-full rounded-lg mb-4 bg-gray-900"></video>
            <div className="flex justify-end gap-4">
              <button onClick={closeCamera} className="bg-gray-200 text-brand-text-primary font-bold py-2 px-4 rounded-lg hover:bg-gray-300 transition-colors">Cancel</button>
              <button onClick={takePicture} className="bg-brand-blue text-white font-bold py-2 px-4 rounded-lg hover:bg-brand-blue/90 transition-colors">Capture</button>
            </div>
          </div>
        </div>
      )}
      <canvas ref={canvasRef} className="hidden"></canvas>
    </div>
  );
};

export default Profile;