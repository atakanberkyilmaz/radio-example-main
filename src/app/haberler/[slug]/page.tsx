import { GetStaticPropsContext } from "next";
import { Metadata } from "next";


export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  
  const res = await fetch(`https://newsapi.org/v2/top-headlines?country=tr&apiKey=0d9d4253250e4fe09a3bdd087a899a99`);
  const data = await res.json();

  
  const article = data.articles.find((article: any) => {
    const articleSlug = slugify(article.title);
    return articleSlug === params.slug;
  });

  
  if (!article) {
    return {
      title: "Haber Bulunamadı",
      description: "Bu haber mevcut değil.",
    };
  }

  
  return {
    title: article.title,
    description: article.description || "Bu haberin açıklaması mevcut değil.",
  };
}

// Haber detay sayfası
export default function HaberDetay({ params }: { params: { slug: string } }) {
  
  return (
    <div>
      <h1>Haber Detay Sayfası</h1>
      <p>Burada haberin detayları olacak...</p>
    </div>
  );
}


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
    .replace(/[^\w\s-]/g, '') 
    .replace(/\s+/g, '-') 
    .replace(/--+/g, '-'); 
}
