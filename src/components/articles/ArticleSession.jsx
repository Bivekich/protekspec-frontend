import * as React from "react";
import { ArticleCard } from "./ArticleCard";

const articles = [
  {
    imageUrl: "https://cdn.builder.io/api/v1/image/assets/TEMP/51d0865b5c31afa82642bbb9c13f9af5b18aa026416a5413b851c51aedef50ad?placeholderIfAbsent=true&apiKey=828c60f7e991488dbfb456f118122881",
    title: "Поступление фильтров KOMATSU на склад",
    date: "22.08.2021"
  },
  {
    imageUrl: "https://cdn.builder.io/api/v1/image/assets/TEMP/51d0865b5c31afa82642bbb9c13f9af5b18aa026416a5413b851c51aedef50ad?placeholderIfAbsent=true&apiKey=828c60f7e991488dbfb456f118122881",
    title: "Поступление фильтров KOMATSU на склад",
    date: "22.08.2021"
  },
  {
    imageUrl: "https://cdn.builder.io/api/v1/image/assets/TEMP/51d0865b5c31afa82642bbb9c13f9af5b18aa026416a5413b851c51aedef50ad?placeholderIfAbsent=true&apiKey=828c60f7e991488dbfb456f118122881",
    title: "Поступление фильтров KOMATSU на склад",
    date: "22.08.2021"
  },
  {
    imageUrl: "https://cdn.builder.io/api/v1/image/assets/TEMP/51d0865b5c31afa82642bbb9c13f9af5b18aa026416a5413b851c51aedef50ad?placeholderIfAbsent=true&apiKey=828c60f7e991488dbfb456f118122881",
    title: "Поступление фильтров KOMATSU на склад",
    date: "22.08.2021"
  }
];

export function ArticlesSection() {
  return (
    <section className="flex flex-col px-20 py-16 bg-[#F8F8F8] max-md:px-5">
      <header className="flex gap-2.5 items-center">
        <img
          loading="lazy"
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/e4fa9175160bd5796990f118f9c3251851affd2452bef799bf95c867fe82afc4?placeholderIfAbsent=true&apiKey=828c60f7e991488dbfb456f118122881"
          alt=""
          className="object-contain shrink-0 self-stretch my-auto aspect-[0.59] fill-[#FAC612] w-[46px]"
        />
        <h2 className="text-6xl font-bold uppercase text-[#333] max-md:text-4xl">
          Полезные статьи
        </h2>
      </header>
      
      <main className="flex flex-col mt-16 w-full max-md:mt-10">
        <div className="grid grid-cols-4 gap-8 max-lg:grid-cols-2 max-md:grid-cols-1">
          {articles.map((article, index) => (
            <ArticleCard
              key={index}
              imageUrl={article.imageUrl}
              title={article.title}
              date={article.date}
            />
          ))}
        </div>
        
        <button 
          className="self-center px-16 py-4 mt-16 text-base font-bold uppercase rounded-md bg-[#FAC612] hover:bg-[#FAC612]/90 transition-colors"
        >
          ВСЕ СТАТЬИ
        </button>
      </main>
    </section>
  );
}

export default ArticlesSection;