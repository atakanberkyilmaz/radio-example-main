'use client';

import { useRouter } from 'next/navigation';
import { useRadio } from '../contexts/RadioContext';

export default function Sayfa2() {
  const router = useRouter();
  const { isPlaying, togglePlay } = useRadio();

  return (
    <div>
      <h1>Sayfa 2</h1>
      <button onClick={() => router.push('/')}>Ana Sayfa</button>
      <button onClick={togglePlay}>{isPlaying ? 'Pause' : 'Play'}</button>
    </div>
  );
}
