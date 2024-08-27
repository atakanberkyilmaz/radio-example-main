// pages/haberler/[slug].tsx
import { GetServerSideProps } from 'next';

export default function HaberDetay({ article }: { article: any }) {
  return (
    <div>
      <h1>{article.title}</h1>
      <p>{article.content}</p>
      <p><i>{article.description}</i></p>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { slug } = context.params as { slug: string };

  
  const res = await fetch(`https://newsapi.org/v2/top-headlines?country=tr&apiKey=0d9d4253250e4fe09a3bdd087a899a99`);
  const data = await res.json();

  const article = data.articles.find((article: any) => {
    const articleSlug = article.title
      .toLowerCase()
      .replace(/[^\w\s]/gi, '')
      .replace(/\s+/g, '-');
    return articleSlug === slug;
  });

  if (!article) {
    return {
      notFound: true,
    };
  }

  return { props: { article } };
};
