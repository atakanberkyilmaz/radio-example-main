'use client';

import React, { createContext, useState, useRef, useContext, ReactNode } from 'react';

// Radio context oluşturuyoruz
interface RadioContextProps {
  selectedRadio: string;
  isPlaying: boolean;
  selectRadio: (radio: string) => void;
  togglePlay: () => void;
  audioRef: React.RefObject<HTMLAudioElement>;
}

const RadioContext = createContext<RadioContextProps | undefined>(undefined);

export const useRadio = () => {
  const context = useContext(RadioContext);
  if (!context) {
    throw new Error('useRadio must be used within a RadioProvider');
  }
  return context;
};

export const RadioProvider = ({ children }: { children: ReactNode }) => {
  const [selectedRadio, setSelectedRadio] = useState<string>('');
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const radioStations: Record<string, string> = {
    'Radyo 1': 'https://limitsiz.kesintisizyayin.com/8002/stream',
    'Radyo 2': 'https://limitsiz.kesintisizyayin.com/8004/stream',
  };

  const selectRadio = (radio: string) => {
    if (audioRef.current) {
      audioRef.current.pause();
    }
    setSelectedRadio(radio);
    setIsPlaying(false);
  };

  const togglePlay = () => {
    if (selectedRadio && audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.src = radioStations[selectedRadio];
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <RadioContext.Provider
      value={{ selectedRadio, isPlaying, selectRadio, togglePlay, audioRef }}
    >
      {children}
      <audio ref={audioRef} />
    </RadioContext.Provider>
  );
};
