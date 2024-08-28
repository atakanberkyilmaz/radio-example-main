'use client';

import { useEffect, useState } from 'react';
import { useRadio } from '../contexts/RadioContext';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

// Türkçe karakterleri URL dostu karakterlere dönüştüren fonksiyon
function slugify(text: string): string {
  const map: { [key: string]: string } = {
    ç: "c",
    Ç: "C",
    ğ: "g",
    Ğ: "G",
    ı: "i",
    I: "I",
    İ: "I",
    ö: "o",
    Ö: "O",
    ş: "s",
    Ş: "S",
    ü: "u",
    Ü: "U",
  };

  return text
    .replace(/[çÇğĞıİöÖşŞüÜ]/g, (char) => map[char])
    .toLowerCase()
    .replace(/[^\w\s-]/g, '') // Özel karakterleri temizle
    .replace(/\s+/g, '-') // Boşlukları "-" ile değiştir
    .replace(/--+/g, '-'); // Çift "-" karakterlerini tek "-" yap
}

export default function Home() {
  const router = useRouter();
  const { selectedRadio, isPlaying, selectRadio, togglePlay } = useRadio();
  const [articles, setArticles] = useState<any[]>([]); // Haberler için state

  // Haberleri API'den çekme
  useEffect(() => {
    const fetchNews = async () => {
      const res = await fetch(`https://newsapi.org/v2/top-headlines?country=tr&apiKey=0d9d4253250e4fe09a3bdd087a899a99`);
      const data = await res.json();

      const formattedArticles = data.articles.map((article: any, index: number) => ({
        id: index,
        title: article.title,
        slug: slugify(article.title), // Türkçe karakterleri dönüştürerek slug oluşturma
        description: article.description,
        content: article.content,
      }));

      setArticles(formattedArticles);
    };

    fetchNews();
  }, []);

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

      {/* Haberler Listesi */}
      <div style={{ marginTop: '20px' }}>
        <h2>Son Haberler</h2>
        <ul>
          {articles.map((article) => (
            <li key={article.id}>
              <Link href={`/haberler/${article.slug}`}>
                {article.title}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
