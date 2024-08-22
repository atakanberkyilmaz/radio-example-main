'use client';

import { useEffect } from 'react';
import { useRadio } from './contexts/RadioContext';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();
  const { selectedRadio, isPlaying, selectRadio, togglePlay } = useRadio();

  // Radyo çalmaya başladığında alert gösterme
  useEffect(() => {
    if (isPlaying) {
      alert('Radyo çalıyor, sayfayı kapatırsanız radyo duracaktır.');
    }
  }, [isPlaying]);

  // Sayfa kapanırken uyarı gösterme
  useEffect(() => {
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      if (isPlaying) {
        event.preventDefault();
        event.returnValue = '';
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [isPlaying]);

  return (
    <div>
      <h1>Ana Sayfa</h1>
      <button onClick={() => router.push('/sayfa1')}>Sayfa 1</button>
      <button onClick={() => router.push('/sayfa2')}>Sayfa 2</button>

      <div style={{ marginTop: '20px' }}>
        <label htmlFor="radioSelect">Radyo Seç:</label>
        <select
          id="radioSelect"
          value={selectedRadio}
          onChange={(e) => selectRadio(e.target.value)}
        >
          <option value="">Bir radyo seçin</option>
          <option value="Radyo 1">Radyo 1</option>
          <option value="Radyo 2">Radyo 2</option>
        </select>
        <button onClick={togglePlay} style={{ marginLeft: '10px' }}>
          {isPlaying ? 'Pause' : 'Play'}
        </button>
      </div>
    </div>
  );
}
