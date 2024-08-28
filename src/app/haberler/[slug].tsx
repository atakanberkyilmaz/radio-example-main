import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import Head from 'next/head'; // Dinamik başlık ayarlamak için Head bileşeni

export default function HaberDetay() {
  const router = useRouter();
  const { slug } = router.query;
  const [article, setArticle] = useState<any | null>(null);

  useEffect(() => {
    const fetchArticle = async () => {
      const res = await fetch(`https://newsapi.org/v2/top-headlines?country=tr&apiKey=0d9d4253250e4fe09a3bdd087a899a99`);
      const data = await res.json();

      const foundArticle = data.articles.map((article: any) => ({
        title: article.title, // Gerçek başlık
        slug: slugify(article.title), // URL için slug oluştur
        description: article.description,
        content: article.content,
      })).find((article: any) => article.slug === slug);

      setArticle(foundArticle || null);
    };

    if (slug) {
      fetchArticle();
    }
  }, [slug]);

  // Eğer haber bulunamazsa 404 göster
  if (!article) {
    return <div>404 - Haber Bulunamadı</div>;
  }

  return (
    <div>
      <Head>
        <title>{article.title} - Haber Detayı</title> {/* Dinamik başlık */}
      </Head>
      <h1>{article.title}</h1>
      <p>{article.description}</p>
      <div>{article.content}</div>
    </div>
  );
}

// Slugify fonksiyonu
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
